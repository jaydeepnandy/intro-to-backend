import { Post } from '../models/post.model.js';

// Create a Post
const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;
        if (!name || !description || !age) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const post = new Post({ name, description, age });
        await post.save();
        
        res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error! Error creating post', error });
    }
};

// Read all Posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ 
            message: 'Internal Server Error! Error fetching posts', error 
        });
    }
};

// Update a Post
const updatePost = async (req, res) => {
    try {
        // check if the body is empty
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ 
                message: 'Request body cannot be empty' 
            });
        }

        const post = await Post.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );

        // If no post is found with the given ID, return a 404 error
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({
            message: "Post updated successfully",
            post
        });

    } catch (error) {
        res.status(500).json({ 
            message: 'Internal Server Error! Error updating post', error 
        });
    }
};

// Delete a Post (Optional)
const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(
            req.params.id
        );

        // If no post is found with the given ID, return a 404 error
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });

    } catch (error) {
        res.status(500).json({ 
            message: 'Internal Server Error! Error deleting post', error 
        });
    }
};

export { createPost, getAllPosts, updatePost, deletePost };