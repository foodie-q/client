import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp(Expo.Constants.manifest.extra.firebase);

export const db = firebase.firestore();

export const dbUsers = db.collection('users');
export const dbMenus = db.collection('menus');
export const dbOrders = db.collection('orders');
export const dbSaldo = db.collection('saldo');
export const dbOnGoing = db.collection('ongoing');


export const auth = firebase.auth();
