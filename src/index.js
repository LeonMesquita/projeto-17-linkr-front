import  ReactDOM from "react-dom";
import './css/reset.css';
import './css/styles.css';
import App from "./App";
import Modal from "react-modal"

Modal.setAppElement('.root');
ReactDOM.render(<App />, document.querySelector(".root"));
