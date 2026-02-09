const Review = require('../models/Review');
//New comment 
exports.getReviewsByBookId = async (bookId) => {
    return await Review.find({ book: bookId });
};
