import React, { useState, useEffect, useRef, useContext } from 'react'
import { Share, View, Text, SafeAreaView, StyleSheet, Image, ToastAndriod, ActivityIndicator, Animated, Modal, TouchableOpacity, Clipboard} from 'react-native'


import Input from '../../Utils/Input'
import Button from '../../Utils/Button'
import { Picker } from '@react-native-picker/picker'
import { ScrollView } from 'react-native-gesture-handler'
import logo from '../../assets/img/check.png'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../../Context/AuthContext'

const SuccessModal = ({ visible, children }) => {
    const [showModal, setShowModal] = useState(visible)

    const scaleValue = useRef(new Animated.Value(0)).current;

    const toggleModal = () => {
        if (visible) {
            setShowModal(true)
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start()

        } else {
            setShowModal(false)
        }
    }
    useEffect(() => {
        toggleModal()
    }, [visible])

    return <Modal transparent visible={showModal}>
        <View style={styles.modalBackground}>
            <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
                {children}
            </Animated.View>
        </View>
    </Modal>
}

const AddVisitor = ({ navigation }) => {
    const [visible, setVisible] = useState(false)
    const [visitorcode, setVisitorCode] = useState('')
    const { totalVisitors, setTotalVisitors } = useContext(AuthContext)

    // SHARE CODE FUNCTION
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `${visitorcode}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            alert(error.message);
        }
        setVisible(false)
    }

    // COPY FUNCTION
    const copyToClipboard = () => {
        Clipboard.setString(`${visitorcode}`)
        setVisible(false)
    }

    // GETTING FORM INPUTS
    const [visitorName, setName] = useState('godwin');
    const [phone, setPhone] = useState('08034595872');
    const [housenumber, setHousenumber] = useState('45');
    const [email, setEmail] = useState('godwin@gmail.com');
    const [message, setMessage] = useState('')
    const [gender, setGender] = useState("Male");
    const [visitType, setVisitType] = useState("continous");
    const [loading, setLoading] = useState(false);


    const registerVisitor = async () => {
        setLoading(true)
        if (visitorName == '' || phone == '' || housenumber == '' || email == '') {
            setMessage('all fields are required')
            setLoading(false)
        }
        try {
            const vistorsdata = { visitorName, housenumber, phone, email, gender,visitType }
            const url = "http://192.168.8.100:3001/tenant/create_visitor";
            const token = await AsyncStorage.getItem('fastpass');
            const registerVdata = await axios.post(url, vistorsdata, {headers: {authorization: `Bearer ${token}`}, "content-type": "application/json",})
            if (registerVdata.data.visitor) {
                setName('')
                setPhone('')
                setHousenumber('')
                setEmail('')
                setMessage('')
                setTotalVisitors(totalVisitors, registerVdata.data)
                setVisitorCode(registerVdata.data.visitor.passCode)
                setVisible(true)
                setLoading(false);
                console.log(registerVdata.data)
            }

        } catch (error) {
            console.log(error)
        }

    }
    return (
        <SafeAreaView style={styles.container}>
            <SuccessModal visible={visible}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={logo} style={{ width: 150, height: 150, marginVertical: 10 }} />
                    <Text style={{ color: '#F84C4C', fontSize: 25 }}>Added Successful</Text>
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>Visitor Code</Text>
                    <Text>{visitorcode}</Text>

                    <TouchableOpacity style={styles.copy} onPress={() => copyToClipboard()}>
                        <MaterialCommunityIcons name="share-variant" size={20} color="#fff" />
                        <Text style={{ alignSelf: 'center', color: '#fff', fontSize: 15 }}>Copy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.share} onPress={onShare}>
                        <MaterialCommunityIcons name="content-copy" size={20} color="#fff" />
                        <Text style={{ alignSelf: 'center', color: '#fff', fontSize: 15 }}>Share</Text>
                    </TouchableOpacity>
                </View>
            </SuccessModal>

        
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
            >
                <View style={{ marginTop: 30 }}>
                    <Text style={{ fontSize: 35, fontWeight: 'bold', alignSelf: 'center', paddingBottom: 10 }}>Create Visitor</Text>
                    <Text style={styles.messageText}>{message}</Text>
                    <Input text="Visitor Name"
                        onChangeText={(text) => setName(text)}
                        defaultValue={visitorName} />

                    <Input text="House Number" onChangeText={(text) => setHousenumber(text)} defaultValue={housenumber} />
                    <Input text="Phone Number" onChangeText={(text) => setPhone(text)} defaultValue={phone} />
                    <Input text="Email" onChangeText={(text) => setEmail(text)} defaultValue={email} />
                    <View style={styles.pickerContainer}>
                    <Picker
                            style={{ color: '#E0E0E0 ', placeholderTextColor: 'red' }}
                            selectedValue={visitType}
                            onValueChange={(itemValue) => setVisitType(itemValue)
                            }>
                            <Picker.Item label="continous" value="continous" />
                            <Picker.Item label="one-off" value="one-off" />
                    </Picker>
                    </View>
                    <View style={styles.pickerContainer}>

                   
                    <Picker
                            style={{ color: '#E0E0E0 ', placeholderTextColor: 'red' }}
                            selectedValue={gender}
                            onValueChange={(itemValue) => setGender(itemValue)
                            }>
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                    </Picker>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Button
                            text={loading ? <ActivityIndicator
                                color='#fff'
                                size="large"
                            /> : 'Create'}
                            bgcolor="#000066"
                            onPress={() => registerVisitor()}
                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#F0F6F6',
        alignItems: 'center',
    },
    pickerContainer: {
        borderRadius: 4,
        marginBottom: 20,
        backgroundColor: '#FCFBFB',
        height: 60,
        justifyContent: 'center'

    },

    messageText: {
        color: 'red',
        fontSize: 20,
        alignSelf: 'center',
        paddingBottom: 10
    },
    copy: {
        fontSize: 25, width: 150,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#19A2EF',
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },
    share: {
        fontSize: 25, width: 150,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#57906B',
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        width: '80%',
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 20
    },
    conformButton: {
        backgroundColor: '#33A854',
        width: 100,
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    }
});

export default AddVisitor
