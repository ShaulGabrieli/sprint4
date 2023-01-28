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
          cardNumber: "4580 4927 5748 3639",
          cardHolder: `${props.buyer.fullname}`,
          cardMonth: "12",
          cardYear: "2025",
          cvv: "123"
        }}
        onSubmit={async (values, formikBag) => {
          showSuccessMsg("Your order is being processed. stay tuned!")
          props.setCreditTransaction(true)

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
            <div className="form-credit-card-main flex">

              <div className="card-number-date flex column">
                <div className="card-number flex column">
                  <label className="card-label">Card Number</label>
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
                  /></div>

                <div className="expiration-column flex column">
                  <label className="card-label">Expiration Date</label>
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
                </div>
                </div>       

                <div className="holder-cvv  flex column">
                  <div className="card-holder flex column">
                    <label className="card-label">Card Holder</label>
                    <input
                      type="text"
                      onChange={props.handleChange}
                      // onClick={turnFront}
                      onBlur={props.handleBlur}
                      value={props.values.cardHolder}
                      name="cardHolder"
                    /></div>




                <div className="cvv-column flex column">
                  <label className="card-label">Security Code</label>
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
                </div>


              {/* <button className="btn" type="submit">Validate</button> */}


              {props.errors.name && (
                <div id="feedback">{props.errors.name}</div>
              )}
              <button id="submit-credit" type="submit" hidden disabled={!props.isValid}>
                Validate
              </button>
            </div>
            {/* <pre>{JSON.stringify(props.values, null, 2)}</pre> */}
          </form>
        )}
      </Formik>
    </div>
  );
};


