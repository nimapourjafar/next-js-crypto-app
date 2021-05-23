import Head from 'next/head'
import {useState} from 'react'
import SearchBar from '../components/SearchBar'
import Coins from '../components/Coins'

export default function Home({coins}) {
  const [search,setSearch] = useState('')

  const currentCoins = coins.filter(coin=> coin.name.toLowerCase().includes(search.toLowerCase()))

  const eventHandler = e =>{
    e.preventDefault()
    setSearch(e.target.value.toLowerCase())
  }

  return (
    <div >
      <Head>
        <title>Crypto Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBar onChange={eventHandler}/>
      <Coins coins={currentCoins}/>
    </div>
  )
}

export const getStaticProps = async() =>{
  const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
  const coins = await res.json()
  return{
    props:{
      coins
    },
    revalidate: 5
  }
}
