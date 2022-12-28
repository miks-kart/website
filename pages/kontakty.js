import AnchorSmoothScroll from "@components/AnchorSmoothScroll";
import ContactForm from "@components/ContactForm";

export default function Index({ data, contactForm }) {
  return (
    <AnchorSmoothScroll>
      <section className="w-screen min-h-screen md:bg-[#F7F7F7]">
        <div className="page-container md:!pt-16 !pb-16">
          <article>
            <h1 className="md:!pb-10 theme-heading">{data.headingOne}</h1>
            <iframe
              src="https://yandex.com/map-widget/v1/-/CCUZRRDy9D"
              frameBorder="1"
              allowFullScreen={true}
              className="grayscale w-full aspect-square md:aspect-[3.32]"
              title="map"
            ></iframe>
            <div className="justify-between pt-8 space-y-5 md:space-y-0 md:flex">
              {data.points.map(({ point }, i) => (
                <div className="" key={point.icon}>
                  <img
                    src={point.icon}
                    alt={point.text}
                    className="w-5 h-5 mb-[0.625rem]"
                  />
                  <p className="theme-text">{point.heading}</p>
                  {i !== 2 ? (
                    <a
                      href={
                        point.text.includes("@")
                          ? `mailto:${point.text}`
                          : `tel:${point.text}`
                      }
                      className="text-xl font-bold md:text-2xl"
                    >
                      {point.text}
                    </a>
                  ) : (
                    <p className="text-xl font-bold md:text-2xl">
                      {point.text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </article>
          <ContactForm
            className="bg-white"
            contactForm={contactForm}
            data={data}
          />
        </div>
      </section>
    </AnchorSmoothScroll>
  );
}
export async function getStaticProps() {
  const locale = "ru";
  const content = await import(`../cms/pages/${locale}/contacts.md`);
  const header = await import(`../cms/config/${locale}/header.md`);
  const contactForm = await import(`../cms/config/${locale}/contactForm.md`);
  const footer = await import(`../cms/config/${locale}/footer.md`);
  const seo = await import(`../cms/config/${locale}/seo.md`);

  return {
    props: {
      contactForm: contactForm.default.attributes,
      header: header.default.attributes,
      footer: footer.default.attributes,
      data: content.default.attributes,
      seo: seo.default.attributes,
      headerNotTrasnparent: true,
    },
  };
}
