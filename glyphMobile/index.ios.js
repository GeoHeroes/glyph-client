'use strict';

var React = require('react-native');
// var fetch = require('fetch');

var {
  MapView,
  Modal,
  StyleSheet,
  SwitchIOS,
  Text,
  TouchableHighlight,
  View,
  AppRegistry,
  TextInput,
} = React;

exports.displayName = (undefined: ?string);
exports.framework = 'React';
exports.title = '<Modal>';
exports.description = 'Component for presenting modal views.';

var Button = React.createClass({
  getInitialState() {
    return {
      active: false,
    };
  },

  _onHighlight() {
    this.setState({active: true});
  },

  _onUnhighlight() {
    this.setState({active: false});
  },

  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor="#a9d9d4">
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
});

var GlyphMobile = React.createClass({
  getInitialState() {
    return {
      animated: true,
      modalVisible: false,
      transparent: false,
      loading: true,
      name: '',
      address: '',
      test: "boo",
      markers: [],
      userAnnotation: {
        title: 'New Glyph',
      },   
      region: {
        latitude: 37.7749300,
        longitude: -122.4194200,
      },
    };
  },

  componentDidMount: function() {
    console.log("Mounted bitch");
    var that = this;
    fetch('http://ec2-52-11-76-55.us-west-2.compute.amazonaws.com/api/findglyphsradius', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: 25,
        longitude: 25,
        radius: 1,
      }),
    })
    .then(function(response) {
      console.log(response);
      this.setState({test: response.responseText});
    })
    .catch(function(error) {
      if (error) {
        console.log(error);
      }
    }).done();
    // fetch('ec2-52-11-76-55.us-west-2.compute.amazonaws.com/api/findglyphsradius')
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //     console.log(responseData);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   })
    //   .done();
    // var request = new XMLHttpRequest();
    // request.open('POST', encodeURI('ec2-52-11-76-55.us-west-2.compute.amazonaws.com/api/findglyphsradius'));
    // request.setRequestHeader("Content-Type","application/json");
    // request.setRequestHeader("Accept","application/json");
    // request.onreadystatechange = (e) => {
    //   console.log(e);
    //   if (request.readyState !== 4) {
    //     return;
    //   }

    //   if (request.status === 200) {
    //     console.log('success', request.responseText);
    //   } else {
    //     console.log(request.responseText);
    //   }
    // };

    // request.send(JSON.stringify({
    //     latitude: 25,
    //     longitude: 25,
    //     radius: 1,
    //   }));
  },

  _setModalVisible: function(visible) {
    this.setState({modalVisible: visible});
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

  getGylphsRadius: function(longitude, latitude, radius) {
    console.log("Fetching...");
    // fetch('ec2-52-11-76-55.us-west-2.compute.amazonaws.com/api/findglyphsradius', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     latitude: longitude,
    //     longitude: latitude,
    //     radius: radius,
    //   }),
    // })
    // .then(function(response) {
    //   console.log(response);
    // })
    // .catch(function(error) {
    //   console.log(error);
    // });
  },

  render() {
    return (
      <View>
         <MapView
          style={styles.map} 
          showsUserLocation={true}
          region={this.state.region} 
          annotations={this.state.markers.concat(this.state.userAnnotation)}
          maxDelta={.15}
          onRegionChange={this.handleRegionChange}
          onAnnotationPress={this._setModalVisible.bind(this, true)}
        >
        </MapView>
         <Text>{this.state.test}</Text>
        <Modal
          animated={this.state.animated}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}>
          <View style={[styles.container]}>
            <View style={[styles.innerContainer]}>
              <Text>This modal was presented {this.state.animated ? 'with' : 'without'} animation.</Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
              />
              <Button
                onPress={this._setModalVisible.bind(this, false)}
                style={styles.modalButton}>
                Close
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  },
});

exports.examples = [
  {
    title: 'Glyph Mobile',
    description: 'Glyph Map with Modal',
    render: () => <GlyphMobile />,
  },
];

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
  map: {
    height: 200,
    margin: 10,
    top: 20,
    borderWidth: 1,
    borderColor: '#000000',
  },
});


AppRegistry.registerComponent('glyphMobile', () => GlyphMobile);