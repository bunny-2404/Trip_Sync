import { Request, Response } from 'express';
import SavedRoute from '../models/SavedRoute';

interface AuthRequest extends Request {
    user?: any;
}

// @desc    Save a route
// @route   POST /api/saved-routes
// @access  Private
export const saveRoute = async (req: AuthRequest, res: Response) => {
    try {
        const { origin, destination, stay } = req.body;

        const route = await SavedRoute.create({
            userId: req.user._id,
            origin,
            destination,
            stay,
        });

        res.status(201).json(route);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user saved routes
// @route   GET /api/saved-routes
// @access  Private
export const getSavedRoutes = async (req: AuthRequest, res: Response) => {
    try {
        const routes = await SavedRoute.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(routes);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a saved route
// @route   DELETE /api/saved-routes/:id
// @access  Private
export const deleteSavedRoute = async (req: AuthRequest, res: Response) => {
    try {
        const route = await SavedRoute.findById(req.params.id);

        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }

        if (route.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await route.deleteOne();
        res.json({ message: 'Route removed' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
