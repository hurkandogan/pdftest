import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'


const Home: NextPage = () => {
  return (
    <div className="main-wrapper">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>HD Blog</title>
      </Head>
      <Header />
      <h1>Blog Posts</h1>
      
    </div>
  )
}

export default Home
