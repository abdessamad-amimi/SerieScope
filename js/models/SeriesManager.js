import { Series } from "./Series.js";
export class SeriesManager {

    constructor() {
        this.series = [];
    }

    async GetShows() {
        if (!localStorage.getItem("Series")) {
            try {
                const response = await fetch("https://api.tvmaze.com/shows?page=0");
                if (!response.ok) {
                    throw new Error("Error while fetching the data")
                }
                else {
                    const shows = await response.json();
                    this.series = shows.slice(0, 20).map((show) => {
                        return new Series(show)
                    })

                    localStorage.setItem("Series" , JSON.stringify(this.series));
                }
            }
            catch (error) {
                console.error(error);
            }
        }

        else{
            this.series = JSON.parse(localStorage.getItem("Series")).map(serie => {
                return new Series(serie);
            })
        }

        return this.series;
    }

    AjouterSerie(objet){
        const serie = new Series(objet);
        this.series.unshift(serie);
        localStorage.setItem("Series" , JSON.stringify(this.series));
    }

    Recherche(array, input){
        return array.filter((arr) => arr.name.toLowerCase().startsWith(input.toLowerCase()))
    }

    Filtrer(array, option){
        if(option) return array.filter(arr => arr.genres.includes(option));
        return array
    }
}