export class Series{
    constructor(object){
        this.id = object.id;
        this.name = object.name;
        this.language = object.language || null;
        this.status = object.status || null;
        this.genres = object.genres;
        this.summary = object.summary || null;
        this.image = object.image || "./assets/images/comming_soon";
    }
}