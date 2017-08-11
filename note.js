----------------------------------------------------------------------------------------------------
git		https://confluence.ellucian.com/pages/viewpage.action?spaceKey=EIM&title=Git+Reference
		https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository
	**always pull from master before commit
	- version control system
	-takes snapshots of a project and stores as unique vers
	- ls - la
	-comand line:
		git config --list / --global user.name "" / --global user.email ""
		git help <verb> or git <verb> --help
		git init <= creates a skeleton local repository in the current directory
		rm -rf .git <= stop tracking the current project/directory
		git add --all <= picks up new, modified, and deleted files for staging
				- git add <file>
		git reset <file> <= remove files from staging
		git commit -m "my commit message" <= commit your staged items (commit locally)
		git status
		git log <= view commit history
			    - (n) : how last n commits
			    - --since, --after : Limit the commits to those made after the specified date.
			    - git config --global --edit
			    - git commit --amend --reset-author

		git clone <url><where> <= . means in current directory
				- git clone ../remote_repository.git .


		git diff <= show changes that made to the code/ file

		-push changes to remote repository so people can have access to it
			-git pull <= pull any changes that have been made since last pull
			-git push <REMOTENAME> <BRANCHNAME> <= usually: git push origin master 
				//push an existing repository from the command line
					git remote add origin https://github.com/lmy233/ellucianNote.git
					git push -u origin master <= after this we only need push & pull

		-branch:
			git branch <= w/o branch name == list out all local branch || git branch -a
			git branch <BRANCHNAME> <= create a branch
			//create new branch, head node still points to orignal/current branch, not new branch
			git checkout <BRANCHNAME> <= switched to branch BRANCHNAME
				- use git push - u origin <BRANCHNAME> <= to associate local and master branch
			git branch --merged <= to see merge branches
			git merge <BRANCHNAME> <= to merge with master (after everything is done, pull first!)
			//after merging with master -> no longer need that branch
			git branch -d <BRANCH> <= deleted branch LOCALLY (do git branch --merged to check first)
			git push origin --delete <BRANCHNAME> <= delete branch remotely 
													(origin = name of remote repo)
		Steps:
			-//on master branch, want to work on specific function
				git branch func //create branch named func
			-//switch to that branch
				git checkout func 
			-//in func branch, working in func branch...make changes
				git status
				git add -A 				//add all to staging directory
				git commit -m "message" //commit changes
				git push -u origin func //push that branch to the remote repo
			-//all test, changes when well, and done -> ready to merge with master
				git checkout master		//checkout/ change to master branch
				git pull origin master 	//pull all changes that been made from others
				git merge func 			//marge func branch with master
				git push origin master	//push changes to master
			-//go through process of deleting func branch since we no longer need that func


		STEPS:
		-branch name is EPETHOSPR-59
		git status
		git add --all
		git commit -m "EPETHOSPR-59: Created read and updateservices"
		provision-api mle$ git remote set-url origin ssh://git@git.ellucian.com:7999/ps/provision-api.git
		git push -u origin EPETHOSPR-59
		git merge EPETHOSPR-59
		git status -->On branch develop Your branch is ahead of 'origin/develop' by 1 commit...
		git push


		-other dev after a dev push:
		instead of git push:
		git fetch 
		git checkout develop //
		git pull
		git checkout BRANCHNAME
		//resolve merge conflict
		git add --all
		git status
		git branch -a 		//give all the diff branch names: to check
		git commit -m "BRANCHNAME: Resolve merge conflict"
		git push
		git checkout develop
		git merge BRANCHNAME
		git status
		git push

		//check out branch first, create new branch
		git checkout -b <BRANCHNAME like EPETHOSPR-80>
		//then
		git add --all
		git status
		git commit -m "<BRANCHNAME>: Added ...."
		git checkout develop
		git pull
		git merge <BRANCHNAME>
		git push

		-create a git repo and commit code (not in any branch) to master branch
		git init  //create git repo
		//coding....
		git status		//should say "On master branch"
		git add --all
		git commit -m "EPETHOSPR-76: Created an event listener"
		git push -u origin master	//marge/ combine(?) origin and master
		git checkout -b develop		//the repo doesn't have develop branch yet
		git push -u origin develop	//


