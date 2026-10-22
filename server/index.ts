import express from "express";
import { existsSync, readFileSync, writeFileSync } from "node:fs";


type LeaderboardEntry = { score: number; timestamp: string };
const LEADERBOARD_FILE = new URL("./leaderboard.json", import.meta.url);
const app = express();
app.use(express.json());


// TODO: Add your storage functions and routes here.
/*
Implementing Server-Side Storage
Add the following two functions above app.listen() in server/index.ts. 
loadLeaderboard(): LeaderboardEntry[]
If !existsSync(LEADERBOARD_FILE), return [].
Read the file into a string variable: const text = readFileSync(LEADERBOARD_FILE, "utf8");
Parse and return the entries: return JSON.parse(text) as LeaderboardEntry[];
saveLeaderboard(entries: LeaderboardEntry[]): void
Define our stringified entries: const jsonString = JSON.stringify(entries);
Save to the leaderboard file: writeFileSync(LEADERBOARD_FILE, jsonString, "utf8").
This creates or replaces server/leaderboard.json
*/

function loadLeaderboard(): LeaderboardEntry[] {
    if (!existsSync(LEADERBOARD_FILE)) {
        return [];
    }
    const text = readFileSync(LEADERBOARD_FILE, "utf8");
    return JSON.parse(text) as LeaderboardEntry[];
}

function saveLeaderboard(entries: LeaderboardEntry[]): void {
    const jsonString = JSON.stringify(entries);
    writeFileSync(LEADERBOARD_FILE, jsonString, "utf8");
}

app.get("/api/leaderboard", (_req, res) => {
 const entries = loadLeaderboard();
res.json(entries);
});


app.post("/api/leaderboard", (req, res) => {
 saveLeaderboard(req.body);
 res.json({ message: "Saved" });
});


app.listen(3001, () => console.log("Server running on port 3001"));
