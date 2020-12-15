import axios from 'axios'

const instance = axios.create( {
    baseURL: 'https://whatsapp-backend-b.herokuapp.com'
})

export default instance;
