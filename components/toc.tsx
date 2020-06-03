import React from 'react'

type Props = {
  content: {
    props: {
      originalType: string
      mdxType: string
      children: any
    }
  }[]
}

const Toc = ({ content }: Props): JSX.Element => {
  const contents = content.filter(
    (c) =>
      typeof c.props !== 'undefined' &&
      typeof c.props.originalType === 'string' &&
      c.props.originalType.startsWith('h') &&
      !c.props.originalType.startsWith('hr')
  )
  const toclist: string[] = ['<ul style="list-style: none; padding-left: 0;">']
  let previousNum = 2
  const result = contents.map((content, index) => {
    const headingNum = parseInt(content.props.originalType.replace('h', ''))
    if (headingNum > previousNum) {
      toclist.push('<ul style="list-style: none; padding-left: 1rem;">')
    }
    
    if (headingNum < previousNum) {
      toclist.push('</ul>')
    }

    if (content.props.children.toString() === '[object Object]') {
      toclist.push(
        `<li><a href='#${content.props.children.props.children}' style='padding:0'>${content.props.children.props.children}</a></li>`
      )
    } else {
      toclist.push(
        `<li><a href='#${content.props.children.toString()}' style='padding:0'>${content.props.children.toString()}</a></li>`
      )
    }

    previousNum = headingNum

    if (index === contents.length - 1) {
      toclist.push('</ul>')
      return toclist.join('') as string
    }
  })

  const toc = result[result.length - 1]

  return (
    <nav>
      {toc ? <div dangerouslySetInnerHTML={{ __html: toc }}></div> : ''}
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
    </nav>
  )
}

export default Toc
