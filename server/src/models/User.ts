
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const vehicleSchema = new mongoose.Schema({
    id: String,
    regNumber: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    twoWheelers: [vehicleSchema],
    fourWheelers: [vehicleSchema],
}, {
    timestamps: true
});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
