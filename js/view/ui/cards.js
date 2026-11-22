import { SeriesManager } from "../../models/SeriesManager.js";
import { setLocalStorage } from "../data/store.js";
import { FillInputs, RemoveHidden } from "../main.js";
import { SupprimerSerie } from "./form.js";

const manager = new SeriesManager();

export function ShowSeries(store, SeriesCard, counterP) {
    SeriesCard.replaceChildren();
    UpdateCounter(counterP, store.series);
    if (store.series.length === 0) return;
    store.series.forEach(data => {
        const article = document.createElement("article");
        article.className =
            "group overflow-hidden rounded-xl border border-[#333333] bg-[#191919] transition duration-300 hover:-translate-y-1 hover:border-gray-500 hover:bg-[#1f1f1f] hover:shadow-lg hover:shadow-black/50 active:scale-[0.98] active:border-gray-500 active:bg-[#1f1f1f]";

        const img = document.createElement("img");
        if (data.image != null && data.image.original != null) {
            img.src = data.image.original;
        }
        else img.src = "assets/images/coming_soon.jpg";
        img.alt = data.name;
        img.className = "h-80 w-full";

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
        if (data.summary.trim() === "" || data.summary != null) {
            description.innerHTML = data.summary;
        }
        else description.textContent = data.name;

        const lien = document.createElement("a");
        lien.href = `details.html?id=${data.id}`;
        lien.className =
            "mt-2 flex w-full items-center justify-center gap-1 rounded-lg border border-[#333333] bg-[#303030] px-2 py-1.5 text-[10px] font-semibold text-gray-300 transition hover:border-gray-500 hover:bg-[#3a3a3a] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
        lien.textContent = "Voir les détails";

        const actions = document.createElement("div");
        actions.className = "mt-2 flex gap-2";

        const btnModifier = document.createElement("button");
        btnModifier.classList.add("btnModifier");
        btnModifier.type = "button";
        btnModifier.textContent = "Modifier";
        btnModifier.setAttribute("aria-label", `Modifier ${data.name}`);
        btnModifier.className =
            "flex-1 rounded-lg border border-[#333333] bg-blue-400/40  px-2 py-1.5 text-[10px] font-semibold text-gray-300 transition hover:border-gray-500 hover:bg-[#3a3a3a] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
        btnModifier.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            store.idModified = data.id;
            FillInputs(data.id);
        });

        const btnSupprimer = document.createElement("button");
        btnSupprimer.classList.add("btnSupprimer");
        btnSupprimer.type = "button";
        btnSupprimer.textContent = "Supprimer";
        btnSupprimer.setAttribute("aria-label", `Supprimer ${data.name}`);
        btnSupprimer.className =
            "flex-1 rounded-lg border border-red-900 bg-red-950 px-2 py-1.5 text-[10px] font-semibold text-red-300 transition hover:border-red-500 hover:bg-red-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
        btnSupprimer.addEventListener("click", () => {
            store.idSupprimer = data.id;
            if (store.idModified === store.idSupprimer) {
                alert("Vous pouvez pas supprimer la serie en modification !")
            }
            else {
                RemoveHidden(data.name);
            }
        });

        actions.append(btnModifier, btnSupprimer);

        contenu.append(titre, genres, description, lien, actions);
        article.append(img, contenu);
        SeriesCard.append(article);
    });
}

async function UpdateCounter(counterP, series) {
    counterP.textContent = `${series.length} séries affichées`;
}