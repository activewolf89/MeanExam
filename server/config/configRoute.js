var controllerRoute = require('./../controller/controllerRoute.js')
console.log('configRoute')
module.exports = function(app){
  app.post('/post', function(req,res){
    controllerRoute.add(req,res)

  })//post
  app.get('/get', function(req,res){
    controllerRoute.show(req,res)
  })//get session back
  app.get('/logout', function(req,res){
    controllerRoute.logoff(req,res)
  })//log out
  app.post('/question', function(req,res){
    controllerRoute.addquestion(req,res)
  })
  app.get('/showsurvey', function(req,res){
    controllerRoute.showsurvey(req,res)
  })
  app.get('/individualpoll:id', function(req,res){
    controllerRoute.individualpoll(req,res)
  })
  app.get('/pollsinfo:id', function(req,res){
    controllerRoute.pollsinfo(req,res)
  })
  app.post('/count', function(req,res){
    controllerRoute.votecount(req,res)
  })
  app.post('/deletesurvey', function(req,res){
    controllerRoute.deletesurvey(req,res)
  })
}
