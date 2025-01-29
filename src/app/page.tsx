import { CommandBoard } from "./command-board";

export default function Home() {
  return (
    <div className="flex flex-grow flex-col items-center px-4 justify-center	">
      <main className="flex flex-col gap-8 items-center sm:items-center justify-center">
        <h1 className="text-2xl font-medium">Welcome to Livl Consulting ERP</h1>
        <CommandBoard />
      </main>
    </div>
  );
}
