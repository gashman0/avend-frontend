
import {
  Wallet,
  BriefcaseBusiness,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  ChevronRight,
  CalendarDays,
  CircleDollarSign,
} from "lucide-react";

// Temporary sample data.
// We will replace this with your backend data later.

const accountSummary = [
  {
    title: "Available Balance",
    amount: "$2,450.00",
    description: "Available for investment or withdrawal",
    icon: Wallet,
  },
  {
    title: "Total Invested",
    amount: "$10,000.00",
    description: "Capital in active investments",
    icon: BriefcaseBusiness,
  },
  {
    title: "ROI Earned",
    amount: "$450.00",
    description: "Returns credited to your wallet",
    icon: TrendingUp,
  },
  {
    title: "Active Investments",
    amount: "02",
    description: "Currently running investment plans",
    icon: Clock,
  },
];

const investments = [
  {
    id: "ACV-001",
    name: "Premium Growth Plan",
    principal: 5000,
    roiEarned: 225,
    dailyRoi: 15,
    duration: 30,
    startDate: "2026-11-01",
    maturityDate: "2026-12-01",
    status: "Active",
  },
  {
    id: "ACV-002",
    name: "Starter Investment Plan",
    principal: 5000,
    roiEarned: 225,
    dailyRoi: 7.5,
    duration: 60,
    startDate: "2026-10-25",
    maturityDate: "2026-12-24",
    status: "Active",
  },
];

