import * as React from "react";
import * as Contacts from "expo-contacts";

export type PhoneContact = Contacts.Contact[];
export type Contact = Contacts.Contact;

export const usePhoneContacts = () => {
  const [
    hasPermissionToAccessContact,
    setHasPermissionToAccessContact
  ] = React.useState<"pending" | "granted" | "notgranted">("pending");
  const [phoneContactData, setPhoneContactData] = React.useState<PhoneContact>(
    []
  );
  const [
    initialPhoneContactData,
    setInitialPhoneContact
  ] = React.useState<PhoneContact>([]);

  const loadPhoneContacts = React.useCallback(async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      setHasPermissionToAccessContact("granted");
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails]
      });
      setInitialPhoneContact(data);
      setPhoneContactData(data);
    } else {
      setHasPermissionToAccessContact("notgranted");
    }
  }, []);

  const findContact = (search: string) => {
    const regex = new RegExp(
      `${search.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, "\\$&").trim()}`,
      "i"
    );
    const filteredData = initialPhoneContactData.filter(
      (obj) =>
        obj.phoneNumbers &&
        obj.name
          .concat(obj.phoneNumbers[0].number ? obj.phoneNumbers[0].number : "")
          .search(regex) >= 0
    );
    setPhoneContactData(filteredData);
  };

  return {
    hasPermissionToAccessContact,
    phoneContactData,
    loadPhoneContacts,
    findContact
  };
};
