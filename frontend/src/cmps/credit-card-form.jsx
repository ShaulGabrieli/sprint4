import React, { useRef, useState } from "react";
// import CreditCard from "./CreditCard";
import { Formik } from "formik";
import * as yup from "yup";
import { showSuccessMsg } from "../services/event-bus.service";
import { useNavigate } from "react-router-dom";


export function CreditCardForm(props) {
  const [element, setElement] = useState();
  const [number, setNumber] = useState();

  const navigate = useNavigate()

  // const cvvInput = useRef();
  const handleTransition = (cardInner, numberItem) => {
    setElement(cardInner);
    setNumber(numberItem);
  };
  // const turnFront = () => {
  //   element.current.classList.remove("cardInnerTransform");
  // };
  // const turnBack = () => {
  //   element.current.classList.add("cardInnerTransform");
  // };
  const getSchema = () =>
    yup.object().shape({
      cardNumber: yup.number().min(16, "not less than 16"),
      cardHolder: yup.string().required(),
      cardMonth: yup.string().required(),
      cvv: yup.number().required().min(3, "not less than 3")
    });

  return (
    <div>
      <Formik
        initialValues={{
          cardNumber: "",
          cardHolder: "",
          cardMonth: "",
          cardYear: "",
          cvv: ""
        }}
        onSubmit={async (values, formikBag) => {
          // alert('Thanks for booking with us! Order is on its way!')
          showSuccessMsg("Thanks for booking with us! Order is on its way!")
          props.setCreditTransaction(true)
          navigate("/");
        }}
        validationSchema={getSchema()}
      >
        {props => (
          <form onSubmit={props.handleSubmit} >
            {" "}
            {/* <CreditCard
              values={props.values}
              handleTransition={handleTransition}
            /> */}
            <div className="form-credit-card-main">
              <label className="label">Card Number</label>
              <input
                type="text"
                onChange={props.handleChange}
                // onClick={turnFront}
                onBlur={props.handleBlur}
                value={props.values.cardNumber
                  .replace(/\s/g, "")
                  .replace(/(\d{4})/g, "$1 ")
                  .trim()}
                name="cardNumber"
                maxlength="19"
                onKeyDown={e => {
                  // console.log(e.which);
                  // if (e.which !== "#")
                  //   number.current.classList.add("numberTransform");
                }}
              />
              <label className="label">Card Holder</label>
              <input
                type="text"
                onChange={props.handleChange}
                // onClick={turnFront}
                onBlur={props.handleBlur}
                value={props.values.cardHolder}
                name="cardHolder"
              />
              <div className="row">
                <div className="column">
                  <label className="label">Expiration Date</label>
                  <div>
                    <select
                      type="text"
                      onChange={props.handleChange}
                      // onClick={turnFront}
                      onBlur={props.handleBlur}
                      value={props.values.cardMonth}
                      placeholder="Month"
                      name="cardMonth"
                    >
                      <option value="" disabled selected>
                        Month
                      </option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m, i) => (
                        <option value={m}>{m < 10 ? `0${m}` : m}</option>
                      ))}
                    </select>

                    <select
                      type="text"
                      onChange={props.handleChange}
                      // onClick={turnFront}
                      onBlur={props.handleBlur}
                      value={props.values.cardYear}
                      name="cardYear"
                    >
                      <option value="" disabled selected>
                        Year
                      </option>
                      {[
                        2023,
                        2024,
                        2025,
                        2026,
                        2027,
                        2028,
                        2029,
                        2030,
                        2031,
                        2032
                      ].map((y, i) => (
                        <option value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>{" "}
                <div className="column">
                  <label className="label">CVV</label>
                  <input
                    type="text"
                    // ref={cvvInput.current}
                    // onClick={turnBack}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.cvv}
                    name="cvv"
                  />
                </div>
                {/* <button className="btn" type="submit">Validate</button> */}
              </div>
              {props.errors.name && (
                <div id="feedback">{props.errors.name}</div>
              )}
              <button id="submit-credit" type="submit" hidden disabled={!props.isValid}>
                Validate
              </button>
            </div>
            <pre>{JSON.stringify(props.values, null, 2)}</pre>
          </form>
        )}
      </Formik>
    </div>
  );
};


