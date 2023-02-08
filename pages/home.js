import React, {Component} from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput,StyleSheet, ActivityIndicator,Alert} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        pass: '',
        isloading: false,
      };
      }

      login = () => {
        if (this.state.name == '' || this.state.pass == ''){          //mencegah input kosong di teks input
          Alert.alert('Email/password kosong');
        } else {
          this.setState({isloading: true});                           //memuat loading saat user mengakses url
        let model = DeviceInfo.getModel();                            //mengakses model smartphone
        let brand = DeviceInfo.getBrand();                            //mengakses brand smartphone
        let version = DeviceInfo.getVersion();                        //mengakses versi apps
        let os = DeviceInfo.getSystemName();                          //mengakses sistem operasi smartphone
        DeviceInfo.getUniqueId().then((uniqueId) => {                 //mengakses kode unik smartphone
        const formData = new FormData();                              //membuat form data yang akan di POST
        formData.append('username', this.state.name);
        formData.append('password', this.state.pass);
        formData.append('firebase_token', '78342rhksfjdfsdfsdfds');
        formData.append('brand', brand);
        formData.append('model', model);
        formData.append('serial_number', uniqueId);
        formData.append('platform', os);
        formData.append('version', version);
        fetch('https://app-demo.digimasia.com/api/public/index.php/login',{                          //memuat URL API yang digunakan
      method : 'POST',                                                                               //memuat metode API yang digunakan
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'multipart/form-data',
      },
      body : formData
    }).then((response)=> response.json())
    .then((responsejson)=>{
      if (responsejson.status=='200'){
        AsyncStorage.setItem('user',JSON.stringify({
          token:responsejson.data.user.token
        })); 
        this.setState({isloading:false});
        Alert.alert('Login Berhasil','Selamat Bergabung' + ' ' + responsejson.data.firstname + '!');
        this.props.navigation.navigate('Login');
      } else {
        this.setState({isloading:false});
        Alert.alert('Login Gagal','Username/password salah');
      }
    }).catch((error)=>{
      Alert.alert(error);
    }); 
  });
      }
    }

    render() {
                    if (this.state.isloading){
                        return (
                          <View style={styles.page}>
                            <ActivityIndicator size={'large'}/>
                          <Text style={styles.loading}>Loading...</Text>
                          </View>
                        )
                      } else {
                    return (
                        <SafeAreaView>
                    <View style={styles.page}>
                        <TextInput
                        placeholder='Email'
                        inputMode='email'
                        placeholderTextColor={'#000'}
                        onChangeText = {TextInputValue => this.setState({name : TextInputValue})}
                        style={styles.inputText}/>
                        <TextInput
                        placeholder='Password'
                        secureTextEntry={true}
                        placeholderTextColor={'#000'}
                        onChangeText = {TextInputValue => this.setState({pass : TextInputValue})}
                        style={styles.inputText}/>
                        <TouchableOpacity 
                        onPress={()=> this.login()} 
                        style={styles.btnLogin}>
                          <Text style={{color:'#fff'}}>Login</Text>
                          </TouchableOpacity>
                    </View>
                        </SafeAreaView>
                        );
                    }
                }
            }

const styles = StyleSheet.create({
  page : {
    alignItems:'center', 
    height:'100%',
    justifyContent:'center', 
    width:'100%',
    padding:'2%'
  },
  loading : {
    textAlign: 'center', 
    fontSize : 20, 
    fontWeight:'bold', 
    color:'#000'
  },
  inputText : {
    borderWidth:2, 
    color:'#000', 
    width:'100%', 
    marginBottom:'5%', 
    textAlign:'center', 
    borderRadius:20,
    fontSize:15
  },
  btnLogin : {
    backgroundColor:'#000', 
    width:'100%',
    borderRadius:20,
    height:60,
    justifyContent:"center", 
    alignItems:'center'
  }
});

export default Home;