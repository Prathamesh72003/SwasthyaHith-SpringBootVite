import { configureStore, createSlice } from '@reduxjs/toolkit';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('auth');
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
        console.error('Failed to load state from localStorage:', err);
        return undefined;
    }
};

const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state.auth);
        localStorage.setItem('auth', serializedState);
    } catch (err) {
        console.error('Failed to save state to localStorage:', err);
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        id: null,
        role: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.role = action.payload.role;
        },
        clearUser: (state) => {
            state.id = null;
            state.role = null;
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
    preloadedState: {
        auth: loadState(), 
    },
});

store.subscribe(() => {
    saveState(store.getState());
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
