export class Series {
    constructor(object) {
        this.id = object.id;
        this.name = object.name;
        this.language = object.language;
        this.status = object.status || null;
        this.genres = object.genres;
        this.summary = object.summary || object.name;
        this.officialSite = object.officialSite || null;

        this.image = object.image ? {
            medium: object.image.medium,
            original: object.image.original
        } : null;

        this.premiered = object.premiered || null;
        this.ended = object.ended || null;
        this.rating = object.rating || null;
    }
}