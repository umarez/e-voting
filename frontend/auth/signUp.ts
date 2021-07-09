import { firebase } from "../firebase/firebaseClient";
import "firebase/auth";

const SignUpWithEmailPassword: (
  email: string,
  password: string
) => Promise<string> = async (email: string, password: string) => {
  return await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((creds) => {
      const user = String(creds.user?.uid);
      return user;
    })
    .catch((e) => {
      console.error(e.message);
      return "";
    });
};

export { SignUpWithEmailPassword };
