
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  Wallet,
  Search,
  ArrowDownToLine,
  ArrowUpFromLine,
  RefreshCw,
  CircleCheck,
  Clock3,
  CircleX,
  Eye,
  X,
  Gift,
} from "lucide-react";
import { userTransactions } from "../../network/me";

type TransactionType =
  | "Deposit"
  | "Investment"
  | "ROI Credit"
  | "Principal Return"
  | "Withdrawal"
  | "Referral Reward";

type TransactionStatus =
  | "Completed"
  | "Pending"
  | "Failed"
  | "Rejected";

type Transaction = {
  id: string;
  type: TransactionType;
  asset: string;
  amount: number;
  usdValue: number;
  date: string;
  status: TransactionStatus;
  description: string;
  txid?: string;
};

type TransactionsResponse = {
  success: boolean;
  count: number;
  transactions: Transaction[];
};

const typeOptions = [
  "All Types",
  "Deposit",
  "Investment",
  "ROI Credit",
  "Principal Return",
  "Withdrawal",
  "Referral Reward",
];

const statusOptions = [
  "All Statuses",
  "Completed",
  "Pending",
  "Failed",
  "Rejected",
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);

const formatCrypto = (amount: number, asset: string) =>
  `${amount.toLocaleString("en-US", {
    maximumFractionDigits: 8,
  })} ${asset}`;

const formatDate = (date: string) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getTypeIcon = (type: TransactionType) => {
  switch (type) {
    case "Deposit":
      return <ArrowDownLeft size={17} />;
    case "Investment":
      return <TrendingUp size={17} />;
    case "ROI Credit":
      return <Wallet size={17} />;
    case "Principal Return":
      return <RefreshCw size={17} />;
    case "Withdrawal":
      return <ArrowUpRight size={17} />;
    case "Referral Reward":
      return <Gift size={17} />;
  }
};

const getTypeColor = (type: TransactionType) => {
  switch (type) {
    case "Deposit":
      return "bg-emerald-500/10 text-emerald-400";
    case "Investment":
      return "bg-blue-500/10 text-blue-400";
    case "ROI Credit":
      return "bg-purple-500/10 text-purple-400";
    case "Principal Return":
      return "bg-cyan-500/10 text-cyan-400";
    case "Withdrawal":
      return "bg-orange-500/10 text-orange-400";
    case "Referral Reward":
      return "bg-pink-500/10 text-pink-400";
  }
};

const getStatusStyle = (status: TransactionStatus) => {
  switch (status) {
    case "Completed":
      return "bg-emerald-500/10 text-emerald-400";
    case "Pending":
      return "bg-yellow-500/10 text-yellow-400";
    case "Failed":
      return "bg-red-500/10 text-red-400";
    case "Rejected":
      return "bg-orange-500/10 text-orange-400";
  }
};

const getStatusIcon = (status: TransactionStatus) => {
  switch (status) {
    case "Completed":
      return <CircleCheck size={13} />;
    case "Pending":
      return <Clock3 size={13} />;
    case "Failed":
    case "Rejected":
      return <CircleX size={13} />;
  }
};

