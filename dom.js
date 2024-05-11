import { API } from "./api.js"


export const DOM = {
    buttonElement: document.getElementById("button-click"),
    ulElement: document.getElementById("comment-ul"),
    nameElementInput: document.getElementById("name-input"),
    commentElementInput: document.getElementById("comment-input"),
    formElement: document.querySelector(".add-form"),
    loaderElement: document.querySelector(".loader"),
    commentLoaderElement: document.querySelector(".commentators__loader"),

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
        if (!this.buttonElement)
            return

        this.buttonElement.addEventListener("click", () => {
            this.nameElementInput.classList.remove('error')
            this.commentElementInput.classList.remove('error')

            if (this.nameElementInput.value.trim() === '' || this.commentElementInput.value.trim() === '') {
                this.nameElementInput.classList.add('error')
                this.commentElementInput.classList.add('error')
                return
            }

            this.loaderElement.style.display = "block"
            this.formElement.style.display = "none"

            API.postComment(this.nameElementInput.value, this.commentElementInput.value)
                .then(() => {
                    this.getComments()
                        .then(() => {
                            this.loaderElement.style.display = "none"
                            this.formElement.style.display = "flex"

                            document.getElementById("name-input").value = ''
                            document.getElementById("comment-input").value = ''
                        })
                })
                .catch(() => {
                    this.loaderElement.style.display = "none"
                    this.formElement.style.display = "flex"

                    console.log('Что-то пошло не так...')
                })
        })
    },

    renderCommentators() {
        // const commentatorsHtml = this.commentators.map((commentator, index) => {
        //     return `<li class="comment">
        //         <div class="comment-header">
        //             <div>${commentator.name}</div>
        //             <div>${commentator.date}</div>
        //         </div>
        //         <div class="comment-body">
        //             <div class="comment-text" data-comment="${index}">
        //                 ${commentator.comment}
        //             </div>
        //         </div>
        //         <div class="comment-footer">
        //             <div class="likes">
        //                 <span class="likes-counter">${commentator.likes}</span>
        //                 <button id="button-like" data-index="${index}" class="like-button${commentator.isLiked ? " -active-like" : ""}"></button>
        //             </div>
        //         </div>
        //     </li>`
        // }).join("")
        //
        // this.ulElement.innerHTML = commentatorsHtml
        // this.initLikeListener()
        // this.clickOnComment()

        const appElement = document.getElementById('app')
        const ulElement = document.getElementById("comment-ul")
        const commenntatorsHtml = this.commentators.map((commentator, index) => {
            return `<li class="comment">
              <div class="comment-header">
                <div>${commentator.name}</div>
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

        appElement.innerHTML = `
            <p class="commentators__loader">Комментарии загружаются...</p>
            <ul id="comment-ul" class="comments">${commenntatorsHtml}</ul>
            <p class="loader">Комментарий загружается...</p>
            <div class="add-form">
                <input id="name-input" value="" type="text" class="add-form-name" placeholder="Введите ваше имя" />
                <textarea id="comment-input" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
                <div class="add-form-row">
                    <button id="button-click" class="add-form-button">Написать</button>
                </div>
            </div>`

        this.buttonElement = document.getElementById("button-click")
        this.ulElement = document.getElementById("comment-ul")
        this.nameElementInput = document.getElementById("name-input")
        this.commentElementInput = document.getElementById("comment-input")
        this.formElement = document.querySelector(".add-form")
        this.loaderElement = document.querySelector(".loader")
        this.commentLoaderElement = document.querySelector(".commentators__loader")

        this.initLikeListener()
        this.clickOnComment()

        this.handleButtonClick()
    },
}
