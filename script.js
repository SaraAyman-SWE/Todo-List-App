"use strict";

//////////////////////////////////////////////////////////////////////
// Create Todo list app similar to this ,
//  when user write task name and press add new task will be added to tasks list
//  When user click the done mark in green the task status will be updated to done
//  When user click the delete button , the task should be deleted from list
//////////////////////////////////////////////////////////////////////

const containerTasks = document.getElementsByClassName("tasks")[0];
const inputAddedTask = document.getElementById("addedTask");
const btnAdd = document.getElementsByClassName("btn")[0];
const btnDone = document.getElementsByClassName("btn-done");
const btnRemove = document.getElementsByClassName("btn-remove");

initializeLocalStorage();
// document.body.addEventListener("DOMContentLoaded", displayTasks, false);
document.body.addEventListener("onload", displayTasks, false);
displayTasks();
btnAdd.addEventListener("click", addTask, false);

// Functions
function initializeLocalStorage() {
  localStorage.taskCount = 3;
  localStorage.setItem(
    "task#1",
    document.getElementsByClassName("task#1")[0].textContent
  );
  localStorage.setItem(
    "task#2",
    document.getElementsByClassName("task#2")[0].textContent
  );
  localStorage.setItem(
    "task#3",
    document.getElementsByClassName("task#3")[0].textContent
  );
}

function updateLocalStorage() {
  localStorage.taskCount = Number(localStorage.taskCount) + 1;
  localStorage.setItem(`task#${localStorage.taskCount}`, inputAddedTask.value);
}

function createTask(i) {
  var tasksList = document.createElement("div");
  tasksList.classList.add("list");
  var tasksHalfList = document.createElement("div");
  tasksHalfList.classList.add("half-list");
  tasksHalfList.classList.add(`task#${i}`);
  var halfListTaskContent = document.createTextNode(
    `${localStorage.getItem(`task#${i}`)}`
  );
  tasksHalfList.appendChild(halfListTaskContent);
  tasksList.appendChild(tasksHalfList);

  var buttonsHalfList = document.createElement("div");
  buttonsHalfList.classList.add("half-list");
  var btnDoneSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  btnDoneSvg.classList.add("h-5");
  btnDoneSvg.classList.add("w-5");
  btnDoneSvg.setAttribute("viewBox", "0 0 20 20");
  btnDoneSvg.setAttribute("fill", "currentColor");
  // PATH
  var pathDoneSvgContent = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathDoneSvgContent.setAttributeNS(null, "fill-rule", "evenodd");
  pathDoneSvgContent.setAttributeNS(
    null,
    "d",
    "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
  );
  pathDoneSvgContent.setAttributeNS(null, "clip-rule", "evenodd");
  btnDoneSvg.appendChild(pathDoneSvgContent);
  btnDoneSvg.classList.add("btn-done");
  buttonsHalfList.appendChild(btnDoneSvg);

  // Remove Button
  var btnRemoveSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  var pathRemoveSvgContent = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathRemoveSvgContent.setAttribute("fill-rule", "evenodd");
  pathRemoveSvgContent.setAttribute(
    "d",
    "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
  );
  pathRemoveSvgContent.setAttribute("clip-rule", "evenodd");
  btnRemoveSvg.classList.add("h-5");
  btnRemoveSvg.classList.add("w-5");
  btnRemoveSvg.classList.add("my-style");
  btnRemoveSvg.classList.add("btn-remove");
  btnRemoveSvg.setAttribute("viewBox", "0 0 20 20");
  btnRemoveSvg.setAttribute("fill", "currentColor");
  btnRemoveSvg.appendChild(pathRemoveSvgContent);
  buttonsHalfList.appendChild(btnRemoveSvg);

  tasksList.appendChild(buttonsHalfList);
  containerTasks.appendChild(tasksList);
}

function displayTasks() {
  containerTasks.innerHTML = "";
  for (var i = 1; i < localStorage.length; i++) {
    createTask(i);
  }
}

function addTask() {
  updateLocalStorage();
  createTask(localStorage.taskCount);
  inputAddedTask.value = "";
}

// Update Task
for (let btn = 0; btn < btnDone.length; btn++) {
  var bd = btnDone[btn];
  bd.addEventListener("click", function (e) {
    this.closest(".list").style.backgroundColor = "#d0fea7";
  });
}

// Remove Task
for (let btn = 0; btn < btnRemove.length; btn++) {
  var br = btnRemove[btn];
  br.addEventListener("click", function (e) {
    // select specific parent
    this.closest(".list").remove();
    localStorage.removeItem(
      `task#${this.parentElement.previousElementSibling
        .getAttribute("class")
        .slice(-1)}`
    );
  });
}

//localStorage.clear();
