
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
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDashboard } from "../../network/me/queries";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount ?? 0);
};

const formatDate = (date: string) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getInvestmentProgress = (
  startDate: string,
  maturityDate: string
) => {
  const start = new Date(startDate).getTime();
  const maturity = new Date(maturityDate).getTime();
  const today = Date.now();

  if (
    !Number.isFinite(start) ||
    !Number.isFinite(maturity) ||
    maturity <= start
  ) {
    return {
      elapsed: 0,
      remaining: 0,
      percentage: 0,
    };
  }

  const totalDuration = Math.ceil(
    (maturity - start) / (1000 * 60 * 60 * 24)
  );

  const elapsed = Math.max(
    0,
    Math.min(
      totalDuration,
      Math.floor((today - start) / (1000 * 60 * 60 * 24))
    )
  );

  return {
    elapsed,
    remaining: Math.max(0, totalDuration - elapsed),
    percentage: Math.round((elapsed / totalDuration) * 100),
  };
};

const getTransactionTitle = (type: string) => {
  const titles: Record<string, string> = {
    deposit: "Deposit",
    withdrawal: "Withdrawal",
    investment: "Investment Allocation",
    roi: "ROI Credit",
    referral_reward: "Referral Reward",
  };

  return titles[type?.toLowerCase()] || type;
};

const isPositiveTransaction = (type: string) => {
  return ["deposit", "roi", "referral_reward"].includes(
    type?.toLowerCase()
  );
};

const getStatusStyle = (status: string) => {
  switch (status?.toLowerCase()) {
    case "active":
    case "completed":
    case "approved":
      return "bg-green-500/10 text-green-400";

    case "pending":
      return "bg-amber-500/10 text-amber-400";

    case "rejected":
    case "failed":
    case "cancelled":
      return "bg-red-500/10 text-red-400";

    default:
      return "bg-white/10 text-white/60";
  }
};

