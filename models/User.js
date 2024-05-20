import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: [7, 'Password must be at least 7 characters'],
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;

    return userObject;
};

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login');
    }
    const isMatch = password === user.password;
    if (!isMatch) {
        throw new Error('Unable to login');
    }
    return user;
};


const User = mongoose.model('User', UserSchema);
export default User;