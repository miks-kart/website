import AnchorSmoothScroll from "@components/AnchorSmoothScroll";
import { getAllPosts } from "@components/api";
import { useRouter } from "next/router";
import { useState } from "react";
import NewsModal from "../components/NewsModal";
import NewsPostBig from "../components/NewsPostBig";
import NewsPostSmall from "../components/NewsPostSmall";

export default function Index({ data, news, footer, header }) {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState(0);
  const router = useRouter();
  function onClick(i) {
    setPost(i);
    setIsOpen(true);
  }

  return (
    <AnchorSmoothScroll>
      <section className="w-screen min-h-screen bg-[#F7F7F7]">
        <div className="page-container md:!pt-16 !pb-16">
          <article>
            <h1 className="md:!pb-10 theme-heading">{data.headingOne}</h1>
            <div className="grid gap-5 md:grid-cols-2">
              {news.map((post, i) =>
                post.isWide ? (
                  <NewsPostBig
                    texts={data.texts}
                    post={post}
                    key={post.title}
                    onClick={onClick}
                    i={i}
                  />
                ) : (
                  <NewsPostSmall
                    texts={data.texts}
                    post={post}
                    key={post.title}
                    onClick={onClick}
                    i={i}
                  />
                )
              )}
            </div>
            <NewsModal
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              header={header}
              footer={footer}
              router={router}
              texts={data.texts}
              post={news[post]}
            />
          </article>
        </div>
      </section>
    </AnchorSmoothScroll>
  );
}
export async function getStaticProps() {
  const locale = "ru";
  const content = await import(`../cms/pages/${locale}/news.md`);
  const header = await import(`../cms/config/${locale}/header.md`);
  const footer = await import(`../cms/config/${locale}/footer.md`);
  const seo = await import(`../cms/config/${locale}/seo.md`);
  const news = await getAllPosts();

  return {
    props: {
      header: header.default.attributes,
      footer: footer.default.attributes,
      data: content.default.attributes,
      seo: seo.default.attributes,
      headerNotTrasnparent: true,
      news,
    },
  };
}
