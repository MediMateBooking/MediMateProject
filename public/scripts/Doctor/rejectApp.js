const rejecttAll = document.querySelectorAll('.reject');

rejecttAll.forEach(oneReject=> {

    oneReject.addEventListener('click', async (e) => {
        const button = e.target.closest('.reject');
        id = button.dataset.appointid;


        const dondition = confirm('Are you sure you want to reject this appointment?');
        if (!dondition) {
            return;
        }

        try {
            const response = await fetch(`/doctor/appointments/reject/${id}`, { method: 'POST' });
            const accept = await response.json();

            if (accept.status) {
                alert('Appointment Rejected');
                location.reload();
            }

            } catch (err) {
                console.error('Error Reject:', err);
                alert('Error Reject');
            }
    })
});