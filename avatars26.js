const fixedAvatars = [
    {
        id: "admin001",
        name: "テスト16",
        image: "assets/avatar/admin001.png",
        rare: 16,
        cool: 300000,
        cute: 100000,
        cost: 33,
        likes: 3000,
        bad: 0
    },
    {
        id: "admin003",
        name: "オパールつるはし",
        image: "assets/avatar/admin003.png",
        rare: 17,
        cool: 406029,
        cute: 252898,
        cost: 34,
        likes: 0,
        bad: 0
    },
    {
        id: "admin004",
        name: "海遊館大阪2",
        image: "assets/avatar/admin004.png",
        rare: 67,
        cool: 508297,
        cute: 478122,
        cost: 34,
        likes: 0,
        bad: 0
    },
    {
        id: "admin005",
        name: "ガチャカプ集団",
        image: "assets/avatar/admin005.png",
        rare: 67,
        cool: 399393,
        cute: 518482,
        cost: 34,
        likes: 6900,
        bad: 0
    },
    {
        id: "admin006",
        name: "ガチャカプ集団",
        image: "assets/avatar/admin006.png",
        rare: 721,
        cool: 983731,
        cute: 198482,
        cost: 34,
        likes: "ばます",
        bad: 0
    },
    {
        id: "admin007",
        name: "ガチャカプ集団",
        image: "assets/avatar/admin007.png",
        rare: 721,
        cool: 899993,
        cute: 491018,
        cost: 35,
        likes: "ナウシカ",
        bad: 0
    },
    {
        id: "admin008",
        name: "大阪・ユニバ川2",
        image: "assets/avatar/admin008.png",
        rare: 15,
        cool: 251426,
        cute: 179918,
        cost: 32,
        likes: "38000",
        bad: 0
    },
    {
        id: "admin009",
        name: "太陽光る住宅街",
        image: "assets/avatar/admin009.png",
        rare: 16,
        cool: 306539,
        cute: 250696,
        cost: 34,
        likes: "umi000",
        bad: 0
    },
    {
        id: "admin010",
        name: "太陽去る住宅街",
        image: "assets/avatar/admin010.png",
        rare: 17,
        cool: 401598,
        cute: 258228,
        cost: 34,
        likes: "umi000",
        bad: 0
    },
    {
        id: "admin013",
        name: "ネザーなるキャンプ場",
        image: "assets/avatar/admin013.png",
        rare: 77,
        cool: 789996,
        cute: 100512,
        cost: 34,
        likes: "umi000",
        bad: 0
    },
    {
        id: "admin011",
        name: "夕日なる住宅街",
        image: "assets/avatar/admin011.png",
        rare: 17,
        cool: 408673,
        cute: 240098,
        cost: 33,
        likes: "umi000",
        bad: 0
    },
    {
        id: "admin012",
        name: "レインボーメロンパン",
        image: "assets/avatar/admin012.png",
        rare: 77,
        cool: 508112,
        cute: 609104,
        cost: 33,
        likes: "umi000",
        bad: 0
    },
    
    {
        id: "admin002",
        name: "テスト17",
        image: "assets/avatar/admin002.png",
        rare: 17,
        cool: 450000,
        cute: 200000,
        cost: 30,
        likes: 3000,
        bad: 0
    }
];



const grid=document.getElementById("avatarGrid")

async function loadAvatars(){

grid.innerHTML=""

let sort=document.getElementById("sort").value


let search=document.getElementById("search").value.toLowerCase()

fixedAvatars.forEach(data=>{

const name=(data.name || "").toLowerCase();

if(search!=="" && !name.includes(search)){
    return;
}

const div=document.createElement("div");
div.className="avatar";

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

`;

div.onclick=()=>showDetail(data.id,data);

grid.appendChild(div);

});



let q=db.collection("avatars")

if(sort=="rare") q=q.orderBy("rare","desc")
else if(sort=="cute") q=q.orderBy("cute","desc")
else if(sort=="cool") q=q.orderBy("cool","desc")
else if(sort=="likes") q=q.orderBy("likes","desc")
else q=q.orderBy("likes","desc")

q=q.limit(100)

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
