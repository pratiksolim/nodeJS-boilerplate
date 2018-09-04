const FrequencyController = require('../controllers/frequency');

class Frequency {
	constructor() {
		this.frequencyController = new FrequencyController();
	}

	attachRoutes(router) {
		return router
			.get('/frequency/:no', this.frequencyController.getFrequentWords);
	}
}

module.exports = Frequency;
