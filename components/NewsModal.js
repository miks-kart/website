import Footer from "@components/Footer";
import Header from "@components/Header";
import Image from "@components/image/Image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function NewsModal({
  post,
  texts,
  setIsOpen,
  isOpen,
  header,
  footer,
  router,
}) {
  return (
    <Transition appear={false} show={isOpen} as={Fragment}>
      <Dialog
        id="modal"
        as="div"
        className="relative z-50"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300 delay-200 md:delay-[0ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100 "
          leave="ease-in duration-200"
          leaveFrom="opacity-100 "
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-10 bg-black" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full !w-full  ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100 "
              leave="ease-in duration-200 delay-100 md:delay-[0ms]"
              leaveFrom="opacity-100 "
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="w-full pointer-events-none">
                <Header bg={true} data={header} currentPage={router.route} />
                <section className="page-container !py-10 pointer-events-auto !max-w-7xl   !w-full md:!w-[90%] p-5 md:px-24 md:!py-16 !space-y-0 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                  <div className="flex items-start justify-between space-x-4 md:space-x-0">
                    <p className="max-w-4xl md:!leading-[1.1] w-full !pb-0 theme-heading !text-2xl md:!text-5xl">
                      {post.title}
                    </p>

                    <button
                      onClick={() => setIsOpen(false)}
                      className="md:translate-x-[150%] -mt-2 hover:opacity-70 w-10 h-10 focus:opacity-70 duration-200"
                    >
                      <img
                        src="/images/x.svg"
                        alt="close"
                        className="w-10 h-10"
                      />
                    </button>
                  </div>
                  <div className="flex items-center pt-[0.625rem] pb-10 justify-between text-[#818285]">
                    <p className="text-[#818285] text-xs font-bold">
                      {post.source}
                    </p>
                    <p className="text-[#818285] text-xs font-bold">
                      {post.dateTitle}
                    </p>
                  </div>
                  <div
                    className="pb-10 text-lg prose text-left max-w-none markdown-pre-line md:text-2xl text-primary-dark"
                    dangerouslySetInnerHTML={{ __html: post.pre }}
                  />

                  <Image
                    loading="eager"
                    image={post.image}
                    alt="slide"
                    className="w-full h-full "
                  />
                  {post.photoSource.text && (
                    <p className="text-[#818285] pt-5 text-xs text-center font-bold">
                      {texts.photo}{" "}
                      <a
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                        href={post.photoSource.link}
                      >
                        {post.photoSource.text}
                      </a>
                    </p>
                  )}
                  <div
                    className="pt-12 prose text-left prose-headings:mt-8 prose-a:underline prose-headings:mb-3 max-w-none markdown-pre-line text-primary-dark"
                    dangerouslySetInnerHTML={{ __html: post.text }}
                  />
                </section>
                <button
                  className="table mx-auto my-10 text-lg italic font-bold text-center text-white underline uppercase duration-200 pointer-events-auto hover:opacity-70 focus:opacity-70 md:my-16 underline-offset-4 md:text-2xl"
                  onClick={() => setIsOpen(false)}
                >
                  {texts.close}
                </button>
                <Footer data={footer} currentPage={router.route} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
