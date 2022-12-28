export default function DropdownHeading({ heading, state }) {
  return (
    <p className="flex italic leading-none theme-heading-small">
      {heading}
      <span className={`${!state ? "hidden" : ""} mb-auto ml-2`}>
        <img
          src="/images/check-up.svg"
          alt="check up"
          className="w-[0.875rem] mt-[0.3125rem] h-[0.875rem]"
        />
      </span>
      <span className={`${!state ? "" : "hidden"} mt-auto ml-2`}>
        <img
          src="/images/check-down.svg"
          alt="check down"
          className="w-[0.875rem] mb-2 h-[0.875rem]"
        />
      </span>
    </p>
  );
}
