"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { IBooking } from "@/type/Booking";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

interface IDeleteMyBookingItemProps {
  booking: IBooking;
}

const DeleteMyBookingItem = ({ booking }: IDeleteMyBookingItemProps) => {
  const handleDeleteStudio = async() => {
    const res = await fetch(`http://localhost:8000/my-booking/${booking._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    redirect("/my-booking");
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          render={
            <Button variant="destructive" size="sm">
              Cancel
            </Button>
          }
        />

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              studio from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction onClick={handleDeleteStudio}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteMyBookingItem;
