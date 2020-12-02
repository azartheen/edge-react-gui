// @flow

import * as React from 'react'

declare module 'react-native-material-textfield' {
  declare export type ContentInset = {|
    top?: number,
    label?: number,
    input?: number
  |}

  declare export type TextFieldProps = {|
    // From the react-native-material-textfield readme:
    animationDuration?: number,
    characterRestriction?: number,
    disabled?: boolean,
    editable?: boolean,
    error?: string,
    label: string,
    multiline?: boolean,
    prefix?: string,
    suffix?: string,
    title?: string,

    // Colors:
    baseColor?: string,
    errorColor?: string,
    textColor?: string,
    tintColor?: string,

    // Sizes:
    fontSize?: number,
    labelFontSize?: number,
    titleFontSize?: number,

    // Other layout options:
    activeLineWidth?: number,
    contentInset?: ContentInset,
    disabledLineType?: 'solid' | 'dotted' | 'dashed' | 'none',
    disabledLineWidth?: number,
    labelOffset?: Object,
    lineType?: 'solid' | 'dotted' | 'dashed' | 'none',
    lineWidth?: number,

    // Styles:
    affixTextStyle?: any,
    containerStyle?: any,
    inputContainerStyle?: any,
    labelTextStyle?: any,
    titleTextStyle?: any,

    // Methods:
    formatText?: (text: string) => string,
    onBlur?: () => void,
    onChangeText?: (text: string) => void,
    onFocus?: () => void,
    renderLeftAccessory?: () => any,
    renderRightAccessory?: () => any,

    // Other React Native TextInput properties:
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters',
    autoCorrect?: boolean,
    inputAccessoryViewID?: string,
    keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad',
    maxLength?: number,
    onSubmitEditing?: () => void,
    returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send',
    secureTextEntry?: boolean,
    value?: string,
  |}

  declare export class TextField extends React$Component<TextFieldProps> {
    focus(): void;
    blur(): void;
    clear(): void;
    value(): string;
    isFocused(): boolean;
    isRestricted(): boolean;
    setValue(value?: string): void;
  }
}
