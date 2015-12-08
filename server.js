var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var _ = require('lodash');

var transporter = nodemailer.createTransport(({
    service: 'Gmail',
    auth: {
        user: '2m1tema@gmail.com',
        pass: ''
    }
}));

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res, next) {
    res.render('../views/index.ejs');
});

var listMails;

app.post('/email', function(req, res, next) {
	listMails = _.shuffle(req.body.mailsList.split(';'));
	var mailsListDest = shuffleArray(listMails);
    var i;


	for(i=0; i<listMails.length; i++) {

    	sendOneMail(generator.options.user,
            listMails[i],
            mailsListDest[i]);

        console.log('mail à ' + listMails[i] + ' qui offre un cadeau pour ' + mailsListDest[i]);
    }

    transporter.close();
});

shuffleArray = function(list) {
    // shuffle que la liste en param par rapport à la liste en var globale
    list = _.shuffle(list);
    var isGoodShuffled = true;
    for(var i=0; i<listMails.length; i++) {
        if(listMails[i] === list[i]) {
            isGoodShuffled = false;
        }
    }

    if(isGoodShuffled) return list;

    return shuffleArray(list);
};

app.use(function(req, res) {
    res.sendStatus(404);
});

app.listen(8080, function(){
	console.log("Express Started on Port 8080");
});

sendOneMail = function(from, to, giftReceiver) {
	/* Notre code pour nodemailer */
    var liste = listMails.join(', ');
	var mailOptions = {
        from: "",
        to: to,
        subject: 'cadeau pour...',
        text: 'Parmi ' + liste + ', tu dois offrir un cadeau à ' + giftReceiver + ' !',
        html: '<b><p>Parmi ' + liste + ', tu dois offrir un cadeau à ' + giftReceiver + ' !</p></b>'
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log('error : ');
	        console.log(error);
	        res.sendStatus(404);
	    }
	    if(info) console.log('Message sent: ' + info.response);
	});
};