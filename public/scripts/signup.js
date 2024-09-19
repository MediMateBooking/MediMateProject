const mainDetails = document.getElementById('mainDetails');
const roleDropDown = document.getElementById('role');
const slmcregi = document.getElementById('slmcregi');
const topicHeader = document.getElementById('roleTopic');
const submitBtn = document.getElementById('submitBtn');
submitBtn.disabled = true;

const userName = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const compassword = document.getElementById('compassword');
const slmcregistration = document.getElementById('slmcregistration');

const statusMessage = document.querySelector('.statusMessage p');
const statusMessageFrame = document.querySelector('.statusMessage');

let option;

roleDropDown.addEventListener('input', e=> {

    option = e.target.value;
    statusMessageFrame.style.display = 'none';
    // submitBtn.textContent = 'Signup';

    userName.value = ''
    email.value = ''
    password.value = ''
    compassword.value = ''
    slmcregistration.value = ''


    if(option.trim()=== 'patient'){
        mainDetails.style.display = 'block';
        slmcregi.style.display = 'none';
        topicHeader.textContent = 'Patient';
        submitBtn.disabled = false;
        return;
    }

    if(option.trim()=== 'doctor'){
        mainDetails.style.display = 'block';
        slmcregi.style.display = 'block';
        topicHeader.textContent = 'Doctor';
        submitBtn.disabled = false;
        return
    }

    mainDetails.style.display = 'none';
    slmcregi.style.display = 'none';
    topicHeader.textContent = '';
    submitBtn.disabled = true;

})


submitBtn.addEventListener('click', async()=> {

     statusMessage.textContent = ''
     statusMessageFrame.style.display = 'none';

     submitBtn.innerHTML = ''
     submitBtn.innerHTML = `<div id="preloader">
                          <div class="spinner">
                          </div>
                        </div>`
     
    const userDetails = {
        userName : userName.value.trim(),
        email : email.value.trim(),
        password : password.value.trim(),
        confirmPassword : compassword.value.trim(),
        role : option.trim()

    }
    if(option.trim()=== 'doctor'){

        userDetails.slmcregi = slmcregistration.value.trim()

        try {
            const response = await fetch(`/signup/doctors`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userDetails)
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);  
            }
    
            const resonse = await response.json();

            if(!resonse.success){

                statusMessage.textContent = resonse.message;
                statusMessage.classList.remove('successMessage')
                statusMessage.classList.add('warningMessage')
                statusMessageFrame.style.display = 'block';
                submitBtn.innerHTML = ''
                submitBtn.textContent = 'Signup'
            }else{

                statusMessage.textContent = resonse.message;
                statusMessage.classList.remove('warningMessage')
                statusMessage.classList.add('successMessage')
                statusMessageFrame.style.display = 'block';
                submitBtn.innerHTML = ''
                submitBtn.textContent = 'Signup'
                

                // window.location.href = resonse.redirectUrl;
            }

                
        } catch (error) {
            console.error(error.message);
            preLoader.style.display = 'none';
            alert('Cannot Send Data!');
        }

        return
    }





    if(option.trim()=== 'patient'){

        try {
            const response = await fetch(`/signup/patients`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userDetails)
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);  
            }
    
            const resonse = await response.json();

            if(!resonse.success){

                statusMessage.textContent = resonse.message;
                statusMessage.classList.remove('successMessage')
                statusMessage.classList.add('warningMessage')
                statusMessageFrame.style.display = 'block';
                submitBtn.innerHTML = ''
                submitBtn.textContent = 'Signup'
            }else{

                statusMessage.textContent = resonse.message;
                statusMessage.classList.remove('warningMessage')
                statusMessage.classList.add('successMessage')
                statusMessageFrame.style.display = 'block';
                submitBtn.innerHTML = ''
                submitBtn.textContent = 'Signup'
                

                // window.location.href = resonse.redirectUrl;
            }

                
        } catch (error) {
            console.error(error.message);
            preLoader.style.display = 'none';
            alert('Cannot Send Data!');
        }

        return
    }
})