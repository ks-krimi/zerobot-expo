import { useAssets } from 'expo-asset'
import React, { useRef } from 'react'
import { Pressable, View } from 'react-native'
import Rive, { LoopMode } from 'rive-react-native'

const Zerobot = () => {
  const riveRef = useRef(null)
  const [assets, error] = useAssets([require('../../../assets/zerobot.riv')])

  const onPress = () => {
    riveRef?.current?.play('touched', LoopMode.OneShot)
  }

  if (assets) {
    return (
      <Pressable onTouchStart={onPress}>
        <View style={{ width: 250, height: 250 }}>
          <Rive
            ref={riveRef}
            url={assets[0].uri}
            artboardName="New Artboard"
            animationName="idle"
          />
        </View>
      </Pressable>
    )
  }

  return null
}

export default Zerobot
