let stylesArray= [ 
    'background-color: black; ', 
    'color: purple',
    'width : 300px', 
    'height : 150px',
    'padding : 30px',
    'font-size : 20px',
    'font-weight : bold',
    'text-align : center',
    'border: 1px dashed purple;'].join(';') 
  
  console.log('%c Created By B♪∆©K P∆Π†H€R 🐈‍ ... !', stylesArray);


  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })




import { 
  initializeApp,
  getApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";

  import {
    getAuth,
    signOut,
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";


import { 
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";


import {
    doc,
    getFirestore,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    getDocs,} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
  
    const firebaseConfig = {
      apiKey: "AIzaSyBadcdnYjesadKLMbT9iyw8quIc6Zbzhvs",
      authDomain: "dark-room-73.firebaseapp.com",
      projectId: "dark-room-73",
      storageBucket: "dark-room-73.appspot.com",
      messagingSenderId: "388416950055",
      appId: "1:388416950055:web:9eaa5b2e34daa5038e2302"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const storage = getStorage(app);
    let uid;

const getUserFromDataBase = async (uid) => {
  let currentUser = document.getElementById("personName");
  let currentUserEmail = document.getElementById("personEmail");
  let title = document.getElementById("title");
  let Upic;

    const docSnap = await getDoc(doc(db, "users", uid));
  currentUser.innerHTML = 'WELCOME &nbsp;' + `${docSnap.data().username}`;
  title.innerHTML = `${docSnap.data().username}`;
  currentUserEmail.innerHTML = 'YOUR EMAIL: &nbsp;' + `(${docSnap.data().userEmail})`;

  Upic = `${docSnap.data().profile}`;
  if(Upic){
  document.querySelector("#showPic").style.backgroundImage = `url(${Upic})`;
  }
  else{
    document.querySelector("#showPic").style.backgroundImage = `url(./default profile picture.jpg)`;
  }



}

window.onload = async () => {

  
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if(user){
      uid = user.uid;
    }else{
      uid = null;
    }
    if (uid == null){
      window.open("../index.html",'_self')
    }
    else{
      console.log("user is registered & logged in.")
      getUserFromDataBase(uid);
    }
  })



  }

const signout = document.getElementById('signout');
let b = 0;

signout.addEventListener('click', () => {
  Toast.fire({
    icon: 'success',
    title: 'SIGN OUT SUCCESSFULLY ... !',
    background: 'black',
    color: 'red',
    iconColor: 'red'
  });
 const auth = getAuth();
 setInterval( () => {
   b++;
   if(b == 3){
   signOut(auth).then(() => {
     // Sign-out successful.
     }).catch((error) => {
     console.log(error.message);
     // An error happened.
     });
    }else{}
}, 1000);
});





const next = document.getElementById('next');

next.addEventListener('click', () => {
  window.open("../chats/chats.html",'_self');
});




        // profile picture

        let uploadBtn = document.getElementById("label");

uploadBtn.addEventListener("change", async () => {
  let myFile = document.getElementById("file");
  let file = myFile.files[0];
  const auth = getAuth();
  let uid = auth.currentUser.uid;
  let url = await uploadFiles(file);
  const washingtonRef = doc(db, "users", uid);
  await updateDoc(washingtonRef, {
    profile: url,
  });
});





      // profile picture



const uploadFiles = (file) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const storageRef = ref(storage, `users/${uid}.png`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        let upLoad = "Upload is " + progress + "% done";
        if(upLoad == "Upload is 100% done"){
          Toast.fire({
            icon: 'success',
            title: 'Picture Uploaded Successfully..!',
            background: 'black',
            color: 'red',
            iconColor: 'red',
        });
      }else{        
        Toast.fire({
        icon: 'success',
        title: 'Uploading ' + progress + '% done',
        background: 'black',
        color: 'red',
        iconColor: 'red'
      });}
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

          document.querySelector("#showPic").style.backgroundImage = `url(${downloadURL})`;
          
          console.log(resolve(downloadURL));


        });
      }
    );
  });
};