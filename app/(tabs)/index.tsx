import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Image, TextInput, KeyboardAvoidingView, Platform, StatusBar, useWindowDimensions, TouchableOpacity, Text } from 'react-native';

const App: React.FC = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [darkMode, setDarkMode] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    if (screenWidth > screenHeight) {
      setOrientation('landscape');
    } else {
      setOrientation('portrait');
    }
  }, [screenWidth, screenHeight]);

  const statusBarStyle = Platform.select({
    ios: orientation === 'landscape' ? 'dark-content' : 'light-content',
    android: orientation === 'landscape' ? 'dark-content' : 'light-content',
  }) || 'default';

  const statusBarBackgroundColor = Platform.select({
    ios: orientation === 'landscape' ? '#FFFFFF' : '#222222',
    android: orientation === 'landscape' ? '#FFFFFF' : '#222222',
  }) || '#222222';

  const handleFocus = () => {
    setInputFocused(true);
  };

  const handleBlur = () => {
    setInputFocused(false);
  };

  const styles = getStyles(darkMode, orientation, screenWidth);

  return (
    <>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackgroundColor}
        animated={true}
        hidden={false}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ ios: 60, android: 80 })}
      >
        {!inputFocused && (
          <TouchableOpacity style={styles.themeButton} onPress={() => setDarkMode(!darkMode)}>
            <Text style={styles.themeButtonText}>{darkMode ? 'Light Mode' : 'Dark Mode'}</Text>
          </TouchableOpacity>
        )}
        <Image
          source={{ uri: 'https://img6.thuthuatphanmem.vn/uploads/2022/10/23/anh-nen-may-tinh-4k-chill_040222390.jpg' }}
          style={[
            styles.image,
            {
              width: screenWidth * 0.8,
              height: orientation === 'landscape' ? (screenWidth * 0.8) * 0.3 : (screenWidth * 0.8) * 0.5625,
            },
          ]}
          resizeMode="contain"
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập gì đi :3"
          placeholderTextColor={styles.input.placeholderTextColor}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <View style={[styles.buttonWrapper, orientation === 'landscape' && styles.row]}>
          <View
            style={[
              styles.buttonContainer,
              {
                width: orientation === 'landscape' ? screenWidth / 2.2 : '100%',
                marginHorizontal: orientation === 'landscape' ? 10 : 0,
              },
            ]}
          >
            <Button
              title="Button 1"
              onPress={() => alert('Khum cóa gì đou :>')}
              color={darkMode ? '#FFFF00' : '#0000FF'}
            />
          </View>

          <View
            style={[
              styles.buttonContainer,
              {
                width: orientation === 'landscape' ? screenWidth / 2.2 : '100%',
                marginHorizontal: orientation === 'landscape' ? 10 : 0,
              },
            ]}
          >
            <Button
              title="Button 2"
              onPress={() => alert('Cũm hong cóa gì :>')}
              color={darkMode ? '#FFFF00' : '#0000FF'}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
const getStyles = (darkMode: boolean, orientation: 'portrait' | 'landscape', screenWidth: number) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: Platform.select({
        ios: 20,
        android: 10,
      }),
      backgroundColor: darkMode ? '#000000' : '#FFFFFF',
    },
    buttonWrapper: {
      flexDirection: 'column',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      marginVertical: Platform.select({
        ios: 8,
        android: 5,
      }),
    },
    image: {
      marginBottom: 20,
    },
    input: {
      height: 40,
      borderColor: darkMode ? '#666666' : '#CCCCCC',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
      width: '80%',
      padding: Platform.select({
        ios: 12,
        android: 8,
      }),
      backgroundColor: darkMode ? '#333' : '#fff',
      color: darkMode ? '#fff' : '#000',
      placeholderTextColor: darkMode ? '#888' : '#888',
    },
    button: {
      color: darkMode ? '#000000' : '#FFFFFF',
    },
    themeButton: {
      position: 'absolute',
      top: 60,
      left: 15,
      backgroundColor: darkMode ? '#000000' : '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      height: 40,
      borderRadius: 20,
    },
    themeButtonText: {
      color: darkMode ? '#FFFFFF' : '#000000',
      fontSize: 16,
    },
  });
};
export default App;
