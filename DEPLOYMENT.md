# Deployment & Database Setup Guide

This guide outlines how to deploy the **Ananta Labs India** website to a live public server for free and connect the standalone desktop app (`AnantaAdmin.exe`) to the live site.

---

## Part 1: Deploying the Website to the Cloud (Free & Live)

The easiest, standard way to host Next.js websites for free with fully operational backend APIs is **Vercel** (created by the creators of Next.js).

### Step 1: Upload Project to GitHub
1. Open Git/GitHub Desktop on your computer.
2. Initialize Git in the project directory `ananta labs india .web` and push it to a new private repository on your GitHub account.

### Step 2: Import Project to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up for a free **Hobby** account using your GitHub login.
2. Click **Add New** > **Project**.
3. Import your newly created repository from the GitHub list.
4. Click **Deploy**! Vercel will automatically compile, optimize, and launch your live website (e.g., `https://ananta-labs.vercel.app`).

---

## Part 2: Dynamic Database Integration (MongoDB Atlas)

Since serverless cloud environments (like Vercel) are stateless, they cannot save orders to local JSON files (`orders.json`). Instead, our codebase has been pre-configured to dynamically switch to a cloud database whenever you set a connection string.

### Step 1: Get a Free Database URL
1. Sign up for a free account at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new **Free Shared Cluster** (costs ₹0/forever).
3. Under Database Access, create a database user and password.
4. Under Network Access, add `0.0.0.0/0` (Allow access from anywhere) so Vercel serverless nodes can connect.
5. Click **Connect** > **Drivers** to copy your connection URL, which looks like:
   `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`

### Step 2: Add URL to Vercel Environment Settings
1. Open your project dashboard on Vercel.
2. Go to **Settings** > **Environment Variables**.
3. Add a new variable:
   - **Key**: `MONGODB_URI`
   - **Value**: *Your copied MongoDB connection URL (with your user password filled in)*
4. Click Save and trigger a redeployment. The live website will now automatically route all orders and inquiries to your secure cloud database!

---

## Part 3: Connecting the Desktop Application (.exe)

Once the website is live, you do not need to run local hosts at all. You can configure your standalone desktop console (`AnantaAdmin.exe`) to connect directly to the live server.

1. Go to your project output directory: `dist/`.
2. Locate `AnantaAdmin.exe` and the auto-created configuration file `server_url.txt`.
3. Open `server_url.txt` in Notepad or any editor.
4. Replace `http://localhost:3000/admin` with your live deployed website URL, for example:
   `https://ananta-labs.vercel.app/admin`
5. Save the text file.
6. Double-click `AnantaAdmin.exe`! The desktop console will launch in a secure window and synchronize directly with the live database hosted in the cloud.
