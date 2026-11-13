
import { useState } from "react";
import {
  Users,
  UserCheck,
  Gift,
  Wallet,
  Copy,
  Check,
  Share2,
  Clock3,
  CircleCheck,
  CircleAlert,
  ArrowUpRight,
} from "lucide-react";

const referralLink = "https://avendcrest.com/signup?ref=AC1024";

const referrals = [
  {
    id: "REF-10025",
    name: "Michael A.",
    date: "Nov 12, 2026",
    status: "Rewarded",
    reward: 20,
  },
  {
    id: "REF-10024",
    name: "Sarah K.",
    date: "Nov 10, 2026",
    status: "Qualified",
    reward: 20,
  },
  {
    id: "REF-10023",
    name: "David O.",
    date: "Nov 08, 2026",
    status: "Registered",
    reward: 0,
  },
  {
    id: "REF-10022",
    name: "James T.",
    date: "Nov 05, 2026",
    status: "Rewarded",
    reward: 20,
  },
  {
    id: "REF-10021",
    name: "Grace M.",
    date: "Nov 02, 2026",
    status: "Rewarded",
    reward: 20,
  },
];

const rewardHistory = [
  {
    id: "RWD-10025",
    referral: "Michael A.",
    date: "Nov 12, 2026",
    amount: 20,
    status: "Credited",
  },
  {
    id: "RWD-10024",
    referral: "Sarah K.",
    date: "Nov 10, 2026",
    amount: 20,
    status: "Pending",
  },
  {
    id: "RWD-10022",
    referral: "James T.",
    date: "Nov 05, 2026",
    amount: 20,
    status: "Credited",
  },
  {
    id: "RWD-10021",
    referral: "Grace M.",
    date: "Nov 02, 2026",
    amount: 20,
    status: "Credited",
  },
];

