import React, {Component} from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Image,StyleSheet, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable } from 'react-native-paper';

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        tokenUser: '',
        isLoading: true,
        dataSources: null,
      };
      }

      async componentDidMount() {
        try {
          const value = await AsyncStorage.getItem('user');
          if (value !== null) {
            let datajson = JSON.parse(value);
            this.state.tokenUser         = datajson.token;
          } 
          } catch (error) { 
            console.log(error);
          } 
          fetch ('https://app-demo.digimasia.com/api/public/index.php/journey',{              //memuat metode API yang digunakan
          method : 'GET',                                                            
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/x-www-form-urlencoded',
        'TOKEN' : this.state.tokenUser
      },
          }).then((response)=> response.json())
          .then((responseJson)=>{
             this.setState({
               isLoading : false,
               dataSources : responseJson.data.journeys,
             })
             console.log('data',this.state.dataSources);
          }).catch((error)=>{
           console.log(error);
          });
      }

    render() {
      if (this.state.isLoading){
                        return (
                          <View style={styles.loading}>
                            <ActivityIndicator size={'large'} />
                          <Text style={{textAlign: 'center', fontSize : 20, fontWeight:'bold', color:'#000' }}>Loading...</Text>
                          </View>
                        )
                      } else {
                        let datasubtopik = this.state.dataSources.map((val,key)=>{
                          return <View key={key}>
                                      <Image source={{uri : val.thumbnail}} style={styles.image}/>
                                    <DataTable>
                                    <DataTable.Row>
                                        <DataTable.Cell>ID</DataTable.Cell>
                                        <DataTable.Cell>: {val.id}</DataTable.Cell>
                                      </DataTable.Row>
                                      <DataTable.Row>
                                        <DataTable.Cell>Nama</DataTable.Cell>
                                        <DataTable.Cell>: {val.name}</DataTable.Cell>
                                      </DataTable.Row>
                                      <DataTable.Row>
                                        <DataTable.Cell>Deskripsi</DataTable.Cell>
                                        <DataTable.Cell>: {val.description}</DataTable.Cell>
                                      </DataTable.Row>
                                      <DataTable.Row>
                                        <DataTable.Cell>Poin</DataTable.Cell>
                                        <DataTable.Cell>: {parseInt(val.point)}</DataTable.Cell>
                                      </DataTable.Row>
                                      <DataTable.Row>
                                        <DataTable.Cell>Tanggal Terakhir</DataTable.Cell>
                                        <DataTable.Cell>: {val.end_date}</DataTable.Cell>
                                      </DataTable.Row>
                                      <DataTable.Row>
                                        <DataTable.Cell>Leaderboard</DataTable.Cell>
                                        <DataTable.Cell>: {parseInt(val.is_leaderboard)}</DataTable.Cell>
                                      </DataTable.Row>
                                      <DataTable.Row>
                                        <DataTable.Cell>Reward</DataTable.Cell>
                                        <DataTable.Cell>: {parseInt(val.is_leaderboard)}</DataTable.Cell>
                                      </DataTable.Row>
                                    </DataTable>
                              </View>
                        });
                    return (
                        <SafeAreaView>
                    <View style={styles.page}>
                    {datasubtopik}
                    </View>
                        </SafeAreaView>
                        );
                    }
                }
            }

            const styles = StyleSheet.create({
              row : {
                flexDirection:'row',
                // justifyContent:'space-around'
              },
              loading : {
                alignItems:'center', 
                height:'100%',
                justifyContent:'center', 
                width:'100%'
              },
              page : {
                height:'100%',
                width:'100%'
              },
              font : {
                fontSize : 20,
                color:'#000'
              },
              image : {
                width:'100%', 
                height:'50%',
                resizeMode:'cover',
                backgroundColor:'#000'
              },
            });

export default Login;