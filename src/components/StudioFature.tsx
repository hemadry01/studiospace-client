import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { IStudio } from '@/type/Studio';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const StudioFature = async () => {

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
           <Button className="bg-violet-600" render={<Link href="/login" />}>
             Back to Login Studios
           </Button>
         </div>
       );
     }
    if (user === "host"){
      const res = await fetch(`http://localhost:8000/studio-featured/${email}`, {
        cache: "no-store",
      });
      studiodata = await res.json();
    }
    else{
      const res = await fetch(
        "http://localhost:8000/studio-featured",
        {
          cache: "no-store",
        },
      );
      studiodata = await res.json();
    }

    return (
      <div className="mt-5">
        <div className=" px-6 lg:px-10">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            My studio listings
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your creative spaces and keep track of your studios.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6 px-6 lg:px-10">
          {studiodata.map((studioItem: IStudio) => (
            <Card
              key={studioItem._id}
              className="overflow-hidden bg-card/50 shadow-sm"
            >
              <AspectRatio ratio={1} className="w-full">
                <Image
                  src={studioItem.imageUrl}
                  alt={studioItem.title}
                  fill
                  className="object-cover"
                />
              </AspectRatio>

              <CardContent className="p-3">
                <CardTitle className="text-base font-medium line-clamp-2">
                  {studioItem.title}
                </CardTitle>

                <CardDescription className="mt-2">
                  {studioItem.category}
                </CardDescription>
              </CardContent>

              <CardFooter className="p-3">
                <Link href={`/studio/${studioItem._id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
};

export default StudioFature;