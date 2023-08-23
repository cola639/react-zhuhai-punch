import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'store'
import { getPunchConfig, setOpenId } from 'store/slices/punch'
import { paramToObj } from 'utils/index'

// project imports
import { GuardProps } from 'types'

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }: GuardProps) => {
  const { pathname } = useLocation()
  const checkedUser = useSelector(state => state.punch.checkedUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const openId = useSelector(state => state.punch.openId)

  useEffect(() => {
    if (!checkedUser) {
      if (openId) {
        dispatch(setOpenId(openId))
        dispatch(getPunchConfig(pathname, openId, navigate))
      }
    }
  }, [checkedUser, openId])

  return children
}

export default AuthGuard
