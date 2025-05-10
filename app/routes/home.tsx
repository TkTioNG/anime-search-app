import type { Route } from "./+types/home";
import { Outlet } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Anime Search App" },
    { name: "description", content: "Welcome to Anime Search App!" },
  ];
}

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Outlet />
    </main>
  );
}