----------------------------------------------------------------------------------------------------
//project summarize:
https://ellucian.app.box.com/s/95qz2s29s35mp3481ufjgkjoi3wjdy9v

command line:
	mkdir getting-started-with-hapi-js-part-1 && cd $_
		|-> $_ means use the last argument of the last command.
		|-> So the cmd line will turn to ... && cd getting-started-with-hapi-js-part-1



----------------------------------------------------------------------------------------------------
// https://expressjs.com/en/api.html
use() : call use when need to apply middlewares or want to use modular architecture
get() : request/retrieve data from a resource (after the port)
post(): send/writing data to be processed to a specified resource
put() : editing/updating data of the specified URI

template (view) engines: allow to use static template files
  	generator:
		views: -directory where the template files are located. 
			Eg: app.set('views', './views'). This defaults to the views directory 
			in the application root directory.
			//or use: path.join(__dirname, 'templates') in place for './view'
		view engine: the template engine to use. 
			Eg: to use the Pug template engine-> app.set('view engine', 'pug');

	template engines export functions and use those functions by calling:
		res.render() : accepts a template name and data
		ex: res.render('index', {date: new Date().toDateString()}) 
			--> create a route to render the index.pug file from pug template

static (images, CSS files, and JavaScript files) 
	- use express.static and pass the name of the directory that contains the static
		--> app.use(express.static('public'))
		//or use absolute path of the directory: 
		// -->  var path = require('path');
		//			...
		//		app.use(express.static(path.join(__dirname, 'public')))


functions:
	-callback (aka closure functios): higher order funct that is passes to another funct 
				as param 
	-setTimeout(func-to-be-execute, millisec)

middleware: express handle action from HTTP incoming request on server, middleware
allow to handle manually
	ike smaller/helper functions that can be reuse (while express is a main bigfunction)
		//- express.static is a middleware
----------------------------------------------------------------------------------------------------
Unit testing:
	unit tesing -> integration testing -> end-to-end testing

	-modules used for Node.js unit testing:
		+ mocha/ tape (test runner) - testing lib
			-describe("description str", func-represent-body-desc) : 
					func to describe the features that we are implementing  
			-it() fuc: similar args to the describe func, AND 
					we can only put expectations in the body of the it("", body)
				+done(): for every it() that needs to wait for a response value,
					a done() callback func and call it only when our expectations were executed


		+ chai (assertion library)
		+ sinon (test setup: spices, stubs, mocks)
			- spy: get info on funciton calls (eg: how many time they were called, 
													what args were passed to)
				- eg: A test spy is a funct that records arguments, return value, 
				the value of this and exception thrown (if any) for all its calls
				-> use to test how a funct handles a callback
				use: 
					it('description string/message', function(){
						//Creates an anonymous function records args, 
						//"this" value, exceptions and return values for all calls
						var callback = sinon.spy()		//or sinon.spy(myFunc) to spy on myFunc
						PubSub.subcribe('message', callback)//subscribe(message, spy function)
						PubSub.publishSync('message')		//??
						assertTrue(callback.called) //.called=true if spy was called at least once
					})
				- https://www.npmjs.com/package/PubSub
				- http://sinonjs.org/releases/v2.2.0/spies/

			- stub: like spy with pre-programmed behavior
				- use when want to: 
					+control a method's' behavior (ex: forcing a medthod to 
									throw error to test error handling)
					+prevent calls/functions to external resources
				-
				-http://sinonjs.org/releases/v2.2.0/stubs/

			- mocks: fake method with a pre-programmed behavior and expectations
				-define expectations upfront
