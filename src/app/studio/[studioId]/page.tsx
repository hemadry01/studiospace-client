import StudioDetails from "@/components/StudioDetails";
import { Button } from "@/components/ui/button";
import { IStudio } from "@/type/Studio";
import Link from "next/link";

interface ISingleStudioPageProps {
  params: Promise<{ studioId: string }>;
}

const SingleStudioPage = async ({ params }: ISingleStudioPageProps) => {
  const { studioId } = await params;

  let studioData: IStudio | null = null;
  try {
    const res = await fetch(`http://localhost:8000/studios/${studioId}`);
    if (!res.ok) {
      throw new Error("Failed to fetch studio data");
    }
    studioData = await res.json();
  } catch (error) {
    console.error("Error fetching studio data:", error);
  }

  if (!studioData) {
    return (
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Studio not found</h1>
        <p className="text-sm text-muted-foreground">
          We could not load this studio. It may have been removed, or the server
          is temporarily unavailable.
        </p>
        <Button render={<Link href="/studio" />}>Back to All Studios</Button>
      </div>
    );
  }

  return (
    <>
      <StudioDetails studio={studioData} />
    </>
  );
};

export default SingleStudioPage;
