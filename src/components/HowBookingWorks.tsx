import {
  Search,
  Clock,
  CalendarCheck,
  Clapperboard,
  ArrowRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover Spaces",
    description:
      "Explore creative studios and find the perfect space for your project.",
  },
  {
    number: "02",
    icon: Clock,
    title: "Select Shoot Hours",
    description: "Choose your preferred date, time slot, and booking duration.",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Book Instantly",
    description:
      "Confirm your studio reservation with a simple booking process.",
  },
  {
    number: "04",
    icon: Clapperboard,
    title: "Create & Produce",
    description: "Show up, get creative, and bring your ideas to life.",
  },
];

export default function HowBookingWorks() {
  return (
    <section className="bg-[#100B24] py-12 text-white md:py-14 mt-6">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <Badge
            variant="outline"
            className="mb-3 rounded-full border-purple-500/40 bg-purple-500/10 text-purple-300"
          >
            Simple Process
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            How Booking <span className="text-purple-400">Works</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-400 md:text-base">
            Book your perfect creative space in four simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <Card
                key={step.number}
                className="group relative border-purple-500/20 bg-white/[0.04] text-white transition hover:-translate-y-1 hover:border-purple-500/60 hover:bg-purple-500/[0.06]"
              >
                <CardContent className="p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15">
                      <Icon className="h-5 w-5 text-purple-400" />
                    </div>

                    <span className="text-3xl font-bold text-purple-500/20">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold">{step.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {step.description}
                  </p>

                  <div className="mt-4 h-1 w-10 rounded-full bg-purple-500 transition-all group-hover:w-16" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-7 text-center">
          <Button
            asChild
            className="rounded-full bg-purple-600 px-6 hover:bg-purple-700"
          >
            <Link href="/studios" className="inline-flex items-center">
              Explore Studios
              <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
