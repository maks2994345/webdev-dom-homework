import { API } from "./api.js"
import { DOM } from "./dom.js"

export const renderLogin = () => {
    const appElement = document.getElementById('app')

    appElement.innerHTML = `<div class="container">
        <div class="comment">
            <div class="form">
                <h1>Форма авторизации</h1>
                <input id="login-input" class="auth-form-name" placeholder="Введите ваш логин" type="text">
                <input id="pass-input" class="auth-form-name" placeholder="Введите ваш пароль" type="password">
            </div>
            <div class="buttons">
                <button id="reg-button" class="add-form-button">Войти</button>
                <a class="login__link" href="#">Зарегистрироваться</a>
            </div>
        </div>
     </div>`

    const buttonElement = document.getElementById('reg-button')
    const loginInputElement = document.getElementById('login-input')
    const passInputElement = document.getElementById('pass-input')

    buttonElement.addEventListener("click", () => {
        API.login({
            login: loginInputElement.value,
            password: passInputElement.value,
        })
            .then((responseData) => {
            })
            .then(() => {
               DOM.renderApp()
            })
    })
}
