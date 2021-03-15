/* *VALORS GLOBALS * INICIALITZACIÓ* */

var isJugador;
var torn = 0;
var pais_actual;
var persona;
var enemic;
var num_llops;
var num_ossos;

var boto_inici = document.getElementById("btInici");
var boto_juga = document.getElementById("btJuga");
var boto_atac = document.getElementById("btAtacar");
var boto_fugir = document.getElementById("btFugir");
var boto_sigil = document.getElementById("btSigil");
var panell_persona = document.getElementById("jugador");
var panell_enemic = document.getElementById("enemic");
var blocInici = document.getElementById("inici");
var parraf_sortida = document.getElementById("sortida");
var parraf_torns = document.getElementById("torns");
var parraf_situacio = document.getElementById("situacio");
var inputRol = document.getElementById("mandarina");
var imatge_mapa = document.getElementById("mapa");
var imatge_lloc = document.getElementById("lloc");
var imatge_protagonista = document.getElementById("prota");
var imatge_npc = document.getElementById("npc");

inicialitza();

function inicialitza() {
    isJugador = false;
    boto_atac.hidden = true;
    boto_fugir.hidden = true;
    boto_sigil.hidden = true;
    boto_juga.disabled = true;
    num_llops = 0;
    num_ossos = 0;

    pais_actual = {
        nom: 'Terra Humida',
        paisatges: ['img/paisatges/Handpainted_02.jpg', 'img/paisatges/handpainted_07.jpg', 'img/paisatges/Realistic_valley_35.jpg', 'img/paisatges/handpainted_24.jpg', 'img/paisatges/Realistic_Mountains_05.jpg', 'img/paisatges/handpainted_12.jpg'],
        mapes: ['img/mapes/mapa01_0_inici.jpg', 'img/mapes/mapa01_1_.jpg', 'img/mapes/mapa01_2_inici.jpg']

    };

}

/*CREAR PERSONATGES*/

function creaProtagonista() {
    var nom = ""; vida = 1; atac = 1; defensa = 1; destresa = 1; avatar = "img\personatges\person_1769656.jpg";
    if (inputRol.checked) {
        nom = "Mandarina";
        vida = 101;
        atac = 6;
        defensa = 1;
        destresa = 2;
        avatar = "img/personatges/mandarina.jpg";
        imatge_protagonista.src = avatar;
    } else {
        nom = "Horno"
        vida = 130;
        atac = 9;
        defensa = 2;
        destresa = 1
        avatar = "img/personatges/horno.jpg";
        imatge_protagonista.src = avatar;
    }
    persona = new Jugador(nom, vida, atac, defensa, destresa, avatar);
    isJugador = true;
    panell_persona.innerHTML = persona.getInfo();
}

function creaMosca() {
    let mosca = new Mosca();
    panell_enemic.innerHTML = mosca.getInfo()
    parraf_sortida.innerHTML = "Et trobes una mosca. És al teu davant";
    imatge_npc.src = mosca.avatar;
}

function creaLlop() {
    enemic = new Llop();
    num_llops++;
    panell_enemic.innerHTML = enemic.getInfo();
    if (this.num_llops < 2) {
        parraf_sortida.innerHTML = "Veus un llop uns metres més enllà. Et mira...";
        imatge_npc.src = enemic.avatar;
    } else if (this.num_llops === 2) {
        parraf_sortida.innerHTML = "Tornes a trobar-te el mateix llop. Et segueix?";
        imatge_npc.src = enemic.avatar;
    } else {

        imatge_npc.src = "img/personatges/llop2.jpg";
        parraf_sortida.innerHTML = "El llop ataca! Et produeix " + ataca(enemic, persona) + " danys.";
    }

}
function creaOs() {
    let os = new Os();
    num_ossos++;
    panell_enemic.innerHTML = os.getInfo();
    if (this.num_ossos < 2) {
        parraf_sortida.innerHTML = "Et trobes un gran ós.";
    } else {
        parraf_sortida.innerHTML = "Trobes unaltre ós.";
    }

    imatge_npc.src = os.avatar;

}
function creaNores() {
    parraf_sortida.innerHTML = "Passes un dia tranquil.";
    imatge_npc.src = imatge_lloc.src;
}

