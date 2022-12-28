import AnchorSmoothScroll from "@components/AnchorSmoothScroll";
import BackgroundImage from "@components/image/BackgroundImage";
import { getFluidImage } from "@components/image/imageFunctions";
import Link from "next/link";

export default function Index({ data, hero }) {
  return (
    <AnchorSmoothScroll>
      <section className="w-screen bg-white">
        <BackgroundImage
          containerClassName="z-20 w-full"
          className="flex items-end justify-start object-cover w-full h-screen"
          image={hero}
        >
          <div className="page-container wide !py-16">
            <Link href={data.carts[0].cart.link} className="block pb-5 group">
              <p className="font-black flex text-6xl italic uppercase text-[#F6F6F6]">
                {data.carts[0].cart.heading}
                <span className="mt-1 ml-6 duration-150 opacity-0 group-hover:opacity-100 group-focus:opacity-100">
                  <img
                    src="/images/check-up.svg"
                    alt="check up"
                    className="w-5 h-5"
                  />
                </span>
              </p>
              <p className="text-xl font-light text-white duration-150 opacity-0 group-hover:opacity-100 group-focus:opacity-100">
                {data.carts[0].cart.text}
              </p>
            </Link>
            <Link href={data.carts[1].cart.link} className=" group">
              <p className="font-black flex text-6xl italic uppercase text-[#F6F6F6]">
                {data.carts[1].cart.heading}
                <span className="mt-1 ml-6 duration-150 opacity-0 group-hover:opacity-100 group-focus:opacity-100">
                  <img
                    src="/images/check-up.svg"
                    alt="check up"
                    className="w-5 h-5"
                  />
                </span>
              </p>
              <p className="text-xl font-light text-white duration-150 opacity-0 group-hover:opacity-100 group-focus:opacity-100">
                {data.carts[1].cart.text}
              </p>
            </Link>
          </div>
        </BackgroundImage>
        <section className="bg-[#f7f7f7]">
          <div className="flex justify-between items-center page-container !space-y-0 !py-7 wide">
            <div className="flex items-center">
              <img
                style={{
                  filter: "drop-shadow(0px 50px 100px rgba(0, 0, 0, 0.25))",
                  transform: "translateZ(0)",
                }}
                src={data.imageOne}
                alt="socket"
                className="mr-10 w-28"
              />
              <div className="">
                <p className="pb-3 text-2xl italic font-black uppercase text-primary-dark">
                  {data.headingOne}
                </p>
                <p className="theme-text">{data.textOne}</p>
              </div>
            </div>
            <Link href={data.buttonOne.link} className="theme-button">
              <span className="relative">{data.buttonOne.text}</span>
            </Link>
          </div>
        </section>
      </section>
    </AnchorSmoothScroll>
  );
}

export async function getStaticProps() {
  const locale = "ru";
  const content = await import(`../cms/pages/${locale}/new.md`);
  const header = await import(`../cms/config/${locale}/header.md`);
  const footer = await import(`../cms/config/${locale}/footer.md`);
  const seo = await import(`../cms/config/${locale}/seo.md`);

  const hero = await getFluidImage(content.default.attributes.hero);

  return {
    props: {
      header: header.default.attributes,
      footer: footer.default.attributes,
      data: content.default.attributes,
      seo: seo.default.attributes,
      hero,
    },
  };
}
