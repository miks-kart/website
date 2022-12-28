export default function Priorities({ item, i, length }) {
  return (
    <div>
      <div className="flex pb-5 md:pb-16">
        <div>
          <div className="flex items-end justify-between w-full pb-5">
            <p className="text-2xl font-bold text-primary-dark">
              {item.heading}
            </p>
            <p className="ml-10 text-5xl italic font-black leading-none tracking-tighter text-right md:hidden text-primary-red">
              {"0" + (i + 1)}
            </p>
          </div>
          <p className="theme-text">{item.text}</p>
        </div>
        <p className="hidden ml-10 text-6xl italic font-black tracking-tighter text-right md:block text-primary-red">
          {"0" + (i + 1)}
        </p>
      </div>
      {i + 1 !== length && <hr className="border-[1px] text-primary-gray" />}
    </div>
  );
}
