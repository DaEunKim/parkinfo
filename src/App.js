import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Main, Home, Board, DetailContent } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">main</Link>
              </li>
              <li>
                <Link to="/home">home</Link>
              </li>
              <li>
                <Link to="/board">board</Link>
              </li>
            </ul>
          </nav>
          <Route key="switch/main" exact path="/" component={Main} />
          <Route key="switch/home" exact path="/home" component={Home} />
          <Route key="switch/board" path="/board" component={Board} />
          <Route
            key="switch/detailcontent"
            path="/detailcontent"
            component={DetailContent}
          />
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
