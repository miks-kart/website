import AnchorSmoothScroll from "@components/AnchorSmoothScroll";
import { getFluidImage } from "@components/image/imageFunctions";
//import Slideshow from "@components/Slideshow";
import BackgroundImage from "@components/image/BackgroundImage";
//import '@styles/landing.css';

export default function Index({ hero, heroTwo }) {
  return (
    <AnchorSmoothScroll>
    <section className="aspect-square md:aspect-[1.8] hero-bron w-screen fixed top-0 bg-primary-dark">
          <BackgroundImage
            containerClassName="z-20 w-full page-container wide flex direction-column justify-space-between items-center py-0"
            className="flex h-full object-cover w-full px-4 pt-5 md:pt-20 pb-10 md:pb-16"
            image={hero}>
              <div className="flex w-full items-start md:direction-row justify-center md:justify-space-between">
                <img src="/images/logo-atron.png" />
                <img src="/images/logo-miks-kart.png" />
                <p className="italic font-bold text-white uppercase md:whitespace-pre-line !leading-tight text-3xl md:text-5xl">
                  ИСПЫТАЙТЕ КАРТЫ MIKS KART В ATRON INTERNATIONAL CIRCUIT! 
                </p>
              </div>
              <a className="theme-button mx-auto" href="tel:+74912434376">ЗАБРОНИРОВАТЬ ЗАЕЗД</a>
          </BackgroundImage>
        </section>
      <section className="aspect-square md:aspect-[1.8] w-screen bg-transparent"></section>
      <section className="relative w-screen bg-white">
        <div className="page-container md:!pt-16 md:!pb-9 !pb-5 wide">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="flex grey-card direction-column bg-grey justify-space-between">
              <p className="text-big mb-14px md:mb-0">Забронируйте заезд по номеру телефона</p>
              <a className="theme-button button-rounded mb-14px md:mb-0" href="tel:+74912434376">+7 (491) 243-43-76</a>
              <div>
                <p className="text-small mb-14px">Часы работы: ежедневно (10:00-18:00)</p>
                <p className="text-small">За исключением дней определенных администрацией для подготовки трассы или иных работ.</p>
              </div>
            </div>
            <div className="flex grey-card direction-column bg-grey justify-space-between">
              <p className="text-big mb-14px md:mb-0">Приезжайте на трассу <br />за 20 минут до начала заезда</p>
              <p className="text-small mb-14px">Приезжайте по адресу: <span className="text-red d-block">г. Рязань, пос. Секиотово <br />Комплекс расположен в 15 минутах от центра Рязани по Михайловскому шоссе. <br />Поворот с трассы М5 на г. Тула.</span></p>
              <a className="theme-button button-rounded mb-14px" href="https://yandex.ru/maps/-/CHfgrOLX">Проложить маршрут на Яндекс Картах</a>
              <a className="theme-button button-rounded" href="https://yandex.ru/maps/-/CHfgrOLX">Проложить маршрут в Яндекс Навигаторе</a>
            </div>
            <div className="flex grey-card direction-column bg-grey justify-space-between md:pb-110">
              <p className="text-big">Получите экипировку</p>
              <p className="text-big">Пройдите инструктаж</p>
              <p className="text-big text-red">Прыгайте в карт и гоняйте!</p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative w-screen bg-white">
        <div className="page-container md:!pt-20 md:!pb-20 !pb-20 wide">
          <div className="flex direction-column justify-center md:direction-row">
            <div className="cart-card">
              <span class="label">10 мин</span>
              <img src="/images/cart-bron.png" alt="Miks Kart SPORT 15 л.с." />
              <p>Miks Kart <br />SPORT 15 л.с.</p>
              <div className="flex justify-space-between">
                <p>ПН-ВС</p>
                <p><b>2000 ₽</b></p>
              </div>
              <p className="text-red">Параметры:</p>
              <p className="flex"><span>Рост</span> <span>от 145 см</span></p>
            </div>
            <div className="cart-card">
              <span class="label">10 мин</span>
              <img src="/images/cart-bron.png" alt="Miks Kart Юниор 4 л.с." />
              <p>Miks Kart Юниор 4 л.с.</p>
              <div className="flex justify-space-between">
                <p>ПН-ВС</p>
                <p><b>2000 ₽</b></p>
              </div>
              <p className="text-red">Параметры:</p>
              <p className="flex"><span>Рост</span> <span>от 125 см</span></p>
              <p className="flex"><span>Возраст</span> <span>от 8 лет</span></p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative w-screen bg-white">
        <div className="page-container wide !space-y-0 !py-0 text-center">
          <h2 className="big-header">
            САМАЯ ПРОТЯЖЕННАЯ ОТКРЫТАЯ ТРАССА ДЛЯ КАРТИНГА В РОССИИ!
          </h2>
          <img className="d-block mx-auto" src="/images/track.jpg" alt="Трасса" />
          <p className="text-huge">ПРОТЯЖЕННОСТЬ: <span className="text-red">1400 МЕТРОВ</span></p>
        </div>
      </section>
      <section className="relative w-screen bg-white">
        <div className="page-container md:!pt-16 md:!pb-9 !pb-5 wide">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex dark-grey-card bg-dark-grey align-items-center">
              <img src="/images/icon-bron-1.png" alt="icon" />
              <p>В стоимость заезда включено предоставление прокатного шлема и одноразового подшлемника</p>
            </div>
            <div className="flex dark-grey-card bg-dark-grey align-items-center">
              <img src="/images/icon-bron-2.png" alt="icon" />
              <p>В летний период запрещены заезды в открытой обуви (сандали, босоножки и др.), в обуви на каблуке и с длинным (не убранными) волосами </p>
            </div>
            <div className="flex dark-grey-card bg-dark-grey align-items-center">
              <img src="/images/icon-bron-3.png" alt="icon" />
              <p>Минимальный рост для детей в одноместном карте составляет 125 см.</p>
            </div>
            <div className="flex dark-grey-card bg-dark-grey align-items-center">
              <img src="/images/icon-bron-4.png" alt="icon" />
              <p>Запись на заезды осуществляется только по номеру телефону <a href="tel:+74912434376">+7 (491) 243-43-76</a></p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative aspect-square heroTwo-bron md:aspect-[1.8] text-center bg-primary-dark">
          <BackgroundImage
            containerClassName="z-20 w-full h-full flex direction-column justify-space-between px-4 pt-12 md:pt-20 pb-10 md:pb-16"
            className="relative flex h-full object-cover w-full"
            image={heroTwo}
          >
            <p className="italic font-bold text-white uppercase md:whitespace-pre-line !leading-tight text-3xl md:text-5xl">
              ИСПЫТАЙТЕ MIKS KART!
            </p>
              <span className="relative text-white md:text-2xl">Универсальный гоночный карт, который отлично подходит простым любителям и опытным пилотам <br />для использования в помещении и на открытом треке, для проката и проведения соревнований</span>
          </BackgroundImage>
        </section>
      <section className="relative w-screen bg-white">
        <div className="page-container md:!pt-20 md:!pb-20 !pb-20 wide text-center">
          <div>
            <p className="text-extra-huge italic">ЗАБРОНИРУЙТЕ ЗАЕЗД ПО ТЕЛЕФОНУ:</p>
            <a className="theme-button button-rounded text-extra-huge" href="tel:+74912434376">+7 (491) 243-43-76</a>
          </div>
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

  /*const gallery = await Promise.all(
    content.default.attributes.gallery.map(
      async (img) =>
        await getFluidImage(img, {
          webp: true,
        })
    )
  ).then((res) => res);*/

  const hero = await getFluidImage(content.default.attributes.imageOne, {
    webp: true,
  });
  const heroTwo = await getFluidImage(content.default.attributes.imageTwo, {
    webp: true,
  });

  return {
    props: {
      header: header.default.attributes,
      footer: footer.default.attributes,
      data: content.default.attributes,
      seo: seo.default.attributes,
      //gallery,
      hero,
      heroTwo
    },
  };
}
