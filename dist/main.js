/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   API: () => (/* binding */ API)\n/* harmony export */ });\n\r\nconst API = {\r\n    apiLink: \"https://wedev-api.sky.pro/api/v2/maksim-ananin/comments\",\r\n    userLink: \"https://wedev-api.sky.pro/api/user/login\",\r\n    user: null,\r\n\r\n    token: \"\",\r\n\r\n    getComments() {\r\n        let status = 0\r\n\r\n        return fetch(this.apiLink, {\r\n            headers: {\r\n                Authorization: `Bearer ${this.token}`,\r\n            },\r\n        })\r\n            .then((response) => {\r\n                status = response.status\r\n\r\n                return response.json()\r\n            })\r\n            .then((data) => {\r\n                if (status >= 400) {\r\n                    alert(data.error)\r\n                    throw new Error(data.error)\r\n                }\r\n\r\n                return data\r\n            })\r\n    },\r\n\r\n    postComment(name, text) {\r\n        let status = 0\r\n\r\n        return fetch(this.apiLink, {\r\n            method: \"POST\",\r\n            body: JSON.stringify({\r\n                text: text,\r\n                name: name,\r\n            }),\r\n            headers: {\r\n                Authorization: `Bearer ${this.token}`,\r\n            },\r\n        })\r\n            .then((response) => {\r\n                status = response.status\r\n\r\n                return response.json()\r\n            })\r\n            .then((data) => {\r\n                if (status >= 400) {\r\n                    alert(data.error)\r\n                    throw new Error(data.error)\r\n                }\r\n\r\n                return data\r\n            })\r\n    },\r\n\r\n    login( {login, password} ) {\r\n        let status = 0\r\n\r\n        return fetch(this.userLink, {\r\n            method: \"POST\",\r\n            body: JSON.stringify({\r\n                login,\r\n                password,\r\n            }),\r\n        })\r\n            .then((response) => {\r\n                status = response.status\r\n\r\n                return response.json()\r\n            })\r\n            .then((data) => {\r\n                if (status >= 400) {\r\n                    alert(data.error)\r\n                    throw new Error(data.error)\r\n                }\r\n                this.user = data\r\n                this.token = data.user.token\r\n                return data\r\n            })\r\n    },\r\n}\r\n\n\n//# sourceURL=webpack://second-course-dom/./api.js?");

/***/ }),

/***/ "./date.js":
/*!*****************!*\
  !*** ./date.js ***!
  \*****************/
/***/ (() => {

eval("\r\nDate.prototype.format = function () {\r\n    let day = this.getDate()\r\n    let month = this.getMonth() + 1\r\n    let year = this.getFullYear() % 100\r\n\r\n    let hours = this.getHours()\r\n    let minutes = this.getMinutes()\r\n\r\n    let formattedDate = (day < 10 ? '0' : '') + day + '.' + (month < 10 ? '0' : '') + month + '.' + year\r\n    let formattedTime = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes\r\n\r\n    return formattedDate + ' ' + formattedTime\r\n}\r\n\n\n//# sourceURL=webpack://second-course-dom/./date.js?");

/***/ }),

