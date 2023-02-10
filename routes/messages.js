import { Router } from 'express'
import * as messagesCtrl from '../controllers/messages.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/:id/messages/', checkAuth, messagesCtrl.createMessage)
router.get('/:id/messages', checkAuth, messagesCtrl.messageIndex)

export {
  router
}