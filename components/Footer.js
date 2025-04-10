import Link from "next/link";
import Vk from "./icons/Vk";
import Youtube from "./icons/Youtube";
import { useRouter } from 'next/router';

export default function Footer({ data, currentPage }) {
  const router = useRouter();
  const path = router.pathname;
  
  return (
    <footer className={`${
            path == '/zabronirovat-zaezd' ? "landing" : ""
          } pt-8 pb-8 pointer-events-auto md:pb-16 bg-primary-dark`}>
      <div className="px-[1.375rem] mx-auto md:flex justify-between items-start">
        <Link href="/">
          <img
            src={data.logo}
            alt="logo"
            className="w-[5.125rem] md:w-[6.25rem]"
          />
        </Link>
        <div className="flex pt-8 md:pt-0">
          <div className="w-full grid-cols-9 space-y-5 md:mx-5 md:space-y-0 columns-2 md:grid lg:gap-x-2 xl:gap-x-6">
            {data.links.map(({ item }) => (
              <div className="flex flex-col" key={item.text}>
                <Link
                  href={item.link}
                  className={`${currentPage === item.link && "nav-active"} ${
                    !item.sublinks && "md:text-enter"
                  } text-sm transition-colors md:whitespace-pre-line duration-150 nav-link`}
                >
                  {item.text}
                </Link>
                {item.sublinks && <span className="h-1 md:h-[0.625rem]"></span>}
                {item.sublinks &&
                  item.sublinks.map(({ subitem }) => (
                    <Link
                      href={subitem.link}
                      key={subitem.text}
                      className={`${
                        currentPage === subitem.link && "nav-active"
                      } mb-1 text-sm transition-colors duration-150 nav-link`}
                    >
                      {subitem.text}
                    </Link>
                  ))}
              </div>
            ))}
            <div className="flex md:hidden">
              {data.socials.map(({ social }) => (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={social.link}
                  key={social.icon}
                >
                  {social.icon === "vk" ? (
                    <Vk
                      className={`w-7 h-7 nav-icon transition-colors duration-150`}
                    />
                  ) : (
                    <Youtube
                      className={`w-7 h-7 ml-4 nav-icon transition-colors duration-150`}
                    />
                  )}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex">
            {data.socials.map(({ social }) => (
              <a
                target="_blank"
                rel="noreferrer"
                href={social.link}
                aria-label="social"
                key={social.icon}
              >
                {social.icon === "vk" ? (
                  <Vk
                    className={`w-5 h-5 ml-4 nav-icon transition-colors duration-150`}
                  />
                ) : (
                  <Youtube
                    className={`w-5 h-5 ml-4 nav-icon transition-colors duration-150`}
                  />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
