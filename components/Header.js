import Vk from "./icons/Vk";
import Link from "next/link";
import Youtube from "./icons/Youtube";
import { useEffect, useState } from "react";
import NavLink from "@components/mobile menu/NavLink";
import NavExtra from "@components/mobile menu/NavExtra";
import { AnimatePresence, motion } from "framer-motion";
import { headerBg, menuScreen } from "@components/mobile menu/Variants";
import MobileMenuToggle from "@components/mobile menu/MobileMenuToggle";

export default function Header({ data, bg, currentPage, headerAnchors }) {
  const [color, setColor] = useState(!!bg);
  const [isOpen, setIsOpen] = useState(false);
  function toggleNav() {
    setIsOpen(!isOpen);
    document.querySelector("body").style.overflow = isOpen
      ? "hidden auto"
      : "hidden";
  }

  useEffect(() => {
    const handleScroll = () => {
      setColor(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuScreen}
            key={currentPage}
            initial="hidden"
            exit="hidden"
            animate="visible"
            id="mob-menu"
            className="fixed inset-0 z-50 overflow-y-scroll text-center pointer-events-auto bg-primary-dark text-primary-gray"
          >
            <div
              id="menu-items"
              className="z-10 inline-flex flex-col items-center justify-center min-h-full !space-y-0 !pt-24 !pb-10 text-left page-container"
            >
              {data.links.map((item, i) => (
                <NavLink
                  order={i}
                  onClick={() => {
                    toggleNav();
                  }}
                  item={item}
                  key={item.item.text}
                />
              ))}
              <NavExtra
                order={data.links.length}
                playAnimation={isOpen}
                onClick={() => toggleNav()}
              >
                <div className="pb-5 mt-6 space-y-1">
                  {data.contacts.map(({ subitem }) => (
                    <a
                      key={subitem.text}
                      href={
                        subitem.text.includes("@")
                          ? `mailto:${subitem.text}`
                          : `tel:${subitem.text}`
                      }
                      className="block font-normal normal-case font-base"
                    >
                      {subitem.text}
                    </a>
                  ))}
                </div>
                <div className="flex">
                  {data.socials.map(({ social }) => (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={social.link}
                      key={social.icon}
                    >
                      {social.icon === "vk" ? (
                        <Vk
                          className={`w-7 h-7 nav-icon !fill-primary-gray transition-colors duration-150`}
                        />
                      ) : (
                        <Youtube
                          className={`w-7 h-7 ml-4 nav-icon !fill-primary-gray transition-colors duration-150`}
                        />
                      )}
                    </a>
                  ))}
                </div>
              </NavExtra>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {bg && (
        <section className="">
          <span className="block w-full header-height" />
          {headerAnchors && (
            <AnchorLinks
              hidden
              headerAnchors={headerAnchors}
              currentPage={currentPage}
            />
          )}
        </section>
      )}
      <nav
        id="header"
        className="{`${
          window.location.pathname == '/zabronirovat-zaezd' ? "landing" : ""
        }}
          fixed top-0 z-50 w-screen pointer-events-auto"
      >
        <motion.div
          variants={headerBg}
          initial={false}
          exit="hidden"
          style={{
            transitionTimingFunction: "cubic-bezier(0.165, 0.84, 0.44, 1)",
          }}
          animate={`${!isOpen && (color || bg) ? "visible" : "hidden"}`}
          className={`${
            color || bg ? "opacity-100" : "opacity-0"
          } absolute header-height inset-0 pointer-events-none duration-200`}
        />
        <div className="px-[1.375rem] pt-[1.125rem] md:pt-0 mx-auto header-height relative z-20 flex justify-between items-center">
          <Link href="/" className="relative">
            <img
              style={{
                transitionTimingFunction: "cubic-bezier(0.165, 0.84, 0.44, 1)",
              }}
              src={data.logoLight}
              alt="logo"
              className={`${
                (color || bg) && !isOpen ? "opacity-0" : "opacity-100"
              } w-[6.25rem] transition-opacity duration-300`}
            />
            <img
              style={{
                transitionTimingFunction: "cubic-bezier(0.165, 0.84, 0.44, 1)",
              }}
              src={data.logoDark}
              alt="logo"
              className={`${
                (color || bg) && !isOpen ? "opacity-100" : "opacity-0"
              } w-[6.25rem] absolute inset-0 transition-opacity duration-300`}
            />
          </Link>
          <div className="flex items-center">
            <div className="hidden md:flex">
              {data.links.slice(1).map(({ item }) => (
                <Link
                  href={item.link}
                  key={item.text}
                  className={`${color || bg ? "nav-dark" : ""} ${
                    currentPage.includes(item.link) && "nav-active"
                  } px-4 py-2 text-sm font-bold nav-link transition-colors duration-150`}
                >
                  {item.text}
                </Link>
              ))}
            </div>
            <MobileMenuToggle
              bg={bg}
              color={color}
              isOpen={isOpen}
              onClick={() => toggleNav()}
            />
            <div className="hidden md:flex">
              {data.socials.map(({ social }) => (
                <a
                  target="_blank"
                  rel="noreferrer"
                  aria-label="social"
                  href={social.link}
                  key={social.icon}
                >
                  {social.icon === "vk" ? (
                    <Vk
                      className={`${
                        color || bg ? "nav-dark" : ""
                      } w-6 h-6 mx-2 nav-icon transition-colors duration-150`}
                    />
                  ) : (
                    <Youtube
                      className={`${
                        color || bg ? "nav-dark" : ""
                      } w-6 h-6 mx-2 nav-icon transition-colors duration-150`}
                    />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
        {headerAnchors && (
          <AnchorLinks
            color={color}
            isOpen={isOpen}
            bg={bg}
            headerAnchors={headerAnchors}
            currentPage={currentPage}
          />
        )}
      </nav>
    </>
  );
}

function AnchorLinks({
  headerAnchors,
  currentPage,
  hidden,
  color,
  bg,
  isOpen,
}) {
  return (
    <div
      style={{
        transitionTimingFunction: "cubic-bezier(0.165, 0.84, 0.44, 1)",
      }}
      className={`${
        hidden || isOpen
          ? "invisible delay-200 pointer-events-none !duration-[0ms]"
          : ""
      } ${
        color || bg ? "opacity-100" : "opacity-0"
      } bg-primary-dark duration-200`}
    >
      <div
        style={{
          transitionTimingFunction: "cubic-bezier(0.165, 0.84, 0.44, 1)",
        }}
        className={`${
          isOpen ? "opacity-0" : "opacity-100"
        } px-3 md:!px-[0.625rem] mx-auto flex md:justify-end items-center`}
      >
        <div className="flex flex-wrap py-2 md:py-0">
          {headerAnchors.map(({ anchor }) =>
            anchor.link.slice(0, 1) === "/" ? (
              <Link
                href={anchor.link}
                key={anchor.text}
                className={`${
                  currentPage.includes(anchor.link) && "!text-white"
                } md:px-5 px-2 md:py-[0.6875rem] hover:underline hover:text-white decoration-primary-red underline-offset-4 py-1 leading-none text-xs font-bold text-primary-gray-dark  transition-colors duration-150`}
              >
                {anchor.text}
              </Link>
            ) : (
              <a
                // id={anchor.link}
                key={anchor.text}
                href={anchor.link}
                onClick={(e) => {
                  const url = new URL(window.location);
                  url.hash = anchor.link;
                  window.history.pushState({}, "", url);

                  if (window.location.hash === anchor.link) {
                    e.target.classList.add("!text-white");
                  }
                }}
                className={`md:px-5 md:py-[0.6875rem] hover:text-white px-2 py-1  leading-none hover:underline decoration-primary-red underline-offset-4 text-xs font-bold text-primary-gray-dark  transition-colors duration-150`}
              >
                {anchor.text}
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}
