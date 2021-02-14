import React, { useState, useContext } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../css/memes/addmeme.css";
import { Memeprovider } from "./Memecontext";
function AddMeme() {
  const [name, setname] = useState("");
  const [url, seturl] = useState("");
  const [caption, setcaption] = useState("");
  const obj = useContext(Memeprovider);

  function cancelClick(event) {
    event.preventDefault();
    obj.cancelClick();
  }

  function submitmeme(event) {
    event.preventDefault();
    var newmeme = {
      name: name,
      url: url,
      caption: caption,
    };
    obj.submitmeme(newmeme);
  }
  return (
    <div className="boxform">
      <h1>Meme Stream</h1>
      <form>
        <div>
          <label for="name">Meme Owner</label>
          <input
            type="email"
            class="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Enter your full name"
            value={name}
            required="true"
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
        </div>
        <div>
          <label for="caption">Caption</label>
          <input
            type="email"
            class="form-control"
            id="caption"
            placeholder="Enter the caption for your meme"
            required="true"
            value={caption}
            onChange={(e) => {
              setcaption(e.target.value);
            }}
          />
        </div>
        <div>
          <label for="caption">Meme URL</label>
          <input
            type="email"
            class="form-control"
            id="caption"
            placeholder="Enter URL for your meme"
            required="true"
            value={url}
            onChange={(e) => {
              seturl(e.target.value);
            }}
          />
        </div>
        <button type="button" class="btn submit-button" onClick={submitmeme}>
          SUBMIT
        </button>
        <button
          type="button"
          class="btn btn-outline-danger"
          onClick={cancelClick}
        >
          CANCEL
        </button>
      </form>
    </div>
  );
}
export default AddMeme;
