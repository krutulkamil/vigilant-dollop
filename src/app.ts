import express, { Request, Response } from 'express';

const port = 1337;

const app = express();

app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);
});