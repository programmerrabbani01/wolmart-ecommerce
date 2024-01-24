import mongoose from "mongoose";

// create reviews schema

const reviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    review: {
      type: String,
      required: true,
      trim: true,
    },
    // customer: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Customer",
    //   trim: true,
    // },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// export reviews schema

export default mongoose.model("Reviews", reviewSchema);
