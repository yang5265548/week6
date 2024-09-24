import {useCounter} from './useCounter';
import'./SingleCounter.css';

const SingleCounter = () => {
    const {counter, increment, decrement,reset} = useCounter(0);
    return(
        <div className='single-counter'>
            <h2>Counter:</h2>
            <div className='counter-value'>{counter}</div>
            <button onClick={increment}>Plus</button>
            <button onClick={decrement}>Minus</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
};

export default SingleCounter;