----------------------------------------------------------------------------------------------------				
promise: an object that defines a method called then() and represents a value that may be 
		available in the funture (of asynchrous operation).
	-use .then whenever youre going to do something with the result 
	 and use .done whenever you aren't planning on doing anything with the result.
	-in 1 of 3 states:
			+ pending: initial state of a promise/ waiting to be fullied or rejected
			+ fullied: successful operation and yields a value
			+ rejected:failed operation
	-create w/ new Promise(executor), executor = callback func w/ the signature 
					function(fulfill, reject){} 
					+to pass the value yeilded by fulfilled, call fulfil(value) w/ val as 1st arg
		ex: (www.promisejs.org)
			function readFile(filename, enc){
			  return new Promise(function (fulfill, reject){ //creat promise with callback
			    fs.readFile(filename, enc, function (err, res){
			      if (err) reject(err); 		
			      else fulfill(res);	//promise internals pass "res" along, and then
			    });						//call this first callback with the same value
			  });
			}
		with .then()
			function readJSON(filename){
			  return readFile(filename, 'utf8').then(function (res){
			    return JSON.parse(res)
			  })
			}
		-then(): 1st param for fulfill; 2nd for reject (can have then(null, onReject) )
			//create promise through the constructor.
		    var promise = new Promise(function (fulfill, reject) {
		      fulfill('SECRET VALUE');
		    });
		    // same thing w/ Promise.resolve
		    var promise = Promise.resolve('SECRET VALUE');

		    // Likewise
		    var promise = new Promise(function (fulfill, reject) {
		      reject(new Error('SECRET VALUE'));
		    });
		    //... shortcut
		    var promise = Promise.reject(new Error('SECRET VALUE'));
	- promises allow to return another promise
	-pass multiple promises: Promise.all([getPromise1(), getPromise2()])
      							.then(onFulfilled, onRejected);

----------------------------------------------------------------------------------------------------

markdown: 	cheatsheet: https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf
	- way to write content for the web
	
	-italic: surround the phase w/ _ or *
		_sentence_
	-bold: surround w/ ** or _ _
		**phase** or __phase__
	-both:
		**_both_**
	-header (six types): #
		# Header One (biggest)
		### header 3 (smaller)
	-two different link types
		+ inline link: create by wrap the link text in [ ] and actual link in ()
			- [Visit GitHub!](www.github.com) -->only show Visit GitHub! to click on
		+ reference: 
			- advantage: multiple links to the same place only need to be updated once
			ex:
				Heres [a link to something else][another place].
				Heres [yet another link][another-link].
	     		And now back to [the first link][another place].

	     		[another place]: www.github.com //only need to update here
	     		[another-link]: www.google.com

	- images: (same with links but with ! in front)
		- ![](URL-link-to-image.jpg)

	- create a block quote w/: >
	- list (unorder): * ...
	- list (order): numbers with tab
	- new lines (soft break): 2 space
----------------------------------------------------------------------------------------------------

babel.js
	-https://github.com/babel/example-node-server
	-command line: https://babeljs.io/docs/usage/cli/
	-an ECMAScript 6 to ECMAScript 5 compiler -->allows to use use ES6 features 
			in your projects and then compiles ES5 for you to use in production
			-need Babel because browser vendors are slow to adopt new language features, 
				thus browser support for ES6 is poor (for now)
	-configurable compiler translate JS to JS (unlike a compiler which translates 
			high level application code into lower level/byte code)
	-

	-pros / cons of transpiling code from ES6 to ES5
		+pro: 
			-plug in for customer features
			-start using ES6 (w/ shorter syntaxes more features) now w/o waiting for browser support
		+con:
			-transpiling process adds extra overhead to your build process -->compiler is slow
			-output is still ES5 -->not accomplish anything
			-where is the bug? in ES6 or ES5 code
----------------------------------------------------------------------------------------------------

