import { Test, TestStatus } from "../../types";




export type Action = | { "type": "ADD_TEST", "payload": Test } | { "type": "UPDATE_TEST_STATUS", "payload": { testId: string, testStatus: TestStatus } } | { "type": "UPDATE_ALL_TESTS", "payload": Test[] };