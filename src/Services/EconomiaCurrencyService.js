import axios from "axios";

export const EconomiaCurrencyService = axios.create({
    baseURL: 'https://economia.awesomeapi.com.br/json/'
})