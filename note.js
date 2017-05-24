//project summarize:
https://ellucian.app.box.com/s/95qz2s29s35mp3481ufjgkjoi3wjdy9v

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
					git push -u origin master

					TESTT



