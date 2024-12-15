const statusMessage = document.querySelector(".statusMessage p");
const statusMessageFrame = document.querySelector(".statusMessage");


async function approvingDoctor(e){

        const status = confirm('Do you want to Approve this Account?')

        if(status){

        const button = e.target.closest('.approve');
        const spine = document.getElementById(button.dataset.docid)
        spine.innerHTML = ` <span class="loader"></span>`

        try {
            const response = await fetch(`/admin/doctors/approve/${button.dataset.docid}`, { method: 'POST' });
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

