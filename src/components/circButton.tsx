import React from "react"
import {Text, StyleSheet, Pressable} from "react-native"


interface CircButtonProps{
    text?: string,
    buttonSize?: number,
    textSize?: number,
    onPress() : void,
};

const CircButton = ({text,buttonSize = 100, textSize = 64, onPress} : CircButtonProps) =>{
    const CircStyle = StyleSheet.create({
        button :{
            width: buttonSize,
            height: buttonSize,
            backgroundColor: 'grey',
            borderRadius: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        text :{
            fontSize: textSize,
            color: 'white'
        }
    });

    
    return(
        <Pressable style = {CircStyle.button} onPress={onPress}>
            <Text style = {CircStyle.text}>{text}</Text>
        </Pressable>
    );
};

export {CircButton};