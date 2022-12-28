import AnchorSmoothScroll from "@components/AnchorSmoothScroll";
import ContactForm from "@components/ContactForm";
import ListItem from "@components/ListItem";

export default function Index({ data, contactForm }) {
  return (
    <AnchorSmoothScroll>
      <section className="w-screen bg-[#F7F7F7]">
        <div className="page-container md:!pt-16 md:!pb-0">
          <article className="narrow-container">
            <h1 className="theme-heading">{data.headingOne}</h1>
            <p className="theme-text">{data.textOne}</p>
            <ul className="pl-4 space-y-3 pt-14 md:space-y-5">
              {data.points.map(({ point }) => (
                <ListItem key={point.text} point={point} />
              ))}
            </ul>
          </article>
        </div>
      </section>
      <section className="md:bg-[#F7F7F7]">
        <div className="page-container md:!pb-32">
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
  const content = await import(`../cms/pages/${locale}/franchise.md`);
  const contactForm = await import(`../cms/config/${locale}/contactForm.md`);
  const header = await import(`../cms/config/${locale}/header.md`);
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
