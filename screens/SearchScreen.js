import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

 


export default function SearchScreen() {
  const [term, setTerm] = useState('')
  const [searchApi, results, errorMessage] = useResults();
  const filterResultByPrice = (price => {
    return results.filter((result) => {
      return result.price === price
    })
  })
  return (

    <View>
      <SearchBar term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)} />
      {errorMessage ? <Text>{errorMessage} </Text> : <>{results.length == 0 ? (
        <></>
      ) : (
        <>
          <ResultsList title='Ucuz Restoranlar' results={filterResultByPrice('₺')} />
          <ResultsList title='Uygun Restoranlar' results={filterResultByPrice('₺₺')} />
          <ResultsList title='Pahalı Restoranlar' results={filterResultByPrice('₺₺₺')} />
        </>
      )
      }
      </>}
      
    </View>
  );
}



const styles = StyleSheet.create({})
