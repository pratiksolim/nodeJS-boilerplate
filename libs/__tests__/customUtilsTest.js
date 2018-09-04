const CustomUtils = require('../customUtils');
const server = require('../../index');

const customUtils = new CustomUtils();

afterEach(() => {
	server.close();
});

describe('Testing all utils functions', () => {
	it('should return true for valid params', () => {
		const requiredParams = {
			id: { type: 'string' },
		};
		const params = {
			id: 'xyz',
		};
		const result = customUtils.validateParams(requiredParams, params);
		expect(result).toBe(true);
	});

	it('should error for invalid params', () => {
		const requiredParams = {
			id: { type: 'string' },
		};
		const params = {
			id: 12123232,
		};

		try {
			customUtils.validateParams(requiredParams, params);
		} catch (err) {
			expect(err.status).toEqual(400);
		}
	});
});
