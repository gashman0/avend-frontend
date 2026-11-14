
import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useMe } from "./network/me/queries";
import Sidebar from "./components/dashboard/Sidebar";
import DashboardHeader from "./components/dashboard/DashboardHeader";

const LoggedInLayout = () => {
  const { data: me, isPending, isError } = useMe();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#15181E] text-white">
        Checking your authentication...
      </div>
    );
  }

  if (isError || !me) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-[#15181E]">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="min-h-screen md:ml-64">
        <DashboardHeader
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default LoggedInLayout;
