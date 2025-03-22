
import { useQuery } from '@apollo/client'
import './App.css'
import { GSM_DATA } from './query/gsmQuery'
import MapComponent from './MapComponent'

function App() {
  const apiKey = import.meta.env.GOOGLE_MAP_API
  const { loading, error, data } = useQuery(GSM_DATA, {
    variables: { phoneNumber: '938476' },
  })
  console.log(error, loading, data)
  console.log(data)
  
  return (
    <>
      <h1>Google Map Integration</h1>
      <MapComponent apiKey={apiKey} />
    </>
  )
}

export default App
