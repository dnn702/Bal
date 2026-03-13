async function reportAvatar(id){

const ref=db.collection("avatars").doc(id)

await ref.update({

reports:firebase.firestore.FieldValue.increment(1)

})

alert("通報しました")

}