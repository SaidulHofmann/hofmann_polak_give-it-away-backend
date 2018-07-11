const jwt = require('jsonwebtoken');
const customErrors = require('../core/errors.core.js');
const ArgumentError = customErrors.ArgumentError;

exports.jsonParseAll = function(objectToParse) {
    try {
        if(!objectToParse) {
            throw ArgumentError("Der Parameter 'objectToParse' ist ungültig.")
        }
        return JSON.parse(JSON.stringify(objectToParse, Object.getOwnPropertyNames(objectToParse)));
    } catch (ex) {
        console.log('@helper.js: ', ex.toString());
    }
};

exports.getUserId = function(req) {
    if(!req || !req.header('authorization')) {
        console.error('Die Benutzer Id kann nicht ermittelt werden. Der Authorisations-Header ist nicht verfügbar.');
        return '';
    }
    let token = req.header('authorization').substr(7);
    let decodedToken = jwt.decode(token);
    return decodedToken._id;
};

exports.getUserEmail = function(req) {
    if(!req || !req.header('authorization')) {
        console.error('Die E-Mail Adresse kann nicht ermittelt werden. Der Authorisations-Header ist nicht verfügbar.');
        return '';
    }
    let token = req.header('authorization').substr(7);
    let decodedToken = jwt.decode(token);
    return decodedToken.email;
};

exports.getUser = function(req) {
    if(!req || !req.header('authorization')) {
        console.error('Die Benutzer-Informationen können nicht ermittelt werden. Der Authorisations-Header ist nicht verfügbar.');
        return '';
    }
    let token = req.header('authorization').substr(7);
    let decodedToken = jwt.decode(token);
    return decodedToken;
};

exports.getBooleanOrUndefined = function(stringValue) {
    if (typeof stringValue !== 'string') { return undefined }

    if (stringValue.toLowerCase() == 'true') { return true; }
    if (stringValue == '1') { return true; }
    if (stringValue.toLowerCase() == 'false') { return false; }
    if (stringValue == '0') { return false; }
    return undefined;
};