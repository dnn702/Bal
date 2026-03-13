document.getElementById("uploadBtn").onclick = async () => {

  try {

    if(!auth.currentUser){
      alert("ログイン待機中です");
      return;
    }

    const name = document.getElementById("name").value;
    const cool = Number(document.getElementById("cool").value);
    const cute = Number(document.getElementById("cute").value);
    const rare = Number(document.getElementById("rare").value);

    const file = document.getElementById("image").files[0];

    if(!file){
      alert("画像を選択してください");
      return;
    }

    console.log("画像読み込み開始");

    const reader = new FileReader();

    reader.onload = function(event){

      const img = new Image();

      img.onload = async function(){

        const canvas = document.createElement("canvas");

        const targetW = 500;
        const targetH = 660;

        canvas.width = targetW;
        canvas.height = targetH;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0, targetW, targetH);

        const base64 = canvas.toDataURL("image/jpeg", 0.7);

        console.log("圧縮完了");

        await db.collection("avatars").add({
          name,
          cool,
          cute,
          rare,
          image: base64,
          likes: 0,
          reports: 0,
          uid: auth.currentUser.uid,
          time: Date.now()
        });

        alert("投稿成功");

        loadAvatars();

        closeUpload();

      };

      img.src = event.target.result;

    };

    reader.readAsDataURL(file);

  } catch(e) {

    console.error(e);
    alert("エラー: " + e.message);

  }

};