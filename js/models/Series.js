export class Series{
    constructor(object){
        this.id = object.id;
        this.name = object.name;
        this.language = object.language || null;
        this.status = object.status || null;
        this.genres = object.genres;
        this.summary = object.summary || object.name;
        this.url = object.url;
        this.image = 
        {
            medium: object.image.medium || "./assets/images/comming_soon",
            original: object.image.original || "./assets/images/comming_soon"
        };
    }
}