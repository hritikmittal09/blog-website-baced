import Post from "../models/Post.js"; // Assuming Post model is defined in models/Post.js

// Simple test controller
export const userControllerworks = (req, res) => {
    res.status(200).json({
        message: "user works"
    });
};

// Get all posts (replacing Sequelize's findAll with Mongoose's find)
export const getdata = async (req, res) => {
    try {
        const posts = await Post.find(); // Retrieves all posts

        res.status(200).json({
            message: "success",
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

// Find post by ID
export const findProductById = async (req, res) => {
    const id = req.params.id;

    try {
        // Find post by its MongoDB _id
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json({
            message: "success",
            data: post,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
};
