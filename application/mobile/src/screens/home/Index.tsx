import React, { useState, useEffect } from "react";
import { connect, DefaultRootState } from "react-redux";
import {
  withNavigationFocus,
  NavigationFocusInjectedProps,
} from "react-navigation";
import {
  View,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  Vibration,
  Platform,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { Button, Input, Icon, Text, ListItem } from "react-native-elements";
//import Ip from "../Ip";
//import Color from "../generic/Color";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
//import TabButton from "./TabButton";
import TabContent from "./TabContent";
//import HeaderHome from "../generic/HeaderHome";
//import CustomBottomNavigator from "../generic/CustomBottomNavigator";

interface RootState{
  userData: {
    token: string | undefined;
  },
  formRollData: any;

}

export interface StateProps {
  userData: {
    token: string | undefined;
  };
  formRollData: any;
}
interface DispatchProps {
  notificationUpdate(nb: string | undefined): object;
}

export type HomeProps = StateProps &
  DispatchProps &
  NavigationFocusInjectedProps;

//class Home extends React.Component<Props,HomeState>{
// console.log("BACK-END RUNNING ON : ",Ip())
export const Home: React.FC<HomeProps> = (props) => {
  // VARIALBES
  const [rollList, setRollList] = useState([]);
  const [closedRollList, setClosedRollList] = useState([]);
  const [numberToDiscover, setNumberToDiscover] = useState(0);
  const [isTabSelected, setIsTabSelected] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // useEffect opening - push management

  // console.log("Home -> props.formRollData", props.formRollData)

  /*  componentWillMount(){
      this.setState({
        numberToDiscover:0,
        isTabSelected:true,
        isLoaded:false
      });
    }*/

  useEffect(() => {
    //componentDidMount(){
    let mounted = true;
    const registerForPushNotificationsAsync = async () => {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      // console.log("status push notification",status);
      if (status !== "granted") {
        return;
      }

      let pushToken = await Notifications.getExpoPushTokenAsync();
      // TODO: probably no longer needed
      // console.log("is token ?",pushToken)
      /*let data = await fetch(`${Ip()}/push/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `token=${props.userData.token}&pushToken=${pushToken}`,
      });*/
      let dataJson = "";//await data.json();

      if (Platform.OS === "android") {
        Notifications.createChannelAndroidAsync("default", {
          name: "default",
          sound: true,
          priority: "max",
          vibrate: [0, 250, 250, 250],
        });
      }
    };
    if (mounted) {
      registerForPushNotificationsAsync();
      Notifications.addListener(handleNotification);
    }

    return () => {
      mounted = false;
      console.log("mounted", mounted);
    };
  }, []);

  const handleNotification = (notification: any) => {
    // Vibration.vibrate();
    console.log("notification", notification);
    setIsTabSelected(false);
    // props.navigation.navigate('Gallery',{id_roll:notification.data.id_roll});
    // props.navigation.navigate('Home');
  };

  // load kodako list au chargement
  useEffect(() => {
    let mounted = true;
    const loadRollList = async () => {
      AsyncStorage.getItem(
        "userData",
        function (error, data: string | undefined) {
          if (data) {
            let userData = JSON.parse(data);
            // console.log("STORAGE HAS",userData);
            // console.log("STORE HAS",props.userData);
          }
        }
      );

      if (props.userData.token !== undefined && props.userData.token !== null) {
        
        // TODO: get roll list
        /*let data = await fetch(`${Ip()}/roll/roll-list/`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `token=${props.userData.token}`,
        });
        let dataJson = await data.json();
        setRollList(dataJson.dataFromBack.dataRolls);
        setClosedRollList(dataJson.dataFromBack.dataClosedRolls);
        setNumberToDiscover(dataJson.dataFromBack.discoveryCount);
        setIsLoaded(true);
        props.notificationUpdate(dataJson.dataFromBack.invitationRollNumber);
        */
      }
    };
    if (mounted) {
      loadRollList();
    }

    return () => {
      mounted = false;
      console.log("mounted", mounted);
    };
  }, [props.isFocused, isTabSelected]);

  let tabData = [
    { isActive: isTabSelected, name: "En cours" },
    { isActive: !isTabSelected, name: "Développés" },
  ];
  // props to components to button

  function headerClick(value: unknown) {
    setIsTabSelected(!isTabSelected);
  }

  // Display tab management
  let displayRollList = null;
  if (tabData[0].isActive) {
    displayRollList = (
      <TabContent rollList={rollList} type="open" isLoaded={isLoaded} />
    );
  }
  if (tabData[1].isActive) {
    displayRollList = (
      <TabContent rollList={closedRollList} type="closed" isLoaded={isLoaded} />
    );
  }

  // RETURN GLOBAL DE LA PAGE

  return (
    <View
      style={{ flex: 1, position: "relative", backgroundColor: Color("white") }}
    >
      {/* <TouchableOpacity 
              style = {{position:'absolute', bottom:0,left:"50%",zIndex: 1,width:50,height:50,backgroundColor:Color('black'),borderRadius:50, justifyContent:'center', alignItems:'center',}}
              onPress={() => props.navigation.navigate('MasterForm',{action:"create",id_roll:""})}
              >
            <Text style = {{color:Color('white')}}>+
            </Text>
        </TouchableOpacity> */}
      <HeaderHome headerTitle="Mes Pellikos" />
      <TabButton
        headerClick={headerClick}
        tabData={tabData}
        numberToDiscover={numberToDiscover}
      />
      <ScrollView>{displayRollList}</ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  secondaryTitle: {
    fontSize: 20,
    color: Color("green"),
    marginBottom: 10,
  },
});

function mapStateToProps(state: RootState) {
  return {
    userData: {
      token: state.userData.token,
    },
    formRollData: state.formRollData,
  };
};

function mapDispatchToProps(dispatch: any) {
  return {
    notificationUpdate: function (nb: number) {
      dispatch({
        type: "update-notification",
        notificationNumber: nb,
      });
    },
  };
}

//export default withNavigationFocus<Props>(
//  connect(mapStateToProps, mapDispatchToProps)(Home)
//);

export default withNavigationFocus<HomeProps>(
  connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
// TODO: continue the reading on redux https://react-redux.js.org/using-react-redux/static-typing
// TODO: 
