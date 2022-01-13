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
  const [notification, setNotification] = React.useState<number>(0);
  const updateNotificationNumber = React.useCallback((n: number) => {
    setNotification(n);
  }, []);

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
