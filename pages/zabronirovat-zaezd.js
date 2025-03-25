import AnchorSmoothScroll from "@components/AnchorSmoothScroll";
import Image from "@components/image/ImageSimple";
import { getFluidImage } from "@components/image/imageFunctions";
import ListItem from "@components/ListItem";
import Slideshow from "@components/Slideshow";
import Link from "next/link";
import markdownToHtml from "../lib/markdownToHtml";

export default function Index({ data, gallery, points }) {
  return (
    <AnchorSmoothScroll>
      <section className="aspect-square md:aspect-[2.327] w-screen fixed z-[-1] top-0">
        <Slideshow slides={gallery} />
      </section>
      <section className="aspect-square md:aspect-[2.327] w-screen bg-transparent"></section>
      <section className="w-screen bg-white ">
        <div className="page-container md:!pt-16 md:!pb-9 !pb-5 wide">
          <div className="grid gap-5 md:gap-3 md:grid-cols-2">
            <div className="flex direction-columnt justify-between">
              <p>Забронируйте заезд по номеру телефона</p>
              <a className="theme-button" href="tel:+74956403302">+7 (495) 640 33 02</a>
              <div>
                <p>Часы работы: ежедневно (10:00-18:00)</p>
                <p>За исключением дней определенных администрацией для подготовки трассы или иных работ.</p>
              </div>
            </div>
            <div className="flex direction-columnt justify-center">
              <p>Приезжайте на трассу за 20 минут до начала заезда</p>
              <p>Приезжайте по адресу: <span className="text-red">г. Рязань, пос. Секиотово <br />Комплекс расположен в 15 минутах от центра Рязани по Михайловскому шоссе.Поворот с трассы М5 на г. Тула.</p>
              <a className="theme-button" href="tel:+74956403302">Проложить маршрут на Яндекс Картах</a>
              <a className="theme-button" href="tel:+74956403302">Проложить маршрут в Яндекс Навигаторе</a>
            </div>
            <div className="flex direction-columnt justify-between">
              <p>Получите экипировку</p>
              <p>Пройдите инструктаж</p>
              <p className="text-red">Прыгайте в карт и гоняйте!</p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-screen md:bg-white bg-primary-dark">
        <div className="page-container wide !space-y-0 !py-0">
          <div className="flex flex-col-reverse items-start justify-between py-5 md:py-16 md:flex-row md:space-x-32 md:px-24 bg-primary-dark">
            <p className="max-w-2xl text-xl italic font-bold text-white uppercase whitespace-pre-line md:text-2xl">
              {data.textTwo}
            </p>
            <img
              src={data.skolkovoLogo}
              alt="skolkovo"
              className="w-12 h-auto pb-5 md:w-28 md:pb-0"
            />
          </div>
        </div>
      </section>
      <section className="w-screen bg-white ">
        <div className="page-container !py-16 md:!pt-32  wide">
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
          <article id={data.headingTwoId}>
            <h2 className="md:!pb-16 theme-heading">{data.headingTwo}</h2>
            <div className="grid gap-5 md:gap-3 md:grid-cols-2">
              {data.models.map((model) => (
                <div className="" key={model.name}>
                  <Image
                    style={{ aspectRatio: model.image.aspectRatio }}
                    sizes="(max-width: 1200px) 100vw, 800px"
                    src={model.image}
                    alt={model.name}
                    className="w-full h-auto"
                  />
                  <Link
                    href={model.link}
                    className="flex pt-5 text-2xl italic font-bold uppercase md:pt-10 text-primary-dark"
                  >
                    {model.name}
                    <span className="ml-[0.625rem] mt-[0.3125rem]">
                      <img src="/images/check-up.svg" alt="check up" />
                    </span>
                  </Link>
                  <p className="theme-text pb-3 pt-3 md:pt-5 !font-bold">
                    {model.heading}
                  </p>
                  <p className="theme-text">{model.text}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
      <section className="w-screen md:bg-white bg-primary-dark">
        <div className="page-container wide !space-y-0 !py-0">
          <article className="py-5 text-center text-white md:py-10 md:px-16 bg-primary-dark default-container">
            <p className="text-sm font-bold !leading-normal whitespace-pre-line">
              {data.teaser.one}
            </p>
            <p className="px-2 pt-5 text-2xl italic font-bold uppercase whitespace-pre-line">
              {data.teaser.two}
            </p>
            <p className="theme-text !leading-normal whitespace-pre-line">
              {data.teaser.three}
            </p>
            <p className="pt-5 text-2xl italic font-bold uppercase whitespace-pre-line">
              {data.teaser.four}
            </p>
            <p className="theme-text !leading-normal whitespace-pre-line">
              {data.teaser.five}
            </p>
            <p className="pt-5 text-2xl italic font-bold uppercase whitespace-pre-line">
              {data.teaser.six}
            </p>
            <p className="theme-text !leading-normal whitespace-pre-line">
              {data.teaser.seven}
            </p>
          </article>
        </div>
      </section>
      <section className="w-screen bg-white ">
        <div className="page-container md:!py-32 pb-16 wide">
          <article id={data.headingThreeId} className="narrow-container">
            <h3 className="theme-heading">{data.headingThree}</h3>
            <p className="theme-text">{data.textFour}</p>
            <ul className="pt-5 pl-4 space-y-5 md:pt-8">
              {data.pointsTwo.map(({ point }) => (
                <ListItem key={point.text} point={point} />
              ))}
            </ul>
          </article>
        </div>
      </section>
      <section className="bg-[#F7F7F7] md:py-32 py-10">
        <div className="text-center page-container !py-0">
          <article>
            <p className="pb-5 font-bold text-primary-dark">
              {data.headingFour}
            </p>
            <h4 className="theme-heading text-3xl md:!text-5xl pb-5 md:!pb-10">
              {data.headingFive}
            </h4>
            <Link href={data.buttonOne.link} className="theme-button">
              <span className="relative">{data.buttonOne.text}</span>
            </Link>
          </article>
        </div>
      </section>
    </AnchorSmoothScroll>
  );
}

export async function getStaticProps() {
  const locale = "ru";
  const content = await import(`../cms/pages/${locale}/about.md`);
  const header = await import(`../cms/config/${locale}/header.md`);
  const footer = await import(`../cms/config/${locale}/footer.md`);
  const seo = await import(`../cms/config/${locale}/seo.md`);

  content.default.attributes.models = await Promise.all(
    content.default.attributes.models.map(async ({ model }) => ({
      ...model,
      image: await getFluidImage(model.image),
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

  const points = await Promise.all(
    content.default.attributes.points.map(async ({ point }) => ({
      ...point,
      heading: await markdownToHtml(point.heading),
    }))
  ).then((res) => res);

  return {
    props: {
      header: header.default.attributes,
      footer: footer.default.attributes,
      data: content.default.attributes,
      seo: seo.default.attributes,
      points,
      gallery,
    },
  };
}
