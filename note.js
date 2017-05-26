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
			//create new branch, head node still points to orignal/current branch, not the new branch
			git checkout <BRANCHNAME> <= switched to branch BRANCHNAME
				- use git push - u origin <BRANCHNAME> <= to associate local and master branch
			git branch --merged <= to see merge branches
			git merge <BRANCHNAME> <= to merge with master (after everything is done, pull first!)
			//after merging with master -> no longer need that branch
			git branch -d <BRANCH> <= deleted the branch LOCALLY (do git branch --merged to check first)
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
			        reply('Hello, world!');//reply object helps in sending a reply back to the client
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
					//username: require a string,must contain only alphanumeric char >3 and < 30
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


		-boom:  set of utilities for returning HTTP errors.
			-https://github.com/hapijs/boom
----------------------------------------------------------------------------------------------------






