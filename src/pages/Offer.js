import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Offer = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <div className="offer-body">
      <div className="offer-container">
        <div className="offer-picture">
          <img src={data.product_image.secure_url} alt="" />
        </div>
        <div className="offer-info">
          <div className="offer-content-1">
            <h2>{data.product_price} €</h2>
            {data.product_details.map((item, index) => {
              const keys = Object.keys(item);
              return (
                <div key={index}>
                  <span>
                    {keys[0]} : {item[keys[0]]}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="offer-content-2">
            <h3>{data.product_name}</h3>
            <p>{data.product_description}</p>
            <p>{data.owner.account.username}</p>
          </div>

          <Link
            to={token ? "/payment" : "/login"}
            state={{
              title: data.product_name,
              price: data.product_price,
              user: token.id,
            }}
          >
            <button>Acheter</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Offer;
