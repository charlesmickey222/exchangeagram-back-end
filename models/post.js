import mongoose from "mongoose"

const Schema = mongoose.Schema


const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Profile'
    }
  },
  { timestamps: true }
)


const postSchema = new Schema(
  {
    photo: {
      type: String,
      required: true
    },
    caption: String,

    comments: [commentSchema],
=======

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