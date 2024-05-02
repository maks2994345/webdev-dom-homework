import { getComments } from "./main.js";
import { postTodo, } from "./api.js";
import { renderCommentators } from "./render.js";

export function buttonClick() {
    const nameElementInput = document.getElementById("name-input");
    const commentElementInput = document.getElementById("comment-input");
    const loaderElement = document.querySelector(".loader");
    const formElement = document.querySelector(".add-form");

    nameElementInput.classList.remove('error');
    commentElementInput.classList.remove('error');


    if (nameElementInput.value.trim() === '' || commentElementInput.value.trim() === '') {

        nameElementInput.classList.add('error'),
            commentElementInput.classList.add('error');
        return;

    }

    loaderElement.style.display = "block";
    formElement.style.display = "none";

    postTodo({
        text: commentElementInput.value,
        name: nameElementInput.value,
    })
        .then(() => {
            getComments()
        })
        .then(() => {
            loaderElement.style.display = "none";
            formElement.style.display = "flex";
            document.getElementById("name-input").value = '';
            document.getElementById("comment-input").value = '';
        })
        .catch((error) => {
            loaderElement.style.display = "none";
            formElement.style.display = "flex";
            console.log(error);
        })
    renderCommentators();
}