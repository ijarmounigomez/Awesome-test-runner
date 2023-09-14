// App.tsx
import axios from 'axios';

function App() {
// const [tests, setTests] = useState<Test[]>([]);
const thisIsATestAxiosCall = () => {
  axios.get('/tests')
    .then(response => {
      console.log(response)
    })
}
  
return (
  <button onClick={thisIsATestAxiosCall}>Run Test</button>
);
}
  
export default App;