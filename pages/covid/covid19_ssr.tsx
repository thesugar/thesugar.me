import React from 'react'
import { GetServerSideProps } from 'next'

type Data = {
    data : any
}

const Page = ({ data } : Data) => {
    console.log(data)
    return (
    <>
    <div>
        hoge
    </div>
    </>
)}

export const getServerSideProps : GetServerSideProps = async () => {
    // Fetch data from external API
    const res = await fetch('https://api.covid19api.com/dayone/country/japan/status/confirmed/live')
    const data = await res.json()
  
    // Pass data to the page via props
    return { props: { data } }
}

export default Page
  
