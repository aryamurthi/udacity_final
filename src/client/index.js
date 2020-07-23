import { performAction } from "./js/app";
import { removeTrip } from "./js/remove";
import "./styles/styles.scss";

document.getElementById("generate").addEventListener("click", performAction);
document.getElementById("remove").addEventListener("click", removeTrip);

export { performAction };
