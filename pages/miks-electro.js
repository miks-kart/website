import AnchorSmoothScroll from "@components/AnchorSmoothScroll";
import { Fragment } from "react";
import ListItem from "@components/ListItem";
import { getFluidImage } from "@components/image/imageFunctions";
import Slideshow from "@components/Slideshow";
import Carousel from "@components/Carousel";
import Link from "next/link";
import BackgroundImage from "@components/image/BackgroundImage";
import Priorities from "@components/Priorities";
import markdownToHtml from "../lib/markdownToHtml";

export default function Index({ data, gallery, gallery2, hero }) {
  return (
    <AnchorSmoothScroll>
    <section className="aspect-square md:aspect-[2.327] w-screen fixed z-[-1] top-0">
        <Slideshow slides={gallery} />
      </section>
      <section className="aspect-square md:aspect-[2.327] w-screen bg-transparent"></section>
      <section className="w-screen bg-white">
        <div className="page-container md:!pt-16 md:!pb-9 !pb-5 wide">
          <article id={data.headingOneId} className="narrow-container">
            <h1 className=" theme-heading">{data.headingOne}</h1>
            <p className="theme-text">{data.textOne}</p>
          </article>
        </div>
        <div className="!py-0 page-container full-width wide">
          <Carousel slides={gallery2} />
        </div>
      </section>

      <section className="w-screen bg-white">
        <div className="page-container narrow-container !pb-5 md:!py-16 md:!space-y-16">
          <article>
            <h1 className="theme-heading">{data.headingTwo}</h1>
            <p className="theme-text">{data.textTwo}</p>
            <div className="space-y-5 mt-5 md:!mt-7">
              {data.headerAnchors.map(({ anchor }) => (
                <a
                  key={anchor.text}
                  href={anchor.link}
                  onClick={() => {
                    const url = new URL(window.location);
                    url.hash = anchor.link;
                    window.history.pushState({}, "", url);
                    if (window.location.hash === anchor.link) {
                      document
                        .getElementById(anchor.link)
                        .classList.add("!text-white");
                    }
                  }}
                  className="flex text-xl italic font-bold uppercase md:text-2xl group"
                >
                  <span className="duration-150 md:text-primary-gray group-focus-custom:text-primary-dark group-hover-custom:text-primary-dark">
                    {anchor.text}
                  </span>
                  <span className="ml-[0.625rem] duration-150 opacity-0 group-hover-custom:opacity-100 group-focus-custom:opacity-100 mt-[0.3125rem]">
                    <img src="/images/check-up.svg" alt="check up" />
                  </span>
                  <span className="duration-150 -translate-x-full opacity-100 group-hover-custom:opacity-0 group-focus-custom:opacity-0 md:hidden">
                    <img
                      src="/images/check-down.svg"
                      alt="check down"
                      className="inline-block"
                    />
                  </span>
                </a>
              ))}
            </div>
          </article>
          {data.newTexts.map((link) => (
            <Fragment key={link.id}>
              <hr className="border-[1px] text-primary-gray" />
              <article id={link.id}>
                <p className="theme-heading md:!pb-7">{link.heading}</p>
                <div
                  className="pb-5 theme-text"
                  dangerouslySetInnerHTML={{ __html: link.text }}
                />
                {link.points && (
                  <ul className="pl-4 space-y-3 md:pt-2 md:space-y-5">
                    {link.points.map((point) => (
                      <ListItem key={point} point={{ heading: point }} />
                    ))}
                  </ul>
                )}
                {link.textTwo && (
                  <p className="pt-5 theme-text">{link.textTwo}</p>
                )}
              </article>
            </Fragment>
          ))}
        </div>
    </section>

    <section className="w-screen bg-white">
      <div className="page-container !pt-10 md:!pt-16 !pb-4">
          <article className="narrow-container">
            <h3 className="!pb-5 md:!pb-16 theme-heading">
              {data.headingThree}
            </h3>
            <div className="space-y-10 md:space-y-16">
              {data.priorities.map(({ item }, i) => (
                <Priorities
                  length={data.priorities.length}
                  item={item}
                  i={i}
                  key={i}
                />
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="text-center bg-primary-dark">
        <BackgroundImage
          containerClassName="z-20 w-full"
          className="flex items-end justify-start object-cover w-full px-4 pt-20 pb-16 md:pt-40 md:pb-32"
          image={hero}
        >
          <p className="pb-5 md:pb-10 italic font-bold text-white uppercase md:whitespace-pre-line !leading-tight text-3xl md:text-5xl">
            {data.testdrive.heading}
          </p>
          <Link
            target="_blank"
            href={data.testdrive.link}
            className="theme-button"
          >
            <span className="relative">{data.testdrive.text}</span>
          </Link>
        </BackgroundImage>
      </section>
      <section className="w-screen md:bg-[#F7F7F7]">
        <div className="page-container md:!pt-16 !pb-16">
          <article>
            <h2 className="md:!pb-10 theme-heading">{data.headingFour}</h2>
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Ace6dbf66bc7736dca1a6636d498957cb401f1bdd73fc9574939f4aa95ac0d3e5&amp;source=constructor"
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
        </div>
      </section>
    </AnchorSmoothScroll>
  );
}

export async function getStaticProps() {
  const locale = "ru";
  const content = await import(`../cms/pages/${locale}/miks-electro.md`);
  const header = await import(`../cms/config/${locale}/header.md`);
  const footer = await import(`../cms/config/${locale}/footer.md`);
  const seo = await import(`../cms/config/${locale}/seo.md`);

   content.default.attributes.newTexts = await Promise.all(
    content.default.attributes.texts.map(async ({ link }) => ({
      ...link,
      text: await markdownToHtml(link.text),
    }))
  ).then((res) => res);

  const gallery = await Promise.all(
    content.default.attributes.gallery.map(
      async (img) =>
        await getFluidImage(img, {
          webp: true,
        })
    )
  ).then((res) => res);

  const gallery2 = await Promise.all(
    content.default.attributes.gallery2.map(
      async (img) => await getFluidImage(img, { avif: false, webp: true })
    )
  ).then((res) => res);

  const hero = await getFluidImage(content.default.attributes.testdrive.image, {
    webp: true,
  });

  return {
    props: {
      header: header.default.attributes,
      footer: footer.default.attributes,
      data: content.default.attributes,
      seo: seo.default.attributes,
      gallery,
      gallery2,
      hero,
    },
  };
}
