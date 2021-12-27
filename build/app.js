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
console.clear();
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const PORT = 3004;
const SECRET = 'The Secret Key for the Chat APP';
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('/setUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const token = jsonwebtoken_1.default.sign(name, SECRET);
        res.status(200).json({
            token: token,
        });
    }
    catch (error) {
        res.status(400).json({
            token: null
        });
    }
}));
app.get('/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (token) {
            const verifyTheToken = jsonwebtoken_1.default.verify(token, SECRET);
            console.log(verifyTheToken);
            res.status(200).json({
                name: verifyTheToken
            });
        }
    }
    catch (error) {
        res.status(400).json({
            token: null
        });
    }
}));
const server = app.listen(PORT, () => {
    console.log('The server is running on ', PORT);
});
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000"]
    }
});
io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
}));
