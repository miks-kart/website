import AnchorSmoothScroll from "@components/AnchorSmoothScroll";
import PurchaseSummary from "@components/PurchaseSummary";
import SaleItem from "@components/SaleItem";
import { useStore } from "@components/Store";
import { useEffect, useState } from "react";
import markdownToHtml from "../lib/markdownToHtml";
import { motion } from "framer-motion";
import DropdownHeading from "@components/DropdownHeading";
import { getOptimizedImage } from "@components/image/imageFunctions";
// import PDFTest from "@components/PDFTest";

export default function Index({
  data,
  saleItemsOne,
  saleItemsTwo,
  contactSale,
  pdf,
}) {
  const [isOpenOne, setIsOpenOne] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const [isOpenThree, setIsOpenThree] = useState(false);
  const [isOpenFour, setIsOpenFour] = useState(false);
  const [isOpenFive, setIsOpenFive] = useState(false);
  const shoppingCart = useStore((state) => state.shoppingCart);
  const setShoppingCart = useStore((state) => state.setShoppingCart);

  useEffect(() => {
    setShoppingCart({
      priceListKarts: [],
      priceListEngines: [],
      priceListTires: [],
      priceListOptionsSport: [],
      priceListOptionsJunior: [],
      priceListOptions: [],
    });
  }, []);

  return (
    <AnchorSmoothScroll>
      {/* <PDFTest shoppingCart={shoppingCart} data={data} pdf={pdf} /> */}
      <section className="w-screen ">
        <div className="page-container md:!pt-16 !pb-16 !space-y-0 ">
          <h1 className="!pb-5 md:!pb-16 theme-heading">{data.headingOne}</h1>
          <article className="!mt-5">
            <button
              id={data.baseCartsId}
              onClick={() => setIsOpenOne((isOpenOne) => !isOpenOne)}
            >
              <DropdownHeading state={isOpenOne} heading={data.headingTwo} />
            </button>
            <div className="text-[#969696] text-sm pt-2">
              <p className="font-bold">
                {shoppingCart["priceListKarts"]?.length > 0
                  ? data.youHaveChosen
                  : data.youHaventChosen}
              </p>
              {shoppingCart["priceListKarts"]?.length > 0 &&
                shoppingCart["priceListKarts"].map(
                  (item) =>
                    JSON.stringify(data.baseCarts).includes(
                      JSON.stringify(item.headingSimple)
                    ) && (
                      <p className="pt-2 font-light" key={item.headingSimple}>
                        {item.headingSimple}
                      </p>
                    )
                )}
            </div>
            <motion.div
              transition={{ duration: 0.3 }}
              className="h-0 overflow-hidden"
              animate={{
                height: !isOpenOne ? 0 : "auto",
              }}
            >
              <div className="grid gap-5 pb-5 mt-10 md:grid-cols-2 md:pb-8">
                {data.baseCarts.map((item) => (
                  <SaleItem
                    category="priceListKarts"
                    key={item.headingSimple}
                    item={item}
                  />
                ))}
              </div>
            </motion.div>
          </article>
          <article className="pt-5 md:pt-8">
            <button
              id={data.enginesId}
              onClick={() => setIsOpenTwo((isOpenTwo) => !isOpenTwo)}
            >
              <DropdownHeading state={isOpenTwo} heading={data.headingFive} />
            </button>
            <div className="text-[#969696] text-sm pt-2">
              <p className="font-bold">
                {shoppingCart["priceListEngines"]?.length > 0
                  ? data.youHaveChosen
                  : data.youHaventChosen}
              </p>
              {shoppingCart["priceListEngines"]?.length > 0 &&
                shoppingCart["priceListEngines"].map((item) => (
                  <p className="pt-2 font-light" key={item.headingSimple}>
                    {item.headingSimple}
                  </p>
                ))}
            </div>
            <motion.div
              transition={{ duration: 0.3 }}
              className="h-0 overflow-hidden"
              animate={{
                height: !isOpenTwo ? 0 : "auto",
              }}
            >
              <div className="grid gap-5 pb-5 mt-10 md:grid-cols-2 md:pb-8">
                {saleItemsOne.map((item) => (
                  <SaleItem
                    category="priceListEngines"
                    key={item.headingSimple}
                    item={item}
                  />
                ))}
              </div>
            </motion.div>
          </article>
          <article className="pt-5 md:pt-8">
            <button
              id={data.tiresId}
              onClick={() => setIsOpenThree((isOpenThree) => !isOpenThree)}
            >
              <DropdownHeading state={isOpenThree} heading={data.headingSix} />
            </button>

            <div className="text-[#969696] text-sm pt-2">
              <p className="font-bold">
                {shoppingCart["priceListTires"]?.length > 0
                  ? data.youHaveChosen
                  : data.youHaventChosen}
              </p>
              {shoppingCart["priceListTires"]?.length > 0 &&
                shoppingCart["priceListTires"].map((item) => (
                  <p className="pt-2 font-light" key={item.headingSimple}>
                    {item.headingSimple}
                  </p>
                ))}
            </div>
            <motion.div
              transition={{ duration: 0.3 }}
              className="h-0 overflow-hidden"
              animate={{
                height: !isOpenThree ? 0 : "auto",
              }}
            >
              <div className="grid gap-5 pb-5 mt-10 md:grid-cols-2 md:pb-8">
                {saleItemsTwo.map((item) => (
                  <SaleItem
                    category="priceListTires"
                    key={item.headingSimple}
                    item={item}
                  />
                ))}
              </div>
            </motion.div>
          </article>

          <article className="pt-10 md:pt-20" id={data.extrasId}>
            <h2 className="!text-3xl theme-subheading">{data.headingSeven}</h2>
            <button onClick={() => setIsOpenFour((isOpenFour) => !isOpenFour)}>
              <DropdownHeading
                state={isOpenFour}
                heading={data.headingExtrasSport}
              />
            </button>

            <div className="text-[#969696] text-sm pt-2">
              <p className="font-bold">
                {shoppingCart["priceListOptionsSport"].length > 0
                  ? data.youHaveChosen
                  : data.youHaventChosen}
              </p>
              {shoppingCart["priceListOptionsSport"].length > 0 &&
                shoppingCart["priceListOptionsSport"].map((item) => (
                  <p className="pt-2 font-light" key={item.headingSimple}>
                    {item.headingSimple}
                  </p>
                ))}
            </div>
            <motion.div
              transition={{ duration: 0.5 }}
              className="h-0 overflow-hidden"
              animate={{
                height: !isOpenFour ? 0 : "auto",
              }}
            >
              <div className="grid gap-5 pb-5 mt-10 md:grid-cols-2 md:pb-8">
                {data.extrasSport.map((item) => (
                  <SaleItem
                    category="priceListOptionsSport"
                    key={item.headingSimple}
                    item={item}
                  />
                ))}
              </div>
            </motion.div>
          </article>
          <article className="pt-5 md:pt-8">
            <button onClick={() => setIsOpenFive((isOpenFive) => !isOpenFive)}>
              <DropdownHeading
                state={isOpenFive}
                heading={data.headingExtrasJunior}
              />
            </button>

            <div className="text-[#969696] text-sm pt-2">
              <p className="font-bold">
                {shoppingCart["priceListOptionsJunior"].length > 0
                  ? data.youHaveChosen
                  : data.youHaventChosen}
              </p>
              {shoppingCart["priceListOptionsJunior"].length > 0 &&
                shoppingCart["priceListOptionsJunior"].map((item) => (
                  <p className="pt-2 font-light" key={item.headingSimple}>
                    {item.headingSimple}
                  </p>
                ))}
            </div>
            <motion.div
              transition={{ duration: 0.5 }}
              className="h-0 overflow-hidden"
              animate={{
                height: !isOpenFive ? 0 : "auto",
              }}
            >
              <div className="grid gap-5 pb-5 mt-10 md:grid-cols-2 md:pb-8">
                {data.extrasJunior.map((item) => (
                  <SaleItem
                    category="priceListOptionsJunior"
                    key={item.headingSimple}
                    item={item}
                  />
                ))}
              </div>
            </motion.div>
          </article>
          <a
            href={data.buttonOne.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-10 italic leading-none md:py-16 underline-offset-2 hover:underline group theme-heading-small"
          >
            {data.buttonOne.text.split(" ").map((word, i) => (
              <span
                className="inline-block whitespace-pre-wrap group-hover:underline"
                key={i}
              >
                {word}{" "}
              </span>
            ))}
            <span className={`inline-block group-hover:hidden mb-auto ml-2`}>
              <img
                src="/images/check-up.svg"
                alt="check up"
                className="w-[1rem] h-[1rem]"
              />
            </span>
            <span className={` hidden group-hover:inline-block mt-auto ml-2`}>
              <img
                src="/images/check-down.svg"
                alt="check down"
                className="w-[1rem]  h-[1rem]"
              />
            </span>
          </a>
          <PurchaseSummary
            pdf={pdf}
            ceny
            contactSale={contactSale}
            data={data}
          />
        </div>
      </section>
    </AnchorSmoothScroll>
  );
}

export async function getStaticProps() {
  const locale = "ru";
  const pdf = await import(`../cms/pages/${locale}/pdf.md`);
  const content = await import(`../cms/pages/${locale}/price-list.md`);
  const contactSale = await import(`../cms/config/${locale}/contactSale.md`);
  const header = await import(`../cms/config/${locale}/header.md`);
  const footer = await import(`../cms/config/${locale}/footer.md`);
  const seo = await import(`../cms/config/${locale}/seo.md`);

  content.default.attributes.baseCarts = await Promise.all(
    content.default.attributes.baseCarts.map(async ({ item }) => ({
      ...item,
      image: await getOptimizedImage(item.image),
    }))
  ).then((res) => res);

  content.default.attributes.extrasSport = await Promise.all(
    content.default.attributes.extrasSport.map(async ({ item }) => ({
      ...item,
      image: await getOptimizedImage(item.image),
    }))
  ).then((res) => res);

  content.default.attributes.extrasJunior = await Promise.all(
    content.default.attributes.extrasJunior.map(async ({ item }) => ({
      ...item,
      image: await getOptimizedImage(item.image),
    }))
  ).then((res) => res);

  const saleItemsOne = await Promise.all(
    content.default.attributes.engines.map(async ({ item }) => ({
      ...item,
      heading: await markdownToHtml(item.heading),
    }))
  ).then((res) => res);

  const saleItemsTwo = await Promise.all(
    content.default.attributes.tires.map(async ({ item }) => ({
      ...item,
      heading: await markdownToHtml(item.heading),
    }))
  ).then((res) => res);

  return {
    props: {
      header: header.default.attributes,
      contactSale: contactSale.default.attributes,
      footer: footer.default.attributes,
      pdf: pdf.default.attributes,
      data: content.default.attributes,
      seo: seo.default.attributes,
      headerNotTrasnparent: true,
      saleItemsOne,
      saleItemsTwo,
    },
  };
}
