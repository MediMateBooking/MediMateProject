async function rejectingDoctor(e) {

    const status = await Swal.fire({
        title: 'Do you want to reject this account?',
        text: 'Are you sure you want to reject this doctor?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Reject !',
        cancelButtonText: 'Cancel'
    });

    if (status.isConfirmed) {

        const button = e.target.closest('.reject');
        const spine = document.getElementById(button.dataset.docid)
        spine.innerHTML = `<span class="loader"></span>`;

        setTimeout(() => {
            spine.innerHTML = ''; // Clear the loader after 3 seconds
        }, 800);


        try {
            const response = await fetch(`/admin/doctors/reject/${button.dataset.docid}`, { method: 'POST' });
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
            console.error('Error Update Reject Status:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error rejecting the doctor. Please try again.'
            });
        }
    }
}
