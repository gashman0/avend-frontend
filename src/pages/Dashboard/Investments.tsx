
import {
  TrendingUp,
  Clock3,
  CalendarDays,
  Wallet,
  ArrowUpRight,
  ChartNoAxesCombined,
  CircleCheck,
  Hourglass,
} from "lucide-react";

const investments = [
  {
    id: "INV-10025",
    plan: "Growth",
    asset: "USDT",
    principal: 2000,
    roiEarned: 320,
    dailyRoi: 16,
    roiRate: 0.8,
    duration: 45,
    elapsedDays: 20,
    remainingDays: 25,
    startDate: "Oct 25, 2026",
    maturityDate: "Dec 09, 2026",
    status: "Active",
  },
  {
    id: "INV-10024",
    plan: "Starter",
    asset: "BTC",
    principal: 500,
    roiEarned: 75,
    dailyRoi: 2.5,
    roiRate: 0.5,
    duration: 30,
    elapsedDays: 30,
    remainingDays: 0,
    startDate: "Oct 10, 2026",
    maturityDate: "Nov 09, 2026",
    status: "Matured",
  },
  {
    id: "INV-10023",
    plan: "Premium",
    asset: "ETH",
    principal: 5000,
    roiEarned: 1500,
    dailyRoi: 50,
    roiRate: 1,
    duration: 60,
    elapsedDays: 30,
    remainingDays: 30,
    startDate: "Oct 14, 2026",
    maturityDate: "Dec 13, 2026",
    status: "Active",
  },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);

const Investments = () => {
  const totalInvested = investments.reduce(
    (total, investment) => total + investment.principal,
    0
  );

  const totalRoiEarned = investments.reduce(
    (total, investment) => total + investment.roiEarned,
    0
  );

  const activeInvestments = investments.filter(
    (investment) => investment.status === "Active"
  );

  const activePrincipal = activeInvestments.reduce(
    (total, investment) => total + investment.principal,
    0
  );

  return (
    <div className="space-y-8 text-white">
      {/* Page heading */}
      <div>
        <h2 className="text-2xl font-semibold">My Investments</h2>
        <p className="mt-1 text-sm text-white/45">
          Monitor your active investments, ROI earnings and maturity dates.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-[#1B1F27] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/45">Total Invested</p>
            <Wallet size={19} className="text-white/40" />
          </div>
          <h3 className="mt-4 text-2xl font-semibold">
            {formatCurrency(totalInvested)}
          </h3>
          <p className="mt-2 text-xs text-white/35">
            Across all investments
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1B1F27] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/45">Active Principal</p>
            <ChartNoAxesCombined size={19} className="text-white/40" />
          </div>
          <h3 className="mt-4 text-2xl font-semibold">
            {formatCurrency(activePrincipal)}
          </h3>
          <p className="mt-2 text-xs text-white/35">
            Currently invested
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1B1F27] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/45">ROI Earned</p>
            <TrendingUp size={19} className="text-emerald-400" />
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-emerald-400">
            {formatCurrency(totalRoiEarned)}
          </h3>
          <p className="mt-2 text-xs text-white/35">
            ROI credited or earned to date
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1B1F27] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/45">Active Investments</p>
            <Hourglass size={19} className="text-white/40" />
          </div>
          <h3 className="mt-4 text-2xl font-semibold">
            {activeInvestments.length}
          </h3>
          <p className="mt-2 text-xs text-white/35">
            Currently running
          </p>
        </div>
      </div>

      {/* Investment list */}
      <section>
        <div className="mb-5">
          <h3 className="text-lg font-semibold">Your Investment Portfolio</h3>
          <p className="mt-1 text-sm text-white/40">
            View the progress of each investment.
          </p>
        </div>

        <div className="space-y-5">
          {investments.map((investment) => {
            const progress = Math.min(
              (investment.elapsedDays / investment.duration) * 100,
              100
            );

            const isActive = investment.status === "Active";

            return (
              <div
                key={investment.id}
                className="rounded-xl border border-white/10 bg-[#1B1F27] p-5 sm:p-6"
              >
                {/* Card heading */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h4 className="text-lg font-semibold">
                        {investment.plan} Plan
                      </h4>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                          isActive
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-blue-500/10 text-blue-400"
                        }`}
                      >
                        {isActive ? (
                          <Hourglass size={13} />
                        ) : (
                          <CircleCheck size={13} />
                        )}
                        {investment.status}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-white/40">
                      Reference: {investment.id}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-xs text-white/40">
                      Invested Principal
                    </p>
                    <p className="mt-1 text-xl font-semibold">
                      {formatCurrency(investment.principal)}
                    </p>
                    <p className="mt-1 text-xs text-white/40">
                      {investment.asset}
                    </p>
                  </div>
                </div>

                <div className="my-5 border-t border-white/10" />

                {/* Investment metrics */}
                <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
                  <div>
                    <p className="text-xs text-white/40">ROI Earned</p>
                    <p className="mt-2 font-semibold text-emerald-400">
                      {formatCurrency(investment.roiEarned)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-white/40">Daily ROI Credit</p>
                    <p className="mt-2 font-semibold">
                      {formatCurrency(investment.dailyRoi)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-white/40">ROI Rate</p>
                    <p className="mt-2 font-semibold">
                      {investment.roiRate}% daily
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-white/40">Duration</p>
                    <p className="mt-2 font-semibold">
                      {investment.duration} days
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-7">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium">Investment Progress</p>
                    <p className="text-sm text-white/50">
                      {progress.toFixed(0)}%
                    </p>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#E1161F] transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="mt-3 flex justify-between text-xs text-white/40">
                    <span>{investment.elapsedDays} days elapsed</span>
                    <span>{investment.remainingDays} days remaining</span>
                  </div>
                </div>

                {/* Dates */}
                <div className="mt-6 grid grid-cols-1 gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <CalendarDays size={18} className="text-white/40" />
                    <div>
                      <p className="text-xs text-white/40">Start Date</p>
                      <p className="mt-1 text-sm font-medium">
                        {investment.startDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock3 size={18} className="text-white/40" />
                    <div>
                      <p className="text-xs text-white/40">Maturity Date</p>
                      <p className="mt-1 text-sm font-medium">
                        {investment.maturityDate}
                      </p>
                    </div>
                  </div>
                </div>

                {!isActive && (
                  <div className="mt-5 flex items-center gap-2 rounded-lg bg-blue-500/10 p-3 text-sm text-blue-300">
                    <CircleCheck size={17} />
                    This investment has reached maturity.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Investment note */}
      <div className="rounded-xl border border-white/10 bg-[#1B1F27] p-5">
        <div className="flex items-start gap-3">
          <ArrowUpRight size={20} className="mt-0.5 shrink-0 text-white/50" />
          <div>
            <h4 className="text-sm font-semibold">Understanding your ROI</h4>
            <p className="mt-1 text-sm leading-6 text-white/45">
              ROI is credited to your available wallet balance according
              to the applicable investment terms. Your original principal
              remains invested until maturity, when it becomes available
              according to the plan conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investments;
