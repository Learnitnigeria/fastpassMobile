import {Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback} from 'react-native'

import React from 'react'

function KeyboardAvoidView({children}) {
    return (
        <KeyboardAvoidingView>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default KeyboardAvoidView
