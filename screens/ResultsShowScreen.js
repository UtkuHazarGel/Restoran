import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import yelp from '../api/yelp'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



export default function ResultsShowScreen({ route }) {

    const [result, setResult] = useState(null)
    const id = route.params.id;
    const getResult = async (id) => {
        const response = await yelp.get(`/${id}`)
        setResult(response.data)
    }
    useEffect(() => {
        getResult(id)
    }, [])
    if (!result) {
        return null
    }
    return (
        <View>
            <Text style={styles.name}>{result.name}</Text>
            <Text style={styles.phone}>{result.phone}</Text>
         <View style={styles.icon}>
         {result.is_closed ?
                (<AntDesign name="closecircleo" size={30} color="black" />) :
                (<MaterialIcons name="delivery-dining" size={30} color="black" />)}

         </View>

            <FlatList data={result.photos}
                renderItem={({ item }) => {
                    return (
                        <Image style={styles.image} source={{ uri: item }} />
                    )
                }} />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 180,
        margin: 10,
        borderRadius: 20
    },
    phone: {
        fontSize: 15,
        alignSelf: 'center',
    },
    name: {
        alignSelf: 'center',
        fontSize: 19,
        marginVertical: 10,
    },
    icon:{
        alignSelf:'center'
    }
})