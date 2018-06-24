
class CustomErrorBase extends Error {
    constructor(message, status) {
        super(message);
        this.name = this.constructor.name;
        this.status = status || 500;
        this.errorCode = 0;

        // Capture stack trace, excluding constructor call from it.
        if (!Error.captureStackTrace) {
            this.stack = (new Error()).stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

exports.ArgumentError = class ArgumentError extends CustomErrorBase {
    constructor (message, status = 400) {
        super(message || 'Ein Parameter hat einen ungültigen Wert.', status);
        this.errorCode = 1000;
    }
};

exports.InvalidOperationError = class InvalidOperationError extends CustomErrorBase {
    constructor (message, status = 400) {
        super(message || 'Die Methode kann aufgrund des Objektzustands nicht ausgeführt werden.', status);
        this.errorCode = 1010;
    }
};

exports.DuplicateKeyError = class DuplicateKeyError extends CustomErrorBase {
    constructor (message, status = 400) {
        super(message || 'Es wird versucht, einen doppelten Eintrag in der Datenbank einzufügen (Schlüsselfeld bereits vorhanden).', status);
        this.errorCode = 1020;
    }
};


