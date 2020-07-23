import { performAction } from "./js/app"
import './styles/styles.scss'

document.getElementById("generate").addEventListener("click", performAction)

export {
    performAction
}