import "react-native-gesture-handler";
import React from "react";
import NavigationContext from "./src/navigation/NavigationContext";
import MainNavigationContainer from "./src/navigation/NavigationContainer";

export default function App() {
  const [notification, setNotifications] = React.useState<number>(0);
  const updateNotificationNumber = (n: number) => setNotifications(n);

  return (
    <NavigationContext.Provider
      value={{
        notification,
        updateNotificationNumber
      }}
    >
      <MainNavigationContainer />
    </NavigationContext.Provider>
  );
}
