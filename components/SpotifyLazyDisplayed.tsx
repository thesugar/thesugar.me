import React, { useEffect, useState } from 'react'

type Props = {
  src: string
  lag: number
}

const SpotifyLazyDisplayed = ({ src, lag }: Props): JSX.Element => {
  const [show, setShow] = useState<boolean>(false)
  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, lag)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return show ? (
    <iframe
      style={{ borderRadius: '12px' }}
      src={src}
      width="100%"
      height="380"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    ></iframe>
  ) : (
    <></>
  )
}

export default SpotifyLazyDisplayed
