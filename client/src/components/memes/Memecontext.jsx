import React, { createContext } from "react";
import axios from "axios";
import swal from "sweetalert";
export const Memeprovider = createContext();

class Memecontext extends React.Component {
  constructor() {
    super();

    this.state = {
      cancelClick: this.cancelClick,
      submitmeme: this.submitmeme,
      isadd: false,
      addfirstmeme: this.addfirstmeme,
      isaddonemore: false,
      addonemore: this.addonemore,
      updatememe: this.updatememe,
      likeMeme: this.likeMeme,
      memedata: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8081/memes")
      .then((res) => {
        this.setState({ memedata: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:8081/likes")
      .then((res) => {
        const newdata = this.state.memedata.map((item, i) =>
          Object.assign({}, item, res.data[i])
        );
        this.setState({ memedata: newdata });
        console.log(newdata);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  likeMeme = (likeid) => {
    axios
      .patch(`http://localhost:8081/memes/${likeid}/likememe`)
      .then((res) => {
        axios
          .get("http://localhost:8081/memes")
          .then((res) => {
            this.setState({ memedata: res.data });
          })
          .catch((err) => {
            console.log(err);
          });
        axios
          .get("http://localhost:8081/likes")
          .then((res) => {
            const newdata = this.state.memedata.map((item, i) =>
              Object.assign({}, item, res.data[i])
            );
            this.setState({ memedata: newdata });
            console.log(newdata);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  cancelClick = () => {
    this.setState({ isadd: false });
    this.setState({ isaddonemore: false });
  };
  addfirstmeme = () => {
    this.setState({ isadd: true });
  };
  addonemore = () => {
    this.setState({ isaddonemore: true });
  };

  submitmeme = (newmeme) => {
    const name = newmeme.name;
    const url = newmeme.url;
    const caption = newmeme.caption;
    if (name === "" || url === "" || caption === "") {
      swal("Empty input fields", "All the feilds are mandatory!!", "info");
    } else {
      axios
        .post("http://localhost:8081/memes", newmeme)
        .then((res) => {
          axios
            .get("http://localhost:8081/memes")
            .then((res) => {
              this.setState({ memedata: res.data });
            })
            .catch((err) => {
              console.log(err);
            });
          axios
            .get("http://localhost:8081/likes")
            .then((res) => {
              const newdata = this.state.memedata.map((item, i) =>
                Object.assign({}, item, res.data[i])
              );
              this.setState({ memedata: newdata });
              console.log(newdata);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });

      this.setState({ isaddonemore: false });
    }
  };

  updatememe = (memetobeupdated) => {
    const id = memetobeupdated.id;
    const changedmeme = {
      url: memetobeupdated.url,
      caption: memetobeupdated.caption,
    };
    if (memetobeupdated.url === "" || memetobeupdated.caption === "") {
      swal("Empty input fields", "All the feilds are mandatory!!", "info");
    } else {
      axios
        .patch(`http://localhost:8081/memes/${id}`, changedmeme)
        .then((res) => {
          swal("Updated!", "your meme has been updated!", "success");
          axios
            .get("http://localhost:8081/memes")
            .then((res) => {
              this.setState({ memedata: res.data });
            })
            .catch((err) => {
              console.log(err);
            });
          axios
            .get("http://localhost:8081/likes")
            .then((res) => {
              const newdata = this.state.memedata.map((item, i) =>
                Object.assign({}, item, res.data[i])
              );
              this.setState({ memedata: newdata });
              console.log(newdata);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <Memeprovider.Provider value={{ ...this.state }}>
        {this.props.children}
      </Memeprovider.Provider>
    );
  }
}

export default Memecontext;
