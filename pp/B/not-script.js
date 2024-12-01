// Sample data of doctors with their details
const doctors = [
  { 
    name: "Ayush Mittal", 
    profession: "Dentist",
    whatsapp: "9810229141",
    email: "mittalayush2003@gmail.com",
    linkedin: "linkedin.com/in/ayushmittal",
    active: true
  },
  { 
    name: "Harsh Singh", 
    profession: "Radiologist",
    whatsapp: "9958236611",
    email: "harshsingh5806937@gmail.com",
    linkedin: "linkedin.com/in/harshsingh",
    active: false
  },
  { 
    name: "Himanshu Shukla", 
    profession: "Heart Surgeon",
    whatsapp: "7678499118",
    email: "himanshushukla2109@gmail.com",
    linkedin: "linkedin.com/in/himanshushukla",
    active: true
  },
  { 
    name: "Naman Goel", 
    profession: "Neurologist",
    whatsapp: "8950752691",
    email: "namangoel075@gmail.com",
    linkedin: "linkedin.com/in/namangoel",
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
          sendAppointmentRequest(doctorName);
          button.textContent = 'Request Sent';
          button.disabled = true;
          window.alert='Request Sent';
          console.log('Appointment request sent for:', doctorName);
        } 
        else {
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
function sendAppointmentRequest(doctorName) {

  // Store the request in local storage
  const requests = JSON.parse(localStorage.getItem('requests')) || [];
  requests.push({ doctor: doctorName, timestamp: new Date().toLocaleString() });
  localStorage.setItem('requests', JSON.stringify(requests));

  const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
  notifications.push({ message: `Appointment request received for ${doctorName}`, timestamp: new Date().toLocaleString() });
  localStorage.setItem('notifications', JSON.stringify(notifications));

  // Redirect to received-requests page
}

// Function to display received requests on the received-requests page
// Function to display received requests on the received-requests page
// Function to display received requests on the received-requests page
function displayReceivedRequests() {
  const requestsList = document.getElementById('requests-list');
  const requests = JSON.parse(localStorage.getItem('requests')) || [];

  // Clear previous list
  requestsList.innerHTML = '';

  requests.forEach((request, index) => {
    const requestItem = document.createElement('li');
    requestItem.textContent = `Appointment request received for ${request.doctor} at ${request.timestamp}`;
    requestItem.style.fontSize='15px';

    const approveButton = document.createElement('button');
      approveButton.innerHTML = '<i class="fas fa-check"></i>';
      approveButton.addEventListener('click', () => {
          approveRequest(index);
      });


    // Create a delete button for each request item
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.addEventListener('click', () => {
      deleteRequest(index);
          requestItem.textContent = 'Request is declined';
    });

    requestItem.appendChild(approveButton);

    // Append the delete button to the request item
    requestItem.appendChild(deleteButton);

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

  const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
  notifications.push({ message: 'Appointment request declined', timestamp: new Date().toLocaleString() });
  localStorage.setItem('notifications', JSON.stringify(notifications));

  // Refresh the displayed requests
  displayReceivedRequests();
}

function approveRequest(index) {
  const requests = JSON.parse(localStorage.getItem('requests')) || [];
  const request = requests[index];
  if (request) {
      // Update request status
      request.status = 'Approved';
      
      // Update local storage
      localStorage.setItem('requests', JSON.stringify(requests));

      // Add notification for approval
      const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
      notifications.push({ message: `Appointment request approved for ${request.doctor}`, timestamp: new Date().toLocaleString() });
      localStorage.setItem('notifications', JSON.stringify(notifications));

      // Refresh the displayed requests
      displayReceivedRequests();
  }
}


// Display received requests on page load
window.addEventListener('load', displayReceivedRequests);


// Check if we're on the received-requests page and display received requests
if (window.alert === 'Request Sent') {
  displayReceivedRequests();
} else {
  displayDoctors();
}
