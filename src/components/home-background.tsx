"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type GameType = "MP" | "BR";

const GameBackgroundContext = createContext<{
  game: GameType;
  setGame: (game: GameType) => void;
} | null>(null);

export function useGameBackground() {
  const ctx = useContext(GameBackgroundContext);
  if (!ctx) throw new Error("useGameBackground must be used within HomeBackground");
  return ctx;
}

const BACKGROUND_IMAGE: Record<GameType, string> = {
  MP: "/images/cover.jpg",
  BR: "/images/cover-br.jpg",
};

export default function HomeBackground({ children }: { children: ReactNode }) {
  const [game, setGame] = useState<GameType>("MP");

  return (
    <GameBackgroundContext.Provider value={{ game, setGame }}>
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
        style={{ backgroundImage: `url('${BACKGROUND_IMAGE[game]}')` }}
      />
      <div className="fixed inset-0 bg-white/85 dark:bg-neutral-950/80 transition-colors duration-300" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(234,88,12,0.12),_transparent_60%)]" />
      {children}
    </GameBackgroundContext.Provider>
  );
}
