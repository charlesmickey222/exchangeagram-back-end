import { Profile } from '../models/profile.js'
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
    console.log('Call was made')
    const profile = await Profile.findById(req.user.profile)
    console.log(profile)
    console.log(req.params.postId)
    profile.likedPosts.push(req.params.postId)
    profile.save()
    console.log(profile)
    res.status(201)
  } catch (error) {
    res.status(500).json(error)
  }
}
async function removeLikedPost(req, res) {
  try {
    console.log('Call was made')
    const profile = await Profile.findById(req.user.profile)
    console.log(profile)
    console.log(req.params.postId)
    profile.likedPosts.remove(req.params.postId)
    profile.save()
    console.log(profile)
    res.status(201)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function createMessage(req, res) {
  try {
    req.body.author = req.user.profile
    const profile = await Profile.findById(req.params.id)
    profile.messages.push(req.body)
    await profile.save()
    await profile.populate({path: 'messages', populate: {path: 'author'}})
    res.status(201).json(profile)
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
}
