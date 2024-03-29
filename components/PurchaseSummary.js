import { Fragment, useState } from "react";
import { useStore } from "./Store";
import { Dialog, Transition } from "@headlessui/react";
import FormSale from "./FormSale";

export default function PurchaseSummary({
  data,
  contactSale,
  ceny,
  pdf,
  sport,
  dzhunior,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const shoppingCart = useStore((state) => state.shoppingCart);
  const changeAmount = useStore((state) => state.changeAmount);
  const removeFromShoppingCart = useStore(
    (state) => state.removeFromShoppingCart
  );

  function getTotalPrice() {
    let total = 0;
    for (let category in shoppingCart) {
      if (Array.isArray(shoppingCart[category])) {
        shoppingCart[category].forEach((item) => {
          total += item.price * item.amount;
        });
      } else {
        total += shoppingCart[category]
          ? shoppingCart[category]?.price * shoppingCart[category]?.amount
          : 0;
      }
    }
    return total;
  }

  return (
    <div className="overflow-hidden">
      <p className="font-bold text-xl md:text-2xl pb-5 text-[#ccc] italic uppercase">
        {data.summary.heading}
      </p>
      <hr className="border-[1px] text-primary-gray" />
      <div className="py-8 space-y-5">
        {JSON.stringify(shoppingCart.priceListKarts) !== "[]" &&
          JSON.stringify(shoppingCart.priceListKarts) !== "null" && (
            <div className="">
              <p className="pb-2 font-bold text-primary-dark">
                {data.summary.kart}
              </p>
              <div className="space-y-[0.625rem]">
                {(Array.isArray(shoppingCart.priceListKarts)
                  ? shoppingCart.priceListKarts
                  : [shoppingCart.priceListKarts]
                ).map((item) => (
                  <Item
                    key={item.headingSimple}
                    category={"priceListKarts"}
                    changeAmount={changeAmount}
                    removeFromShoppingCart={removeFromShoppingCart}
                    item={item}
                  />
                ))}
              </div>
            </div>
          )}
        {JSON.stringify(shoppingCart.priceListEngines) !== "[]" &&
          JSON.stringify(shoppingCart.priceListEngines) !== "null" && (
            <div className="">
              <p className="pb-3 font-bold text-primary-dark">
                {data.summary.engine}
              </p>
              <div className="space-y-[0.625rem]">
                {(Array.isArray(shoppingCart.priceListEngines)
                  ? shoppingCart.priceListEngines
                  : [shoppingCart.priceListEngines]
                ).map((item) => (
                  <Item
                    key={item.headingSimple}
                    category={"priceListEngines"}
                    changeAmount={changeAmount}
                    removeFromShoppingCart={removeFromShoppingCart}
                    item={item}
                  />
                ))}
              </div>
            </div>
          )}
        {JSON.stringify(shoppingCart.priceListTires) !== "[]" &&
          JSON.stringify(shoppingCart.priceListTires) !== "null" && (
            <div className="">
              <p className="pb-3 font-bold text-primary-dark">
                {data.summary.tire}
              </p>
              <div className="space-y-[0.625rem]">
                {(Array.isArray(shoppingCart.priceListTires)
                  ? shoppingCart.priceListTires
                  : [shoppingCart.priceListTires]
                ).map((item) => (
                  <Item
                    key={item.headingSimple}
                    category={"priceListTires"}
                    changeAmount={changeAmount}
                    removeFromShoppingCart={removeFromShoppingCart}
                    item={item}
                  />
                ))}
              </div>
            </div>
          )}
        {!ceny
          ? shoppingCart.priceListOptions.length > 0 && (
              <div className="">
                <p className="pb-3 font-bold text-primary-dark">
                  {data.summary.extras}
                </p>
                <div className="space-y-[0.625rem]">
                  {shoppingCart.priceListOptions.map((item) => (
                    <Item
                      key={item.headingSimple}
                      category={"priceListOptions"}
                      changeAmount={changeAmount}
                      removeFromShoppingCart={removeFromShoppingCart}
                      item={item}
                    />
                  ))}
                </div>
              </div>
            )
          : (shoppingCart.priceListOptionsSport.length > 0 ||
              shoppingCart.priceListOptionsJunior.length > 0) && (
              <div className="">
                <p className="font-bold text-primary-dark">
                  {data.summary.extras}
                </p>
                {shoppingCart.priceListOptionsSport.length > 0 && (
                  <>
                    <p className="py-3 font-bold text-[#969696]">
                      {data.headingExtrasSport}
                    </p>

                    <div className="space-y-[0.625rem]">
                      {shoppingCart.priceListOptionsSport.map((item) => (
                        <Item
                          key={item.headingSimple}
                          category={"priceListOptionsSport"}
                          changeAmount={changeAmount}
                          removeFromShoppingCart={removeFromShoppingCart}
                          item={item}
                        />
                      ))}
                    </div>
                  </>
                )}
                {shoppingCart.priceListOptionsJunior.length > 0 && (
                  <>
                    <p className="py-3 font-bold text-[#969696]">
                      {data.headingExtrasJunior}
                    </p>

                    <div className="space-y-[0.625rem]">
                      {shoppingCart.priceListOptionsJunior.map((item) => (
                        <Item
                          key={item.headingSimple}
                          category={"priceListOptionsJunior"}
                          changeAmount={changeAmount}
                          removeFromShoppingCart={removeFromShoppingCart}
                          item={item}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
      </div>
      <hr className="border-[1px] text-primary-gray" />

      <div className="flex items-center justify-between pt-5 md:pt-8">
        <p className="theme-text">{data.summary.total}</p>
        <p className="text-2xl font-bold text-primary-dark md:text-4xl">
          {numberWithCommas(getTotalPrice()) + " руб."}
        </p>
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="!table mx-auto theme-button mt-10 md:mt-[3.3125rem]"
      >
        <span className="relative">{data.summary.buy}</span>
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-[85%]" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full text-center !w-full md:w-[90%] !py-0 md:!py-5 page-container">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full p-5 md:px-24 md:!py-16 !space-y-0 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                  <FormSale
                    dzhunior={dzhunior}
                    sport={sport}
                    pdf={pdf}
                    ceny={ceny}
                    close={() => setIsOpen(false)}
                    data={data}
                    shoppingCart={shoppingCart}
                    contactForm={contactSale}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

function Item({ item, removeFromShoppingCart, changeAmount, category }) {
  const [input, setInput] = useState(item.amount);
  const handleOnClick = (newAmount) => {
    setInput(newAmount);
    if (newAmount <= 0) {
      removeFromShoppingCart(item, category);
    } else {
      changeAmount(item, newAmount, category);
    }
  };

  return (
    <div className="flex flex-col w-full md:items-center md:justify-between md:flex-row">
      <p className="theme-text w-full pb-[0.625rem] md:pb-0">
        {item.headingSimple}
      </p>
      <div className="flex items-center justify-between w-full md:justify-end">
        <p className="inline-block pr-5 font-bold text-primary-dark">
          {item.from === "true" ? "От " : ""}
          {numberWithCommas(item.price * item.amount)} руб.
        </p>
        <div className="-mr-5">
          <button
            className="h-8 px-5 font-bold transition-opacity duration-150 text-primary-dark hover:opacity-50"
            onClick={() => handleOnClick(item.amount - 1)}
          >
            -
          </button>
          <input
            aria-label="Количество"
            className="w-[5.125rem] text-primary-dark font-bold text-center h-8 bg-[#f6f6f6]"
            type="number"
            name="number"
            value={input}
            onBlur={(e) =>
              handleOnClick(
                isNaN(parseInt(e.target.value)) ? 1 : parseInt(e.target.value)
              )
            }
            onChange={(e) => setInput(parseInt(e.target.value))}
          />
          <button
            className="h-8 px-5 font-bold transition-opacity duration-150 text-primary-dark hover:opacity-50"
            onClick={() => handleOnClick(item.amount + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
