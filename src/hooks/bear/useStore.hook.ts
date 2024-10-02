import { create } from 'zustand'

interface State {
    bears: number;
}

interface Action {
    increasePopulation: () => void;
    removeAllBears: () => void;
    updateBears: ( newBears: number ) => void;
}

export const useBear = create<State & Action>((set) => ({
    // * States
    bears: 0,

    // * Actions
    increasePopulation: () => set(( state ) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: ( newBears ) => set({ bears: newBears }),
}))
