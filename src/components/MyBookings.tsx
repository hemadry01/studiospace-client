import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IBooking } from "@/type/Booking";
import Image from "next/image";

const statusStyles: Record<IBooking["status"], { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-amber-100 text-amber-700",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-emerald-100 text-emerald-700",
  },
  completed: {
    label: "Completed",
    className: "bg-blue-100 text-blue-700",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-600",
  },
};

const MyBookings = ({ booking }: { booking: IBooking }) => {
  console.log("my Booking",booking);
  const status = statusStyles[booking.status] ?? statusStyles.pending;

  return (
    <div className="flex items-center gap-4 rounded-xl py-4 sm:gap-6">
      {booking.imageUrl ? (
        <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:size-28">
          <Image
            src={booking.imageUrl}
            alt={booking.title}
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="relative flex size-20 shrink-0 flex-col justify-end rounded-lg bg-gradient-to-t from-slate-200 to-slate-100 p-2 sm:size-28">
          <span className="text-[0.5rem] font-semibold uppercase tracking-wide text-slate-500 sm:text-[0.625rem]">
            Photo studio
          </span>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-lg font-semibold text-slate-900 sm:text-xl">
          {booking.title}
        </h3>
        <Badge className={`mt-1.5 border-0 ${status.className}`}>{status.label}</Badge>
        <p className="mt-1.5 truncate text-xs text-slate-500 sm:text-sm">
          {booking.category} · ${booking.hourlyRate}/hr
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="font-medium text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
        >
          Edit
        </Button>
        <Button variant="destructive" size="sm" className="font-medium">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default MyBookings;
