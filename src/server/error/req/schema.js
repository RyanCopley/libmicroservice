'use strict';

class RequestSchemaError extends Error {
    constructor(errors) {
        super();
        this.public = {
            type: 'RequestSchemaError',
            RequestSchemaError : errors
        };

        Error.captureStackTrace(this, RequestSchemaError);
    }
}

export default RequestSchemaError;