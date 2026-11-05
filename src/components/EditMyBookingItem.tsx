"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IBooking } from "@/type/Booking";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ShieldCheck,Users } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface IDeleteMyBookingItemProps {
  booking: IBooking;
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

const EditMyBookingItem = ({ booking }: IDeleteMyBookingItemProps) => {
     const [selectedDate, setSelectedDate] = useState("");
      const [startTime, setStartTime] = useState("");
      const [endTime, setEndTime] = useState("");
      const [bookingSummary, setBookingSummary] = useState<string | null>(null);
      const [bookingDateError, setBookingDateError] = useState("");
      const [bookingTimeError, setBookingTimeError] = useState("");
      const router = useRouter();

        const bookingHours =
          startTime && endTime
            ? Number(endTime.split(":")[0]) - Number(startTime.split(":")[0])
            : 0;
        const totalPrice = bookingHours * booking.hourlyRate;
      
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
      
        // const handleDateChange = (value: string) => {
        //   setSelectedDate(value);
        //   setBookingSummary(null);
        //   validateAndApply({ date: value, start: startTime, end: endTime });
        // };
      
        // const handleStartTimeChange = (value: string | null) => {
        //   if (!value) return;
        //   setStartTime(value);
        //   setBookingSummary(null);
        //   validateAndApply({ date: selectedDate, start: value, end: endTime });
        // };
      
        // const handleEndTimeChange = (value: string | null) => {
        //   if (!value) return;
        //   setEndTime(value);
        //   setBookingSummary(null);
        //   validateAndApply({ date: selectedDate, start: startTime, end: value });
        // };
        const [form, setForm] = useState(booking);
              const update = (field: keyof typeof form, value: string) =>
                setForm((current) => ({ ...current, [field]: value }));

        const handleSubmitBooking = async(e:React.FormEvent<HTMLFormElement>)=>{

             e.preventDefault();
             const { _id, ...updatedData } = form;
             const res = await fetch(
               `http://localhost:8000/studios/${booking._id}`,
               {
                 method: "PATCH",
                 headers: {
                   "Content-Type": "application/json",
                 },
                 body: JSON.stringify(updatedData),
               },
             );
             const data = await res.json();
             console.log(data);
        }

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">
            <Pencil />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className={"min-w-4xl"}>
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmitBooking}>
                <Card className="h-fit gap-4 bg-indigo-50/80 ring-indigo-200/70 dark:bg-indigo-950/40">
                  <CardContent className="flex flex-col gap-3">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                        ${booking.hourlyRate}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        / hour
                      </span>
                    </div>

                    <p className="text-sm font-medium">Select date and hours</p>

                    <div className="flex flex-col gap-1">
                      <Input
                        type="date"
                        aria-label="Booking date"
                        aria-invalid={bookingDateError ? true : undefined}
                        min={todayMinDate}
                        value={form.bookingDate}
                        onChange={(event) =>
                          update("bookingDate",event.target.value)
                        }
                      />
                      {bookingDateError && (
                        <p className="text-xs text-destructive" role="alert">
                          {bookingDateError}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Select
                        value={form.startTime}
                        onValueChange={(value) =>
                          update("startTime", value ?? "")
                        }
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
                        value={form.endTime}
                        onValueChange={(value) =>
                          update("endTime", value ?? "")
                        }
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
                        Up to {booking.maxCapacity} guests
                      </span>
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="size-3.5" />$
                        {booking.securityDeposit} security deposit
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditMyBookingItem;
