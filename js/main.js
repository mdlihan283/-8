const inputTitle = document.querySelector("input#title");
const inputDesc = document.querySelector("input#desc");
const addBtn = document.querySelector("button#btn-add");
const tableBody = document.querySelector("#tableBody");

document.querySelector("#cancel").addEventListener("click", function () {
   document.querySelector("#ubdedTitle").value = "";
   document.querySelector("#ubdatedesc").value = "";
   document.querySelector("#formEdit").style.display = "none";

});

if (!localStorage.getItem("todo")) {
   localStorage.setItem("todo", JSON.stringify(new Array()));
};

const todoLoops = () => {
   tableBody.innerHTML = "";
   let currentIems = JSON.parse(localStorage.getItem("todo"));
   let counter = 1;
   currentIems.forEach((value, index) => {
      tableBody.innerHTML += `<tr id="singleTodo" data-itemId="${index}">
      <td>${counter}</td>
      <td>${value.title}</td>
      <td>${value.desc}</td>
      <td>
         <button id="edit">EDIT</button>
         <button id="dlt">DELETE</button>
      </td>
   </tr>`;
      counter++;
      editBtn();
      dltBtn();
   });
};
todoLoops();

const addTodo = () => {
   addBtn.addEventListener("click", function () {
      let newTitle = inputTitle.value.trim();
      let newDesc = inputDesc.value.trim();
      let newTodo = {
         title: newTitle,
         desc: newDesc
      }
      let currentIems = JSON.parse(localStorage.getItem("todo"));
      currentIems.push(newTodo);
      localStorage.clear();
      localStorage.setItem("todo", JSON.stringify(currentIems));
      inputTitle.value = "";
      inputDesc.value = "";
      todoLoops();
   });
};
addTodo();

function dltBtn() {
   let allTodo = document.querySelectorAll("#singleTodo");
   allTodo.forEach((value) => {
      value.querySelector("#dlt").addEventListener("click", function () {
         let currentIems = JSON.parse(localStorage.getItem("todo"));
         let clickedIndex = Number(value.getAttribute("data-itemId"));
         let filterItem = currentIems.filter((item, index) => {
            return index !== clickedIndex;
         });
         localStorage.clear();
         localStorage.setItem("todo", JSON.stringify(filterItem));
         todoLoops();
      });
   });
};
dltBtn();

function editBtn() {
   let allTodo = document.querySelectorAll("#singleTodo");
   allTodo.forEach((value) => {
      value.querySelector("#edit").addEventListener("click", function () {
         let currentIems = JSON.parse(localStorage.getItem("todo"));
         let clickedIndex = Number(value.getAttribute("data-itemId"));
         document.querySelector("#ubdedTitle").value = currentIems[clickedIndex].title;
         document.querySelector("#ubdatedesc").value = currentIems[clickedIndex].desc;
         document.querySelector("#formEdit").style.display = "block";
         document.querySelector("#arrayIndex").value = clickedIndex;
      });
   });
};
editBtn();

function ubdateBtn() {
   document.querySelector("#ubdate").addEventListener("click", function () {
      let currentIems = JSON.parse(localStorage.getItem("todo"));
      let ubDatTitle = document.querySelector("#ubdedTitle").value;
      let ubDatDesc = document.querySelector("#ubdatedesc").value;
      let ubDateData = {
         title: ubDatTitle,
         desc: ubDatDesc
      }
      let ubDateIndex = Number(document.querySelector("#arrayIndex").value);
      currentIems[ubDateIndex] = ubDateData;
      localStorage.clear();
      localStorage.setItem("todo", JSON.stringify(currentIems));
      document.querySelector("#ubdedTitle").value = "";
      document.querySelector("#ubdatedesc").value = "";
      document.querySelector("#formEdit").style.display = "none";
      todoLoops();
   });
};
ubdateBtn();