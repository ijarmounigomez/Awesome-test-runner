import { produce } from "immer";
import { State } from "../../types";
import { Action } from "../actions";


export const initialState: State = {
    tests: [],
}

export const reducer = produce<State, [Action]>((draft, action) => {
    switch (action.type) {
        case "ADD_TEST":
            draft.tests.push(action.payload);
            break;
        case "UPDATE_TEST_STATUS":
            const testToUpdate = draft.tests.find((test) => test.id === action.payload.testId);

            if (testToUpdate) {
                testToUpdate.status = action.payload.testStatus;
            }
            break;
        case "UPDATE_ALL_TESTS":
            draft.tests = action.payload;
            break;
        default:
            break;
    }
});