/***/ "./dom.js":
/*!****************!*\
  !*** ./dom.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DOM: () => (/* binding */ DOM)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _login_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.js */ \"./login.js\");\n\r\n\r\n\r\n\r\n\r\nconst DOM = {\r\n    buttonElement: document.getElementById(\"button-click\"),\r\n    ulElement: document.getElementById(\"comment-ul\"),\r\n    nameElementInput: document.getElementById(\"name-input\"),\r\n    commentElementInput: document.getElementById(\"comment-input\"),\r\n    formElement: document.querySelector(\".add-form\"),\r\n    loaderElement: document.querySelector(\".loader\"),\r\n    commentLoaderElement: document.querySelector(\".commentators__loader\"),\r\n    appContainer: document.querySelector(\"#app\"),\r\n\r\n    commentators: [],\r\n\r\n    getComments() {\r\n        return _api_js__WEBPACK_IMPORTED_MODULE_0__.API.getComments()\r\n            .then((responseData) => {\r\n                this.commentators = responseData.comments.map((comment) => {\r\n                    return {\r\n                        name: comment.author.name,\r\n                        comment: comment.text,\r\n                        date: new Date(comment.date).format(),\r\n                        likes: comment.likes,\r\n                        isLiked: comment.isLiked,\r\n                    }\r\n                })\r\n                this.renderCommentators()\r\n                this.commentLoaderElement.style.display = \"none\"\r\n            })\r\n    },\r\n\r\n    initLikeListener() {\r\n        const likeButtons = document.querySelectorAll(\".like-button\")\r\n        for (const likeButton of likeButtons) {\r\n            likeButton.addEventListener(\"click\", () => {\r\n                const index = likeButton.dataset.index\r\n                const comment = this.commentators[index]\r\n\r\n                if (comment.isLiked) {\r\n                    comment.likes -= 1\r\n                    comment.isLiked = false\r\n                } else {\r\n                    comment.likes += 1\r\n                    comment.isLiked = true\r\n                }\r\n\r\n                this.renderCommentators()\r\n            })\r\n        }\r\n    },\r\n\r\n    clickOnComment() {\r\n        document.querySelectorAll(\".comment-text\").forEach((answerComment) => {\r\n            answerComment.addEventListener(\"click\", () => {\r\n                const index = answerComment.dataset.comment\r\n                const commentator = this.commentators[index]\r\n\r\n                this.commentElementInput.value = `> ${commentator.comment}\\n${commentator.name}, `\r\n            })\r\n        })\r\n    },\r\n\r\n    handleButtonClick() {\r\n        const buttonElement = document.getElementById(\"button-click\")\r\n        const nameElementInput = document.getElementById(\"name-input\")\r\n        const commentElementInput = document.getElementById(\"comment-input\")\r\n        const loaderElement = document.querySelector(\".loader\")\r\n        const formElement = document.querySelector(\".add-form\")\r\n\r\n        if (!buttonElement)\r\n            return\r\n\r\n        buttonElement.addEventListener(\"click\", () => {\r\n            nameElementInput.classList.remove('error')\r\n            commentElementInput.classList.remove('error')\r\n\r\n            if (commentElementInput.value.trim() === '') {\r\n                commentElementInput.classList.add('error')\r\n                return\r\n            }\r\n\r\n            loaderElement.style.display = \"block\"\r\n            formElement.style.display = \"none\"\r\n\r\n            _api_js__WEBPACK_IMPORTED_MODULE_0__.API.postComment(nameElementInput.value, commentElementInput.value)\r\n                .then(() => {\r\n                    this.getComments()\r\n                        .then(() => {\r\n                            loaderElement.style.display = \"none\"\r\n                            formElement.style.display = \"flex\"\r\n\r\n                            document.getElementById(\"comment-input\").value = ''\r\n                        })\r\n                })\r\n                .catch(() => {\r\n                    loaderElement.style.display = \"none\"\r\n                    formElement.style.display = \"flex\"\r\n\r\n                    console.log('Что-то пошло не так...')\r\n                })\r\n        })\r\n    },\r\n\r\n    handleAuthButtonClick(){\r\n       const authButton =  document.getElementById(\"auth-button\")\r\n       authButton.addEventListener(\"click\", (event) => {\r\n        event.preventDefault()\r\n        ;(0,_login_js__WEBPACK_IMPORTED_MODULE_1__.renderLogin)()\r\n       })\r\n\r\n    },\r\n\r\n    renderApp() {\r\n        this.appContainer.innerHTML = `\r\n        <p class=\"commentators__loader\">Комментарии загружаются...</p>\r\n        <ul id=\"comment-ul\" class=\"comments\"></ul>\r\n        <p class=\"loader\">Комментарий загружается...</p>\r\n        <div class=\"form\">\r\n\r\n        </div>`\r\n        this.getComments()\r\n            .then(() => {\r\n                this.renderForm()\r\n            })\r\n    },\r\n\r\n    renderForm() {\r\n        const form = document.querySelector(\".form\")\r\n        form.innerHTML = _api_js__WEBPACK_IMPORTED_MODULE_0__.API.user ? `<div class=\"add-form\">\r\n        <input id=\"name-input\" value=\"Максим (Админ)\" type=\"text\" readonly class=\"add-form-name\" placeholder=\"Введите ваше имя\" />\r\n        <textarea id=\"comment-input\" class=\"add-form-text\" placeholder=\"Введите ваш коментарий\" rows=\"4\"></textarea>\r\n        <div class=\"add-form-row\">\r\n            <button id=\"button-click\" class=\"add-form-button\">Написать</button>\r\n        </div>\r\n    </div>` : `<div class=\"auth\">\r\n    Чтобы оставить комментарий, вам нужно <button class=\"auth-button\" id=\"auth-button\">Авторизоваться</button>\r\n     </div>`\r\n        _api_js__WEBPACK_IMPORTED_MODULE_0__.API.user ? this.handleButtonClick() : this.handleAuthButtonClick()\r\n    },\r\n\r\n    renderCommentators() {\r\n        const listElement = document.getElementById('comment-ul')\r\n        const commenntatorsHtml = this.commentators.map((commentator, index) => {\r\n            return `<li class=\"comment\">\r\n              <div class=\"comment-header\">\r\n                <div>Максим (${commentator.name})</div>\r\n                <div>${createDate}</div>\r\n              </div>\r\n              <div class=\"comment-body\">\r\n                <div class=\"comment-text\" data-comment=\"${index}\">\r\n                  ${commentator.comment}\r\n                </div>\r\n              </div>\r\n              <div class=\"comment-footer\">\r\n                <div class=\"likes\">\r\n                  <span class=\"likes-counter\">${commentator.likes}</span>\r\n                  <button id=\"button-like\" data-index=\"${index}\" class=\"like-button${commentator.isLiked ? \" -active-like\" : \"\"}\"></button>\r\n                </div>\r\n              </div>\r\n            </li>`\r\n        }).join(\"\")\r\n\r\n        listElement.innerHTML = commenntatorsHtml\r\n\r\n\r\n        this.buttonElement = document.getElementById(\"button-click\")\r\n        this.ulElement = document.getElementById(\"comment-ul\")\r\n        this.nameElementInput = document.getElementById(\"name-input\")\r\n        this.commentElementInput = document.getElementById(\"comment-input\")\r\n        this.formElement = document.querySelector(\".add-form\")\r\n        this.loaderElement = document.querySelector(\".loader\")\r\n        this.commentLoaderElement = document.querySelector(\".commentators__loader\")\r\n\r\n        this.initLikeListener()\r\n        this.clickOnComment()\r\n    },\r\n}\r\n\n\n//# sourceURL=webpack://second-course-dom/./dom.js?");