hapi: npm install --save hapi 		after npm init	
	https://github.com/hapijs/hapi/blob/master/API.md#route-configuration
	https://hapijs.com/api
	**self note**: 	-tutorial getting-started-with-hapi use ES6 syntax & babel to transpiling
					-myHAPIproject use normal ES5 syntax
	-web framework for building web applications, APIs and services
	-terms:
		+server: the root object which contains everything about the web application;
		+connection: an instance of a connection, usually a host and a port 
								where the requests will come to;
		+route: a URI within a connection telling the server which funcs to execute when;

	-use:	//create a new hapi server object:
			const Hapi = require('hapi');

			const server = new Hapi.Server();
			//add a connection to the server & passing in a port number to listen on &/or host name
			server.connection({ port: 3000, host: 'localhost' });
	- 		//adding routes (can be more than one routes)
			server.route({
			    method: 'GET',
			    path: '/',
			    //request param represents entire request: query strings, URL parameters, & payload 
			    handler: function (request, reply) {//(if it's a POST/PUT request)
			        reply('Hello, world!');//reply object helps in sending a reply back to client
			    }
			});

			server.route({
			    method: 'GET',
			    path: '/{name}',
			    handler: function (request, reply) {
			        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
			    }
			});
			//code to start server
			server.start((err) => {

			    if (err) {
			        throw err;
			    }
			    console.log(`Server running at: ${server.info.uri}`);
			});

	- inert: a plugin to serve a static page
			install w/: npm install --save inert 
			//**continue from the above code**
			//server.register(): adds the inert plugin to Hapi application
			server.register(require('inert'), (err) => { //anonymous callback is require
			//if something goes wrong, anonymous function is invoked, receive err 
			    if (err) {
			        throw err;	//& throw that error
			    }
			//put the routing callback function inside of registering inert bc we need to
			//insure that inert is registered before we use it to render the static page
			    //server.route() command registers the /hello route, 
			    server.route({		//which tells your server to 
			        method: 'GET',	//accept GET requests to /hello and 
			        path: '/hello',
			        handler: function (request, reply) {
			            reply.file('./public/hello.html');//reply w/ contents of hello.html file
			        }
			    });
			});

	- using plugins: (need to .register all plugins)
		-are an object with a register function that has the signature
							 function (server, options, next){...}. 
		-That register function{} then has an attributes object attached to it to provide hapi 
			with some additional information about the plugin, such as name and version.

			const myPlugin = {
			    register: function (server, options, next) {
			        next();
			    }
			};

			myPlugin.register.attributes = {
			    name: 'myPlugin',
			    version: '1.0.0'
			};
		- use vision module to render tepmlate, add server.views()
				server.views({
				    engines: {
				        html: require('handlebars')
				    },
				    path: Path.join(__dirname, 'templates')
				});

		-helper: 
			- create a .js file that have:
				module.exports = function(context) {
				    var query = context.data.root.query;
				    return query.name + query.suffix;
				}
			- and in server.views({...}) add:
				helpersPath: '<name of the helper file w/o .js>'
		
		- cookies: (makeMeHapi lesson 12)

		-JOI: -->Object schema description language and validator for JavaScript objects.
			-using a Joi object to specify highly customizable validation rules in
								paths, request payloads, and responses
			-npm install joi and require in .js files (makeMeHapi lesson 10)
				config: {
		    		validate: {
		       			payload: Joi.object({...}).with(...).without();
		       		}
		       	}
		    - ex: https://github.com/hapijs/joi
		    	const Joi = require('joi');

				const schema = Joi.object().keys({
					//username: require a string,must contain only alphanumeric char >3 & < 30
				    username: Joi.string().alphanum().min(3).max(30).required(),
				    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
				    access_token: [Joi.string(), Joi.number()],
				    birthyear: Joi.number().integer().min(1900).max(2013),
				    email: Joi.string().email()
				    //with() == user name must be accompanied by birthyear
				    //without() == password cannot appear together with access_token
				}).with('username', 'birthyear').without('password', 'access_token');

				// Return result.
				const result = Joi.validate({ username: 'abc', birthyear: 1994 }, schema);
				// result.error === null -> valid

				//can also pass a callback which will be called synchronously w/ validation result.
				Joi.validate({ username: 'abc', birthyear: 1994 }, 
					schema, 
					function (err, value) { });  
					// err === null -> vali

		- HOEK:
			- library contains some common functions used within the hapi ecosystem
		- Lodash _:
			-

		-boom:  set of utilities for returning HTTP errors.
			-https://github.com/hapijs/boom
