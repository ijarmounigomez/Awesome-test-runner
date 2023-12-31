import express from 'express';
import crypto from 'crypto';
import cors from 'cors';
const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}))


app.get('/', (_, res) => {
  res.send('This is a server for an application using Express.js and TypeScript!!!!');
})

app.get('/tests', (_, res) => {
  res.send(tests);
})

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


function randomisedResult(): Promise<'Succeeded' | 'Failed'> {
  const ms = Math.random() * 4000;
  const testResult = Math.random() < 0.5 ? 'Succeeded' : 'Failed';
  try {

    return new Promise((resolve, _) => {
      setTimeout(() => {
        if (testResult === 'Succeeded') {
          resolve(testResult);
        } else if (testResult === 'Failed') {
          resolve(testResult);
        }
      }, ms);
    })
  } catch (testError) {
    console.error({ testError }, 'An error occured');

    return Promise.resolve('Failed');
  }
}

const testMap = new Map();

const tests = quotes.map((quoteObj) => {
  const id = generateRandomID();

    testMap.set(id, {
    id,
    name: quoteObj.name,
    testResult: randomisedResult,
    quote: quoteObj.quote,
  });

  return {
    id, 
    name: quoteObj.name,
    quote: quoteObj.quote
  }
})



app.get('/tests/result/:id', async (req, res) => {
  const id = req.params.id;
  const test = testMap.get(id);
console.log(id)

  if (test) {
    try {
      const result = await test.testResult();

      res.send({ result });
    } catch (error) {
      res.status(500).send('Test Failed');
    }
  } else {
    res.status(404).send('Test Not Found');
  }
});

function generateRandomID() {
  return crypto.randomUUID();
}

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})
