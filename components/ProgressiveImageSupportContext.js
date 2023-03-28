import { createContext, useEffect, useState } from "react";

export const ProgressiveImageSupportContext = createContext();

export function ProgressiveImageSupportProvider(props) {
  useEffect(() => {
    async function checkImageFormatSupport() {
      var img = new Image();
      const avif = new Image();
      avif.src =
        "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
      img.onload = function () {
        setProgressiveImageSupport({
          avif: avif.decode ? true : false,
          webp: true,
        });
      };
      img.onerror = function () {
        setProgressiveImageSupport({
          avif: avif.decode ? true : false,
          webp: false,
        });
      };
      img.src = "http://www.gstatic.com/webp/gallery/1.webp";
    }

    checkImageFormatSupport();
  }, []);

  const [ProgressiveImageSupport, setProgressiveImageSupport] = useState({
    webp: true,
    avif: true,
  });

  return (
    <ProgressiveImageSupportContext.Provider
      value={{ ProgressiveImageSupport, setProgressiveImageSupport }}
    >
      {props.children}
    </ProgressiveImageSupportContext.Provider>
  );
}
