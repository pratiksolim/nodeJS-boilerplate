const Raven = require('raven');

const Frequency = require('../modules/frequency');
// const rules = require('../rules/frequencyRules');
// const CustomUtils = require('../libs/customUtils');

const frequency = new Frequency();
// const customUtils = new CustomUtils();

Raven.config(process.env.LOG).install();

class FrequencyController {
	/**
   * Get authentication token (JWT)
   *
   * @param {Object} ctx request
   * @param {String} ctx.params.no words number
   * @returns {Object} list of words and frequencies
   * @memberof FrequencyController
   */

	async getFrequentWords(ctx) {
		try {
			// customUtils.validateParams(rules.getFrequentWords, ctx.params);

			const { meta, result } = await frequency.getFrequentWords(ctx.params.no);

			ctx.status = meta.code;
			ctx.body = { meta, result };
			return;
		} catch (err) {
			// Raven.captureException(err);
			console.log(err);
			const { status, message } = err;
			ctx.status = status;
			ctx.body = { message };
		}
	}
}

module.exports = FrequencyController;
