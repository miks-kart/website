import { useKeenSlider } from "keen-slider/react";
import ImageBlur from "./image/ImageBlur";

export default function Slideshow({ slides }) {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );
  return (
    <div ref={sliderRef} className="h-full min-w-full keen-slider">
      {slides.map((slide, i) => (
        <div
          style={{ width: "100%" }}
          key={slide.src}
          className="min-w-full keen-slider__slide"
        >
          <ImageBlur
            preload={i === 0}
            loading="eager"
            className="h-full min-w-full"
            alt="slide"
            image={slide}
          />
        </div>
      ))}
    </div>
  );
}
