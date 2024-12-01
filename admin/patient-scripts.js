document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('add-patient-modal');
    const addPatientBtn = document.getElementById('add-patient-btn');
    const closeBtn = document.querySelector('.close-btn');
    const addPatientForm = document.getElementById('add-patient-form');
    const patientList = document.getElementById('patient-list');

    addPatientBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    addPatientForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('patient-name').value;
        const age = document.getElementById('patient-age').value;
        const gender = document.getElementById('patient-gender').value;
        const condition = document.getElementById('patient-condition').value;

        console.log("Name:", name);
        console.log("Age:", age);
        console.log("Gender:", gender);
        console.log("Condition:", condition);

        const patientItem = document.createElement('div');
        patientItem.classList.add('patient-item');
        patientItem.innerHTML = `
            <img>
            <h3>${name}</h3>
            <p>Age: ${age}</p>
            <p>Gender: ${gender}</p>
            <p>Condition: ${condition}</p>
        `;
        
        patientList.appendChild(patientItem);

        addPatientForm.reset();
        modal.style.display = 'none';
    });
});
