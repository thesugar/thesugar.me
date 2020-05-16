import Link from 'next/link'
import { siteTitle } from './sugar.config'

const THESUGARME = (
    <>
        <Link href='/'>
            <a className='btn-cross'>{siteTitle}</a>
        </Link>
        <style jsx>{`
                a {
                    background-color: inherit;
                    padding: 0;
                    transition: none;
                    color: inherit;
                }

                .btn-cross {
                    display: inline-block;
                    position: relative;
                    padding: 0.25em 1em;
                    border-top: solid 2px black;
                    border-bottom: solid 2px black;
                    text-decoration: none;
                    font-weight: bold;
                    color: #03A9F4;
                    margin-bottom: 3rem;
                }
                .btn-cross:before, .btn-cross:after {
                    content: '';
                    position: absolute;
                    top: -7px;
                    width: 2px;
                    height: -webkit-calc(100% + 14px);
                    height: calc(100% + 14px);
                    background-color: black;
                    transition: .3s;
                }
                .btn-cross:before {
                    left: 7px;
                }
                .btn-cross:after {
                    right: 7px;
                }
                .btn-cross:hover:before {
                    top: 0px;
                    left:0;
                    height: 100%;
                }
                .btn-cross:hover:after {
                    top: 0px;
                    right: 0;
                    height: 100%;
                }
        `}</style>
    </>
)

export default THESUGARME