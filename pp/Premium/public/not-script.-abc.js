// Sample data of doctors with their details
const doctors = [
  { 
    name: "Dr. Smith", 
    profession: "Cardiologist",
    whatsapp: "+1234567890",
    email: "drsmith@example.com",
    linkedin: "linkedin.com/in/drsmith",
    active: true
  },
  { 
    name: "Dr. Johnson", 
    profession: "Neurologist",
    whatsapp: "+0987654321",
    email: "drjohnson@example.com",
    linkedin: "linkedin.com/in/drjohnson",
    active: false
  },
  { 
    name: "Dr. Lee", 
    profession: "Dermatologist",
    whatsapp: "+9876543210",
    email: "drlee@example.com",
    linkedin: "linkedin.com/in/drlee",
    active: true
  }
];

// Function to display doctors list in the table
function displayDoctors() {
  const doctorsTableBody = document.querySelector('#doctors-table tbody');
  doctorsTableBody.innerHTML = ''; // Clear previous table body

  doctors.forEach((doctor) => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${doctor.name}</td>
      <td>${doctor.profession}</td>
      <td>${doctor.whatsapp}</td>
      <td>${doctor.email}</td>
      <td>${doctor.linkedin}</td>
      <td>
          <button class="request-btn" data-doctor="${doctor.name}">${getRequestButtonText(doctor.name)}</button>
      </td>
      `;
      doctorsTableBody.appendChild(row);
  });

  doctorsTableBody.querySelectorAll('.request-btn').forEach(button => {
      button.addEventListener('click', () => {
          const doctorName = button.dataset.doctor;
          if (doctorName) { // Check if doctorName is not undefined
              sendAppointmentRequest(doctorName, button);
              console.log('Appointment request sent for:', doctorName);
          } else {
              console.error('Doctor name is undefined.');
          }
      });
  });
}

function isRequestSent(doctorName) {
  const requests = JSON.parse(localStorage.getItem('requests')) || [];
  return requests.some(request => request.doctor === doctorName);
}

// Function to get the text for the request button based on request status
function getRequestButtonText(doctorName) {
  return isRequestSent(doctorName) ? 'Request Sent' : 'Request Appointment';
}

// Function to send appointment request to active doctors
function sendAppointmentRequest(doctorName, button) {
  // Store the request in local storage
  const requests = JSON.parse(localStorage.getItem('requests')) || [];
  requests.push({ doctor: doctorName, status: 'Appointment requested', timestamp: new Date().toLocaleString() });
  localStorage.setItem('requests', JSON.stringify(requests));

  // Change button text and disable it
  button.textContent = 'Request Sent';
  button.disabled = true;
}

// Function to display received requests on the received-requests page
function displayReceivedRequests() {
  const requestsList = document.getElementById('requests-list');
  const requests = JSON.parse(localStorage.getItem('requests')) || [];

  // Clear previous list
  requestsList.innerHTML = '';

  requests.forEach((request, index) => {
      const requestItem = document.createElement('li');
      requestItem.textContent = `Appointment request received for ${request.doctor} at ${request.timestamp}`;

      // Display "Request is declined" if status is 'declined'
      if (request.status === 'declined') {
          const declinedText = document.createElement('span');
          declinedText.textContent = 'Request is declined';
          requestItem.appendChild(declinedText);
      }

      requestsList.appendChild(requestItem);
  });
}

// Function to delete a request
function deleteRequest(index) {
  const requests = JSON.parse(localStorage.getItem('requests')) || [];

  // Remove the request at the specified index
  requests.splice(index, 1);

  // Update the local storage with the modified requests array
  localStorage.setItem('requests', JSON.stringify(requests));

  // Refresh the displayed requests
  displayReceivedRequests();
}

// Display received requests or doctors based on the page
window.addEventListener('load', () => {
  const isRequestSent = localStorage.getItem('requests') !== null;
  if (isRequestSent) {
      displayReceivedRequests();
  } else {
      displayDoctors();
  }
});