----------------------------------------------------------------------------------------------------
Sprint 1: (May 30 - June 9)

-data model, endpoint
-REST (Representational State Transfer)
-post: creating endpoint API
	-accept VALID id with /persons/:id
	-handle error for not match ID format (match = 200 ok, 202 = resource found (hapi?), 
										   not macth: pass back error with HTTP 400s error code)
- read URL: GET

// fs.readFile('../../tests/read_person.json', (err, data)=>{
// 	if(err){
// 		console.log('cant open')
// 	}
// 	try{
// 		var json = JSON.parse(data)
// 	}catch(err){
// 		console.log('parse error')
// 	}
// 	console.log('parse success')
// 	console.log(json.id)
// })

		
- update: put
	-how REST pass back response for PUT operation

-index.js
//file = typeof file === "string" ? file : JSON.stringify(file);
 if (typeof file === "object" && file !== null)
        return true;
    return false;

----------------------------------------------------------------------------------------------------

Advance JS topics
	**Scope**
		-var : global
		-const and let: local
		-When a func is called in 'Strict Mode', the context will default to undefined
		-JS is a single-threaded language so it can only execute a single task at a time. 
			The rest of the tasks are queued in the Execution Context.
			-Each func creates its own execution context.
			-2 phases: creation and code execution
				1. creation phase: func is called but its code not executed
					-  Variable (Activation) Object: contains all the vars, func, and other
						declarations in a particular branch of execution context
					'variableObject': {
					    // contains function arguments, inner variable and function declarations
					}

					- scope chain: created after the var object, used to resolve variables
						-contain variable obj
						'scopeChain': {
						    // contains its own variable object and other variable objects 
						    // of the parent execution contexts
						}
					- execution obj: abstract obj
						executionContextObject = {
							// contains its own variableObject and other variableObject of 
							//the parent execution contexts
						    'scopeChain': {}, 
						    // contains function arguments, inner variable and 
						    //function declarations
						    'variableObject': {}, 
						    'this': valueOfThis
						}
				2. code execution phase:
					-lexical scope (static scope): in a nested group of functions, inner 
						functions have access to the variables and other resources of 
						their parent scope

			-public and private scope: --> none in JS but can emulate by encapsulate
										funcs within a func like:
												(function () {
												  // private scope
												  var a = ...;
												})();
									|-> () tell interpreter to execute it as
										soon as it reads it without invocation 
				-Module pattern:
				var Module = (function() {
				    function privateMethod() {
				        // do something
				    }
				    function publicMethod(){
				    	//do something
				    }
				    return {
				        publicMethod: publicMethod,
				    };
				})();

				Module.publicMethod(); //works
				Module.privateMethod();//uncaught refferenceError: privateMethod is not defined

			-changing context with call(), apply(), and bind()
				- .call() vs: .apply(): call: pass arguments as a list separated by a comma 
												ex: func.call(this, 'Batman', 'to save Gotham');
										apply: allows to pass the arguments in an array
												ex: func.apply('Hi', ['Bruce Wayne', 'businesses']);
				-.bind(): like call()
					(function introduce(name, interest) {
					    console.log('Hi! I\'m '+ name +' and I like '+ interest +'.');
					    console.log('The value of this is '+ this +'.')
					}).bind(window, 'Hammad', 'Cosmology')();

	**Prototype Binding**

	**Closure**
		-scope: access the variables defined in its outer func abd also arguments of the outer func
			-access the variables of its outer func even after the funct has returned
			-when return an inner func from a func, the returned inner func will NOT be called when
				we try to call the outer func -->must save the invocation of the outer func in 
				a separated var and then call that variable AS FUNCTION
				ex:
				function greet() {
				    name = 'Hammad';
				    return function () {
				        console.log('Hi ' + name);
				    }
				}
				greet(); // nothing happens, no errors 
				//greet()(); //this will work!! no need the next 2 lines
				
				greetLetter = greet();//returned func from greet() gets saved in greetLetter
				 // calling greetLetter calls the returned function from the greet() function
				greetLetter(); // logs 'Hi Hammad'
		-
	**Chaining**
	**Strick Mode**
	**Asynchrous/wait vs. promises**
	**ES6 class_type***

