let removeTaskBtnEl;
let editTaskBtnEl;
let modalEl;
let formDetailEl;
let taskUpdateFormEl;
let updateFormBtn;
let filterByPriority;
let filterByDate;
let searchQueryString;
const ApiURI = "https://taskmasterapi.fly.dev/api/v1/task/";
// Creating Task
const formDataToArray = Array.from(document.querySelectorAll(".form-data"));
const formEl = document.querySelector(".task-form");
if (formEl) {
  formEl.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const data = formDataToArray.reduce(
      (acc, data) => ({ ...acc, [data.name]: data.value }),
      {}
    );
    if (
      data.title == "" ||
      data.description == "" ||
      data.deadline == "" ||
      data.priority == ""
    ) {
      slide(false, "Please all fields are expected.");
      return;
    }
    postData(data);
  });
}
let postData = async (data) => {
  try {
    let res = await fetch(ApiURI + "add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const d = await res.json();
    if (!d) return false;
    slide(true, d.message);
  } catch (err) {
    slide(false, d.message);
  }
};
//Task creation Ends
//Fetching all Task and Rendering them to the views
const recordAreaEl = document.querySelector(".task-body");
if (recordAreaEl) {
  getData();
}

async function getData() {
  let res = await fetch(ApiURI + "all", {
    headers: {
      authorization: `Bear ${localStorage.getItem("token")}`,
    },
  });
  let data = await res.json();

  taskRecordUI(data);
}
// Removing Task
function taskRecordUI(data) {
  refreshUI(data);
  removeTaskBtnEl.forEach((el) => {
    el.addEventListener("click", async (evt) => {
      const task_id = evt.target.dataset.id;
      try {
        let res = await fetch(ApiURI + task_id, {
          method: "DELETE",
        });
        let data = await res.json();
        slide(true, data.message);
        // recordAreaEl.innerHTML = "";
        setTimeout(() => {
          getData();
        }, 1000);
      } catch (err) {
        slide(false, data.message);
      }
    });
  });
  //Clicking on the Edit Task Button
  editTaskBtnEl.forEach((el) => {
    el.addEventListener("click", async (evt) => {
      modalEl = document.querySelector(".modal-overlay");
      const task_id = evt.target.dataset.id;
      //Call form UPdate Element
      try {
        let res = await fetch(ApiURI + task_id);
        let d = await res.json();
        renderUpdate(d);
        modalEl.classList.remove("hidden");
        setTimeout(() => {
          modalEl.style.opacity = "1";
        }, 500);
      } catch (err) {
        console.log(err.message);
      }
    });
  });
}
//Populating the Task Record
function refreshUI(data) {
  recordAreaEl.innerHTML = "";
  data.forEach((d, i) => {
    let dateStringF = new Date(d.deadline).toLocaleDateString("en-us", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    recordAreaEl.insertAdjacentHTML(
      "beforeend",
      `
            <tr>
                      <td>${i + 1}</td>
                      <td>${d.title}</td>
                      <td>${dateStringF}</td>
                      <td>${d.priority}</td>
                      <td>🟢</td>
                      <td>
                        <button  data-id ="${
                          d._id
                        }" class="edit-task-btn">Edit</button>
                        <button  class="remove-task-btn" data-id="${
                          d._id
                        }" >Delete</button>
                      </td>
                    </tr>
        `
    );
    removeTaskBtnEl = document.querySelectorAll(".remove-task-btn");
    editTaskBtnEl = document.querySelectorAll(".edit-task-btn");
  });
}
// Rendering the Update task form
function renderUpdate(data) {
  const date = new Date(data.deadline);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let dateFormate = `${y}-${m.toString().padStart(2, "0")}-${d
    .toString()
    .padStart(2, "0")}`;
  formDetailEl = document.querySelector(".form-details");
  formDetailEl.innerHTML = "";
  formDetailEl.insertAdjacentHTML(
    "beforeend",
    `
        <form  class="task-update-form">
            <input type="hidden" name="id" value="${data._id}"/>
              <div class="form-field">
                <label for="name">Title:</label>
                <input type="text" name="title" value="${data.title}"/>
              </div>
              <div class="form-field">
                <label for="name">Description:</label>
                <textarea name="description" id="" rows="2" value="${
                  data.description
                }">${data.description}</textarea>
              </div>
              <div class="form-field">
                <label for="name">Deadline:</label>
                <input type="date" name="deadline" value="${dateFormate}" />
              </div>
              <div class="form-field">
                <label for="name">Priority:</label>
                <select name="priority" id="" >
                  <option value="low" ${
                    data.priority == "low" ? "selected" : ""
                  }>Low</option>
                  <option value="medium" ${
                    data.priority == "medium" ? "selected" : ""
                  }>Medium</option>
                  <option value="high" ${
                    data.priority == "high" ? "selected" : ""
                  }>High</option>
                </select>
              </div>
              <div class="form-field">
                <button class="update-form-btn">UPDATE</button>
              </div>
            </form>
    `
  );
  //Updating Task Record.
  taskUpdateFormEl = document.querySelector(".task-update-form");
  taskUpdateFormEl.addEventListener("submit", (evt) => {
    evt.preventDefault();
    updateTaskRecord(evt.target);
  });
}
//Ends
async function updateTaskRecord(parsedData) {
  let d = Array.from(parsedData).reduce(
    (acc, d) => ({ ...acc, [d.name]: d.value }),
    {}
  );
  console.log(d);
  if (
    d.title == "" ||
    d.description == "" ||
    d.deadline == "" ||
    d.priority == ""
  ) {
    return slide(false);
  }
  try {
    let res = await fetch(ApiURI + d.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(d),
    });
    let data = await res.json();

    modalEl.style.opacity = "0";
    hideModal();
    slide(true, data.message);
  } catch (err) {
    slide(false, data.message);
  }
  //   console.log(d);
}
//Filter Task by priority

filterByPriority = document.querySelector(".filter-by-priority");
filterByPriority &&
  filterByPriority.addEventListener("change", async (evt) => {
    let opt = evt.target.value;

    if (opt == "") return;
    try {
      let res = await fetch(ApiURI + `filter/priority/${opt}`);
      let data = await res.json();

      taskRecordUI(data);
    } catch (err) {
      console.log(err);
    }
  });

//Filter Task by Date
filterByDate = document.querySelector(".filter-by-date");
filterByDate &&
  filterByDate.addEventListener("change", async (evt) => {
    let opt = evt.target.value;
    if (opt == "") return;
    try {
      let res = await fetch(ApiURI + `filter/date/${opt}`);
      let data = await res.json();
      taskRecordUI(data);
    } catch (err) {
      console.log(err);
    }
  });
//Search By Query String
searchQueryString = document.getElementById("searchQuery");
let text = "";
searchQueryString &&
  searchQueryString.addEventListener("keypress", async (evt) => {
    text += evt.key;
    console.log(text);
    // try {
    //   let res = await fetch(`http://localhost:5000/task/search/${evt.data}`);
    //   let data = await res.json();
    //   taskRecordUI(data);
    // } catch (err) {
    //   console.log(err);
    // }
  });
//Hidding Modal
function hideModal() {
  modalEl.style.opacity = "0";
  setTimeout(() => {
    modalEl.classList.add("hidden");
    getData();
  }, 1000);
}
