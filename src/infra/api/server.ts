import * as dotenv from 'dotenv';
import { app } from './express';
dotenv.config();

const port = process.env.PORT || 8080;

app.get('/', (_, res) => {
  res.status(200).send('App is running');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
