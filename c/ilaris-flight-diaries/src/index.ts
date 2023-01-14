import express from 'express';
import diariesRouter from './routes/diaries';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('Pong');
});

app.use('/api/diaries', diariesRouter);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});