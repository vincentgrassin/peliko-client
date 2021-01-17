interface LoginAction {
    type: string,
    userData: unknown
}

export default function(userData = {}, action:LoginAction) {
    var newUserData;
    switch (action.type) {
        case 'login-data': 
            newUserData = action.userData;
            return newUserData;
            break;
        case 'logout': 
            newUserData = {};
            return newUserData;
            break;    
        default:
            return userData;
      }

  }