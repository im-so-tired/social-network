import * as userActions from './authUser/userAuth.actions'
import * as getUserActions from './getUsers/getUsers.actions'
import { clearFindUsers } from './getUsers/getUsers.slice'

export const allActions = {
	...userActions,
	...getUserActions,
	clearFindUsers,
}
