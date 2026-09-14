import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { MongoClient, ObjectId } from "mongodb";

// Reuse client connection across hot reloads in development
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing in .env");
}

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(process.env.MONGODB_URI);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(process.env.MONGODB_URI);
  clientPromise = client.connect();
}

// PUT: Toggle bookmark (Push / Pull in user.bookmarks array)
export async function PUT(req: NextRequest) {
  try {
    // 1. Verify user session
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Read questionId from body
    const body = await req.json().catch(() => null);
    const questionId = body?.questionId;

    if (!questionId) {
      return NextResponse.json(
        { message: "questionId is required" },
        { status: 400 }
      );
    }

    // 3. Connect to DB and user collection
    const mongo = await clientPromise;
    const db = mongo.db(process.env.AUTH_DB_NAME || "preparejobDB");
    const userCollection = db.collection("user");

    const userFilter = ObjectId.isValid(session.user.id)
      ? { _id: new ObjectId(session.user.id) }
      : { id: session.user.id };

    const currentUser = await userCollection.findOne(userFilter);

    if (!currentUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const currentBookmarks: string[] = currentUser.bookmarks || [];
    const isAlreadyBookmarked = currentBookmarks.includes(questionId);

    // 4. Toggle: Pull if exists, Push ($addToSet) if not
    if (isAlreadyBookmarked) {
      await userCollection.updateOne(userFilter, {
        // @ts-ignore
        $pull: { bookmarks: questionId },
        $set: { updatedAt: new Date() },
      });
    } else {
      await userCollection.updateOne(userFilter, {
        // @ts-ignore
        $addToSet: { bookmarks: questionId },
        $set: { updatedAt: new Date() },
      });
    }

    return NextResponse.json({
      success: true,
      isBookmarked: !isAlreadyBookmarked,
      message: !isAlreadyBookmarked
        ? "Question bookmarked"
        : "Bookmark removed",
    });
  } catch (error) {
    console.error("Bookmark toggle error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET: Fetch full question objects for all bookmarked IDs of the logged-in user
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const mongo = await clientPromise;
    const db = mongo.db(process.env.AUTH_DB_NAME || "preparejobDB");
    const userCollection = db.collection("user");

    const userFilter = ObjectId.isValid(session.user.id)
      ? { _id: new ObjectId(session.user.id) }
      : { id: session.user.id };

    const currentUser = await userCollection.findOne(userFilter);
    const bookmarkIds: string[] = currentUser?.bookmarks || [];

    if (bookmarkIds.length === 0) {
      return NextResponse.json({ success: true, data: [] });
    }

    // Convert string IDs to ObjectIds where valid
    const objectIds = bookmarkIds
      .filter((id) => ObjectId.isValid(id))
      .map((id) => new ObjectId(id));

    // Query questions collection for matching IDs
    const questionsCollection = db.collection("questions");
    const questions = await questionsCollection
      .find({
        $or: [
          { _id: { $in: objectIds } },
          { _id: { $in: bookmarkIds as unknown as ObjectId[] } },
        ],
      })
      .toArray();

    // Ensure _id is a string for frontend mapping
    const formattedQuestions = questions.map((q) => ({
      ...q,
      _id: q._id.toString(),
    }));

    return NextResponse.json({ success: true, data: formattedQuestions });
  } catch (error) {
    console.error("Get bookmarks error:", error);
    return NextResponse.json(
      { message: "Failed to fetch bookmarks" },
      { status: 500 }
    );
  }
}
