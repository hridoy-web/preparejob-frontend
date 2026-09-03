import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, Shield, MoreVertical } from "lucide-react";

export default function AdminUsersPage() {
  const dummyUsers = [
    { id: "1", name: "Tanvir Rahman", email: "tanvir@example.com", role: "Candidate", joined: "Aug 2026", avatar: "" },
    { id: "2", name: "Hridoy Chowdhury", email: "admin@preparejob.com", role: "Super Admin", joined: "Jan 2026", avatar: "https://github.com/shadcn.png" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Users Management</h2>
        <p className="text-sm text-slate-500 mt-0.5">Overview of registered candidates and administrators.</p>
      </div>

      <Card className="bg-white border-slate-200/80 shadow-xs">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 py-4">
          <CardTitle className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Users className="size-4 text-purple-600" /> Registered Accounts ({dummyUsers.length})
          </CardTitle>
        </CardHeader>
        <div className="divide-y divide-slate-100">
          {dummyUsers.map((user) => (
            <div key={user.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar className="size-10 border border-slate-100">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold text-xs">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{user.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                  user.role === "Super Admin" ? "bg-purple-50 text-purple-700 border border-purple-200" : "bg-slate-100 text-slate-600"
                }`}>
                  {user.role === "Super Admin" && <Shield className="size-3" />}
                  {user.role}
                </span>
                <Button size="icon" variant="ghost" className="size-8 rounded-lg text-slate-400">
                  <MoreVertical className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}