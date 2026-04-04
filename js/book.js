let daftar = [];

let transaksi = [];

let editIndex = null;

// nambah buku
function tambah() {
  let judul = document.getElementById("judul").value.toUpperCase();
  let penulis = document.getElementById("penulis").value;
  let genre = document.getElementById("genre").value;
  let harga = Number(document.getElementById("harga").value);
  let stok = Number(document.getElementById("stok").value);
  let tanggal = document.getElementById("tanggalterbit").value;
  let rating = document.getElementById("bintang").value;
  let fotoBuku = document.getElementById("foto");

  if (!judul) {
    alert("tolong masukan judul terlebih dahulu");
    return;
  } else if (!penulis) {
    alert("tolong masukan penulis terlebih dahulu");
    return;
  } else if (!genre) {
    alert("tolong masukan genre terlebih dahulu");
    return;
  } else if (!harga) {
    alert("tolong masukan harga terlebih dahulu");
    return;
  } else if (!stok) {
    alert("tolong masukan stok buku terlebih dahulu");
    return;
  } else if (!rating) {
    alert("tolong masukan rating buku terlebih dahulu");
    return;
  } else if (!tanggal) {
    alert("tolong masukan tanggal penerbit terlebih dahulu");
    return;
  } else if (!fotoBuku.files[0]) {
    alert("masukan foto buku terlebih dahulu");
    return;
  }

  let hasilRating = "";

  rating = Number(rating);

  if (rating > 5) {
    rating = 5;
  }
  if (rating < 1) {
    rating = 1;
  }

  for (let i = 0; i < rating; i++) {
    hasilRating += "⭐";
  }

  let fileFotonya = fotoBuku.files[0];
  let urlSementara = URL.createObjectURL(fileFotonya);

  // let data = {
  //   judul: judul,
  //   penulis: penulis,
  //   genre: genre,
  //   harga: harga,
  //   stok: stok,
  //   tanggal: tanggal,
  //   rating: hasilRating,
  // };

  if (editIndex !== null) {
    daftar[editIndex] = {
      judul,
      penulis,
      genre,
      harga,
      stok,
      tanggal,
      rating: hasilRating,
      foto: urlSementara,
    };
    editIndex = null;
    alert("update berhasil!");
    document.getElementById("Tambah").innerText = "Tambah";
  } else {
    let data = {
      judul,
      penulis,
      genre,
      harga,
      stok,
      tanggal,
      rating: hasilRating,
      foto: urlSementara,
    };
    daftar.push(data);

    alert("data telah berhasil di masukan!");
  }

  clearForm();
  render();
}

// hapus semua
function ClearAll() {
  let hapus = confirm("apakah anda akan menghapus semuanya?");
  if (hapus) {
    alert("Menghapus data berhasil !");
    daftar = [];
    transaksi = [];
    render();
  } else {
    alert("Menghapus data dibatalkan !");
    render();
  }
}

//hapus yang ada di form biar ga berantakan history nya
function clearForm() {
  document.getElementById("judul").value = "";
  document.getElementById("penulis").value = "";
  document.getElementById("genre").value = "";
  document.getElementById("harga").value = "";
  document.getElementById("stok").value = "";
  document.getElementById("tanggalterbit").value = "";
  document.getElementById("bintang").value = "";
  document.getElementById("foto").value = "";
}

//untuk munculin buku / update lagi buku semua;
function render() {
  const listBuku = document.getElementById("listBuku");
  const listBeli = document.getElementById("listBeli");

  let hasilListBuku = daftar.map(
    (b, i) => `
        <tr>
          <th>${i + 1}</th>
          <th><img src="${b.foto}" width="50"></th>
          <th>${b.judul}</th>
          <th>${b.penulis}</th>
          <th>${b.genre}</th>
          <th>${b.rating}</th>
          <th>${b.tanggal}</th>
          <th>Rp.${b.harga.toLocaleString()}</th>  
          <th>${b.stok}</th>
          <th><button onclick="editBook(${i})" class="btnListBuku"><a href="#update">Edit</a></button></th>
          <th><button onclick="deleteBook(${i})" class="btnListBuku">Hapus</button></th>
        </tr>`,
  );

  listBuku.innerHTML = hasilListBuku.join("");

  let hasilListBeli = daftar.map(
    (b, i) => `
    <div class="card-js" style="width: 18rem;">
        <div class="card-body">
          <img src="${b.foto}" class="card-img-top" alt="...">
          <h4 class="card-title">${b.judul}</h4>
          <h5>${b.penulis}</h5>
          <p>Genre : ${b.genre}</p>
          <p>Rilis : ${b.tanggal}</p>
          <p>${b.rating}</p>
          <p>Rp.${b.harga.toLocaleString()}</p>
          <p>${b.stok}</p>
          <button onclick="beliBook(${i})" class="btn"> ${b.stok === 0 ? "Sold Out" : "Beli"}</button>

       </div>
    </div>`,
  );
  listBeli.innerHTML = hasilListBeli.join("");

  // ini buat yang tersedia dan terjual
  let totalStok = daftar.reduce((total, b) => total + b.stok, 0);
  let totalJual = transaksi.length;

  document.getElementById("tersedia").innerHTML = `<h3>${totalStok}</h3>`;
  document.getElementById("terjual").innerHTML = `<h3>${totalJual}</h3>`;

  //tampilan struk
  tampilkanStruk();
}

// untuk edit buku
function editBook(index) {
  const b = daftar[index];

  document.getElementById("judul").value = b.judul;
  document.getElementById("penulis").value = b.penulis;
  document.getElementById("genre").value = b.genre;
  document.getElementById("bintang").value = b.rating;
  // document.getElementById("foto").value = b.foto;
  document.getElementById("harga").value = b.harga;
  document.getElementById("stok").value = b.stok;
  document.getElementById("tanggalterbit").value = b.tanggal;

  editIndex = index;
  document.getElementById("Tambah").innerText = "Update";
}

// untuk beli buku
function beliBook(index) {
  let buku = daftar[index];

  if (buku.stok > 0) {
    buku.stok -= 1;

    let dataTransaksi = {
      id: "TRX-" + Math.floor(Math.random() * 10000),
      judul: buku.judul,
      genre: buku.genre,
      tanggalTerbit: buku.tanggal,
      harga: buku.harga,
      tanggal: new Date().toLocaleString(),
    };

    transaksi.push(dataTransaksi);
    alert("Buku berhasil dibeli!");
  } else {
    alert("Stok habis!");
    document.getElementById("Beli").innerText = "Sold out!";
  }

  render();
}

//untuk delete buku 1 per 1
function deleteBook(index) {
  alert("anda berhasil mengehapus data ke-" + `${index + 1}`);
  daftar.splice(index, 1);
  render();
}

//untuk tampilin s truk
function tampilkanStruk() {
  let container = document.getElementById("strukTransaksi");
  if (!container) return;

  container.innerHTML = "";

  transaksi.forEach((t) => {
    container.innerHTML += `
      <div class="struk">
        <b>ID   : ${t.id}</b><br>
        Judul   : ${t.judul}<br>
        Genre   : ${t.genre}<br>
        tanggal terbit: ${t.tanggalTerbit}<br>
        Harga   :  Rp ${t.harga.toLocaleString()}<br>
        Tanggal :  ${t.tanggal}
      </div>
    `;
  });
}

// update
render();

let music = document.getElementById("bgMusic");
let btn = document.getElementById("musicBtn");

function toggleMusic() {
  if (music.paused) {
    music.play();
    btn.innerHTML = "||";
  } else {
    music.pause();
    btn.innerHTML = "▷";
  }
}
