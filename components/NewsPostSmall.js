import Image from "@components/image/Image";

export default function NewsPostSmall({ post, texts, onClick, i }) {
  return (
    <button
      onClick={() => onClick(i)}
      className="text-left bg-white hover-theme-border-red group"
    >
      <Image
        loading="eager"
        src={post.image}
        alt={post.title}
        className="w-full aspect-[2] object-cover"
      />
      <article className="p-5">
        <p className="theme-text md:!text-xl !font-bold !text-lg">
          {post.title}
        </p>
        <div className="flex items-center pt-[0.625rem] justify-between text-[#818285]">
          <p className="text-[#818285] text-xs font-bold">{post.dateTitle}</p>
          <p className="text-[#818285] uppercase italic font-bold group-hover:text-primary-red group-focus:text-primary-red">
            {texts.read}
          </p>
        </div>
      </article>
    </button>
  );
}
