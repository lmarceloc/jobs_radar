import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import { connect, disconnect, subscribeToNewsComps } from '../services/socket';

function Main({ navigation }) {
 const [comps, setComps] = useState([]);
 const [currentRegion, setCurrentRegion] = useState(null);
 const [skills, setSkills] = useState('');

 useEffect(() => {
  async function loadInitialPosition() {
  const { granted } = await requestPermissionsAsync();

  if (granted) {
  const { coords } = await getCurrentPositionAsync({
   enableHighAccuracy: true
    });

    const { latitude, longitude } = coords;
    setCurrentRegion({
    latitude,
    longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,

    });
   }
  }
  loadInitialPosition();

 }, []);

useEffect(() => {
  subscribeToNewsComps(comp => setComps([...comps, comp]));
}, [comps]);

 function setupWebsocket() {
   disconnect();

  const { latitude, longitude } = currentRegion;

  connect(
   latitude,
   longitude,
   skills,
  );
 }
async function LoadComps() {
 const { latitude, longitude } = currentRegion;

 const response = await api.get('/search', {
  params: {
   latitude,
   longitude,
   skills
    }
 });

setComps(response.data);
setupWebsocket();
}

function handleRegionChanged(region) {
  setCurrentRegion(region);
}

if(!currentRegion){
 return null;
}

 return (
 <>
 <MapView
 onRegionChangeComplete={handleRegionChanged}
 initialRegion={currentRegion}
 style={styles.map}
 >

  {comps.map(comp => (
    <Marker key={comp._id} coordinate={{ longitude: comp.location.coordinates[0] , latitude: comp.location.coordinates[1], }}>
   
    <Image style={styles.avatar} source={{uri: comp.avatar_url}} />
     
     <Callout onPress={() => {
      navigation.navigate('Profile', { github_username: comp.github_username });
     }}>
      <View style={styles.callout}> 
      <Text style={styles.compName}> {comp.name} </Text>
      <Text style={styles.compBio}>  {comp.bio}  </Text>
    <Text style={styles.compSkills}> {comp.skills.join(', ')} </Text>
      </View>
     </Callout>  
  </Marker>  
))}

 </MapView>
<View style={styles.searchForm}>
 <TextInput
 style={styles.searchInput}
 placeholder="Buscar por Profissionais..."
 placeholderTextColor="#999"
 autoCapitalize="words"
 autoCorrect={false}
 value={skills}
 onChangeText={setSkills}
/>

 <TouchableOpacity onPress={LoadComps} style={styles.loadButton}>
   <MaterialIcons name="my-location" size={20} color='#FFF' />
  </TouchableOpacity>
 </View>
</>
 );
}

const styles = StyleSheet.create({
 map: {
   flex: 1
 },

 avatar: {
   flex: 1,
   width: 54,
   height: 54,
   borderRadius: 4,
   borderWidth: 4,
   borderColor: '#fff'
 },

 callout: {
  width: 260,
},

 compName: {
   fontWeight: 'bold',
   fontSize: 16
 },

 compBio: {
  color: '#666',
  marginTop: 5
},

compSkills: {
 marginTop: 5
},

searchForm: {
 position: 'absolute',
 top: 10,
 left: 10,
 right: 10,
 zIndex: 5,
 flexDirection: 'row'
},

searchInput: {
  flex: 1,
  height: 50,
  backgroundColor: '#FFF',
  color: '#333',
  borderRadius: 25,
  paddingHorizontal: 20,
  fontSize: 12,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: {
      width: 4,
      height: 4,
  },
  elevation:2,        
},

  loadButton: {
   width: 50,
   height: 50,
   backgroundColor: '#8e4dff',
   borderRadius: 25,
   justifyContent: 'center',
   alignItems: 'center',
   marginLeft: 15,
  },

})

export default Main;