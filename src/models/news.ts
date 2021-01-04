import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
    img_url: String,
    title: String,
    description: String,
    theme: String,
    link: String
})

export default mongoose.model('News',NewsSchema)