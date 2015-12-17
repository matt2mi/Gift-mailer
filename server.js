var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var _ = require('lodash');
//var path = require('path');

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


var from = {
    user: '2m1tema@gmail.com',
    pass: ''
};
var listMails,
    transporter = nodemailer.createTransport(({
    service: 'Gmail',
    auth: from
}));

app.post('/email', function(req, res, next) {
    console.log(req.body);
    listMails = _.shuffle(req.body);

    /*listMails = [
        {
            name: 'Camille Chn',
            mail: 'camille.cochin@gmail.com'
        },
        {
            name: 'Mathilde Février',
            mail: 'fevrier_mathilde@yahoo.fr'
        },
        {
            name: 'Claire Germ',
            mail: 'germainclaire19@hotmail.fr'
        },
        {
            name: 'Corentin Brillant',
            mail: 'corentin.brillant@hotmail.fr'
        },
        {
            name: 'Jean Baptiste La Galisse',
            mail: 'jbrice2@hotmail.fr'
        },
        {
            name: 'Maxime Fouillet',
            mail: 'maxime.fouillet@free.fr'
        },
        {
            name: 'Augustin Bannier',
            mail: 'augustin.bannier@hotmail.fr'
        },
        {
            name: 'Antoine Guilmo',
            mail: 'antoine.guilmault@gmail.com'
        },
        {
            name: 'Maxime Braud',
            mail: 'maxbraud@yahoo.fr'
        },
        {
            name: 'Clémence Eno',
            mail: 'clemenceesnault@laposte.net'
        }
    ];*/

    sendMails();
});

sendMails = function() {
    listMails = _.shuffle(listMails);
	var mailsListDest = shuffleArray(listMails);
    var i;

	for(i=0; i<listMails.length; i++) {
    	sendOneMail(from.user,
            listMails[i],
            mailsListDest[i]);
        console.log('mail à ' + listMails[i].name + ' qui offre un cadeau pour ' + mailsListDest[i].name);
    }

    transporter.close();
};

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

sendOneMail = function(from, to, giftReceiver) {
	/* Notre code pour nodemailer */
    var liste = '';
    for(var i=0; i<listMails.length; i++) {
        liste += listMails[i].name;
        if(i < listMails.length - 1) liste += ', ';
    }
	var mailOptions = {
        from: "Matt Demi",
        to: to.mail,
        subject: 'Cadeau pour...',
        text: 'Yop ' + to.name + ', tu dois offrir un cadeau à ' + giftReceiver.name + ' !',
        html: 'Yop ' + to.name + ', tu dois offrir un cadeau à ' + giftReceiver.name + ' !</p></b>'
	};

    console.log(mailOptions.text);

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log('error : ');
	        console.log(error);
	        res.sendStatus(404);
	    }
	    if(info) console.log('Message sent: ' + info.response);
	});
};

app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/public/index.html');
});

app.use(function(req, res) {
    res.sendStatus(404);
});

app.listen(app.get('port'), function(){
    console.log("Express Started on port : " + app.get('port'));
});