/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Modal = require('react-native-modal');
var {
  MapView,
  TextInput,
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var regionText = {
  latitude: '0',
  longitude: '0',
  latitudeDelta: '0',
  longitudeDelta: '0',
};

var markers = [
{
  latitude: 37.7749300,
  longitude: -122.4194200,
  title: 'San Francisco',
  subtitle: 'Best Place on Earth',
}
];

var GlyphMap = React.createClass({
  getInitialState: function() {
    return {
      loading: true,
      name: '',
      address: '',
      markers: [],
      userAnnotation: {
        title: 'New Glyph',
      },   
      region: {
        latitude: 37.7749300,
        longitude: -122.4194200,
      },
      isModalOpen: false,
    }
  },

  render: function() {
    return (
      <View>
        <MapView
          style={styles.map} 
          showsUserLocation={true}
          region={this.state.region} 
          annotations={this.state.markers.concat(this.state.userAnnotation)}
          maxDelta={.15}
          onRegionChange={this.handleRegionChange}
          onRegionChangeComplete={this.handleRegionChangeComplete}
          onAnnotationPress={this.handleAnnotationPress}
        />
        <Modal
          isVisible={this.state.isModalOpen}
          onClose={this.state.closeModal}
        >
          <text> Hello world! </text>
        </Modal>
      </View>
    );
  },

  handleRegionChange: function(region) {
    this.setState({
      userAnnotation: {
        title: this.state.userAnnotation.title,
        latitude: region.latitude,
        longitude: region.longitude,
      }
    });
  },

  handleRegionChangeComplete: function(region) {
    console.log(region);
  },

  handleAnnotationPress: function(annotation) {
    if (annotation.id === this.state.userAnnotation.id) {
      this.openModal(); 
    }
  },

  openModal: function() {
    this.setState({
      openModal: true,
    });
  },

  closeModal: function() {
    this.setState({
      openModal: false,
    });
  },
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