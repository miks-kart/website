export default function CartFeatures({ feature }) {
  return (
    <div className="p-5 text-white md:py-10 bg-primary-dark md:px-7">
      <div className="w-24 mb-5 h-[4.6875rem]">
        <img src={feature.image} alt={feature.headingSimple} />
      </div>
      <p className="pb-2 text-lg font-bold">{feature.headingSimple}</p>
      <p className="text-sm font-light whitespace-pre-line">{feature.text}</p>
    </div>
  );
}