const transactions = [
  {
    id: "TXN-001",
    title: "Bitcoin Deposit",
    description: "BTC deposit",
    amount: "+$1,000.00",
    date: "Nov 12, 2026",
    type: "deposit",
    status: "Completed",
  },
  {
    id: "TXN-002",
    title: "Investment Allocation",
    description: "Premium Growth Plan",
    amount: "-$500.00",
    date: "Nov 11, 2026",
    type: "investment",
    status: "Completed",
  },
  {
    id: "TXN-003",
    title: "Daily ROI Credit",
    description: "Premium Growth Plan",
    amount: "+$15.00",
    date: "Nov 11, 2026",
    type: "roi",
    status: "Completed",
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const getInvestmentProgress = (
  startDate: string,
  maturityDate: string
) => {
  const start = new Date(`${startDate}T00:00:00`);
  const maturity = new Date(`${maturityDate}T00:00:00`);
  const today = new Date();

  const totalDuration = Math.max(
    1,
    Math.ceil(
      (maturity.getTime() - start.getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  const elapsed = Math.max(
    0,
    Math.min(
      totalDuration,
      Math.floor(
        (today.getTime() - start.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    )
  );

  const remaining = Math.max(0, totalDuration - elapsed);

  return {
    elapsed,
    remaining,
    percentage: Math.round((elapsed / totalDuration) * 100),
  };
};

const formatDate = (date: string) => {
  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#15181E] p-6 text-white md:p-8">

      {/* Page heading */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">
          Overview
        </h2>

        <p className="mt-2 text-sm text-white/50">
          Monitor your funds, investments and returns.
        </p>
      </div>

      {/* Account summary */}
      <section className="mb-8">

        {/* Total portfolio value */}
        <div className="mb-5 rounded-xl border border-white/10 bg-white/[0.03] p-6">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

            <div>
              <p className="text-sm text-white/50">
                Total Portfolio Value
              </p>

              <h3 className="mt-2 text-3xl font-semibold tracking-tight">
                $12,450.00
              </h3>

              <p className="mt-2 text-xs text-white/40">
                Available balance + invested capital
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#E1161F] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#c9121b]"
              >
                <Plus size={18} />
                Deposit Funds
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                <BriefcaseBusiness size={18} />
                Explore Plans
              </button>

            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {accountSummary.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20"
              >
                <div className="mb-5 flex items-center justify-between">

                  <p className="text-sm text-white/50">
                    {item.title}
                  </p>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E1161F]/10 text-[#E1161F]">
                    <Icon size={20} />
                  </div>

                </div>

                <h3 className="text-2xl font-semibold">
                  {item.amount}
                </h3>

                <p className="mt-2 text-xs text-white/40">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>
      </section>

      {/* Active investments */}
      <section className="mb-8">

        <div className="mb-5 flex items-center justify-between">

          <div>
            <h3 className="text-lg font-semibold">
              My Active Investments
            </h3>

            <p className="mt-1 text-sm text-white/40">
              Track your investment progress and daily returns.
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-1 text-sm text-[#E1161F] transition hover:text-white"
          >
            View all
            <ChevronRight size={17} />
          </button>

        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

          {investments.map((investment) => {
            const progress = getInvestmentProgress(
              investment.startDate,
              investment.maturityDate
            );

            return (
              <div
                key={investment.id}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >

                {/* Investment heading */}
                <div className="mb-6 flex items-start justify-between">

                  <div>
                    <div className="mb-2 flex items-center gap-2">

                      <span className="rounded-md bg-[#E1161F]/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#E1161F]">
                        {investment.id}
                      </span>

                      <span className="rounded-full bg-green-500/10 px-2 py-1 text-[10px] font-medium text-green-400">
                        {investment.status}
                      </span>

                    </div>

                    <h4 className="text-base font-semibold">
                      {investment.name}
                    </h4>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E1161F]/10 text-[#E1161F]">
                    <CircleDollarSign size={21} />
                  </div>

                </div>

                {/* Investment figures */}
                <div className="mb-6 grid grid-cols-2 gap-y-5">

                  <div>
                    <p className="mb-1 text-xs text-white/40">
                      Invested Capital
                    </p>

                    <p className="text-base font-semibold">
                      {formatCurrency(investment.principal)}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs text-white/40">
                      ROI Earned
                    </p>

                    <p className="text-base font-semibold text-green-400">
                      {formatCurrency(investment.roiEarned)}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs text-white/40">
                      Daily ROI Credit
                    </p>

                    <p className="text-sm font-medium">
                      {formatCurrency(investment.dailyRoi)}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs text-white/40">
                      Days Remaining
                    </p>

                    <p className="text-sm font-medium">
                      {progress.remaining} days
                    </p>
                  </div>

                </div>

                {/* Investment progress */}
                <div className="mb-5">

                  <div className="mb-2 flex items-center justify-between">

                    <p className="text-xs text-white/50">
                      Investment Progress
                    </p>

                    <p className="text-xs font-medium">
                      {progress.percentage}%
                    </p>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">

                    <div
                      className="h-full rounded-full bg-[#E1161F] transition-all duration-500"
                      style={{
                        width: `${progress.percentage}%`,
                      }}
                    />

                  </div>

                  <div className="mt-2 flex justify-between text-[11px] text-white/40">

                    <span>
                      {progress.elapsed} days elapsed
                    </span>

                    <span>
                      {investment.duration} days total
                    </span>

                  </div>

                </div>

                {/* Investment dates */}
                <div className="flex flex-col justify-between gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center">

                  <div className="flex items-center gap-2 text-xs text-white/50">

                    <CalendarDays size={15} />

                    Matures: {formatDate(investment.maturityDate)}

                  </div>

                  <button
                    type="button"
                    className="flex items-center gap-1 text-xs font-medium text-[#E1161F] transition hover:text-white"
                  >
                    View details
                    <ArrowUpRight size={14} />
                  </button>

                </div>

              </div>
            );
          })}

        </div>
      </section>

      {/* Recent transactions */}
      <section className="rounded-xl border border-white/10 bg-white/[0.03]">

        <div className="flex items-center justify-between border-b border-white/10 p-5">

          <div>
            <h3 className="text-lg font-semibold">
              Recent Transactions
            </h3>

            <p className="mt-1 text-sm text-white/40">
              Your latest account activity.
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-1 text-sm text-[#E1161F] transition hover:text-white"
          >
            View all
            <ChevronRight size={17} />
          </button>

        </div>

        <div className="divide-y divide-white/10">

          {transactions.map((transaction) => {

            const isPositive =
              transaction.type === "deposit" ||
              transaction.type === "roi";

            const TransactionIcon =
              transaction.type === "investment"
                ? ArrowUpRight
                : ArrowDownLeft;

            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between gap-3 px-5 py-4"
              >

                <div className="flex min-w-0 items-center gap-3">

                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    isPositive
                      ? "bg-green-500/10 text-green-400"
                      : "bg-[#E1161F]/10 text-[#E1161F]"
                  }`}>
                    <TransactionIcon size={18} />
                  </div>

                  <div className="min-w-0">

                    <p className="truncate text-sm font-medium">
                      {transaction.title}
                    </p>

                    <p className="mt-1 truncate text-xs text-white/40">
                      {transaction.description} · {transaction.date}
                    </p>

                  </div>

                </div>

                <div className="shrink-0 text-right">

                  <p className={`text-sm font-semibold ${
                    isPositive
                      ? "text-green-400"
                      : "text-white"
                  }`}>
                    {transaction.amount}
                  </p>

                  <p className="mt-1 text-[11px] text-green-400">
                    {transaction.status}
                  </p>

                </div>

              </div>
            );
          })}

        </div>
      </section>

    </div>
  );
};

export default Dashboard;
