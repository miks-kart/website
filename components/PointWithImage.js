export default function PointWithImage({ point }) {
  return (
    <div className="grid-cols-2 md:grid theme-border max-w-[50rem] mx-auto md:bg-[#F6F6F6]">
      <img
        src={point.image}
        alt={point.heading}
        className="object-cover w-full aspect-[1.54]"
      />
      <div className="flex-col justify-center p-5 md:flex md:p-8 md:!pl-16 bg-[#F6F6F6]">
        <p className="font-bold text-primary-dark text-lg pb-[0.625rem]">
          {point.heading}
        </p>
        <p className="theme-text !text-sm">{point.text}</p>
      </div>
    </div>
  );
}
