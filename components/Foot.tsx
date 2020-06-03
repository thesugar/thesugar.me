import React, { ReactChildren, ReactNode } from 'react'
import Link from 'next/link'

type Props = {
    home?: boolean
    children?: ReactNode
}

const Foot = ({home, children} : Props): JSX.Element => (
    <footer>
    {children}
    {!home &&
    <Link href="/">
      <a className="backToHome">← Top page<style jsx>{`
      .backToHome {
        font-family: "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif;
      }
      `}</style></a>
    </Link>
    }

    <div className='copyright'>
    {'Copyright © thesugar'}
    {' '}
    {new Date().getFullYear()}
    {'.'}
    <style jsx>{`
        .copyright {
            font-family: "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif;
            font-size: 0.8rem;
            text-align: center;
            color: #4f4f4f;
        }
    `}</style>
    </div>
    </footer>
)

export default Foot