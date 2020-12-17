import React,{Component} from 'react';
import {View,Text,TextInput, Alert,StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MyHeader from '../components/MyHeader'
import firebase from 'firebase';
import db from '../config'

export default class SettingsScreen extends Component{
    constructor(){
        super();
        this.state={
           firstName: '',
           lastName: '',
           contact: '',
           address: '',
           docId: '',
           emailId: ''
        }
    }
    componentDidMount(){
        this.getUserDetails();
    }
    getUserDetails=()=>{
        var user= firebase.auth().currentUser;
        var email = user.email
        db.collection("users").where("email_Id","==",email).get()
        .then((snapshot)=>{
          snapshot.forEach(doc=>{
              var data = doc.data();
              this.setState({
                 emailId: email_Id ,
                 firstName: first_name,
                 lastName: last_name,
                 contact: contact,
                 address: address,
                 docId: doc.id
              })
          })
        })
    }
    updateUserDetails=()=>{
       db.collection('users').doc(this.state.docId).update({
         "first_name": this.state.firstName,
         "last_name": this.state.lastName,
         "address": this.state.address,
         "contact": this.state.contact  
       })
       Alert.alert('Profile Updated Successfully!') 
    }
    render(){
        return(
            <View style={StyleSheet.container}>
             <MyHeader title="setting" navigation={this.props.navigation}/>
              <View style={styles.formContainer}>
                  <TextInput
                   style={styles.formTextInput}
                   placeholder={"First Name"}
                   maxLength={8}
                   onChangeText={(text)=>{
                     this.setState({
                       firstName: text    
                     })
                   }}
                   value={this.state.firstName}
                  
                  />
                  <TextInput
                   style={styles.formTextInput}
                   placeholder={"Last Name"}
                   maxLength={12}
                   onChangeText={(text)=>{
                    this.setState({
                        lastName: text
                    })
                   }}
                  value={this.state.lastName}
                  />
             
                  <TextInput
                   style={styles.formTextInput}
                   placeholder={"Contact"}
                   maxLength={10}
                   keyboardType={"numeric"}
                   onChangeText={(text)=>{
                       this.setState({
                          contact: text 
                       })
                   }}
                   value={this.state.contact}
                  />
                  <TextInput
                   style={styles.formTextInput}
                   placeholder={"Address"}
                   multiline={true}
                   onChangeText={(text)=>{
                    this.setState({
                      address: text
                    })
                   }}
                   value={this.state.address}
                  />
                  <TouchableOpacity style={styles.button} onPress={()=>{this.updateUserDetails}}>
                      <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
              </View>
            </View>
        )
    }
}