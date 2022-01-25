import React, { useImperativeHandle, useMemo, useRef, useState } from 'react'
import { Props, defaultProps } from './input-props'
import PasswordIcon from './password-icon'
import Input from './input'
import { withScaleable } from '../use-scaleable'

interface PasswordProps extends Props {
  hideToggle?: boolean
}

const passwordDefaultProps = {
  ...defaultProps,
  hideToggle: false,
}

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof PasswordProps>
export type InputPasswordProps = PasswordProps & NativeAttrs

const InputPasswordComponent = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<InputPasswordProps>
>(
  (
    {
      hideToggle,
      children,
      ...props
    }: React.PropsWithChildren<InputPasswordProps> & typeof defaultProps,
    ref: React.Ref<HTMLInputElement | null>,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [visible, setVisible] = useState<boolean>(false)
    useImperativeHandle(ref, () => inputRef.current)

    const iconClickHandler = () => {
      setVisible(v => !v)
      /* istanbul ignore next */
      if (inputRef && inputRef.current) {
        inputRef.current.focus()
      }
    }

    const inputProps = useMemo(
      () => ({
        ...props,
        ref: inputRef,
        iconClickable: true,
        onIconClick: iconClickHandler,
        htmlType: visible ? 'text' : 'password',
      }),
      [props, iconClickHandler, visible, inputRef],
    )
    const icon = useMemo(() => {
      if (hideToggle) return null
      return <PasswordIcon visible={visible} />
    }, [hideToggle, visible])

    return (
      <Input iconRight={icon} {...inputProps}>
        {children}
      </Input>
    )
  },
)

InputPasswordComponent.defaultProps = passwordDefaultProps
InputPasswordComponent.displayName = 'GeistInputPassword'
const InputPassword = withScaleable(InputPasswordComponent)
export default InputPassword
