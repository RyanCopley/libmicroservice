'use strict';

class RequestRPCError extends Error {
    constructor(errors) {
        super();
        this.public = {
            type: 'RequestRPCError',
            RequestRPCError : errors
        };

        Error.captureStackTrace(this, RequestRPCError);
    }
}

export default RequestRPCError;