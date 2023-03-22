import { lazy } from 'react'

const Auth = lazy(() => import('./Auth'))
const FileSystem = lazy(() => import('./FileSystem'))

export { Auth, FileSystem }