const Dashboard = () => {
  const {
    data: dashboard,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useDashboard();

  // Loading state
  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw
            size={28}
            className="animate-spin text-[#E1161F]"
          />
          <p className="text-sm text-white/50">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !dashboard) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-white">
        <div className="max-w-md text-center">
          <h2 className="text-xl font-semibold">
            Unable to load dashboard
          </h2>

          <p className="mt-2 text-sm text-white/50">
            Something went wrong while retrieving your account information.
            Please try again.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#E1161F] px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={isFetching ? "animate-spin" : ""}
            />
            Try again
          </button>
        </div>
      </div>
    );
  }

  const accountSummary = [
    {
      title: "Available Balance",
      amount: dashboard.availableBalance,
      description: "Available for investment or withdrawal",
      icon: Wallet,
    },
    {
      title: "Total Invested",
      amount: dashboard.totalInvested,
      description: "Capital currently invested",
      icon: BriefcaseBusiness,
    },
    {
      title: "ROI Earned",
      amount: dashboard.roiEarned,
      description: "Returns credited to your wallet",
      icon: TrendingUp,
    },
    {
      title: "Active Investments",
      amount: dashboard.activeInvestmentCount,
      description: "Currently running investment plans",
      icon: Clock,
      isCount: true,
    },
  ];

  const investments = dashboard.activeInvestments ?? [];
  const transactions = dashboard.recentTransactions ?? [];

  return (
    <div className="min-h-screen bg-[#15181E] p-4 text-white sm:p-6 md:p-8">

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
        <div className="mb-5 rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

            <div>
              <p className="text-sm text-white/50">
                Total Portfolio Value
              </p>

              <h3 className="mt-2 text-3xl font-semibold tracking-tight">
                {formatCurrency(dashboard.totalPortfolioValue)}
              </h3>

              <p className="mt-2 text-xs text-white/40">
                Available balance + invested capital
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/wallet"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#E1161F] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#c9121b]"
              >
                <Plus size={18} />
                Deposit Funds
              </Link>

              <Link
                to="/plans"
                className="flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                <BriefcaseBusiness size={18} />
                Explore Plans
              </Link>
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
                  {item.isCount
                    ? String(item.amount).padStart(2, "0")
                    : formatCurrency(item.amount)}
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
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">
              My Active Investments
            </h3>

            <p className="mt-1 text-sm text-white/40">
              Track your investment progress and returns.
            </p>
          </div>

          <Link
            to="/investments"
            className="flex shrink-0 items-center gap-1 text-sm text-[#E1161F] transition hover:text-white"
          >
            View all
            <ChevronRight size={17} />
          </Link>
        </div>

        {investments.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-12 text-center">
            <BriefcaseBusiness
              size={30}
              className="mx-auto text-white/30"
            />

            <h4 className="mt-4 font-semibold">
              No active investments yet
            </h4>

            <p className="mt-2 text-sm text-white/40">
              Your active investments will appear here once you invest.
            </p>

            <Link
              to="/plans"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#E1161F] px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Explore Investment Plans
              <ArrowUpRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {investments.map((investment) => {
              const progress = getInvestmentProgress(
                investment.startDate,
                investment.maturityDate
              );

              return (
                <div
                  key={investment._id}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
                >
                  {/* Investment heading */}
                  <div className="mb-6 flex items-start justify-between gap-3">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-[#E1161F]/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#E1161F]">
                          {investment.asset}
                        </span>

                        <span
                          className={`rounded-full px-2 py-1 text-[10px] font-medium capitalize ${getStatusStyle(investment.status)}`}
                        >
                          {investment.status}
                        </span>
                      </div>

                      <h4 className="text-base font-semibold">
                        {investment.plan}
                      </h4>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E1161F]/10 text-[#E1161F]">
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
                        {formatCurrency(investment.amount)}
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
                        ROI Rate
                      </p>

                      <p className="text-sm font-medium">
                        {investment.roiRate}%
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
                      <span>{progress.elapsed} days elapsed</span>
                      <span>{investment.durationDays} days total</span>
                    </div>
                  </div>

                  {/* Investment dates */}
                  <div className="flex flex-col justify-between gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <CalendarDays size={15} />
                      Matures: {formatDate(investment.maturityDate)}
                    </div>

                    <Link
                      to="/investments"
                      className="flex items-center gap-1 text-xs font-medium text-[#E1161F] transition hover:text-white"
                    >
                      View details
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Recent transactions */}
      <section className="rounded-xl border border-white/10 bg-white/[0.03]">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 p-5">
          <div>
            <h3 className="text-lg font-semibold">
              Recent Transactions
            </h3>

            <p className="mt-1 text-sm text-white/40">
              Your latest account activity.
            </p>
          </div>

          <Link
            to="/transactions"
            className="flex shrink-0 items-center gap-1 text-sm text-[#E1161F] transition hover:text-white"
          >
            View all
            <ChevronRight size={17} />
          </Link>
        </div>

        {transactions.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <Clock
              size={28}
              className="mx-auto text-white/30"
            />

            <h4 className="mt-4 font-semibold">
              No transactions yet
            </h4>

            <p className="mt-2 text-sm text-white/40">
              Your recent account activity will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {transactions.map((transaction) => {
              const positive = isPositiveTransaction(transaction.type);
              const TransactionIcon = positive
                ? ArrowDownLeft
                : ArrowUpRight;

              return (
                <div
                  key={transaction._id}
                  className="flex items-center justify-between gap-3 px-5 py-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        positive
                          ? "bg-green-500/10 text-green-400"
                          : "bg-[#E1161F]/10 text-[#E1161F]"
                      }`}
                    >
                      <TransactionIcon size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {getTransactionTitle(transaction.type)}
                      </p>

                      <p className="mt-1 truncate text-xs text-white/40">
                        {transaction.asset} · {formatDate(transaction.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p
                      className={`text-sm font-semibold ${
                        positive ? "text-green-400" : "text-white"
                      }`}
                    >
                      {positive ? "+" : "-"}
                      {formatCurrency(transaction.amountUSD)}
                    </p>

                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${getStatusStyle(transaction.status)}`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
