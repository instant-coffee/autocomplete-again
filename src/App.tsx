import { Autocomplete } from './components/AutoComplete'

function App() {
  return (
    <div className='container'>
      <h1>Autocomplete Again</h1>
      
      {process.env.REACT_APP_GOOGLE_MAPS_API_KEY ? (
      <Autocomplete apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} />
        ) : (
          <div>Please provide an API key</div>
        )}
    </div>
  )
}

export default App
