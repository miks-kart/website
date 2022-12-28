import { useEffect, useRef } from "react";
import styles from "./index.module.css";

export default function BackgroundImage({
  image,
  children,
  alt = "",
  className,
  containerClassName,
  imageClassName = "object-cover w-full h-full",
  loading = "eager",
}) {
  const imageRef = useRef();
  const wasLoaded = useRef(false);

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
    if (imageEl.complete && wasLoaded.current === false) {
      wasLoaded.current = true;
      imagePlaceholder.classList.add(styles.loaded);
    }
  }, []);

  return (
    <div ref={imageRef} className={`relative ${className}`}>
      <div className={containerClassName}>{children}</div>
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
        className={`absolute top-0 left-0 w-full h-full pointer-events-none  no-select`}
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
