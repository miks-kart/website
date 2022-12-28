import AnchorSmoothScroll from "@components/AnchorSmoothScroll";

// custom pages/404.jsx !! Do not remove please or it will break build
export default function Error() {
  return (
    <AnchorSmoothScroll>
      <div className="flex items-center justify-center w-screen h-screen">
        <h1>500 - Something went wrong</h1>
      </div>
    </AnchorSmoothScroll>
  );
}

export async function getStaticProps() {
  const locale = "ru";
  const content = await import(`../cms/pages/${locale}/homepage.md`);
  const header = await import(`../cms/config/${locale}/header.md`);
  const footer = await import(`../cms/config/${locale}/footer.md`);
  const seo = await import(`../cms/config/${locale}/seo.md`);

  return {
    props: {
      header: header.default.attributes,
      footer: footer.default.attributes,
      data: content.default.attributes,
      seo: seo.default.attributes,
    },
  };
}
