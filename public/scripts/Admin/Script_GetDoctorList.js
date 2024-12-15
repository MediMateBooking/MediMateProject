window.onload = function() {
    fetchAllApproveList()
};

async function fetchAllApproveList(){
    try {
        const response = await fetch(`/doctors/approvelist`, { method: 'POST' });
        const approveList = await response.json();

            createApproveList(approveList.approveDoctorList)

        } catch (err) {
            console.error('Error Update Approve Status:', err);
            alert('Error Update Approve Status');
        }
}


function createApproveList(approveList){
    
    const approveListTable  = document.getElementById('approveListTable');
    approveListTable.innerHTML = ''

    if(approveList.length === 0){
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>No Records for Approval</td>`
        approveListTable.append(tr)
    }

    approveList.forEach(oneList => {
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
        
                <td>
                    <h2 class="table-avatar">
                        <a 
                            class="avatar avatar-sm mr-2"><img
                                class="avatar-img rounded-circle"
                                src="${oneList.profilePicture}"
                                alt="User Image"></a>
                        <a>${oneList.name}<span>#PT0016</span></a>
                    </h2>
                </td>
                <td>${oneList.applyDate}<span class="d-block text-info">${oneList.applyTime}</span></td>
                <td>${oneList.slmcregi}</td>                                                                                                                             
                <td class="text-right">
                    <div class="table-action">
                        
                        <a data-docid="${oneList.userID}"
                            class="btn btn-sm bg-success-light approve">
                            <i class="fas fa-check"></i> Approve
                        </a>
                        <a data-docid="${oneList.userID}"
                            class="btn btn-sm bg-danger-light reject">
                            <i class="fas fa-times"></i> Reject
                        </a>
                    </div>
                </td>

                <td id="${oneList.userID}"></td>
        `

        approveListTable.append(tr);
    });

    
    const allApproveBtns = document.querySelectorAll('.approve');
    allApproveBtns.forEach(oneApproveBtn => {

        oneApproveBtn.addEventListener('click', approvingDoctor)
    })   
}