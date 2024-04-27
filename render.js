import { commentators } from "./main.js";

const initLikeListener = () => {
    const likeButtons = document.querySelectorAll(".like-button");
    for (const likeButton of likeButtons) {
        likeButton.addEventListener("click", () => {
            const index = likeButton.dataset.index;
            const comment = commentators[index];
            if (comment.isLiked) {
                comment.likes -= 1;
                comment.isLiked = false;
            } else {
                comment.likes += 1;
                comment.isLiked = true;
            }
            renderCommentators();
        });
    }
}

const clickOnComment = () => {
    const answerComments = document.querySelectorAll(".comment-text")
    for (const answerComment of answerComments) {
        answerComment.addEventListener("click", () => {
            const commentElementInput = document.getElementById("comment-input");
            const index = answerComment.dataset.comment;
            const commentator = commentators[index];
            const commentText = `${commentator.comment}\n${commentator.name}`;
            commentElementInput.value = `> ${commentText}, `;
        });
    }
}

export const renderCommentators = () => {
    const ulElement = document.getElementById("comment-ul");
    const commenntatorsHtml = commentators.map((commentator, index) => {
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
        </li>`;
    }).join("");

    ulElement.innerHTML = commenntatorsHtml;
    initLikeListener();
    clickOnComment();
};
