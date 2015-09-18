/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  MapView,
  TextInput,
  AppRegistry,
  StyleSheet,
  Text,
  View
} = React;

var regionText = {
  latitude: '0',
  longitude: '0',
  latitudeDelta: '0',
  longitudeDelta: '0',
};

var MapRegionInput = React.createClass({
  region: React.PropTypes.shape({
      latitude: React.PropTypes.number.isRequired,
      longitude: React.PropTypes.number.isRequired,
      latitudeDelta: React.PropTypes.number.isRequired,
      longitudeDelta: React.PropTypes.number.isRequired,
  }),

  getInitialState: function() {
    return {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      region: nextProps.region || this.getInitialState().region
    });
  },

  render: function() {
    return (
      <View>
        <Text>
          {'Region Info: '}
          {this.state.region}
        </Text>
      </View>
    );
  },
});

var GlyphMap = React.createClass({
  render: function() {
    return (
      <View>
        <MapView style={styles.map} showsUserLocation={true}>
        </MapView>
        <MapRegionInput style={styles.regionInfo}>
        </MapRegionInput>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  map: {
    height: 400,
    margin: 10,
    top: 20,
    borderWidth: 1,
    borderColor: '#000000',
  },
  regionInfo: {
    top: 500,
  },
});

AppRegistry.registerComponent('glyphMobile', () => GlyphMap);
