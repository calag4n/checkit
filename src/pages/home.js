import React, { useEffect } from 'react'
import Layout from '../components/layout'
import { useAuth } from "gatsby-theme-firebase";

const Home = () => {
  const { isLoading, isLoggedIn, profile } = useAuth();

  useEffect(() => {
    console.log(isLoggedIn)
    console.log(profile)
  }, [])

  return isLoggedIn && (
    <Layout>
      
    </Layout>
  )
}

export default Home
