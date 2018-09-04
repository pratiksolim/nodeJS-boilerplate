const Router = require('koa-router');

const Frequency = require('./frequency');

class IndexRouter extends Router {
	constructor() {
		super();
		this.frequency = new Frequency();
	}

	attachRoutes() {
		this.frequency.attachRoutes(this);
	}
}

module.exports = IndexRouter;
