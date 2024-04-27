import { getTodos } from "./api.js";
import { buttonClick } from "./addcomment.js";
import { dateTime } from "./date.js";
import { renderCommentators } from "./render.js";

const buttonElement = document.getElementById("button-click");
const commentLoaderElement = document.querySelector(".commentators__loader");

dateTime()

export let commentators = [];

export function getComments() {
    getTodos()
        .then((responseData) => {
            commentators = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    comment: comment.text,
                    date: new Date(comment.date).format(),
                    likes: comment.likes,
                    isLiked: comment.isLiked,
                }
            })
            renderCommentators()
            commentLoaderElement.style.display = "none";
        })
}

getComments()

buttonElement.addEventListener("click", buttonClick)