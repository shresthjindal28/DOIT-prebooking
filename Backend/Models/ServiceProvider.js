const mongoose=require('mongoose')

const ServiceProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobnumber: { type: String, required: true, unique: true }, 
  role: { type: String, enum: ['provider'], default: 'provider' },
 
},
{ timestamps: true })

 const ServiceProvider = mongoose.model('ServiceProvider', ServiceProviderSchema);

 module.exports=ServiceProvider