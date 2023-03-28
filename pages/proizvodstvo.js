import { Fragment } from "react";
import ListItem from "@components/ListItem";
import markdownToHtml from "../lib/markdownToHtml";
import PointWithImage from "@components/PointWithImage";
import AnchorSmoothScroll from "@components/AnchorSmoothScroll";
import {
  getFluidImage,
  getOptimizedImage,
} from "@components/image/imageFunctions";
import Slideshow from "@components/Slideshow";

export default function Index({ data, gallery }) {
  return (
    <AnchorSmoothScroll>
      <section className="aspect-square md:aspect-[2.327] w-screen fixed z-[-1] top-0">
        <Slideshow slides={gallery} />
      </section>
      <section className="aspect-square md:aspect-[2.327] w-screen bg-transparent"></section>
      <section className="w-screen bg-white">
        <div className="page-container narrow-container !pb-5 md:!py-16 md:!space-y-16">
          <article>
            <h1 className="theme-heading">{data.headingOne}</h1>
            <p className="theme-text">{data.textOne}</p>
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
        <div className="page-container md:!pb-32 !space-y-5 md:!space-y-16">
          <article className="narrow-container">
            <h3 id={data.headingEightId} className="theme-heading md:!pb-7">
              {data.headingEight}
            </h3>
            <p className="theme-text">{data.textEight}</p>
          </article>
          <div>
            <h4 className="theme-subheading narrow-container">
              {data.headingNine}
            </h4>
            <div className="space-y-5">
              {data.pointsSix.map((point) => (
                <PointWithImage key={point.text} point={point} />
              ))}
            </div>
          </div>
          <div>
            <h5 className="theme-subheading narrow-container">
              {data.headingTen}
            </h5>
            <div className="space-y-5">
              {data.pointsSeven.map((point) => (
                <PointWithImage key={point.text} point={point} />
              ))}
            </div>
          </div>
          <div>
            <h6 className="theme-subheading narrow-container">
              {data.headingEleven}
            </h6>
            <div className="space-y-5">
              {data.pointsEight.map((point) => (
                <PointWithImage key={point.text} point={point} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </AnchorSmoothScroll>
  );
}

export async function getStaticProps() {
  const locale = "ru";
  const content = await import(`../cms/pages/${locale}/production.md`);
  const header = await import(`../cms/config/${locale}/header.md`);
  const footer = await import(`../cms/config/${locale}/footer.md`);
  const seo = await import(`../cms/config/${locale}/seo.md`);

  content.default.attributes.pointsSix = await Promise.all(
    content.default.attributes.pointsSix.map(async ({ point }) => ({
      ...point,
      image: await getOptimizedImage(point.image),
    }))
  ).then((res) => res);

  content.default.attributes.pointsSeven = await Promise.all(
    content.default.attributes.pointsSeven.map(async ({ point }) => ({
      ...point,
      image: await getOptimizedImage(point.image),
    }))
  ).then((res) => res);

  content.default.attributes.pointsEight = await Promise.all(
    content.default.attributes.pointsEight.map(async ({ point }) => ({
      ...point,
      image: await getOptimizedImage(point.image),
    }))
  ).then((res) => res);

  content.default.attributes.newTexts = await Promise.all(
    content.default.attributes.texts.map(async ({ link }) => ({
      ...link,
      text: await markdownToHtml(link.text),
    }))
  ).then((res) => res);

  const gallery = await Promise.all(
    content.default.attributes.gallery.map(
      async (img) => await getFluidImage(img, { avif: true, webp: true })
    )
  ).then((res) => res);

  return {
    props: {
      header: header.default.attributes,
      footer: footer.default.attributes,
      data: content.default.attributes,
      seo: seo.default.attributes,
      gallery,
    },
  };
}
