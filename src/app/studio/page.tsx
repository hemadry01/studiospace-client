import AllStudio from "@/components/AllStudio";
import { IStudio } from "@/type/Studio";
import { Suspense } from "react";

const StudioContent = async () => {
  let studiodata: IStudio[] = [];
  try{
   const res = await fetch("http://localhost:8000/all-studios");
   if (!res.ok) {
          throw new Error("Faild to fatch data");
      }
      studiodata = await res.json();
  } catch (error) {
    console.error("Error fetching studio data:", error);
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
        {studiodata.map((studio:IStudio) => (
          <AllStudio key={studio._id} studio={studio} />
        ))}
      </div>
    </div>
  );
}
 const AllStudioPage = () => {
   return (
     <Suspense fallback={<p className="p-10">Loading studios...</p>}>
       <StudioContent />
     </Suspense>
   );
 };

export default AllStudioPage;
