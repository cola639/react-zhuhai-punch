import { useNavigate } from 'react-router-dom'
import { createSlice } from '@reduxjs/toolkit'
import { dispatch } from '../index'
import { openIdLogin } from 'api/punch'

interface PunchState {
  checkedUser: boolean
  punchConfig: {
    punchEnd: string | undefined
    punchLat: string | undefined
    punchLng: string | undefined
    punchStart: string | undefined
    punchRadius: number | undefined
    weekday: string | undefined
    punchAddress: string | undefined
    deptId: number | undefined
  }
  openId: string | undefined
}

const initialState: PunchState = {
  checkedUser: false,
  punchConfig: {
    punchEnd: undefined,
    punchLat: undefined,
    punchLng: undefined,
    punchStart: undefined,
    punchRadius: undefined,
    deptId: undefined,
    weekday: undefined,
    punchAddress: undefined
  },
  openId: undefined
}

const punch = createSlice({
  name: 'punch',
  initialState,
  reducers: {
    setUserlogin(state, action) {
      state.checkedUser = action.payload
    },
    setPunchConfig(state, action) {
      console.log('🚀 >> setPunchConfig >> action:', action)
      state.punchConfig = action.payload
    },
    setOpenId(state, action) {
      state.openId = action.payload
    },

    hasError(state) {
      state.checkedUser = false
    }
  }
})

export default punch.reducer

export const { setUserlogin, setPunchConfig, setOpenId, hasError } = punch.actions

export function getPunchConfig(
  orgPathname: string,
  openId: string,
  navigate: (path: string) => void
) {
  return async (dispatch: any) => {
    try {
      const res: any = await openIdLogin({ openId })
      console.log('🚀 >> return >> response:', res)

      // 根据 response 返回结果导航到新页面
      if (res.msg === '没有数据') {
        // dispatch(setUserlogin(response.value))
        // navigate(orgPathname)
      } else {
        dispatch(setUserlogin(true))
        dispatch(setPunchConfig(res.data))
        // navigate('/no-punch')
      }
    } catch (error) {
      dispatch(hasError())
    }
  }
}
