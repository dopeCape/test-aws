"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const chrome_1 = require("../lib/chrome");
dotenv_1.default.config();
const app = (0, express_1.default)();
const leads = [];
let request = "";
const port = "3000" || process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/fetchleads", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, searchTerm, } = req.body;
    yield chrome_1.LinkedinActions.fetchLeads(searchTerm, userId);
    res.status(200).json({
        leads: leads,
    });
    leads.length = 0;
}));
app.post("/getLeads", (req, res) => {
    const lead = req.body;
    leads.push(...lead);
    res.send(200);
});
app.post("/sendrequest", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { profileURN, message } = req.body;
    const strignedObjec = JSON.stringify({
        profileURN,
        message,
    });
    request = strignedObjec;
    console.log(strignedObjec);
    yield chrome_1.LinkedinActions.sendReuqest(strignedObjec);
    res.status(200).json("sent!!!");
}));
app.get("/reqest", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(request);
    request = "";
}));
app.get("/test", (_, res) => {
    res.send("server running correctly ");
});
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
