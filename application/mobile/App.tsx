import "react-native-gesture-handler";
import React from "react";
import NavigationContext from "./src/navigation/NavigationContext";
import MainNavigationContainer from "./src/navigation/NavigationContainer";

export default function App() {
  const updateNotificationNumber = (n: number) => setNotifications(n);
  const [notification, setNotifications] = React.useState<number>(0);

  return (
    <NavigationContext.Provider
      value={{
        notification: notification,
        updateNotificationNumber: updateNotificationNumber
      }}
    >
      <MainNavigationContainer />
    </NavigationContext.Provider>
  );
}
