
export const API = {
    apiLink: "https://wedev-api.sky.pro/api/v2/maksim-ananin/comments",
    userLink: "https://wedev-api.sky.pro/api/user/login",

    token: "",

    getComments() {
        let status = 0

        return fetch(this.apiLink, {
            headers: {
                Authorization: `Bearer ${this.token}`,
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

                return data
            })
    },

    postComment(name, text) {
        let status = 0

        return fetch(this.apiLink, {
            method: "POST",
            body: JSON.stringify({
                text: text,
                name: name,
                forceError: false,
            }),
            headers: {
                Authorization: `Bearer ${this.token}`,
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

                return data
            })
    },

    login(login, password) {
        let status = 0

        return fetch(this.userLink, {
            method: "POST",
            body: JSON.stringify({
                login,
                password,
                forceError: false,
            }),
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

                return data
            })
    },
}
