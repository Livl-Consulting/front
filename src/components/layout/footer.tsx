import Image from "next/image";

export const Footer = () => (
  <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href="https://github.com/Livl-Consulting"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        aria-hidden
        src="/globe.svg"
        alt="Globe icon"
        width={16}
        height={16}
      />
      Livl Consulting →
    </a>
  </footer>
);
