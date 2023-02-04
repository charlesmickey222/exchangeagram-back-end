import mongoose from "mongoose"

const Schema = mongoose.Schema

const postSchema = new Schema(
  {
    photo: {
      type: String,
      required: true
    },
    caption: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Profile'
    }
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

export {
  Post
}