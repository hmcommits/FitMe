import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Prevent mongoose from compiling the model multiple times in Next.js development
export default mongoose.models.User || mongoose.model('User', userSchema);
