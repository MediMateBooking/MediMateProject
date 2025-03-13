const allViews = document.querySelectorAll('.viewModel');
const appt_details = document.getElementById('appt_details');

allViews.forEach(oneView => {

    oneView.addEventListener('click', async (e) => {
        const button = e.target.closest('.viewModel');
        id = button.dataset.appointid;

        try {
            const response = await fetch(`/doctor/appointments/view/${id}`, { method: 'POST' });
            const viewDataset = await response.json();

            appt_details.innerHTML = ''
            appt_details.innerHTML = `
            
            
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Appointment Details</h5>
                        <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        >
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <ul class="info-details">
                        <li>
                            <div class="details-header">
                            <div class="row">
                                <div class="col-md-6">
                                <span class="text">${viewDataset.appoitmentDate} | ${viewDataset.appoitmentTime}</span>
                                </div>
                                <div class="col-md-6">
                                <div class="text-right">
                                    <button
                                    type="button"
                                    class="btn bg-success-light btn-sm"
                                    id="topup_status"
                                    >
                                    ${viewDataset.status}
                                    </button>
                                </div>
                                </div>
                            </div>
                            </div>
                        </li>
                        <li>
                            <span class="title">Status:</span>
                            <span class="text">${viewDataset.status}</span>
                        </li>
                        <li>
                            <span class="title">Apply Date:</span>
                            <span class="text">${viewDataset.applyDate}</span>
                        </li>
                        <li>
                            <span class="title">Apply Time</span>
                            <span class="text">${viewDataset.applyTime}</span>
                        </li>
                        </ul>
                    </div>
                    </div>
                 </div>
            `;
    
            } catch (err) {
                console.error('Error Get View:', err);
                alert('Error Get View');
            }
    })
});