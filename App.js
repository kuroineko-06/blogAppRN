import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
import { useNetInfo } from "@react-native-community/netinfo";
import NoInternet from "./app/component/NoInternet";

const CUSTOM_THEME = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: "#fff" },
};

const App = () => {
  const [noInternet, setNoInternet] = useState(false);
  const netInfo = useNetInfo();

  const fetchNetInfo = () => {
    const { isConnected, isInternetReachable } = netInfo;
    if (isConnected === false && isInternetReachable === false) {
      setNoInternet(true);
    } else setNoInternet(false);
  };
  useEffect(() => {
    fetchNetInfo();
  }, [netInfo]);

  if (noInternet) return <NoInternet onRefreshPress={fetchNetInfo} />;
  return (
    <NavigationContainer theme={CUSTOM_THEME}>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
