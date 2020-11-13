import mongoose from 'mongoose'
const {Schema}   = mongoose;

const userSchema = new Schema({
  username: {type: String, unique:true, required:true},
  password: { type: String, required: true},
  email: { type: String, required: true},
  role: {type: String}
})


const user = mongoose.model('user', userSchema);

module.exports = user
