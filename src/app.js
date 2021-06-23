import { useRef, useState } from 'react'
import axios from 'axios'
import ReactJson from 'react-json-view'

export const App = () => {
  const [results, setResults] = useState([])
  const queryInput = useRef()

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    const fetchResults = async () => {
      try {
        const q = queryInput.current.value
        const { data } = await axios.get(`https://www.ebi.ac.uk/ols/api/ontologies`, { params: { q } })
        if (!data) {
          throw new Error('An error occurred fetching results.')
        }
        setResults(data._embedded.ontologies)
      } catch (error) {
        console.log(error)
      }
    }
    setResults([])
    fetchResults()
  }

  return (
    <div className="App">
      
      <input ref={ queryInput } onKeyDown={ handleKeyDown } />
      <button onClick={ handleSubmit }>search</button>
      
      <hr/>

      {
        results.map(result => <ReactJson className="result-as-json" key={ result.ontologyId } src={ result } theme="monokai" collapsed={ true } />)
      }

    </div>
  )
}
