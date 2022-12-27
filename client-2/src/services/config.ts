
export let token = ''

export const setToken = (newToken:string | null) => {
    token = `bearer ${newToken}`
}
