'use strict';

import Ajv from 'ajv';

export class Schema {

    static Validator() {
        if (!this.validator) {
            this.validator = new Ajv().compile(this.Schema());
        }
        return this.validator;
    }

    static Filter() {
        if (!this.filter) {
            this.filter = new Ajv({ removeAdditional: true }).compile(this.Schema());
        }
        return this.filter;
    }

}