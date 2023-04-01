const myModel = document.querySelectorAll('.modal')

async function signup(e){
  e.preventDefault()
  const email = document.querySelector('#signupEmail')
  const password = document.querySelector('#signupPssword')
  
try{
 const result = await firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
 await result.user.updateprofile({
  displayName:"Grafita User"
 })
 await result.user.sendEmailVerification()
 M.toast({html: `Welcome ${result.user.email}`})
  console.log(result)
 }catch(err){
  console.log(err)
  M.toast({html: err.message})
 }
 email.value = ""
 password.value = ""
M.Modal.getInstance( myModel[0]).close()
}


async function login(e){
  e.preventDefault()
  const email = document.querySelector('#loginEmail')
  const password = document.querySelector('#loginPassword')
  
try{
 const result = await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
 M.toast({html: `Welcome ${result.user.email}`})
  console.log(result)
 }catch(err){
  console.log(err)
  M.toast({html: err.message})
 }
 email.value = ""
 password.value = ""
 M.Modal.getInstance( myModel[1]).close()
}



function logout(){
     firebase.auth().signOut()
}

const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  if (user) {
  console.log(user)
  } else {
   console.log('signout success')
   M.toast({html: "Sign Out success",classes:"green"})
  }
});

async function loginWithGoogle(){
try{
var provider = new firebase.auth.GoogleAuthProvider();
  const result = await firebase.auth()
  .signInWithPopup(provider)
  console.log(result)
}catch(err){
  console.log(err)
}

  
  
}
