import React, { useEffect, useState, useContext } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../css/memes/meme.css";
import axios from "axios";
import EmptyList from "./EmptyList";
import AddMeme from "./AddMeme";
import { Memeprovider } from "./Memecontext";
function Memes() {
  const [newurl, setnewurl] = useState("");
  const [newcaption, setnewcaption] = useState("");
  const [updateid, setupdateid] = useState();

  const obj = useContext(Memeprovider);

  function addonemore(event) {
    event.preventDefault();
    obj.addonemore();
  }
  const memeslist = obj.memedata.map((meme) => {
    return (
      <div className="list col-lg-4 col-md-6 col-sm-6 col-xs-12">
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered mymodal"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">
                  Update this meme
                  <br />
                  <small style={{ font: "small-caption" }}>
                    You can not change the name of the meme owner
                  </small>
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label for="caption" className="col-form-label">
                      Caption:
                    </label>
                    <input
                      className="form-control"
                      id="caption"
                      required="true"
                      placeholder="Enter new caption for this meme"
                      value={newcaption}
                      onChange={(e) => {
                        setnewcaption(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label for="url" className="col-form-label">
                      URL:
                    </label>
                    <input
                      className="form-control"
                      id="url"
                      required="true"
                      placeholder="Enter new URL for this meme"
                      value={newurl}
                      onChange={(e) => {
                        setnewurl(e.target.value);
                      }}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  id="updatebutton"
                  onClick={(event) => {
                    event.preventDefault();
                    const memetobeupdated = {
                      id: updateid,
                      caption: newcaption,
                      url: newurl,
                    };
                    obj.updatememe(memetobeupdated);
                    setnewurl("");
                    setnewcaption("");
                    document
                      .getElementById("updatebutton")
                      .setAttribute("data-dismiss", "modal");
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card eachmeme">
          <div
            className="card-body row no-gutters"
            style={{ marginTop: "1rem" }}
          >
            <div className="col-lg-10 col-md-10 col-xs-10 col-sm-10">
              <h5 className="card-title">{meme.name}</h5>
              <p className="card-text">{meme.caption}</p>
            </div>
            <div className="menuu col-lg-2 col-md-2 col-xs-2 col-sm-2">
              <div className="btn-group dropleft more">
                <button
                  type="button"
                  class="btn btn-secondary dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{
                    borderRadius: "100%",
                    backgroundColor: "#89cff0",
                  }}
                ></button>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href={"/memes/" + meme.id}>
                    Open meme
                  </a>

                  <a
                    class="dropdown-item"
                    href="#"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    onClick={() => {
                      setupdateid(meme.id);
                    }}
                  >
                    Update meme
                  </a>
                  <div class="dropdown-divider"></div>
                </div>
              </div>
            </div>
          </div>
          <img
            className="card-img embed-responsive-item"
            src={meme.url}
            alt="Card image cap"
            style={{ height: "250px" }}
          />
          <div className="like">
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                obj.likeMeme(meme.id);
              }}
            >
              <i class="fas fa-heart like-heart"></i>
            </a>
            {meme.likeCount}
          </div>
        </div>
      </div>
    );
  });
  return (
    <div>
      {(() => {
        if (obj.memedata.length === 0) {
          return <EmptyList />;
        } else {
          return (
            <div>
              <div>
                {(() => {
                  if (obj.isaddonemore === true) {
                    return <AddMeme />;
                  } else {
                    return (
                      <button
                        className="btn btn-outline-dark addbutton"
                        onClick={addonemore}
                      >
                        ADD MEME
                      </button>
                    );
                  }
                })()}
              </div>
              <div className="row memeslist">{memeslist}</div>
            </div>
          );
        }
      })()}
    </div>
  );
}

export default Memes;