const Transactions = () => {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  // Fetch transactions from the backend
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery<TransactionsResponse>({
    queryKey: ["user-transactions"],
    queryFn: userTransactions,
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const transactions = data?.transactions ?? [];

  // Search and filters
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const searchTerm = search.toLowerCase();

      const matchesSearch =
        transaction.id.toLowerCase().includes(searchTerm) ||
        transaction.asset.toLowerCase().includes(searchTerm) ||
        transaction.description.toLowerCase().includes(searchTerm) ||
        transaction.type.toLowerCase().includes(searchTerm);

      const matchesType =
        selectedType === "All Types" ||
        transaction.type === selectedType;

      const matchesStatus =
        selectedStatus === "All Statuses" ||
        transaction.status === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [transactions, search, selectedType, selectedStatus]);

  // Summary calculations
  const totalDeposits = transactions
    .filter(
      (transaction) =>
        transaction.type === "Deposit" &&
        transaction.status === "Completed"
    )
    .reduce((total, transaction) => total + transaction.usdValue, 0);

  const totalWithdrawals = transactions
    .filter(
      (transaction) =>
        transaction.type === "Withdrawal" &&
        transaction.status === "Completed"
    )
    .reduce((total, transaction) => total + transaction.usdValue, 0);

  const totalRoi = transactions
    .filter(
      (transaction) =>
        transaction.type === "ROI Credit" &&
        transaction.status === "Completed"
    )
    .reduce((total, transaction) => total + transaction.usdValue, 0);

  const totalReferralRewards = transactions
    .filter(
      (transaction) =>
        transaction.type === "Referral Reward" &&
        transaction.status === "Completed"
    )
    .reduce((total, transaction) => total + transaction.usdValue, 0);

  const completedCount = transactions.filter(
    (transaction) => transaction.status === "Completed"
  ).length;

  return (
    <div className="space-y-8 text-white">
      {/* Page heading */}
      <div>
        <h2 className="text-2xl font-semibold">Transactions</h2>
        <p className="mt-1 text-sm text-white/45">
          View and track all financial activity on your account.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-[#1B1F27] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/45">Total Deposits</p>
            <ArrowDownToLine size={19} className="text-emerald-400" />
          </div>
          <h3 className="mt-4 text-2xl font-semibold">
            {formatCurrency(totalDeposits)}
          </h3>
          <p className="mt-2 text-xs text-white/35">
            Successfully credited deposits
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1B1F27] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/45">Total Withdrawals</p>
            <ArrowUpFromLine size={19} className="text-orange-400" />
          </div>
          <h3 className="mt-4 text-2xl font-semibold">
            {formatCurrency(totalWithdrawals)}
          </h3>
          <p className="mt-2 text-xs text-white/35">
            Successfully completed withdrawals
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1B1F27] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/45">Total ROI Credits</p>
            <TrendingUp size={19} className="text-purple-400" />
          </div>
          <h3 className="mt-4 text-2xl font-semibold">
            {formatCurrency(totalRoi)}
          </h3>
          <p className="mt-2 text-xs text-white/35">
            Successfully credited ROI
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#1B1F27] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/45">Referral Rewards</p>
            <Gift size={19} className="text-pink-400" />
          </div>
          <h3 className="mt-4 text-2xl font-semibold">
            {formatCurrency(totalReferralRewards)}
          </h3>
          <p className="mt-2 text-xs text-white/35">
            Successfully credited rewards
          </p>
        </div>
      </div>

      {/* Transaction history */}
      <section>
        <div className="mb-5">
          <h3 className="text-lg font-semibold">Transaction History</h3>
          <p className="mt-1 text-sm text-white/40">
            A complete record of your account activity.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-5 flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
            />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search transaction reference, asset, or type..."
              className="w-full rounded-lg border border-white/10 bg-[#1B1F27] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#E1161F]/60"
            />
          </div>

          <select
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
            className="rounded-lg border border-white/10 bg-[#1B1F27] px-4 py-3 text-sm text-white outline-none focus:border-[#E1161F]/60"
          >
            {typeOptions.map((option) => (
              <option key={option} value={option} className="bg-[#1B1F27]">
                {option}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
            className="rounded-lg border border-white/10 bg-[#1B1F27] px-4 py-3 text-sm text-white outline-none focus:border-[#E1161F]/60"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option} className="bg-[#1B1F27]">
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="rounded-xl border border-white/10 bg-[#1B1F27] px-5 py-16 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#E1161F]" />
            <p className="mt-4 text-sm text-white/45">
              Loading your transactions...
            </p>
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="rounded-xl border border-red-500/20 bg-[#1B1F27] px-5 py-12 text-center">
            <CircleX size={30} className="mx-auto text-red-400" />
            <p className="mt-3 text-sm text-white/70">
              We couldn't load your transactions.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="mt-4 rounded-lg bg-[#E1161F] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#c9131b] disabled:opacity-50"
            >
              {isFetching ? "Retrying..." : "Try Again"}
            </button>
          </div>
        )}

        {/* Transactions table */}
        {!isLoading && !isError && (
          <>
            <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#1B1F27]">
              <table className="w-full min-w-[900px] text-left">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/40">
                    <th className="px-5 py-4 font-medium">Transaction</th>
                    <th className="px-5 py-4 font-medium">Asset</th>
                    <th className="px-5 py-4 font-medium">Amount</th>
                    <th className="px-5 py-4 font-medium">USD Value</th>
                    <th className="px-5 py-4 font-medium">Date</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                    <th className="px-5 py-4 font-medium">Details</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-white/5 last:border-0 transition hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-lg ${getTypeColor(
                              transaction.type
                            )}`}
                          >
                            {getTypeIcon(transaction.type)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {transaction.type}
                            </p>
                            <p className="mt-1 text-xs text-white/40">
                              {transaction.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm font-medium">
                        {transaction.asset}
                      </td>

                      <td className="px-5 py-4 text-sm">
                        {formatCrypto(transaction.amount, transaction.asset)}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium">
                        {formatCurrency(transaction.usdValue)}
                      </td>

                      <td className="px-5 py-4 text-sm text-white/50">
                        {formatDate(transaction.date)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                            transaction.status
                          )}`}
                        >
                          {getStatusIcon(transaction.status)}
                          {transaction.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => setSelectedTransaction(transaction)}
                          className="flex items-center gap-1.5 text-sm text-white/50 transition hover:text-white"
                        >
                          <Eye size={16} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-12 text-center text-sm text-white/40"
                      >
                        No transactions found. Try changing your search or filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-xs text-white/35">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </p>
          </>
        )}
      </section>

      {/* Transaction details modal */}
      {selectedTransaction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedTransaction(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="transaction-details-title"
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#1B1F27] p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3
                id="transaction-details-title"
                className="text-lg font-semibold"
              >
                Transaction Details
              </h3>

              <button
                type="button"
                aria-label="Close transaction details"
                onClick={() => setSelectedTransaction(null)}
                className="rounded-lg p-2 text-white/50 transition hover:bg-white/5 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <div className="mt-6 rounded-xl bg-white/[0.04] p-5 text-center">
              <div
                className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${getTypeColor(
                  selectedTransaction.type
                )}`}
              >
                {getTypeIcon(selectedTransaction.type)}
              </div>

              <p className="mt-3 text-sm text-white/45">
                {selectedTransaction.type}
              </p>

              <h4 className="mt-1 text-2xl font-semibold">
                {formatCrypto(
                  selectedTransaction.amount,
                  selectedTransaction.asset
                )}
              </h4>

              <p className="mt-1 text-sm text-white/40">
                {formatCurrency(selectedTransaction.usdValue)}
              </p>

              <span
                className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                  selectedTransaction.status
                )}`}
              >
                {getStatusIcon(selectedTransaction.status)}
                {selectedTransaction.status}
              </span>
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-white/40">Reference</span>
                <span className="font-medium">
                  {selectedTransaction.id}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-sm">
                <span className="text-white/40">Date</span>
                <span className="text-right">
                  {formatDate(selectedTransaction.date)}
                </span>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-xs text-white/40">Description</p>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  {selectedTransaction.description}
                </p>
              </div>

              {selectedTransaction.txid && (
                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs text-white/40">
                    Blockchain Transaction ID
                  </p>
                  <p className="mt-2 break-all text-xs leading-5 text-white/70">
                    {selectedTransaction.txid}
                  </p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setSelectedTransaction(null)}
              className="mt-6 w-full rounded-lg bg-[#E1161F] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#c9131b]"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
