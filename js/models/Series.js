export class Series{
    constructor(object){
        this.id = object.id;
        this.name = object.name;
        this.language = object.language;
        this.status = object.status || null;
        this.genres = object.genres;
        this.summary = object.summary || object.name;
        this.url = object.url;
        if(object.image != null)
        this.image = 
        {
            medium: object.image.medium,
            original: object.image.original
        };
    }
}