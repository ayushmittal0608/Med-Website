const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()

var Publishable_Key = 'pk_test_51P2TWpSIzjl3LEIAQLHkq0p2wdDgRXze15Ymcb6BYaFU7Y2zEx9cFN3kqKEgcpVD2j1xZEofoAHyAlZi2LxueXuf00jsmwfmn1'
var Secret_Key = 'sk_test_51P2TWpSIzjl3LEIAEgrGuVMw0M4cHaxQAXrIA9I3FhyxWQcT72wDn56LeB4lBnswi1KTX6ZJqERp9wtCGfmldkAx00IFB46ez3'

const stripe = require('stripe')(Secret_Key)

const port = process.env.PORT || 2500

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function(req, res){
	res.render('Home', {
	key: Publishable_Key
	})
})

app.post('/payment', function(req, res){

	// Moreover you can take more details from user
	// like Address, Name, etc from form
	stripe.customers.create({
		email: req.body.stripeEmail,
		source: req.body.stripeToken,
		name: 'Gourav Hammad',
		address: {
			line1: 'TC 9/4 Old MES colony',
			postal_code: '452331',
			city: 'Indore',
			state: 'Madhya Pradesh',
			country: 'India',
		}
	})
	.then((customer) => {

		return stripe.charges.create({
			amount: 100000,	 // Charging Rs 1000
			description: 'Web Development Product',
			currency: 'INR',
			customer: customer.id
		});
	})
	.then((charge) => {
		res.send("Success") // If no error occurs
	})
	.catch((err) => {
		res.send(err)	 // If some error occurs
	});
})

app.listen(port, function(error){
	if(error) throw error
	console.log("Server created Successfully")
})
