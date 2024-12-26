const userID = document.getElementById('userID');
const docID = document.getElementById('docID');
const bookNowBtn = document.getElementById('bookNowBtn')

let date = '';
let time = '';

const allTimeSlots = document.querySelectorAll('.timing')
allTimeSlots.forEach(oneTimeSlot => {
    oneTimeSlot.addEventListener('click', e=> {

        const resetAllSlot = document.querySelectorAll('.timing');
        resetAllSlot.forEach(oneResetSlot => {
                oneResetSlot.style.backgroundColor = '#e9e9e9'
                oneResetSlot.style.color  = '#757575' 
        })

        const button = e.target.closest('.timing');
        date = button.dataset.date;
        time = button.dataset.time;

        oneTimeSlot.style.backgroundColor = '#42c0fb'
        oneTimeSlot.style.color  = 'white'

    })
})

bookNowBtn.addEventListener('click', async e=> {

    if(date === '' && time === '') {
        alert('Please Select a Date with Time slot')
        return
    }

    const newAppoitment = {
        date : date,
        time : time
    }

    try {
        const response = await fetch(`/patient/appoitment/${userID.textContent}/${docID.textContent}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAppoitment),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
    
        const result = await response.json();
    
        if(result.success)  window.location.href = `/appointment/${result.appoitmentID}`
    
        }catch(e){
            alert('error send appointment')
        }


})