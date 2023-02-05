import { Profile } from "../models/profile.js" ;
import { Post } from "../models/post.js" ;

async function index(req, res) {
  try {
    const posts = await Post.find({})
      .populate('author')
      .sort({createdAt: 'desc'})
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function create(req, res) {
  try {
    req.body.author = req.user.profile
    const post = await Post.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { posts: post } },
      { new: true }
    )
    post.author = profile
    res.status(201).json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function createComment(req, res) {
  try {
    req.body.author = req.user.profile
    const post = await Post.findById(req.params.id)
    post.comments.push(req.body)
    await post.save()
    const newComment = post.comments[post.comments.length -1]
    const profile = await Profile.findById(req.user.profile)
    newComment.author = profile
    res.status(201).json(newComment)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deletePost(req, res) {
  try {
    const post = await Post.findById(req.params.id)
    if (post.author.equals(req.user.profile)) {
      await Post.findByIdAndDelete(req.params.id)
      const profile = await Profile.findById(req.user.profile)
      profile.posts.remove({_id: req.params.id})
      await profile.save()
      res.status(200).json(post)
    } else {
      throw new Error('Not Authorized')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

async function updatePost(req, res) {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true }
    ).populate('author')
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function createLike(req, res) {
  try {
    req.body.author = req.user.profile
    const post = await Post.findById(req.params.id)
    post.likes.push(req.body)
    await post.save()
    const newLike = post.likes[post.likes.length - 1]
    const profile = await Profile.findById(req.user.profile)
    newLike.likedBy = profile
    res.status(201).json(newLike)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  index,
  create,
  createComment,
  deletePost as delete,
  updatePost as update,
  createLike
}