
var mongoose = require('mongoose')
var Login = mongoose.model('Login')
var Survey = mongoose.model('Survey')
var Option = mongoose.model('Option')


module.exports = {

add: function(req,res){
    Response_User = {}

    function isAlphaNumeric(str) {
      var code, i, len;
    if(!req.body.name){
      res.json('Please Enter Info and not try to break my code')
    }
      for (i = 0, len = str.length; i < len; i++) {
        code = str.charCodeAt(i);

        if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 94 && code < 123)) { // lower alpha (a-z)
          return false;
        }
      }
      return true;
    };
    if (isAlphaNumeric(req.body.name)){
Login.findOne({UserName: new RegExp('^'+req.body.name+'$', "i")}, function(err,user){

  if(!user){

    Login.create({UserName:req.body.name}, function(err,user){
      if(err){

        res.json(err)
      }
      else{
        req.session.user = user
        req.session.save()
      Response_User.Result = "New_User"
      Response_User.Object = req.session.user
        res.json(Response_User)
      }
    })//create
  }//if user is currently not in the system
  else{
    req.session.user = user
    req.session.save()
    Response_User.Result = "Existing_User"
    Response_User.Object = req.session.user
    res.json(Response_User)
  }
})//Login Find
}//if alphanumeric
else{
  res.json('Needs to be alphanumeric')
}
  },//add
show: function(req,res){
  if(Response_User.Object){
  res.json(Response_User)
}//if there is a response show, if no redirect to start
else{
  res.json('redirect')
}
},
logoff: function(req,res){

  req.session.destroy();
  Response_User = {}

  res.redirect('/')
}, //end of logoff
addquestion: function(req,res){
  console.log(req.body,'this is the body')
  if(!req.body.question){
    res.json('All fields needs to be filled')
  }
  else if(req.body.question.length < 8){
    res.json('Question needs to be at least 8 characters long')
  }
  else if(!req.body.option1 || !req.body.option2 || !req.body.option3 || !req.body.option4){
    res.json('Options need to all be filled out')
  }
  else if(req.body.option1.length < 3 || req.body.option2.length < 3 || req.body.option3.length < 3 || req.body.option4.length < 3){
    res.json('Options need to be at least 3 characters long')
  }
else{


  Login.findOne({_id:req.session.user}, function(err,user){

    survey = new Survey({Question:req.body.question, _Login:req.session.user})

    survey.save(function(err,survey){
      if(err){
        res.json(err)
      }
      else{
      user.Survey.push(survey)
      user.save(function(err,user){

    option1 = new Option({Option:req.body.option1})
    option1._Survey = survey._id

    option2 = new Option({Option:req.body.option2})

    option2._Survey = survey._id

    option3 = new Option({Option:req.body.option3})
    option3._Survey = survey._id

    option4 = new Option({Option:req.body.option4})
    option4._Survey = survey._id

      survey.Option.push(option1,option2,option3,option4)
      option1.save(function(err,option1){
        option2.save(function(err,option2){
          option3.save(function(err,option3){
            option4.save(function(err,option4){
              survey.save(function(err,survey){
                res.json('success')
              })
            })
          })
        })
      })
    })
  }//else
  })//end of Login save

})//FIND end
}//end of the else
}, //end of add question
showsurvey: function(req,res){
  Survey.find({})
  .populate('_Login')
  .exec(function(err,survey){
    if(!err){
      res.json(survey)
    }
  })//survey find
}, //end of show survey
individualpoll: function(req,res){

  //poll id
  Survey.find({_id:req.params.id}, function(err,survey){

    res.json(survey)
  })
}, //end of individaul pull
pollsinfo: function(req,res){

  Option.find({_Survey:req.params.id}, function(err,options){

    res.json(options)
  })
},
votecount: function(req,res){

  Option.findOne({_id:req.body._id}, function(err,option){

  option.Count = option.Count+1
  option.save(function(err){
    res.json(option)
  })

  })//find

},
deletesurvey: function(req,res){

  Survey.remove({_id:req.body._id}, function(err){
    if(err){
      res.json(err)
    }
    else{
      res.json('removed')
    }
  })//end of remove
}

}
