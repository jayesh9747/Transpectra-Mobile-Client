// // import React from 'react';
// // import { View, StyleSheet } from 'react-native';
// // import { Dropdown } from 'react-native-element-dropdown';
// // import { useFormikContext } from 'formik';
// // import color from '../../config/color';
// // import ErrorMessage from './ErrorMessage';
// //  import defaultStyles from '../../config/style'

// // const DropdownField = ({ name, items, placeholder, width, ...otherProps }) => {
// //   const { setFieldValue, setFieldTouched, values, errors, touched } = useFormikContext();

// //   return (
// //     <View style={styles.container}>
// //       <Dropdown
// //         style={[styles.dropdown, { width: width || '100%' }]}
// //         data={items}
// //         labelField="label"
// //         valueField="value"
// //         placeholder={placeholder}
// //         placeholderStyle={[styles.placeholderStyle,defaultStyles.text]}
// //         selectedTextStyle={styles.placeholderStyle}
// //         value={values[name]}
// //         onFocus={() => setFieldTouched(name)}
// //         onBlur={() => setFieldTouched(name)}
// //         onChange={(item) => setFieldValue(name, item.value)}
// //         {...otherProps}
// //       />
// //       {errors[name] && touched[name] && <ErrorMessage style={styles.errorText}>{errors[name]}</ErrorMessage>}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     borderRadius: 10,
// //     borderColor: color.medium,
// //     borderWidth: 1,
// //     flexDirection: 'row',
// //     padding: 10,
// //     marginVertical: 10,
// //     alignItems: 'center',
// //   },
// //   placeholderStyle:{
// //     fontSize: 18,
// //     paddingVertical:2,
// //     color:color.medium
// //   }
// // });

// // export default DropdownField;

// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';
// import { useFormikContext } from 'formik';
// import color from '../../config/color';
// import ErrorMessage from './ErrorMessage';
// import defaultStyles from '../../config/style';

// const DropdownField = ({ name, items, placeholder, width, value,onset, ...otherProps }) => {
//     const { setFieldValue, setFieldTouched, values, errors, touched } = useFormikContext();

//     const handleChange = (item) => {
//         setFieldValue(name, item.value);
//         if (onset) {
//             onset(item.value);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Dropdown
//                 style={[styles.dropdown, { width: width || '100%' }]}
//                 data={items}
//                 labelField="label"
//                 valueField="value"
//                 placeholder={placeholder}
//                 placeholderStyle={[styles.placeholderStyle]}
//                 selectedTextStyle={styles.placeholderStyle}
//                 value={values[name]}
//                 onFocus={() => setFieldTouched(name)}
//                 onBlur={() => setFieldTouched(name)}
//                 onChange={handleChange}
//                 {...otherProps}
//             />
//             {errors[name] && touched[name] && <ErrorMessage style={styles.errorText}>{errors[name]}</ErrorMessage>}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         borderRadius: 10,
//         borderColor: color.medium,
//         borderWidth: 1,
//         flexDirection: 'row',
//         padding: 10,
//         marginVertical: 10,
//         alignItems: 'center',
//     },
//     placeholderStyle: {
//         fontSize: 18,
//         paddingVertical: 2,
//         color: color.medium
//     }
// });

// export default DropdownField;


import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useFormikContext } from 'formik';
import color from '../../config/color';
import ErrorMessage from './ErrorMessage';
import defaultStyles from '../../config/style';

const AppDropdownField = ({ name, items, placeholder, width, value, disabled, onset, style, ...otherProps }) => {
    const { setFieldValue, setFieldTouched, values, errors, touched } = useFormikContext();

    const handleChange = (item) => {
        setFieldValue(name, item.value);
        if (onset) {
            onset(item.value);
        }
    };

    return (
        <View style={[styles.container, style]}>
            <Dropdown
                style={[styles.dropdown, { width: width || '100%' }]}
                data={items}
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                placeholderStyle={[styles.placeholderStyle]}
                selectedTextStyle={styles.placeholderStyle}
                value={value || values[name]}
                onFocus={() => setFieldTouched(name)}
                onBlur={() => setFieldTouched(name)}
                onChange={handleChange}
                disable={disabled}
                {...otherProps}
            />
            {errors[name] && touched[name] && <ErrorMessage style={styles.errorText}>{errors[name]}</ErrorMessage>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderColor: color.medium,
        borderWidth: 1,
        flexDirection: 'row',
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    placeholderStyle: {
        fontSize: 18,
        paddingVertical: 2,
        color: color.medium
    }
});

export default AppDropdownField;
