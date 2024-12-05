import apiClient from "./apiclient";


const verifyDriver = ({ drivingLicense, dob, name }) =>
    apiClient.post('/driver/verify/sarthi', {
        drivingLicense,
        dob,
        name,
    });

const verifyVehicle = ({ truckNumber, chassisNumber, ownerName, engineNumber }) =>
    apiClient.post('/driver/verify/vahan', {
        truckNumber,
        chassisNumber,
        ownerName,
        engineNumber,
    });



export default {
    verifyDriver,
    verifyVehicle
}