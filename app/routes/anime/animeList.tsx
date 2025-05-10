import { Await, Link, useNavigate, useSearchParams } from "react-router";
import type { ChangeEvent, MouseEvent } from "react";
import type { Route } from "./+types/animeList";
import { TablePagination } from "@mui/material";
import { getAnimeList } from "~/api/anime";
import { Suspense } from "react";
import AnimeListSkeleton from "~/components/AnimeListSkeleton";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const limit = url.searchParams.get("limit") ?? "10";
  const page = url.searchParams.get("page") ?? "1";
  const animeList = getAnimeList({
    q,
    limit,
    page,
  });
  return { animeList };
}

export default function AnimeList({ loaderData }: Route.ComponentProps) {
  const { animeList } = loaderData;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const onPageChange = (
    event: MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setSearchParams(
      (prev) => {
        prev.set("page", (page + 1).toString());
        return prev;
      },
      { replace: true }
    );
  };

  const onChangeRowsPerPage = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchParams((prev) => {
      prev.set("limit", event.target.value);
      return prev;
    });
  };

  return (
    <Suspense fallback={<AnimeListSkeleton />}>
      <Await resolve={animeList}>
        {({ data, pagination }) => (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4 mb-4">
              {data.map((anime) => (
                <div
                  key={anime.mal_id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg  hover:scale-105 transition-transform duration-300"
                >
                  <Link
                    to={`/anime/${anime.mal_id}`}
                    state={{
                      title: anime.title,
                    }}
                    prefetch="intent"
                  >
                    <img
                      src={anime.images.webp.image_url}
                      alt={anime.title}
                      className="w-full aspect-[3/4] object-cover"
                    />
                    <h4 className="px-4 py-2 text-lg font-semibold line-clamp-3 text-ellipsis">
                      {anime.title}
                    </h4>
                  </Link>
                </div>
              ))}
            </div>
            <TablePagination
              component="div"
              color="primary"
              count={pagination.items.total}
              page={pagination.current_page - 1}
              onPageChange={onPageChange}
              rowsPerPage={pagination.items.per_page}
              onRowsPerPageChange={onChangeRowsPerPage}
              showFirstButton
              showLastButton
              rowsPerPageOptions={[10, 15, 20, 25]}
            />
          </>
        )}
      </Await>
    </Suspense>
  );
}
