// Administration scripts.

const services = require('../services/index.service');
const databaseConnectionUrl = 'mongodb://localhost/giveitaway';


getDBConnection = async function() {
    let mongoose = await require("mongoose");
    mongoose.Promise = await global.Promise;
    await mongoose.connect(databaseConnectionUrl);
    let db = mongoose.connection;
    let dbName = `${db.name} (${db.host}:${db.port})`;
    return { mongoose: mongoose, db: db, dbName: dbName }
};

exports.dropDatabase = async function() {
    try {
        let { mongoose, db, dbName } = await getDBConnection();

        console.log(`Die Datenbank ${dbName} wird gelöscht...`);
        await mongoose.connection.db.dropDatabase();
        console.log('Die Datenbank wurde gelöscht.');

        await mongoose.disconnect();
        console.log('Die Datenbank-Verbindung wurde geschlossen.');

        process.exit(0);

    } catch (ex) {
        console.log('Fehler beim Löschen der Datenbank: ' + ex.message);
        process.exit(1);
    }
};

exports.createDatabase = async function() {
    try {
        let { mongoose, db, dbName } = await getDBConnection();

        console.log(`Die Datenbank ${db.name} wird mit sämtlichen Collections erstellt...`);

        await services.PermissionService.createInitialDbEntries();
        await services.ArticleCategoryService.createInitialDbEntries();
        await services.ArticleStatusService.createInitialDbEntries();
        await services.UserService.createInitialDbEntries();
        await services.ArticleService.createInitialDbEntries();
        await services.ReservationService.createInitialDbEntries();

        console.log('Die Datenbank wurde erfolgreich erstellt.');

        await mongoose.disconnect();
        console.log('Die Datenbank-Verbindung wurde geschlossen.');
        process.exit(0);

    } catch (ex) {
        console.log(ex.message);
        process.exit(1);
    }
};







// make-runnable must be the last command in file.
require('make-runnable');