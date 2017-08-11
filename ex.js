let _ = require('lodash');
let Joi = require('joi');
let Boom = require('boom');
var request = require('request-promise');

let email = "test.user@fictional.com";
let scimUrl = "https://eis-provision-dev.10002.elluciancloud.com/wso2/scim/Users";

let findUser = function(email){
	var option = {
		method: 'GET',
	    url: `${scimUrl}?filter=userName+Eq+%22${email}%22`,
	    headers: {
	    	contentType: "application/json",
	        authorization : "Basic ZWVpZGFkbWluQGVsbHVjaWFuY2xvdWQuY29tOkVsbHVjMWFuIQ=="
	    },
	};

	return request(option);
	// 	if(err){
	// 		console.error('Failed to retrieve SCIM user: ', error);	//Boom.badRequest("Invalid")
	// 		throw err;
	// 	}
	// 	else{
	// 		let body = JSON.parse(res.body);
			
	// 		return new Promise((res, rej)=>{
	// 			if(body.Errors){
	// 				reject(new Error(body.Errors[0].description));
	// 			}
	// 			res(body)
	// 		})
	// 	}
	// });
};

let userExists = function(email){
	// let promise = new Promise((res, rej)=>{
	// 	findUser(email);
			
	// 	rej(false);
	// 	res(true);
	// })
	return new Promise(function(resolve, reject){
		findUser(email).then(function(response){ 
			if(response.Errors){
				resolve(false);
			}
			resolve(true);
		}).catch(function (err){
			resolve(false);
		})
	})	
};

findUser(email).then(function(response){ 
			if(response.Errors){
				console.log(false);
			}
			console.log(true);
		}).catch(function (err){
			console.log(false);
		});
//findUser("carolyn.assa@becker.edu");
//console.log(userExists(email));
userExists("").then(function(userFound){
	console.log(userFound)
});

module.exports = {
	findUser: findUser
}