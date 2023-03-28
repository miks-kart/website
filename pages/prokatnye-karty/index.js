import Link from "next/link";
import { getFluidImage } from "@components/image/imageFunctions";
import { useEffect, useState } from "react";
import Image from "@components/image/Image";

export default function Index({ data, heroOne, heroTwo }) {
  const [isFirst, setIsFirst] = useState(true);
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  useEffect(() => {
    let timer;
    if (!first && !second) {
      timer = setInterval(() => {
        setIsFirst((isFirst) => !isFirst);
      }, 5000);
    }

    if (first) {
      setIsFirst(true);
      clearInterval(timer);
    }
    if (second) {
      setIsFirst(false);
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [first, second]);
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
            isFirst ? "opacity-0" : "opacity-100"
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
          <Link
            href={data.carts[0].cart.link}
            onFocus={() => setFirst(true)}
            onBlur={() => setFirst(false)}
            onMouseOver={() => setFirst(true)}
            onMouseLeave={() => setFirst(false)}
            className="block pb-2 md:pb-5"
          >
            <p
              className={`${
                !first && !second
                  ? "underline underline-offset-8 decoration-4"
                  : ""
              } ${
                isFirst && first
                  ? "underline decoration-primary-red underline-offset-8 decoration-4"
                  : ""
              } font-black inline-flex text-3xl md:text-6xl italic uppercase text-[#F6F6F6]`}
            >
              {data.carts[0].cart.heading}
              <span
                className={`${
                  isFirst && first ? "!opacity-100" : ""
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
                isFirst ? "!opacity-100" : ""
              } md:text-xl font-light text-white duration-150 opacity-0`}
            >
              {data.carts[0].cart.text}
            </p>
          </Link>
          <Link
            href={data.carts[1].cart.link}
            onFocus={() => setSecond(true)}
            onBlur={() => setSecond(false)}
            onMouseOver={() => setSecond(true)}
            onMouseLeave={() => setSecond(false)}
            className="group"
          >
            <p
              className={`${
                !first && !second
                  ? "underline underline-offset-8 decoration-4"
                  : ""
              } ${
                !isFirst && second
                  ? "underline decoration-primary-red underline-offset-8 decoration-4"
                  : ""
              } font-black inline-flex text-3xl md:text-6xl italic uppercase text-[#F6F6F6]`}
            >
              <span>{data.carts[1].cart.heading}</span>
              <span
                className={`${
                  !isFirst && second ? "!opacity-100" : ""
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
                !isFirst ? "!opacity-100" : ""
              } md:text-xl font-light text-white duration-150 opacity-0`}
            >
              {data.carts[1].cart.text}
            </p>
          </Link>
        </div>
      </div>
      <section className="bg-[#f7f7f7]">
        <div className="md:flex justify-between items-center  page-container !space-y-0 !py-7 wide">
          <div className="flex items-center">
            <img
              style={{
                filter: "drop-shadow(0px 50px 100px rgba(0, 0, 0, 0.25))",
                transform: "translateZ(0)",
              }}
              src={data.imageOne}
              alt="socket"
              className="w-1/2 pr-4 md:pr-0 md:mr-10 md:w-28"
            />
            <div className="">
              <p className="pb-3 text-2xl italic font-black uppercase text-primary-dark">
                {data.headingOne}
              </p>
              <p className="max-w-sm theme-text">{data.textOne}</p>
            </div>
          </div>
          <div className="table pt-8 mx-auto md:pt-0 md:mx-0">
            <Link href={data.buttonOne.link} className="theme-button">
              <span className="relative">{data.buttonOne.text}</span>
            </Link>
          </div>
        </div>
      </section>
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
    {
      webp: true,
    }
  );
  const heroTwo = await getFluidImage(
    content.default.attributes.carts[1].cart.image,
    {
      webp: true,
    }
  );

  return {
    props: {
      header: header.default.attributes,
      footer: footer.default.attributes,
      data: content.default.attributes,
      seo: seo.default.attributes,
      heroOne,
      heroTwo,
    },
  };
}
