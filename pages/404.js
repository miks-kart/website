import AnchorSmoothScroll from "@components/AnchorSmoothScroll";

export default function Index({ data }) {
  return (
    <AnchorSmoothScroll>
      <section className="w-screen md:bg-[#F7F7F7]">
        <div className="flex items-center justify-center h-screen text-center page-container">
          <article>
            <h1 className="!pb-2 text-primary-red text-[5.625rem] italic leading-none font-bold">
              {data.headingOne}
            </h1>
            <p className="text-4xl italic font-bold uppercase whitespace-pre-line text-primary-dark">
              {data.textOne}
            </p>
          </article>
        </div>
      </section>
    </AnchorSmoothScroll>
  );
}
export async function getStaticProps() {
  const locale = "ru";
  const content = await import(`../cms/pages/${locale}/404.md`);
  const header = await import(`../cms/config/${locale}/header.md`);
  const footer = await import(`../cms/config/${locale}/footer.md`);
  const seo = await import(`../cms/config/${locale}/seo.md`);

  return {
    props: {
      header: header.default.attributes,
      footer: footer.default.attributes,
      data: content.default.attributes,
      seo: seo.default.attributes,
      headerNotTrasnparent: true,
    },
  };
}
