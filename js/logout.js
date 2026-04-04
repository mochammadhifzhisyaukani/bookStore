// logout
function logout() {
  let confirmLogout = confirm("Apakah Anda yakin ingin logout?");
  if (confirmLogout) {
    window.location.href = "index.html";
  } else {
    alert("Logout dibatalkan.");
  }
}