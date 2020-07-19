import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";




const config = {
      apiKey: "AIzaSyAh6k4bJwwkWt11LUD5jn0ONkgGy2MQgPI",
      authDomain: "eduevents-f446a.firebaseapp.com",
      databaseURL: "https://eduevents-f446a.firebaseio.com",
      projectId: "eduevents-f446a",
      storageBucket: "eduevents-f446a.appspot.com",
      messagingSenderId: "830703304301",
      appId: "1:830703304301:web:9428f994042520ebb7c964",
      measurementId: "G-RMYEXN7H9G"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore(); 


export const provider = new firebase.auth.GoogleAuthProvider();




export const signInWithGoogle = (e) => { 
    e.preventDefault();
    auth.signInWithPopup(provider);
}

export const createUserProfileDoc = async (userAuth , additionalDetails) => {
  if (!userAuth)
    {
      return; 
    }
    const userRef = firestore.doc("users/" + userAuth.uid);

    const snapshot = await userRef.get();

    if(!snapshot.exists)  
      {
        const {displayName, email} = userAuth; 
        const createdAt = new Date(); 
        try{
          await userRef.set({
             displayName,
             email,
             createdAt,
             ...additionalDetails
           }); 
        }
        catch(error)
          {
              console.error("Error creating user", error); 
          }
      }
      return userRef; 
}

export const addCollectionandDocuments = async (collectionKey , objectToAdd) => {
  const collectionRef = firestore.collection(collectionKey); 
  const batch = firestore.batch();
    objectToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc() ;
    batch.set(newDocRef, obj);
  });
  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collectionsSnapshot) =>
  {
    const {docs} = collectionsSnapshot; 
    const collectionsArr = docs.map(collectionSnapshot => {
        const {title , items} = collectionSnapshot.data();
        const newObj = {title , items, routeName:encodeURI(title) , id:collectionSnapshot.id};
        return newObj;
    })
    
    let collectionsObj = {}; 
    collectionsArr.forEach(collection =>{
          collectionsObj[collection.title.toLowerCase()] = collection;
      });

      return collectionsObj;
  }

export const getFirebaseUserById = async (id) => {
 try{
    const user = await firestore.collection("users").doc(id).get();
    return user.data();
  }
  catch(error)
    {
      return error;
    }
}


export default firebase; 