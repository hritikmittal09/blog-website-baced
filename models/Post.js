import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    Image: {
        type: String,
        required: true,
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;
