import backIcon from '/chevron-right.svg';
import { useContext, useState } from 'react';
import { StateContext } from './App';

export default function Searchbar() {
  const { state, dispatch } = useContext(StateContext);
  const [value, setValue] = useState('');
  return (
    <div className='text-left py-4 flex gap-4 items-center'>
      {state.searching && (
        <img
          className='size-4 cursor-pointer'
          src={backIcon}
          alt='back'
          onClick={() => {
            dispatch({ type: 'set_searching', value: false });
          }}
        />
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: 'search', value });
        }}
        className='relative w-full'
      >
        <img className='absolute -translate-y-1/2 left-3 top-1/2' width='16px' src='/search.svg' alt='search' />
        <input
          className='shadow-sm px-8 py-2 border-2 border-solid rounded-full w-full'
          type='text'
          placeholder='Search everything'
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></input>
      </form>
    </div>
  );
}
