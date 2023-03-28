import { useStore } from "@components/Store";
import _ from "lodash";
import Image from "./image/Image";

export default function SaleItem({ item, category, disabled, priceList }) {
  const shoppingCart = useStore((state) => state.shoppingCart);
  const addToShoppingCart = useStore((state) => state.addToShoppingCart);
  const removeFromShoppingCart = useStore(
    (state) => state.removeFromShoppingCart
  );

  const isInShoppingCart = Array.isArray(shoppingCart[category])
    ? !!shoppingCart[category].filter(
        (input) =>
          JSON.stringify(_.omit(input, "amount")) === JSON.stringify(item)
      ).length
    : JSON.stringify(_.omit(shoppingCart[category], "amount")) ===
      JSON.stringify(item);

  function handleOnClick() {
    if (isInShoppingCart) {
      removeFromShoppingCart(item, category);
    } else {
      addToShoppingCart(item, category);
    }
  }
  return (
    <button
      disabled={disabled}
      className={`${
        isInShoppingCart ? "theme-border-red" : ""
      } flex overflow-hidden flex-col
      `}
      onClick={() => handleOnClick()}
    >
      {item.image && (
        <div className="w-full theme-border-gray">
          <Image
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            src={item.image}
            alt={item.headingSimple}
            className={`w-full object-cover aspect-[2]`}
          />
        </div>
      )}
      <div className="bg-[#F7F7F7] h-full w-full">
        <div
          className={`${priceList ? "" : "bg-[#EAEAEA]"} ${
            item.image ? "py-5" : "h-full py-8"
          } flex justify-between items-center px-5`}
        >
          {!item.heading ? (
            <p className="font-bold text-left whitespace-pre-line text-primary-dark">
              {item.headingSimple}
            </p>
          ) : (
            <div
              className="text-left markdown-pre-line text-primary-dark"
              dangerouslySetInnerHTML={{ __html: item.heading }}
            />
          )}
          {item.price && (
            <p className="pl-4 text-xl font-bold whitespace-nowrap md:text-2xl text-primary-dark">
              {item.from ? "От " : ""}
              {isNaN(parseInt(item.price))
                ? item.price
                : `${numberWithCommas(parseInt(item.price))} р.`}
            </p>
          )}
        </div>
        {item.text && (
          <div className="p-5 ">
            <p className="text-xs font-light text-left text-primary-dark">
              {item.text}
            </p>
          </div>
        )}
      </div>
    </button>
  );
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
