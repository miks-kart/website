import { createContext, useEffect, useState } from "react";

export const ProgressiveImageSupportContext = createContext();

export function ProgressiveImageSupportProvider(props) {
  useEffect(() => {
    function checkAvifSupport() {
      const avif = new Image();
      avif.src =
        "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
      return avif.decode ? true : false;
    }

    function checkWebpSupport() {
      const elem = document.createElement("canvas");

      // eslint-disable-next-line no-extra-boolean-cast
      if (!!(elem.getContext && elem.getContext("2d"))) {
        // canvas is supported
        return elem.toDataURL("image/webp").indexOf("data:image/webp") === 0;
      } else {
        // canvas is not supported
        return false;
      }
    }

    setProgressiveImageSupport({
      webp: checkWebpSupport(),
      avif: checkAvifSupport(),
    });
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
