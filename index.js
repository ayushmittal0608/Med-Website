function sendMail(){
    var mail={
        firstname:document.getElementById('first-name').value,
        lastname:document.getElementById('last-name').value,
        email:document.getElementById('email').value,
        phoneno:document.getElementById('number').value,
        address:document.getElementById('address').value,
        degree:document.getElementById('degree').value,
        speciality:document.getElementById('speciality').value,
        available:document.getElementById('available').value,
        myfile:document.getElementById('myfile').value,
        mycv:document.getElementById('mycv').value,
        radio:document.getElementById('radio').value
    };
}

const serviceID="service_rfkfwik";
const templateID="template_vaxa0cc";

emailjs.send(serviceID, templateID, mail).then((res)=>{
    document.getElementById('first-name').value="";
    document.getElementById('last-name').value="";
    document.getElementById('email').value="";
    document.getElementById('number').value="";
    document.getElementById('address').value="";
    document.getElementById('degree').value="";
    document.getElementById('speciality').value="";
    document.getElementById('available').value="";
    document.getElementById('myfile').value="";
    document.getElementById('mycv').value="";
    document.getElementById('radio').value="";
    console.log(res);
    alert("your message send successfully.");
}).catch((err)=>console.log(err));