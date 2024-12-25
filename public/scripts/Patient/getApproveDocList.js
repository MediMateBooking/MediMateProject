const userID = document.getElementById('userID');

window.onload = function() {
    fetchAllApproveDocList()
};

async function fetchAllApproveDocList(){
    try {
        const response = await fetch(`/patient/approveDocList/${userID.textContent}`, { method: 'POST' });
        const approveList = await response.json();

            if(approveList.activeDoctorsList.length === 0) return alert('No Doctors Found!')

            createApproveDocList(approveList.activeDoctorsList,approveList.savedList)

        } catch (err) {
            console.error('Error Get Approve Status:', err);
            alert('Error Get Approve Status');
        }
}

function createApproveDocList(approveList,savedList){
    
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
                          ${savedList.includes(oneList.userID) ? `<i class="far fa-bookmark" id="savedIcon"></i>`: ''}
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
                            <a href="booking.html" class="btn book-btn"
                              >Book Now</a
                            >
                          </div>
                        </div>
                      </div>
                    </div>
        `
        approveListDiv.append(div)
    })

    const allSavedBtn = document.querySelectorAll('.savedBtn')
    allSavedBtn.forEach(oneSaveBtn => {
      oneSaveBtn.addEventListener('click', saveFunction);
    })
}


async function saveFunction(e){
  const button = e.target.closest('.savedBtn');
  console.log(button.dataset.saveid)

  try {
    const response = await fetch(`/patient/add/saved/${button.dataset.saveid}/${userID.textContent}`, { method: 'POST' });
    const statusMessage = await response.json();

    if(statusMessage.status){
      alert('Doctor Saved')
      fetchAllApproveDocList()
    }else{
      alert('Doctor Removed')
      fetchAllApproveDocList()
    }

  }catch(e){
    console.error('Error Update Status:', e);
  }
}