const Koa = require('koa');
const cors = require('kcors');
const logger = require('koa-morgan');
const bodyParser = require('koa-bodyparser');
const compression = require('koa-compress');
const dotenv = require('dotenv');

dotenv.config();

const ErrorMiddleware = require('./middlewares/errorHandler');
const Apis = require('./routes/index');

require('./init');

const app = new Koa();

app.use(cors());

app.use(compression({
	threshold: 1024,
}));

app.use(bodyParser({
	enableTypes: ['json', 'form'],
	jsonLimit: '10mb',
	formLimit: '10mb',
}));

app.use(logger('dev', {
	skip: () => app.env === 'test',
}));

const errorHandler = new ErrorMiddleware();
app.use(errorHandler.handle404);

const indexRouter = new Apis();
indexRouter.attachRoutes();

app.use(indexRouter.routes());

module.exports = app;
