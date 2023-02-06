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

const likeSchema = new Schema(
  {
    like: Boolean,
    dislike: Boolean,
    likedBy: {
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
    },
    caption: String,
    comments: [commentSchema],
    likes: [likeSchema],
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