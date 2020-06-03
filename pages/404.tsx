import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import ThesugarMe from '../components/ThesugarMe'
import Foot from '../components/Foot'

const Custom404 = (): JSX.Element => {

    const [destination, setDestination] = useState('')

    useEffect(() => {
        setDestination(window.location.toString())
    })

    return (
        <div className="allContainer">
            <Head>
            <title>404 not found</title>
            </Head>
            {ThesugarMe}

            <main>
                <h1>🤔 Oops!</h1>
                {destination} を探しましたが、ページが見つかりません。
            </main>

            <Foot />
        </div>
)}

export default Custom404