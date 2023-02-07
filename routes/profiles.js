import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)
router.get('/:id', checkAuth, profilesCtrl.show)
router.patch('/:id/add-like/:postId', checkAuth, profilesCtrl.addLikedPost)
router.delete('/:id/add-like/:postId', checkAuth, profilesCtrl.removeLikedPost)

export { router }
