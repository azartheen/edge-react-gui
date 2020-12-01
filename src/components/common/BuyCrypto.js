// @flow

import * as React from 'react'
import { ActivityIndicator, Image, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { sprintf } from 'sprintf-js'

import s from '../../locales/strings.js'
import { type RootState } from '../../types/reduxTypes.js'
import { type Theme, type ThemeProps, cacheStyles, withTheme } from '../services/ThemeContext.js'
import { EdgeText } from '../themed/EdgeText.js'
import { ButtonBox } from '../themed/ThemedButtons.js'

const allowedCurrencies = { BTC: true, BCH: true, ETH: true, LTC: true, XRP: true, BSV: true }

type Props = {
  currencyCode: string,
  currencyName: string,
  currencyImage?: string,
  numTransactions: number
}

class BuyCryptoComponent extends React.PureComponent<Props & ThemeProps> {
  render() {
    const { currencyCode, currencyImage, currencyName, numTransactions, theme } = this.props
    const styles = getStyles(theme)

    if (numTransactions) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )
    }

    if (allowedCurrencies[currencyCode]) {
      return (
        <>
          <ButtonBox onPress={Actions.pluginBuy} paddingRem={1}>
            <View style={styles.container}>
              <View style={styles.buyCrypto}>
                <Image style={styles.buyCryptImage} source={{ uri: currencyImage }} resizeMode="cover" />
                <EdgeText style={styles.buyCryptoText}>{sprintf(s.strings.transaction_list_buy_crypto_message, currencyName)}</EdgeText>
              </View>
            </View>
          </ButtonBox>
          <View style={styles.noTransactionContainer}>
            <EdgeText style={styles.noTransactionText}>{s.strings.transaction_list_no_tx_yet}</EdgeText>
          </View>
        </>
      )
    }

    return (
      <View style={styles.noTransactionBigContainer}>
        <EdgeText style={styles.noTransactionText}>{s.strings.transaction_list_no_tx_yet}</EdgeText>
      </View>
    )
  }
}

const getStyles = cacheStyles((theme: Theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.rem(1),
    backgroundColor: theme.tileBackground
  },
  buyCrypto: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  buyCryptImage: {
    width: theme.rem(2.25),
    height: theme.rem(2.25),
    marginVertical: theme.rem(0.25)
  },
  buyCryptoText: {
    fontFamily: theme.fontFaceBold,
    marginVertical: theme.rem(0.25)
  },
  noTransactionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.rem(0.5)
  },
  noTransactionBigContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: theme.rem(15)
  },
  noTransactionText: {
    fontSize: theme.rem(1.25)
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.rem(10)
  }
}))

export const BuyCrypto = connect((state: RootState): Props => {
  const selectedWalletId = state.ui.wallets.selectedWalletId
  const selectedCurrencyCode = state.ui.wallets.selectedCurrencyCode
  const guiWallet = state.ui.wallets.byId[selectedWalletId]

  return {
    currencyCode: state.ui.wallets.selectedCurrencyCode,
    currencyName: guiWallet.currencyNames[selectedCurrencyCode],
    currencyImage: guiWallet.symbolImage,
    numTransactions: state.ui.scenes.transactionList.numTransactions
  }
})(withTheme(BuyCryptoComponent))
