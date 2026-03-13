const grid=document.getElementById("avatarGrid")

async function loadAvatars(){

grid.innerHTML=""

let sort=document.getElementById("sort").value


let search=document.getElementById("search").value.toLowerCase()


let q=db.collection("avatars")

if(sort=="rare") q=q.orderBy("rare","desc")
else if(sort=="cute") q=q.orderBy("cute","desc")
else if(sort=="cool") q=q.orderBy("cool","desc")
else if(sort=="likes") q=q.orderBy("likes","desc")
else q=q.orderBy("likes","desc")

q=q.limit(50)

const snap=await q.get()

snap.forEach(doc=>{

const data=doc.data()

const name=(data.name || "").toLowerCase()

if(search!=="" && !name.includes(search)){
return
}
const div=document.createElement("div")
div.className="avatar"

div.innerHTML=`

<img class="ab" src="${data.image}">
<p>${data.name}</p>

<div class="rare rare${data.rare}">
★${data.rare}
</div>

<div class="vote">
👍 ${data.likes || 0}
👎 ${data.bad || 0}
</div>

`

div.onclick=()=>showDetail(doc.id,data)

grid.appendChild(div)

})

}

let searchTimer

document.getElementById("search").oninput=()=>{

clearTimeout(searchTimer)

searchTimer=setTimeout(loadAvatars,200)

}

document.getElementById("sort").onchange=loadAvatars



loadAvatars()
