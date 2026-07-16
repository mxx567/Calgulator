import {Text, StyleSheet, Pressable} from "react-native"


interface CircButtonProps{
    text?: string,
    buttonSize?: number,
    textSize?: number,
    color?: string,
    onPress() : void,
};

const CircButton = ({text,buttonSize = 100, textSize = 64, onPress, color} : CircButtonProps) =>{
    const CircStyle = StyleSheet.create({
        button :{
            width: buttonSize,
            height: buttonSize,
            backgroundColor: color? color : 'grey',
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