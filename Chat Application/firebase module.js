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

var Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  timerProgressBarColor: 'red',
  didOpen: (toast) => {
  toast.addEventListener('mouseenter', Swal.stopTimer)
  toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});


var showSignup = document.getElementById('showSignup');
var showLogin = document.getElementById('showLogin');

const changeSignup = () => {
  document.getElementById('login').className = 'hidden';
  document.getElementById('signup').className = 'box';
}

const changeLogin = () => {
  document.getElementById('signup').className = 'hidden';
  document.getElementById('login').className = 'box';
}

try {
  showSignup.addEventListener("click", changeSignup);

showLogin.addEventListener("click", changeLogin)
} catch (error) {
  console.log(error)
}




import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";

  import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

  import {
    doc,
    getFirestore,
    collection,
    setDoc,
    addDoc,
  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
  



  const firebaseConfig = {
    apiKey: "AIzaSyBadcdnYjesadKLMbT9iyw8quIc6Zbzhvs",
    authDomain: "dark-room-73.firebaseapp.com",
    projectId: "dark-room-73",
    storageBucket: "dark-room-73.appspot.com",
    messagingSenderId: "388416950055",
    appId: "1:388416950055:web:9eaa5b2e34daa5038e2302"
  };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  const db = getFirestore(app);
  let emailValidiation;
  

  // SIGN-UP START

  const register = () => {
    const name = document.getElementById("name");
    const email = document.getElementById("signupEmail");
    const password = document.getElementById("signupPassword");
    const auth = getAuth();

    if (name.value == ''){
      Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: 'PLEASE INPUT YOUR NAME',
        iconColor: 'red',
        background: 'black',
        color: 'whitesmoke',
      });
    }else{
    createUserWithEmailAndPassword(auth, email.value, password.value, name.value)
      .then(async (userCredential) => {
        let uid = userCredential.user.uid;
        Toast.fire({
          icon: 'success',
          title: 'SIGN-UP SUCCESS ... !',
          background: 'black',
          color: 'red',
          iconColor: 'red'
        });
        document.getElementById('signup').className = 'hidden';
        document.getElementById('login').className = 'box';
        localStorage.setItem("uid", uid);
        console.log(uid);
        addDataToFirestore(email.value, name.value, uid);
        
      })
      .catch((error) => {
        var errorMessage;
        if (error.message == 'Firebase: Error (auth/invalid-email).'){
          errorMessage = 'PLEASE INPUT CORRECT EMAIL ... !';
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: errorMessage,
            iconColor: 'red',
            background: 'black',
            color: 'whitesmoke',
          });
        }
        if (error.message == 'Firebase: Error (auth/internal-error).'){
          errorMessage = 'PLEASE INPUT PASSWORD ... !';
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: errorMessage,
            iconColor: 'red',
            background: 'black',
            color: 'whitesmoke',
          });
        }
        if (error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
          errorMessage = 'PASSWORD SHOULD BE AT LEAST 6 CHARACTERS ... !';
          Swal.fire({
            icon: 'info',
            title: 'INVALID PASSWORD',
            text: errorMessage,
            iconColor: 'red',
            background: 'black',
            color: 'whitesmoke',
          });
        }
        if (error.message == 'Firebase: Error (auth/email-already-in-use).'){
          Swal.fire({
            icon: 'info',
            title: 'SOMETHING WENT WRONG',
            text: 'THE EMAIL YOU HAVE ENTERED HAS BEEN USED BEFORE ... !',
            iconColor: 'red',
            background: 'black',
            color: 'whitesmoke',
          });
        }
        
      });
  }; }
  
  const btn = document.getElementById("signupsubmit");
  
  try {
    btn.addEventListener("click", register);
  } catch (error) {
    console.log(error);
  }

  // SIGN-UP END

  // on signup add data to firestire

  const addDataToFirestore = async (email, name, uid) => {
    try {
      const docRef = await setDoc(doc(db, "users", uid), {
        username: name,
        userEmail: email,
        profile: 'https://firebasestorage.googleapis.com/v0/b/dark-room-73.appspot.com/o/users%2Fdefault%20profile%20picture.jpg?alt=media&token=b59ebea6-1f34-4b7f-b842-daa935422ce7',
      });
      console.log("Username & email written in database");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
// on signup add data to firestire


  // LOG-IN START
  const login = () => {
    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");
    const auth = getAuth();
  

        signInWithEmailAndPassword(auth, email.value, password.value)
          .then((userCredential) => {
            console.log(userCredential.user);
          })
          .catch((error) => {
            
            var errorMessage;
            console.log(error.message);
            if (error.message == 'Firebase: Error (auth/invalid-email).'){
              errorMessage = 'PLEASE INPUT CORRECT EMAIL ... !';
              Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: errorMessage,
                iconColor: 'red',
                background: 'black',
                color: 'whitesmoke',
              });
      }else{}
        
        if (error.message == 'Firebase: Error (auth/internal-error).'){
          errorMessage = 'PLEASE INPUT PASSWORD ... !';
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: errorMessage,
            iconColor: 'red',
            background: 'black',
            color: 'whitesmoke',
          });
        }
        if (error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
          errorMessage = 'PASSWORD SHOULD BE AT LEAST 6 CHARACTERS ... !';
          Swal.fire({
            icon: 'info',
            title: 'INVALID PASSWORD',
            text: errorMessage,
            iconColor: 'red',
            background: 'black',
            color: 'whitesmoke',
          });
        }if (error.message == 'Firebase: Error (auth/wrong-password).'){
          errorMessage = 'WRONG PASSWORD ... !';
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: errorMessage,
            iconColor: 'red',
            background: 'black',
            color: 'whitesmoke',
          });
        }if (error.message == 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).'){
          errorMessage = 'YOUR ACCOUNT HAS BEED TEMPORARY DISABLED IN CASE OF TOO MANY REQUESTS PLEASE TRYAGAIN LATER ... !';
          Swal.fire({
            icon: 'info',
            title: 'SOMETHING WENT WRONG',
            text: errorMessage,
            iconColor: 'red',
            background: 'black',
            color: 'whitesmoke',
          });
        }if (error.message == 'Firebase: Error (auth/user-disabled).'){
          errorMessage = 'YOUR ACCOUNT HAS BEEN DISABLED ... ! \n PLEASE CONTACT ' + '<a herf="https://mail.google.com/">azlankarim660@gmail.com</a>' + ' FOR SUPPORT ... !';
          Swal.fire({
            icon: 'info',
            title: 'SOMETHING WENT WRONG',
            html: errorMessage,
            iconColor: 'red',
            background: 'black',
            color: 'whitesmoke',
          });
        }if (error.message == 'Firebase: Error (auth/user-not-found).'){
          errorMessage = 'USER NOT FOUND ... !';
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: errorMessage,
            iconColor: 'red',
            background: 'black',
            color: 'whitesmoke',
          });
        }
        
      });
  };

  const enable = () => {
    const email = document.getElementById("loginEmail");
    if (email.value){
      document.getElementById('loginSubmit').removeAttribute('disabled');
    }else{
      document.getElementById('loginSubmit').setAttribute('disabled', '');
    }
  }

  window.enable = enable;
  
  const loginBtn = document.getElementById("loginSubmit");
  
  try {
    loginBtn.addEventListener("click", login);
  } catch (error) {
    console.log(error);
  }


  // LOG-IN END

  // email Verification Start

  window.onload = async () => {


    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      

      try {
        if (user) {
          if (!user.emailVerified) {
            sendEmailVerification(auth.currentUser)
              .then(() => {
                Swal.fire({
                  title: 'VERIFY YOUR ACCOUNT',
                  text: "PRESS CONFIRM TO VERIFY YOUR ACCOUNT ... !",
                  icon: 'warning',
                  iconColor: 'red',
                  showCancelButton: true,
                  confirmButtonColor: 'red',
                  cancelButtonColor: 'black',
                  confirmButtonText: 'CONFIRM',
                  background: 'black',
                  color: 'white'
                }).then((result) => {
                  if (result.isConfirmed) {
                    Toast.fire({
                      icon: 'success',
                      title: 'VERIFICATION SENT SUCCESSFULLY .. !',
                      background: 'black',
                      color: 'red',
                      iconColor: 'red'
                    });
                  }
                })
              })
              .catch((err) => console.log(err));
          }
        }
        if (user.emailVerified === true){
          window.open('./profile/profile.html','_self');
          localStorage.removeItem("userInfo");
        } else {
          console.log("email isn't verified...!");
        }
        } catch (error) {
        console.log(error.message);


        sendEmailVerification(auth.currentUser)
        .then(() => {
          Swal.fire({
            title: 'VERIFY YOUR ACCOUNT',
            text: "PRESS CONFIRM TO VERIFY YOUR ACCOUNT ... !",
            icon: 'warning',
            iconColor: 'red',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonColor: 'black',
            confirmButtonText: 'CONFIRM',
            background: 'black',
            color: 'white'
          }).then((result) => {
            if (result.isConfirmed) {
              Toast.fire({
                icon: 'success',
                title: 'VERIFICATION SENT SUCCESSFULLY .. !',
                background: 'black',
                color: 'red',
                iconColor: 'red'
              });
            }
          })
        })
        .catch((err) => console.log(err));


    }
      }
    )}
    
    // email Verification End
    