----------------------------------------------------------------------------------------------------

Docker:
	-layer containers, everytime we hit run, it create new images, and layer containers on top of 
	each other, and we use one of the layer
		-linux interface/containers
		-volum: expose: take internal directory and alllow outside ops to peak inside my container 
	-build image once, and push out to Docker and can run anywhere
	-command:
		docker ps -a	-->list containers
		docker 			-->list of docker command
		docker kill CONTAINER [CONTAINER...] -->delete running containers
		docker images -a -->show what had build
		docker rm <ID_or_Name>-->remove container 
		docker rmi <Image ID> -->remove images 

	-create Dockerfile file
		docker build -t <name tag for -t> <path to Dockerfile>		##build images
		docker run -d -p <>:<>										##create containers
					--> -d: (demon)run in the background, 
					--> -p: expose port (mapping port)
							docker port : see created mapping

		*in Dockerfile:
			FROM
			MAINTAINER <author> 		# File Author / Maintainer
			ARG
			RUN <install nodemon or other modules/ dependencies>
			EXPOSE <port #>
			CMD [nodemon, <file-name>] 	#run app using nodemon

	-docker volumes: isolated file systems, dont have to be connected to a particular container
		docker volume create
		docker volume rm
		docker volume ls/inspect

----------------------------------------------------------------------------------------------------

SCIM: provide a single way to provisioning
	-protocal, provider/client

	(acting like a proxy)
	-parse data, 

	-create new JSON obj for SCIM, map properties into JSON that compatable with SCIM 

	-creater/update USER: read JSON, map properties into JSON that compatable with SCIM/provider, 
		pass in to SCIM provider, (sent SCIM object to SCIM server)
		-see user already exist (already exisit, pass back error)
		-delete(not exist, pass back error)
	



		-event listener: "operation" (not yet build)
		-hard code user name, URL of remote scim provider (Morgan will give ?)
		-future: mapping (user go to admin UI, have ability to go through which person properties get map
			to SCIM properties)
		-now: start w/ content-name, ln, fn, 1:1 string, email address
			- SCIM let you specify user name: email address (first part of the email or full)
						- email = primary user name 

	content.firstName.mapTo(scim.firstName)
	-create new NodeJS program, open remote HTTP connection, read personJSON file
		-create SCIM user object, then map

		let createUser = {}


	-SCIM pass back GUID in response


	filer user: encodeURIComponent(email), 


	for update to work, run get first, get back the entire obj adn then reasigned all value in the object

	create driver program, then build the scim user, 
----------------------------------------------------------------------------------------------------

Json Web Token:
	- token format (JWT is a string with this format): header.payload.signature
	- 
https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files
-present-in-a-directory-in-node-j	

const testFolder = './tests/';
const fs = require('fs');

fs.readdirSync(testFolder).forEach(file => {
  console.log(file);
})

	// fs.readdirSync(routes).forEach(file => {
	// 	let routeFile = require(path.join(__dirname, file));
	// 	server.route(routeFile);
	// })
----------------------------------------------------------------------------------------------------
******
	|?reseach on|-mapping port, exposing volume
	passport and passport SAML (single sign on using token, using passport SAML to config EIS provision )
	make sure app.log is populate
	
	new nodejs app project that need to ETHOS integration API key, (provided tenant key)
			(put in env file-key from postman GET JWT), call the auth endpoint (JWT postman key)
	once we get the token, listen to tenant queue using tenant ID, look at confluence API
			 for tenant queue format, creating platfrom compontent 
	
	have centralize config for SCIM, store in database,
	like a get request, 
	call an endpoint to get message for a tenant (that is registerd)
	get JWT w/in the code, do call to a queue (/consume or consumeall) for particular tenant message

	** get ethod integration API key (look how postman do it)
	npm init -->create new node project

	iterate through the array and check each for valid tenant, keep track of the last ID process
	test with consume, and send event with production
	setinterval promise
	
