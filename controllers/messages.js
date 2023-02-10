import { Message } from '../models/message.js'

async function createMessage(req, res) {
  try {
    req.body.author = req.user.profile
    const message = await Message.create(req.body)
    res.status(201).json(message)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function messageIndex(req, res) {
  try {
    const messages = await Message.find({}).sort({_id : -1})
    .populate('author')
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  createMessage,
  messageIndex
}