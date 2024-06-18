const state = {
    jegyek: []
}


function szinhazTerem () {

    const max_sor = 15;
    const max_oszlop = 24;


    for (let sor = 0; sor < max_sor; sor++) {

        state.jegyek.push([]);

        if (sor + 1 === 1) document.write(`<span class="jegyarak">7500.- Ft</span>`);
        if (sor + 1 === 6) document.write(`<span class="jegyarak">5900.- Ft</span>`);
        if (sor + 1 === 11) document.write(`<span class="jegyarak">4500.- Ft</span>`);

        document.write(`<span class="sor">${sor + 1}.</span>`)

        for (let oszlop = 0; oszlop < max_oszlop; oszlop++) {

            state.jegyek[sor].push(Math.floor(Math.random() * 2)); 

            document.write(`<span class="jegyek ${state.jegyek[sor][oszlop] === 1 ? "foglalt" : "szabad"}">${oszlop + 1}</span>`);
        }

        document.write(`<br>`);
        if((sor + 1)%5==0) document.write("<hr size=1 color=#880000>")
    }


}



szinhazTerem();

/*Készítsen programot, mely megválaszolja az alábbi kérdéseket!
1. Hány szabad hely van még?
2. A jegyek hány százaléka kelt már el?
3. Mennyi az eddigi jegyárbevétel?
4. Melyik árkategóriából adták el a legtöbb jegyet?
5. Van-e olyan sor, ahol már egyetlen szabad hely sincs?
6. Van-e még valahol négy szabad hely egymás mellett?
7. Hány párnak tudnak még jegyet eladni? (Értelemszerűen mindenki a párja mellett akar ülni.)
8. Egy néző valamely sor szélén szeretne ülni. E lehetséges helyek közül a legolcsóbbat szeretné kérni, ha válogathat. Az adott árkategórián belül viszont minél előrébb szeretné kérni a jegyét. Hová tudunk neki jegyet adni? */

//1. Hány szabad hely van még?

function szabadHely() {

    let szabad_jegy = 0;
    const max_oszlop = state.jegyek[0].length;
    const max_sor = state.jegyek.length;

    for (let sor = 0; sor < max_sor; sor++) {
        for (let oszlop = 0; oszlop < max_oszlop; oszlop++) {
            if (state.jegyek[sor][oszlop] === 0) {
                szabad_jegy++;
            }
        }
    }

    return szabad_jegy;
}

const szabadJegyekSzama = szabadHely();

document.write(`<span class="feladat">Összesen ${szabadJegyekSzama} szabad hely van még.</span>`);



//2. A jegyek hány százaléka kelt már el?

function jegyekSzazalek(szabad_jegyek) {

    const jegyek_szama = state.jegyek[0].length * state.jegyek.length;
    const elkelt_jegyek = (jegyek_szama - szabad_jegyek);

    return (elkelt_jegyek / jegyek_szama) * 100;

}

const elekltJegyek = jegyekSzazalek(szabadJegyekSzama).toFixed(1);

document.write(`<span class="feladat">A jegyek ${elekltJegyek}% kelt már el.</span>`);

//3. Mennyi az eddigi jegyárbevétel?

function osszBevetel() {

    const max_sor = state.jegyek.length;
    const max_oszlop = state.jegyek[0].length;
    let osszes_bevetel = 0;
    let jegyar = 0;

    for (let sor = 0; sor < max_sor; sor++) {

        if (sor < 5) {
            jegyar = 7500;
        } else if (sor < 10) {
            jegyar = 5900;
        } else {
            jegyar = 4500;
        }

        for (let oszlop = 0; oszlop < max_oszlop; oszlop++) {
            if (state.jegyek[sor][oszlop] === 1) {
                osszes_bevetel += jegyar;
            }
        }

    }

    return osszes_bevetel;
}

const osszesBevetel = osszBevetel();

document.write(`<span class="feladat">Az összes bevétel ${osszesBevetel} Ft</span>`);


//4. Melyik árkategóriából adták el a legtöbb jegyet?

