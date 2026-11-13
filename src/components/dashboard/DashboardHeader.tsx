
import { Bell, ChevronDown, UserRound } from "lucide-react";
import { useMe } from "../../network/me/queries";

const DashboardHeader = () => {
  const { data: me } = useMe();

  const firstName = me?.name?.trim().split(" ")[0] || "User";

  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-white/10 bg-[#15181E] px-8 text-white">

      {/* Welcome message */}
      <div>
        <h1 className="text-xl font-semibold">
          Welcome back, {firstName}
        </h1>

        <p className="mt-1 text-sm text-white/50">
          Here's an overview of your account.
        </p>
      </div>

      {/* Header actions */}
      <div className="flex items-center gap-6">

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
          className="flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-white/5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E1161F] text-sm font-semibold text-white">
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

          <ChevronDown size={16} className="text-white/50" />
        </button>

      </div>
    </header>
  );
};

export default DashboardHeader;
