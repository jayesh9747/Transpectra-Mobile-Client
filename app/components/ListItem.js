import React from 'react'
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import AppText from './AppText'
import colors from '../config/color'

const ListItem = ({ image, title, IconComponent, subtitle, onPress, renderRightActions }) => {
    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={renderRightActions} >
                <TouchableHighlight
                    underlayColor={colors.light}
                    onPress={onPress}>
                    <View style={styles.container}>
                        {IconComponent}
                        {image && <Image style={styles.image} source={image} />}
                        <View style={styles.DetailsContainer}>
                            <AppText style={styles.title} numberOfLines={1} >{title}</AppText>
                            {subtitle && <AppText style={styles.subtitle} numberOfLines={2}>{subtitle}</AppText>}
                        </View>
                        <MaterialCommunityIcons color={colors.medium} name='chevron-right' size={25} />
                    </View>
                </TouchableHighlight>
            </Swipeable>
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        backgroundColor: colors.white,
    },
    DetailsContainer: {
        marginLeft: 10,
        justifyContent: 'center',
        flex: 1,
    },
    image: {
        borderRadius: 50,
        resizeMode: 'contain',
        height: 60,
        width: 60,
    },
    title: {
        fontSize: 20,
        fontWeight: '500'
    },
    subtitle: {
        fontSize: 17,
        color: colors.medium
    }
})
export default ListItem
