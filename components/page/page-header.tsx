import React from 'react'
import useScale, { withPureProps, withScale } from '../use-scale'

interface Props {
  center?: boolean
  className?: string
}

const defaultProps = {
  center: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type PageHeaderProps = Props & NativeAttrs

const PageHeaderComponent: React.FC<React.PropsWithChildren<PageHeaderProps>> = ({
  children,
  center,
  className,
  ...props
}: React.PropsWithChildren<PageHeaderProps> & typeof defaultProps) => {
  const { SCALES } = useScale()

  return (
    <header
      className={`${center ? 'center' : ''} ${className}`}
      {...withPureProps(props)}>
      {children}
      <style jsx>{`
        header {
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, '100%')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        .center {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </header>
  )
}

PageHeaderComponent.defaultProps = defaultProps
PageHeaderComponent.displayName = 'GeistPageHeader'
const PageHeader = withScale(PageHeaderComponent)
export default PageHeader
