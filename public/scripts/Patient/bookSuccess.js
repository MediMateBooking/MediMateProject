const userID = document.getElementById('userID');
const docID = document.getElementById('docID');

setTimeout(()=>{
    window.location.href = `/patient/${userID.textContent}`
},6000)