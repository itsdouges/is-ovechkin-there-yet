import { suspend } from "suspend-react";

const totalGoalsNeededToBreak = 895;
const goalsToStartTheSeason = 853;

function humanDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(date));
}

export const fetchCache = "force-no-store";

export function Estimate() {
  const [stats, schedule] = suspend(
    () =>
      Promise.all([
        fetch("https://api-web.nhle.com/v1/player/8471214/landing", {
          cache: "no-cache",
        }).then((res) => res.json()),
        fetch("https://api-web.nhle.com/v1/club-schedule-season/WSH/20242025", {
          cache: "no-cache",
        }).then((res) => res.json()),
      ]),
    []
  );
  const { goals, gamesPlayed } = stats.featuredStats.regularSeason.subSeason;
  const goalsPerGame = goals / gamesPlayed;
  const goalsNeeded = totalGoalsNeededToBreak - goalsToStartTheSeason;
  const gamesNeeded = Math.ceil(goalsNeeded * goalsPerGame);
  const nextGameIndex = schedule.games.findIndex(
    (game: { startTimeUTC: string }) => {
      const startUTC = new Date(game.startTimeUTC);
      const currentUTC = new Date();

      return startUTC > currentUTC;
    }
  );
  const estimatedGame = schedule.games[nextGameIndex + gamesNeeded];
  const currentGoalTotal = goalsToStartTheSeason + goals;

  return (
    <>
      <h1 className="text-6xl text-center font-semibold">
        Is Ovechkin There Yet?
      </h1>
      <div className="text-9xl text-center font-bold">
        {gamesNeeded <= 0 ? "YES" : "NO"}
      </div>
      <span className="font-semibold">
        {currentGoalTotal} / {totalGoalsNeededToBreak} goals
      </span>
      <div className="font-medium">
        But he&apos;ll do it at the{" "}
        <a
          className="text-blue-400 underline font-medium"
          target="_blank"
          href={`https://nhl.com${estimatedGame.gameCenterLink}`}
        >
          {estimatedGame.awayTeam.abbrev} vs. {estimatedGame.homeTeam.abbrev}
        </a>{" "}
        game on {humanDate(estimatedGame.gameDate)}, probably!
      </div>

      <div className="flex gap-0.5 flex-wrap max-w-screen-md">
        {Array.from({ length: totalGoalsNeededToBreak })
          .map((_, i) => i)
          .reverse()
          .map((goal) => (
            <div
              className={
                "w-3 rounded-full md:w-5 md:h-5 h-3 " +
                (goal <= currentGoalTotal ? "bg-green-700" : "bg-neutral-700")
              }
              key={goal}
            />
          ))}
      </div>
    </>
  );
}
