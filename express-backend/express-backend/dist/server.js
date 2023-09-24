"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("crypto"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173'
}));
app.get('/', (req, res) => {
    res.send('This is a server for an application using Express.js and TypeScript!!!!');
});
app.get('/tests', (req, res) => {
    res.send(tests);
});
const quotes = [
    { name: "Claude Shannon", quote: "Information is the resolution of uncertainty." },
    { name: "Ada Lovelace", quote: "That brain of mine is something more than merely mortal; as time will show." },
    { name: "Edsger W. Dijkstra", quote: "Program testing can be used to show the presence of bugs, but never to show their absence!" },
    { name: "Linus Torvalds", quote: "Talk is cheap. Show me the code." },
    { name: "Martin Fowler", quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand." },
    { name: "Bill Gates", quote: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight." },
    { name: "Steve Jobs", quote: "Technology alone is not enough. It's technology married with the liberal arts, married with the humanities, that yields the results that make our hearts sing." },
    { name: "Donald Knuth", quote: "Beware of bugs in the above code; I have only proved it correct, not tried it." },
    { name: "Bjarne Stroustrup", quote: "There are only two kinds of languages: the ones people complain about and the ones nobody uses." },
    { name: "Alan J. Perlis", quote: "A language that doesn't affect the way you think about programming is not worth knowing." }
];
const tests = quotes.map((quoteObj) => {
    return {
        id: generateRandomID(),
        name: quoteObj.name,
        executionTime: Math.random() * 4000,
        quote: quoteObj.quote
    };
});
function generateRandomID() {
    return crypto_1.default.randomUUID();
}
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
