let daftar = [];
let transaksi = [];
let editIndex = null;

// nambah buku
function tambah() {
  let judul = document.getElementById("judul").value;
  let penulis = document.getElementById("penulis").value;
  // let genre = document.getElementById("genre").value;
  let harga = Number(document.getElementById("harga").value);
  let stok = document.getElementById("stok").value;

  if (!judul) {
    alert("tolong masukan judul terlebih dahulu");
    return;
  } else if (!penulis) {
    alert("tolong masukan penulis terlebih dahulu");
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
    harga: harga,
    stok: stok,
  };

  if (editIndex !== null) {
    daftar[editIndex] = { judul, penulis, harga, stok };
    editIndex = null;
    document.getElementById("Tambah").innerText = "Tambah";
  } else {
    daftar.push(data);
  }

  clearForm();
  render();
}

// hapus semua
function ClearAll() {
  let hapus = confirm("apakah anda akan menghapus semuanya?");
  if (hapus) {
    daftar = [];
    transaksi = [];
    render();
  }
}

//hapus yang ada di form biar ga berantakan history nya
function clearForm() {
  document.getElementById("judul").value = "";
  document.getElementById("penulis").value = "";
  document.getElementById("harga").value = "";
  document.getElementById("stok").value = "";
}

//untuk munculin buku / update lagi buku semua
function render() {
  const listBuku = document.getElementById("listBuku");
  const listBeli = document.getElementById("listBeli");

  let hasilListBuku = daftar.map(
    (b, i) => `
        <tr>
          <th>${i + 1}</th>
          <th>${b.judul}</th>
          <th>${b.penulis}</th>
          <th>${b.harga.toLocaleString()}</th>
          <th>${b.stok}</th>
          <th><button onclick="editBook(${i})" class="btn">Edit</button></th>
          <th><button onclick="deleteBook(${i})" class="btn">Hapus</button></th>
        </tr>`,
  );
  
  listBuku.innerHTML = hasilListBuku.join("");


  let hasilListBeli = daftar.map(
    (b, i) => `
        <div class="card-js">
          <h3>${b.judul}</h3>
          <p>Penulis: ${b.penulis}</p>
          <p>Harga: ${b.harga.toLocaleString()}</p>
          <p>Stok: ${b.stok}</p>
          <button onclick="beliBook(${i})" class="btn">Beli</button>
        </div>`,
  );
  listBeli.innerHTML = hasilListBeli.join("");
  tampilkanStruk();
}

// untuk edit buku
function editBook(index) {
  const b = daftar[index];

  document.getElementById("judul").value = b.judul;
  document.getElementById("penulis").value = b.penulis;
  document.getElementById("harga").value = b.harga;
  document.getElementById("stok").value = b.stok;

  editIndex = index;
  document.getElementById("Tambah").innerText = "Update";
}

// untuk beli buku
function beliBook(index) {
  let buku = daftar[index];

  if (buku.stok > 0) {
    buku.stok -= 1;

    let dataTransaksi = {
      id: "TRX-" + Date.now(),
      judul: buku.judul,
      // genre: buku.genre,
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

//untuk delete buku 1 per 1
function deleteBook(index) {
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
        <b>ID: ${t.id}</b><br>
        Judul: ${t.judul}<br>
        Harga:  Rp ${t.harga}<br>
        Tanggal: ${t.tanggal}
      </div>
    `;
  });
}

// logout
function logout() {
  let confirmLogout = confirm("Apakah Anda yakin ingin logout?");
  if (confirmLogout) {
    window.location.href = "index.html";
  } else {
    alert("Logout dibatalkan.");
  }
}
// update
render();
