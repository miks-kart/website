import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Carousel from "@components/Carousel";
import markdownToHtml from "../../lib/markdownToHtml";
import { getFluidImage } from "@components/image/imageFunctions";
import CartFeatures from "@components/CartFeatures";
import SaleItem from "@components/SaleItem";
import { useStore } from "@components/Store";
import DropdownHeading from "@components/DropdownHeading";
import PurchaseSummary from "@components/PurchaseSummary";
import HorizontalScrolling from "@components/HorizontalScrolling";
import Image from "@components/image/ImageSimple";
// import PDFTest from "@components/PDFTest";

export default function Index({
  data,
  postOne,
  gallery,
  contactSale,
  pdf,
}) {
  const [isOpenOne, setIsOpenOne] = useState(false);
  const shoppingCart = useStore((state) => state.shoppingCart);
  const setShoppingCart = useStore((state) => state.setShoppingCart);

  useEffect(() => {
    setShoppingCart({
      priceListKarts: { ...data.kart, amount: 1 },
      priceListOptions: [],
      priceListOptionsSport: [],
    });
  }, []);
  return (
    <section className="w-screen">
      <div className="!py-0 page-container full-width wide">
        <Carousel slides={gallery} />
      </div>
      <div className="page-container  !py-0 wide">
        <article className="default-container !mt-10 md:!mt-16">
          <h1 className="!pb-[0.625rem] md:!pb-5  theme-heading">
            {data.headingOne}
          </h1>
          <p className="pb-5 theme-text">{data.textOne}</p>
          <p className="theme-text pb-5 !text-[#969696]">{data.textTwo}</p>
          <p className="pb-3 !normal-case theme-heading-small">
            {data.headingTwo}
          </p>
          <div
            className="markdown-text theme-text"
            dangerouslySetInnerHTML={{ __html: postOne }}
          />
            <Image src={data.imageTwo} alt="slide" className="w-full md:hidden" />
        </article>
      </div>
    <div className="relative hidden w-full md:block">
        <HorizontalScrolling>
          <div className="inline-flex items-center justify-center h-screen min-w-screen">
            <div className="h-12 narrow-container-margin"></div>
            <Image
              style={{
                aspectRatio: data.imageOne.aspectRatio,
              }}
              className="w-[172.5vh] object-left max-w-none mt-24"
              sizes="173w"
              src={data.imageOne}
              alt="slide"
            />
            <div className="h-12 narrow-container-margin"></div>
          </div>
        </HorizontalScrolling>
      </div>
      <div className="page-container !py-16 md:!pt-24 md:!pb-32 wide !space-y-0">
        <div className="grid gap-5 md:grid-cols-3">
          {data.features.map(({ feature }) => (
            <CartFeatures feature={feature} key={feature.headingSimple} />
          ))}
        </div>
        <div className="default-container">
          <article>
            <h2 className="!pb-5 md:!pb-16 theme-heading pt-10 md:pt-24">
              {data.headingThree}
            </h2>
            <button onClick={() => setIsOpenOne((isOpenOne) => !isOpenOne)}>
              <DropdownHeading state={isOpenOne} heading={data.baseHeading} />
            </button>
            <p className="pt-2 text-sm font-bold text-primary-gray-dark">
              {data.baseSubText}
            </p>
            <motion.div
              transition={{ duration: 0.5 }}
              className="h-0 overflow-hidden"
              animate={{
                height: !isOpenOne ? 0 : "auto",
              }}
            >
              <div className="grid gap-5 pt-10 pb-5 md:pb-8 md:grid-cols-2">
                {data.base.map((item) => (
                  <SaleItem disabled key={item.headingSimple} item={item} />
                ))}
              </div>
            </motion.div>
          </article>
          <PurchaseSummary
            sport
            pdf={pdf}
            contactSale={contactSale}
            data={data}
          />
        </div>
      </div>
    </section>
  );
}

export async function getStaticProps() {
  const locale = "ru";
  const pdf = await import(`../../cms/pages/${locale}/pdf.md`);
  const content = await import(`../../cms/pages/${locale}/cart-electro.md`);
  const contactSale = await import(`../../cms/config/${locale}/contactSale.md`);
  const header = await import(`../../cms/config/${locale}/header.md`);
  const footer = await import(`../../cms/config/${locale}/footer.md`);
  const seo = await import(`../../cms/config/${locale}/seo.md`);

  const postOne = await markdownToHtml(content.default.attributes.textThree);

  content.default.attributes.imageOne = await getFluidImage(
    content.default.attributes.imageOne
  );
  content.default.attributes.imageTwo = await getFluidImage(
    content.default.attributes.imageTwo
  );

  const gallery = await Promise.all(
    content.default.attributes.gallery.map(
      async (img) => await getFluidImage(img, { avif: false, webp: true })
    )
  ).then((res) => res);

  content.default.attributes.base = await Promise.all(
    content.default.attributes.base.map(async ({ item }) => ({
      ...item,
      image: await getFluidImage(item.image),
    }))
  ).then((res) => res);

  return {
    props: {
      pdf: pdf.default.attributes,
      header: header.default.attributes,
      contactSale: contactSale.default.attributes,
      footer: footer.default.attributes,
      data: content.default.attributes,
      seo: seo.default.attributes,
      headerNotTrasnparent: true,
      postOne,
      gallery,
    },
  };
}
