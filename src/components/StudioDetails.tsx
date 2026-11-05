"use client";

import { IStudio } from "@/type/Studio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, MapPin, Pencil, ShieldCheck, Star, Users } from "lucide-react";
import { format } from "date-fns";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface IStudioDetailsProps {
  studio: IStudio;
}

const HOUR_OPTIONS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const GALLERY_LABELS = [
  "Main gallery image",
  "Gallery 02",
  "Gallery 03",
  "Gallery 04",
  "Gallery 05",
];

const StudioDetails = ({ studio }: IStudioDetailsProps) => {
  
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookingSummary, setBookingSummary] = useState<string | null>(null);
  const [bookingDateError, setBookingDateError] = useState("");
  const [bookingTimeError, setBookingTimeError] = useState("");
  const router = useRouter();

  // const thumbnailImages = (studio.images ?? []).slice(0, 4);
  const thumbnailImages: string[] = [];
  //////////////////////////////////////////
  const mainImageLabel = GALLERY_LABELS[0];

  const bookingHours =
    startTime && endTime
      ? Number(endTime.split(":")[0]) - Number(startTime.split(":")[0])
      : 0;
  const totalPrice = bookingHours * studio.hourlyRate;

  const todayMinDate = format(new Date(), "yyyy-MM-dd");

  const validateBooking = (date: string, start: string, end: string) => {
    let dateError = "";
    let timeError = "";

    if (!date) {
      dateError = "Please choose a booking date.";
    } else if (date < format(new Date(), "yyyy-MM-dd")) {
      dateError = "The booking date cannot be in the past.";
    }

    if (!start) {
      timeError = "Please select a start time.";
    } else if (!end) {
      timeError = "Please select an end time.";
    } else if (
      Number(end.split(":")[0]) <= Number(start.split(":")[0])
    ) {
      timeError = "The end time must be after the start time.";
    }

    return { dateError, timeError };
  };

  const validateAndApply = (next: {
    date: string;
    start: string;
    end: string;
  }) => {
    const { dateError, timeError } = validateBooking(
      next.date,
      next.start,
      next.end
    );
    setBookingDateError(dateError);
    setBookingTimeError(timeError);
  };

  const handleDateChange = (value: string) => {
    setSelectedDate(value);
    setBookingSummary(null);
    validateAndApply({ date: value, start: startTime, end: endTime });
  };

  const handleStartTimeChange = (value: string | null) => {
    if (!value) return;
    setStartTime(value);
    setBookingSummary(null);
    validateAndApply({ date: selectedDate, start: value, end: endTime });
  };

  const handleEndTimeChange = (value: string | null) => {
    if (!value) return;
    setEndTime(value);
    setBookingSummary(null);
    validateAndApply({ date: selectedDate, start: startTime, end: value });
  };

  const handleBook = () => {
    const { dateError, timeError } = validateBooking(
      selectedDate,
      startTime,
      endTime
    );
    if (dateError || timeError) {
      setBookingDateError(dateError);
      setBookingTimeError(timeError);
      setBookingSummary(null);
      return;
    }
    setBookingSummary(
      `Booked ${bookingHours} ${bookingHours === 1 ? "hour" : "hours"} on ${format(
        new Date(selectedDate),
        "MMM d, yyyy"
      )} · $${totalPrice} — confirmation sent to ${studio.email}.`
    );
  };

   const { data: session } = authClient.useSession();
   const user = session?.user;
    console.log("User email",user);
  const handleSubmitBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate fields
    if (!selectedDate || !startTime || !endTime) {
      //toast.error("Please select date and time");
      return;
    }
    // Prepare booking data
    const { email: studioEmail, ...studioData } = studio;
    const data = {
      ...studioData,
      studioId: studio._id,
      studioTitle: studio.title,
      email: user?.email,
      bookingDate: selectedDate,
      startTime,
      endTime,
      totalHours: bookingHours,
      hourlyRate: studio.hourlyRate,
      securityDeposit: studio.securityDeposit,
      totalAmount: totalPrice + studio.securityDeposit,
      status: "pending",
      createdAt: new Date(),
    };
    try{
      const res = await fetch("http://localhost:8000/my-bookings", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const bookingData= await res.json();
      if (!res.ok) {
        throw new Error(bookingData.message || "Booking failed");
      }else{
        router.push("/studio");
        console.log("Saved booking:",bookingData)
      }
    }catch(e){
      console.error(e);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Title + rating & location */}
      <h1 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
        {studio.title}
      </h1>
      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Star className="size-4 fill-amber-400 text-amber-400" />
          {typeof studio.rating === "number" ? (
            <>
              <span className="font-semibold text-foreground">
                {studio.rating.toFixed(1)}
              </span>
              <span>({studio.reviews ?? 0} reviews)</span>
            </>
          ) : (
            <span>New studio</span>
          )}
        </span>

        <span>·</span>

        <span className="flex items-center gap-1">
          <MapPin className="size-3.5" />
          {studio.address}
        </span>

        <div className="ml-auto flex">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            aria-label="Edit studio"
          >
            <Pencil className="size-3.5" />
            Edit
          </Button>
        </div>
      </div>

      {/* Gallery: single full-width image, or main image + 2x2 thumbnails */}
      <div className="mt-6 grid gap-3 md:grid-cols-[2fr_1fr]">
        <div
          className={
            thumbnailImages.length
              ? "relative aspect-[16/8] min-h-48 overflow-hidden rounded-xl bg-slate-100"
              : "relative aspect-[16/10] min-h-48 overflow-hidden rounded-xl bg-slate-100"
          }
        >
          {studio.imageUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={studio.imageUrl}
              alt={studio.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <span className="absolute bottom-2 left-2 rounded bg-white/80 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-slate-700 uppercase backdrop-blur">
            {mainImageLabel}
          </span>
        </div>
        {thumbnailImages.length > 0 && (
          <div className="grid grid-cols-2 gap-3 md:h-full md:grid-rows-2">
            {thumbnailImages.map((src, index) => (
              <div
                key={src}
                className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100 md:aspect-auto md:min-h-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={GALLERY_LABELS[index + 1] ?? `Gallery ${index + 2}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <span className="absolute bottom-2 left-2 rounded bg-white/80 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-slate-700 uppercase backdrop-blur">
                  {GALLERY_LABELS[index + 1] ?? `Gallery ${index + 2}`}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* About/amenities + booking card */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div>
          <section>
            <h2 className="text-lg font-semibold">About this space</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {studio.overview}
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold">Amenities</h2>
            {studio.amenities?.length ? (
              <ul className="mt-3 grid max-w-lg gap-y-2 sm:grid-cols-2 sm:gap-x-8">
                {studio.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <Check className="size-4 shrink-0 text-slate-500" />
                    {amenity}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                No amenities listed for this studio.
              </p>
            )}
          </section>
        </div>
        <form onSubmit={handleSubmitBooking}>
          <Card className="h-fit gap-4 bg-indigo-50/80 ring-indigo-200/70 dark:bg-indigo-950/40">
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                  ${studio.hourlyRate}
                </span>
                <span className="text-sm text-muted-foreground">/ hour</span>
              </div>

              <p className="text-sm font-medium">Select date and hours</p>

              <div className="flex flex-col gap-1">
                <Input
                  type="date"
                  aria-label="Booking date"
                  aria-invalid={bookingDateError ? true : undefined}
                  min={todayMinDate}
                  value={selectedDate}
                  onChange={(event) => handleDateChange(event.target.value)}
                />
                {bookingDateError && (
                  <p className="text-xs text-destructive" role="alert">
                    {bookingDateError}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Select
                  value={startTime}
                  onValueChange={(value) => handleStartTimeChange(value)}
                >
                  <SelectTrigger
                    className="w-full"
                    aria-label="Start hour"
                    aria-invalid={bookingTimeError ? true : undefined}
                  >
                    <SelectValue placeholder="Start" />
                  </SelectTrigger>
                  <SelectContent>
                    {HOUR_OPTIONS.slice(0, -1).map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={endTime}
                  onValueChange={(value) => handleEndTimeChange(value)}
                >
                  <SelectTrigger
                    className="w-full"
                    aria-label="End hour"
                    aria-invalid={bookingTimeError ? true : undefined}
                  >
                    <SelectValue placeholder="End" />
                  </SelectTrigger>
                  <SelectContent>
                    {HOUR_OPTIONS.slice(1).map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {bookingTimeError && (
                <p className="text-xs text-destructive" role="alert">
                  {bookingTimeError}
                </p>
              )}

              {bookingHours > 0 && selectedDate && (
                <div className="flex items-center justify-between rounded-lg bg-white/70 px-3 py-2 text-sm dark:bg-background/60">
                  <span className="text-muted-foreground">
                    {bookingHours} {bookingHours === 1 ? "hour" : "hours"}
                  </span>
                  <span className="font-semibold">${totalPrice}</span>
                </div>
              )}

              <Button
                type="submit"
                className="h-10 w-full bg-violet-600 hover:bg-violet-700"
              >
                Book workspace now
              </Button>

              {bookingSummary && (
                <p className="flex items-start gap-1.5 text-xs text-emerald-700 dark:text-emerald-400">
                  <Check className="mt-0.5 size-3.5 shrink-0" />
                  {bookingSummary}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="size-3.5" />
                  Up to {studio.maxCapacity} guests
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="size-3.5" />${studio.securityDeposit}{" "}
                  security deposit
                </span>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default StudioDetails;
