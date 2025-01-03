import { getGames } from "@repo/utils";

export default function Home() {
  const text = getGames();

  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
}
