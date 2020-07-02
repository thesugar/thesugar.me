import React, { useState, ReactNode } from 'react'
import Link from 'next/link'
import { PRIVACY_POLICY_STATE } from './sugar.config'

type Props = {
  home?: boolean
  children?: ReactNode
}

const Foot = ({ home, children }: Props): JSX.Element => {

  const [showPolicy, setShowPolicy] = useState(false)
  
  return (
  <footer>
    {children}
    {!home && (
      <Link href="/">
        <a className="backToHome">
          ← Top page
          <style jsx>{`
            .backToHome {
              font-family: 'avenir next', avenir, 'helvetica neue', helvetica,
                ubuntu, roboto, noto, 'segoe ui', arial, sans-serif;
            }
          `}</style>
        </a>
      </Link>
    )}

    <div className="footBox">
    <span className="copyright">
      {'Copyright © thesugar'} {new Date().getFullYear()}
      {'.'}
    </span>

    <span id="privacy-policy"><a onClick={() => setShowPolicy(!showPolicy)}>{!showPolicy ? 'Privacy Policy' : 'Privacy Policy を隠す'}</a></span>
    {showPolicy && 
      <div className="privacy-policy-state">{PRIVACY_POLICY_STATE}</div>
    }
      <style jsx>{`
        .footBox {
          display: grid;
          grid-template-rows: 1fr 1fr;
          text-align: center;
          padding-top: 1.25rem;
        }

        .copyright {
          font-family: 'avenir next', avenir, 'helvetica neue', helvetica,
            ubuntu, roboto, noto, 'segoe ui', arial, sans-serif;
          font-size: 0.8rem;
          color: #4f4f4f;
        }

        #privacy-policy {
          font-family: 'avenir next', avenir, 'helvetica neue', helvetica,
            ubuntu, roboto, noto, 'segoe ui', arial, sans-serif;
          font-size: 0.75rem;
          color: #4f4f4f;
        }

        .privacy-policy-state {
          font-family: 'avenir next', avenir, 'helvetica neue', helvetica,
            ubuntu, roboto, noto, 'segoe ui', arial, sans-serif;
          font-size: 0.75rem;
          padding: 0.5em 1em;
          color: #2c2c2f;
          background: #feffcd;
          margin-right: 20%;
          margin-left: 20%;
          text-align: left;
        }
      `}</style>
    </div>
  </footer>
)
}
export default Foot
