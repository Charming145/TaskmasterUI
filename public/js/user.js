const registrationForm = document.querySelector(".register");
const loginForm = document.querySelector(".login");
const formMessageEl = document.querySelector(".message");
const formMessageText = document.querySelector(".message-text");
registrationForm &&
  registrationForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const formDataEl = evt.target;
    let data = Array.from(formDataEl).reduce(
      (acc, d) => ({
        ...acc,
        [d.name]: d.value,
      }),
      {}
    );
    if (
      data.username == "" ||
      data.email == "" ||
      data.password == "" ||
      data.confirmPassword == ""
    ) {
      formMessageText.innerHTML = "Please fill all details";
      formMessageEl.classList.remove("hide-message");
      return;
    }
    if (data.password !== data.confirmPassword) {
      formMessageText.innerHTML = "Password mismatch";
      formMessageEl.classList.remove("hide-message");
      return;
    }
    if (data.password.length < 6) {
      formMessageText.innerHTML = "Password to weak.";
      formMessageEl.classList.remove("hide-message");
      return;
    }
    try {
      let res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let res_data = await res.json();

      formMessageText.innerHTML = res_data.message;
      formMessageEl.classList.add("success-message");
      formMessageEl.classList.remove("hide-message");
      setTimeout(() => {
        formMessageEl.classList.add("hide-message");
      }, 3000);
    } catch (err) {
      formMessageText.innerHTML = err.message;
      formMessageEl.classList.remove("hide-message");
      setTimeout(() => {
        formMessageEl.classList.add("hide-message");
      }, 3000);
      return;
    }
  });
//Login
loginForm &&
  loginForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    let inputData = Array.from(evt.target).reduce(
      (acc, d) => ({ ...acc, [d.name]: d.value }),
      {}
    );
    if (inputData.email == "" || inputData.password == "") {
      formMessageText.innerHTML = "Please fill all details";
      formMessageEl.classList.remove("hide-message");
      return;
    }

    try {
      let res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      let res_data = await res.json();
      if (res.status == 200) {
        location.assign("/dashboard/user");
      } else {
        formMessageText.innerHTML = res_data.message;
        formMessageEl.classList.remove("hide-message");
      }
      setTimeout(() => {
        formMessageEl.classList.add("hide-message");
      }, 3000);
    } catch (err) {
      console.log(err.message);
      formMessageText.innerHTML = err.message;
      formMessageEl.classList.remove("hide-message");
      setTimeout(() => {
        formMessageEl.classList.add("hide-message");
      }, 3000);
    }
    // console.log(inputData);
  });
