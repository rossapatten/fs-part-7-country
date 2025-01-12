import React, { useState, useEffect } from 'react'
import countryService from './services/country'
import axios from 'axios'


const result = await countryService.getCountry("finland")

console.log(result)

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {

  const [country, setCountry] = useState(null)

  useEffect(() => {
    console.log('effect run, name is now', name)

    // skip if currency is not defined
    if (name) {
      console.log('fetching countries...')
      countryService.getCountry(name)
        .then(response => {
          setCountry(
            {
              "found": true,
              "data": {
                "capital": response.capital[0],
                "population": response.population,
                "name": response.name.common,
                "flag": response.flags.png

              }
            })
        })
        .catch((error) => {

            setCountry(
              {
                "found": false,
                "data": {}
              }
            )
    
        })
    }
  }, [name])

  return country

  }

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App





/*

Implement a custom hook useCountry, 
which can be used to search for the details of the country given to the hook as a parameter.
Use the API endpoint name to fetch a country's details in a useEffect hook within your custom hook.
Note that in this exercise it is essential to use useEffect's second parameter array to control when the effect function is executed. 
See the course part 2 for more info how the second parameter could be used.

*/