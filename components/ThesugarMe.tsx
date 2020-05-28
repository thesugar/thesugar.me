import React from 'react'
import Link from 'next/link'
import { siteTitle } from './sugar.config'

const THESUGARME = (
  <>
    <Link href="/">
      <a className="btn-cross">{siteTitle}</a>
    </Link>
  </>
)

export default THESUGARME
