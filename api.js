const apiLink = "https://wedev-api.sky.pro/api/v2/maksim-ananin/comments";

//let password = prompt('Введите пароль')

export function getTodos() {
    let status = 0

    return fetch(apiLink, {
        // headers: {
        //     Authorization: `Bearer 123`,
        // },
    })
        .then((response) => {
            status = response.status

            return response.json()
        })
        .then((data) => {
            if (status >= 400) {
                alert(data.error)
                //password = prompt('Введите корректный пароль')
                //getTodos()
                throw new Error(data.error)
            }

            return data
        })
}

export function postTodo({ name, text }) {
    let status = 0

    return fetch(apiLink, {
        method: "POST",
        body: JSON.stringify({
            text: text,
            name: name,
            forceError: false,
        }),
        headers: {
            Authorization: `Bearer 123`,
        },
    })
    .then((response) => {
        status = response.status

        return response.json()
    })
        .then((data) => {
            if (status >= 400) {
                alert(data.error)
                throw new Error(data.error)
            }

            // if (status === 400) {
            //     alert('Минимальное количество имени и комментария 3 символа');
            //     throw new Error('Некорректные данные');
            // }
            // else if (status === 500) {
            //     alert('Сервер не работает');
            //     throw new Error('Ошибка сервера')
            // }
            
            return data
        })
}