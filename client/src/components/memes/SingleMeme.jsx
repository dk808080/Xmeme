import React, { useState, useEffect } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../css/memes/singlememe.css";
import axios from "axios";

function SingleMeme({ match }) {
  const [foundmeme, setfoundmeme] = useState({});
  const {
    params: { id },
  } = match;
  useEffect(() => {
    axios
      .get(`http://localhost:8081/memes/${id}`)
      .then((res) => {
        setfoundmeme(res.data);
      })
      .catch((error) => console.log(error));
  }, [id]);
  return (
    <div>
      {JSON.stringify(foundmeme) === JSON.stringify({}) ? (
        <div className="single_meme">
          <div class="card">
            <div class="card-body">
              <img
                src="https://i.pinimg.com/originals/04/90/27/0490270112e6af4096bbb912a1acb747.jpg"
                alt="not fount"
                className="notfound  card-img-top"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="single_meme">
          <div class="card">
            <div class="card-body">
              <h1 className="card-text">{foundmeme.name}</h1>
              <p class="card-text">{foundmeme.caption}</p>
              <img
                class="card-img-top"
                src={foundmeme.url}
                alt="Card image cap"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleMeme;
