import { ShowSeries } from "./cards.js";

const letterRegex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;

export function AfficherGenres(selectedGenres, genresChoisis, genreInput) {
    selectedGenres.replaceChildren();
    genresChoisis.forEach(genre => {
        const div = document.createElement("div");
        div.className = "flex justify-between items-center gap-2 rounded-md bg-[#333333] px-2 py-1";

        const span = document.createElement("span");
        span.className = "text-xs text-gray-300";
        span.textContent = genre

        const button = document.createElement("button");
        button.className = "text-gray-400 hover:text-red-400";
        button.textContent = "×";
        button.addEventListener("click", () => {
            genresChoisis.splice(genresChoisis.indexOf(genre), 1);
            AfficherGenres(selectedGenres, genresChoisis, genreInput);
            genreInput.focus();
        });

        div.append(span, button);

        selectedGenres.append(div);

    })
}

export function AfficherSuggetions(suggestionsGenres, genreInput, genresDisponibles, genresChoisis, selectedGenres) {
    if (genreInput.value.trim() === "") {
        suggestionsGenres.classList.add("hidden");
        return;
    }
    suggestionsGenres.replaceChildren();
    const suggestions = [];

    genresDisponibles.forEach(genre => {
        if (genre.toLowerCase().startsWith(genreInput.value.toLowerCase()) && !genresChoisis.includes(genre))
            suggestions.push(genre);
    })

    if (suggestions.length === 0) {
        suggestionsGenres.classList.add("hidden");
        return;
    }

    suggestionsGenres.classList.remove("hidden");

    suggestions.forEach(suggestion => {
        const button = document.createElement("button");
        button.className = "px-3 py-2 text-left text-xs text-gray-300 hover:bg-[#383838] transition";
        button.textContent = suggestion;
        suggestionsGenres.append(button);

        button.addEventListener("click", (e) => {
            e.preventDefault();
            genresChoisis.push(suggestion);
            genreInput.value = "";
            genreInput.focus();
            suggestionsGenres.classList.add("hidden");
            AfficherGenres(selectedGenres, genresChoisis, genreInput);
        })
    })

}

export function ValidGenre(genresChoisis, erreurGenre) {
    let valid = true;

    if (genresChoisis.length < 1) valid = false;

    if (!valid) erreurGenre.textContent = "Choisir un genre";
    else erreurGenre.textContent = "";

    return valid
}

export function ValiderName(nameInput, erreurName) {
    let valid = true;

    if (nameInput.value.trim().length < 3) valid = false;
    if (!letterRegex.test(nameInput.value.trim())) valid = false;

    if (!valid) erreurName.textContent = "Entrer un nom valid";
    else erreurName.textContent = "";

    return valid;
}

export function Validlanguage(languageInput, erreurLanguage) {
    let valid = true;

    if (languageInput.value === "") valid = false;

    if (!valid) erreurLanguage.textContent = "Choisir une langue";
    else erreurLanguage.textContent = "";

    return valid;

}

export function ValiderDescription(descriptionInput, erreurDescription) {
    let valid = true;

    if (descriptionInput.value.trim().length < 5) valid = false;

    if (!valid) erreurDescription.textContent = "Entrer une description valide";
    else erreurDescription.textContent = "";

    return valid;
}

export async function AjouterSerie(SeriesCard, serieObject, nameInput, genresChoisis, descriptionInput, languageInput, store, manager, counterP) {

    serieObject.name = nameInput.value;
    serieObject.genres = genresChoisis;
    serieObject.summary = descriptionInput.value;
    serieObject.language = languageInput.value;

    const newSerie = await manager.create(serieObject);

    serieObject.id = newSerie.id;
    console.log(newSerie)
    store.series.push(serieObject);

    ShowSeries(store, SeriesCard, counterP);

    serieObject = {
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
}

export async function ModifierSerie(idModified, SeriesCard, serieObject, nameInput, genresChoisis, descriptionInput, languageInput, store, manager, counterP) {
    const oldSerie = store.series.find(serie => serie.id === idModified);
    const index = store.series.indexOf(oldSerie);
    serieObject.name = nameInput.value;
    serieObject.genres = genresChoisis;
    serieObject.summary = descriptionInput.value;
    serieObject.language = languageInput.value;

    if (oldSerie.image) serieObject.image = oldSerie.image;
    if (oldSerie.premiered) serieObject.premiered = oldSerie.premiered;
    if (oldSerie.ended) serieObject.ended = oldSerie.ended;
    if (oldSerie.officialSite) serieObject.officialSite = oldSerie.officialSite;
    if (oldSerie.rating) serieObject.rating = oldSerie.rating;

    const updatedSerie = await manager.update(idModified, serieObject);
    store.series[index] = updatedSerie;

    console.log(await manager.getById(idModified));
    console.log(store.series[index]);


    ShowSeries(store, SeriesCard, counterP);

    serieObject = {
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

}

export async function SupprimerSerie(SeriesCard, store, manager, counterP) {
    const deletedSerie = await manager.getById(store.idSupprimer);
    const index = store.series.findIndex(serie => serie.id === deletedSerie.id);

    await manager.remove(store.idSupprimer);
    store.series.splice(index, 1);

    store.idSupprimer = null;

    ShowSeries(store, SeriesCard, counterP);
}


export function ClearInputs(nameInput, descriptionInput, genreInput, genresChoisis, selectedGenres, imageInput, filterLangue) {
    nameInput.value = "";
    descriptionInput.value = "";
    genreInput.value = "";
    genresChoisis.length = 0;
    AfficherGenres(selectedGenres, genresChoisis, genreInput);
    imageInput.value = "";
    filterLangue.value = "";
}