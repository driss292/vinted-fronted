import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    <div className="container">
      {data.offers.map((offer, index) => {
        const id = offer.product_image.asset_id;
        return (
          <div key={index}>
            <Link to={`/offer/${id}`} data={data}>
              <img src={offer.product_image.url} alt="" />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Home;
