import React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");
function Visitors({ user }) {
    return (
        <View style={styles.container}>
            <View style={[styles.bottomView, { backgroundColor: user.status == 'active' ? '#62C78A' : '#CAA852' }]}>
                <View style={styles.topView}>

                    <View style={[styles.checkedouttop, { backgroundColor: user.status == 'active' ? '#62C78A' : '#CAA852' }]}>
                        <Text style={styles.checkouttext}>{user.status}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                        <View style={styles.header}>
                            <Text style={{ color: "#fff" }}>{user.visitorName.charAt(0)}</Text>
                        </View>

                        <View style={{ marginLeft: 10, alignItems: 'center' }}>
                            <Text style={{ fontSize: 15, fontWeight: '700' }}>{user.visitorName}</Text>
                            <Text style={{ color: '#DD4747', fontWeight: '700' }}>Visitor</Text>
                        </View>
                    </View>

                    {/* user details */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                        <View>
                            <Text style={{ paddingBottom: 5 }}>{user.phone}</Text>
                            <Text>Unit 5 of 10</Text>
                        </View>
                        <View style={{ borderLeftWidth: 2, borderColor: '#BAB4B4' }}></View>

                        <View>
                            <Text style={{ paddingBottom: 5 }}>{user.gender}</Text>
                            <Text style={{ paddingBottom: 5 }}>{user.passCode}</Text>
                        </View>
                    </View>
                    {
                        user.status == 'active' ? null : <Text style={{ paddingLeft: 15, paddingTop: 30, color: '#908D8D' }}> let her go am safe and sound</Text>
                    }

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#F0F6F6',
        marginBottom: 10,
        marginTop: 10,
    },

    bottomView: {
        width: width * 0.9,
        borderRadius: 7,
    },
    topView: {
        backgroundColor: '#FDFAFA',
        width: width * 0.9,
        marginLeft: 6,
        borderRadius: 7,
        paddingBottom: 10
    },
    checkedouttop: {
        position: 'absolute',
        // left:205,
        right: 0,
        borderTopRightRadius: 7,
        borderBottomLeftRadius: 7,
    },
    header: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#000066',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkouttext: {
        fontSize: 12,
        padding: 4,
        color: '#fff'
    }

});

export default Visitors
