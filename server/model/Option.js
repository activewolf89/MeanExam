var mongoose = require('mongoose')
Schema = mongoose.Schema
var OptionRegSchema= new mongoose.Schema({
  Option: {
      type: String,
      required: [true, "Option is required"],
      minlength: [3, "Option has to be at least 3 char"],
      trim: true,
    },
    Count: {
      type: Number,
      default: 0
    },
    _Survey: {
      type: Schema.Types.ObjectId, ref: 'Survey'
    }

 },{timestamps: true});


 var Option = mongoose.model('Option', OptionRegSchema);
