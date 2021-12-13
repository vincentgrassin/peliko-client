import * as React from "react";

interface NavigationContextProps {
  notification: number;
  updateNotificationNumber: (n: number) => void;
}

export const NavigationContext = React.createContext<NavigationContextProps>({
  notification: 0,
  updateNotificationNumber: () => {}
});

export const NavigationProvider: React.FC = ({ children }) => {
  const [notification, setNotifications] = React.useState<number>(0);
  const updateNotificationNumber = (n: number) => setNotifications(n);

  return (
    <NavigationContext.Provider
      value={{
        notification,
        updateNotificationNumber
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => React.useContext(NavigationContext);
