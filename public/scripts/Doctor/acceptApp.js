const acceptAll = document.querySelectorAll('.accept');

acceptAll.forEach(oneAccept=> {

    oneAccept.addEventListener('click', async (e) => {
        const button = e.target.closest('.accept');
        id = button.dataset.appointid;


        const dondition = confirm('Are you sure you want to accept this appointment?');
        if (!dondition) {
            return;
        }

        try {
            const response = await fetch(`/doctor/appointments/accept/${id}`, { method: 'POST' });
            const accept = await response.json();

            if (accept.status) {
                alert('Appointment Accepted');
                location.reload();
            }

            } catch (err) {
                console.error('Error Accept:', err);
                alert('Error Accept');
            }
    })
});