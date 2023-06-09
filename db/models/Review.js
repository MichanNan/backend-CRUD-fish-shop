import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  test: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
