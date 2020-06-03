import React from 'react'
import Link from 'next/link'
import { siteTitle } from './sugar.config'

const THESUGARME = (
  <span className="siteTitle">
    <Link href="/">
      <a className="btn-cross">{siteTitle}</a>
    </Link>
  </span>
)

export default THESUGARME
