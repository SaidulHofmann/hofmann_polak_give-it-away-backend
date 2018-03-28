const ArticleService = require('../services/article.service');
const ArticleCategoryService = require('../services/articleCategory.service');
const ArticleStatusService = require('../services/articleStatus.service');
const ReservationService = require('../services/reservation.service');
const UserService = require('../services/user.service');

exports.createInitialDbEntries = async function() {
    try {
        console.log('\nCreating initial database entries...');

        await ArticleCategoryService.createInitialDbEntries();
        await ArticleStatusService.createInitialDbEntries();
        await UserService.createInitialDbEntries();
        await ArticleService.createInitialDbEntries();
        await ReservationService.createInitialDbEntries();

        console.log('Successfully created all database entries.');
    } catch (ex) {
        console.log(ex.message);
    }
};