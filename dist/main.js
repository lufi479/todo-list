/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/projectCreator.js":
/*!*******************************!*\
  !*** ./src/projectCreator.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _taskCreator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskCreator */ "./src/taskCreator.js");


const projectFactory = (name) => {
    const taskList = [];

    const addTask = (task) => {
        taskList.push(task);
    }

    return {
        name,
        taskList,
        addTask
    };
}

function createProject(name) {
    const project = projectFactory(name);
    return project;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createProject);

/***/ }),

/***/ "./src/taskCreator.js":
/*!****************************!*\
  !*** ./src/taskCreator.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const taskFactory = (title, desc, dueDate, priority) => {
    let completed = false;

    const changeCompletedStatus = () => {
        completed = completed ? false : true;
        return completed;
    }

    return{
        title,
        desc,
        dueDate,
        priority,
        completed,
        changeCompletedStatus
    }
};

function createTask(title, desc, dueDate, priority) {
    const task = taskFactory(title, desc, dueDate, priority);
    return task;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createTask);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _taskCreator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskCreator */ "./src/taskCreator.js");
/* harmony import */ var _projectCreator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projectCreator */ "./src/projectCreator.js");



const task1 = (0,_taskCreator__WEBPACK_IMPORTED_MODULE_0__["default"])("title", "Description", new Date(2023, 7, 1), "low");


task1.desc = "LMAO NEW DESCRIPTION";


const projectList = [];

const proj1 = (0,_projectCreator__WEBPACK_IMPORTED_MODULE_1__["default"])("project 1");
projectList.push(proj1);
proj1.addTask(task1);

proj1.addTask((0,_taskCreator__WEBPACK_IMPORTED_MODULE_0__["default"])("Task2", "Desc 2", new Date(2023,7,7), "high"));

const containerDiv = document.querySelector(".container");

const createProjectBtn = document.querySelector("#create-project");

const projForm = document.createElement("form");
projForm.action = "#";
projForm.classList.add("project-form");

const enterName = document.createElement("input");
enterName.type = "text";
enterName.id = "proj-name";
enterName.name = "proj-name";



const submitProj = document.createElement("button");
submitProj.type = "submit";
submitProj.id = "submit-proj-form";
submitProj.textContent = "submit";

const cancelProj = document.createElement("button");
cancelProj.id = "cancel-new-project";
cancelProj.textContent = "cancel";
cancelProj.type = "reset";


projForm.appendChild(enterName);
projForm.appendChild(submitProj);
projForm.appendChild(cancelProj);

projForm.classList.add("hidden");

document.querySelector(".project-section").appendChild(projForm);


createProjectBtn.addEventListener("click", function(e) {
    projForm.classList.remove("hidden");
    projForm.classList.add("shown");
})

function display () {
  const projListDiv = document.querySelector(".project-list");
  projListDiv.textContent = "";
  console.log(projectList);
  for (let i = 0; i < projectList.length; i++){
    let card = document.createElement("div");
    card.classList.add("project");

    let projName = document.createElement("div");
    projName.classList.add("project-name");
    projName.textContent = projectList[i].name;
    card.appendChild(projName);

    let projBtnsContainterDiv = document.createElement("div");
    projBtnsContainterDiv.classList.add("project-buttons-container");

    let editDiv = document.createElement("div");
    editDiv.classList.add("edit-project");
    projBtnsContainterDiv.appendChild(editDiv);

    let deleteDiv = document.createElement("div");
    deleteDiv.classList.add("delete-project");
    projBtnsContainterDiv.appendChild(deleteDiv);

    card.appendChild(projBtnsContainterDiv);

    card.addEventListener("click", selectProject);

    projListDiv.appendChild(card);
  }
};

projForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let formData = new FormData(this);
    let nameInput = formData.get("proj-name");
    let tempProj = (0,_projectCreator__WEBPACK_IMPORTED_MODULE_1__["default"])(nameInput);
    projectList.push(tempProj);
    closeForm();
    display();
});

cancelProj.addEventListener("click", function (e){
  closeForm();
});

function closeForm() {
  projForm.classList.remove("shown");
  projForm.classList.add("hidden");
  projForm.reset();
}

display();

