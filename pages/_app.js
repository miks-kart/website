import SmartOutline from "@components/utils/SmartOutline";
import { useRouter } from "next/router";
import Header from "@components/Header";
import Footer from "@components/Footer";
import SEO from "@components/seo";
import Script from "next/script";
import "keen-slider/keen-slider.min.css";
import "../styles/style.css";
import { ProgressiveImageSupportProvider } from "@components/image/ProgressiveImageSupportContext";

function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ProgressiveImageSupportProvider>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GTM-5LFVH7J"
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'GTM-5LFVH7J');
        `,
        }}
      />
      <noscript>
        <iframe
          id="gtm-frame"
          title="GTM"
          src="https://www.googletagmanager.com/ns.html?id=GTM-5LFVH7J"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      <SmartOutline />
      <Metrika />
      <SEO
        description={pageProps.data.description}
        title={pageProps.data.title}
        seo={pageProps.seo}
      />
      <Header
        key={router.route}
        headerAnchors={pageProps.data.headerAnchors}
        bg={pageProps.headerNotTrasnparent}
        data={pageProps.header}
        currentPage={router.route}
      />
      <Component {...pageProps} />
      <Footer data={pageProps.footer} currentPage={router.route} />
    </ProgressiveImageSupportProvider>
  );
}

function Metrika() {
  return (
    <>
      <noscript>
        <div>
          <img
            src="https://mc.yandex.ru/watch/93488336"
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>

      <Script
        id="metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(93488336, "init", {
     clickmap:true,
     trackLinks:true,
     accurateTrackBounce:true,
     webvisor:true
    });`,
        }}
      />
    </>
  );
}

export default App;
