import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";
import colors from "../config/color"; // Make sure this is the correct path to your colors file

function OfflineNotice(props) {
  const netInfo = useNetInfo();

  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.text}>No Internet Connection</Text>
        </View>
      </SafeAreaView>
    );

  return null;
}

const styles = StyleSheet.create({
  safeArea: {
    position: "absolute",
    top: Constants.statusBarHeight,
    width: "100%",
    zIndex: 50,
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.secondary,
    height: 50,
    justifyContent: "center",
    width: "100%",
  },
  text: {
    color: colors.white,
  },
});

export default OfflineNotice;
