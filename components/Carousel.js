import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import ImageBlur from "./image/ImageBlur";

export default function Carousel({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      <div className="navigation-wrapper">
        <div
          ref={sliderRef}
          className="keen-slider aspect-[0.83333333] md:aspect-[2.66666667]"
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              style={{ width: "100%" }}
              className="z-10 min-w-full keen-slider__slide number-slide"
            >
              <ImageBlur
                preload={i === 0}
                loading="eager"
                image={slide}
                sizes="(max-width: 1200px) 100vw, 1200px"
                alt="slide"
                className="w-full h-full "
              />
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              aria-label="Предыдущий слайд"
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              aria-label="Следующий слайд"
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
        {loaded && instanceRef.current && (
          <div className="absolute bottom-0 w-full dots">
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  aria-label="слайд"
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={
                    "dot py-2" + (currentSlide === idx ? " active" : "")
                  }
                >
                  <span
                    className={`
                      ${
                        currentSlide !== idx ? "bg-white" : "bg-primary-red"
                      } md:w-[5.125rem] w-[2.875rem]
                    `}
                  ></span>
                </button>
              );
            })}
          </div>
        )}
      </div>
      <style jsx global>
        {`
          .keen-slider__slide {
            -webkit-backface-visibility: hidden;
            -webkit-transform: translateZ(0) scale(1, 1);
            transform: translateZ(0);
            isolation: isolate;
          }
          [class*=" number-slide"] {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .navigation-wrapper {
            position: relative;
          }

          .arrow {
            z-index: 11;
            width: 3.125rem;
            height: 3.125rem;
            position: absolute;
            top: 50%;
            cursor: pointer;
          }

          .arrow--left {
            left: 5px;
          }

          .arrow--right {
            left: auto;
            right: 5px;
          }
          .dots {
            z-index: 11;
            display: flex;
            padding: 0.75rem 0;
            justify-content: center;
          }

          .dot span {
            display: block;
            border: none;
            height: 0.1875rem;
            margin: 0 0.3125rem;
            cursor: pointer;
          }

          .dot:focus {
            outline: none;
          }
        `}
      </style>
    </>
  );
}

function Arrow(props) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <button
      aria-label={props.left ? "Следующий слайд" : "Предыдущий слайд"}
      className={`arrow hidden md:block -translate-y-1/2  ${
        props.left
          ? "arrow--left md:translate-x-[2rem]"
          : "arrow--right md:-translate-x-[2rem]"
      } ${disabeld} hover:fill-[#A5A5A5] fill-white transition-colors duration-150`}
      onClick={props.onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="25" />
        {props.left && (
          <>
            <line
              x1="26.546"
              y1="32.9099"
              x2="18.0607"
              y2="24.4246"
              stroke="black"
              strokeWidth="3"
            />
            <line
              x1="26.546"
              y1="18.0607"
              x2="18.0607"
              y2="26.5459"
              stroke="black"
              strokeWidth="3"
            />
          </>
        )}
        {!props.left && (
          <>
            <line
              x1="23.454"
              y1="17.0901"
              x2="31.9393"
              y2="25.5754"
              stroke="black"
              strokeWidth="3"
            />
            <line
              x1="23.454"
              y1="31.9393"
              x2="31.9393"
              y2="23.454"
              stroke="black"
              strokeWidth="3"
            />
          </>
        )}
      </svg>
    </button>
  );
}
