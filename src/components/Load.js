import React from "react";
import { ActivityIndicator } from "react-native";

export function Load(){
    return(
        <ActivityIndicator
            color={"#005AA5"}
            size={"large"}
            style={{flex: 1}}
        />
    )
}