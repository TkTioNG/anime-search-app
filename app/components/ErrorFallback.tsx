import { Button } from "@mui/material";
import { useAsyncError } from "react-router";

export default function ErrorFallback({ onRetry }: { onRetry: () => void }) {
  const error = useAsyncError();

  return (
    <div className="py-4">
      <h1 className="text-2xl font-semibold text-red-400 text-center mb-4">
        Something wrong had happened
      </h1>
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
        <p className="px-4 text-gray-500 italic">{error.message}</p>
        <Button
          variant="contained"
          onClick={onRetry}
          color="primary"
          disableElevation
          size="large"
        >
          Retry
        </Button>
      </div>
    </div>
  );
}