for(let i = 0; i < data.length && i < 10; i++){
	console.log("ID = " + data[i].id +" - operation: " + data[i].operation)
	processId = data[i].id;
	if(processId >= tempProcessId){
		let opt = getOption(data[i].operation, data[i].content.id, data[i], jwt);
		if(opt){
			request(opt).catch(function(err){
				console.log(err)
				console.log("ERROR in http request----------------------------------------------------------")
				retryQueue.push(data[i]);
				console.log(retryQueue);
			});
		}
	}else {
		//insert object to the right position in the queue array
		let temp = [];
		let inserted = false;
		for (let i = 0; i < successQueue.length; i++){
	        if (!inserted && processId < successQueue[i]){
	            inserted = true;
	            temp[i] = data[i];
	            i--;
	        }else if(inserted){
	            temp[i+1] = successQueue[i]; 
	        }else{
	            temp[i] = successQueue[i];
	        }
	    }
	    successQueue = temp;
	}
}

reusing ethos cloud platfrom services, consolidating user provision into generic interface usign ethod platfrom
// let p1 = new Promise(function(resolve, reject){
// 	console.log("1.1")
// 	for(let i = 0; i < data.length && i < 10; i++){
// 		console.log("1.2")
// 		console.log("ID = " + data[i].id +" - operation: " + data[i].operation)
		
// 		let opt = getOption(data[i].operation, data[i].content.id, data[i], jwt);
// 		if(opt){
// 			request(opt).catch(function(err){
// 				console.log("push ID = "+ data[i].id +"in retryQueue----------------------------------------------------------")
// 				retryQueue.push(data[i]);
// 			});
// 		}
// 	}
// 	resolve(true);
// });
// p1.then(function(){
// 	console.log("here")
// 	for(let i = 0; i < retryQueue.length; i++){
// 		console.log("2.1")
// 		let opt = getOption(retryQueue[i].operation, retryQueue[i].content.id, retryQueue[i], jwt);
// 		if(opt){
// 			request(opt).then(function(res){
// 				retryQueue.splice(i, 1);//remove success object from retry queue
// 			}).catch(function(err){
// 				console.log("push in deadLetterQueue------------------------------------------------------")
// 				deadLetterQueue.push(retryQueue[i]);
// 				console.log(deadLetterQueue);
// 			});
// 		}
// 	}
// });

----------------------------------------------------------------------------------------------------
docker build -t event_listener .
docker run --env-file .env -d event_listener
docker exec -it <CONTAINER ID> /bin/sh
/app # ls
/app # tail /log/app.log
//app runs
//tail /log/app.log again to see the log
/app # tail /log/app.log
/app # exit //exit shell

----------------------------------------------------------------------------------------------------
//-the event listener listens to ethos integration for any data event changes and process them in order

Were using Postman to send event changes to Ethos Inetgration, and first, we need to get JWT for
	authorization.
**(start the rest api and event listener)
 -Im going to start with sending a create user request to the ethos integration
 -the event listener determines the operation for each data event, and send the change event
 	messages to Ethos provision API, in this case the event listener is sending a create request 
 	to REST API which
 	-send the create user request to the SCIM provider, then the user will be created
 -we can see if te user actually created by checking the SCIM storage remotely for that specific user
 	+if the user is created, the SCIM pass back a JSON with unique SCIM ID
 	+if not (delete user in Postman), SCIM provider will response with error says user does not exist.
 -the event listener process event changes in order, if I send 3 create user requests consecutively,
 	the first one will success but not the next 2.
 - same with update and delete, if we try to update or delete user that is not exist, REST API will response
 	with HTTP status code 400 error 
----------------------------------------------------------------------------------------------------

jenkins (tool/job runner) run terraform(scrip lang to build in AWS) :set up all env vars needed in terraform

docker = window (boost up program)



