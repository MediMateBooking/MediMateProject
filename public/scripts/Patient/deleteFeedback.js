const deleteAll = document.querySelectorAll('.badge.badge-pill.bg-danger.delete');

deleteAll.forEach(oneDelete=> {

    oneDelete.addEventListener('click', async (e) => {
        const button = e.target.closest('.delete');
        id = button.dataset.feedbackid;

        console.log(id)


        const dondition = confirm('Are you sure you want to delete this Feedback?');
        if (!dondition) {
            return;
        }

        try {
            const response = await fetch(`/patient/feedback/delete/${id}`, { method: 'POST' });
            const deleteFeedback = await response.json();

            if (deleteFeedback.status) {
                alert('Feedback Deleted');
                location.reload();
            }

            } catch (err) {
                console.error('Error Delete:', err);
                alert('Error Delete');
            }
    })
});