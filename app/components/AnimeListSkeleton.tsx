import { Skeleton } from "@mui/material";

const animeListSkeleton = Array.from({ length: 10 }, (_, index) => index);

export default function AnimeListSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4 mb-4">
      {animeListSkeleton.map((index) => (
        <div key={index}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="auto"
            className="aspect-[3/4]"
          />
          <Skeleton variant="text" width="80%" height={50} />
        </div>
      ))}
    </div>
  );
}
