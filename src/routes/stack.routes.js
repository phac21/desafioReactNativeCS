import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Investimentos from '../screens/Investimentos';
import ResgateInvestimentos from '../screens/ResgateInvestimentos';

const {Navigator, Screen} = createNativeStackNavigator();

export function StackRoutes(){
    return(
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name="Investimentos"
                component={Investimentos}
            />
            <Screen
                name="ResgateInvestimentos"
                component={ResgateInvestimentos}
            />
        </Navigator>
    )
}