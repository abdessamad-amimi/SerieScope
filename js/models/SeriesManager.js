import myApi from "../view/services/api.js";
import { Series } from "./Series.js";

export class SeriesManager {

    constructor() {
        this.series = [];
    }

    async getAll() {
        try {
            const response = await myApi.get("");
            const shows = response.data;
            this.series = shows.map((show) => {
                return new Series(show);
            })
        }
        catch (error) {
            console.error(error);
        }

        return this.series;
    }

    async getById(id) {
        const serie = await myApi.get(`/${id}`)
        return new Series(serie.data);
    }

    async create(newSerie) {
        const serie = new Series(newSerie);
        const createSerie = await myApi.post("" , serie);
        return createSerie.data;
    }

    async update(id , newSerie){
        const updatedSerie = await myApi.put(`/${id}` , newSerie);
        return new Series(updatedSerie.data);
    }

    async remove(id){
        await myApi.delete(`/${id}`);
    }

}