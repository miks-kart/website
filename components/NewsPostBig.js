import Image from "@components/image/Image";
import NewsPostSmall from "./NewsPostSmall";

export default function NewsPostBig({ post, texts, onClick, i }) {
  return (
    <>
      <button
        onClick={() => onClick(i)}
        className="hidden text-left bg-white group hover-theme-border-red md:block md:col-span-2"
      >
        <Image
          loading="eager"
          src={post.image}
          alt={post.title}
          className="w-full aspect-[3.32] object-cover"
        />
        <article className="p-5">
          <div className="flex items-center pb-5 justify-between text-[#818285]">
            <p className="text-[#818285] text-xs font-bold">{post.source}</p>
            <p className="text-[#818285] text-xs font-bold">{post.dateTitle}</p>
          </div>
          <div className="flex items-end justify-between space-x-8">
            <p className="max-w-3xl md:!text-3xl !pb-0 theme-subheading">
              {post.title}
            </p>
            <p className="text-[#818285] uppercase italic font-bold group-hover:text-primary-red group-focus:text-primary-red">
              {texts.read}
            </p>
          </div>
        </article>
      </button>
      <div className="md:hidden">
        <NewsPostSmall
          texts={texts}
          post={post}
          key={post.title}
          onClick={onClick}
          i={i}
        />
      </div>
    </>
  );
}
