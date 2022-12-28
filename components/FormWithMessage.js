import { Formik, Form, Field } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  name: Yup.string().min(2).max(64).required(),
  email: Yup.string().email().required(),
  phone: Yup.string().min(8).max(25).required(),
});

export default function FormWithMessage({ contactForm }) {
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
  }

  function handleSubmit(values, actions) {
    setSendingStatus("sending");

    let data = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      message: values.message,
    };

    fetch("/api/send", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
      <Formik
        initialValues={{
          name: "",
          message: "",
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

              <Field
                name="message"
                className={`${
                  touched.message && errors.message ? "border-primary-red" : ""
                } ${inputStyles} md:!h-[100%] h-56 mt-5 md:mt-0`}
                placeholder={contactForm.message}
                component="textarea"
              />
            </div>
            <button
              type="submit"
              disabled={sendingStatus === "sending"}
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
