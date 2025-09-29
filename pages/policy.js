import AnchorSmoothScroll from "@components/AnchorSmoothScroll";

export default function Index({ data }) {
  return (
    <AnchorSmoothScroll>
      <section className="w-screen min-h-screen md:bg-[#F7F7F7]">
        <div className="page-container md:!pt-16 !pb-16">
          <article className="max-w-4xl mx-auto">
            <h1 className="md:!pb-10 theme-heading">{data.headingOne}</h1>
            
            {/* Основной текстовый контент */}
            <div className="prose max-w-none theme-text">
              {data.content && (
                <div 
                  className="whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
              )}
            </div>
          </article>
        </div>
      </section>
    </AnchorSmoothScroll>
  );
}

export async function getStaticProps() {
  const locale = "ru";
  
  // Загружаем контент для страницы политики конфиденциальности
  const content = await import(`../cms/pages/${locale}/policy.md`);
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
