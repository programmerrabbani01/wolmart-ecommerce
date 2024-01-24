import { createSlice } from "@reduxjs/toolkit";
import {
  createBrand,
  createCategory,
  createTag,
  deleteBrand,
  deleteCategory,
  deleteTag,
  getAllBrand,
  getAllCategories,
  getAllTag,
  updateBrand,
  updateBrandStatus,
  updateCategory,
  updateCategoryStatus,
  updateTag,
  updateTagStatus,
} from "./productApiSlice.js";
// create auth slice

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    brand: null,
    category: null,
    tag: null,
    error: null,
    message: null,
    loader: false,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // brand
      .addCase(getAllBrand.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllBrand.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllBrand.fulfilled, (state, action) => {
        state.brand = action.payload.brands;
        state.loader = false;
      })
      .addCase(createBrand.pending, (state) => {
        state.loader = true;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.brand = state.brand ?? [];
        state.brand.push(action.payload.brand);
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.brand = state.brand.filter(
          (data) => data._id !== action.payload.brand._id
        );
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(updateBrandStatus.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateBrandStatus.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loader = false;
      })
      .addCase(updateBrandStatus.fulfilled, (state, action) => {
        state.brand[
          state.brand.findIndex((data) => data._id === action.payload.brand._id)
        ] = action.payload.brand;
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(updateBrand.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loader = false;
        state.brand[
          state.brand.findIndex((item) => item._id === action.payload.brand._id)
        ] = action.payload.brand;
        state.message = action.payload.message;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loader = false;
      })
      // tag
      .addCase(getAllTag.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllTag.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllTag.fulfilled, (state, action) => {
        state.tag = action.payload.tags;
        state.loader = false;
      })
      .addCase(createTag.pending, (state) => {
        state.loader = true;
      })
      .addCase(createTag.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.tag = state.tag ?? [];
        state.tag.push(action.payload.tag);
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(deleteTag.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.tag = state.tag.filter(
          (data) => data._id !== action.payload.tag._id
        );
        state.message = action.payload.message;
      })
      .addCase(updateTagStatus.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateTagStatus.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loader = false;
      })
      .addCase(updateTagStatus.fulfilled, (state, action) => {
        state.tag[
          state.tag.findIndex((data) => data._id === action.payload.tag._id)
        ] = action.payload.tag;
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(updateTag.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateTag.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        state.tag[
          state.tag.findIndex((data) => data._id == action.payload.tag._id)
        ] = action.payload.tag;
        state.message = action.payload.message;
        state.loader = false;
      })
      // category
      .addCase(getAllCategories.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.category = action.payload.categories;
        state.loader = false;
      })
      .addCase(createCategory.pending, (state) => {
        state.loader = true;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.category = state.category ?? [];
        state.category.push(action.payload.category);
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.category = state.category.filter(
          (data) => data._id !== action.payload.category._id
        );
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(updateCategoryStatus.pending, (state) => {
        state.loader = true;
      })

      .addCase(updateCategoryStatus.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(updateCategoryStatus.fulfilled, (state, action) => {
        state.category[
          state.category.findIndex(
            (data) => data._id == action.payload.category._id
          )
        ] = action.payload.category;
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.category[
          state.category.findIndex(
            (data) => data._id == action.payload.category._id
          )
        ] = action.payload.category;
        state.message = action.payload.message;
        state.loader = false;
      });
  },
});

// export selectors

// export const getAllProductPermissionData = (state) => state.product;

// export actions

export const { setMessageEmpty } = productSlice.actions;

// export default

export default productSlice.reducer;
