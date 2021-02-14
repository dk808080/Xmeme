import React, { useContext } from "react";
import "../../css/memes/emptylist.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Memeprovider } from "./Memecontext";
import AddMeme from "./AddMeme";

function EmptyList() {
  const obj = useContext(Memeprovider);
  function addfirstmeme(event) {
    event.preventDefault();
    obj.addfirstmeme();
  }
  return (
    <div>
      {!obj.isadd ? (
        <div className="boxempty">
          <h3>No memes added yet!</h3>
          <p> Add a meme</p>
          <img
            src={process.env.PUBLIC_URL + "images/emptybox.jfif"}
            alt="empty box image"
          />
          <br />
          <button className="btn btn-outline-info" onClick={addfirstmeme}>
            ADD MEME
          </button>
        </div>
      ) : (
        <AddMeme />
      )}
    </div>
  );
}

export default EmptyList;
