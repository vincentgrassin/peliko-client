interface NotificationAction {
    type: string,
    notificationNumber: number
}

export default function(notificationNumber = 0, action: NotificationAction) {
    var updatedNotificationNumber;

    switch (action.type) {  
        case 'update-notification': 
            updatedNotificationNumber = action.notificationNumber;
            return updatedNotificationNumber;
        default:
            return notificationNumber;
      }

  }