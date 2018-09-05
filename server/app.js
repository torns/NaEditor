import Koa from 'koa';
import logger from 'koa-logger';
const app = new Koa();
import Router from './router';

app.use(logger());

const router = Router();
app.use(router.routes());


app.listen(8082);