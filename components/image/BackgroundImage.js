import { forwardRef, useCallback, useEffect, useRef } from "react";
import styles from "./index.module.css";
import Preload from "./Preload";

const BackgroundImage = forwardRef(
  (
    {
      image,
      preload,
      children,
      alt = "",
      className,
      sizes = "100vw",
      containerClassName,
      imageClassName = "object-cover w-full h-full",
      loading = "eager",
      ...props
    },
    forwardedRef
  ) => {
    const imageRef = useRef();
    const wasLoaded = useRef(false);

    const sources = image.formats.map((format) => (
      <source
        key={format.srcSet}
        srcSet={format.srcSet}
        type={`${format.format}`}
      />
    ));

    // See https://stackoverflow.com/q/39777833/266535 for why we use this ref
    // handler instead of the img's onLoad attribute.
    function handleLoading(img) {
      if (!img) {
        return;
      }

      const p = "decode" in img ? img.decode() : Promise.resolve();
      p.catch(() => {}).then(() => {
        if (!img.parentElement || !img.isConnected) {
          // Exit early in case of race condition:
          // - onload() is called
          // - decode() is called but incomplete
          // - unmount is called
          // - decode() completes
          return;
        }
        setBlurComplete();
      });
    }

    function setBlurComplete() {
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
      const resources = performance.getEntriesByType("resource");
      const imgResources = resources.filter(
        (resource) => resource.name === imageEl.currentSrc
      );
      if (imgResources.length > 0 && wasLoaded.current === false) {
        wasLoaded.current = true;
        imagePlaceholder.classList.add(styles.wasLoaded);
      }
    }, []);

    return (
      <>
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
            {...props}
            className={`absolute top-0 left-0 w-full h-full pointer-events-none  no-select`}
          >
            {sources}
            <img
              decoding="async"
              loading={loading}
              className={`${imageClassName} onload`}
              alt={alt}
              ref={useCallback(
                (img) => {
                  if (forwardedRef) {
                    if (typeof forwardedRef === "function") forwardedRef(img);
                    else if (typeof forwardedRef === "object") {
                      forwardedRef.current = img;
                    }
                  }
                  if (!img) {
                    return;
                  }
                  if (img.complete) {
                    handleLoading(img);
                  }
                },
                // eslint-disable-next-line react-hooks/exhaustive-deps
                [forwardedRef]
              )}
              onLoad={(event) => handleLoading(event.currentTarget)}
              src={image.src}
            />
          </picture>
        </div>
        {preload && <Preload src={image} sizes={sizes} />}
      </>
    );
  }
);

BackgroundImage.displayName = "BackgroundImage";
export default BackgroundImage;
