import { useEffect, useRef } from "react";
import styles from "./index.module.css";

export default function Image({
  image,
  alt = "",
  className,
  imageClassName = "object-cover w-full h-full",
  loading = "lazy",
  ...props
}) {
  const imageRef = useRef();

  function imageLoaded() {
    const imagePlaceholder = imageRef.current.getElementsByClassName(
      styles.responsiveImage
    )[0];
    imagePlaceholder.classList.add(styles.loaded);
  }

  useEffect(() => {
    const imagePlaceholder = imageRef.current.getElementsByClassName(
      styles.responsiveImage
    )[0];
    const imageEl = imageRef.current.getElementsByClassName("onload")[0];
    if (imageEl.complete) {
      imagePlaceholder.classList.add(styles.loaded);
    }
  }, []);

  return (
    <div {...props} ref={imageRef} className={`relative ${className}`}>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div
          style={{
            backgroundImage: `url("${image.placeholder}")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className={`relative pointer-events-none ease-in-out w-full h-full ${styles.responsivePlaceholder} ${styles.responsiveImage}`}
        />
      </div>
      <picture
        className={`relative top-0 left-0 w-full h-full pointer-events-none  no-select`}
      >
        <source srcSet={image.srcset} />
        <img
          onLoad={() => imageLoaded()}
          loading={loading}
          className={`${imageClassName} onload`}
          src={image.src}
          alt={alt}
        />
      </picture>
    </div>
  );
}
