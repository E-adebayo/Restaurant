
export class Restaurant {

    constructor(
        public id: number,
        public nom: string,
        public description: string,
        public adresse: string,
        public codepostal: string,
        public categorie: number,
        public likes: number,
        public img?: string
    ) {
        this.id = id
        this.nom = nom
        this.description = description
        this.adresse = adresse
        this.codepostal = codepostal
        this.categorie = categorie
        this.likes = likes
        if (img == undefined)
            img = `./assets/images/${this.id}.png`

    }
}