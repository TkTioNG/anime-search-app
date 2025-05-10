import type {
  AnimeApiError,
  AnimeDetailResponse,
  AnimeListResponse,
} from "types/anime";

const BASE_URL = "https://api.jikan.moe/v4/anime";

const constructUrl = (
  path: string,
  params?: Record<string, string | undefined>
) => {
  const url = new URL(path);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value.toString());
      }
    });
  }

  return url;
};

const sanitizeAnimeApiError = (animeApiError: AnimeApiError) => {
  return (
    animeApiError.message ??
    (animeApiError.messages &&
      Object.values(animeApiError.messages).flat().join(", ")) ??
    animeApiError.error
  );
};

export const getAnimeList = async ({
  q,
  page = "1",
  limit = "10",
}: {
  q?: string;
  page?: string;
  limit?: string;
} = {}) => {
  const url = constructUrl(BASE_URL, {
    q,
    page,
    limit,
  });
  const response = await fetch(url);
  const animeListData: AnimeListResponse = await response.json();

  if ("error" in animeListData) {
    throw new Error(sanitizeAnimeApiError(animeListData));
  }
  return animeListData;
};

export const getAnimeDetail = async (id: string) => {
  const url = constructUrl(`${BASE_URL}/${id}`);
  const response = await fetch(url);
  const animeDetailData: AnimeDetailResponse = await response.json();

  if ("error" in animeDetailData) {
    throw new Error(sanitizeAnimeApiError(animeDetailData));
  }
  return animeDetailData;
};
