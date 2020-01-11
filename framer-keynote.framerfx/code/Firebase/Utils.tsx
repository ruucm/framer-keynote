const hashCode = str =>
  str
    .split("")
    .reduce((hash, val) => ((hash << 5) - hash + val.charCodeAt(0)) | 0, 0);

export const isChrome =
  /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
export const isSafari =
  /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

export var firebaseConfig = {
  apiKey: "AIzaSyC5enma_KQHkz0wdiNXU9ENBAZ3ldiY80Q",
  authDomain: "connections-test-2.firebaseapp.com",
  databaseURL: "https://connections-test-2.firebaseio.com",
  projectId: "connections-test-2",
  storageBucket: "",
  messagingSenderId: "549859963120",
  appId: "1:549859963120:web:1c73571a9f52113f"
};

const storageKey = "$$FirebaseDataChat";

function generateUserID() {
  //@ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, a =>
    (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
  );
}

const createNewUserID = () => {
  const newID = generateUserID();
  localStorage.setItem(storageKey, JSON.stringify(newID));
  return newID;
};

export const getUserID = () =>
  localStorage.getItem(storageKey)
    ? JSON.parse(localStorage.getItem(storageKey))
    : createNewUserID();
