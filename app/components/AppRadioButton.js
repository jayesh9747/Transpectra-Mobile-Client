import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CheckboxGroup from './CheckboxGroup';

function AppRadioButton({ sizeOptions, diamondQualityOptions, metalOptions, selectedOptions, onSelectionChange }) {
    const [selectedMetal, setSelectedMetal] = useState([selectedOptions.metal]);
    const [selectedDiamondQuality, setSelectedDiamondQuality] = useState([selectedOptions.diamondQuality]);
    const [selectedSize, setSelectedSize] = useState([selectedOptions.size]);

    useEffect(() => {
        setSelectedMetal([selectedOptions.metal]);
        setSelectedDiamondQuality([selectedOptions.diamondQuality]);
        setSelectedSize([selectedOptions.size]);
    }, [selectedOptions]);

    const handleMetalChange = (selected) => {
        setSelectedMetal(selected);
        onSelectionChange({ metal: selected[0], diamondQuality: selectedDiamondQuality[0], size: selectedSize[0] });
    };

    const handleDiamondQualityChange = (selected) => {
        setSelectedDiamondQuality(selected);
        onSelectionChange({ metal: selectedMetal[0], diamondQuality: selected[0], size: selectedSize[0] });
    };

    const handleSizeChange = (selected) => {
        setSelectedSize(selected);
        onSelectionChange({ metal: selectedMetal[0], diamondQuality: selectedDiamondQuality[0], size: selected[0] });
    };

    return (
        <View>

            {
                metalOptions.length > 0  &&
                <View style={styles.optionSection}>
                    <Text style={styles.optionTitle}>CHOOSE METAL</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <CheckboxGroup
                            options={metalOptions}
                            selectedOptions={selectedMetal}
                            onChange={handleMetalChange}
                        />
                    </ScrollView>
                </View>
            }


            {
                diamondQualityOptions.length > 0 &&
                <View style={styles.optionSection}>
                    <Text style={styles.optionTitle}>CHOOSE DIAMOND QUALITY</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <CheckboxGroup
                            options={diamondQualityOptions}
                            selectedOptions={selectedDiamondQuality}
                            onChange={handleDiamondQualityChange}
                        />
                    </ScrollView>
                </View>
            }


            {sizeOptions.length > 0 &&
                <View style={styles.optionSection}>
                    <Text style={styles.optionTitle}>CHOOSE SIZE</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <CheckboxGroup
                            options={sizeOptions}
                            selectedOptions={selectedSize}
                            onChange={handleSizeChange}
                        />
                    </ScrollView>
                </View>

            }


        </View>
    );
}

const styles = StyleSheet.create({
    optionSection: {
        margin: 8,
        marginBottom: 5,
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default AppRadioButton;
