import React, {Component} from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Image,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Detail extends Component {
    constructor(props) {
      super(props);
      this.state = {
        link: '',
        isloading: true,
      };
      }

      async componentDidMount() {
      
      }

    render() {
                    // if (this.state.isloading){
                    //     return (
                    //       <View style={{paddingTop: 200}}>
                    //       <Text style={{textAlign: 'center', fontSize : 20, fontWeight:'bold', color:'#000' }}>Loading...</Text>
                    //       </View>
                    //     )
                    //   } else {
                    return (
                        <ScrollView>
                    <View>
                        <Text>Test Digima</Text>
                    </View>
                        </ScrollView>
                        );
                    // }
                }
            }

            const styles = StyleSheet.create({
              row : {
                flexDirection:'row',
              },
            });

export default Detail;