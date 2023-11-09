import axios from "axios";
import { useAppContext } from "../../AppProvider";
import { Information } from "./Information";



export function Overview() {
    const { state, dispatch } = useAppContext();

    // Run tests
    function runTest(testId: string) {
        dispatch({ type: "UPDATE_TEST_STATUS", payload: { testId, testStatus: 'Running' } });

        axios.get(`http://localhost:3000/tests/result/${testId}`).then(response => {
            const { result: testStatus } = response.data;

            dispatch({ type: "UPDATE_TEST_STATUS", payload: { testId, testStatus } });
        });
    }

    return (state.tests.map((test) => {
        return (
            <div key={test.id}>
                <Information test={test} />
                <button onClick={() => runTest(test.id)}>Run Test</button>
            </div>
        )
    })

    )

}