import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx", [route("/", "routes/anime/animeList.tsx")]),
  route("/anime/:id", "routes/anime/animeDetail.tsx"),
] satisfies RouteConfig;
