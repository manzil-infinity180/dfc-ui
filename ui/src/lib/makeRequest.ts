export default async function makeRequestToBackendServer() {
    try{
    const req = await fetch("http://localhost:8000/upload", {
        method: "POST",
        headers: {
        "Content-Type": "text/plain",
        },
        body: `
        FROM alpine
        RUN apk add curl
        `
    })
    const data = await req.json();
    console.log(data)
    }catch(err: unknown) {
        console.log(err)
    }
}