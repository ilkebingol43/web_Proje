function notAl(input) {
    if (input.value === "") {
        return null;
    }

    return Number(input.value);
}

function sinavEkle() {
    let liste = document.getElementById("liseSinavlari");
    let satir = document.createElement("div");
    let sira = liste.children.length + 1;

    satir.className = "sinav-satiri";
    satir.innerHTML =
        "<label>" + sira + ". Sinav Notu" +
        "<input class='lise-not' type='number' min='0' max='100'>" +
        "</label>" +
        "<button class='sil-buton' type='button' onclick='satirSil(this)'>Sil</button>";

    liste.appendChild(satir);
}

function satirSil(buton) {
    buton.parentElement.remove();
}

function liseHesapla() {
    let notlar = document.querySelectorAll(".lise-not");
    let toplam = 0;
    let adet = 0;

    for (let i = 0; i < notlar.length; i++) {
        let not = notAl(notlar[i]);

        if (not !== null) {
            toplam = toplam + not;
            adet++;
        }
    }

    if (adet === 0) {
        document.getElementById("liseSonuc").innerHTML = "Lutfen en az bir sinav notu giriniz.";
        return;
    }

    let ortalama = toplam / adet;
    let durum = ortalama >= 50 ? "Gecti" : "Kaldi";

    document.getElementById("liseSonuc").innerHTML =
        "Sinav Sayisi: " + adet + "<br>" +
        "Ortalama: " + ortalama.toFixed(2) + "<br>" +
        "Durum: " + durum;
}

function dersEkle() {
    let liste = document.getElementById("universiteDersleri");
    let satir = document.createElement("div");

    satir.className = "ders-satiri";
    satir.innerHTML =
        "<label>Ders Adi<input class='ders-adi' type='text'></label>" +
        "<label>Kredi<input class='ders-kredi' type='number' min='1' value='3'></label>" +
        "<label>Vize<input class='ders-vize' type='number' min='0' max='100'></label>" +
        "<label>Final<input class='ders-final' type='number' min='0' max='100'></label>" +
        "<button class='sil-buton' type='button' onclick='satirSil(this)'>Sil</button>";

    liste.appendChild(satir);
}

function puanBilgisi(not) {
    if (not >= 90) {
        return { harf: "AA", puan: 4.0 };
    } else if (not >= 85) {
        return { harf: "BA", puan: 3.5 };
    } else if (not >= 80) {
        return { harf: "BB", puan: 3.0 };
    } else if (not >= 70) {
        return { harf: "CB", puan: 2.5 };
    } else if (not >= 60) {
        return { harf: "CC", puan: 2.0 };
    } else if (not >= 50) {
        return { harf: "DC", puan: 1.5 };
    } else if (not >= 45) {
        return { harf: "DD", puan: 1.0 };
    } else {
        return { harf: "FF", puan: 0.0 };
    }
}

function universiteHesapla() {
    let dersler = document.querySelectorAll(".ders-satiri");
    let vizeYuzde = Number(document.getElementById("vizeYuzde").value);
    let finalYuzde = Number(document.getElementById("finalYuzde").value);
    let toplamKredi = 0;
    let toplamPuan = 0;
    let sonucYazisi = "<strong>Ders Sonuclari</strong><ul class='sonuc-listesi'>";

    if (dersler.length === 0) {
        document.getElementById("universiteSonuc").innerHTML = "Lutfen en az bir ders ekleyiniz.";
        return;
    }

    for (let i = 0; i < dersler.length; i++) {
        let dersAdi = dersler[i].querySelector(".ders-adi").value;
        let kredi = notAl(dersler[i].querySelector(".ders-kredi"));
        let vize = notAl(dersler[i].querySelector(".ders-vize"));
        let finalNotu = notAl(dersler[i].querySelector(".ders-final"));

        if (kredi === null || vize === null || finalNotu === null) {
            document.getElementById("universiteSonuc").innerHTML = "Lutfen tum derslerin kredi, vize ve final alanlarini doldurunuz.";
            return;
        }

        if (dersAdi === "") {
            dersAdi = "Ders " + (i + 1);
        }

        let basariNotu = (vize * vizeYuzde / 100) + (finalNotu * finalYuzde / 100);
        let bilgi = puanBilgisi(basariNotu);

        toplamKredi = toplamKredi + kredi;
        toplamPuan = toplamPuan + (kredi * bilgi.puan);

        sonucYazisi = sonucYazisi +
            "<li>" + dersAdi + ": " +
            basariNotu.toFixed(2) + " / " +
            bilgi.harf + " / " +
            bilgi.puan.toFixed(2) + " puan</li>";
    }

    let agno = toplamPuan / toplamKredi;
    sonucYazisi = sonucYazisi + "</ul><strong>AGNO: " + agno.toFixed(2) + "</strong>";

    document.getElementById("universiteSonuc").innerHTML = sonucYazisi;
}

window.onload = function () {
    if (document.getElementById("liseSinavlari")) {
        sinavEkle();
        sinavEkle();
    }

    if (document.getElementById("universiteDersleri")) {
        dersEkle();
        dersEkle();
    }
};
