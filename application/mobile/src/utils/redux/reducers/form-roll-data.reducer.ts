
interface RollDataAction {
    type: string,
    formRollData: {
        id_roll: string
    }
}

export default function(formRollData = {type:"create",id_roll:""}, action: RollDataAction) {
    var newformData;
    switch (action.type) {
        case 'edit': 
            newformData = {type:"edit",id_roll:action.formRollData.id_roll};
            // console.log("REDUCER edit : newformData", newformData)
            return newformData;
            break;
        case 'reset-create-data': 
            newformData = {type:"create",id_roll:""};
            // console.log("REDUCER reset-formData: newformData", newformData)
            return newformData;
            break;    
        default:
            return formRollData;
      }
  }
