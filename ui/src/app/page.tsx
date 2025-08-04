import Code from "@/component/code";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark"
          src="/dfc-ui.svg"
          alt="dfc logo"
          width={480}
          height={60}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            <Code>(D)ocker(F)ile (C)onverter</Code>
          </li>
          <li className="tracking-[-.01em]">
            <Code>CLI</Code> to convert <Code>Dockerfiles</Code> to use <Code>Chainguard</Code> Images
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/convert"
            rel="noopener noreferrer"
          >
            <Image
              className="dark"
              src="/chainguard.png"
              alt="chainguard logomark"
              width={50}
              height={0}
            />
            Try dfc-UI
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://github.com/manzil-infinity180/dfc-ui"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contribute
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.chainguard.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={24}
            height={16}
          />
          Learn About Chainguard →
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/chainguard-dev/dfc?tab=readme-ov-file#examples"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={24}
            height={16}
          />
          Go to <b>DFC</b> offical repo →
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/rahul-vishwakarma-553874256/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
          className="dark"
            aria-hidden
            src="/rahulxf.png"
            alt="Globe icon"
            width={36}
            height={16}
          />
          Made By <b>Rahul Vishwakarma</b> <Code>(@rahulxf)</Code> →
        </a>
      </footer>
    </div>
  );
}
