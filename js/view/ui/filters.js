import { SeriesManager } from "../../models/SeriesManager.js";
import { setLocalStorage } from "../data/store.js";

const manager = new SeriesManager();

async function getParams(){
    const store = await setLocalStorage();
    const name = store.critere.recherche;
    const genre = store.critere.filter;
    const langue = store.critere.langue;
    return {name: name, genre: genre, language: langue}
}

export async function Filter(store){
    const params = await getParams();
    store.series = await manager.getAll(params);
    return store.series;
}

export function GetGenres(AllSeries) {
    const AllGenres = [];
    AllSeries.forEach(serie => serie.genres.forEach(genre => {
        if (!AllGenres.includes(genre)) AllGenres.push(genre);
    }));
    return AllGenres;
}

export function AppendGenres(filterSelect, AllSeries, value) {
    filterSelect.replaceChildren();

    const TousOption = document.createElement("option");
    TousOption.textContent = "Afficher tous";
    TousOption.value = "";
    filterSelect.append(TousOption);

    const AllGenre = GetGenres(AllSeries);
    AllGenre.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        filterSelect.append(option);
    });
    filterSelect.value = value;
}

export function GetLangue(AllSeries) {
    const AllLangues = [];
    AllSeries.forEach(serie => {
        if(!AllLangues.includes(serie.language)) AllLangues.push(serie.language)
    })
    return AllLangues;
}

export function AppendLangue(filterSelect, AllSeries, value) {
    filterSelect.replaceChildren();

    const TousOption = document.createElement("option");
    TousOption.textContent = "Afficher tous";
    TousOption.value = "";
    filterSelect.append(TousOption);

    const AllLangue = GetLangue(AllSeries);
    AllLangue.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        filterSelect.append(option);
    });
    filterSelect.value = value
}