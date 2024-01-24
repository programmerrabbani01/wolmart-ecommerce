import mongoose from "mongoose";

// create product schema

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    productType: {
      type: String,
      enum: ["simple", "variable", "group", "external"],
      trim: true,
      default: "simple",
    },
    productSimple: {
      regularPrice: {
        type: Number,
        // required: true,
      },
      salePrice: {
        type: Number,
        default: 0,
      },

      stock: {
        type: Number,
        default: 0,
      },
    },
    productVariable: [
      {
        size: {
          type: String,
          default: null,
        },
        color: {
          type: String,
          default: null,
        },
        regularPrice: {
          type: Number,
          // required: true,
        },
        salePrice: {
          type: Number,
          default: 0,
        },

        stock: {
          type: Number,
          default: 0,
        },
      },
    ],
    productGroup: [
      {
        name: {
          type: String,
          // required: true,
        },
        regularPrice: {
          type: Number,
          // required: true,
        },
        salePrice: {
          type: Number,
          default: 0,
        },

        stock: {
          type: Number,
          default: 0,
        },
      },
    ],
    productExternal: {
      regularPrice: {
        type: Number,
        // required: true,
      },
      salePrice: {
        type: Number,
        default: 0,
      },

      stock: {
        type: Number,
        default: 0,
      },
      productLink: {
        type: String,
        // required: true,
        trim: true,
      },
    },
    shortDesc: {
      type: String,
      required: true,
      trim: true,
    },
    longDesc: {
      type: String,
      required: true,
      trim: true,
    },
    productPhotos: {
      type: [String],
      default: [],
    },
    specification: {
      type: String,
      trim: true,
      default: null,
    },
    reviews: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Reviews",
      default: null,
    },
    categories: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Category",
      // required: true,
    },
    tags: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// export product schema

export default mongoose.model("Product", productSchema);
