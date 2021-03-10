import * as React from "react";

interface NavigationContextProps {
  notification: number;
  updateNotificationNumber: (n: number) => void;
}

const NavigationContext = React.createContext<NavigationContextProps>({
  notification: 0,
  updateNotificationNumber: () => {}
});

export const useNavigationContext = () => React.useContext(NavigationContext);

export default NavigationContext;
