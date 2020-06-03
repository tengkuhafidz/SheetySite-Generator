import firebase from 'firebase/app'
import 'firebase/firestore'
import { navigate } from 'gatsby'

const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
  measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
}

firebase.initializeApp(firebaseConfig)

const FIREBASE_COLLECTION = 'permalinkSheetIdMapping'
const db = firebase.firestore().collection(FIREBASE_COLLECTION)

const fetchPermalinkSheetIdMapping = async (permalink) => {
  return await db.doc(permalink).get()
}

export const findSheetIdByPermalink = async (permalink) => {
  const rawDoc = await fetchPermalinkSheetIdMapping(permalink)

  if (rawDoc.exists) {
    return rawDoc.data().sheetId
  } else {
    navigate('/')
  }
}

const createPermalinkSheetIdMapping = async (permalink, sheetId) => {
  try {
    await db.doc(permalink).set({
      sheetId,
      createdAt: new Date(),
    })
    console.log('successs!')
  } catch (e) {
    console.log('FAILED', e)
  }
}

export const createPermalinkIfNew = async (permalink, sheetId) => {
  const rawDoc = await fetchPermalinkSheetIdMapping(permalink)

  if (rawDoc.exists) {
    console.log(`permalink ${permalink} is already being used`)
  } else {
    await createPermalinkSheetIdMapping(permalink, sheetId)
  }
}

export default firebase
