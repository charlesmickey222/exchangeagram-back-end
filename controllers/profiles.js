import { Profile } from '../models/profile.js'
import { Post } from '../models/post.js'
import { v2 as cloudinary } from 'cloudinary'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Profile.findById(req.params.id)
  .then(profile => {
    cloudinary.uploader.upload(imageFile, {tags: `${req.user.email}`})
    .then(image => {
      profile.photo = image.url
      profile.save()
      .then(profile => {
        res.status(201).json(profile.photo)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

async function show(req, res) {
  try {
    const profile = await Profile.findById(req.params.id)
    .populate('name')
    .populate('photo')
    .populate('posts')
    .populate('messages')
    res.status(200).json(profile)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function addLikedPost(req, res) {
  try {
    const profile = await Profile.findById(req.user.profile)
    profile.likedPosts.push(req.params.postId)
    profile.save()
    addLikesToPost(req.params.postId, req.user.profile)
    res.status(201).json()
  } catch (error) {
    res.status(500).json(error)
  }
}

async function addLikesToPost(postId, profile){
  const post = await Post.findById(postId)
  post.likes.push({likedBy: profile})
  post.save()
  console.log(post)
}


async function removeLikedPost(req, res) {
  try {
    const profile = await Profile.findById(req.user.profile)  
    profile.likedPosts.remove(req.params.postId)
    profile.save()
    res.status(201)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function createMessage(req, res) {
  try {
    const profile = await Profile.findById(req.user.profile)
    profile.messages.push(req.body)
    profile.save()
    res.status(201)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function messageIndex(req, res) {
  try {
    const profile = await Profile.findById(req.params.id)
      await profile.populate({path: 'messages', populate: {path: 'author'}})
    res.status(200).json(profile)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
      

export {
  index,
  addPhoto,
  show,
  addLikedPost,
  removeLikedPost,
  createMessage,
  messageIndex,
}
