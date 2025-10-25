import { createRequire } from 'module';
import { promises as fs } from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);
const data = require('../src/jobs.json');
let jobs = data.jobsServer;

export default async function Handler (req, res) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      if (id) {
        const job = jobs.find((j) => j.id.toString() === id.toString());
        if (!job) {
          return res.status(404).json({error: "404 Kolade could not find the job"});
        } else {
          return res.status(200).json(job)
        }
      } else {
        return res.status(200).json(jobs)
      }
    } catch {
      return res.status(500).json({error: "500 Kolade's Server did not respond well"})
    }
  }

  if (req.method === "POST") {
    try {
      const newJob = req.body; // data sent from frontend form
      // newJob.id = Date.now().toString(); // simple unique id

      // Add to our in-memory array
      jobs.push(newJob);

      // Also save to file so it persists
      const filePath = new URL("../src/jobs.json", import.meta.url).pathname;
      await fs.writeFile(filePath, JSON.stringify({ jobsServer: jobs }, null, 2));

      return res.status(201).json(newJob);
    } catch (error) {
      console.error("API POST error:", error);
      return res.status(500).json({ error: "Failed to save job" });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      jobs = jobs.filter((job) => job.id.toString() !== id.toString());

      // save to file so it persists
      const filePath = new URL("../src/jobs.json", import.meta.url).pathname;
      await fs.writeFile(filePath, JSON.stringify({ jobsServer: jobs }, null, 2));

      //return the updated jobs array
      return res.status(200).json(jobs);
    } catch (err) {
      return res.status(500).json({error: 'could not process delete request'})
    }
  }

  if (req.method === 'PUT') {
    return res.status(500).json({error: 'Update job functionality has not been implemented'})
  }
}