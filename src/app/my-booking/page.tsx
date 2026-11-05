import MyBookings from "@/components/MyBookings";
import { auth } from "@/lib/auth";
import { IBooking } from "@/type/Booking";
import { headers } from "next/headers";

const MyBookingPage = async() => {
   let bookingData: IBooking[] = [];
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const email = session?.user?.email;
    // const res = await fetch(
    //   `http://localhost:8000/my-booking/${user?.email}`,
    //   { cache: "no-store" },
    // );
    // const bookingData: IBooking[] = res.ok
    //   ? await res.json().catch(() => [])
    //   : [];

    const res = await fetch(`http://localhost:8000/my-booking/${email}`, {
      cache: "no-store",
    });
     bookingData = await res.json()
    console.log("bookingData", bookingData);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="flex flex-col gap-4 rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 via-white to-purple-50 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            My studio listings
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your creative spaces and keep track of your studios.
          </p>
        </div>
      </div>
      <div className="mt-4 sm:mt-6">
        {bookingData.length > 0 ? (
          bookingData.map((booking: IBooking) => {
            return (
              <div key={booking._id} className="border-b border-slate-100 last:border-b-0">
                <MyBookings booking={booking} />
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">
            No bookings found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyBookingPage;
