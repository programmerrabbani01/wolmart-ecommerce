import { createSlug } from "../helpers/slug.js";
import Brand from "../models/Brand.js";
import asyncHandler from "express-async-handler";
// import { removePhoto } from "../utils/removePhoto.js";
import { cloudDelete, cloudUpload } from "../utils/cloudinary.js";
import { findPublicId } from "../helpers/helpers.js";

/**
 * @desc get all brand data
 * @route GET /brand
 * @access PUBLIC
 */

export const getAllBrand = asyncHandler(async (req, res) => {
  const brands = await Brand.find();

  if (brands.length > 0) {
    return res.status(200).json({ brands });
  }
});

/**
 * @desc create brand data
 * @route POST /brand
 * @access PUBLIC
 */
export const createBrand = asyncHandler(async (req, res) => {
  // get values
  const { name } = req.body;

  // validations
  if (!name) {
    return res.status(400).json({ message: "brand name is required" });
  }
  // email check
  const nameCheck = await Brand.findOne({ name });

  if (nameCheck) {
    return res.status(400).json({ message: "Brand already exists" });
  }

  // cloud Upload

  let createLogo = null;

  if (req.file) {
    const logo = await cloudUpload(req);
    createLogo = logo?.secure_url;
  }


  // create new brand
  const brand = await Brand.create({
    name,
    slug: createSlug(name),
    photo: createLogo ? createLogo : null,
  });

  return res
    .status(200)
    .json({ brand: brand, message: "brand created successfully" });
});

/**
 * @desc get Single Brand data
 * @route GET /brand/:id
 * @access PUBLIC
 */

export const getSingleBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const brand = await Brand.findById(id);

  if (!brand) {
    return res.status(400).json({ message: "No brand found" });
  }

  res.json(brand);
});

/**
 * @desc delete brand data
 * @route DELETE /brand/:id
 * @access PUBLIC
 */

export const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // const brandLogo = await Brand.findById(id);

  const brand = await Brand.findByIdAndDelete(id);

  // remove photo

  if (brand.photo) {
    const publicId = findPublicId(brand.photo);

    await cloudDelete(publicId);
  }

  // if (brandLogo?.photo) {
  //   removePhoto(brandLogo.photo);
  // }

  if (!brand) {
    return res.status(400).json({ message: "Brand delete failed" });
  }

  res.json({ message: "Brand Delete Successful", brand });
});

/**
 * @desc update Permission data
 * @route PATCH /permission/:id
 * @access PUBLIC
 */

export const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "Brand Name Is required" });
  }

  const brand = await Brand.findById(id);

  if (!brand) {
    return res.status(404).json({ message: "Brand not found" });
  }

  // logo upload

  let updatePhoto = brand.photo;

  if (req.file) {
    const logo = await cloudUpload(req);
    updatePhoto = logo?.secure_url;

    await cloudDelete(findPublicId(brand.photo));
  }

  brand.name = name;
  brand.slug = createSlug(name);
  brand.photo = updatePhoto;
  brand.save();

  return res.status(200).json({
    message: `Brand updated successful`,
    brand: brand,
  });
});

/**
 * @desc update Brand Status
 * @route PUT /brand/status/:id
 * @access PUBLIC
 */

export const updateBrandStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const updateBrandStatus = await Brand.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    {
      new: true,
    }
  );

  res.json({
    message: `Brand updated successful`,
    brand: updateBrandStatus,
  });
});
