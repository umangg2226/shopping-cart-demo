import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from './Layout'
import { ErrorBoundary } from 'react-error-boundary'
import componentLoader from '../tools/componentLoader'
import { Backdrop } from '@mui/material'
import { CircularProgress, Typography } from '@mui/material'

const Home = lazy(() => componentLoader(() => import('../pages/home')))
const Cart = lazy(() => componentLoader(() => import('../pages/cart')))

const RouteWrapper = ({ component: Component, layout: Layout, ...rest }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallBackRoot}>
      <Suspense fallback={<RootLoading />}>
        <Route
          {...rest}
          render={(props) => (
            <Layout {...props}>
              <Component {...props} />
            </Layout>
          )}
        />
      </Suspense>
    </ErrorBoundary>
  )
}

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <RouteWrapper exact path='/' component={Home} layout={Layout} />
        <RouteWrapper exact path='/cart' component={Cart} layout={Layout} />
      </Switch>
    </BrowserRouter>
  )
}

const ErrorFallBackRoot = ({ error }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <Typography color={'error'}>{error?.message}</Typography>
    </Backdrop>
  )
}

const RootLoading = () => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}

export default Routes
