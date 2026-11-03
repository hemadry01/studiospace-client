"use client";

import { IBooking } from "@/type/Booking";
import { IStudio } from "@/type/Studio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const STUDIO_API_URL = "http://localhost:8000/studios";
const DELETE_BOOKING_URL = "http://localhost:8000/bookings";

const STATUS_BADGE_STYLES: Record<string, string> = {
  confirmed: "border-transparent bg-emerald-100 text-emerald-700",
  pending: "border-transparent bg-amber-100 text-amber-700",
  cancelled: "border-transparent bg-red-100 text-red-600",
};

const MyBookings = ({ booking }: { booking: IBooking }) => {
  const [studio, setStudio] = useState<IStudio | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load the studio details (title, image, category) for this booking.
  useEffect(() => {
    let isActive = true;
    const loadStudio = async () => {
      try {
        const res = await fetch(`${STUDIO_API_URL}/${booking.studioId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch studio");
        }
        const data: IStudio = await res.json();
        if (isActive) {
          setStudio(data);
        }
      } catch (error) {
        console.error(`Error fetching studio ${booking.studioId}:`, error);
      }
    };
    loadStudio();
    return () => {
      isActive = false;
    };
  }, [booking.studioId]);

  if (isDeleted) {
    return null;
  }

  const statusLabel =
    booking.status.charAt(0).toUpperCase() + booking.status.slice(1);
  const statusBadgeClass =
    STATUS_BADGE_STYLES[booking.status] ??
    "border-transparent bg-slate-100 text-slate-700";

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`${DELETE_BOOKING_URL}/${booking._id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`Failed to delete booking (status ${res.status})`);
      }
      setIsDeleted(true);
    } catch (error) {
      console.error("Error deleting booking:", error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="border-b border-slate-100">
      <div className="flex items-center gap-4 py-4">
        {/* Thumbnail */}
        <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100">
          {studio?.imageUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={studio.imageUrl}
              alt={studio.title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          )}
          <span className="absolute bottom-1.5 left-2 text-[8px] font-medium uppercase tracking-wide text-slate-600">
            {studio?.category ?? "Studio"}
          </span>
        </div>

        {/* Title, status, price */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-bold text-gray-900">
            {studio?.title ?? `Booking ${booking.studioId}`}
          </p>
          <div className="mt-1">
            <Badge variant="outline" className={statusBadgeClass}>
              {statusLabel}
            </Badge>
          </div>
          <p className="mt-1 truncate text-xs text-muted-foreground">
            {studio?.category ?? "Studio"} · ${studio?.hourlyRate ?? booking.hourlyRate}/hr
          </p>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-3">
          <Button
            variant="link"
            size="sm"
            className="h-7 px-1 text-violet-600"
            aria-label="Edit booking"
          >
            Edit
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 rounded-md border-transparent bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-500"
            disabled={isDeleting}
            onClick={handleDelete}
            aria-label="Delete booking"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
