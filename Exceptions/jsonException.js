'use strict';
class JSONException extends Error{
    constructor(){
        super('Formato JSON invalido');
        this.name = 'JSONException';
    }
}

module.exports = { JSONException};