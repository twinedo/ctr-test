import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Lottie from 'lottie-react-native';
import globalStyles from 'styles/globalStyles';
import {percentageHeight, percentageWidth} from 'styles/screen_size';
import LinearGradient from 'react-native-linear-gradient';
import {SECONDARY, WHITE} from 'styles/colors';
import {Footer, Input, Toolbar} from 'components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {InputHandle} from 'components/Input';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<number>(0);
  const hoursRef = useRef<InputHandle>(null);
  const minutesRef = useRef<InputHandle>(null);
  const secondsRef = useRef<InputHandle>(null);

  const _onPlay = () => {
    let totalSeconds =
      Number(hoursRef.current?.getValue!()) * 3600 +
      Number(minutesRef.current?.getValue!()) * 60 +
      Number(secondsRef.current?.getValue!());
    timerRef.current = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds -= 1;
        hoursRef.current?.setValue!(
          Math.floor(totalSeconds / 3600)
            .toString()
            .padStart(2, '0'),
        );
        minutesRef.current?.setValue!(
          Math.floor((totalSeconds % 3600) / 60)
            .toString()
            .padStart(2, '0'),
        );
        secondsRef.current?.setValue!(
          (totalSeconds % 60).toString().padStart(2, '0'),
        );
      } else {
        clearInterval(timerRef.current);
        setIsPlaying(false);
      }
    }, 1000);
    setIsPlaying(true);
  };

  const _onPause = () => {
    clearInterval(timerRef.current);
    setIsPlaying(false);
  };

  return (
    <View>
      <StatusBar backgroundColor={WHITE} barStyle="dark-content" />
      <View
        style={[
          styles.containerContent,
          globalStyles.alignCenter,
          globalStyles.justifySpaceBetween,
        ]}>
        <Toolbar
          text="Before Go-live"
          textStyle={[globalStyles.headingRegular.h2, {color: SECONDARY}]}
          prefix={<Ionicons name="menu" color={SECONDARY} size={24} />}
        />
        <View>
          <View
            style={[
              globalStyles.row,
              globalStyles.justifyAround,
              globalStyles.alignCenter,
            ]}>
            <View style={[globalStyles.alignCenter]}>
              <Input
                ref={hoursRef}
                defaultValue={hoursRef.current?.getValue!()}
                placeholder="00"
                placeholderTextColor={WHITE}
                style={[styles.input]}
                keyboardType="numeric"
                editable={!isPlaying}
                maxLength={2}
              />
              <Text style={[globalStyles.headingLight.h3, {color: WHITE}]}>
                HOURS
              </Text>
            </View>

            <Text style={[globalStyles.headingRegular.h1, styles.dividen]}>
              :
            </Text>
            <View style={[globalStyles.alignCenter]}>
              <Input
                ref={minutesRef}
                defaultValue={minutesRef.current?.getValue!()}
                placeholder="00"
                placeholderTextColor={WHITE}
                style={[styles.input]}
                keyboardType="numeric"
                editable={!isPlaying}
                maxLength={2}
              />
              <Text style={[globalStyles.headingLight.h3, {color: WHITE}]}>
                MINUTES
              </Text>
            </View>

            <Text style={[globalStyles.headingRegular.h1, styles.dividen]}>
              :
            </Text>
            <View style={[globalStyles.alignCenter]}>
              <Input
                ref={secondsRef}
                defaultValue={secondsRef.current?.getValue!()}
                placeholder="00"
                placeholderTextColor={WHITE}
                style={[styles.input]}
                keyboardType="numeric"
                editable={!isPlaying}
                maxLength={2}
              />
              <Text style={[globalStyles.headingLight.h3, {color: WHITE}]}>
                SECONDS
              </Text>
            </View>
          </View>
        </View>

        <Footer
          onPressStatus={(status: 'play' | 'pause') =>
            status === 'pause' ? _onPlay() : _onPause()
          }
        />
      </View>
      <View style={styles.containerAnim}>
        <Lottie
          source={require('assets/images/animation.json')}
          autoPlay
          loop
          style={[{width: percentageWidth(100), height: percentageWidth(100)}]}
        />
        <LinearGradient
          colors={['#9277cf', '#B769D4']}
          style={styles.linearGradient}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerContent: {
    height: percentageHeight(100),
    width: percentageWidth(100),
  },
  containerAnim: {
    position: 'absolute',
    top: -percentageWidth(30),
    zIndex: -1,
  },
  dividen: {
    color: WHITE,
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 20,
  },
  linearGradient: {
    flex: 1,
    height: percentageHeight(100),
  },
  //
  input: {
    textAlign: 'center',
    fontSize: 70,
    paddingLeft: 8,
    color: WHITE,
    fontWeight: '200',
  },
});
