import { createSlug } from "../helpers/slug.js";
import Category from "../models/Category.js";
import asyncHandler from "express-async-handler";
import { removeCategoryPhoto } from "../utils/removePhoto.js";
import { cloudDelete, cloudUpload } from "../utils/cloudinary.js";
import { findPublicId } from "../helpers/helpers.js";

/**
 * @desc get all Category data
 * @route GET /category
 * @access PUBLIC
 */

export const getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find().populate([
    {
      path: "subCategory",
      populate: {
        path: "subCategory",
        populate: {
          path: "subCategory",
        },
      },
    },
    {
      path: "parentCategory",
      populate: {
        path: "parentCategory",
        populate: {
          path: "parentCategory",
        },
      },
    },
  ]);

  if (categories.length > 0) {
    return res.status(200).json({ categories });
  }

  return res.status(404).json({ message: "No Category found" });
});

/**
 * @desc create Category data
 * @route POST /category
 * @access PUBLIC
 */

export const createCategory = asyncHandler(async (req, res) => {
  // get values
  const { name, parentCategory, icon } = req.body;

  // validations
  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }
  // email check
  const nameCheck = await Category.findOne({ name });

  if (nameCheck) {
    return res.status(400).json({ message: "Category already exists" });
  }

  // category icon

  let catIcon = null;

  if (icon) {
    catIcon = icon;
  }

  // photo upload

  let catPhoto = null;

  if (req.file) {
    const photo = await cloudUpload(req);
    catPhoto = photo.secure_url;
  }

  // create new brand
  const category = await Category.create({
    name,
    slug: createSlug(name),
    // photo: req.file.filename,
    photo: catPhoto ? catPhoto : null,
    icon: catIcon,
    parentCategory: parentCategory ? parentCategory : null,
  });

  if (parentCategory) {
    const parent = await Category.findByIdAndUpdate(parentCategory, {
      $push: { subCategory: category._id },
    });
  }

  res.status(200).json({ category, message: "Category created successfully" });
});

/**
 * @desc get Single Category data
 * @route GET /category/:id
 * @access PUBLIC
 */

export const getSingleCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    return res.status(400).json({ message: "No Category found" });
  }

  res.json(category);
});

/**
 * @desc delete Category data
 * @route DELETE /category/:id
 * @access PUBLIC
 */

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // const categoryLogo = await Category.findById(id);

  const category = await Category.findByIdAndDelete(id);

  // remove photo

  // if (categoryLogo?.photo) {
  //   removeCategoryPhoto(categoryLogo.photo);
  // }

  if (category.photo) {
    await cloudDelete(findPublicId(category.photo));
  }

  if (!category) {
    return res.status(400).json({ message: "Category delete failed" });
  }

  res.json({ message: "Category Delete Successful", category });
});

/**
 * @desc update Category data
 * @route PATCH /category/:id
 * @access PUBLIC
 */

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, parentCategory, icon } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "Category Name Is required" });
  }

  const category = await Category.findById(id);

  if (!category) {
    return res.status(400).json({ message: "Category not found" });
  }

  // update the category

  let parentCat = category.parentCategory;

  if (parentCategory) {
    parentCat = parentCategory;
  }

  // icon
  let catIcon = category.icon;

  if (icon) {
    catIcon = icon;
  }

  // photo

  let catFile = category.photo;
  if (req.file) {
    const photo = await cloudUpload(req);
    catFile = photo.secure_url;

    await cloudDelete(findPublicId(category.photo));
  }

  category.name = name;
  category.slug = createSlug(name);
  category.parentCategory = parentCat;
  category.icon = catIcon;
  category.photo = catFile;
  category.save();

  res.json({
    message: `Category updated successful`,
    category: category,
  });
});

/**
 * @desc update Category Status
 * @route PUT /category/status/:id
 * @access PUBLIC
 */

export const updateCategoryStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const updateCategoryStatus = await Category.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    {
      new: true,
    }
  );

  res.json({
    message: `Category Status updated successful`,
    category: updateCategoryStatus,
  });
});
