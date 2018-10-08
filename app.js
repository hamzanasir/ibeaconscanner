const BeaconScanner = require('node-beacon-scanner');
const scanner = new BeaconScanner(); // Set an Event handler for beacons
scanner.onadvertisement = (ad) => {
  console.log(JSON.stringify(ad, null, ' '));
  console.log(getDistance(ad));
};
// Start scanning 
scanner.startScan().then(() => {
  console.log('Started to scan.') ;
}).catch((error) => {
  console.error(error);
});
function getDistance(beacon) {
    if (beacon.rssi === 0) {
      return -1.0;
    }
    var ratio = beacon.rssi * 1.0 / beacon.iBeacon.txPower;
    if (ratio < 1.0) {
        return Math.pow(ratio, 10);
    }
    else {
        var accuracy = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
        return accuracy;
    }
}