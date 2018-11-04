// File service.

const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const path = require('path');
const imageDir = path.join(__dirname, '../public/images');
const customErrors = require('../core/errors.core.js');
const ArgumentError = customErrors.ArgumentError;


exports.uploadImage = async function (req) {
    return new Promise((resolve, reject) => {
        let form = new IncomingForm();
        form.maxFileSize = 2 * 1024 * 1024; // 2 MB.

        form.parse(req, function (err, fields, files) {
            if (err) { reject(err); return; }

            let file = files['file'];
            let articleId = fields['articleId'];
            if (!file) { reject(new ArgumentError('Es konnte keine Datei aus den empfangenen Daten ausgelesen werden.')); return; }
            if (!articleId) { reject(new ArgumentError(`Die Artikel Id '${articleId}' ist ungültig.`)); return; }

            let articleImageDir = `${imageDir}/${articleId}/`;

            fs.access(articleImageDir, (err) => {
                if (err) {
                    fs.mkdirSync(articleImageDir);
                }
                copyFile(file.path, path.join(articleImageDir, file.name))
                    .then(resolve(file.name))
                    .catch(reject(err));
            });
        });
    })
};

copyFile = async function (sourceFilePath, destinationFilePath) {
    return new Promise((resolve, reject) => {
        let readStream = fs.createReadStream(sourceFilePath);
        readStream.once('error', (err) => {
            console.log(`Fehler beim Kopieren der Datei '${destinationFilePath}': ${err.message}`);
            reject(err);
        });
        readStream.once('end', () => {
            console.log(`Datei erfolgreich kopiert: '${destinationFilePath}'.`);
            resolve();
        });
        readStream.pipe(fs.createWriteStream(destinationFilePath));
    })
};

exports.deleteImage = async function (fileName, articleId) {
    return new Promise((resolve, reject) => {
        let filePath = `${imageDir}/${articleId}/${fileName}`;
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log(`Fehler beim Entfernen der Datei '${fileName}': ` + err.message);
                reject(err);
                return;
            } else {
                console.log(`Datei erfolgreich entfernt: '${fileName}'.`);
                resolve();
            }
        });
    })
};


exports.deleteArticleImageFolder = async function (articleId) {
    try {
        if (!articleId) { throw ArgumentError(`Die Artikel Id '${articleId}' ist ungültig.`) }

        let filePath = `${imageDir}/${articleId}`;

        if (fs.existsSync(filePath)) {
            fs.readdirSync(filePath).forEach(function(file, index){
                fs.unlinkSync(`${filePath}/${file}`);
            });
            fs.rmdirSync(filePath);
            console.log(`Artikel Bild-Verzeichnis entfernt: '${filePath}'.`);
        }
    } catch (ex) {
        console.log(`Fehler beim Entfernen des Artikel Bild-Verzeichnis '${filePath}': ${ex.message}`);
        throw ex;
    }
};