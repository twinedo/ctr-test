import {Pressable, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import globalStyles from 'styles/globalStyles';
import Foundation from 'react-native-vector-icons/Foundation';
import {WHITE} from 'styles/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IFooter {
  onPressStatus: (status: 'play' | 'pause') => void;
}

export default function Footer(props: IFooter) {
  const {onPressStatus} = props;

  const [isPlay, setIsPlay] = useState(false);

  const _onPressBtn = useCallback(() => {
    setIsPlay(!isPlay);
    onPressStatus(isPlay ? 'play' : 'pause');
  }, [isPlay]);

  //     function _onPressBtn() {

  //   }
  console.log('rerender');

  return (
    <View
      style={[
        globalStyles.row,
        globalStyles.alignEnd,
        globalStyles.justifySpaceBetween,
        globalStyles.horizontalDefaultPadding,
        globalStyles.verticalDefaultPadding,
      ]}>
      <Foundation name="clipboard-notes" size={30} color={WHITE} />
      <Pressable
        style={[globalStyles.displayFlex, globalStyles.alignCenter]}
        onPress={_onPressBtn}>
        <Ionicons
          name={isPlay ? 'pause-circle-outline' : 'play-circle-outline'}
          size={70}
          color={WHITE}
        />
        <Text style={[globalStyles.headingBold.h2, {color: WHITE}]}>
          {isPlay ? 'PAUSE' : 'PLAY'}
        </Text>
      </Pressable>
      <Ionicons name="trash-outline" size={30} color={WHITE} />
    </View>
  );
}
