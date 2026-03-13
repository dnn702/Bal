async function likeAvatar(){

await db.collection("avatars")
.doc(currentAvatarId)
.update({
likes: firebase.firestore.FieldValue.increment(1)
})

loadAvatars()

}