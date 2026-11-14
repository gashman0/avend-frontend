
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLogout } from "../../network/auth/queries";
import Modal from "../Ui/Modal";

import {
  LayoutDashboard,
  Wallet,
  ChartNoAxesCombined,
  Layers,
  ArrowLeftRight,
  Settings,
  LogOut,
  Users,
  AlertTriangle,
  Loader2,
} from "lucide-react";

const navigation = [
  {
    name: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Wallet",
    path: "/dashboard/wallet",
    icon: Wallet,
  },
  {
    name: "My Investments",
    path: "/dashboard/investments",
    icon: ChartNoAxesCombined,
  },
  {
    name: "Investment Plans",
    path: "/dashboard/plans",
    icon: Layers,
  },
  {
    name: "Transactions",
    path: "/dashboard/transactions",
    icon: ArrowLeftRight,
  },
  {
    name: "Referrals",
    path: "/dashboard/referrals",
    icon: Users,
  },
];

const Sidebar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const logoutMutation = useLogout();

  const handleLogout = () => {
    if (logoutMutation.isPending) return;

    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setIsLogoutModalOpen(false);
      },
    });
  };

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-white/10 bg-[#15181E] px-5 py-6 text-white">

        {/* Logo */}
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E1161F] text-xl font-bold text-white">
            A
          </div>

          <span className="text-xl font-semibold tracking-wide text-white">
            AvendCrest
          </span>
        </div>

        {/* Main navigation */}
        <div className="flex-1">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-white/40">
            Workspace
          </p>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/dashboard"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#E1161F] text-white"
                        : "text-white/65 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  <Icon size={19} strokeWidth={1.8} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom navigation */}
        <div className="space-y-2 border-t border-white/10 pt-5">

          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/65 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Settings size={19} strokeWidth={1.8} />
            Settings
          </button>

          <button
            type="button"
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/65 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={19} strokeWidth={1.8} />
            Sign out
          </button>

        </div>
      </aside>

      {/* Logout confirmation modal */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => {
          if (!logoutMutation.isPending) {
            setIsLogoutModalOpen(false);
          }
        }}
        title="Confirm logout"
        description="Are you sure you want to log out of your AvendCrest account?"
        showCloseButton={!logoutMutation.isPending}
        closeOnBackdrop={!logoutMutation.isPending}
        closeOnEscape={!logoutMutation.isPending}
        maxWidth="sm"
      >
        <div className="space-y-6">

          <div className="flex items-start gap-3 rounded-xl border border-red-500/10 bg-red-500/5 p-4">
            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-red-400"
            />

            <p className="text-sm leading-6 text-white/60">
              You'll need to sign in again to access your dashboard
              and manage your investments.
            </p>
          </div>

          {logoutMutation.isError && (
            <p className="text-sm text-red-400" role="alert">
              {logoutMutation.error?.response?.data?.message ||
                "Unable to log out right now. Please try again."}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              disabled={logoutMutation.isPending}
              onClick={() => setIsLogoutModalOpen(false)}
              className="rounded-lg border border-white/10 px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={logoutMutation.isPending}
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#E1161F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c9131b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {logoutMutation.isPending ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Logging out...
                </>
              ) : (
                <>
                  <LogOut size={17} />
                  Yes, log out
                </>
              )}
            </button>

          </div>
        </div>
      </Modal>
    </>
  );
};

export default Sidebar;
