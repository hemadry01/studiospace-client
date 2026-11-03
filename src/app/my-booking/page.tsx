import MyBookings from "@/components/MyBookings";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { IBooking } from "@/type/Booking";
import { Plus } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

const MyBookingPage = async() => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const user = session?.user;
    const res = await fetch(`http://localhost:8000/my-booking/${user?.email}`);
    const bookingData: IBooking[] = await res.json();
    console.log(bookingData)

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
{/* 
        <Button
          render={<Link href="/add-studio" />}
          className="h-11 w-full gap-2 rounded-xl bg-violet-600 px-5 text-white shadow-md hover:bg-violet-700 sm:w-auto"
        >
          <Plus className="size-4" />
          Add new studio
        </Button> */}
      </div>
        <div>
            {
                bookingData.map((booking:IBooking)=>{
                    return(
                    <MyBookings key={booking._id} booking={booking}/>
                )})
            }
        </div>
    </div>
  );
};

export default MyBookingPage;
