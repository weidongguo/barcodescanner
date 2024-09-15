# Barcode scanner
This is a barcode scanner exercise. It uses expo-camera, which in turns uses it zxing c++ internally for the barcode scanning part.

All the supported barcode [format](https://docs.expo.dev/versions/latest/sdk/bar-code-scanner/#supported-formats) is documented on expo-camera's website.

For a demo video, please check this out: https://www.youtube.com/watch?v=938Yy287Xsk

## Build 
To build the app, you can run
```
npm install
```

### iOS
```
npx pod-install
```

## Run 
### iOS
To run the app, you can use
```
npx react-native run-ios
```

### Android
To run the app, you can use
```
npx react-native run-android
```

## High Level structure 
The BarcodeScanner is a thin wrappper over the expo-camera. It's located at `src/ui/components/BarcodeScanner`
It's currently being linked as local npm package and used at the application layer  `src/ui/screens/HomeScreen.js`

## Devices tested
* iPhone XR (Physical device)
* Nexus 6 (Android Simulator)