export function getTodos() {
    return fetch("https://wedev-api.sky.pro/api/v1/maksim-ananin/comments")
        .then((response) => {
            return response.json()
        })
}

export function postTodo({ name, text }) {
    return fetch("https://wedev-api.sky.pro/api/v1/maksim-ananin/comments", {
        method: "POST",
        body: JSON.stringify({
            text: text,
            name: name,
            forceError: false
        }),
    })
        .then((response) => {
            if (response.status === 400) {
                alert('Минимальное количество имени и комментария 3 символа');
                throw new Error('Некорректные данные');
            }

            if (response.status === 500) {
                alert('Сервер не работает');
                throw new Error('Ошибка сервера')
            }
            return response.json()
        })
}