// Article controller that handles article api requests.

const mongoose = require('mongoose');
const Article = require('../models/Article');
const _ = require('underscore');
// const util = require("../util/security");


exports.showArticle = function (req, res) {
    Article.findById(req.params.id, function (err, article) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(article);
        }
    });
}

exports.getArticles = function (req, res) {
    Article.find(function (err, article) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(article);
        }
    });
}

exports.createArticle = function (req, res) {
    let article = new Article(req.body);
    article.save()
        .then(article => {
            res.json(article);
        })
        .catch(err => {
            res.status(400).send("Unable to save the article.");
        });
}

exports.updateArticle = function (req, res) {
    Article.findById(req.params.id, function (err, article) {
        if (err) {
            res.json(err);
        }
        else if (!article) {
            res.json('Article not found.');
        }
        else {
            article = _.extend(article, req.body);
            article.save(function (err) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(article);
                }
            });
        }
    });
}

exports.deleteArticle = function (req, res) {
    Article.findById(req.params.id, function (err, article) {
        if (err) {
            res.json(err);
        }
        else if (!article) {
            res.json('Article not found.');
        }
        else {
            article.remove(function (err) {
                if(err) {
                    res.json(err);
                }
                else {
                    res.json(article);
                }
            });
        }
    });
}



// *** Deprecated code from the note application. Can be deleted later. ***

// const store = require("../services/articleStore.js");
// const util = require("../util/security");

// module.exports.getNotes = function (req, res) {
//
//     let queryFilter = null;
//     if (req.query.email && req.query.isFinished) {
//         queryFilter = {"createdBy": req.query.email, "isFinished": JSON.parse(req.query.isFinished)};
//     }
//
//     let querySort = null;
//     if (req.query["order-by"] && req.query["order-direction"]) {
//         querySort = {[req.query["order-by"]]: Number(req.query["order-direction"])};
//     }
//
//     store.getNotes(queryFilter, querySort, function (err, notes) {
//         res.json(notes || {});
//     })
// };
//
// module.exports.saveNote = function (req, res) {
//     store.saveNote(req.body.note, function (err, newDoc) {
//         res.json(newDoc);
//     });
// };
//
// module.exports.getNote = function (req, res) {
//     store.getNote(req.params.id, util.current(req), function (err, note) {
//         res.json(note);
//     });
// };
//
// module.exports.deleteNote = function (req, res) {
//     store.deleteNote(req.params.id, util.current(req), function (err, count) {
//         res.json(count);
//     });
// };