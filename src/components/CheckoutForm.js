import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import CN from "../images/CN.jpeg";

const CheckoutForm = ({ title, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isPaid, setIsPaid] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const cardElements = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElements);
      //   console.log(stripeResponse);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeResponse.token.id,
          title: title,
          amount: price,
        }
      );
      console.log(response.data);
      if (response.data) {
        setIsPaid(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return isPaid ? (
    <div>
      <img style={{ width: 700 }} src={CN} alt="" />
    </div>
  ) : (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement isPaid={isPaid} />
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
