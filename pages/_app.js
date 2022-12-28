import SmartOutline from "@components/utils/SmartOutline";
import { useRouter } from "next/router";
import Header from "@components/Header";
import Footer from "@components/Footer";
import SEO from "@components/seo";
import "../styles/style.css";

function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
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
      <Component {...pageProps} />
      <Footer data={pageProps.footer} currentPage={router.route} />
    </>
  );
}

export default App;
