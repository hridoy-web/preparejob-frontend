import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  database: mongodbAdapter(db, {
    client,
  }),

  // Add custom user fields to the schema
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        // Input validation options if needed
      },
      status: {
        type: "string",
        required: false,
        defaultValue: "active",
      },
      bookmarks: {
        type: "string[]", // Defines an array of strings (e.g., question IDs)
        required: false,
        defaultValue: [],
      },
    },
  },
});