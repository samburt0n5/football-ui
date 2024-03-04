import {useState, useEffect, useMemo} from 'react';
import axios from 'axios';

function ScoresFixtures({gameweek}) {
  const options = useMemo(
    () => ({
    method: 'GET',
    url: 'https://7sm9snkmu1.execute-api.eu-west-2.amazonaws.com/prod/gameWeekGamesBySeason',
    params: {
      gameweek: gameweek,
      season: '2324'
    },
  }),
  [gameweek]
  );
  const [{results, totalResultsCount}, setResults] = useState({})

  useEffect(() => {
    console.log("effect updating")
    // setResults({club1:"someclub", club1Score:"club1Score",club2:"someclub2", club2Score:"club2Score"})
    axios.request(options).then((response) => {
      setResults(response.data);
      console.log("Received data: " + response.data)
    });
  }, [options]);
  return (
    <>
      <div>
        {results ? results.map((result, index) => (
            <div key={index}>
              <ul>{result.club1} {result.club1Score} - {result.club2Score} {result.club2} </ul>
            </div>
          ))
          : null}
      </div>
    </>
  )
}

function App() {
  const [gameweek, setGameweek] = useState('1')

  return (
    <>
      <label>
        Gameweek:{' '}
        <input
          defaultValue={gameweek}
          // ref='reference'
          onKeyUp={(e) => (e.key === 'Enter' ? setGameweek(e.target.value) : null)}
          // onChange={e => setGameweek(e.target.value)}
        />
      </label>
      <ScoresFixtures gameweek={gameweek}/>
    </>
  );
}

export default App;
