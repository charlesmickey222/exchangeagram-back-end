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
  },
  { timestamps: true }
)

const Message = mongoose.model('Message', messageSchema)

export {
  Message
}