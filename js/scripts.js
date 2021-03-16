/* *VALORS GLOBALS * INICIALITZACIÓ* */

var isJugador;
var torn = 0;
var pais_actual;
var persona;
var enemic;
var interacció; // valor per indicar quina interacció 
var num_llops;
var num_ossos;
var num_papallones;
var num_forats;
var num_moscas;

var boto_inici = document.getElementById("btInici");
var boto_juga = document.getElementById("btJuga");
var boto_atac = document.getElementById("btAtacar");
var boto_fugir = document.getElementById("btFugir");
var boto_mira = document.getElementById("btMirar");
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
var meter_prota = document.getElementById("meterprota");
var meter_enemic = document.getElementById("meterenemic");
var audio = document.getElementById("audio");

inicialitza();

function inicialitza() {
    isJugador = false;
    boto_atac.hidden = true;
    boto_fugir.hidden = true;
    boto_mira.hidden = true;
    boto_juga.disabled = true;
    meter_prota.hidden = true;
    meter_enemic.hidden = true;
    num_llops = 0; num_ossos = 0; num_papallones = 0; num_forats = 0; num_moscas = 0;

    pais_actual = {
        nom: 'Terra Humida',
        paisatges: ['img/paisatges/Handpainted_02.jpg', 'img/paisatges/handpainted_07.jpg', 'img/paisatges/Realistic_valley_35.jpg', 'img/paisatges/handpainted_24.jpg', 'img/paisatges/Realistic_Mountains_05.jpg', 'img/paisatges/handpainted_12.jpg'],
        mapes: ['img/mapes/mapa01_0_inici.jpg', 'img/mapes/mapa01_1_.jpg', 'img/mapes/mapa01_2_inici.jpg']

    };

}

/*CREAR PERSONATGES*/

function creaProtagonista() {
    var nom = ""; vida = 1; atac = 1; defensa = 1; destresa = 1; maxvida = 1; avatar = "img\personatges\person_1769656.jpg";
    if (inputRol.checked) {
        nom = "Mandarina";
        vida = 101;
        atac = 6;
        defensa = 1;
        destresa = 2;
        avatar = "img/personatges/mandarina.jpg";
        maxvida = 100;
        imatge_protagonista.src = avatar;
    } else {
        nom = "Horno"
        vida = 130;
        atac = 9;
        defensa = 2;
        destresa = 1
        avatar = "img/personatges/horno.jpg";
        maxvida = 130;
        imatge_protagonista.src = avatar;
    }
    persona = new Jugador(nom, vida, atac, defensa, destresa, avatar, maxvida);
    isJugador = true;
    panell_persona.innerHTML = persona.getInfo();
    mostraVidaProta();
}

function creaMosca() {
    num_moscas++;
    enemic = new Mosca();
    panell_enemic.innerHTML = enemic.getInfo();
    sona(this.enemic.sound);

    if (this.num_moscas < 2) {
        parraf_sortida.innerHTML = "Et trobes una mosca. És al teu davant";

    } else {
        parraf_sortida.innerHTML = "Hi ha moltes mosques.";
    }

    imatge_npc.src = enemic.avatar;
    mostraVidaEnemic();

}

function creaLlop() {
    enemic = new Llop();
    num_llops++;
    panell_enemic.innerHTML = enemic.getInfo();

    if (this.num_llops < 2) {
        parraf_sortida.innerHTML = "Veus un llop uns metres més enllà. Et mira...";
        imatge_npc.src = enemic.avatar;
        sona("audio/nature026.mp3");
    } else if (this.num_llops === 2) {
        parraf_sortida.innerHTML = "Tornes a trobar-te el mateix llop. Et segueix?";
        sona(this.enemic.sound);
        imatge_npc.src = enemic.avatar;
    } else {
        imatge_npc.src = "img/personatges/llop2.jpg";
        parraf_sortida.innerHTML = "El llop ataca! Et produeix " + ataca(enemic, persona) + " danys.";
        sona("audio/WolfGrowlingFiercely.mp3");
    }
    mostraVidaEnemic();
}

function creaOs() {
    enemic = new Os();
    num_ossos++;
    panell_enemic.innerHTML = enemic.getInfo();
    sona(this.enemic.sound);
    if (this.num_ossos < 2) {
        parraf_sortida.innerHTML = "Et trobes un gran ós.";
    } else if (this.num_osos === 2) {
        parraf_sortida.innerHTML = "Trobes unaltre ós.";
    } else {
        parraf_sortida.innerHTML = "Hi ha molts óssos. És perillós...";
    }

    imatge_npc.src = enemic.avatar;
    mostraVidaEnemic();
}

function creaPapallona() {
    enemic = new Papallona();
    num_papallones++;
    panell_enemic.innerHTML = enemic.getInfo();
    sona(this.enemic.sound);
    imatge_npc.src = enemic.avatar;
    if (this.num_papallones < 2) {
        parraf_sortida.innerHTML = "La papallona t'explica que una dona que va marxar en busca d'una vida més desconeguda";
    } else {
        parraf_sortida.innerHTML = "La vida és plena!";
        this.persona.vida = this.persona.maxvida;
    }
}

