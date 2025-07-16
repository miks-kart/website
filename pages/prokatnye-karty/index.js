import Link from "next/link";
import { getFluidImage } from "@components/image/imageFunctions";
import { useEffect, useState } from "react";
import Image from "@components/image/Image";

export default function Index({ data, heroOne, heroTwo, heroThree }) {
  const [activeSlide, setActiveSlide] = useState(0); // 0 - первый, 1 - второй, 2 - третий
  const [hoveredSlide, setHoveredSlide] = useState(null);

  useEffect(() => {
    let timer;
    if (hoveredSlide === null) {
      timer = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % 3); // Циклически переключаем между 0, 1, 2
      }, 5000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [hoveredSlide]);

  return (
    <section className="w-screen bg-white">
      <div className="relative flex items-end justify-start object-cover w-full h-screen">
        <Image
          preload
          loading="eager"
          src={heroOne}
          alt=""
          className="!absolute inset-0 w-full h-full"
        />
        <Image
          loading="eager"
          src={heroTwo}
          alt=""
          className={`${
            activeSlide !== 1 ? "opacity-0" : "opacity-100"
          } !absolute inset-0 w-full h-full transition-opacity duration-500`}
        />
        <Image
          loading="eager"
          src={heroThree}
          alt=""
          className={`${
            activeSlide !== 2 ? "opacity-0" : "opacity-100"
          } !absolute inset-0 w-full h-full transition-opacity duration-500`}
        />
        
        <div
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
          }}
          className="absolute inset-0 z-30"
        ></div>
        <div className="page-container relative z-40 wide md:!py-16 !py-5">
          <h1 className="prokatnye-karty">Прокатные карты</h1>
          
          {/* Первый карт */}
          <Link
            href={data.carts[0].cart.link}
            onFocus={() => setHoveredSlide(0)}
            onBlur={() => setHoveredSlide(null)}
            onMouseOver={() => setHoveredSlide(0)}
            onMouseLeave={() => setHoveredSlide(null)}
            className="block pb-2 md:pb-5"
            onClick={() => setActiveSlide(0)}
          >
            <p
              className={`${
                hoveredSlide === null
                  ? "underline underline-offset-8 decoration-4"
                  : ""
              } ${
                hoveredSlide === 0 || activeSlide === 0
                  ? "underline decoration-primary-red underline-offset-8 decoration-4"
                  : ""
              } font-black inline-flex text-3xl md:text-6xl italic uppercase text-[#F6F6F6]`}
            >
              {data.carts[0].cart.heading}
              <span
                className={`${
                  hoveredSlide === 0 || activeSlide === 0 ? "!opacity-100" : ""
                } mt-1 md:ml-6 ml-3 duration-150 opacity-0`}
              >
                <img
                  src="/images/check-up.svg"
                  alt="check up"
                  className="w-4 h-4 md:w-5 md:h-5"
                />
              </span>
            </p>
            <p
              className={`${
                activeSlide === 0 ? "!opacity-100" : ""
              } md:text-xl font-light text-white duration-150 opacity-0`}
            >
              {data.carts[0].cart.text}
            </p>
          </Link>
          
          {/* Второй карт */}
          <Link
            href={data.carts[1].cart.link}
            onFocus={() => setHoveredSlide(1)}
            onBlur={() => setHoveredSlide(null)}
            onMouseOver={() => setHoveredSlide(1)}
            onMouseLeave={() => setHoveredSlide(null)}
            className="pb-2 md:pb-5"
            onClick={() => setActiveSlide(1)}
          >
            <p
              className={`${
                hoveredSlide === null
                  ? "underline underline-offset-8 decoration-4"
                  : ""
              } ${
                hoveredSlide === 1 || activeSlide === 1
                  ? "underline decoration-primary-red underline-offset-8 decoration-4"
                  : ""
              } font-black inline-flex text-3xl md:text-6xl italic uppercase text-[#F6F6F6]`}
            >
              {data.carts[1].cart.heading}
              <span
                className={`${
                  hoveredSlide === 1 || activeSlide === 1 ? "!opacity-100" : ""
                } mt-1 md:ml-6 ml-3 duration-150 opacity-0`}
              >
                <img
                  src="/images/check-up.svg"
                  alt="check up"
                  className="w-4 h-4 md:w-5 md:h-5"
                />
              </span>
            </p>
            <p
              className={`${
                activeSlide === 1 ? "!opacity-100" : ""
              } md:text-xl font-light text-white duration-150 opacity-0`}
            >
              {data.carts[1].cart.text}
            </p>
          </Link>
          
          {/* Третий карт */}
          <Link
            href={data.carts[2].cart.link}
            onFocus={() => setHoveredSlide(2)}
            onBlur={() => setHoveredSlide(null)}
            onMouseOver={() => setHoveredSlide(2)}
            onMouseLeave={() => setHoveredSlide(null)}
            className="group"
            onClick={() => setActiveSlide(2)}
          >
            <p
              className={`${
                hoveredSlide === null
                  ? "underline underline-offset-8 decoration-4"
                  : ""
              } ${
                hoveredSlide === 2 || activeSlide === 2
                  ? "underline decoration-primary-red underline-offset-8 decoration-4"
                  : ""
              } font-black inline-flex text-3xl md:text-6xl italic uppercase text-[#F6F6F6]`}
            >
              <span>{data.carts[2].cart.heading}</span>
              <span
                className={`${
                  hoveredSlide === 2 || activeSlide === 2 ? "!opacity-100" : ""
                } mt-1 md:ml-6 ml-2 duration-150 opacity-0`}
              >
                <img
                  src="/images/check-up.svg"
                  alt="check up"
                  className="w-4 h-4 md:w-5 md:h-5"
                />
              </span>
            </p>
            <p
              className={`${
                activeSlide === 2 ? "!opacity-100" : ""
              } md:text-xl font-light text-white duration-150 opacity-0`}
            >
              {data.carts[2].cart.text}
            </p>
          </Link>
        </div>
      </div>
      {/* Остальной код остается без изменений */}
    </section>
  );
}

export async function getStaticProps() {
  const locale = "ru";
  const content = await import(`../../cms/pages/${locale}/carts.md`);
  const header = await import(`../../cms/config/${locale}/header.md`);
  const footer = await import(`../../cms/config/${locale}/footer.md`);
  const seo = await import(`../../cms/config/${locale}/seo.md`);

  const heroOne = await getFluidImage(
    content.default.attributes.carts[0].cart.image,
    { webp: true }
  );
  const heroTwo = await getFluidImage(
    content.default.attributes.carts[1].cart.image,
    { webp: true }
  );
  const heroThree = await getFluidImage(
    content.default.attributes.carts[2].cart.image,
    { webp: true }
  );

  return {
    props: {
      header: header.default.attributes,
      footer: footer.default.attributes,
      data: content.default.attributes,
      seo: seo.default.attributes,
      heroOne,
      heroTwo,
      heroThree,
    },
  };
}
