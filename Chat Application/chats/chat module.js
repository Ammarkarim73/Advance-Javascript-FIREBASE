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
  
  console.log('%c Created By B♪∆©K P∆Π†H€R 🐱‍👤 ... !', stylesArray);

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

const userBox = document.getElementById("userBox");

userBox.addEventListener("click", () => {
    window.open("../profile/profile.html",'_self')
})


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";

import {
  doc,
  setDoc,
  getFirestore,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  onSnapshot,
  orderBy,
  updateDoc} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

  import {
    getAuth,
    signOut,
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
  
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
    let uid;
    let usrname;

    const getUserFromDataBase = async (uid) => {
        let currentUser = document.getElementById("username");
        let picture;
          const docSnap = await getDoc(doc(db, "users", uid));
        currentUser.innerHTML = `${docSnap.data().username}`;
        usrname = `${docSnap.data().username}`;

        picture = `${docSnap.data().profile}`;
        if (picture){
          document.getElementById("showPic").style.backgroundImage = `url(${picture})`;
        }else{
          document.getElementById("showPic").style.backgroundImage = `url(../profile/default profile picture.jpg)`;
        }

        getAllUsers(docSnap.data().userEmail, uid, docSnap.data().username);
    
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





        let allMessages = document.getElementById("allMessages");
        allMessages.innerHTML = '<br /> To Sart Chat <br /> Click On A Person You Want To chat' + '<img id="logo" src="../logo.jpg" /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />';


          const signout = document.getElementById('signout');
let b = 0;

signout.addEventListener('click', () => {
  // localStorage.setItem("userInfo", "signout")
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

        }


      const getAllUsers = async (email, currentId, currentName) => {
        const q = query(collection(db, "users"), where("userEmail", "!=", email));
        const querySnapshot = await getDocs(q);
        let users = document.getElementById("friends");

        await querySnapshot.forEach((doc) => {
        users.innerHTML += `<div id="friendData" onclick='startChat("${doc.id}","${doc.data().username}","${currentId}","${currentName}","${doc.data().profile}")' class="flex">` +
        `<img src="${doc.data().profile}" id="friendimage"></img>` +
        `<li class="friendlist">${doc.data().username}</li>` +
        `</div>`;


    });
      }
  



  let unsubscribe;


let startChat = (id, name, currentId, currentName, url) => {
  if (unsubscribe) {
    unsubscribe();
  }
    document.getElementById("chat-with").className= 'chat-with';
    document.getElementById("input").className= 'input';
      
      
      let chatWith = document.getElementById("senderName");
      chatWith.innerHTML = `<img src="${url}" id="msgimage"></img>`+ '  ~' + name;
  // chatWith.innerHTML = name;
  let title = document.getElementById("title");
  title.innerHTML = 'Chatting with ' + name;
  let send = document.getElementById("send");
  let message = document.getElementById("messageInput");
  let chatID;
  if (id < currentId) {
    chatID = `${id}${currentId}`;
  } else {
    chatID = `${currentId}${id}`;
  }
  loadAllChats(chatID, currentId);
  send.addEventListener("click", async () => {
    if(message.value){
    let date = new Date().toDateString();
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let session;
    if (hours > 12 ) {
      hours = hours - 12;
          session = 'PM';
  }else if(hours == 12) {
    session = 'PM';
    }else {
    session = 'AM'
  }
    let time = hours + ':' + minutes + ' ' + session;

    await addDoc(collection(db, "messages"), {
      sender_name: currentName,
      receiver_name: name,
      sender_id: currentId,
      receiver_id: id,
      chat_id: chatID,
      message: message.value,
      timestamp: new Date(),
      message_time: time,
      message_date: date,
    });
    message.value = '';
  }else {}



  });
};


const loadAllChats = (chatID, currentId) => {
  
  try {
    
    const q = query(
      collection(db, "messages"),
      where("chat_id", "==", chatID),
      orderBy("timestamp", "desc")
      );
    let allMessages = document.getElementById("allMessages");
    unsubscribe = onSnapshot(q, (querySnapshot) => {
      allMessages.innerHTML = "";
      querySnapshot.forEach((doc) => {
        let className;
        let divClassName;
        let self;
          if(doc.data().sender_id === currentId) {

            className = "user";
            divClassName = "userdiv";
          }else {
            className =  "friend";
            divClassName = "frienddiv";
          }

          if(doc.data().sender_name == usrname){
            self = 'you';
          }else{
            self = doc.data().sender_name;
          }

        allMessages.innerHTML += `<div id='box'>
        <div id='messageDate'>${doc.data().message_date}</div>
         <div class="${divClassName}"> <p>${self}</p>
        <li class="${className}">
         <br />
          <div>${doc.data().message}</div>
          <sub>${doc.data().message_time}</sub>
          </li>
          </div>
          </div>`;
      });
    });
  }
  catch (error) {
  console.log(error.message)
  }
}


window.startChat = startChat;