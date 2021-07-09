import firebase from "firebase/app";
import "firebase/auth";

const signInWithEmailPasswod = (email: string, password: string) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential: any) => {
      
      var user = userCredential
      console.log(user);
      return true;
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage);
      return false;
    });
};

export { signInWithEmailPasswod };