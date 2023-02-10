import { Router } from "express";
import * as postsCtrl from '../controllers/posts.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, postsCtrl.index)
router.post('/', checkAuth, postsCtrl.create)
router.get('/:id', checkAuth, postsCtrl.showPost)
router.post('/:id/comments', checkAuth, postsCtrl.createComment)
router.delete('/:id', checkAuth, postsCtrl.delete)
router.put('/:id', checkAuth, postsCtrl.update)
router.put('/:id/add-photo', checkAuth, postsCtrl.addPhoto)
router.patch('/:id/add-likes', checkAuth, postsCtrl.addLikes)

export {
  router
}
