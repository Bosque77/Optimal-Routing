
import axios from 'axios'
const baseUrl = '/regions'




let token = ''


const setToken = (newToken: string) => {
    token = `bearer ${newToken}`
}

const getAll = async (user_id:string) => {
    setToken(user_id)
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.get(baseUrl,config)
    return response.data
}

export default { getAll, setToken }