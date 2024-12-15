async function rejectingDoctor(e){

    const status = confirm('Do you want to Reject this Account?')

    if(status){

    const button = e.target.closest('.reject');
    const spine = document.getElementById(button.dataset.docid)
    spine.innerHTML = ` <span class="loader"></span>`

    try {
        const response = await fetch(`/admin/doctors/reject/${button.dataset.docid}`, { method: 'POST' });
        const approve = await response.json();

        
        if (approve.message) {
            spine.innerHTML = ''
            alert(approve.message)
        }
        fetchAllApproveList()

        } catch (err) {
            console.error('Error Update Approve Status:', err);
            alert('Error Update Approve Status');
        }

    }

}