function creaForat() {
    enemic = new Forat();
    num_forats++;
    panell_enemic.innerHTML = enemic.getInfo();
    sona(this.enemic.sound);
    imatge_npc.src = enemic.avatar;
    if (this.num_forats < 2) {
        parraf_sortida.innerHTML = "Trobes un forat.";
        interacció = "forat_cerillas";
        mode('interaccio');


    } else {
        parraf_sortida.innerHTML = "El forat és molt profund.";
    }
}
function creaNores() {
    sona("audio/rainforest_ambience.mp3");
    panell_enemic.innerHTML = "";
    parraf_sortida.innerHTML = "Passes un dia tranquil.";
    imatge_npc.src = imatge_lloc.src;

    this.meter_enemic.hidden = true;

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
    boto_mira.hidden = false;
    boto_atac.disabled = true;
    boto_fugir.disabled = true;
    boto_mira.disabled = true;
    boto_inici.disabled = true;
    blocInici.style.display = "none";
    boto_juga.disabled = false;
    meter_prota.hidden = false;
}

function iniciPartida() {
    creaProtagonista();
    deshabilitaInici();
    this.audio.play();
    imatge_npc.src = "img/ruido.gif";

    imatge_lloc.src = pais_actual.paisatges[0];
    imatge_mapa.src = pais_actual.mapes[0];
    parraf_sortida.innerHTML = "Hola, " + persona.nom + ". Arribaràs al refugi en unes 10 jornades!";
    parraf_situacio.innerHTML = "Et trobes a " + pais_actual.nom;
    parraf_torns.innerHTML = "Ets aquí";

}

/* MECÀNIQUES */

function ataca(atacant, atacat) {
    //atac
    var cop = Math.floor(Math.random() * atacant.atac + 1);
    var dany = cop * atacant.destresa;
    atacat.vida = atacat.vida - dany;
    console.log("dany: " + dany + "\npersona: " + persona.vida + " enemic: " + enemic.vida);

    // vista
    panell_persona.innerHTML = persona.getInfo();
    panell_enemic.innerHTML = enemic.getInfo();
    mostraVidaProta();
    mostraVidaEnemic();
    mode('batalla');
    return dany;
}
function ataco() {

    parraf_sortida.innerHTML = "El cop produeix " + ataca(this.persona, this.enemic) + " danys a " + enemic.nom + ".";
    mode('noaccions');
    sona("audio/jab.mp3");
    if (enemic.vida <= 0) { //mor
        parraf_sortida.innerHTML = enemic.nom + " ha mort."
        if (enemic.nom === "el llop") {
            num_llops = 0;
        } else if (enemic.nom === "ós") {
            num_ossos = 0;
        }
        mode('aventura');
    } else { // contra ataca
        setTimeout(function () {
            sona("audio/dogbite.mp3");
            parraf_sortida.innerHTML = enemic.nom + " mossega i et fa " + ataca(this.enemic, this.persona) + " danys.";
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
        sona("audio/Car Driving.mp3");
        panell_enemic.innerHTML = "has arribat al refugi!!";
        parraf_sortida.innerHTML = "què passarà a partir d'ara?";
        meter_enemic.hidden = true;
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
    var opcions = 6;
    var num = Math.floor(Math.random() * opcions + 1);
    //num = 2;//<------ llops continus
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
        case 5:
            parraf_sortida.innerHTML = " hi ha un forat";
            creaForat();
            break;
        case 6:
            parraf_sortida.innerHTML = " una papallona t'explica una història local";
            creaPapallona();
            break;
        default:
            parraf_sortida.innerHTML = "Has avançat uns metres";
            break;
    }
}

function fuig() {
    parraf_sortida.innerHTML = "No pots fugir";

}
function mira() {
    switch (interacció) {
        case "forat_cerillas":
            parraf_sortida.innerHTML = " Una 'caja de cerillas' . Et servirà per fer fotos";
            break;
        default:
            parraf_sortida.innerHTML = " El paisatge és preciós";

            break;
    }
    mode('aventura');

}

/* USER INTERFACE */
function mode(nom) {
    switch (nom) {
        case 'batalla':
            boto_atac.disabled = false;
            boto_fugir.disabled = false;
            boto_mira.disabled = true;
            boto_juga.disabled = true;
            break;
        case 'noaccions':
            boto_atac.disabled = true;
            boto_fugir.disabled = true;
            boto_mira.disabled = true;
            boto_juga.disabled = true;
            break;
        case 'interaccio':
            boto_juga.disabled = true;
            boto_mira.disabled = false;
            break;
        case 'aventura':
            boto_atac.disabled = true;
            boto_fugir.disabled = true;
            boto_mira.disabled = true;
            boto_juga.disabled = false;
            break;
        default:

            break;
    }
}

function mostraVidaProta() {
    this.meter_prota.hidden = false;
    this.meter_prota.max = this.persona.maxvida;
    this.meter_prota.low = this.persona.maxvida * 0.4;
    this.meter_prota.high = this.persona.maxvida * 0.9;
    this.meter_prota.optimum = this.persona.maxvida;
    this.meter_prota.value = this.persona.vida;
}
function mostraVidaEnemic() {
    this.meter_enemic.hidden = false;
    this.meter_enemic.max = this.enemic.maxvida;
    this.meter_enemic.low = this.enemic.maxvida * 0.4;
    this.meter_enemic.high = this.enemic.maxvida * 0.9;
    this.meter_enemic.optimum = this.enemic.maxvida;
    this.meter_enemic.value = this.enemic.vida;
}
function sona(src) {
    this.audio.src = src;
    this.audio.play();
}
