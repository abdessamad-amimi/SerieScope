import { SeriesManager } from "../../models/SeriesManager.js";

const manager = new SeriesManager();

export async function setLocalStorage() {
    if (!localStorage.getItem("critere")) {
        const critere = {
            filter: "tous",
            recherche: "",
            langue: "tous"
        }
        localStorage.setItem("critere", JSON.stringify(critere));
    }

    const store = {
        series: await manager.getAll(),
        critere: JSON.parse(localStorage.getItem("critere")),
        idModified: null,
        idSupprimer: null
    }

    return store;
}