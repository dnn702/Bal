let currentAvatarId=null



function showDetail(id, data){

    currentAvatarId = id;

    document.getElementById("detailModal").style.display = "block";
    document.getElementById("detailAvatar").src = data.image;

    const nameEl = document.getElementById("detailName");
    nameEl.innerText = data.name;

    // 9文字を超えたら横幅を縮める
    if (data.name.length > 9) {
        const scale = 9 / data.name.length;
        nameEl.style.display = "inline-block";
        nameEl.style.transform = `scaleX(${scale})`;
        nameEl.style.transformOrigin = "center";
    } else {
        nameEl.style.transform = "scaleX(1)";
    }
        drawFont(data.cool, "coolValue");
        drawFont(data.cute, "cuteValue");
    drawCost(data.cost, "costValue");
    
    
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

function drawCost(value, elementId){

    const el = document.getElementById(elementId);
    el.innerHTML = "";

    let text = String(value);

    // 1桁なら左側を空白にする
    if(text.length === 1){
        text = ["blank", text];
    }else{
        text = text.split("");
    }

    for(const ch of text){

        const img = document.createElement("img");
img.style.width = "33px";
img.style.height = "33px";
img.style.verticalAlign = "middle";


img.style.marginLeft = "-11px";




        if(ch === "blank"){
            img.src = "assets/costfont/blank.png";
        }else{
            img.src = "assets/costfont/" + ch + ".png";
        }

        el.appendChild(img);
    }

}