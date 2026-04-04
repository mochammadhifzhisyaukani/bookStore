// Ulasan

let btnUlasan =document.getElementById("btn-ulasan")
let hasilUlasan = document.getElementById("hasilUlasan")

btnUlasan.addEventListener('click',function() {
    const inputEmail = document.getElementById("exampleFormControlInput1")
    const inputUlasan = document.getElementById("exampleFormControlTextarea1")

    const emailValue = inputEmail.value;
    const ulasanValue = inputUlasan.value;

    if (!emailValue || !ulasanValue) {
        alert("Email dan ulasan tidak boleh kosong!");
        return;
    }

    hasilUlasan.innerHTML += 
    `<div class= "card-ulasan">
    <h5>${emailValue}</h5>
     <p>${ulasanValue} </p>
     <h6>${new Date().toLocaleString()}</h6>
     </div>`

    inputEmail.value = "";
    inputUlasan.value = "";

      alert("Terima kasih atas ulasannya!");

});