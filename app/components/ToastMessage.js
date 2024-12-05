import React, { forwardRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import color from '../config/color';

const toastConfig = {
  success: ({ text1, text2 }) => (
    <View style={styles.successContainer}>
      <Text style={styles.text}>{text1}</Text>
      {text2 ? <Text style={styles.subText}>{text2}</Text> : null}
    </View>
  ),
  error: ({ text1, text2 }) => (
    <View style={styles.errorContainer}>
      <Text style={styles.text}>{text1}</Text>
      {text2 ? <Text style={styles.subText}>{text2}</Text> : null}
    </View>
  ),
  info: ({ text1, text2 }) => (
    <View style={styles.infoContainer}>
      <Text style={styles.text}>{text1}</Text>
      {text2 ? <Text style={styles.subText}>{text2}</Text> : null}
    </View>
  )
};

const ToastMessage = forwardRef((props, ref) => {
  return <Toast ref={ref} config={toastConfig} />;
});

const showToast = (type, text1, text2) => {
  Toast.show({
    type,
    text1,
    text2,
    position: 'bottom',
  });
};

export { ToastMessage, showToast };

const styles = StyleSheet.create({
  successContainer: {
    height: "auto",
    width: 'auto',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: color.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    height: "auto",
    width: 'auto',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    height: 40,
    width: 'auto',
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  subText: {
    color: 'white',
    fontSize: 12,
  },
});
