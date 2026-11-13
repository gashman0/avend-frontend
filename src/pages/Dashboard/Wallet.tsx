
import {
  Wallet as WalletIcon,
  ArrowDownToLine,
  ArrowUpFromLine,
  Bitcoin,
  Clock3,
  CircleCheck,
  CircleAlert,
  Copy,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const assets = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    balance: "0.045 BTC",
    value: "$4,320.00",
    price: "$96,000.00",
    color: "bg-orange-500/10 text-orange-400",
    initial: "₿",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    balance: "1.25 ETH",
    value: "$3,125.00",
    price: "$2,500.00",
    color: "bg-indigo-500/10 text-indigo-400",
    initial: "Ξ",
  },
  {
    name: "Tether",
    symbol: "USDT",
    balance: "2,500 USDT",
    value: "$2,500.00",
    price: "$1.00",
    color: "bg-emerald-500/10 text-emerald-400",
    initial: "₮",
  },
  {
    name: "BNB",
    symbol: "BNB",
    balance: "4 BNB",
    value: "$2,400.00",
    price: "$600.00",
    color: "bg-yellow-500/10 text-yellow-400",
    initial: "◆",
  },
  {
    name: "Solana",
    symbol: "SOL",
    balance: "15 SOL",
    value: "$2,250.00",
    price: "$150.00",
    color: "bg-purple-500/10 text-purple-400",
    initial: "◎",
  },
];

const deposits = [
  {
    id: "DEP-10245",
    asset: "USDT",
    amount: "1,000 USDT",
    date: "Nov 12, 2026",
    status: "Approved",
  },
  {
    id: "DEP-10244",
    asset: "BTC",
    amount: "0.015 BTC",
    date: "Nov 10, 2026",
    status: "Pending Review",
  },
  {
    id: "DEP-10243",
    asset: "ETH",
    amount: "0.5 ETH",
    date: "Nov 08, 2026",
    status: "Approved",
  },
];

const Wallet = () => {
  const navigate = useNavigate();

  const totalBalance = "$14,595.00";

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
            {totalBalance}
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
          <span className="text-xs text-white/40">5 supported assets</span>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#1B1F27]">
          {assets.map((asset, index) => (
            <div
              key={asset.symbol}
              className={`flex flex-col gap-4 px-5 py-5 transition hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between ${
                index !== assets.length - 1 ? "border-b border-white/10" : ""
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
                <p className="font-semibold">{asset.balance}</p>
                <p className="mt-1 text-xs text-white/45">
                  {asset.value}
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
              {deposits.map((deposit) => (
                <tr
                  key={deposit.id}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="px-5 py-4 text-sm text-white/70">
                    {deposit.id}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium">
                    {deposit.asset}
                  </td>
                  <td className="px-5 py-4 text-sm">
                    {deposit.amount}
                  </td>
                  <td className="px-5 py-4 text-sm text-white/50">
                    {deposit.date}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                        deposit.status === "Approved"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {deposit.status === "Approved" ? (
                        <CircleCheck size={13} />
                      ) : (
                        <Clock3 size={13} />
                      )}
                      {deposit.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Wallet;
