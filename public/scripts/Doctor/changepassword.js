const passwordChangeForm = document.getElementById("passwordChangeForm");
const userID = document.getElementById('userID');

passwordChangeForm.addEventListener("submit", async e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newPassword = formData.get("newPassword");
  const confirmPassword = formData.get("confirmPassword");

  const updatePassword = {
    newPassword : newPassword,
    confirmPassword : confirmPassword
  }

  
  try {
    const response = await fetch(`/doctor/password/${userID.textContent}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatePassword),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const resonse = await response.json();

    if(!resonse.success) {
        alert(resonse.message)
        e.target.reset();
    }else{
        alert(resonse.message)
        e.target.reset();
    }

    }catch(e){
        alert('error update password')
    }
});
