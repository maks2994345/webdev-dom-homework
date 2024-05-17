import { API } from "./api.js"
import { renderLogin } from "./login.js"
import { format } from "date-fns"


export const DOM = {
    buttonElement: document.getElementById("button-click"),
    ulElement: document.getElementById("comment-ul"),
    nameElementInput: document.getElementById("name-input"),
    commentElementInput: document.getElementById("comment-input"),
    formElement: document.querySelector(".add-form"),
    loaderElement: document.querySelector(".loader"),
    commentLoaderElement: document.querySelector(".commentators__loader"),
    appContainer: document.querySelector("#app"),

    commentators: [],

    getComments() {
        return API.getComments()
            .then((responseData) => {
                this.commentators = responseData.comments.map((comment) => {
                    return {
                        name: comment.author.name,
                        comment: comment.text,
                        date: new Date(comment.date).format(),
                        likes: comment.likes,
                        isLiked: comment.isLiked,
                    }
                })
                this.renderCommentators()
                this.commentLoaderElement.style.display = "none"
            })
    },

    initLikeListener() {
        const likeButtons = document.querySelectorAll(".like-button")
        for (const likeButton of likeButtons) {
            likeButton.addEventListener("click", () => {
                const index = likeButton.dataset.index
                const comment = this.commentators[index]

                if (comment.isLiked) {
                    comment.likes -= 1
                    comment.isLiked = false
                } else {
                    comment.likes += 1
                    comment.isLiked = true
                }

                this.renderCommentators()
            })
        }
    },

    clickOnComment() {
        document.querySelectorAll(".comment-text").forEach((answerComment) => {
            answerComment.addEventListener("click", () => {
                const index = answerComment.dataset.comment
                const commentator = this.commentators[index]

                this.commentElementInput.value = `> ${commentator.comment}\n${commentator.name}, `
            })
        })
    },

    handleButtonClick() {
        const buttonElement = document.getElementById("button-click")
        const nameElementInput = document.getElementById("name-input")
        const commentElementInput = document.getElementById("comment-input")
        const loaderElement = document.querySelector(".loader")
        const formElement = document.querySelector(".add-form")

        if (!buttonElement)
            return

        buttonElement.addEventListener("click", () => {
            nameElementInput.classList.remove('error')
            commentElementInput.classList.remove('error')

            if (commentElementInput.value.trim() === '') {
                commentElementInput.classList.add('error')
                return
            }

            loaderElement.style.display = "block"
            formElement.style.display = "none"

            API.postComment(nameElementInput.value, commentElementInput.value)
                .then(() => {
                    this.getComments()
                        .then(() => {
                            loaderElement.style.display = "none"
                            formElement.style.display = "flex"

                            document.getElementById("comment-input").value = ''
                        })
                })
                .catch(() => {
                    loaderElement.style.display = "none"
                    formElement.style.display = "flex"

                    console.log('Что-то пошло не так...')
                })
        })
    },


    handleAuthButtonClick() {
        const authButton = document.getElementById("auth-button")
        authButton.addEventListener("click", (event) => {
            event.preventDefault()
            renderLogin()
        })
    },

    renderApp() {
        this.appContainer.innerHTML = `
        <p class="commentators__loader">Комментарии загружаются...</p>
        <ul id="comment-ul" class="comments"></ul>
        <p class="loader">Комментарий загружается...</p>
        <div class="form">

        </div>`
        this.getComments()
            .then(() => {
                this.renderForm()
            })
    },

    renderForm() {
        const form = document.querySelector(".form")
        form.innerHTML = API.user ? `<div class="add-form">
        <input id="name-input" value="Максим (Админ)" type="text" readonly class="add-form-name" placeholder="Введите ваше имя" />
        <textarea id="comment-input" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
        <div class="add-form-row">
            <button id="button-click" class="add-form-button">Написать</button>
        </div>
    </div>` : `<div class="auth">
    Чтобы оставить комментарий, вам нужно <button class="auth-button" id="auth-button">Авторизоваться</button>
     </div>`
        API.user ? this.handleButtonClick() : this.handleAuthButtonClick()
    },

    renderCommentators() {
        const listElement = document.getElementById('comment-ul')
        const commenntatorsHtml = this.commentators.map((commentator, index) => {
            return `<li class="comment">
              <div class="comment-header">
                <div>Максим (${commentator.name})</div>
                <div>${commentator.date}</div>
              </div>
              <div class="comment-body">
                <div class="comment-text" data-comment="${index}">
                  ${commentator.comment}
                </div>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${commentator.likes}</span>
                  <button id="button-like" data-index="${index}" class="like-button${commentator.isLiked ? " -active-like" : ""}"></button>
                </div>
              </div>
            </li>`
        }).join("")

        listElement.innerHTML = commenntatorsHtml


        this.buttonElement = document.getElementById("button-click")
        this.ulElement = document.getElementById("comment-ul")
        this.nameElementInput = document.getElementById("name-input")
        this.commentElementInput = document.getElementById("comment-input")
        this.formElement = document.querySelector(".add-form")
        this.loaderElement = document.querySelector(".loader")
        this.commentLoaderElement = document.querySelector(".commentators__loader")

        this.initLikeListener()
        this.clickOnComment()
    },
}
