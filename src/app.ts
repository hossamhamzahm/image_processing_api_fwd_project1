import express from 'express';
import path from 'path';
import apiRouter from './routes/index';
import errorMiddleware from './controller/errorMiddleware';
import noPath from './controller/noPath';
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.use('/api', apiRouter);

// render page not found if no path is matched
app.get('*', noPath);

// error middleware
app.use(errorMiddleware);

export default app;
