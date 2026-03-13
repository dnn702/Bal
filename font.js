function drawFont(text,elementId){

const container=document.getElementById(elementId)
container.innerHTML=""

text = Number(text)||0
text = String(text).padStart(6," ")

for(let i=0;i<text.length;i++){

let c=text[i]

const img=document.createElement("img")

if(c===" ") img.src="assets/font/blank.png"
else img.src="assets/font/"+c+".png"

container.appendChild(img)

}

}