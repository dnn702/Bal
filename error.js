function logError(type,message){

const time=new Date().toLocaleTimeString()

const line=document.createElement("div")

line.className="errorLine"

line.innerHTML=
"<span class='errorTime'>["+time+"]</span> "+
"<span class='errorType'>["+type+"]</span> "+
message

document.getElementById("errorContent").appendChild(line)

}

function toggleError(){

const box=document.getElementById("errorConsole")

if(box.style.height=="30px"){

box.style.height="160px"

}else{

box.style.height="30px"

}

}

window.onerror=function(message,source,line,col,error){

logError(
"JS",
message+" ("+source+":"+line+")"
)

}

window.onunhandledrejection=function(event){

logError(
"PROMISE",
event.reason
)

}

try{

await db.collection("avatars").add(data)

}catch(e){

logError("FIREBASE",e.message)

}

const originalLog=console.log

console.log=function(msg){

originalLog(msg)

logError("LOG",msg)

}