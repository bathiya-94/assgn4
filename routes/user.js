var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();

// Connect with the user model
let User = require('../models/user');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
 

/* GET users listing. */
router.get('/', function(req, res, next) {

  User.find({},function(err,user){
    if (err) throw err;
    res.json(user);

  });
 
});

// Get admininstrator by userID
router.get('/:userId',function(req,res,next){
  User.findOne({userID:req.params.userId}, function(err, user){
    if (err) throw err;
    //console.log(req.params)

    res.json(user);

  });
});


// Creating a new user 
router.post('/', function(req, res, next) {

   
  User.create(req.body,function(err,user){
    if (err) throw err;
    console.log('User Created');

    let id = user._id;
    res.writeHead(200,{
      'Content-Type':'text/plain'
    });

    res.end('Added the admin with id: '+id);

  });
});



// Editing a user

router.put('/:userId', function(req,res,next){

  User.findOneAndUpdate({userID:req.params.userId},{
    $set:{name: req.body.name}},{
      new: true
    }, function(err,user){
      if (err) throw err;
    res.json(user);
  });
});



// Delete a particular user
router.delete('/:userId', function(req,res,next){
  User.findOneAndRemove({userID:req.params.userId}, function(err, resp){
    if (err) throw err;
    //console.log(req.params)

    if (resp)
    {
     
      res.end('Deleted user');
    }

    else{
      res.end('User not found');
    }

    
  });

});


//Delete All Users

router.delete('/',function(req,res,next){
 User.remove({},function(err,resp){
   if (err) throw err;
   res.json(resp);

 });

});

module.exports = router;
