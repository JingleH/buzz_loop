import useTemplateAPI from './hooks/useTemplateAPI';
import Template, { TemplateInfo } from './Template';
import { Masonry } from 'masonic';
import { useContext, useState } from 'react';
import { StateContext } from './App';
import circle from '/circle.svg';

function MasonryCard({ index, data }: { index: number; data: TemplateInfo }) {
  return (
    <div key={index} className='p-1'>
      <Template templateInfo={data} />
    </div>
  );
}
const colors = [
  'linear-gradient(135deg, #F5EDFC 0%, #ABB6FF 100%)',
  'linear-gradient(90deg, #E6E6E6 40.28%, #F2F2F2 62.22%, #E6E6E6 84.17%)',
  'linear-gradient(135deg, #D9F4FD 0%, #63C4FF 100%)',
  'linear-gradient(135deg, #CBFAE2 0%, #15D675 100%)',
];

function shuffle(input: TemplateInfo[]) {
  const array = [...input];
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

export default function SearchResult({ animated }: { animated: boolean }) {
  const { state } = useContext(StateContext);
  const [filter, setFilter] = useState<string | null>(null);
  const { data, isPending, isError } = useTemplateAPI(state.searchValue, animated, 50);
  if (isPending) return 'loading';
  if (isError || !data) return 'error';
  const topicMap = new Map<string, number>();
  data.data.forEach((template) => {
    template.topics.forEach((topic) => topicMap.set(topic, topicMap.get(topic) ?? 0 + 1));
  });
  const entries = Array.from(topicMap);
  
  entries.sort((a, b) => b[1] - a[1]);
  const sorted = entries.map((e) => e[0]);
  const chosen = sorted.slice(0, 10);
  const pills = chosen.map((pill, index) => (
    <button
      className='py-1 px-4 flex flex-shrink-0 gap-2 rounded-full items-center'
      key={pill}
      style={{
        background: colors[index],
        border:
          index >= colors.length
            ? '2px solid var(--Palette-transparent-black-300, #00000026)'
            : 'none',
      }}
      onClick={() => {
        if (filter === pill) {
          setFilter(null);
        } else {
          setFilter(pill);
        }
      }}
    >
      <img width='16' src={circle} />
      <div>{pill}</div>
    </button>
  ));
  // const filtered = data.data.filter((template) => !filter || template.topics.includes(filter));
  // console.log([filter, filtered, data]);
  return (
    <>
      <div className='flex gap-2 overflow-x-auto pb-3'>{pills}</div>
      <div className='text-left pb-4'>{data.metadata.totalHits} results</div>
      <Masonry
        items={shuffle(data.data)}
        render={MasonryCard}
        columnCount={2}
        rowGutter={12}
        columnGutter={6}
      />
    </>
  );
}
