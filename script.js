let daftar = [];
let transaksi =[];
let editIndex = null;

function tambah() {
  let judul = document.getElementById("judul").value;
  let penulis = document.getElementById("penulis").value;
  let genre = document.getElementById("genre").value;
  let harga = Number(document.getElementById("harga").value);
  let stok = document.getElementById("stok").value;

  if (!judul) {
    alert("tolong masukan judul terlebih dahulu");
    return;
  } else if (!penulis) {
    alert("tolong masukan penulis terlebih dahulu");
    return;
  } else if (!genre)  {
    alert("tolong masukkan genre terlebih dahulu");
    return;
  } else if (!harga) {
    alert("tolong masukan harga terlebih dahulu");
    return;
  } else if (!stok) {
    alert("tolong masukan stok buku terlebih dahulu");
    return;
  }

  let data = {
    judul: judul,
    penulis: penulis,
    genre: genre,
    harga: harga,
    stok: stok,
  };

  if (editIndex !== null) {
    daftar[editIndex] = { judul, penulis, genre, harga, stok };
    editIndex = null;
    document.getElementById("Tambah").innerText = "Tambah";
  } else {
    daftar.push(data);
  }

  clearForm();
  render();

}

function render() {
  const listBuku = document.getElementById("listBuku");
  const listBeli = document.getElementById("listBeli");

  listBuku.innerHTML = daftar
    .map((b, i) => `
        <div class="card-js">
          <h3>${b.judul}</h3>
          <p>Penulis: ${b.penulis}</p>
          <p>Genre: ${b.genre}</p>
          <p>Harga: ${b.harga}</p>
          <p>Stok: ${b.stok}</p>
          <button onclick="editBook(${i})" class="btn">Edit</button>
          <button onclick="deleteBook(${i})" class="btn">Hapus</button>
        </div>`
    ).join("");
      
  listBeli.innerHTML = daftar.map((b, i) => `
        <div class="card-js">
          <h3>${b.judul}</h3>
          <p>Penulis: ${b.penulis}</p>
          <p>Genre: ${b.genre}</p>
          <p>Harga: ${b.harga}</p>
          <p>Stok: ${b.stok}</p>
          <button onclick="beliBook(${i})" class="btn">Beli</button>
        </div>`
      ).join("");;
      tampilkanStruk();


    }
    
    

function beliBook(index) {
  let buku = daftar[index];

  if (buku.stok > 0) {
    buku.stok -= 1;

    let dataTransaksi = {
      id: "TRX-" + Date.now(),
      judul: buku.judul,
      genre: buku.genre,
      harga: buku.harga,
      tanggal: new Date().toLocaleString(),
    };

    transaksi.push(dataTransaksi);
    alert("Buku berhasil dibeli!");
  } else {
    alert("Stok habis!");
  }
  render();
  tampilkanStruk();
}

function deleteBook(index) {
  daftar.splice(index, 1);
  render();
}

function tampilkanStruk() {
  let container = document.getElementById("strukTransaksi");
  if (!container) return;

  container.innerHTML = "";

  transaksi.forEach((t) => {
    container.innerHTML += `
      <div class="struk">
        <b>ID: ${t.id}</b><br>
        Judul: ${t.judul}<br>
        Genre: ${t.genre}<br>
        Harga:  Rp ${t.harga}<br>
        Tanggal: ${t.tanggal}
      </div>
    `;
  });
}

function editBook(index) {
  const b = daftar[index];

  document.getElementById("judul").value = b.judul;
  document.getElementById("penulis").value = b.penulis;
  document.getElementById("genre").value = b.genre;
  document.getElementById("harga").value = b.harga;
  document.getElementById("stok").value = b.stok;

  editIndex = index;
  document.getElementById("Tambah").innerText = "Update";
}

function clearForm() {
  document.getElementById("judul").value = "";
  document.getElementById("penulis").value = "";
  document.getElementById("genre").value = "";
  document.getElementById("harga").value = "";
  document.getElementById("stok").value = "";
}

function ClearAll() {
  daftar = [];
  render();

}

render();
