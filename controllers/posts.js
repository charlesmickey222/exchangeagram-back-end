import { Profile } from "../models/profile";
import { Post } from "../models/post";

async function index (req, res) {
  try {
    const posts = await Post.find({})
      .populate('author')
      .sort({createdAt: 'desc'})
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  index,
  
}