import mongoose from 'mongoose';

const savedRouteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    stay: { type: String }, // For 'Saved Places' which might be just a single location, or a route with a stay
}, {
    timestamps: true,
});

const SavedRoute = mongoose.model('SavedRoute', savedRouteSchema);

export default SavedRoute;
