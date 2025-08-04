"use client";
import DockerfileLineToString from "@/lib/dfcString";
import makeRequestToBackendServer from "@/lib/makeRequest";
import DockerfileLine from "@/types/DockerfileLine";
import { useState } from "react";
import Image from "next/image";
import Editor from "@monaco-editor/react";
import { DiffEditor } from "@monaco-editor/react";
import { Label } from "@/components/ui/label";

export default function Code() {
  console.log("Component rendered");
  const [file, setFile] = useState<File | null>(null);
  const [, setFileName] = useState<string | null>(null);
  const [, setLines] = useState<Array<DockerfileLine> | null>(null);
  const [originalFileContent, setOriginalFileContent] = useState<string>("");
  const [convertedFileContent, setConvertedFileContent] = useState<string>("");
  const [diffEditor, setDiffEditor] = useState(true);
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

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header className="flex flex-col items-center justify-center pt-8 pb-6 px-8">
        <div className="flex flex-col items-center gap-2 mb-8 my-2">
          <Image
            className="dark"
            src="/dfc-ui.svg"
            alt="DFC logo"
            width={180}
            height={38}
            priority
          />
          <code className="text-lg tracking-wide bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-4 py-2 rounded-lg">
            (D)ocker(F)ile (C)onverter
          </code>
        </div>
      </header>

      <button
        type="button"
        onClick={makeRequestToBackendServer}
        className="px-4 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        Do it Again
      </button>
      <div>
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
          <div className="flex justify-center items-center my-4">
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
      </div>

      <div className="flex w-full min-h-screen gap-x-4 px-4">
        {file && (
          <div className="w-[50%] border-r border-gray-300">
            {/* {convertedFileContent.length > 0 && ( */}
            <Editor
              height="90vh"
              width="100%" // full width of the 40% parent
              language="dockerfile"
              defaultValue={originalFileContent}
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
          {/* Right side content goes here */}
          {/* <p>This is the right pane (e.g. CVE results, suggestions, etc)</p>
           */}
          {convertedFileContent.length > 0 && diffEditor && (
            <Editor
              height="90vh"
              width="100%" // full width of the 40% parent
              language="dockerfile"
              defaultValue={convertedFileContent}
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
                renderSideBySide: true, // true: side-by-side, false: inline
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
