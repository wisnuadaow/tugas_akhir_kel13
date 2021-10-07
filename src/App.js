import './App.css';
import { React} from "react";
import Aplikasi from './Component/Aplikasi';
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function App() {
  return (
          <BrowserRouter>
        <header className="navv">
          <div
            className="title"
            style={{
              position: "relative",
              left: "45%",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >

          </div>
          </header>
          <Switch>
          <Route path="/" exact component={Aplikasi} />
        </Switch>
        </BrowserRouter>
        );
}
