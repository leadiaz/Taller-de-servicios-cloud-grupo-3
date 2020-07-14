'use strict';

class APIError extends Error{
    constructor(name, statusCode, errorCode, message = null){
        super(message || name);
        this.name = name;
        this.status = statusCode;
        this.errorCode = errorCode;
    }
}
class NotFound extends APIError{
    constructor(){
        super('NotFound',404,'RESOURCE_NOT_FOUND');
    }
}

class Duplicate extends APIError{
    constructor(){
        super('Duplicate', 409, 'RESOURCE_ALREADY_EXISTS');
    }
}

class RelatedResourceNotFound extends APIError {
    constructor(){
        super('RelatedResourceNotFound', 404, 'RELATED_RESOURCE_NOT_FOUND');
        
    }
}
class InvalidURL extends APIError {
    constructor(){
        super('InvalidURL', 404,'RESOURCE_NOT_FOUND' );
    }
}
class JSONException extends APIError {
    constructor() {
        super('JSONException', 400, 'BAD_REQUEST');
    }
}
class InternalServerError extends APIError {
    constructor() {
        super('InternalServerError', 500, 'INTERNAL_SERVER_ERROR');
    }
}

module.exports= {
    APIError,
    NotFound,
    Duplicate,
    RelatedResourceNotFound,
    InvalidURL,
    JSONException,
    InternalServerError
};