import { Outlet, Navigate } from "react-router-dom";
import { useMe } from "./network/me/queries";
import Sidebar from "./components/dashboard/Sidebar";
import DashboardHeader from "./components/dashboard/DashboardHeader";


const LoggedInLayout = () => {
  const { data: me, isPending, isError } = useMe();

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
    <Sidebar />

    <main className="ml-64 min-h-screen">
      <DashboardHeader />

      <div className="p-8">
        <Outlet />
      </div>
    </main>
  </div>
);
};

export default LoggedInLayout;
