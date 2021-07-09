import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import config from './config';

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(config);
}

const analytics = firebase.analytics;

export { firebase, analytics };