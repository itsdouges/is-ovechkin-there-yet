import { Suspense } from "react";
import { Estimate } from "../components/estimate";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header>
        <a
          target="_blank"
          href="https://github.com/itsdouges/is-ovechkin-there-yet"
          className="fixed text-sm top-2 right-2"
        >
          Made with ❤️ by Michael Dougall
        </a>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <Suspense>
          <Estimate />
        </Suspense>
      </main>
    </div>
  );
}
