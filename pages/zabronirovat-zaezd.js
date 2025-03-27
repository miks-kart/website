import AnchorSmoothScroll from "@components/AnchorSmoothScroll";
import { getFluidImage } from "@components/image/imageFunctions";
import Slideshow from "@components/Slideshow";

export default function Index({ gallery, hero }) {
  return (
    <AnchorSmoothScroll>
      <section className="aspect-square md:aspect-[2.327] w-screen fixed z-[-1] top-0">
        <Slideshow slides={gallery} />
      </section>
      <section className="aspect-square md:aspect-[2.327] w-screen bg-transparent"></section>
      <section className="w-screen bg-white">
        <div className="page-container md:!pt-16 md:!pb-9 !pb-5 wide">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="flex grey-card direction-column bg-grey justify-space-between">
              <p className="text-big">Забронируйте заезд по номеру телефона</p>
              <a className="theme-button" href="tel:+74956403302">+7 (495) 640 33 02</a>
              <div>
                <p className="text-small mb-14">Часы работы: ежедневно (10:00-18:00)</p>
                <p className="text-small">За исключением дней определенных администрацией для подготовки трассы или иных работ.</p>
              </div>
            </div>
            <div className="flex grey-card direction-column bg-grey justify-space-between">
              <p className="text-big">Приезжайте на трассу за 20 минут до начала заезда</p>
              <p className="text-small">Приезжайте по адресу: <span className="text-red">г. Рязань, пос. Секиотово <br />Комплекс расположен в 15 минутах от центра Рязани по Михайловскому шоссе. <br />Поворот с трассы М5 на г. Тула.</span></p>
              <a className="theme-button button-rounded mb-14" href="tel:+74956403302">Проложить маршрут на Яндекс Картах</a>
              <a className="theme-button button-rounded" href="tel:+74956403302">Проложить маршрут в Яндекс Навигаторе</a>
            </div>
            <div className="flex grey-card direction-column bg-grey justify-space-between mb-110">
              <p className="text-big">Получите экипировку</p>
              <p className="text-big">Пройдите инструктаж</p>
              <p className="text-big text-red">Прыгайте в карт и гоняйте!</p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-screen bg-white">
        <div className="page-container md:!pt-16 md:!pb-9 !pb-5 wide">
          <div className="flex direction-column justify-center md:direction-row">
            <div className="cart-card">
              <img src="/images/cart-bron.png" alt="Miks Kart SPORT 9л.с." />
              <p>Miks Kart SPORT 9л.с.</p>
              <p>Производитель</p>
              <div className="flex justify-space-between">
                <p>ПН-ВС</p>
                <p><b>2000₽</b></p>
              </div>
            </div>
            <div className="cart-card">
              <img src="/images/cart-bron.png" alt="Miks Kart 5,5 л.с. (детский)" />
              <p>Miks Kart 5,5 л.с. (детский)</p>
              <p>Производитель</p>
              <div className="flex justify-space-between">
                <p>ПН-ВС</p>
                <p><b>2000₽</b></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-screen md:bg-white">
        <div className="page-container wide !space-y-0 !py-0 text-center">
          <h2 className="big-header">
            САМАЯ ПРОТЯЖЕННАЯ
            <span>ОТКРЫТАЯ <span>ТРАССА</span> ДЛЯ КАРТИНГА <span>В РОССИИ!</span></span>
          </h2>
          <img src="/images/track.jpg" alt="Трасса" />
          <p className="text-huge">ПРОТЯЖЕННОСТЬ: <span className="text-red">1400 МЕТРОВ</span></p>
        </div>
      </section>
      <section className="w-screen bg-white">
        <div className="page-container md:!pt-16 md:!pb-9 !pb-5 wide">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex dark-grey-card direction-column md:direction-row bg-dark-grey align-items-center">
              <img src="/images/icon-bron-1.png" alt="icon" />
              <p>В стоимость заезда включено предоставление прокатного шлема и одноразового подшлемника</p>
            </div>
            <div className="flex dark-grey-card direction-column md:direction-row bg-dark-grey align-items-center">
              <img src="/images/icon-bron-2.png" alt="icon" />
              <p>В летний период запрещены заезды в открытой обуви (сандали, босоножки и др.), в обуви на каблуке и с длинным (не убранными) волосами </p>
            </div>
            <div className="flex dark-grey-card direction-column md:direction-row bg-dark-grey align-items-center">
              <img src="/images/icon-bron-3.png" alt="icon" />
              <p>Минимальный рост для детей в одноместном карте составляет 150см. Минимальный возраст для заезда на 2х-местном карте пассажиром — 6 лет</p>
            </div>
            <div className="flex dark-grey-card direction-column md:direction-row bg-dark-grey align-items-center">
              <img src="/images/icon-bron-4.png" alt="icon" />
              <p>Запись на заезды осуществляется только по номеру телефону ресепшен комплекса </p>
            </div>
          </div>
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
      <section className="w-screen bg-white">
        <div className="page-container md:!pt-16 md:!pb-9 !pb-5 wide text-center">
          <p>ЗАБРОНИРУЙТЕ ЗАЕЗД ПО ТЕЛЕФОНУ:</p>
          <a className="theme-button button-rounded" href="tel:+74956403302">+7 (495) 640 33 02</a>
        </div>
      </section>
    </AnchorSmoothScroll>
  );
}

export async function getStaticProps() {
  const locale = "ru";
  const content = await import(`../cms/pages/${locale}/zabronirovat-zaezd.md`);
  const header = await import(`../cms/config/${locale}/header.md`);
  const footer = await import(`../cms/config/${locale}/footer.md`);
  const seo = await import(`../cms/config/${locale}/seo.md`);

  const gallery = await Promise.all(
    content.default.attributes.gallery.map(
      async (img) =>
        await getFluidImage(img, {
          webp: true,
        })
    )
  ).then((res) => res);

  const hero = await getFluidImage(content.default.attributes.imageOne, {
    webp: true,
  });

  return {
    props: {
      header: header.default.attributes,
      footer: footer.default.attributes,
      data: content.default.attributes,
      seo: seo.default.attributes,
      gallery,
      hero
    },
  };
}
