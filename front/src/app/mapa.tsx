// import React, { useState} from 'react';
// import {ImageBackground, View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   Easing,
//   withRepeat,
//   withSpring
// } from 'react-native-reanimated';

// const duration = 5000;

// export default function mapa() {
//   const defaultAnim = useSharedValue(30);
//   const defaultAnim2 = useSharedValue(30);
//   const defaultAnim3 = useSharedValue(40);
//   const linear = useSharedValue(300);

//   const image = {uri: 'https://mfiles.alphacoders.com/683/683110.jpg'};

//   const animatedDefault = useAnimatedStyle(() => ({
//     transform: [{ translateX: defaultAnim.value }],
//   }));
//   const animatedDefault2 = useAnimatedStyle(() => ({
//     transform: [{ translateX: defaultAnim2.value }],
//   }));
//   const animatedDefault3 = useAnimatedStyle(() => ({
//     transform: [{ translateX: defaultAnim3.value }],
//   }));
//   const buttonClickedHandler = () => {
//     console.log('You have been clicked a button!');
//     // do something
    
//     };
//     React.useEffect(() => {
//         linear.value = withRepeat(
//           // highlight-next-line
//           withTiming(-linear.value, {
//             duration,
//             easing: Easing.linear,
//           }),
//           -1,
//           true
//         );
//         defaultAnim.value = withRepeat(
//           // highlight-next-line
//           withTiming(-defaultAnim.value, {
//             duration,
//           }),
//           -1,
//           true
//         );
//         defaultAnim2.value = withRepeat(
//             // highlight-next-line
//             withTiming(-defaultAnim.value, {
//               duration,
//             }),
//             -1,
//             true
//           );
//           defaultAnim3.value = withRepeat(
//             // highlight-next-line
//             withTiming(-defaultAnim.value, {
//               duration,
//             }),
//             -1,
//             true
//           );
//       }, []);
  
//   return (
//     <View style={styles.screen}>
//       <ImageBackground source={image} resizeMode="cover" style={styles.image}></ImageBackground>
//       <Animated.View style={[styles.box, animatedDefault]}>
//       <TouchableOpacity
//         onPress={buttonClickedHandler}
//         >
//         <Text style = {styles.appButtonText}>RAZ</Text>
//       </TouchableOpacity>
//       </Animated.View>
//       <Animated.View style={[styles.box2, animatedDefault2]}>
//       <TouchableOpacity
//         onPress={buttonClickedHandler}
//         >
//         <Text style = {styles.appButtonText}>DWA</Text>
//       </TouchableOpacity>
//       </Animated.View>
//       <Animated.View style={[styles.box3, animatedDefault3]}>
//       <TouchableOpacity
//         onPress={buttonClickedHandler}
//         >
//         <Text style = {styles.appButtonText}>TRZY</Text>
//       </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// }

// // Styles
// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
    
    
//   },
//   roundButton1: {
//     marginTop: 20,
//     width: 200,
//     height: 200,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 100,
//     backgroundColor: 'rgba(255, 0, 85, 0.6)',
//     elevation: 20,
//     shadowColor: 'blue',
//     shadowOffset: { width: 5, height: 5 },
//     shadowOpacity: 0.26,
//   },
//   roundButton2: {
//     marginTop: 20,
//     width: 200,
//     height: 200,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 100,
//     backgroundColor: 'rgba(255, 0, 85, 1)',
//     elevation: 20,
//     shadowColor: 'blue',
//     shadowOffset: { width: 5, height: 5 },
//     shadowOpacity: 0.26,
    
//   },
//   roundButton3: {
//     marginTop: 20,
//     width: 200,
//     height: 200,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 100,
//     backgroundColor: 'rgba(255, 85, 0, 1)',
//     elevation: 20,
//     shadowColor: 'blue',
//     shadowOffset: { width: 5, height: 5 },
//     shadowOpacity: 0.26,
    
//   },
//   appButtonContainer: {
//     elevation: 8,
//     backgroundColor: "#009688",
//     borderRadius: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 12
//   },
//   appButtonText: {
//     fontSize: 18,
//     color: "#fff",
//     fontWeight: "bold",
//     alignSelf: "center",
//     textTransform: "uppercase"
//   },
//   circle: {
//     backgroundColor: '#f52d56',
//     width: 60,
//     height: 60,
//     position: 'absolute',
//     bottom: 40,
//     right: 40,
//     borderRadius: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100%',
//   },
//   box: {
//     width: 200,
//     height: 200,
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: 'grey',
//     alignItems: 'center',
//     padding: 15,
//     borderRadius: 100,
//     backgroundColor: 'rgba(220, 220, 220, 0.6)',
//     elevation: 20,
//     shadowColor: 'blue',
//     shadowOffset: { width: 5, height: 5 },
//     shadowOpacity: 0.26,
//     position: 'absolute',
//     bottom:500,
//     left:40,
//   },
//   box2: {
//     width: 200,
//     height: 200,
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: 'grey',
//     alignItems: 'center',
//     padding: 15,
//     borderRadius: 100,
//     backgroundColor: 'rgba(192, 192, 192, 0.6)',
//     elevation: 20,
//     shadowColor: 'blue',
//     shadowOffset: { width: 5, height: 5 },
//     shadowOpacity: 0.26,
//     position: 'absolute',
//     bottom:265,
//     left:150,
//   },
//   box3: {
//     width: 200,
//     height: 200,
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: 'grey',
//     alignItems: 'center',
//     padding: 15,
//     borderRadius: 200,
//     backgroundColor: 'rgba(105, 105, 105, 0.6)',
//     elevation: 20,
//     shadowColor: 'blue',
//     shadowOffset: { width: 5, height: 5 },
//     shadowOpacity: 0.26,
//     position: 'absolute',
//     bottom:30,
//     left:70,
//   },
// });