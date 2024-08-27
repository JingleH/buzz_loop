import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Searchbar from './Searchbar';
import Header from './Header';
import BottomNav from './BottomNav';
import Tabs from './Tabs';
import SearchResult from './SearchResult';
import { useReducer, createContext, useRef, useState } from 'react';
import marqueeSrc from '/marquee.mp4';

const queryClient = new QueryClient();
interface State {
  searching: boolean;
  searchValue: string;
}
const initialState: State = {
  searching: false,
  searchValue: '',
};

type Action = { type: 'set_searching'; value: boolean } | { type: 'search'; value: string };

function reducer(state: State, action: Action): State {
  if (action.type === 'set_searching') {
    return { ...state, searching: action.value };
  } else if (action.type === 'search') {
    return { ...state, searchValue: action.value, searching: true };
  }
  throw new Error('illegal action type');
}
interface StateContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}
export const StateContext = createContext<StateContextType>({
  state: initialState,
  dispatch: () => {},
});

function Marquee() {
  const [paused, setPaused] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);
  const handlePlayVideo = () => {
    if (paused) {
      vidRef.current?.play();
      setPaused(false);
    } else {
      vidRef.current?.pause();
      setPaused(true);
    }
  };
  return (
    <video
      className='h-36 object-cover pt-4'
      onClick={handlePlayVideo}
      ref={vidRef}
      playsInline
      autoPlay
      muted
      loop
      poster=''
      title='home animation'
      preload='auto'
    >
      <source
        src={marqueeSrc}
        type='video/mp4'
      />
    </video>
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { searching } = state;
  return (
    <>
      <Header />

      <main className='contain sm mx-auto text-center px-3 max-w-sm bg-white'>
        <QueryClientProvider client={queryClient}>
          <StateContext.Provider value={{ state, dispatch }}>
            {!searching && <Marquee />}
            <Searchbar />
            {!searching && <Tabs />}
            {searching && <SearchResult animated={false} />}
            <div className='py-8'></div>
            <BottomNav />
          </StateContext.Provider>
        </QueryClientProvider>
      </main>
    </>
  );
}

export default App;
