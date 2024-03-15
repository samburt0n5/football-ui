import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

function ScoresFixtures({ gameweek }) {
  const options = useMemo(
    () => ({
      method: 'GET',
      url: 'https://7sm9snkmu1.execute-api.eu-west-2.amazonaws.com/prod/gameWeekGamesBySeason',
      params: {
        gameweek: gameweek,
        season: '2324',
      },
    }),
    [gameweek],
  );
  const [{ results, totalResultsCount }, setResults] = useState({});

  useEffect(() => {
    console.log('effect updating');
    // setResults({club1:"someclub", club1Score:"club1Score",club2:"someclub2", club2Score:"club2Score"})
    axios.request(options).then((response) => {
      setResults(response.data);
      console.log('Received data: ' + response.data);
    });
  }, [options]);
  return (
    <>
      <div style={{ margin: 'auto', width: '60%', textAlign: 'center' }}>
        {results ? results.map((result, index) => (
            <div key={index}>
              <ul>
                <div style={{ margin: 'auto', width: '33%', textAlign: "left", display: "inline-block"}}>{result.club1}</div>
                {result.club1Score ?
                  <div style={{ margin: 'auto', width: '33%', textAlign: "center", display: "inline-block"}}>{result.club1Score + ' - ' + result.club2Score}</div>
                  :
                  <div style={{ margin: 'auto', width: '33%', textAlign: "center", display: "inline-block"}}>{result.dateTime}</div>
                }
                <div style={{ margin: 'auto', width: '33%', textAlign: "right", display: "inline-block"}}>{result.club2}</div>
              </ul>
            </div>
          ))
          : null}
      </div>
    </>
  );
}

function App() {
  const [gameweek, setGameweek] = useState(1);
  const incrementGameweek = () => {
    setGameweek(gameweek + 1);
  };
  const decrementGameweek = () => {
    if (gameweek !== 0) {
      setGameweek(gameweek - 1);
    }
  };

  return (
    <>
      <div style={{ margin: 'auto', width: '50%' }}>
        <div style={{margin: "auto", width: "50%", textAlign: "center"}}>
          <label>
            Gameweek:{' '}
            <input
              defaultValue={gameweek}
              value={gameweek}
              // ref='reference'
              onKeyUp={(e) => (e.key === 'Enter' ? setGameweek(e.target.value) : null)}
              onChange={e => setGameweek(Number(e.target.value))}
            />
          </label>
          {' '}
          <button
            onClick={incrementGameweek}
          >Next</button>
          {' '}
          <button
            onClick={decrementGameweek}
          >Previous</button>
        </div>
        {gameweek? <ScoresFixtures gameweek={gameweek} /> : <div/>}
      </div>
    </>
  );
}

export default App;
