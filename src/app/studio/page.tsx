
import AllStudio from "@/components/AllStudio";
import { auth } from "@/lib/auth";
import { IStudio } from "@/type/Studio";
import { headers } from "next/headers";

const StudioContent = async () => {
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
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Explore All Studios</h1>
        <p className="text-gray-500 text-sm">
          Discover and book your favorite studios for your next creative
          session.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studiodata.map((studio: IStudio) => (
          <AllStudio key={studio._id} studio={studio} />
        ))}
      </div>
    </div>
  );
};

export default StudioContent;
