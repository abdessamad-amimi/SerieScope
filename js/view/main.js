import { Series } from "../models/Series.js";
import { SeriesManager } from "../models/SeriesManager.js";
import { setLocalStorage } from "./data/store.js";
import { ShowSeries } from "./ui/cards.js";
import { AppendGenres, AppendLangue, Filter, GetGenres } from "./ui/filters.js"
import {
    AfficherSuggetions,
    AfficherGenres,
    ValidGenre,
    ValiderName,
    Validlanguage,
    ValiderDescription,
    AjouterSerie,
    ClearInputs,
    SupprimerSerie
} from "./ui/form.js";

const manager = new SeriesManager();

const reader = new FileReader();

const serieObject = {
    name: null,
    language: null,
    status: null,
    genres: [],
    summary: null,
    image: { 
        medium: "https://raw.githubusercontent.com/abdessamad-amimi/SerieScope/main/assets/images/coming_soon.jpg?utm_source=chatgpt.com",
        original: "https://raw.githubusercontent.com/abdessamad-amimi/SerieScope/main/assets/images/coming_soon.jpg?utm_source=chatgpt.com"
    }
};

const SeriesCard = document.querySelector("#SeriesCard");
const filterSelect = document.querySelector("#filter");
const inputRecherche = document.querySelector("#search");
const filterLangue = document.querySelector("#langue");
const reset = document.querySelector("#reset");

const store = await setLocalStorage();

inputRecherche.value = store.critere.recherche;

AppendGenres(filterSelect, store.series, store.critere.filter);
AppendLangue(filterLangue, store.series, store.critere.langue);

const nameInput = document.querySelector("#name");
const genreInput = document.querySelector("#genre");
const descriptionInput = document.querySelector("#description");
const languageInput = document.querySelector("#language");
const imageInput = document.querySelector("#image");
const apercuImg = document.querySelector("#apercu-img");
const formSubmit = document.querySelector("#formSubmit");
const retirerImage = document.querySelector("#retirer-image");

const erreurName = document.querySelector("#erreur-name");
const erreurGenre = document.querySelector("#erreur-genre");
const erreurDescription = document.querySelector("#erreur-description");
const erreurImage = document.querySelector("#erreur-image");
const erreurLanguage = document.querySelector("#erreur-language");

const suggestionsGenres = document.querySelector("#suggestions-genres");
const selectedGenres = document.querySelector("#genres-selectionnes");

const counterP = document.querySelector("#counter");

ShowSeries(store, SeriesCard, counterP)

const genresDisponibles = GetGenres(store.series);
const genresChoisis = [];

imageInput.addEventListener("input", () => {
    try {
        reader.onload = () => {
            const fileContent = reader.result;
            serieObject.image.medium = fileContent;
            serieObject.image.original = fileContent;
        }
        reader.readAsDataURL(imageInput.files[0]);
    } catch (error) {
        console.error(error);
    }
});

genreInput.addEventListener("input", () => {
    if (genresChoisis.length < 4) {
        AfficherSuggetions(suggestionsGenres, genreInput, genresDisponibles, genresChoisis, selectedGenres);
    } else {
        suggestionsGenres.classList.add("hidden");
    }
});

retirerImage.addEventListener("click", () => {
    imageInput.value = "";
})

nameInput.addEventListener("input", () => {
    ValiderName(nameInput, erreurName);
});

descriptionInput.addEventListener("input", () => {
    ValiderDescription(descriptionInput, erreurDescription);
});

suggestionsGenres.addEventListener("click", () => {
    ValidGenre(genresChoisis, erreurGenre);
});

selectedGenres.addEventListener("click", () => {
    ValidGenre(genresChoisis, erreurGenre);
});

languageInput.addEventListener("click", () => {
    Validlanguage(languageInput, erreurLanguage);
})

formSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    if (!ValiderName(nameInput, erreurName)) valid = false;
    if (!ValiderDescription(descriptionInput, erreurDescription)) valid = false;
    if (!ValidGenre(genresChoisis, erreurGenre)) valid = false;
    if (!Validlanguage(languageInput, erreurLanguage)) valid = false;
    if (valid) {
        if (store.idModified !== null) {
            AjouterSerie(SeriesCard, serieObject, nameInput, genresChoisis, descriptionInput, languageInput, store, manager, counterP);
            ClearInputs(nameInput, descriptionInput, genreInput, genresChoisis, selectedGenres, imageInput);
        }
        else{
            
        }
    }
    else console.log("Error");
});

function ResetSearch() {

    inputRecherche.value = "";
    filterLangue.value = "";
    filterSelect.value = "";
    fillCritere();

}

function fillCritere() {
    store.critere = JSON.parse(localStorage.getItem("critere"));

    store.critere.filter = filterSelect.value;
    store.critere.recherche = inputRecherche.value.toLowerCase();
    store.critere.langue = filterLangue.value;

    localStorage.setItem("critere", JSON.stringify(store.critere));
}

inputRecherche.addEventListener("input", async () => {
    fillCritere();
    await Filter(store);
    ShowSeries(store, SeriesCard, counterP)
});

filterSelect.addEventListener("change", async () => {
    fillCritere();
    await Filter(store);
    ShowSeries(store, SeriesCard, counterP)
});

filterLangue.addEventListener("change", async () => {
    fillCritere();
    await Filter(store);
    ShowSeries(store, SeriesCard, counterP)
})

reset.addEventListener("click", async () => {
    ResetSearch();
    await Filter(store);
    ShowSeries(store, SeriesCard, counterP);
});

export async function FillInputs(){
    const serieModifier = await manager.getById("/1");
    nameInput.value = serieModifier.name;
    languageInput.value = serieModifier.language;
    descriptionInput = serieModifier.summary;
    genresChoisis.push(...serieModifier.genres);
    AfficherGenres(selectedGenres, genresChoisis, genreInput)
}