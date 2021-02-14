import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Memecontext from "./components/memes/Memecontext";
import Memes from "./components/memes/Meme";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import SingleMeme from "./components/memes/SingleMeme";
function App() {
  return (
    <div className="mainpage">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Memecontext>
              <Memes />
            </Memecontext>
          </Route>

          <Memecontext>
            <Route path="/memes" component={Memes} exact />
            <Route path="/memes/:id" component={SingleMeme} exact />
          </Memecontext>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
