import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // In production, __dirname points to dist/ directory
  // But in bundled CJS, we need to use process.cwd() as fallback
  let distPath = path.resolve(__dirname, "public");
  
  console.log(`[static] __dirname: ${__dirname}`);
  console.log(`[static] process.cwd(): ${process.cwd()}`);
  console.log(`[static] Initial distPath: ${distPath}`);
  
  // If public folder not found at __dirname/public, try cwd/dist/public
  if (!fs.existsSync(distPath)) {
    console.log(`[static] distPath not found, trying process.cwd() fallback`);
    distPath = path.resolve(process.cwd(), "dist", "public");
    console.log(`[static] Fallback distPath: ${distPath}`);
  }
  
  if (!fs.existsSync(distPath)) {
    // List available directories for debugging
    const cwdContents = fs.readdirSync(process.cwd());
    console.log(`[static] Contents of cwd: ${cwdContents.join(", ")}`);
    
    const distDir = path.resolve(process.cwd(), "dist");
    if (fs.existsSync(distDir)) {
      const distContents = fs.readdirSync(distDir);
      console.log(`[static] Contents of dist: ${distContents.join(", ")}`);
    }
    
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  console.log(`[static] Serving static files from: ${distPath}`);
  const indexPath = path.resolve(distPath, "index.html");
  console.log(`[static] index.html exists: ${fs.existsSync(indexPath)}`);

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
