import React from 'react'
import NativeLink from 'next/link'

export const GenericLink = (props: any): JSX.Element => {
  if (
    props.href !== undefined &&
    props.href.startsWith('/') &&
    !props.href.startsWith('/docs')
  ) {
    return <InternalLink {...props} />
  }

  if (
    (props.href !== undefined && props.href.includes('@')) ||
    (props.href !== undefined && props.href.startsWith('#'))
  ) {
    return <AnchorLink {...props} />
  }

  return <ExternalLink {...props} />
}

export const InternalLink = ({
  href,
  as,
  children,
  error = false,
}: {
  href: string
  as: string
  children: any
  error?: boolean | undefined
}): JSX.Element => (
  <NativeLink href={href} as={as}>
    <a>
      {children}

      <style jsx>{`
        a {
          text-decoration: ${error ? 'underline' : 'none'};
          font-size: inherit;
          padding: 0.1rem;
        }
        a:hover {
          text-decoration: none;
          padding: 0.1rem;
        }
      `}</style>
    </a>
  </NativeLink>
)

export const AnchorLink = ({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: any
  children: any
}): JSX.Element => (
  <a href={href} onClick={onClick}>
    {children}

    <style jsx>
      {`
        a {
          color: inherit;
          font-size: inherit;
          border-bottom: 1px dotted;
          padding: 0.1rem;
        }
        a:hover {
          color: gray;
          text-decoration: none;
          padding: 0.1rem;
        }
      `}
    </style>
  </a>
)

export const ExternalLink = ({
  href,
  children,
}: {
  href: string
  children: any
}): JSX.Element => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}

    <style jsx>
      {`
        a {
          text-decoration: none;
          font-size: inherit;
          padding: 0.1rem;
        }
      `}
    </style>
  </a>
)
