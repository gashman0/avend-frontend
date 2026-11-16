
import {
  Check,
  Clock3,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Layers,
  CircleAlert,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetInvestmentPlans } from "../../network/me/queries";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

const InvestmentPlans = () => {
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetInvestmentPlans();

  const plans = data?.plans ?? [];

  const handleInvest = (planId: string) => {
    navigate("/dashboard/investments", {
      state: { selectedPlan: planId },
    });
  };

  return (
    <div className="space-y-8 text-white">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-semibold">Investment Plans</h2>
        <p className="mt-1 text-sm text-white/45">
          Explore available investment options and choose a plan.
        </p>
      </div>

      {/* Intro banner */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#242932] to-[#191d24] p-6 sm:p-8">
        <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-[#E1161F]/10 blur-3xl" />

        <div className="relative max-w-2xl">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E1161F]/15 text-[#E1161F]">
            <Layers size={22} />
          </div>

          <h3 className="text-xl font-semibold">
            Find an investment plan that suits your goals
          </h3>

          <p className="mt-2 text-sm leading-6 text-white/50">
            Compare investment amounts, daily ROI rates and investment
            durations before making your decision.
          </p>
        </div>
      </div>

      {/* Available plans */}
      <section>
        <div className="mb-5">
          <h3 className="text-lg font-semibold">Available Plans</h3>
          <p className="mt-1 text-sm text-white/40">
            Select a plan to view the investment process.
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex min-h-[250px] flex-col items-center justify-center rounded-xl border border-white/10 bg-[#1B1F27]">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#E1161F]" />
            <p className="text-sm text-white/50">
              Loading investment plans...
            </p>
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="flex min-h-[250px] flex-col items-center justify-center rounded-xl border border-white/10 bg-[#1B1F27] px-5 text-center">
            <CircleAlert size={34} className="mb-4 text-red-400" />

            <h4 className="font-semibold">
              Unable to load investment plans
            </h4>

            <p className="mt-2 max-w-sm text-sm text-white/45">
              We couldn't retrieve the available plans. Please try again.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-5 rounded-lg bg-[#E1161F] px-5 py-2.5 text-sm font-semibold transition hover:bg-[#c9131b]"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && plans.length === 0 && (
          <div className="flex min-h-[250px] flex-col items-center justify-center rounded-xl border border-white/10 bg-[#1B1F27] px-5 text-center">
            <Layers size={34} className="mb-4 text-white/30" />

            <h4 className="font-semibold">
              No investment plans available
            </h4>

            <p className="mt-2 max-w-sm text-sm text-white/45">
              There are currently no active investment plans. Please check
              again later.
            </p>
          </div>
        )}

        {/* Plans */}
        {!isLoading && !isError && plans.length > 0 && (
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className={`relative flex flex-col rounded-2xl border bg-[#1B1F27] p-6 ${
                  plan.featured
                    ? "border-[#E1161F]/60 shadow-lg shadow-[#E1161F]/5"
                    : "border-white/10"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-[#E1161F] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Popular Plan
                  </span>
                )}

                <div className="mb-5">
                  <h4 className="text-xl font-semibold">{plan.name}</h4>

                  <p className="mt-2 min-h-10 text-sm leading-5 text-white/45">
                    {plan.description}
                  </p>
                </div>

                <div className="rounded-xl bg-white/[0.04] p-4">
                  <p className="text-xs text-white/45">Daily ROI rate</p>

                  <p className="mt-1 text-3xl font-semibold text-[#E1161F]">
                    {plan.dailyRoi}%
                    <span className="ml-1 text-sm font-normal text-white/45">
                      daily
                    </span>
                  </p>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-white/45">
                      Minimum investment
                    </span>

                    <span className="text-sm font-medium">
                      {formatCurrency(plan.minInvestment)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-white/45">
                      Maximum investment
                    </span>

                    <span className="text-sm font-medium">
                      {formatCurrency(plan.maxInvestment)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-sm text-white/45">
                      <Clock3 size={15} />
                      Duration
                    </span>

                    <span className="text-sm font-medium">
                      {plan.durationDays} days
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-sm text-white/45">
                      <TrendingUp size={15} />
                      Projected ROI*
                    </span>

                    <span className="text-sm font-semibold text-emerald-400">
                      {plan.projectedRoi.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="my-6 border-t border-white/10" />

                <div className="flex-1 space-y-3">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                    Plan Features
                  </p>

                  {plan.features.map((feature, index) => (
                    <div
                      key={`${plan._id}-${index}`}
                      className="flex items-start gap-2.5 text-sm text-white/65"
                    >
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-emerald-400"
                      />
                      {feature}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleInvest(plan._id)}
                  className={`mt-7 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition ${
                    plan.featured
                      ? "bg-[#E1161F] text-white hover:bg-[#c9131b]"
                      : "border border-white/15 text-white hover:bg-white/5"
                  }`}
                >
                  Choose Plan
                  <ArrowRight size={17} />
                </button>
              </div>
            ))}
          </div>
        )}

        <p className="mt-4 text-xs leading-5 text-white/35">
          *Projected ROI is illustrative and calculated using the displayed
          daily rate multiplied by the plan duration. Actual investment
          terms, eligibility and returns must be confirmed before investing.
          Cryptocurrency investments involve risk.
        </p>
      </section>

      {/* Important information */}
      <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#1B1F27] p-5">
        <ShieldCheck className="mt-0.5 shrink-0 text-white/50" size={20} />

        <div>
          <h4 className="text-sm font-semibold">Before you invest</h4>

          <p className="mt-1 text-sm leading-6 text-white/45">
            Review the investment amount, duration and terms carefully.
            Your principal remains invested until maturity, while approved
            daily ROI credits are added to your available wallet balance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPlans;
