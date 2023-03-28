import { ProgressiveImageSupportContext } from "@components/ProgressiveImageSupportContext";
import { useContext } from "react";
import Preload from "./Preload";

export default function ImageSimple({
  src,
  preload,
  alt = "",
  className,
  sizes = "100vw",
  loading = "lazy",
  ...props
}) {
  const { ProgressiveImageSupport } = useContext(
    ProgressiveImageSupportContext
  );

  return (
    <>
      <img
        decoding="async"
        sizes={sizes}
        loading={loading}
        className={className}
        alt={alt}
        srcSet={
          ProgressiveImageSupport.webp ? src.srcSetWebp : src.srcSetOriginal
        }
        src={src.src}
        {...props}
      />
      {preload && <Preload src={src} sizes={sizes} />}
    </>
  );
}
