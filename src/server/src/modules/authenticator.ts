import { isNull } from 'lodash'
import { AUTHENTICATOR_RERSPONSES } from '../definitions/enums'

console.log('[MODULE:AUTHENTICATOR]: Loaded.')

const authenticate = (username: string, password: string) => {
    if (!isNull(username) && !isNull(password)) {
        console.log(`[MODULE:AUTHENTICATOR]: ${username} sucessfully authenticated.`)
        return {
            status: AUTHENTICATOR_RERSPONSES.SUCCESS,
            message: 'Sucessfully authenticated!' 
        }
    }

    console.log(`[MODULE:AUTHENTICATOR]: ${username} failed to authenticate.`)
    return {
        status: AUTHENTICATOR_RERSPONSES.FAIL,
        message: 'Failed to authenticate. Username or password may be wrong.' 
    }
}

const Authenticator = {
    authenticate: authenticate
}


export default Authenticator