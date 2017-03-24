var mongoose = require('mongoose')
Schema = mongoose.Schema
var SurveyRegSchema= new mongoose.Schema({
  Question: {
      type: String,
      required: [true, "Question is required"],
      minlength: [8, "Question has to be at least 8 char"],
      trim: true,
    },
  _Login: {
    type: Schema.Types.ObjectId, ref: 'Login'
  },
  Option: [{type: Schema.Types.ObjectId, ref: 'Option'}]

 },{timestamps: true});


 var Survey = mongoose.model('Survey', SurveyRegSchema);
