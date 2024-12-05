import React from 'react';
import { View } from 'react-native';
import AppRadioButton from './AppRadioButton';



function CartProductCard({ product_id, }) {


    return (
        <View>

            <AppRadioButton
                sizeOptions={sizeOptions}
                diamondQualityOptions={diamondQualityOptions}
                metalOptions={metalOptions}
                selectedOptions={selectedOptions}
                onSelectionChange={handleSelectionChange}
            />

        </View>
    );
}

export default CartProductCard;