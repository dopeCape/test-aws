import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { LinkedinActions } from "../lib/chrome";
import { Lead } from "../types";
dotenv.config();

const app = express();

const leads: Lead[] = [];
let request: string = "";
const port: string = "3000" || process.env.PORT;
app.use(express.json());
app.use(cors());

app.post("/fetchleads", async (req: Request, res: Response) => {
  const {
    userId,
    searchTerm,
  }: {
    userId: string;
    searchTerm: string;
  } = req.body;

  await LinkedinActions.fetchLeads(searchTerm, userId);
  res.status(200).json({
    leads: leads,
  });
  leads.length = 0;
});
app.post("/getLeads", (req: Request, res: Response) => {
  const lead = req.body;
  leads.push(...lead);
  res.send(200);
});
app.post("/sendrequest", async (req: Request, res: Response) => {
  const { profileURN, message } = req.body;
  const strignedObjec = JSON.stringify({
    profileURN,
    message,
  });
  request = strignedObjec;

  console.log(strignedObjec);
  await LinkedinActions.sendReuqest(strignedObjec);
  res.status(200).json("sent!!!");
});

app.get("/reqest", async (_: Request, res: Response) => {
  res.status(200).json(request);
  request = "";
});

app.get("/test", (_: Request, res: Response) => {
  res.send("server running correctly ");
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