const Referrals = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join AvendCrest",
          text: "Join me on AvendCrest using my referral link.",
          url: referralLink,
        });
      } catch {
        // Sharing was cancelled or unavailable.
      }
    } else {
      handleCopy();
    }
  };

  const stats = [
    {
      label: "Total Referrals",
      value: "24",
      description: "People invited",
      icon: Users,
      color: "text-blue-400",
    },
    {
      label: "Qualified Referrals",
      value: "13",
      description: "Eligible referrals",
      icon: UserCheck,
      color: "text-emerald-400",
    },
    {
      label: "Total Rewards",
      value: "$260.00",
      description: "Rewards credited",
      icon: Gift,
      color: "text-purple-400",
    },
    {
      label: "Pending Rewards",
      value: "$20.00",
      description: "Awaiting credit",
      icon: Wallet,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="space-y-8 text-white">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-semibold">Referrals</h2>
        <p className="mt-1 text-sm text-white/45">
          Invite people to AvendCrest and earn fixed referral rewards.
        </p>
      </div>

      {/* Referral reward banner */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#242932] to-[#191d24] p-7 sm:p-8">
        <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-[#E1161F]/10 blur-3xl" />

        <div className="relative max-w-2xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E1161F]/15 text-[#E1161F]">
            <Gift size={25} />
          </div>

          <p className="mt-5 text-sm text-white/50">
            Fixed reward per eligible referral
          </p>

          <h3 className="mt-2 text-4xl font-bold">
            $20.00
          </h3>

          <p className="mt-3 max-w-lg text-sm leading-6 text-white/50">
            Share your unique referral link with others. Earn a fixed
            $20 reward for every referral that meets AvendCrest's
            eligibility requirements.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <section>
        <div className="mb-5">
          <h3 className="text-lg font-semibold">Referral Overview</h3>
          <p className="mt-1 text-sm text-white/40">
            Track your invitations and referral rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-[#1B1F27] p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/45">{stat.label}</p>
                  <Icon size={20} className={stat.color} />
                </div>

                <h3 className="mt-4 text-2xl font-semibold">
                  {stat.value}
                </h3>

                <p className="mt-2 text-xs text-white/35">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Referral link */}
      <section className="rounded-xl border border-white/10 bg-[#1B1F27] p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E1161F]/10 text-[#E1161F]">
            <Share2 size={20} />
          </div>

          <div>
            <h3 className="font-semibold">Your Referral Link</h3>
            <p className="mt-1 text-xs text-white/40">
              Share this link with people you want to invite.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <div className="flex min-w-0 flex-1 items-center rounded-lg border border-white/10 bg-[#15181E] px-4 py-3">
            <span className="truncate text-sm text-white/65">
              {referralLink}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#E1161F] px-5 py-3 text-sm font-semibold transition hover:bg-[#c9131b]"
          >
            {copied ? <Check size={17} /> : <Copy size={17} />}
            {copied ? "Copied!" : "Copy Link"}
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-medium text-white/75 transition hover:bg-white/5"
          >
            <Share2 size={17} />
            Share
          </button>
        </div>

        <p className="mt-3 text-xs text-white/35">
          Your referral code: AC1024
        </p>
      </section>

      {/* Referral history */}
      <section>
        <div className="mb-5">
          <h3 className="text-lg font-semibold">Referral History</h3>
          <p className="mt-1 text-sm text-white/40">
            See the people who joined through your referral link.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#1B1F27]">
          <table className="w-full min-w-[650px] text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/40">
                <th className="px-5 py-4 font-medium">Referral</th>
                <th className="px-5 py-4 font-medium">Reference</th>
                <th className="px-5 py-4 font-medium">Join Date</th>
                <th className="px-5 py-4 font-medium">Reward</th>
                <th className="px-5 py-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {referrals.map((referral) => (
                <tr
                  key={referral.id}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="px-5 py-4 text-sm font-medium">
                    {referral.name}
                  </td>

                  <td className="px-5 py-4 text-sm text-white/50">
                    {referral.id}
                  </td>

                  <td className="px-5 py-4 text-sm text-white/50">
                    {referral.date}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium">
                    {referral.reward > 0
                      ? `$${referral.reward.toFixed(2)}`
                      : "—"}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                        referral.status === "Rewarded"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : referral.status === "Qualified"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {referral.status === "Rewarded" ? (
                        <CircleCheck size={13} />
                      ) : referral.status === "Qualified" ? (
                        <UserCheck size={13} />
                      ) : (
                        <Clock3 size={13} />
                      )}
                      {referral.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reward history */}
      <section>
        <div className="mb-5">
          <h3 className="text-lg font-semibold">Reward History</h3>
          <p className="mt-1 text-sm text-white/40">
            Track referral rewards and their credit status.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#1B1F27]">
          <table className="w-full min-w-[600px] text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/40">
                <th className="px-5 py-4 font-medium">Reward Reference</th>
                <th className="px-5 py-4 font-medium">Referral</th>
                <th className="px-5 py-4 font-medium">Date</th>
                <th className="px-5 py-4 font-medium">Amount</th>
                <th className="px-5 py-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {rewardHistory.map((reward) => (
                <tr
                  key={reward.id}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="px-5 py-4 text-sm text-white/65">
                    {reward.id}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {reward.referral}
                  </td>

                  <td className="px-5 py-4 text-sm text-white/50">
                    {reward.date}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold">
                    ${reward.amount.toFixed(2)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                        reward.status === "Credited"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {reward.status === "Credited" ? (
                        <CircleCheck size={13} />
                      ) : (
                        <Clock3 size={13} />
                      )}
                      {reward.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Referral information */}
      <div className="rounded-xl border border-white/10 bg-[#1B1F27] p-5">
        <div className="flex items-start gap-3">
          <CircleAlert size={20} className="mt-0.5 shrink-0 text-white/45" />

          <div>
            <h4 className="text-sm font-semibold">
              About referral rewards
            </h4>

            <p className="mt-1 text-sm leading-6 text-white/45">
              AvendCrest offers a fixed $20 reward for each eligible
              referral. Referral qualification and reward crediting are
              subject to the platform's referral terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
