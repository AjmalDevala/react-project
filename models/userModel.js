const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isDoctor:{
        type: Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    seenNotifications:{
        type:Array,
        default:[]
    },
    unseenNotifications:{
        type:Array,
        default:[]
    },
    image:{
        type:String,
        default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    }
},{
    timestamps:true
})

const userModel = mongoose.model('users',userSchema)

module.exports = userModel;