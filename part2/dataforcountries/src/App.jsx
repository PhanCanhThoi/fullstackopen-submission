import axios from 'axios'
import { useEffect, useState } from 'react'
import ShowCountries from './components/ShowCountries'
function App() {
  const [countries,setCountries] = useState([])
  const [error,setError] = useState(null)
  const [searchCountries, setSearchCountries] = useState(null)
  const handleSearchCountries = (event)=>{
      setSearchCountries(event.target.value)
  }
  const ShowCountry = (countryName)=>{
    console.log("Showing country" , countryName)
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
      .then(response => {
        setCountries([response.data])
      })
      .catch(err => {
        console.error(err)
        setCountries([])
        setError('No countries found or failed to fetch.')
      })
  }
  const RestCountries = (event) => {
    event.preventDefault() 
    if (!searchCountries) {
      setError("Please enter a country name.")
      return
    }

    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        const arrCountry = response.data.filter(c => c.name.common.toLowerCase().includes(searchCountries.toLowerCase()))
        if(arrCountry.length > 10 ){
          setError("Too many matches, specify another filter")
          console.log('Too many matches, specify another filter')
          setCountries([])
        }else{
          setCountries(arrCountry)
        setError(null)
        }

      })
      .catch(err => {
        console.error(err)
        setCountries([])
        setError('No countries found or failed to fetch.')
      })
  }

    return (
      <div>
        <form onSubmit={RestCountries}>
          <label >find countries</label> <input onChange={handleSearchCountries}/>
        </form>
        {error && <p>{error}</p>}
        <ShowCountries countries={countries} ShowCountry={ShowCountry}/>
      </div>
    )
}

export default App
