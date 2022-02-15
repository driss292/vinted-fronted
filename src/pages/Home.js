import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../images/hero.jpeg";

const Home = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  // const [islimit, setIsLimit] = useState(false);

  // const count = data.count;
  // console.log(data.count.offers);
  const limit = 10;
  // const isLimit = data.count / limit;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?limit=${limit}&page=${page}`
        );
        // console.log(response.data.count);
        // const count = response.data.count;
        // console.log(count);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [page]);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <>
      <div className="hero">
        <img src={Hero} alt="" />
        <div className="hero-block">
          <div className="hero-text">
            Prêts à faire du tri dans vos placards ?
          </div>
          <Link to={token ? "/login" : "/publish"}>
            <button>Commencer à vendre</button>
          </Link>
        </div>
      </div>
      <div className="block">
        <div className="container">
          {data.offers.map((offer, index) => {
            const id = offer._id;
            return (
              <div key={index} className="card-container">
                <div className="card-user">
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

          <div className="select-page">
            <div>
              {page > 1 && (
                <button
                  onClick={() => {
                    setPage(page - 1);
                  }}
                >
                  page précédente
                </button>
              )}
            </div>
            <div>
              <button
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                page suivante
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
