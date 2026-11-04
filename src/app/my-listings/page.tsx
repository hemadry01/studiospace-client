import MyBookings from "@/components/MyBookings";
import MyStudioListingsPage from "@/components/MyStudioListings";
import { auth } from "@/lib/auth";
import { IBooking } from "@/type/Booking";
import { IStudio } from "@/type/Studio";
import { headers } from "next/headers";

const MyListingPage = async() => {

    let studiodata: IStudio[] = [];
    
       const session = await auth.api.getSession({
         headers: await headers(),
       });
    
       const email = session?.user?.email;
    
       if (!email) {
         return <p>Please login first.</p>;
       }
       const res = await fetch(`http://localhost:8000/studios/${email}`, {
         cache: "no-store",
       });
       studiodata = await res.json();

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
        {studiodata.length > 0 ? (
          studiodata.map((studio: IStudio) => {
            return (
              <div
                key={studio._id}
                className="border-b border-slate-100 last:border-b-0"
              >
                <MyStudioListingsPage studio={studio} />
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default MyListingPage;
