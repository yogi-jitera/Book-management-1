const Review = require('../models/Review');
//comment from user
exports.getReviewsByBookId = async (bookId) => {
    return await Review.find({ book: bookId });
};
