import { auth } from "@/lib/auth";
import { IBooking } from "@/type/Booking";
import { headers } from "next/headers";

const MyBookingPage = async () => {
  let bookings: IBooking[] = [];

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const user = session?.user;

    const res = await fetch(
      `http://localhost:8000/my-bookings/${user?.email}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch bookings");
    }
    bookings = await res.json();
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }

  return (
    <div>
      {bookings.map((booking) => (
        <div key={booking.studioId}>{booking.customerEmail}</div>
      ))}
    </div>
  );
};

export default MyBookingPage;
