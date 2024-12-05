import apiClient from "./apiclient";


const startDelivery = ({ deliveryId }) =>
    apiClient.post('/driver/delivery/start', {
        deliveryId
    });

const CompleteDelivery = ({ uniqueOrderId, deliveryId, warehouseId }) => {
    return apiClient.post('/driver/complete/delivery', {
        uniqueOrderId,
        deliveryId,
        warehouseId,
    });
};



const FetchAssignedDelivery = () => {
    return apiClient.get('/driver/delivery');
}


const OngoingDelivery = () => {
    return apiClient.get('/driver/delivery/inprogress');
}

const pastDelivery = () => {
    return apiClient.get('/driver/delivery/completed');
}


export default {
    startDelivery,
    FetchAssignedDelivery,
    CompleteDelivery,
    pastDelivery,
    OngoingDelivery
}