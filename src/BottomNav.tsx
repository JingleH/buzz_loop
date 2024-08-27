import home from '/home.svg';
import create from '/create.svg';
import favorite from '/favorite.svg';
import profile from '/profile.svg';
import { StateContext } from './App';
import { useContext } from 'react';

export default function BottomNav() {
  const { dispatch } = useContext(StateContext);
  return (
    <div className='right-1/2 px-4 translate-x-1/2 w-96 py-2 fixed flex bottom-0 bg-white justify-between'>
      <button
        className='flex flex-col items-center text-xs'
        onClick={() => {
          dispatch({ type: 'set_searching', value: false });
        }}
      >
        <img className='p-1' src={home}></img>
        <div>Home</div>
      </button>
      <button
        className='flex flex-col items-center text-xs'
        onClick={() => {
          alert('😢 not done yet 😢');
        }}
      >
        <img className='p-1' src={favorite}></img>
        <div>Favorites</div>
      </button>
      <button
        className='flex flex-col items-center text-xs'
        onClick={() => {
          alert('😢 not done yet 😢');
        }}
      >
        <img className='p-1' src={profile}></img>
        <div>My Buzz</div>
      </button>
      <button
        className='flex flex-col items-center text-xs'
        onClick={() => {
          alert('😢 not done yet 😢');
        }}
      >
        <img className='bg-violet-600 rounded-full p-1' src={create}></img>
        <div>Create</div>
      </button>
    </div>
  );
}
