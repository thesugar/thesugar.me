import React from 'react'

type Props = {
    content: {
        props: {
            originalType: string; 
            mdxType:string; 
            children:any;
        }
    }[]
}

const Toc = ({content}: Props) => {
    const contents = content.filter(c => typeof c.props !== 'undefined' && typeof c.props.originalType === 'string' && c.props.originalType.startsWith('h') && !c.props.originalType.startsWith('hr'))
    let toclist: string[] = ['<ul style="list-style: none; padding-left: 0;">']
    let previousNum = 2
    const result = contents.map((content, index) => {
        const headingNum = parseInt(content.props.originalType.replace('h', ''))
        if (headingNum > previousNum) {
            toclist.push('<ul style="list-style: none; padding-left: 1rem;">')
        }
        if (content.props.children.toString() === '[object Object]' ) {
            toclist.push(`<li>${content.props.children.props.children}</li>`)
        } else {
            toclist.push(`<li>${content.props.children.toString()}</li>`)
        }
        
        if (headingNum < previousNum) {
            toclist.push('</ul>')
        }

        previousNum = headingNum
        
        if (index === contents.length - 1) {
            toclist.push('</ul>')
            return (toclist.join('') as string)
        }
    }
    )

    const toc = result[result.length - 1]

    return (<nav>
                {toc ? 
                <div dangerouslySetInnerHTML={{__html: toc}}></div> : ''}
                <style jsx>{`
                li {
                    list-style: none;
                }

                ul {
                    list-style: none;
                }

                nav {
                    position: -webkit-sticky;
                    position: sticky;
                    top: 15%;
                    margin-left: 0rem;
                    font-size: small;
                    opacity: 60%;
                }
                `}</style>
            </nav>)
}

export default Toc