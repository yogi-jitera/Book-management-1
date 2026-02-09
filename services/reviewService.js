const Review = require('../models/Review');
//comment from user
//add more comment
//add more comment
exports.getReviewsByBookId = async (bookId) => {
    return await Review.find({ book: bookId });
};