function selectProject(e){
  let selected = document.querySelector(".selected-project");
  if (selected){
    selected.classList.remove("selected-project");
  }
  console.log(e);
  e.target.classList.add("selected-project");
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBdUM7O0FBRXZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxhQUFhOzs7Ozs7Ozs7Ozs7OztBQ3JCNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsVUFBVTs7Ozs7O1VDdkJ6QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ051QztBQUNNOztBQUU3QyxjQUFjLHdEQUFVOzs7QUFHeEI7OztBQUdBOztBQUVBLGNBQWMsMkRBQWE7QUFDM0I7QUFDQTs7QUFFQSxjQUFjLHdEQUFVOztBQUV4Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkRBQWE7QUFDaEM7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdENyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2tDcmVhdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3JlYXRlVGFzayBmcm9tIFwiLi90YXNrQ3JlYXRvclwiO1xuXG5jb25zdCBwcm9qZWN0RmFjdG9yeSA9IChuYW1lKSA9PiB7XG4gICAgY29uc3QgdGFza0xpc3QgPSBbXTtcblxuICAgIGNvbnN0IGFkZFRhc2sgPSAodGFzaykgPT4ge1xuICAgICAgICB0YXNrTGlzdC5wdXNoKHRhc2spO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIHRhc2tMaXN0LFxuICAgICAgICBhZGRUYXNrXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdChuYW1lKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RGYWN0b3J5KG5hbWUpO1xuICAgIHJldHVybiBwcm9qZWN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVQcm9qZWN0OyIsImNvbnN0IHRhc2tGYWN0b3J5ID0gKHRpdGxlLCBkZXNjLCBkdWVEYXRlLCBwcmlvcml0eSkgPT4ge1xuICAgIGxldCBjb21wbGV0ZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IGNoYW5nZUNvbXBsZXRlZFN0YXR1cyA9ICgpID0+IHtcbiAgICAgICAgY29tcGxldGVkID0gY29tcGxldGVkID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICByZXR1cm4gY29tcGxldGVkO1xuICAgIH1cblxuICAgIHJldHVybntcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGRlc2MsXG4gICAgICAgIGR1ZURhdGUsXG4gICAgICAgIHByaW9yaXR5LFxuICAgICAgICBjb21wbGV0ZWQsXG4gICAgICAgIGNoYW5nZUNvbXBsZXRlZFN0YXR1c1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhc2sodGl0bGUsIGRlc2MsIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gICAgY29uc3QgdGFzayA9IHRhc2tGYWN0b3J5KHRpdGxlLCBkZXNjLCBkdWVEYXRlLCBwcmlvcml0eSk7XG4gICAgcmV0dXJuIHRhc2s7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVRhc2s7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgY3JlYXRlVGFzayBmcm9tIFwiLi90YXNrQ3JlYXRvclwiO1xuaW1wb3J0IGNyZWF0ZVByb2plY3QgZnJvbSBcIi4vcHJvamVjdENyZWF0b3JcIjtcblxuY29uc3QgdGFzazEgPSBjcmVhdGVUYXNrKFwidGl0bGVcIiwgXCJEZXNjcmlwdGlvblwiLCBuZXcgRGF0ZSgyMDIzLCA3LCAxKSwgXCJsb3dcIik7XG5cblxudGFzazEuZGVzYyA9IFwiTE1BTyBORVcgREVTQ1JJUFRJT05cIjtcblxuXG5jb25zdCBwcm9qZWN0TGlzdCA9IFtdO1xuXG5jb25zdCBwcm9qMSA9IGNyZWF0ZVByb2plY3QoXCJwcm9qZWN0IDFcIik7XG5wcm9qZWN0TGlzdC5wdXNoKHByb2oxKTtcbnByb2oxLmFkZFRhc2sodGFzazEpO1xuXG5wcm9qMS5hZGRUYXNrKGNyZWF0ZVRhc2soXCJUYXNrMlwiLCBcIkRlc2MgMlwiLCBuZXcgRGF0ZSgyMDIzLDcsNyksIFwiaGlnaFwiKSk7XG5cbmNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyXCIpO1xuXG5jb25zdCBjcmVhdGVQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcmVhdGUtcHJvamVjdFwiKTtcblxuY29uc3QgcHJvakZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbnByb2pGb3JtLmFjdGlvbiA9IFwiI1wiO1xucHJvakZvcm0uY2xhc3NMaXN0LmFkZChcInByb2plY3QtZm9ybVwiKTtcblxuY29uc3QgZW50ZXJOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuZW50ZXJOYW1lLnR5cGUgPSBcInRleHRcIjtcbmVudGVyTmFtZS5pZCA9IFwicHJvai1uYW1lXCI7XG5lbnRlck5hbWUubmFtZSA9IFwicHJvai1uYW1lXCI7XG5cblxuXG5jb25zdCBzdWJtaXRQcm9qID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbnN1Ym1pdFByb2oudHlwZSA9IFwic3VibWl0XCI7XG5zdWJtaXRQcm9qLmlkID0gXCJzdWJtaXQtcHJvai1mb3JtXCI7XG5zdWJtaXRQcm9qLnRleHRDb250ZW50ID0gXCJzdWJtaXRcIjtcblxuY29uc3QgY2FuY2VsUHJvaiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5jYW5jZWxQcm9qLmlkID0gXCJjYW5jZWwtbmV3LXByb2plY3RcIjtcbmNhbmNlbFByb2oudGV4dENvbnRlbnQgPSBcImNhbmNlbFwiO1xuY2FuY2VsUHJvai50eXBlID0gXCJyZXNldFwiO1xuXG5cbnByb2pGb3JtLmFwcGVuZENoaWxkKGVudGVyTmFtZSk7XG5wcm9qRm9ybS5hcHBlbmRDaGlsZChzdWJtaXRQcm9qKTtcbnByb2pGb3JtLmFwcGVuZENoaWxkKGNhbmNlbFByb2opO1xuXG5wcm9qRm9ybS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3Qtc2VjdGlvblwiKS5hcHBlbmRDaGlsZChwcm9qRm9ybSk7XG5cblxuY3JlYXRlUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgIHByb2pGb3JtLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgcHJvakZvcm0uY2xhc3NMaXN0LmFkZChcInNob3duXCIpO1xufSlcblxuZnVuY3Rpb24gZGlzcGxheSAoKSB7XG4gIGNvbnN0IHByb2pMaXN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWxpc3RcIik7XG4gIHByb2pMaXN0RGl2LnRleHRDb250ZW50ID0gXCJcIjtcbiAgY29uc29sZS5sb2cocHJvamVjdExpc3QpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICBsZXQgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY2FyZC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKTtcblxuICAgIGxldCBwcm9qTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJvak5hbWUuY2xhc3NMaXN0LmFkZChcInByb2plY3QtbmFtZVwiKTtcbiAgICBwcm9qTmFtZS50ZXh0Q29udGVudCA9IHByb2plY3RMaXN0W2ldLm5hbWU7XG4gICAgY2FyZC5hcHBlbmRDaGlsZChwcm9qTmFtZSk7XG5cbiAgICBsZXQgcHJvakJ0bnNDb250YWludGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qQnRuc0NvbnRhaW50ZXJEaXYuY2xhc3NMaXN0LmFkZChcInByb2plY3QtYnV0dG9ucy1jb250YWluZXJcIik7XG5cbiAgICBsZXQgZWRpdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZWRpdERpdi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1wcm9qZWN0XCIpO1xuICAgIHByb2pCdG5zQ29udGFpbnRlckRpdi5hcHBlbmRDaGlsZChlZGl0RGl2KTtcblxuICAgIGxldCBkZWxldGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRlbGV0ZURpdi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXByb2plY3RcIik7XG4gICAgcHJvakJ0bnNDb250YWludGVyRGl2LmFwcGVuZENoaWxkKGRlbGV0ZURpdik7XG5cbiAgICBjYXJkLmFwcGVuZENoaWxkKHByb2pCdG5zQ29udGFpbnRlckRpdik7XG5cbiAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzZWxlY3RQcm9qZWN0KTtcblxuICAgIHByb2pMaXN0RGl2LmFwcGVuZENoaWxkKGNhcmQpO1xuICB9XG59O1xuXG5wcm9qRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSh0aGlzKTtcbiAgICBsZXQgbmFtZUlucHV0ID0gZm9ybURhdGEuZ2V0KFwicHJvai1uYW1lXCIpO1xuICAgIGxldCB0ZW1wUHJvaiA9IGNyZWF0ZVByb2plY3QobmFtZUlucHV0KTtcbiAgICBwcm9qZWN0TGlzdC5wdXNoKHRlbXBQcm9qKTtcbiAgICBjbG9zZUZvcm0oKTtcbiAgICBkaXNwbGF5KCk7XG59KTtcblxuY2FuY2VsUHJvai5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpe1xuICBjbG9zZUZvcm0oKTtcbn0pO1xuXG5mdW5jdGlvbiBjbG9zZUZvcm0oKSB7XG4gIHByb2pGb3JtLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93blwiKTtcbiAgcHJvakZvcm0uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgcHJvakZvcm0ucmVzZXQoKTtcbn1cblxuZGlzcGxheSgpO1xuXG5mdW5jdGlvbiBzZWxlY3RQcm9qZWN0KGUpe1xuICBsZXQgc2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdGVkLXByb2plY3RcIik7XG4gIGlmIChzZWxlY3RlZCl7XG4gICAgc2VsZWN0ZWQuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkLXByb2plY3RcIik7XG4gIH1cbiAgY29uc29sZS5sb2coZSk7XG4gIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZC1wcm9qZWN0XCIpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9