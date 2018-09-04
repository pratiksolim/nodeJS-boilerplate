const _ = require('lodash');
const CustomError = require('../libs/customError');
const statusCodes = require('../libs/statusCodes');

class CustomUtils {

	/**
   * Validate input params
   *
   * @param {Object} requiredParams required params
   * @param {Object} params actual params sent from frontend
   * @returns {Boolean} true if params are valid
   * @memberof CustomUtils
   */

	validateParams(requiredParams, params) {
		const errObj = statusCodes.VALIDATION_FAILURE;
		let requiredType;

		for (const key in requiredParams) {
			if (!params[key]) {
				errObj.message = `Required param ${key} not found`;
				throw new CustomError(errObj);
			}

			requiredType = requiredParams[key].type;
			if (requiredType !== typeof params[key]) {
				errObj.message = `Param ${key} type mismatch. Required type: ${requiredType}`;
				throw new CustomError(errObj);
			}

			if (!_.isEmpty(requiredParams[key].values)) {
				const { values } = requiredParams[key];
				console.log('required values => ', values, params[key], _.find(values, params[key]));
				if (_.indexOf(values, params[key]) === -1) {
					errObj.message = `Param ${key} value ${params[key]} is invalid. Required value can be: ${values.join()}`;
					throw new CustomError(errObj);
				}
			}
		}

		return true;
	}
}

module.exports = CustomUtils;
