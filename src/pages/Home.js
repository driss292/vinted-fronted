import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../images/hero.jpeg";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <>
      <div className="hero">
        <img src={Hero} alt="" />
        <div className="hero-block">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
        </div>
      </div>
      <div className="block">
        <div className="container">
          {data.offers.map((offer, index) => {
            const id = offer._id;
            return (
              <div key={index} className="card-container">
                <div className="card-user">
                  {/* <img src="" alt="" /> */}
                  <span>{offer.owner.account.username}</span>
                </div>
                <div className="card">
                  <Link to={`/offer/${id}`}>
                    <img src={offer.product_image.url} alt="" />
                    <div className="card-info">
                      <span>{offer.product_price} €</span>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Home;
