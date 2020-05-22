import React, { useState, useEffect } from 'react'
import { getStoredValue } from '../lib/localStorage'

type Meta = {
    id: string;
    title: string;
    date: string;
    tags: string[];
}

type Props = {
    meta: Meta
    currentLiked: boolean
    setCurrentLiked: React.Dispatch<React.SetStateAction<boolean>>
}

const handleSubmit = (meta: Meta) => {

    let currentLikedOrNot = false
    try {
        currentLikedOrNot = JSON.parse(localStorage.getItem(meta.id) as string).liked
    } catch (err) {
        console.log(err)
    }

    fetch('/api/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          //url: window.location.toString(),
          //ua: navigator.userAgent,
          "id": `${meta.id}`,
          "currentLikedOrNot" : `${currentLikedOrNot}`
        })
      })
    localStorage.setItem(meta.id, `{ "liked": ${!currentLikedOrNot} }`)
}

const getLike = async (id :string) => {
    const res = await fetch(`/api/like?id=${id}`)
    return await res.json()
}

const LikeButton = ({meta, currentLiked, setCurrentLiked} :Props) => {

    const [like, setLike] = useState(0)

    /*
    useEffect(() => {
        new Promise((resolve, reject) => {
            resolve(getLike(meta.id))
        }).then(value => {
            setLike(JSON.parse(JSON.stringify(value)).likes)
        })
    }, [like, currentLiked])
    */

    useEffect(() => {
        const func = async () => {
            const value = await getLike(meta.id)
            setLike(JSON.parse(JSON.stringify(value)).likes)
        }
        func()
    }, [like, currentLiked])

    useEffect(() => {
        try {
            setCurrentLiked(JSON.parse(getStoredValue(meta.id) as string)['liked'])
        } catch (err) {
            setCurrentLiked(false)
        } 
        //document.getElementsByClassName("likeButton")[0].innerHTML = getStoredValue(meta.id) === 'liked' ? "<i class='fas fa-heart'></i>" : "<i class='far fa-heart'></i>"
    },[]/* [currentLiked]*/)

    return (
        <div className='likeArea'>
        <div className={`heartMark-${currentLiked}`} onClick={() => { handleSubmit(meta); setCurrentLiked(!currentLiked)}}>
            {currentLiked ? <i className='fas fa-heart'></i> : <i className='far fa-heart'></i>}
        </div>
        <span className='howManyLikes'>{like}</span><style jsx>{`
        .likeArea {
            display: grid;
            grid-template-rows: 1fr 1fr;
            align-self: center;
            justify-self: center;
        }

        .howManyLikes {
            font-size: 1rem;
            position: 50%;
            align-self: center;
            justify-self: center;
            font-family: "Courier New", Courier, monospace;
        }

        .heartMark-false {
            display: inline-block;
            position: relative;
            box-sizing: border-box;
            text-decoration: none;
            width: 40px;
            height: 40px;
            line-height: 24px;
            font-size: medium;
            border-radius: 50%;
            line-height: 34px;
            text-align: center;
            font-weight: bold;
            box-shadow: inset 0 2px 0px rgba(255, 255, 255, 0.25), inset 0 -2px 0px rgba(0, 0, 0, 0.8);
            transition: .2s;
            background: rgb(205, 205, 200);
            border: solid 5px rgb(200, 200, 200);
            opacity: 40%;
        }

        .heartMark-true {
            display: inline-block;
            position: relative;
            box-sizing: border-box;
            text-decoration: none;
            width: 40px;
            height: 40px;
            line-height: 24px;
            font-size: medium;
            border-radius: 50%;
            line-height: 34px;
            text-align: center;
            font-weight: bold;
            box-shadow: inset 0 2px 0px rgb(255, 120, 187), inset 0 -2px 0px rgb(255, 120, 187);
            transition: .2s;
            background: rgb(255, 120, 187);
            border: solid 5px rgb(255, 120, 187);
        }
        `}</style>
        </div>
    )
}

export default LikeButton