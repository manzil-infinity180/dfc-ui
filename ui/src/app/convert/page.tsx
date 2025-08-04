"use client";
import DockerfileLineToString from "@/lib/dfcString";
import makeRequestToBackendServer from "@/lib/makeRequest";
import DockerfileLine from "@/types/DockerfileLine";
import { useState } from "react";

export default function Code() {
  console.log("Component rendered");
  const [file, setFile] = useState<File | null>(null);
  const [, setFileName] = useState<string | null>(null);
  const [, setLines] = useState<Array<DockerfileLine> | null>(null)
  const [dockerfileString, setDockerfileString] = useState<string>("")
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
        setLines(data.lines)
        setDockerfileString(DockerfileLineToString(data.lines))
      } catch (err: unknown) {
        console.log(err);
      }
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("hello");
    if (event.target.files !== null && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(event.target);
      setFile(file);
      setFileName(file.name);
    }
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
        (D)ocker(F)ile (C)onverter
      </code>
      <button
        type="button"
        onClick={makeRequestToBackendServer}
        style={{ cursor: "pointer" }}
      >
        Hello
      </button>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            style={{ cursor: "pointer" }}
            onChange={handleFileChange}
          />
          <button type="submit">Upload Dockerfile</button>
        </form>
      </div>
     <h5>{dockerfileString}</h5>
    </div>
  );
}
