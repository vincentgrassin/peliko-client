import * as React from "react";

interface NavigationContextProps {
  notification: number;
  updateNotificationNumber: (n: number) => void;
  userId: number | undefined;
  updateUserId: (n: number) => void;
}

export const NavigationContext = React.createContext<NavigationContextProps>({
  notification: 0,
  updateNotificationNumber: () => {},
  userId: undefined,
  updateUserId: () => {}
});

export const NavigationProvider: React.FC = ({ children, ...props }) => {
  const [notification, setNotifications] = React.useState<number>(0);
  const updateNotificationNumber = (n: number) => setNotifications(n);
  const [userId, setUserId] = React.useState<number | undefined>(undefined);
  const updateUserId = (n: number) => setUserId(n);

  return (
    <NavigationContext.Provider
      value={{
        notification,
        updateNotificationNumber,
        userId,
        updateUserId
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => React.useContext(NavigationContext);
