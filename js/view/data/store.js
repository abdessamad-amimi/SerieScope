import { SeriesManager } from "../../models/SeriesManager.js";

const manager = new SeriesManager();

export async function setLocalStorage() {
    if (!localStorage.getItem("critere")) {
        const critere = {
            filter: "",
            recherche: "",
            langue: ""
        }
        localStorage.setItem("critere", JSON.stringify(critere));
    }

    const params = JSON.parse(localStorage.getItem("critere"));

    const store = {
        series: await manager.getAll({
            name: params.recherche,
            genre: params.filter,
            language: params.langue
        }),
        critere: JSON.parse(localStorage.getItem("critere")),
        idModified: null,
        idSupprimer: null
    }

    return store;
}