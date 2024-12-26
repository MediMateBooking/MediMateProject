const userID = document.getElementById('userID');

window.onload = function() {
    fetchAllFavouritList()
};

async function fetchAllFavouritList(){
    try {
        const response = await fetch(`/patient/favourite/${userID.textContent}`, { method: 'POST' });
        const savedList = await response.json();

        if(savedList.status){
            createSavedDocList(savedList.savedDoctorsRecords)
        } 
        
        } catch (err) {
            console.error('Error Get Saved Doctors:', err);
            alert('Error Get Saved Doctors');
        }
}


function createSavedDocList(approveList){
    
    const approveListDiv  = document.getElementById('approveListDiv');
    approveListDiv.innerHTML = ''

    approveList.forEach(oneList => {

        const div = document.createElement('div');
        div.className = ''; 
        div.classList.add('col-md-6', 'col-lg-4', 'col-xl-3');

        div.innerHTML = `
        
        <div class="profile-widget">
                      <div class="doc-img">
                        <a href="/patient/view/${userID.textContent}?docID=${oneList.userID}">
                          <img
                            class="img-fluid"
                            alt="User Image"
                            src="${oneList.profilePicture}"
                          />
                        </a>
                        <a class="fav-btn savedBtn" data-saveid="${oneList.userID}">
                          <i class="far fa-bookmark"></i>
                        </a>
                      </div>
                      <div class="pro-content">
                        <h3 class="title">
                          <a href="doctor-profile.html">Dr.${oneList.name}</a>
                          <i class="fas fa-check-circle verified"></i>
                        </h3>
                        <p class="speciality">
                        ${oneList.specialization.specialist}
                        </p>
    
                        <ul class="available-info">
                          <li>
                            <i class="fas fa-map-marker-alt"></i> ${oneList.address.city}, ${oneList.address.country}
                          </li>
                      
                        </ul>
                        <div class="row row-sm">
                          <div class="col-6">
                            <a href="/patient/view/${userID.textContent}?docID=${oneList.userID}" class="btn view-btn"
                              >View Profile</a
                            >
                          </div>
                          <div class="col-6">
                            <a href="/patient/book/${userID.textContent}?docID=${oneList.userID}" class="btn book-btn"
                              >Book Now</a
                            >
                          </div>
                        </div>
                      </div>
                    </div>
        `
        approveListDiv.append(div)
    })

    if(approveList.length === 0) return alert('No Doctors Found!')

    const allSavedBtn = document.querySelectorAll('.savedBtn')
    allSavedBtn.forEach(oneSaveBtn => {
      oneSaveBtn.addEventListener('click', saveFunction);
    })
}



async function saveFunction(e){
    const button = e.target.closest('.savedBtn');
   
    try {
      const response = await fetch(`/patient/favourite/remove/${button.dataset.saveid}/${userID.textContent}`, { method: 'POST' });
      const statusMessage = await response.json();
  
      if(statusMessage.status){
        alert('Doctor Removed')
        fetchAllFavouritList()
      }
  
    }catch(e){
      console.error('Error Update Status:', e);
    }
  }