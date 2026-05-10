import { User } from '../models/user.model.js';

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Validate input
        if(!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if(existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user bcrypt will hash the password before saving
        const user = await User.create({ username, email: email.toLowerCase(), password: password, loggedIn: false });
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(400).json({ message: "Internal server error", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        // Check if user exists
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });
        if(!user) {
            return res.status(400).json({ message: 'User Not Found' });
        }

        // Compare the password using bcrypt
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials!' });
        }

        user.loggedIn = true;
        await user.save();

        res.status(200).json({
            message: 'User logged in successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: 'User Not Found' });
        }
        user.loggedIn = false;
        await user.save();
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export { registerUser, loginUser, logoutUser };