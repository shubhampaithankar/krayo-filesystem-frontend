import { lazy } from 'react'

const Auth = lazy(() => import('./Auth'))
const LoginSuccessful = lazy(() => import('./LoginSuccessful'))
const FileSystem = lazy(() => import('./FileSystem'))

export { Auth, LoginSuccessful, FileSystem }