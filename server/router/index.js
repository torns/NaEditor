import Router from 'koa-router';
import view from '../controller/view';
const router = new Router({});

router.get('*', async(ctx, next) => {
	await next();
});

router.get('/page', view);

export default function() {
	return router;
}