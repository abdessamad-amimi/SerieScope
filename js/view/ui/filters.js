export function Recherche(array, input) {
    if(input === "") return array
    return array.filter((arr) => arr.name.toLowerCase().startsWith(input));
}

export function GenreFilter(array, option) {
    if (option === "tous" || option === "") return array;
    else return array.filter(arr => arr.genres.includes(option));
}

export function LangueFilter(array, option) {
    if (option === "tous" || option === "") return array;
    else return array.filter(arr => arr.language === option);
}

export function GetGenres(AllSeries) {
    const AllGenres = [];
    AllSeries.forEach(serie => serie.genres.forEach(genre => {
        if (!AllGenres.includes(genre)) AllGenres.push(genre);
    }))
    return AllGenres;
}

export function AppendGenres(filterSelect, AllSeries, value) {
    filterSelect.replaceChildren();

    const TousOption = document.createElement("option");
    TousOption.textContent = "Afficher tous";
    TousOption.value = "tous";
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
    TousOption.value = "tous";
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