import React from 'react'
import { useScheme } from '../contexts/SchemeContext'
import { RefetchProvider } from '../contexts/RefetchContext'
import { useUsers } from '../contexts/UserContext'

const CombinedRefetchWrapper = ({children}) => {

    const {refetchScheme} = useScheme()
    const {refetchUsers} = useUsers()
  return (
   <RefetchProvider
   refetchers = {[
    refetchScheme,
    refetchUsers,
   ]}
   >
    {children}
   </RefetchProvider>
  )
}

export default CombinedRefetchWrapper
