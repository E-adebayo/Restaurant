export class Restaurateur {

    constructor(
        public id: number,
        public prenom: string,
        public nom: string,
        public email: string,
        public telephone: string,
        public password: string,
        public restaurant_id?: number
    ) {
        this.id = id
        this.prenom = prenom
        this.nom = nom
        this.email = email
        this.telephone = telephone
        this.password = password
        if (restaurant_id == undefined)
            restaurant_id = 0
    }
}