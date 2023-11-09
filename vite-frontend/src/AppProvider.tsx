import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { State } from './types';
import { Action } from './store/actions';
import { initialState, reducer } from './store/reducers';

type AppContextType = { state: State } & { dispatch: React.Dispatch<Action> };

export const AppContext = createContext<AppContextType>({
    state: { ...initialState },
    dispatch: () => null,
});

export const useAppContext = () => useContext(AppContext);

function AppProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const contextValue = useMemo(
        () => ({
            state: { ...state },
            dispatch,
        }),
        [state],
    );

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;