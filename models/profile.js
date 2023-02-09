import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  
  name: String,
  photo: String,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  likedPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
