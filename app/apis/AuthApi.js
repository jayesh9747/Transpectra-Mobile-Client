import apiClient from "./apiclient";


// @ userLogin 
const login = ({ email, password }) => apiClient.post('/auth/login', {
    email,
    password
})


// @userRegister 
const register = (registerData) => apiClient.post('/auth/signup',
    registerData
)

// @forgotPassword

const forgotPassword = (email) => apiClient.post('/auth/customer/forgot-password',{email});


// @logout 
const logout = () => apiClient.post('/auth/customer/logout');


// @sendotp
const sendotp = (email) => apiClient.post('/auth/sendotp',{email});


// @getCustomer 
const fetchCustomer = () => apiClient.get('/driver')


// @updateCustomer 
const updateCustomer = (Data) => apiClient.post("/update-customer",Data);


export default {
    login,
    fetchCustomer,
    register,
    logout,
    forgotPassword,
    updateCustomer,
    sendotp
}