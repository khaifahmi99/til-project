import express from "express";
import dotenv from "dotenv";
import { Client } from "./Client";
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

app.get("/", (_, res) => {
  res.send("Hello world!" );
});

app.get("/docs", async (req, res) => {
  const itemsPerPage = 25;
  const page = Number(req.query.page) || 1;

  try {
    const r = await Client.any(`
      SELECT * FROM docs
      ORDER BY date_created DESC
      LIMIT $1
      OFFSET $2;`, [itemsPerPage, page - 1]);
    res.send(r);
  } catch (e) {
    res.status(500).send('Something went wrong');
  }
});

app.get("/docsTagged/:tag", async (req, res) => {
  if (!req.params.tag) {
    return res.status(400).json({'error': 'No tag'});
  }

  const itemsPerPage = 25;
  const page = Number(req.query.page) || 1;

  try {
    const r = await Client.any(`
      SELECT * FROM docs
      WHERE tags @> ARRAY[$1]
      ORDER BY date_created DESC
      LIMIT $2
      OFFSET $3;`, [req.params.tag, itemsPerPage, page - 1]);
    res.send(r);
  } catch (e) {
    res.status(500).send('Something went wrong');
  }
});

app.get("/docs/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({'error': 'No id'});
  }

  try {
    const r = await Client.oneOrNone('SELECT * FROM docs WHERE id = $1', [req.params.id]);
    if (!r) {
      res.status(404).json({'error': 'Doc with id not found'});
    } else {
      res.status(200).json(r);
    }
  } catch (e) {
    res.status(500).send('Something went wrong');
  }
});

app.post('/doc', async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({'error': 'No title'});
  }
  if (!req.body.content) {
    return res.status(400).json({'error': 'No content'});
  }

  const tags: string[] = [];
  if (req.body.tags) {
    (req.body.tags as string).split(',').forEach(tag => {
      tags.push(tag);
    });
  }

  const { title, content } = req.body;

  try {
    const r = await Client.one(`
    INSERT INTO docs (title, content, tags)
    VALUES ($1, $2, $3)
    RETURNING id;`, [title, content, tags]);
    res.send(r);
  } catch (e) {
    console.log(e);
    res.status(500).send('Something went wrong');
  }

})

app.use((req, res, next) => {
    res.status(404).send({
    status: 404,
    error: 'Not found'
  })
})

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});