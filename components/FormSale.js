import { Formik, Form, Field } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  name: Yup.string().min(2).max(64).required(),
  email: Yup.string().email().required(),
  phone: Yup.string().min(8).max(25).required(),
});

export default function FormSale({ contactForm, shoppingCart, data, close }) {
  const [sendingStatus, setSendingStatus] = useState("notSending");

  const inputStyles =
    "bg-[#F6F6F6] py-5 px-5 md:px-8 w-full h-[3.75rem] outline-none appearance-none shadow-none box-border align-middle border-2 border-transparent focus:border-primary-dark";

  function showError() {
    setSendingStatus("error");
    setTimeout(() => {
      setSendingStatus("notSending");
    }, 5000);
  }

  function showSuccess(actions) {
    setSendingStatus("sent");
    setTimeout(() => {
      setSendingStatus("notSending");
      clearForm(actions);
    }, 5000);
    setTimeout(() => close(), 10000);
  }

  function handleSubmit(values, actions) {
    setSendingStatus("sending");

    let emailData = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      message: `Заказ:
${
  shoppingCart.priceListKarts && shoppingCart.priceListKarts.length > 0
    ? `${data.summary.kart}: ${shoppingCart.priceListKarts
        .map((item) => `${item.headingSimple} x${item.amount}`)
        .join(", ")}\n`
    : shoppingCart.priceListKarts &&
      JSON.stringify(shoppingCart.priceListKarts) !== "[]"
    ? `${data.summary.kart}: ${shoppingCart.priceListKarts.headingSimple} x${shoppingCart.priceListKarts.amount}\n`
    : ""
}${
        shoppingCart.priceListEngines &&
        shoppingCart.priceListEngines.length > 0
          ? `${data.summary.engine}: ${shoppingCart.priceListEngines
              .map((item) => `${item.headingSimple} x${item.amount}`)
              .join(", ")}\n`
          : shoppingCart.priceListEngines &&
            JSON.stringify(shoppingCart.priceListEngines) !== "[]"
          ? `${data.summary.engine}: ${shoppingCart.priceListEngines.headingSimple} x${shoppingCart.priceListEngines.amount}\n`
          : ""
      }${
        shoppingCart.priceListTires && shoppingCart.priceListTires.length > 0
          ? `${data.summary.tire}: ${shoppingCart.priceListTires
              .map((item) => `${item.headingSimple} x${item.amount}`)
              .join(", ")}\n`
          : shoppingCart.priceListTires &&
            JSON.stringify(shoppingCart.priceListTires) !== "[]"
          ? `${data.summary.tire}: ${shoppingCart.priceListTires.headingSimple} x${shoppingCart.priceListTires.amount}\n`
          : ""
      }${
        shoppingCart.priceListOptions &&
        shoppingCart.priceListOptions.length > 0
          ? `${data.summary.extras}: ${shoppingCart.priceListOptions
              .map((item) => `${item.headingSimple} x${item.amount}`)
              .join(", ")}`
          : ""
      }
`,
    };

    fetch("/api/send", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })
      .then((res) => {
        if (res.status === 200) {
          showSuccess(actions);
        } else {
          showError();
        }
      })
      .catch(() => {
        showError();
      });
  }
  function clearForm(actions) {
    actions.resetForm();
    setSendingStatus("notSending");
  }
  const BUTTON_STATES = {
    notSending: {
      buttonText: contactForm.button.default,
    },
    sending: {
      buttonText: contactForm.button.sending,
    },
    error: {
      buttonText: contactForm.button.error,
    },
    sent: {
      buttonText: contactForm.button.sent,
    },
  };
  return (
    <>
      <button
        type="button"
        className="absolute top-0 right-0 p-2 m-3 md:hidden hover:opacity-50"
        onClick={() => close()}
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="1.4852"
            y1="18.4558"
            x2="18.4558"
            y2="1.48528"
            stroke="#1E1E1E"
            strokeWidth="4"
          />
          <line
            x1="1.4855"
            y1="1.48526"
            x2="18.4561"
            y2="18.4558"
            stroke="#1E1E1E"
            strokeWidth="4"
          />
        </svg>
      </button>
      <p className="pb-5 pr-6 text-3xl italic font-black uppercase md:pr-0 md:text-4xl">
        {contactForm.heading}
      </p>
      <p className="theme-text">{contactForm.text}</p>
      <Formik
        initialValues={{
          name: "",
          phone: "",
          email: "",
        }}
        validationSchema={Schema}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
      >
        {({ touched, errors }) => (
          <Form className="w-full pt-5">
            <div className="grid-cols-2 md:grid gap-x-5">
              <div className="space-y-5">
                <Field
                  placeholder={contactForm.name}
                  className={`${
                    touched.name && errors.name ? "border-primary-red" : ""
                  } ${inputStyles}`}
                  name="name"
                />

                <Field
                  placeholder={contactForm.email}
                  className={`${
                    touched.email && errors.email ? "border-primary-red" : ""
                  } ${inputStyles}`}
                  name="email"
                  type="email"
                />

                <Field
                  placeholder={contactForm.phone}
                  className={`${
                    touched.phone && errors.phone ? "border-primary-red" : ""
                  } ${inputStyles}`}
                  name="phone"
                  type="tel"
                />
              </div>

              <div className="!h-full bg-[#f7f7f7] py-5 mt-5 md:mt-0 px-5 md:px-8">
                {shoppingCart.priceListKarts &&
                  JSON.stringify(shoppingCart.priceListKarts) !== "[]" && (
                    <div className="">
                      <p className="pb-0 font-bold text-primary-dark">
                        {data.summary.kart}
                      </p>
                      <p className="theme-text !text-sm">
                        {(Array.isArray(shoppingCart.priceListKarts)
                          ? shoppingCart.priceListKarts
                          : [shoppingCart.priceListKarts]
                        ).map((item) => `${item.headingSimple}\n`)}
                      </p>
                    </div>
                  )}
                {shoppingCart.priceListEngines &&
                  JSON.stringify(shoppingCart.priceListEngines) !== "[]" && (
                    <div className="">
                      <p className="pb-0 font-bold text-primary-dark">
                        {data.summary.engine}
                      </p>
                      <p className="theme-text !text-sm">
                        {(Array.isArray(shoppingCart.priceListEngines)
                          ? shoppingCart.priceListEngines
                          : [shoppingCart.priceListEngines]
                        ).map((item) => `${item.headingSimple}\n`)}
                      </p>
                    </div>
                  )}
                {shoppingCart.priceListTires &&
                  JSON.stringify(shoppingCart.priceListTires) !== "[]" && (
                    <div className="">
                      <p className="pb-0 font-bold text-primary-dark">
                        {data.summary.tire}
                      </p>
                      <p className="theme-text !text-sm">
                        {(Array.isArray(shoppingCart.priceListTires)
                          ? shoppingCart.priceListTires
                          : [shoppingCart.priceListTires]
                        ).map((item) => `${item.headingSimple}\n`)}
                      </p>
                    </div>
                  )}
                {shoppingCart.priceListOptions.length > 0 && (
                  <div className="">
                    <p className="pb-0 font-bold text-primary-dark">
                      {data.summary.extras}
                    </p>
                    {shoppingCart.priceListOptions.map((item) => (
                      <p
                        className="theme-text !text-sm"
                        key={item.headingSimple}
                      >
                        {item.headingSimple}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button
              disabled={sendingStatus === "sending"}
              type="submit"
              className="!block mt-5 md:mt-16 mx-auto theme-button"
            >
              <span className="relative">
                {BUTTON_STATES[sendingStatus]["buttonText"]}
              </span>
            </button>
          </Form>
        )}
      </Formik>
      <style global jsx>{`
        input,
        textarea {
          line-height: normal;
          transition: border-color 0.2s;
          resize: none;
        }
      `}</style>
    </>
  );
}
