// async function approvingDoctor(e){

//         const status = confirm('Do you want to Approve this Account?')

//         if(status){

//         const button = e.target.closest('.approve');
//         const spine = document.getElementById(button.dataset.docid)
//         spine.innerHTML = ` <span class="loader"></span>`

//         try {
//             const response = await fetch(`/admin/doctors/approve/${button.dataset.docid}`, { method: 'POST' });
//             const approve = await response.json();

            
//             if (approve.message) {
//                 spine.innerHTML = ''
//                 alert(approve.message)
//             }
//             fetchAllApproveList()

//             } catch (err) {
//                 console.error('Error Update Approve Status:', err);
//                 alert('Error Update Approve Status');
//             }

//         }

//     }


async function approvingDoctor(e) {

    const status = await Swal.fire({
        title: 'Do you want to approve this account?',
        text: 'Are you sure you want to approve this doctor?',
        icon: 'success',
        showCancelButton: true,
        cancelButtonColor: 'red', 
        confirmButtonColor: '#3085d6', 
        confirmButtonText: 'Approve !',
        cancelButtonText: 'Cancel'
    });

    if (status.isConfirmed) {

        const button = e.target.closest('.approve');
        const spine = document.getElementById(button.dataset.docid)
        spine.innerHTML = `<span class="loader"></span>`;

        setTimeout(() => {
            spine.innerHTML = ''; 
        }, 800);


        try {
            const response = await fetch(`/admin/doctors/approve/${button.dataset.docid}`, { method: 'POST' });
            const approve = await response.json();


            if (approve.message) {
                spine.innerHTML = ''
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: approve.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                
            }
            fetchAllApproveList()

        } catch (err) {
            console.error('Error Update Approve Status:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error approving the doctor. Please try again.'
            });
        }

    }
    // else if (result.dismiss === Swal.DismissReason.cancel) {
    //     console.log('Approval process was canceled.');

    // }
}