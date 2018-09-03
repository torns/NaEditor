const Koa = require('koa');
import renderPage from './page';
const app = new Koa();

app.use(async(ctx) => {
    const { str, state } = renderPage();
    ctx.body = `
        <html>
            <link rel="stylesheet" href="http://localhost:8081/vendor.css"/>
            <link rel="stylesheet" href="http://localhost:8081/page/view.css"/>
            <body>
                <script>window.__INITIAL_STATE__=${state}</script>
                <div id="app">${str}</div>
                <div class="J_previewWrap"></div>
            </body>
            <script type="text/javascript" src="http://localhost:8081/vendor.bundle.js"></script>
            <script type="text/javascript" src="http://localhost:8081/page/view.bundle.js"></script>
        </html>
    `
});

app.listen(8082);