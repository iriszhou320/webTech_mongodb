var express = require("express"); //call express 
var app = express(); //define the app using express 
var bodyParser = require("body-parser");

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var Promise = mongoose.connect('mongodb://localhost:27017/bears', {useMongoClient: true});
//grab the mongoose package and connect to the remote database 


var Bear = require("./bear")


//configure app to use bodyparser()
//this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

//middleware to use for all requests 
router.use(function(req, res, next){
    //do logging 
    console.log('Something is happeninng.');
    next();//go to next route and dont stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

//on routes for our API will happen here

router.route('/bears')

   //create a bear (accessed at POST)
   .post(function(req, res){
       
       var bear = new Bear(); //create a new instance of bear 
       bear.name = req.body.name;
       
       //save the bear and check for errors
       bear.save(function(err){
           if(err){
            //   res.json({ message :"err"});
              res.send(err);
              } 
            res.json({ message : 'Bear created!'});
       });
    })
    
    .get(function(req, res){
      Bear.find(function(err, bears){
          if(err)
          {res.send(err);}
          
          res.json(bears);
          
      });  
    });

//on routes that end in /bears/:bear_id

router.route('/bears/:bear_id')

    //get the bear with that id
    .get(function(req, res){
        Bear.findById(req.params.bear_id, function(err, bear){
            if(err)
               {res.send(err)};
            res.json(bear);
        });
    })

    //update the bear with this id 
    
    .put(function(req, res){
        
        //use our bear model to find the bear we want 
        Bear.findById(req.params.bear_id, function(err, bear) {
            
            if(err)
               {res.send(err)};
               
            bear.name = req.body.name;
            //update 
            
            //save the bear
            
            bear.save(function(err){
                if(err)
                   {res.send(err)};
                   
                res.json({ message : 'Bear updated!'});
            });
        });
    })
    
    .delete(function(req, res){
        Bear.remove({
            _id: req.params.bear_id
        },function(err, bear){
            if(err){
                res.send(err);
            }
            res.json({message :'Successfully deleted!'});
        });
    });
    
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

