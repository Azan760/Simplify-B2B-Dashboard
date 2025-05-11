import mongoose from 'mongoose';
mongoose.pluralize(null);


const counterSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    year: { type: Number, required: true },
    seq: { type: Number, default: 0 },
});

export const Counter = mongoose.model('Counter', counterSchema);
