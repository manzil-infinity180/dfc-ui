export default async function makeRequestToBackendServer(currentCode: string) {

    try{
    const req = await fetch("http://localhost:8000/upload", {
        method: "POST",
        headers: {
        "Content-Type": "text/plain",
        },
        body: `${currentCode}`
    })
    const data = await req.json();
    console.log(data)
    }catch(err: unknown) {
        console.log(err)
    }
}