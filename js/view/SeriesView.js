import { SeriesManager } from "../models/SeriesManager.js";

const manager = new SeriesManager();
const result = await manager.GetShows();

const SeriesCard = document.querySelector("#SeriesCard");
const filterSelect = document.querySelector("#filter");
const inputRecherche = document.querySelector("#search");
const reset = document.querySelector("#reset");

const letterRegex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;

const nameInput = document.querySelector("#name");
const genreInput = document.querySelector("#genre");
const descriptionInput = document.querySelector("#description");
const imageInput = document.querySelector("#image");
const apercuImg = document.querySelector("#apercu-img");
const formSubmit = document.querySelector("#formSubmit");
const retirerImage = document.querySelector("#retirer-image");

imageInput.addEventListener("input", () => {
    const fileList = imageInput.fil;
    console.log(fileList);
});

const erreurName = document.querySelector("#erreur-name");
const erreurGenre = document.querySelector("#erreur-genre");
const erreurDescription = document.querySelector("#erreur-description");
const erreurImage = document.querySelector("#erreur-image");

const suggestionsGenres = document.querySelector("#suggestions-genres");
const selectedGenres = document.querySelector("#genres-selectionnes");

const counterP = document.querySelector("#counter");

counterP.textContent = `${manager.series.length} séries affichées`;

const genresDisponibles = await GetGenres();
const genresChoisis = [];

function AfficherGenres() {
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
            AfficherGenres();
        });

        div.append(span, button);

        selectedGenres.append(div);

    })
}

function AfficherSuggetions(recherche) {
    if (recherche.trim() === "") {
        suggestionsGenres.classList.add("hidden");
        return;
    }
    suggestionsGenres.replaceChildren();
    const suggestions = [];

    genresDisponibles.forEach(genre => {
        if (genre.toLowerCase().startsWith(recherche.toLowerCase()) && !genresChoisis.includes(genre))
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
            suggestionsGenres.classList.add("hidden");
            AfficherGenres();
        })
    })
}

genreInput.addEventListener("input", () => {
    if (genresChoisis.length < 3) {
        AfficherSuggetions(genreInput.value);
    } else {
        suggestionsGenres.classList.add("hidden");
    }
});

function ValidGenre() {
    let valid = true;

    if (genresChoisis.length < 1) valid = false;

    if (!valid) erreurGenre.textContent = "Choisir un genre";
    else erreurGenre.textContent = "";

    return valid
}

function ValiderName() {
    let valid = true;

    if (nameInput.value.trim().length < 3) valid = false;
    if (!letterRegex.test(nameInput.value.trim())) valid = false;

    if (!valid) erreurName.textContent = "Entrer un nom valid";
    else erreurName.textContent = "";

    return valid;
}

function ValiderDescription() {
    let valid = true;

    if (descriptionInput.value.trim().length < 5) valid = false;

    if (!valid) erreurDescription.textContent = "Entrer une description valide";
    else erreurDescription.textContent = "";

    return valid;
}

function ValidImage() {
    let valid = true;

    if (imageInput.value === "") valid = false;

    if (!valid) erreurImage.textContent = "Veuillez choisir une image";
    else erreurImage.textContent = "";

    return valid;
}

retirerImage.addEventListener("click", () => {
    imageInput.value = "";
})

nameInput.addEventListener("input", () => {
    ValiderName();
});

descriptionInput.addEventListener("input", () => {
    ValiderDescription();
});

suggestionsGenres.addEventListener("click", () => {
    ValidGenre();
});

selectedGenres.addEventListener("click", () => {
    ValidGenre();
})

imageInput.addEventListener("input", () => {
    ValidImage();
})

function AjouterSerie() {
    let valid = true;


}

formSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    if (!ValiderName()) valid = false;
    if (!ValiderDescription()) valid = false;
    if (!ValidImage()) valid = false;
    if (!ValidGenre()) valid = false;
    if (valid) console.log("Success");
    else console.log("Error");
});



function GetGenres() {
    const AllGenres = [];
    result.forEach(serie => serie.genres.forEach(genre => {
        if (!AllGenres.includes(genre)) AllGenres.push(genre);
    }))
    return AllGenres;
}

async function AppendGenres() {
    filterSelect.replaceChildren();

    const TousOption = document.createElement("option");
    TousOption.textContent = "Afficher tous";
    TousOption.value = "tous";
    filterSelect.append(TousOption);

    const AllGenre = GetGenres();
    AllGenre.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        filterSelect.append(option);
    })
}

async function ShowSeries(data) {
    SeriesCard.replaceChildren();

    data.forEach(data => {
        const article = document.createElement("article");
        article.className =
            "group overflow-hidden rounded-xl border border-[#333333] bg-[#191919] transition duration-300 hover:-translate-y-1 hover:border-gray-500 hover:bg-[#1f1f1f] hover:shadow-lg hover:shadow-black/50 active:scale-[0.98] active:border-gray-500 active:bg-[#1f1f1f]";

        const img = document.createElement("img");
        if (data.image !== null && data.image.medium !== null) {
            img.src = data.image.medium;
        }
        else img.src = "assets/images/coming_soon.jpg";
        img.alt = data.name;
        img.className = "h-36 w-full object-cover sm:h-36";

        const contenu = document.createElement("div");
        contenu.className = "p-2";

        const titre = document.createElement("h4");
        titre.className = "text-xs font-bold";
        titre.textContent = data.name;

        const genres = document.createElement("div");
        genres.className = "my-1 flex flex-wrap gap-1";

        data.genres.forEach((genre) => {
            const badge = document.createElement("span");
            badge.className =
                "rounded-full bg-[#303030] px-2 py-0.5 text-[10px] text-gray-300";
            badge.textContent = genre;
            genres.append(badge);
        });

        const description = document.createElement("p");
        description.className = "line-clamp-2 text-[10px] text-gray-400";
        if (data.summary.trim() != null) {
            description.innerHTML = data.summary;
        }
        else description.textContent = data.name;

        const lien = document.createElement("a");
        lien.href = `details.html?id=${data.id}`;
        lien.className =
            "mt-2 flex w-full items-center justify-center gap-1 rounded-lg border border-[#333333] bg-[#303030] px-2 py-1.5 text-[10px] font-semibold text-gray-300 transition hover:border-gray-500 hover:bg-[#3a3a3a] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
        lien.textContent = "Voir les détails";

        contenu.append(titre, genres, description, lien);
        article.append(img, contenu);

        SeriesCard.append(article)
    });

}

// manager.GetShows().then(
//     result => ShowSeries(result)
// )
ShowSeries(result);
AppendGenres();

async function ApplyChanges() {
    let allSeries = await manager.GetShows();

    console.log("Before filtering:", allSeries.length);
    console.log("Select value:", filterSelect.value);

    allSeries = manager.Recherche(allSeries, inputRecherche.value);

    if (filterSelect.value !== "tous") {
        allSeries = manager.Filtrer(allSeries, filterSelect.value);
    }

    console.log("After filtering:", allSeries.length);

    ShowSeries(allSeries);
}

async function ResetSearch() {
    let allSeries = await manager.GetShows();

    inputRecherche.value = "";
    filterSelect.value = "tous";

    ShowSeries(allSeries);
}

inputRecherche.addEventListener("input", async () => {
    await ApplyChanges();
});

filterSelect.addEventListener("change", async () => {
    await ApplyChanges();
    console.log("Selected value:", filterSelect.value);
})

reset.addEventListener("click", () => {
    ResetSearch();
})