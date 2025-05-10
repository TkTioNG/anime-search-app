import { Skeleton } from "@mui/material";

export default function AnimeDetailSkeleton() {
  return (
    <div className="flex gap-8 flex-col sm:flex-row">
      <div className="w-full max-w-3xs mx-auto sm:w-3xs">
        <Skeleton
          variant="rectangular"
          width="100%"
          height="auto"
          className="aspect-[3/4]"
        />
      </div>
      <div className="flex-1 -mt-4">
        <Skeleton variant="text" width="60%" height={60} />
        <br />
        <Skeleton variant="text" width="90%" height={30} />
        <Skeleton variant="text" width="90%" height={30} />
        <Skeleton variant="text" width="50%" height={30} />
        <br />
        <Skeleton variant="text" width="90%" height={30} />
        <Skeleton variant="text" width="90%" height={30} />
        <Skeleton variant="text" width="50%" height={30} />
      </div>
    </div>
  );
}
