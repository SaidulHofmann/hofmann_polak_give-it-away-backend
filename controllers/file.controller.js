// File controller. Handles file upload.

const FileService = require('../services/file.service');

exports.uploadImage = async function (req, res) {
    try {
        let fileName  = await FileService.uploadImage(req);

        return res.status(201).json({status: 201, data: fileName, message: 'Der Upload der Bild-Datei wurde erfolgreich abgeschlossen.'});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Beim Upload der Bild-Datei ist ein Fehler aufgetreten: ' +ex.message});
    }
};

exports.deleteImage = async function (req, res) {
    try {
        let fileName = req.params.fileName;
        let articleId = req.params.articleId;

        if (!fileName) { throw new ArgumentError('Beim Löschen einer Bilddatei muss der Name der Datei angegeben werden.'); }
        if (!articleId) { throw new ArgumentError('Beim Löschen einer Bilddatei muss die Artikel Id angegeben werden.'); }

        await FileService.deleteImage(fileName, articleId);
        return res.status(200).json({status: 200, data: fileName, message: `Das Artikel-Bild '${articleId}/${fileName}' wurde erfolgreich entfernt.`});
    } catch (ex) {
        return res.status(ex.status || 400).json({status: ex.status || 400, name: ex.name, message: 'Beim Löschen des Artikel-Bildes ist ein Fehler aufgetreten: ' + ex.message});
    }
};