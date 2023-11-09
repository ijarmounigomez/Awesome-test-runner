import React from "react"
import { Test } from "../../types"


export function Information({ test }: { test: Test }) {

    return (
        <React.Fragment key={test.id}>
            <h2>{test.name}</h2>
            <p>Quote: {test.quote}</p>
            <p>Status: {test.status}</p>
        </React.Fragment>
    )
}