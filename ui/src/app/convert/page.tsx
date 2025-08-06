"use client";
import DockerfileLineToString from "@/lib/dfcString";
import DockerfileLine from "@/types/DockerfileLine";
import { useState, useEffect } from "react";
import Image from "next/image";
import Editor from "@monaco-editor/react";
import { DiffEditor } from "@monaco-editor/react";
import Code from "@/component/code";

export default function Convert() {
  console.log("Component rendered");
  const [file, setFile] = useState<File | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [, setFileName] = useState<string | null>(null);
  const [, setLines] = useState<Array<DockerfileLine> | null>(null);
  const [originalFileContent, setOriginalFileContent] = useState<string>("");
  const [convertedFileContent, setConvertedFileContent] = useState<string>("");
  const [diffEditor, setDiffEditor] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  async function makeRequestToBackendServer(currentCode: string) {
    try {
      const req = await fetch("http://localhost:8000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: `${currentCode}`,
      });
      const data = await req.json();
      console.log(data);
      setLines(data.lines);
      const converted = DockerfileLineToString(data.lines);
      setConvertedFileContent(converted);
    } catch (err: unknown) {
      console.log(err);
    }
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("dockerfile", file);
      try {
        const req = await fetch("http://localhost:8000/upload", {
          method: "POST",
          body: formData,
        });
        const data = await req.json();
        console.log(data);
        setLines(data.lines);
        setConvertedFileContent(DockerfileLineToString(data.lines)); // converted one
      } catch (err: unknown) {
        console.log(err);
      }
    }
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("hello");
    if (event.target.files !== null && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(event.target);
      setFile(file);
      setFileName(file.name);
      const text = await file.text(); // read original file contents
      setOriginalFileContent(text);
    }
  };

  if (isMobile) {
    return (
      <div className="font-sans min-h-screen grid grid-rows-[auto_1fr_auto] bg-white dark:bg-black p-6 sm:p-12">
        <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
          <Image
            className="dark"
            src="/dfc-ui.svg"
            alt="DFC logo"
            width={180}
            height={38}
            priority
          />
          <Code>(D)ocker(F)ile (C)onverter</Code>
          <h2 className="text-xl sm:text-2xl font-semibold">Go to desktop.</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            I didn’t make this page mobile friendly. I have a life.
          </p>
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
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen grid grid-rows-[auto_1fr_auto] p-6 sm:p-12 gap-10 bg-white dark:bg-black">
      <header className="flex flex-col items-center justify-center pt-8 pb-6 px-8">
        <Image
          className="dark"
          src="/dfc-ui.svg"
          alt="DFC logo"
          width={180}
          height={38}
          priority
        />
        <Code>(D)ocker(F)ile (C)onverter</Code>
      </header>
      <main className="w-full max-w-xl mx-auto flex flex-col items-center gap-6">
        {convertedFileContent.length > 0 && (
          <button
            type="button"
            onClick={() => makeRequestToBackendServer(originalFileContent)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Do Again - Conversion
          </button>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4"
        >
          <input
            type="file"
            className="w-64 py-2 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600"
            onChange={handleFileChange}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Convert/Upload Dockerfile
          </button>
        </form>
        {convertedFileContent && (
          <div className="flex justify-center items-center mt-4">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              <input
                type="checkbox"
                onChange={() => setDiffEditor((s) => !s)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span>Show Diff Editor</span>
            </label>
          </div>
        )}
        {!file && (
          <div className="flex w-full min-h-screen gap-x-4 px-4 justify-center m-12">
            <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
              <h1 className="font-mono text-xl my-2">How to Convert:</h1>
              <li className="mb-2 tracking-[-.01em]">
                Upload <Code>Dockerfile</Code> from your computer!
              </li>
              <li className="tracking-[-.01em]">
                Click on <Code>Convert/Upload Dockerfile</Code>
              </li>
              <li className="tracking-[-.01em]">
                Make changes to <Code>Original Dockerfile</Code>
              </li>
              <li className="tracking-[-.01em]">
                Click on <Code>Do Again - Conversion</Code> to Convert!!
              </li>
              <h1 className="font-mono text-xl my-2"> Happy dfC!!!</h1>
            </ol>
          </div>
        )}
      </main>

      <div className="flex w-full min-h-screen gap-x-4 px-4">
        {file && (
          <div className="w-[50%] border-r border-gray-300">
            <div className="items-center justify-center">
              {convertedFileContent.length > 0 && (
                <Code>Original Dockerfile</Code>
              )}
            </div>

            {/* {convertedFileContent.length > 0 && ( */}
            <Editor
              height="90vh"
              width="100%" // full width of the 40% parent
              language="dockerfile"
              value={originalFileContent}
              onChange={(s) => setOriginalFileContent(s ?? "")}
              theme="vs-dark"
              options={{
                // readOnly: true,
                fontSize: 16, // increase font size (default is 14)
                lineNumbers: "on",
                minimap: { enabled: false }, // optional: hides minimap
              }}
            />
            {/* )} */}
          </div>
        )}

        <div className="w-[50%]">
          {convertedFileContent.length > 0 && (
            <div className="items-center justify-center">
              {convertedFileContent.length > 0 && (
                <Code>Converted Dockerfile</Code>
              )}
            </div>
          )}
          {convertedFileContent.length > 0 && diffEditor && (
            <Editor
              height="90vh"
              width="100%" // full width of the 40% parent
              language="dockerfile"
              value={convertedFileContent}
              onChange={(s) => setConvertedFileContent(s ?? "")}
              theme="vs-dark" // optional
              options={{
                // readOnly: true,
                fontSize: 16, // increase font size (default is 14)
                lineNumbers: "on",
                minimap: { enabled: false }, // optional: hides minimap
              }}
            />
          )}
          {convertedFileContent.length > 0 && !diffEditor && (
            <DiffEditor
              height="90vh"
              width="100%"
              original={originalFileContent} // your original Dockerfile string
              modified={convertedFileContent} // your converted Chainguard Dockerfile string
              language="dockerfile"
              theme="vs-dark" // or "light", or see other themes below
              options={{
                // readOnly: true,
                fontSize: 16, // increase font size here
                wordWrap: "on",
                renderSideBySide: false, // true: side-by-side, false: inline
                minimap: { enabled: false },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
