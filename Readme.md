<div align="center">
<p align="center">
<img align="center" alt="dfc" width="360" src="./ui/public/dfc-ui.svg">
<!--   <img width="250" align="center" alt="dfc-ui" src="https://github.com/user-attachments/assets/96e29a8a-b55f-4d93-b1af-a2d66071c272" /> -->
</p>

<p align="center">
<h3><b><code>d</code>ocker<code>f</code>ile <code>c</code>onverter</b></h3>

<p align="center">UI to convert Dockerfiles to use Chainguard Images</p>
</p>
</div>



https://github.com/user-attachments/assets/14cc31cf-6d9e-40b2-956c-8c28d44f069f



---


## About the `dfc` UI/CLI

> **DFC-UI** is a web-based user interface built on top of the [`dfc`](https://github.com/chainguard-dev/dfc) CLI tool using its Go SDK. It allows you to convert Dockerfiles to use [Chainguard Images](https://chainguard.dev/) and replace `FROM` and `RUN` lines with secure, minimal base images and APK-based commands — all via your browser.


The `dfc` tool helps you migrate traditional Dockerfiles to use Chainguard Images and APK packages instead of bulky base images or unsafe dependency installs. It's built to improve container image security and reproducibility.

📖 Learn more:

- [Dockerfile Conversion Guide](https://github.com/chainguard-dev/dfc#conversion-guide)
- [Chainguard Migration Overview](https://www.chainguard.dev/unchained/migrating-to-chainguard-images)

---

## Features

- 📁 Upload a Dockerfile directly from your computer
- 🧠 See side-by-side diffs between your original and converted Dockerfile
- ✍️ Edit the original Dockerfile before conversion
- 🔁 Convert multiple times with different versions
- ⚙️ Built with Next.js (UI) + Go (API using dfc SDK)

---

## Getting Started (Local Dev)

```bash
# Clone the repo
git clone https://github.com/yourusername/dfc-ui.git
cd dfc-ui

# Start the UI
cd ui
npm install
npm run dev
> This starts the Next.js frontend on http://localhost:3000

# Start the API server (Backend)
cd api
go mod download
go run main.go
> The backend runs on http://localhost:8000

```

## How to Convert Dockerfiles (in the UI)

<img width="1048" height="639" alt="Screenshot 2025-08-06 at 12 13 30 AM" src="https://github.com/user-attachments/assets/d1380c2b-c969-4d6a-8f9a-20a0f1712c86" />


## Contributing 🎉
Contributions are welcome! If you'd like to improve the UI, add error handling, or enhance conversion features — open a PR or file an issue.

<p align="center">
<img width="450" height="450" alt="image" src="https://github.com/user-attachments/assets/92fe17a5-bffe-469d-beb3-0769bb85d4a5" />
</p>

## Author

Built with 💙 by **Rahul Vishwakarma** 


