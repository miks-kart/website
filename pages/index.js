import AnchorSmoothScroll from "@components/AnchorSmoothScroll";
import ContactForm from "@components/ContactForm";
import BackgroundImage from "@components/image/BackgroundImage";
import Image from "@components/image/ImageSimple";
import { getFluidImage } from "@components/image/imageFunctions";
import Priorities from "@components/Priorities";
import VideoHero from "@components/VideoHero";
import Link from "next/link";
import markdownToHtml from "../lib/markdownToHtml";

export default function Index({ data, postOne, postTwo, contactForm, hero }) {
  return (
    <AnchorSmoothScroll>
      <VideoHero data={data} />
      <section className="aspect-[0.83333333] md:aspect-[2.327] w-screen bg-transparent"></section>
      <section className="bg-white">
        <div className="page-container !pt-10 md:!pt-16 !pb-16">
          <article className="pb-5 md:pb-0">
            <h1 className="!pb-0 theme-heading !whitespace-initial md:!whitespace-pre-line">
              {data.headingOne}
            </h1>
            <div className="flex items-start justify-between pt-5 pb-4 md:items-center md:pb-16">
              <div className="md:flex">
                <div
                  className="text-2xl font-light uppercase md:text-4xl text-leader"
                  dangerouslySetInnerHTML={{ __html: postOne }}
                />
                <div
                  className="text-2xl font-light uppercase md:hidden md:text-4xl text-leader"
                  dangerouslySetInnerHTML={{ __html: postTwo }}
                />
              </div>
              <div
                className="hidden text-2xl font-light uppercase md:block md:text-4xl text-leader"
                dangerouslySetInnerHTML={{ __html: postTwo }}
              />

              <img
                src={data.skolkovoLogo}
                alt="skolkovo logo"
                className="w-12 md:w-20"
              />
            </div>
            <p className="narrow-container md:pb-10 pb-7 theme-text !ml-0">
              {data.textOne}
            </p>
            <Link href={data.buttonOne.link} className="theme-button">
              <span className="relative">{data.buttonOne.text}</span>
            </Link>
          </article>
          <article>
            <Image
              sizes="(max-width: 1200px) 100vw, 1200px"
              src={data.imageOne}
              className="w-full aspect-[1.67] md:aspect-[2.5] object-cover"
              loading="lazy"
              alt="cart"
            />
            <div className="narrow-container">
              <h2 className="pt-5 md:pt-16 theme-heading">{data.headingTwo}</h2>
              <div
                className="pb-5 font-light !leading-loose md:pb-10 markdown-text narrow-text-mobile"
                dangerouslySetInnerHTML={{ __html: data.textTwo }}
              />
              <Link href={data.buttonTwo.link} className="theme-button">
                <span className="relative">{data.buttonTwo.text}</span>
              </Link>
            </div>
          </article>
        </div>
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
                <div className="pb-5 flex-around">
      <Link target="_blank" href="https://miks-electrokarting.ru/">
        <Image 
          src="/images/miks-e-carting.svg" 
          width={135} 
          height={41}
          alt="MIKS Electrokarting"
        />
      </Link>
      <Link target="_blank" href="https://miks-karting.ru/">
        <Image 
          src="/images/miks-carting.svg" 
          width={135} 
          height={41}
          alt="MIKS Karting"
        />
      </Link>
    </div>
          </BackgroundImage>
        </section>
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
        <section className="text-center bg-primary-dark">
          <div className="relative w-full">
            <div className="absolute top-0 w-full bg-white h-1/2" />
            <img
              style={{
                filter: "drop-shadow(0px 50px 100px rgba(0, 0, 0, 0.25))",
                transform: "translateZ(0)",
              }}
              src={data.imageTwo}
              alt="socket"
              className="md:w-full !w-1/2 page-container relative !max-w-[21.75rem] !py-0"
            />
          </div>
          <div className="!max-w-md !space-y-0 page-container !pt-5 md:!pt-10 !pb-16 mx-auto">
            <h2 className=" theme-heading !text-white">{data.headingFour}</h2>
            <p className="pb-5 md:pb-10 theme-text !text-white ">
              {data.textThree}
            </p>
            <Link href={data.buttonThree.link} className="theme-button">
              <span className="relative">{data.buttonThree.text}</span>
            </Link>
          </div>
        </section>

        <div className="md:bg-[#f7f7f7]">
          <section className="page-container !pb-16 md:!pb-0">
            <ContactForm
              className="bg-white"
              contactForm={contactForm}
              data={data}
            />
          </section>
        </div>
      </section>
      <section className="bg-[#f7f7f7]">
        <img
          src={data.logo}
          alt="logo"
          className="py-16 mx-auto md:pt-32 md:pb-40 w-36"
        />
      </section>
    </AnchorSmoothScroll>
  );
}

export async function getStaticProps() {
  const locale = "ru";
  const content = await import(`../cms/pages/${locale}/homepage.md`);
  const contactForm = await import(`../cms/config/${locale}/contactForm.md`);
  const header = await import(`../cms/config/${locale}/header.md`);
  const footer = await import(`../cms/config/${locale}/footer.md`);
  const seo = await import(`../cms/config/${locale}/seo.md`);

  content.default.attributes.imageOne = await getFluidImage(
    content.default.attributes.imageOne
  );

  content.default.attributes.textTwo = await markdownToHtml(
    content.default.attributes.textTwo
  );
  const postOne = await markdownToHtml(content.default.attributes.statementOne);
  const postTwo = await markdownToHtml(content.default.attributes.statementTwo);
  const hero = await getFluidImage(content.default.attributes.testdrive.image, {
    webp: true,
  });

  return {
    props: {
      contactForm: contactForm.default.attributes,
      header: header.default.attributes,
      footer: footer.default.attributes,
      data: content.default.attributes,
      seo: seo.default.attributes,
      hero,
      postOne,
      postTwo,
    },
  };
}
