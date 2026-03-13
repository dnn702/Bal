let currentAvatarId=null

function formatName(name){

if(name.length<=9) return name

return name.slice(0,9) + "\n" + name.slice(9)

}

function showDetail(id,data){

currentAvatarId=id

document.getElementById("detailModal").style.display="block"

document.getElementById("detailAvatar").src=data.image

document.getElementById("detailName").innerText=formatName(data.name)

drawFont(data.cool,"coolValue")
drawFont(data.cute,"cuteValue")

}

document.getElementById("backBtn").onclick=()=>{

document.getElementById("detailModal").style.display="none"

}

function closeDetail(){

document.getElementById("detailModal").style.display="none"

}

async function likeAvatar(){

await db.collection("avatars")
.doc(currentAvatarId)
.update({
likes: firebase.firestore.FieldValue.increment(1)
})

loadAvatars()

}

async function badAvatar(){

await db.collection("avatars")
.doc(currentAvatarId)
.update({
bad: firebase.firestore.FieldValue.increment(1)
})

loadAvatars()

}

async function deleteAvatar(){

if(!confirm("このアバターを削除しますか？")) return

await db.collection("avatars")
.doc(currentAvatarId)
.delete()

loadAvatars()

closeDetail()

}