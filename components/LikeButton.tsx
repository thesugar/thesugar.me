import React, { useState, useEffect } from 'react'
import styles from './layout.module.css'
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

const LikeButton = ({meta, currentLiked, setCurrentLiked} :Props) => {

    useEffect(() => {
        try {
            setCurrentLiked(JSON.parse(getStoredValue(meta.id) as string)['liked'])
        } catch (err) {
            setCurrentLiked(false)
        } 
        //document.getElementsByClassName("likeButton")[0].innerHTML = getStoredValue(meta.id) === 'liked' ? "<i class='fas fa-heart'></i>" : "<i class='far fa-heart'></i>"
    },[]/* [currentLiked]*/)

    return (
        <div className={`${styles.likeOnLeft} ${styles.heart} ${currentLiked}`} onClick={() => { handleSubmit(meta); setCurrentLiked(!currentLiked)}}>
            {currentLiked ? <i className='fas fa-heart'></i> : <i className='far fa-heart'></i>}
        </div>
    )
}

export default LikeButton