
import AllStudio from "@/components/AllStudio";
import { auth } from "@/lib/auth";
import { IStudio } from "@/type/Studio";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StudioContent = async () => {
 let studiodata: IStudio[] = [];

   const session = await auth.api.getSession({
     headers: await headers(),
   });

   const email = session?.user?.email;
   const user = session?.user?.role;

   if (!email) {
     return (
              <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-24 text-center">
                <h1 className="text-2xl font-bold">Studio Feature not found</h1>
                <p className="text-sm text-muted-foreground">
                  We could not load this studio. It may have been removed, or the
                  server is temporarily unavailable.
                </p>
                <Button className="bg-violet-600" render={<Link href="/login" />}>Back to Login Studios</Button>
              </div>
            );
   }

    if (user === "host"){
        const res = await fetch(`http://localhost:8000/studios/${email}`);
        studiodata = await res.json();
    }else{
      const res = await fetch("http://localhost:8000/studios", {
        cache: "no-store",
      });
      studiodata = await res.json();
    }
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
