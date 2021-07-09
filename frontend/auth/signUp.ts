import { firebase } from '../firebase/firebaseClient'
import "firebase/auth";


const SignUpWithEmailPassword = async (
  email: string,
  password: string,
  nama: string,
  angkatan: number,
  setUid : Dispatch<SetStateAction<string>>
) => {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((creds) => {
      const user = creds.user?.uid;
      setUid(user)
    })
    .catch((e) => {
      console.error(e.message);
    });
};

export { SignUpWithEmailPassword };
