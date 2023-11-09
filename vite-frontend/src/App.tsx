// App.tsx
import { useEffect } from 'react';
import axios from 'axios';
import { Test } from './types';
import { useAppContext } from './AppProvider';
import { Overview } from './components/TestOverview/Overview';
import { addTests } from './store/actions';



// The App function is the main component. Defines the UI and behavior of the app.
function App() {
  const { dispatch } = useAppContext();

  useEffect(() => { // useEffect connects a component to external systems!
    axios.get('http://localhost:3000/tests').then(response => {
      const fetchedTests = response.data.map((test: Test) => ({
        ...test,
        status: 'Pending'
      }));

      dispatch(addTests(fetchedTests));
    });
  }, []); // Based on a state change, you can fill it in.



  function runAllTests() {
    //
    // // Set tests to 'Running' state
    // const updatedTests: Test[] = tests.map((test) => ({
    //   ...test,
    //   status: 'Running',
    // }))
    //
    // setTests(updatedTests);
    //
    // const testPromises: Promise<Test>[] = tests.map((test) => {
    //   // test comment
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve({
    //         ...test,
    //         status: randomisedResult()
    //       })           
    //     }, test.executionTime)
    //
    //   })
    // })
    //
    // testPromises .then((updatedTests) => {
    //   setTests(updatedTests);
    // });

  }

  return (
    <div>
      <Overview />
      <button onClick={() => runAllTests()}>Run all tests</button>
    </div>
  );
}

export default App;
