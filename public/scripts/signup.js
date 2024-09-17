const mainDetails = document.getElementById('mainDetails');
const roleDropDown = document.getElementById('role');
const slmcregi = document.getElementById('slmcregi');
const topicHeader = document.getElementById('roleTopic');
const submitBtn = document.getElementById('submitBtn');
submitBtn.disabled = true;

roleDropDown.addEventListener('input', e=> {

    let option = e.target.value;

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