auth.onAuthStateChanged(user => {

  if(user){
    console.log("anonymous login OK", user.uid)
  }else{
    auth.signInAnonymously()
  }

})