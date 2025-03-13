import Carousel from "@components/Carousel";
import markdownToHtml from "../../lib/markdownToHtml";
import { getFluidImage } from "@components/image/imageFunctions";

export default function Index({
  data,
  postOne,
  gallery
}) {
  return (
    <section className="w-screen">
      {/* <PDFTest sport shoppingCart={shoppingCart} data={data} pdf={pdf} /> */}
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
        </article>
      </div>
    </section>
  );
}

export async function getStaticProps() {
  const locale = "ru";
  const pdf = await import(`../../cms/pages/${locale}/pdf.md`);
  const content = await import(`../../cms/pages/${locale}/cart-electro.md`);
  const header = await import(`../../cms/config/${locale}/header.md`);
  const footer = await import(`../../cms/config/${locale}/footer.md`);
  const seo = await import(`../../cms/config/${locale}/seo.md`);

  const postOne = await markdownToHtml(content.default.attributes.textThree);

  const gallery = await Promise.all(
    content.default.attributes.gallery.map(
      async (img) => await getFluidImage(img, { avif: false, webp: true })
    )
  ).then((res) => res);

  return {
    props: {
      header: header.default.attributes,
      footer: footer.default.attributes,
      data: content.default.attributes,
      seo: seo.default.attributes,
      headerNotTrasnparent: true,
      postOne,
      gallery,
    },
  };
}