/***/ }),

/***/ "./login.js":
/*!******************!*\
  !*** ./login.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderLogin: () => (/* binding */ renderLogin)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ \"./dom.js\");\n\r\n\r\n\r\nconst renderLogin = () => {\r\n    const appElement = document.getElementById('app')\r\n\r\n    appElement.innerHTML = `<div class=\"container\">\r\n        <div class=\"comment\">\r\n            <div class=\"form\">\r\n                <h1>Форма авторизации</h1>\r\n                <input id=\"login-input\" class=\"auth-form-name\" placeholder=\"Введите ваш логин\" type=\"text\">\r\n                <input id=\"pass-input\" class=\"auth-form-name\" placeholder=\"Введите ваш пароль\" type=\"password\">\r\n            </div>\r\n            <div class=\"buttons\">\r\n                <button id=\"reg-button\" class=\"add-form-button\">Войти</button>\r\n                <a class=\"login__link\" href=\"#\">Зарегистрироваться</a>\r\n            </div>\r\n        </div>\r\n     </div>`\r\n\r\n    const buttonElement = document.getElementById('reg-button')\r\n    const loginInputElement = document.getElementById('login-input')\r\n    const passInputElement = document.getElementById('pass-input')\r\n\r\n    buttonElement.addEventListener(\"click\", () => {\r\n        _api_js__WEBPACK_IMPORTED_MODULE_0__.API.login({\r\n            login: loginInputElement.value,\r\n            password: passInputElement.value,\r\n        })\r\n            .then((responseData) => {\r\n            })\r\n            .then(() => {\r\n               _dom_js__WEBPACK_IMPORTED_MODULE_1__.DOM.renderApp()\r\n            })\r\n    })\r\n}\r\n\n\n//# sourceURL=webpack://second-course-dom/./login.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date.js */ \"./date.js\");\n/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_date_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ \"./dom.js\");\n\r\n\r\n\r\n\r\n_dom_js__WEBPACK_IMPORTED_MODULE_1__.DOM.renderApp()\r\n\n\n//# sourceURL=webpack://second-course-dom/./main.js?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;