import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const totalUsers = await prisma.user.count();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white">Dashboard Admin</h1>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card */}
        <div className="rounded-lg bg-white/5 p-6">
          <p className="text-sm text-gray-400">Usuários</p>
          <p className="mt-2 text-3xl font-bold text-white">{totalUsers}</p>
        </div>

        {/* Card exemplo */}
        <div className="rounded-lg bg-white/5 p-6">
          <p className="text-sm text-gray-400">Status</p>
          <p className="mt-2 text-white">Sistema operacional</p>
        </div>
      </div>
    </div>
  );
}
