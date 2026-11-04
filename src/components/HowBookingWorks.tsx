import Link from "next/link";
import {
  Search,
  Clock,
  CalendarCheck,
  Clapperboard,
  ArrowRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <section
      aria-labelledby="booking-heading"
      className="mt-6 bg-[#100B24] py-12 text-white md:py-14"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        {/* Section Header */}
        <header className="mb-8 text-center">
          <Badge
            variant="outline"
            className="mb-3 rounded-full border-purple-500/40 bg-purple-500/10 text-purple-300"
          >
            Simple Process
          </Badge>

          <h2
            id="booking-heading"
            className="text-3xl font-bold tracking-tight md:text-4xl"
          >
            How Booking <span className="text-purple-400">Works</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-400 md:text-base">
            Book your perfect creative space in four simple steps.
          </p>
        </header>

        {/* Booking Steps */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ number, icon: Icon, title, description }) => (
            <Card
              key={number}
              className="group border-purple-500/20 bg-white/[0.04] text-white transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/60 hover:bg-purple-500/[0.06]"
            >
              <CardContent className="p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15">
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 text-purple-400 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <span
                    aria-hidden="true"
                    className="text-3xl font-bold text-purple-500/20"
                  >
                    {number}
                  </span>
                </div>

                <h3 className="text-lg font-semibold">{title}</h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  {description}
                </p>

                <div className="mt-4 h-1 w-10 rounded-full bg-purple-500 transition-all duration-300 group-hover:w-16" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/studios"
            className="group inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#100B24]"
          >
            Explore Studios
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
