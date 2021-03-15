/* PERSONATGES */
class Personatge {
    constructor(nom) {
        this.maxvida = 1;
        this.nom = nom;
        this.vida = 1; //vida base
        this.atac = 1; //dany base
        this.defensa = 1; //escut
        this.destresa = 1; //capacitat d'aprofitar el dany base. Multiplicador. 
        this.agilitat = 1; // capacitat d'esquivar cops
        this.contratac = 1; // dany base de contraatac
        this.avatar = "img\personatges\person_1769656.jpg";// imatge representativa
        this.sound= "";// so associat a la trobada
    }

    getInfo() {
        return (this.nom + "<br>" + "vida: " + this.vida + "<br>" + "atac: " + this.atac + "<br>" + "defensa: " + this.defensa + "<br>" + "destresa: " + this.destresa)
    }
    getmaxvida() { return this.maxvida; }
    getNom() { return this.nom; }
    getVida() { return this.vida; }
    getAtac() { return this.atac; }
    getDefensa() { return this.defensa; }
    getDestresa() { return this.destresa; }
}

class Jugador extends Personatge {
    constructor(nom, vida, atac, defensa, destresa, avatar, maxvida) {
        super(nom);
        this.maxvida = super.getmaxvida() * maxvida;
        this.vida = super.getVida() * vida;
        this.atac = super.getAtac() * atac;
        this.defensa = super.getDefensa() * defensa;
        this.destresa = super.getDestresa() * destresa;
        this.avatar = avatar;
    }
}

class Llop extends Personatge {
    constructor() {
        super("el llop");
        this.maxvida = super.getmaxvida() * 20;
        this.vida = super.getVida() * 20;
        this.atac = super.getAtac() * 6;
        this.defensa = super.getDefensa() * 3;
        this.avatar = "img/personatges/llop.jpg";
        this.sound = "audio/DogGrowlingAndBarking.mp3"
    }
}
class Os extends Personatge {
    constructor() {
        super("ós");
        this.maxvida = super.getmaxvida() * 120;
        this.vida = super.getVida() * 120;
        this.atac = super.getAtac() * 12;
        this.defensa = super.getDefensa() * 5;
        this.avatar = "img/personatges/os.jpg";
        this.sound = "audio/BearGrowling.mp3";
    }
}

class Mosca extends Personatge {
    constructor() {
        super("la mosca");
        this.avatar = "img/personatges/mosca.jpg";
        this.sound = "audio/bee.mp3";
    }
}
/* LOCALITZACIONS */
class Pais {
    constructor(nom, imatges, mapes) {
        this.nom = nom;
        this.paisatges = [];
        this.mapes = [];
    }
}