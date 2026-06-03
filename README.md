#  GitHub Repo Explorer

A beautifully designed full-stack web application that allows users to search for GitHub profiles, view their details, and explore their public repositories.

 Live Demo: [https://git-hub-repo-explorer-blue.vercel.app/](https://git-hub-repo-explorer-blue.vercel.app/)

##  Features

- **Search GitHub Users:** Clean and debounced search input to find any GitHub user.
- **Profile Summary:** Displays the user's avatar, bio, follower count, and total public repositories.
- **Repository List:** View repositories with details like description, primary language, stars, and last updated date.
- **Expandable Details:** Click on any repository card to reveal extended details (Open Issues, Watchers, Default Branch, and Size).
- **Sort & Filter:** Easily sort repositories by Stars, Name, or Last Updated.
- **Pagination:** Smooth "Load More" functionality to navigate through users with hundreds of repositories.
- **Language Chart:** Visual representation of the programming languages used across the user's profile.
- **Recent Searches:** Persisted history of your recent searches for quick access.
- **Dark Mode:** Fully responsive UI with a seamless Light/Dark mode toggle.
- **Smart Caching:** Server-side caching to minimize API requests and avoid rate limits.

---

##  Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, Axios
- **External API:** GitHub REST API

---

##  How to Run Locally

If you are not a developer, don't worry! Just follow these step-by-step instructions to get this project running on your computer.

### 1. Prerequisites
You need to have the following installed on your computer:
1. **Node.js** (Download and install from [here](https://nodejs.org/))
2. **Git** (Download and install from [here](https://git-scm.com/))
3. A **GitHub Personal Access Token** (This is required so GitHub doesn't block your searches).
   - Go to GitHub.com > Settings > Developer Settings > Personal access tokens > Tokens (classic).
   - Click "Generate new token", give it any name, and generate it. Save this token somewhere safe!

### 2. Download the Project
Open your computer's terminal (Command Prompt or PowerShell on Windows, Terminal on Mac) and run:
```bash
git clone https://github.com/your-username/GitHub-Repo-Explorer.git
cd GitHub-Repo-Explorer
```
*(Note: If you already downloaded the folder manually, just open your terminal and navigate inside the folder).*

### 3. Setup the Backend Server
Open a terminal inside the project folder and run:
```bash
# Navigate to the server folder
cd server

# Install the required packages
npm install
```

Now, create a file named `.env` inside the `server` folder and paste the following inside it:
```env
PORT=5000
GITHUB_BASE_URL=https://api.github.com
GITHUB_TOKEN=paste_your_personal_access_token_here
```

Start the server:
```bash
npm run dev
```
*Leave this terminal window open!*

### 4. Setup the Frontend Client
Open a **new** terminal window inside the main project folder and run:
```bash
# Navigate to the client folder
cd client

# Install the required packages
npm install
```

Now, create a file named `.env` inside the `client` folder and paste the following inside it:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the client:
```bash
npm run dev
```

### 5. Open the App! 
Your terminal will show a link (usually `http://localhost:5173/`). Hold `Ctrl` (or `Cmd` on Mac) and click the link, or copy and paste it into your browser. 

You are now ready to search for any GitHub user!
