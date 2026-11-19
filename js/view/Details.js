import { SeriesManager } from "../models/SeriesManager.js";
const manager = new SeriesManager();
const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
console.log(window.location.search)

const serie = await manager.getById(id);

const serieImage = document.querySelector("#serie-image");
const serieNom = document.querySelector("#serie-nom");
const serieDescription = document.querySelector("#serie-description");
const serieLien = document.querySelector("#serie-lien");
const serieGenres = document.querySelector("#serie-genres");

serieImage.src = serie.image.original;
serieNom.textContent = serie.name;
serieDescription.innerHTML = serie.summary;
if(serie.url) serieLien.href = serie.url;

serie.genres.forEach(genre => {
    serieGenres.innerHTML += `
    <span class="rounded-full border border-[#333333] bg-[#111111] px-3 py-1 text-xs text-gray-300">${genre}</span>`
})

console.log(serie);