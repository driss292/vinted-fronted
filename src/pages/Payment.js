import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";

const Payment = ({ isPaid }) => {
  const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");
  const location = useLocation();
  const { title, price } = location.state;
  const protectionPrice = (price / 10).toFixed(2);
  const shippingPrice = (price / 5).toFixed(2);
  const total = Number(price) + Number(protectionPrice) + Number(shippingPrice);

  return (
    <div className="payment-container">
      <div className="payment-block">
        <div className="payment-card-infos">
          <h5>Résumé de la commande</h5>
          <div>
            <ul>
              <li>
                commande <span>{price.toFixed(2)}€</span>
              </li>
              <li>
                Frais de protection acheteurs <span>{protectionPrice} €</span>
              </li>
              <li>
                Frais de port <span>{shippingPrice}€</span>
              </li>
            </ul>
            <div>
              TOTAL <span>{total.toFixed(2)}€</span>
            </div>
          </div>
        </div>
        <div className="payment-card">
          <Elements stripe={stripePromise}>
            <CheckoutForm title={title} price={price} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
