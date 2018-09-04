import Koa from 'koa';
import renderPage from './page';
import Action from '../src/common/script/action';
import logger from 'koa-logger';
const app = new Koa();

app.use(logger())

app.use(async(ctx, next) => {
    let { pageId } = ctx.request.query;
    const BASE_DATA = await Action.getInitData(2, pageId);
    pageId = Number.parseInt(pageId);
    const { str, state } = await renderPage(BASE_DATA);

    ctx.body = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title>浏览</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link href="http://localhost:8081/0.css" rel="stylesheet">
                <link href="http://localhost:8081/page/view.css" rel="stylesheet">
            </head>
            <body>
                <script>window.BASE_DATA=${JSON.stringify(BASE_DATA)}</script>
                <script>window.__INITIAL_STATE__=${state}</script>
                <div id="Container">${str}</div>
            </body>
            <script src="http://localhost:8081/vendor.bundle.js"></script>
            <script src="http://localhost:8081/page/view.bundle.js"></script>
        </html>
    `;
    await next();
});

app.listen(8082);