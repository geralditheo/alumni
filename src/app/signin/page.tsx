'use client';

import { useBear } from '@/hooks/bear/useStore.hook';

export default function Blog(){

    const { bears, increasePopulation, removeAllBears, updateBears } = useBear();

    return <main>

        <h2>Ini akan menjadi halaman login dan register</h2>

        <p>{bears}</p>
        <button onClick={increasePopulation} >Add +</button>
        <button onClick={removeAllBears} >Removes</button>
        <button onClick={() => updateBears(6)} >Update</button>

    </main>
}