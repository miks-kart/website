import AnchorSmoothScroll from "@components/AnchorSmoothScroll";

export default function Index({ data }) {
  return (
    <AnchorSmoothScroll>
      <section className="w-screen md:bg-[#F7F7F7]">
        <div className="flex items-center justify-center h-screen text-center page-container">
          <article>
            <img src={data.image} className="w-20 h-20 mx-auto" alt="" />
            <h1 className="theme-heading md:!text-4xl pt-8">{data.heading}</h1>
          </article>
        </div>
      </section>
    </AnchorSmoothScroll>
  );
}
export async function getStaticProps() {
  const locale = "ru";
  const content = await import(`../../cms/pages/${locale}/sport-carts.md`);
  const header = await import(`../../cms/config/${locale}/header.md`);
  const footer = await import(`../../cms/config/${locale}/footer.md`);
  const seo = await import(`../../cms/config/${locale}/seo.md`);

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