function maxKategoria() {

    const max_sor = state.jegyek.length;
    const max_oszlop = state.jegyek[0].length;
    let elso = 0, masodik = 0, harmadik = 0;

    for (let sor = 0; sor < max_sor; sor++) {

        for (let oszlop = 0; oszlop < max_oszlop; oszlop++) {

            if (sor < 5 && state.jegyek[sor][oszlop] === 1) {
                elso++;
            }else if (sor < 10 && state.jegyek[sor][oszlop] === 1) {
                masodik++;
            } else if (sor < 15 && state.jegyek[sor][oszlop] === 1) {
                harmadik++;
            }
         
        }

    }

    console.log(`${elso} ${masodik} ${harmadik}`);
    
    if (elso > masodik && elso > harmadik) {
        document.write(`<span class="feladat">7500 ft kategóriábol fogyott a legtöbb összesen ${elso}db</span>`)
    } else if (masodik > elso && masodik > harmadik) {
        document.write(`<span class="feladat">5900 ft kategóriábol fogyott a legtöbb összesen ${masodik}db</span>`)
    } else if (harmadik > elso && harmadik > masodik) {
        document.write(`<span class="feladat">4500 ft kategóriábol fogyott a legtöbb összesen ${harmadik}db</span>`)
    }

}

maxKategoria();

//5. Van-e olyan sor, ahol már egyetlen szabad hely sincs?

function sorokatVizsgal () {

    const max_sor = state.jegyek.length;
    const max_oszlop = state.jegyek[0].length;
    let foglalt;

    for (let sor = 0; sor < max_sor; sor++) {
         foglalt = true;

        for (let oszlop = 0; oszlop < max_oszlop; oszlop++) {
            if (state.jegyek[sor][oszlop] === 0) {
                foglalt = false;
                break;
            }
        }

        if (foglalt) {
            break;
        }
    }

    return foglalt;
}


    if (sorokatVizsgal()) {
        document.write(`<span class="feladat">Van oylan sor, ahol már egyetlen szabad hely sincs!</span>`);
    } else {
        document.write(`<span class="feladat">Nincs olyan sor, ahol már egyetlen szabad hely sincs!</span>`);
    }

    //Van-e még valahol négy szabad hely egymás mellett?

    function negySzabadHely() {


        const max_sor = state.jegyek.length;
        const max_oszlop = state.jegyek[0].length;
        let db = null;
        let szabad_hely = false;

        for (let sor = 0; sor < max_sor; sor++) {
            db = 0;

            for (let oszlop  = 0; oszlop < max_oszlop; oszlop++) {
                if (state.jegyek[sor][oszlop] === 0) {
                    db++;
                } else {
                    db = 0;
                }

                if (db === 4) {
                    szabad_hely = true;
                    break;
                }
            }

            if (db >= 4) {
                break;
            }
        }

        return szabad_hely;
    }


    if (negySzabadHely()) {
        document.write("<span>A sorok között van legalább négy szabad hely egymás mellett.</span>")
    } else {
        document.write("<span>A sorok közzöt nincs négy szabad hely egymás mellett.</span>");
    }

    //7. Hány párnak tudnak még jegyet eladni? (Értelemszerűen mindenki a párja mellett akar ülni.)

    function parosJegyek() {

        let max_sor = state.jegyek.length;
        let max_oszlop = state.jegyek[0].length;
        let paros_jegyek = 0;

        for (let sor = 0; sor < max_sor; sor++) {
            for (let oszlop = 0; oszlop < max_oszlop; oszlop++) {
                if (state.jegyek[sor][oszlop] === 0 && state.jegyek[sor][oszlop + 1] === 0) {
                    paros_jegyek++;
                    oszlop++;
                }
            }
        }

        return paros_jegyek;
    }


    document.write(`<span class="feladat">Összesen ${parosJegyek()}db páros jegyet tudunk még eladni.</span>`);


    //8. Egy néző valamely sor szélén szeretne ülni. E lehetséges helyek közül a legolcsóbbat szeretné kérni, ha válogathat. Az adott árkategórián belül viszont minél előrébb szeretné kérni a jegyét. Hová tudunk neki jegyet adni? */




    function sorokSzele() {


        const max_oszlop = state.jegyek[0].length;
        let max_sor = state.jegyek.length;
        let sor = 10;
        let x = null;

        while( max_sor > 0) {

            

         for (sor; sor < max_sor; sor++) {
            /*
            console.log("uj sor" + sor);
                    console.log(state.jegyek[sor][0] + " " + state.jegyek[sor][max_oszlop - 1]);
        } */

                    if (state.jegyek[sor][0] === 0 || state.jegyek[sor][max_oszlop - 1] === 0) {
                        x = sor;
                        break;
                    }
                }

        max_sor -= 5;
        sor -= 10;

        if (x !== null) {
            break;
        }

    }

    return x + 1;

    }


    document.write(`<span class="feladat">${sorokSzele()}. sorban tud legközelebb helyet foglalni.</span>`);



