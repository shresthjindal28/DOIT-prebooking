const mongoose=require('mongoose')

const ServiceProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['provider'], default: 'provider' }
});

 const ServiceProvider = mongoose.model('ServiceProvider', ServiceProviderSchema);

 module.exports=ServiceProvider
