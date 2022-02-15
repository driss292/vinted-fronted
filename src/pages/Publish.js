import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescrition] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData();

      data.append("title", title);
      data.append("description", description);
      data.append("price", price);
      data.append("condition", condition);
      data.append("city", city);
      data.append("brand", brand);
      data.append("size", size);
      data.append("color", color);
      data.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data._id) {
        navigate(`/offer/${response.data._id}`);
      } else {
        setErrorMessage("An error occurred !");
      }
      // console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return !token ? (
    <Navigate to="/login" />
  ) : (
    <div className="publish-container">
      <h2>Vends ton articles</h2>
      <form onSubmit={handleSubmit}>
        <div className="publish-block file-input">
          <input
            type="file"
            onChange={(event) => {
              setPicture(event.target.files[0]);
              setPreview(URL.createObjectURL(event.target.files[0]));
            }}
          />
        </div>
        <div className="publish-block">
          <input
            type="text"
            placeholder="Titre"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          {preview && <img src={preview} alt="" />}

          <textarea
            type="text"
            placeholder="Décris ton article"
            onChange={(event) => {
              setDescrition(event.target.value);
            }}
          />
        </div>
        <div className="publish-block">
          <input
            type="text"
            placeholder="Marque"
            onChange={(event) => {
              setBrand(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Taille"
            onChange={(event) => {
              setSize(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Couleur"
            onChange={(event) => {
              setColor(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Etat"
            onChange={(event) => {
              setCondition(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Lieu"
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </div>
        <div className="publish-block">
          <input
            type="number"
            placeholder="Prix"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit">Ajouter</button>
        </div>
      </form>
    </div>
  );
};

export default Publish;
