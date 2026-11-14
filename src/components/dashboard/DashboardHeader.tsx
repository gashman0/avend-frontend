
import {
  Bell,
  ChevronDown,
  Menu,
} from "lucide-react";
import { useMe } from "../../network/me/queries";

type DashboardHeaderProps = {
  onMenuClick: () => void;
};

const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  const { data: me } = useMe();

  const firstName = me?.name?.trim().split(" ")[0] || "User";

  return (
    <header className="flex min-h-20 w-full items-center justify-between border-b border-white/10 bg-[#15181E] px-4 py-3 text-white sm:px-6 lg:px-8">

      {/* Left section: Menu and welcome message */}
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="shrink-0 rounded-lg p-2 text-white/70 transition-colors hover:bg-white/5 hover:text-white md:hidden"
        >
          <Menu size={23} strokeWidth={1.8}/>
        </button>

        {/* Welcome message */}
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold sm:text-xl">
            Welcome back, {firstName}
          </h1>

          <p className="mt-1 hidden text-sm text-white/50 sm:block">
            Here's an overview of your account.
          </p>
        </div>
      </div>

      {/* Right section: Header actions */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-5">

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full p-2 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
        >
          <Bell size={21} strokeWidth={1.8} />

          {/* Notification indicator */}
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#E1161F] ring-2 ring-[#15181E]" />
        </button>

        {/* Profile */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-white/5 sm:gap-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E1161F] text-sm font-semibold text-white sm:h-10 sm:w-10">
            {firstName.charAt(0).toUpperCase()}
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-white">
              {firstName}
            </p>

            <p className="text-xs text-white/50">
              My Account
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-white/50 sm:block"
          />
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
