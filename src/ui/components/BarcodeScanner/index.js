import { CameraView } from 'expo-camera';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LastScanResultView from './LastScanResultView';
import BarcodeBoundingBoxView from './BarcodeBoundingBoxView';

/**
 * A barcode scanner
 * @param {Object} param
 * @param {Number} param.timeout  The timeout threadshold in millisecond specifies how long to wait for
 *                                in a no barcode detected state before the bounding box disappears.
 *                                Default is 500ms
 * @param {Function} param.onBarcodeScanned The callback when barcode is detected. The scan result is passed to the callback.
 * The scan result has the followign format:
 *  {
 *    bounds:
 *    {
 *      origin: {x, y},
 *      size": {height, width}
 *    },
 *    cornerPoints: [{x, y}], // four of them
 *    data: "", // The payload interpreted from the barcode
 *    type: "", // Type of barcode detected
 *  }
 * @note Please note that camera permission must be granted before using Barcode scanner. You can use the utility useCameraPermissions
 * @returns React component
 */
export function BarcodeScanner({timeout = 1000, onBarcodeScanned}) {
  const [barcodeResult, setBarcodeResult] = useState(null);
  const timeoutIdRef = useRef(null);

  function onBarcodeScannedInternal(result) {
    onBarcodeScanned?.(result)

    if(timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    setBarcodeResult(result);

    // Time out the result if we haven't gotten a new one after a threshold of milliseconds
    timeoutIdRef.current = setTimeout(() => {
      setBarcodeResult(null);
    }, timeout);
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={onBarcodeScannedInternal}
      />
      <View style={styles.boundingBoxContainer}>
        <LastScanResultView data={barcodeResult?.data} style={styles.lastScanResult} />
        <BarcodeBoundingBoxView data={barcodeResult} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  boundingBoxContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: "100%",
    height: "100%"
  },
  lastScanResult: {
    alignSelf: 'center',
  }
});

export { useCameraPermissions } from 'expo-camera';