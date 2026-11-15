
import {
  Wallet as WalletIcon,
  ArrowDownToLine,
  ArrowUpFromLine,
  Clock3,
  CircleCheck,
  CircleAlert,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../../network/me/queries";

const assetDetails = {
  BTC: {
    name: "Bitcoin",
    initial: "₿",
    color: "bg-orange-500/10 text-orange-400",
  },
  ETH: {
    name: "Ethereum",
    initial: "Ξ",
    color: "bg-indigo-500/10 text-indigo-400",
  },
  USDT: {
    name: "Tether",
    initial: "₮",
    color: "bg-emerald-500/10 text-emerald-400",
  },
  BNB: {
    name: "BNB",
    initial: "◆",
    color: "bg-yellow-500/10 text-yellow-400",
  },
  SOL: {
    name: "Solana",
    initial: "◎",
    color: "bg-purple-500/10 text-purple-400",
  },
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const formatCrypto = (value: number) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 8,
  }).format(value);

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

const Wallet = () => {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useWallet();

  const wallet = data?.wallet;
  const recentDeposits = data?.recentDeposits ?? [];

  const assets = wallet
    ? (Object.entries(assetDetails) as [
        keyof typeof assetDetails,
        (typeof assetDetails)[keyof typeof assetDetails],
      ][]).map(([symbol, details]) => {
        const assetBalance = wallet.assets?.[symbol];

        return {
          symbol,
          ...details,
          balance: assetBalance?.balance ?? 0,
          valueUSD: assetBalance?.valueUSD ?? 0,
          priceUSD: assetBalance?.priceUSD ?? 0,
        };
      })
    : [];

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-white/60">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#E1161F]" />
          <p className="text-sm">Loading your wallet...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center text-white">
        <CircleAlert size={36} className="mb-4 text-red-400" />
        <h3 className="text-lg font-semibold">Unable to load wallet</h3>
        <p className="mt-2 max-w-sm text-sm text-white/45">
          We couldn't retrieve your wallet information. Please try again.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-5 rounded-lg bg-[#E1161F] px-5 py-2.5 text-sm font-semibold transition hover:bg-[#c9131b]"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-white">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold">My Wallet</h2>
          <p className="mt-1 text-sm text-white/45">
            Manage your crypto balances and deposits.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/dashboard/wallet/deposit")}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#E1161F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c9131b]"
        >
          <Plus size={18} />
          Deposit Funds
        </button>
      </div>

      {/* Total balance */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#242932] to-[#191d24] p-7">
        <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full bg-[#E1161F]/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-2 text-sm text-white/55">
            <WalletIcon size={18} />
            Total Wallet Balance
          </div>

          <h3 className="mt-4 text-4xl font-semibold tracking-tight">
            {formatCurrency(wallet?.totalBalanceUSD ?? 0)}
          </h3>

          <p className="mt-2 text-sm text-white/40">
            Combined USD value of your available crypto assets
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("/dashboard/wallet/deposit")}
              className="flex items-center gap-2 rounded-lg bg-[#E1161F] px-5 py-2.5 text-sm font-medium transition hover:bg-[#c9131b]"
            >
              <ArrowDownToLine size={17} />
              Deposit
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard/transactions")}
              className="flex items-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-white/75 transition hover:bg-white/5"
            >
              <ArrowUpFromLine size={17} />
              View Transactions
            </button>
          </div>
        </div>
      </div>

      {/* Crypto assets */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Your Assets</h3>
            <p className="mt-1 text-sm text-white/40">
              Your available cryptocurrency balances
            </p>
          </div>
          <span className="text-xs text-white/40">
            {assets.length} supported assets
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#1B1F27]">
          {assets.map((asset, index) => (
            <div
              key={asset.symbol}
              className={`flex flex-col gap-4 px-5 py-5 transition hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between ${
                index !== assets.length - 1
                  ? "border-b border-white/10"
                  : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-xl font-semibold ${asset.color}`}
                >
                  {asset.initial}
                </div>

                <div>
                  <p className="font-medium">{asset.name}</p>
                  <p className="mt-1 text-xs text-white/40">
                    {asset.symbol}
                  </p>
                </div>
              </div>

              <div className="sm:text-right">
                <p className="font-semibold">
                  {formatCrypto(asset.balance)} {asset.symbol}
                </p>
                <p className="mt-1 text-xs text-white/45">
                  {formatCurrency(asset.valueUSD)}
                </p>
                <p className="mt-1 text-xs text-white/35">
                  Price: {formatCurrency(asset.priceUSD)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deposit history */}
      <section>
        <div className="mb-5">
          <h3 className="text-lg font-semibold">Recent Deposits</h3>
          <p className="mt-1 text-sm text-white/40">
            Track the status of your recent deposit requests
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#1B1F27]">
          <table className="w-full min-w-[650px] text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/40">
                <th className="px-5 py-4 font-medium">Reference</th>
                <th className="px-5 py-4 font-medium">Asset</th>
                <th className="px-5 py-4 font-medium">Amount</th>
                <th className="px-5 py-4 font-medium">Date</th>
                <th className="px-5 py-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentDeposits.length > 0 ? (
                recentDeposits.map((deposit) => (
                  <tr
                    key={deposit._id}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="px-5 py-4 text-sm text-white/70">
                      {deposit.transactionId}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium">
                      {deposit.asset}
                    </td>

                    <td className="px-5 py-4 text-sm">
                      {formatCrypto(deposit.amount)} {deposit.asset}
                    </td>

                    <td className="px-5 py-4 text-sm text-white/50">
                      {formatDate(deposit.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                          deposit.status === "completed" ||
                          deposit.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : deposit.status === "rejected" ||
                                deposit.status === "failed"
                              ? "bg-red-500/10 text-red-400"
                              : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {deposit.status === "completed" ||
                        deposit.status === "approved" ? (
                          <CircleCheck size={13} />
                        ) : deposit.status === "rejected" ||
                          deposit.status === "failed" ? (
                          <CircleAlert size={13} />
                        ) : (
                          <Clock3 size={13} />
                        )}

                        {deposit.status.replaceAll("_", " ")}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-sm text-white/40"
                  >
                    You haven't made any deposits yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Wallet;
