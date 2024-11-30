const alertEl = document.querySelector(".alert");
const alertMessageEl = document.querySelector(".alert-message");
function slide(status, message) {
  if (status) {
    alertEl.classList.remove("alert-error");
    alertEl.classList.add("alert-success");
    alertMessageEl.innerHTML = message;
  } else {
    alertEl.classList.remove("alert-success");
    alertEl.classList.add("alert-error");
    alertMessageEl.innerHTML = message;
  }
  alertEl.classList.add("alert-slide-in");
  setTimeout(() => {
    alertEl.classList.remove("alert-slide-in");
  }, 3000);
}
