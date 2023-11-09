export type State = {
    tests: Test[];
};

// Test is a type that represents the structure of an object received from the API.
export type Test = {
    id: string;
    name: string;
    executionTime: number;
    quote: string;
    status?: TestStatus; // optional attribute!
};

export type TestStatus = 'Running' | 'Succeeded' | 'Failed' | 'Pending'; 