/* CREAR PAÏSOS */

function creaPais(nom, imatges) {
    let pais = new Pais(nom, imatges);
    return pais;
}

/* INICI */
function deshabilitaInici() {
    boto_atac.hidden = false;
    boto_fugir.hidden = false;
    boto_sigil.hidden = false;
    boto_atac.disabled = true;
    boto_fugir.disabled = true;
    boto_sigil.disabled = true;
    boto_inici.disabled = true;
    blocInici.style.display = "none";
    boto_juga.disabled = false;
}

function iniciPartida() {
    creaProtagonista();
    deshabilitaInici()

    imatge_lloc.src = pais_actual.paisatges[0];
    imatge_mapa.src = pais_actual.mapes[0];
    parraf_sortida.innerHTML = "Hola, " + persona.nom + ". Arribaràs al refugi en unes 10 jornades!";
    parraf_situacio.innerHTML = "Et trobes a " + pais_actual.nom;
    parraf_torns.innerHTML = "Ets aquí";

}

/* MECÀNIQUES */

function ataca(atacant, atacat) {
    modeBatalla(true);

    //atac
    var cop = Math.floor(Math.random() * atacant.atac + 1);
    var dany = cop * atacant.destresa;
    atacat.vida = atacat.vida - dany;
    console.log("dany: " + dany + "persona: " + persona.vida + "enemic: " + enemic.vida);

    // vista
    panell_persona.innerHTML = persona.getInfo();
    panell_enemic.innerHTML = enemic.getInfo();
    return dany;
}
function ataco() {

    parraf_sortida.innerHTML = "El cop produeix " + ataca(this.persona, this.enemic) + " danys a " + enemic.nom + ".";
    if (enemic.vida <= 0) {
        parraf_sortida.innerHTML = enemic.nom + " ha mort."
        if (enemic.nom === "el llop") {
            num_llops = 0;
        } else if (enemic.nom === "ós") {
            num_ossos = 0;
        }
        modeBatalla(false);
    } else{
        setTimeout(function(){
            //do what you need here
            parraf_sortida.innerHTML = enemic.nom + " mossega i et fa "+ ataca(this.enemic, this.persona) + " danys.";
        }, 3000);
        
    }
}
function juga() {
    this.torn++;
    let queden = 10 - this.torn;
    if (this.torn < 10) {
        imatge_mapa.src = pais_actual.mapes[1];
        if (torn % 2 === 0) {
            imatge_lloc.src = pais_actual.paisatges[torn / 2];
        }
        creaEvent();
    } else {
        parraf_sortida.innerHTML = "has arribat al refugi!!";
        imatge_lloc.src = pais_actual.paisatges[5];
        imatge_npc.src = pais_actual.paisatges[5];

    }
    if ((queden > 0) && (queden < 10)) {
        parraf_torns.innerHTML = "queden " + queden + " jornades per arribar-hi";
    } else {
        parraf_torns.innerHTML = "Has arribat";
        imatge_mapa.src = pais_actual.mapes[2];
    }

}

function creaEvent() {
    var opcions = 4;
    var num = Math.floor(Math.random() * opcions + 1);
    //num = 2;//<------
    //console.log(num);
    switch (num) {
        case 1:
            parraf_sortida.innerHTML = "ja queda menys...";
            creaNores();
            break;
        case 2:
            parraf_sortida.innerHTML = "un llop!!!";
            creaLlop();
            break;
        case 3:
            parraf_sortida.innerHTML = "només és una mosca";
            creaMosca();
            break;
        case 4:
            parraf_sortida.innerHTML = " un ós";
            creaOs();
            break;
        default:
            parraf_sortida.innerHTML = "Has avançat uns metres";
            break;
    }
}

function fuig() {

}

/* USER INTERFACE */
function modeBatalla(mode) {
    if (mode) {
        boto_juga.disabled = true;
        boto_atac.disabled = false;
        boto_fugir.disabled = false;

    } else {
        boto_juga.disabled = false;
        boto_atac.disabled = true;
        boto_fugir.disabled = true;
    }
}
