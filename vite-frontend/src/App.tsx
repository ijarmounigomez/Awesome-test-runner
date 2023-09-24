// App.tsx
import {useState, useEffect} from 'react';
import axios from 'axios';

// Test is a type that represents the structure of an object received from the API.
type Test = {
  id: string;
  name: string;
  executionTime: number;
  quote: string;
  status?: 'Running' | 'Succeeded' | 'Failed' | 'Pending'; // optional attribute!
};

// The App function is the main component. Defines the UI and behavior of the app.
function App() {
  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => { // useEffect connects a component to external systems!
    axios.get('http://localhost:3000/tests').then(response => {
    const fetchedTests = response.data.map((test: Test) => ({
      ...test,
      status: 'Pending'
    }));
    setTests(fetchedTests);
    });
  }, []);

  // Run tests
  function runTest(testId: string) {
    // What is the test to run?
    // Compare the id of the test passed, to the testId (prop)
    const testToRun = tests.find((test) => test.id === testId);

    if (testToRun) {
      // If the test to run is found, change the status to 'Running', while in progress
      setTests((previousTests) =>
        previousTests.map((test) =>
          test.id === testId ? {...test, status: 'Running'} : test
        )
      );

      // set Timeout
      setTimeout(() => {
        const randomResult = Math.random() < 0.5 ? 'Succeeded' : 'Failed';

        setTests((previousTests) =>
          previousTests.map(test =>
            test.id === testId ? {...test, status: randomResult} : test
          )
        )
      }, testToRun.executionTime);
    }
  }

  return (
    <div>
      {tests.map(test => (
        <div key={test.id}>
          <h2>{test.name}</h2>
          <p>Quote: {test.quote}</p>
          <p>Status: {test.status}</p>
          <button onClick={() => runTest(test.id)}>Run Test</button>
        </div>
      ))}
    </div>
    );
    }
  
export default App;