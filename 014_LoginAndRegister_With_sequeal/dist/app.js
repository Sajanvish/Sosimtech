"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
// import { log } from "console";
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const console_1 = __importDefault(require("console"));
const bcrypt = require("bcryptjs");
const register = require("./db");
const jwt = require("jsonwebtoken");
const app = (0, express_1.default)();
app.use(bodyParser.json());
const PORT = 5000;
// Registration
app.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt.genSalt(10);
    const pass = yield bcrypt.hash(request.body.Password, salt);
    console_1.default.log(pass);
    try {
        const result = yield register.create({
            FirstName: request.body.FirstName,
            LastName: request.body.LastName,
            Email: request.body.Email,
            Password: pass,
        });
        // await register.create(user);
        response.send({
            message: "data send",
            data: result,
        });
    }
    catch (error) {
        response.send({
            message: `error ${error}`,
        });
    }
}));
app.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield register.findAll();
    try {
        response.json({
            count: user.length,
            message: "get all user",
            data: user,
        });
    }
    catch (error) {
        response.json({
            message: `show me ${error}`,
        });
    }
}));
// Login page 
app.post("/login", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield register.findOne({ Email: request.body.Email });
    if (!result) {
        return response.json({
            message: "DONT MESS WITH US PROVIDE PROPER EMAIL"
        });
    }
    const match = yield bcrypt.compare(request.body.Password, result.Password);
    if (!match) {
        return response.json({
            message: "PASSWORD: YOU ARE DUMB WE TOLD YOU DONT MESS WITH US"
        });
    }
    // if All Matched
    const token = yield jwt.sign({ id: result._id }, "Sosimtech");
    response.json({
        data: result,
        message: "Congrates you are logged in ",
        token
    });
    //     try {
    //       const {Email,Password}=request.body;
    //       if (!(Email && Password)) {
    //         response.status(400).send("All input is required");
    //       }
    //     // Validate if user exist in our database
    //     const user = await register.findOne({ Email });
    //     if (user && (await bcrypt.compare(Password, user.Password))) {
    //       // Create token
    //   const token = await jwt.sign({id:user.id},"sgsshgd")
    //   response.json({
    //       data:user,
    //       message:"Congrates you are logged in ",
    //       token
    //   })
    // }
    //     } catch (error) {
    //       response.status(404).send({
    //         message:`show me ${error}`
    //       })
    //     }
}));
app.listen(PORT, () => {
    console_1.default.log(`http://localhost${PORT}`);
});
