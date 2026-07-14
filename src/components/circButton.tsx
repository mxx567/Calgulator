import React from "react"
import {Text, StyleSheet, Pressable} from "react-native"


interface CircButtonProps{
    text?: string,
    onPress() : void,
};

const CircStyle = StyleSheet.create({
    button :{
        width: 100,
        height: 100,
        backgroundColor: 'grey',
        borderRadius: '100%',
        alignItems: 'center',
    },
    text :{
        fontSize: 64,
        color: 'white'
    }
});



const CircButton = ({text, onPress} : CircButtonProps) =>{
    
    return(
        <Pressable style = {CircStyle.button} onPress={onPress}>
            <Text style = {CircStyle.text}>{text}</Text>
        </Pressable>
    );
};

export default CircButton;