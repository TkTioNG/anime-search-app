import type { Route } from "./+types/animeDetail";
import { Await, useNavigate } from "react-router";
import { Button } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ScoreCard from "~/components/AnimeScoreCard";
import { getAnimeDetail } from "~/api/anime";
import { Suspense } from "react";
import AnimeDetailSkeleton from "~/components/AnimeDetailSkeleton";
import ErrorFallback from "~/components/ErrorFallback";

export async function loader({ params }: Route.LoaderArgs) {
  const animeDetail = getAnimeDetail(params.id);
  return { animeDetail };
}

export function meta({ location }: Route.MetaArgs) {
  const state = location.state as { title: string };
  return [{ title: state.title ?? "Anime Detail" }];
}

export default function AnimeDetail({ loaderData }: Route.ComponentProps) {
  const { animeDetail } = loaderData;
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate(-1);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Suspense fallback={<AnimeDetailSkeleton />}>
        <Await
          resolve={animeDetail}
          errorElement={<ErrorFallback onRetry={() => navigate(-1)} />}
        >
          {({ data }) => (
            <>
              <div className="flex gap-8 flex-col sm:flex-row">
                <div className="w-full max-w-3xs mx-auto sm:w-3xs">
                  <img
                    src={data.images.webp.image_url}
                    alt={data.title}
                    className="w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-4xl font-bold">{data.title}</h2>
                  <p className="text-lg mt-4">{data.synopsis}</p>
                  <div className="flex flex-wrap justify-center gap-4 mt-8 sm:justify-start sm:mt-16">
                    <ScoreCard
                      title={`${data.score}`}
                      desc={`${data.scored_by} USERS`}
                      theme="blue"
                    />
                    <ScoreCard
                      title={`#${data.rank}`}
                      desc="RANKED"
                      theme="red"
                    />
                    <ScoreCard
                      title={`#${data.popularity}`}
                      desc="RANKED"
                      theme="yellow"
                    />
                    <ScoreCard
                      title={`${data.members}`}
                      desc="MEMBERS"
                      theme="green"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button
                  variant="contained"
                  onClick={onGoBack}
                  color="primary"
                  disableElevation
                  size="large"
                  startIcon={<ArrowBack />}
                >
                  Back
                </Button>
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </main>
  );
}
