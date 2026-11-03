import Link from "next/link";
import {
  ShieldCheck,
  BadgeCheck,
  Camera,
  Headset,
  ArrowRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: ShieldCheck,
    title: "Liability Protection",
    description:
      "Clear booking policies and protection guidelines for a confident booking experience.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Profiles",
    description:
      "Connect with trusted hosts and creators through transparent profiles.",
  },
  {
    icon: Camera,
    title: "Equipment Safety",
    description:
      "Check studio equipment details and safety guidelines before your shoot.",
  },
  {
    icon: Headset,
    title: "24/7 Host Support",
    description:
      "Get assistance with booking questions and support whenever you need it.",
  },
];

export default function HostGuarantee() {
  return (
    <section className="bg-[#100B24] py-12 text-white md:py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <Badge
            variant="outline"
            className="mb-3 rounded-full border-purple-500/40 bg-purple-500/10 text-purple-300"
          >
            Your Peace of Mind
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Host Guarantee &{" "}
            <span className="text-purple-400">Creator Support</span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-400 md:text-base">
            Your creativity deserves a safe and reliable space. We help hosts
            and creators connect, collaborate, and create with confidence.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="group border-purple-500/20 bg-white/[0.04] text-white transition duration-300 hover:-translate-y-1 hover:border-purple-500/60 hover:bg-purple-500/[0.06]"
              >
                <CardContent className="p-5">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15">
                    <Icon className="h-6 w-6 text-purple-400" />
                  </div>

                  <h3 className="text-lg font-semibold">{feature.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <Button
            asChild
            className="rounded-full bg-purple-600 px-6 hover:bg-purple-700"
          >
            <Link href="/studios" className="inline-flex items-center gap-2">
              Explore Studios
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
