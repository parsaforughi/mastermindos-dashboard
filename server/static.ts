import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // Try multiple possible paths for static files
  const possiblePaths = [
    path.resolve(__dirname, "public"), // When __dirname is dist/, this is dist/public
    path.resolve(process.cwd(), "dist", "public"), // From project root
    path.resolve(process.cwd(), "public"), // Direct public folder
  ];

  console.log("📁 Looking for static files...");
  console.log("📁 __dirname:", __dirname);
  console.log("📁 process.cwd():", process.cwd());
  
  let distPath: string | null = null;
  
  for (const possiblePath of possiblePaths) {
    console.log(`📁 Checking: ${possiblePath}`);
    if (fs.existsSync(possiblePath)) {
      distPath = possiblePath;
      console.log(`✅ Found static files at: ${distPath}`);
      break;
    }
  }

  if (!distPath) {
    console.error("❌ Could not find static files in any of these locations:");
    possiblePaths.forEach(p => console.error(`   - ${p}`));
    throw new Error(
      `Could not find the build directory. Checked: ${possiblePaths.join(", ")}`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    console.log(`📄 Serving index.html from: ${indexPath}`);
    if (!fs.existsSync(indexPath)) {
      console.error(`❌ index.html not found at: ${indexPath}`);
      return res.status(404).send("index.html not found");
    }
    res.sendFile(indexPath);
  });
}
