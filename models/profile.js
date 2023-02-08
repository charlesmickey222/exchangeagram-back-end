import mongoose from 'mongoose'

const Schema = mongoose.Schema

const messageSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref :'Profile'
    }
  }
)



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
  messages: [messageSchema]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
