import AnchorSmoothScroll from "@components/AnchorSmoothScroll";
import { getFluidImage } from "@components/image/imageFunctions";
import ListItem from "@components/ListItem";
import ContactForm from "@components/ContactForm";
import Link from "next/link";
import markdownToHtml from "../lib/markdownToHtml";

export default function Index({ data, points, contactForm }) {
  return (
    <AnchorSmoothScroll>
      <section className="w-screen bg-[#F7F7F7]">
        <div className="page-container md:!pt-16 md:!pb-9 !pb-5 wide">
          <article id={data.headingOneId} className="narrow-container">
            <h1 className=" theme-heading">{data.headingOne}</h1>
            <p className="theme-text">{data.textOne}</p>
          </article>
        </div>
      </section>
      <section className="w-screen bg-white ">
        <div className="page-container !py-16 wide">
          <article className="pb-5 space-y-10 text-center md:space-y-16 md:pb-0">
            {points.map((point) => (
              <div className="" key={point.text}>
                <div
                  className="text-6xl font-light uppercase text-leader"
                  dangerouslySetInnerHTML={{ __html: point.heading }}
                />
                <p className="max-w-lg mx-auto mt-3 text-xl font-light whitespace-pre-line md:text-2xl">
                  {point.text}
                </p>
              </div>
            ))}
          </article>
        </div>
        <div className="relative bg-primary-dark">
          <img
            src={data.imageOne}
            alt="karting"
            className="absolute top-0 left-0 hidden w-full h-auto md:block"
          />
          <img
            src={data.imageTwo}
            alt="karting"
            className="absolute top-0 left-0 w-full h-auto md:hidden"
          />
          <div className="relative narrow-container !pt-16 md:!pt-32 page-container !pb-10 md:!pb-16 !space-y-0">
            <h2
              id={data.headingSevenId}
              className="theme-heading !text-white !pb-5 md:!pb-7"
            >
              {data.headingSeven}
            </h2>
            <article className="space-y-5 text-white">
              {data.pointsFive.map(({ point }) => (
                <div key={point.text}>
                  <p className="pb-2 text-xl font-bold md:pb-5 md:text-2xl">
                    {point.heading}
                  </p>
                  <p className="theme-text">{point.text}</p>
                </div>
              ))}
            </article>
          </div>
        </div>
      </section>
      <section className="w-screen bg-white ">
        <div className="page-container md:!py-16 pb-16 wide">
          <article id={data.headingThreeId} className="narrow-container">
            <p className="theme-text">{data.textFour}</p>
            <ul className="pt-5 pl-4 space-y-5 md:pt-8">
              {data.pointsSix.map(({ point }) => (
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
  const content = await import(`../cms/pages/${locale}/clients.md`);
  const contactForm = await import(`../cms/config/${locale}/contactForm.md`);
  const header = await import(`../cms/config/${locale}/header.md`);
  const footer = await import(`../cms/config/${locale}/footer.md`);
  const seo = await import(`../cms/config/${locale}/seo.md`);

  content.default.attributes.models = await Promise.all(
    content.default.attributes.models.map(async ({ model }) => ({
      ...model,
      image: await getFluidImage(model.image),
    }))
  ).then((res) => res);

  const points = await Promise.all(
    content.default.attributes.points.map(async ({ point }) => ({
      ...point,
      heading: await markdownToHtml(point.heading),
    }))
  ).then((res) => res);

  return {
    props: {
      contactForm: contactForm.default.attributes,
      header: header.default.attributes,
      footer: footer.default.attributes,
      data: content.default.attributes,
      seo: seo.default.attributes,
      points,
      headerNotTrasnparent: true,
    },
  };
}
