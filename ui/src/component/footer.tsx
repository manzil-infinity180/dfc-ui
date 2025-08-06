import Image from "next/image";
import Code from "@/component/code";
export default function Footer() {
  return (
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
        Made By<Code>@rahulxf</Code> →
      </a>
    </footer>
  );
}
