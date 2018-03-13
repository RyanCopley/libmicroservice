'use strict';

/** Environment abstracts away `process.env.NODE_ENV` variable to reduce string comparisons in the codebase. */
class _environment {
    /**
     * Is this codebase running locally? This includes running in test mode.
     * @return {boolean} `true`: If you are running this project on a local computer. `false`: If you are running in any other environment.
     */
    isLocal() {
        return (['localdev', 'local', ''].indexOf(process.env.NODE_ENV) > -1) || this.isTesting();
    }

    /**
     * Is this codebase running in either a local or test environment? Useful for logging to stdout.
     * @returns {boolean} `true`: If you are running this project on a local computer, or testing. `false`: If you are running in any other environment.
     */
    isLocalOrTesting() {
        return this.isLocal() || this.isTesting();
    }

    /**
     * Is this codebase running in the Product Development environment?
     * @returns {boolean} `true`: If running in Product Development farm. `false`: If running anywhere else.
     */
    isDevelopment() {
        return 'development' === process.env.NODE_ENV;
    }

    /**
     * Is this codebase running in the Product Staging environment?
     * @returns {boolean} If running in Product Staging farm. `false`: If running anywhere else.
     */
    isStaging() {
        return 'staging' === process.env.NODE_ENV;
    }

    /**
     * Is this codebase running in the Product Production environment?
     * @returns {boolean} If running in the Product Production farm. `false`: If running anywhere else.
     */
    isProduction() {
        return 'production' === process.env.NODE_ENV;
    }

    /**
     * Are tests being ran? Includes both Unit and Integration tests.
     * @returns {boolean} `true`: If running tests. `false`: If running in any other non-test configuration.
     */
    isTesting() {
        return this.isUnitTesting() || this.isIntegrationTesting();
    }

    /**
     * Are unit tests being ran?
     * @returns {boolean} `true`: If unit tests are being ran. `false`: If unit tests are not being ran.
     */
    isUnitTesting() {
        return 'unit' === process.env.NODE_ENV;
    }

    /**
     * Are integration tests being ran?
     * @returns {boolean} `true`: If integration tests are being ran. `false`: If unit tests are not being ran.
     */
    isIntegrationTesting() {
        return 'integration' === process.env.NODE_ENV;
    }

    environmentObject(obj) {
        if (this.isDevelopment()){
            return obj.development;
        }else if (this.isStaging()){
            return obj.staging;
        }else if (this.isProduction()){
            return obj.production;
        }
        return obj.local;
    }
}

let Environment = new _environment()
export { Environment };
