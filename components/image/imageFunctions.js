// npm i image-size sharp make-dir util
import fs from "fs";
import sharp from "sharp";
import makeDir from "make-dir";
import { promisify } from "util";
const sizeOf = promisify(require("image-size"));

const convertImageToBase64 = (image) => {
  return fs.readFileSync(`${process.cwd()}${image}`, "base64");
};

const makeDirectory = (path) => {
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    makeDir(path)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.log(err);
        reject(new Error("something bad happened"));
      });
  });
};

const resizeImage = async (
  image,
  imageFolder,
  processedImagePath,
  width,
  dimensions
) => {
  await makeDirectory(process.cwd() + "/public/optimised/" + width);
  const path = `${process.cwd()}/public/optimised/${width}${image}`;
  if (dimensions.type === "jpg") {
    await sharp(`${process.cwd()}${imageFolder}/${image}`)
      .resize({ width: width })
      .jpeg({ quality: 75 })
      .toFile(path);
  } else if (dimensions.type === "png") {
    await sharp(`${process.cwd()}${imageFolder}/${image}`)
      .resize({ width: width })
      .png({ quality: 75 })
      .toFile(path);
  } else {
    await sharp(`${process.cwd()}${imageFolder}/${image}`)
      .resize({ width: width })
      .toFile(path);
  }
  return `${processedImagePath}/${width}${image}`;
};

const getImageAspectRatio = (image) => {
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    sizeOf(`${process.cwd()}${image}`)
      .then((dimensions) => {
        resolve(dimensions);
      })
      .catch((err) => {
        console.log(err);
        reject(new Error("something bad happened"));
      });
  });
};

const getPlaceholder = async (
  image,
  imageFolder,
  processedImagePath,
  dimensions
) => {
  const min = await resizeImage(
    image,
    imageFolder,
    processedImagePath,
    40,
    dimensions
  );
  return await convertImageToBase64(min);
};

export const getFluidImage = async (image) => {
  const imageName = image.split("images").pop();
  image = "/public" + image;
  const imageFolder = "/public/images";
  const processedImagePath = "/public/optimised";
  const imageObj = {};
  const sizes = [320, 640, 960, 1200, 1440, 2000];
  const dimensions = await getImageAspectRatio(image);
  imageObj.dimensions = dimensions;
  imageObj.aspectRatio = (dimensions.width / dimensions.height).toFixed(2);

  imageObj.placeholder =
    `data:image/${dimensions.type};base64,` +
    (await getPlaceholder(
      imageName,
      imageFolder,
      processedImagePath,
      dimensions
    ));
  if (dimensions.width >= 2000) {
    imageObj.src = `/optimised/${2000}${imageName}`;
  } else {
    imageObj.src = `${image.split("/public").pop()}`;
  }

  const promises = sizes.map((width, i) => {
    if (dimensions.width >= width) {
      return resizeImage(
        imageName,
        imageFolder,
        processedImagePath,
        width,
        dimensions
      ).then(() => {
        return `/optimised/${width}${imageName.replace(
          / /gim,
          "%20"
        )} ${width}w`;
      });
    } else if (dimensions.width >= sizes[i - 1] * 1.2) {
      return resizeImage(
        imageName,
        imageFolder,
        processedImagePath,
        dimensions.width,
        dimensions
      ).then(() => {
        return `/optimised/${dimensions.width}${imageName.replace(
          / /gim,
          "%20"
        )} ${dimensions.width}w`;
      });
    } else {
      return "";
    }
  });

  // eslint-disable-next-line no-undef
  imageObj.srcset = await Promise.all(promises).then((results) => {
    return results.join(", ");
  });
  return imageObj;
};
