
export let token = ''

export const setToken = (newToken:string) => {
    token = `bearer ${newToken}`
}
