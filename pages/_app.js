import SmartOutline from "@components/utils/SmartOutline";
import { useRouter } from "next/router";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Script from "next/script";
import SEO from "@components/seo";
import "keen-slider/keen-slider.min.css";
import "../styles/style.css";
import { ProgressiveImageSupportProvider } from "@components/image/ProgressiveImageSupportContext";

function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ProgressiveImageSupportProvider>
      <SmartOutline />

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
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5LFVH7J"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
      <Component {...pageProps} />
      <Footer data={pageProps.footer} currentPage={router.route} />
    </ProgressiveImageSupportProvider>
  );
}

export default App;
