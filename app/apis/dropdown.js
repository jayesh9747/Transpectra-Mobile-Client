import apiClient from "./apiclient";


// @getCountries
const getCountries = () => apiClient.post('/get-countries', {})

export default {
    getCountries,
}