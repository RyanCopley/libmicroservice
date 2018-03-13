'use strict';

class ResponseSchemaError extends Error {
    constructor(errors) {
        super();
        this.public = {
            type: 'ResponseSchemaError',
            ResponseSchemaError : errors
        };

        Error.captureStackTrace(this, ResponseSchemaError);
    }
}

export default ResponseSchemaError;