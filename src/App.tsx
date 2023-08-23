// routing
import Routes from 'routes'

// project imports
// import NavigationScroll from 'layout/NavigationScroll'
// import RTLLayout from 'ui-component/RTLLayout';

// auth provider
// import { JWTProvider as AuthProvider } from 'contexts/JWTContext'
// import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';
import useTitle from 'hooks/useTitle'
import { useEffect } from 'react'
import { dispatch } from 'store'
import { setOpenId } from 'store/slices/punch'
import { useLocation } from 'react-router-dom'

// ==============================|| APP ||============================== //

const App = () => {
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  useTitle()

  useEffect(() => {
    const openId = queryParams.get('openId') || localStorage.getItem('openId')
    console.log('🚀 >> useEffect >> openId:', openId)
    dispatch(setOpenId(openId))
    localStorage.setItem('openId', openId as string)
    return () => {}
  }, [])

  return (
    <>
      <Routes />
    </>
  )

  //     <ThemeCustomization>
  //         {/* RTL layout */}
  //         {/* <RTLLayout> */}
  //         <Locales>
  //             <NavigationScroll>
  //                 <AuthProvider>
  //                     <>
  //                         <Routes />
  //                         <Snackbar />
  //                     </>
  //                 </AuthProvider>
  //             </NavigationScroll>
  //         </Locales>
  //         {/* </RTLLayout> */}
  //  </ThemeCustomization>
}

export default App
