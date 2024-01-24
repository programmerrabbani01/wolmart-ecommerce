import { createSlug } from "../helpers/slug.js";
import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";
import { cloudDelete, cloudUpload, cloudUploads } from "../utils/cloudinary.js";
import { findPublicId } from "../helpers/helpers.js";

/**
 * @desc get all product data
 * @route GET /product
 * @access PUBLIC
 */

export const getAllProduct = asyncHandler(async (req, res) => {
  const products = await Product.find();

  if (products.length > 0) {
    return res.status(200).json(products);
  }

  return res.status(404).json({ message: "No product found" });
});

/**
 * @desc create product data
 * @route POST /product
 * @access PUBLIC
 */

export const createProduct = asyncHandler(async (req, res) => {
  // get values
  const {
    name,
    productType,
    productSimple,
    productVariable,
    productGroup,
    productExternal,
    shortDesc,
    longDesc,
  } = req.body;

  // validations
  if (!name) {
    return res.status(400).json({ message: "Product name is required" });
  }

  // product name check
  const nameCheck = await Product.findOne({ name });

  if (nameCheck) {
    return res.status(400).json({ message: "Product already exists" });
  }

  //  cloud Upload

  let productPhotos = [];

  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      const fileData = await cloudUploads(req.files[i].path);

      productPhotos.push(fileData);
    }
  }

  const simplePhotoData = JSON.parse(productSimple);

  // create new product
  const product = await Product.create({
    name,
    slug: createSlug(name),
    productType,
    productSimple:
      productType === "simple" ? { ...simplePhotoData, productPhotos } : null,
    productVariable: productType === "variable" ? productVariable : null,
    productGroup: productType === "group" ? productGroup : null,
    productExternal: productType === "external" ? productExternal : null,
    shortDesc,
    longDesc,
  });

  return res
    .status(200)
    .json({ product: product, message: "product created successfully" });
});

/**
 * @desc get Single product data
 * @route GET /product/:id
 * @access PUBLIC
 */

export const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(400).json({ message: "No product found" });
  }

  res.json(product);
});

/**
 * @desc delete product data
 * @route DELETE /product/:id
 * @access PUBLIC
 */

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // const brandLogo = await Brand.findById(id);

  const product = await Product.findByIdAndDelete(id);

  // remove photo

  if (product.productPhotos) {
    const publicId = findPublicId(product.photo);

    await cloudDelete(publicId);
  }

  // if (brandLogo?.photo) {
  //   removePhoto(brandLogo.photo);
  // }

  if (!product) {
    return res.status(400).json({ message: "Product delete failed" });
  }

  res.json({ message: "Product Delete Successful", product });
});

/**
 * @desc update product data
 * @route PATCH /product/:id
 * @access PUBLIC
 */

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "Product Name Is required" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // logo upload

  let updatePhoto = product.photo;

  if (req.file) {
    const logo = await cloudUpload(req);
    updatePhoto = logo?.secure_url;

    await cloudDelete(findPublicId(product.photo));
  }

  product.name = name;
  product.slug = createSlug(name);
  product.photo = updatePhoto;
  product.save();

  return res.status(200).json({
    message: `Product updated successful`,
    product: product,
  });
});

/**
 * @desc update product Status
 * @route PUT /product/status/:id
 * @access PUBLIC
 */

export const updateProductStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const updateProductStatus = await Product.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    {
      new: true,
    }
  );

  res.json({
    message: `Product updated successful`,
    product: updateProductStatus,
  });
});
