const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const url = 'mongodb://localhost/admin';
const cors = require('cors');
const User = require('./model/user');

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to MongoDB...')
	}).catch((error) => { console.error(error) });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())


app.get('/api/user/', (req, res) => {
	res.send('Working')
})


app.post('/api/user/login', async (req, res) => {

	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Invalid UserName or Password');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).json('Invalid UserName or Password');

	res.status(200).json({ status: 'Success', message: 'Login Successfully', isLoggedIn: true })
})


app.post('/api/user/create', async (req, res) => {
	console.log(req.body);
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('User Email Already Exist');

	user = new User({
		firstname: req.body.firstName,
		lastname: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
	})

	try {
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(req.body.password, salt);

		await user.save()
		res.status(200).send(user)
	} catch (err) {
		res.status(400).send(err)
	}

});

app.listen(3000, () => console.log('Blog server running on port 3000!'))