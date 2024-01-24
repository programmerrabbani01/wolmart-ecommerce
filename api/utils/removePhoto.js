import path, { resolve } from "path";
import { unlinkSync } from "fs";

const __dirname = resolve();

// remove photo from brand store
export const removePhoto = (urlPath) => {
  unlinkSync(path.join(__dirname, `public/photo/BrandPhoto/${urlPath}`));
};
// remove photo from Category store
export const removeCategoryPhoto = (urlPath) => {
  unlinkSync(path.join(__dirname, `public/photo/CategoryPhoto/${urlPath}`));
};

// remove photo on store
export const removeGalleryPhoto = (urlPath) => {
  unlinkSync(path.join(__dirname, `public/gallery/${urlPath}`));
};
