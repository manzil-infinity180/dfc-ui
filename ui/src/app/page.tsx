import Code from "@/component/code";
import Footer from "@/component/footer";
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
            <Code>UI</Code> to convert<Code>Dockerfiles</Code>to use<Code>Chainguard Images.</Code>
          </li>
          <li className="tracking-[-.01em]">
            Built on top of<Code>dfc Go SDK.</Code>
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
    <Footer />
    </div>
  );
}
