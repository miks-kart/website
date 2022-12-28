import FormWithMessage from "./FormWithMessage";

export default function ContactForm({ data, className, contactForm }) {
  return (
    <div className={`${className} md:py-16 md:px-24`}>
      <p className="pb-5 text-3xl italic font-black uppercase md:text-4xl">
        {data.headingForm}
      </p>
      <p className="theme-text">{data.textForm}</p>
      <FormWithMessage contactForm={contactForm} />
    </div>
  );
}
