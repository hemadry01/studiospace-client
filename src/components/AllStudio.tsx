"use client";

import { IStudio } from "@/type/Studio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, MapPin, Star } from "lucide-react";
import { useState } from "react";

interface IStudioPromise {
  studio: IStudio;
}

const AllStudio = ({ studio }: IStudioPromise) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="group gap-0 pt-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Cover image with category badge + favorite button */}
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={studio.imageUrl}
          alt={studio.title}
          className="aspect-[16/10] w-full rounded-t-xl object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />

        <Badge
          variant="outline"
          className="absolute top-3 left-3 h-6 border-transparent bg-white/90 px-2.5 text-xs font-medium text-foreground shadow-sm backdrop-blur"
        >
          <span className="size-1.5 rounded-full bg-violet-600" />
          {studio.category}
        </Badge>

        <Button
          type="button"
          size="icon-sm"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={isFavorite}
          onClick={() => setIsFavorite((prev) => !prev)}
          className="absolute top-3 right-3 rounded-full bg-white/90 text-gray-500 shadow-sm backdrop-blur hover:bg-white hover:text-red-500"
        >
          <Heart
            className={
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }
          />
        </Button>
      </div>

      {/* Title + location */}
      <CardHeader className="pt-4">
        <CardTitle className="line-clamp-1">{studio.title}</CardTitle>
        <CardDescription className="flex items-center gap-1.5">
          <MapPin className="size-3.5 shrink-0" />
          <span className="line-clamp-1">{studio.address}</span>
        </CardDescription>
      </CardHeader>

      {/* Price + rating */}
      <CardFooter className="mt-auto bg-card justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-violet-600">
            ${studio.hourlyRate}
          </span>
          <span className="text-sm text-muted-foreground">/ hour</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Star className="size-4 fill-amber-400 text-amber-400" />
          {typeof studio.rating === "number" ? (
            <>
              <span className="font-semibold">{studio.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">
                ({studio.reviews ?? 0})
              </span>
            </>
          ) : (
            <span className="text-muted-foreground">New</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AllStudio;
