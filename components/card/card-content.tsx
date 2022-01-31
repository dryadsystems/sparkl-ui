import React from 'react'
import useScale, { withPureProps, withScale } from '../use-scale'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type CardContentProps = Props & NativeAttrs

const CardContentComponent: React.FC<React.PropsWithChildren<CardContentProps>> = ({
  className,
  children,
  ...props
}: CardContentProps & typeof defaultProps) => {
  const { SCALES } = useScale()

  return (
    <div className={`content ${className}`} {...withPureProps(props)}>
      {children}
      <style jsx>{`
        .content {
          width: ${SCALES.width(1, '100%')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(1)} ${SCALES.pr(1)} ${SCALES.pb(1)} ${SCALES.pl(1)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        .content > :global(p:first-child) {
          margin-top: 0;
        }

        .content > :global(p:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  )
}

CardContentComponent.defaultProps = defaultProps
CardContentComponent.displayName = 'GeistCardContent'
const CardContent = withScale(CardContentComponent)
export default CardContent
