import { useMemo, useState } from 'react';
import './Tabs.css';
import Row from './Row';

function TabContent({ index }: { index: number }) {
  const all = useMemo(
    () => (
      <>
        <Row h3='Popular on Buzz' h2='Cafe seasonal templates' hashtag='mindful'></Row>
        <Row
          h3='Trending now on Tiktoks'
          h2='Tiktoks videos'
          hashtag='happyhappy'
          socialIcon={0}
        ></Row>
        <Row
          h3='Trending now on Instagram'
          h2='Instagram stories'
          hashtag='sundayfunday'
          socialIcon={1}
        ></Row>
        <Row h3='Ideas for you' h2='Youtube videos' hashtag='urbanexploring' socialIcon={1}></Row>
        <Row h3='Popular in Canada' h2='Winter festivals' hashtag='winterwonderland'></Row>
      </>
    ),
    [],
  );
  const igPosts = useMemo(
    () => (
      <>
        <Row
          h3='Popular on Buzz'
          h2='Seasonal Instagram posts'
          hashtag='popular'
          socialIcon={1}
        ></Row>
        <Row
          h3='Trending on Instagram'
          h2='Sports instagram story'
          hashtag='running'
          animated
          socialIcon={2}
        ></Row>
        <Row h3='Trending now' h2='Food Instagram' hashtag='eating' socialIcon={1}></Row>
        <Row h3='Ideas for you' h2='Cat Instagram' hashtag='petting' socialIcon={1}></Row>
        <Row h3='Popular in Canada' h2='Dog Instagram' hashtag='walking' socialIcon={1}></Row>
      </>
    ),
    [],
  );
  const tiktoks = useMemo(
    () => (
      <>
        <Row
          h3='Popular on Buzz'
          h2='Health Tiktoks'
          hashtag='foryou'
          animated
          socialIcon={0}
        ></Row>
        <Row h3='Trending now' h2='OOTD Tiktoks' hashtag='clothes' animated socialIcon={0}></Row>
        <Row h3='Trending now' h2='Food Tiktoks' hashtag='foodie' animated socialIcon={0}></Row>
        <Row h3='Ideas for you' h2='Cat Tiktoks' hashtag='meow' animated socialIcon={0}></Row>
        <Row
          h3='Popular in Canada'
          h2='Sports Tiktoks'
          hashtag='sweating'
          animated
          socialIcon={0}
        ></Row>
      </>
    ),
    [],
  );
  const igReels = useMemo(
    () => (
      <>
        <Row
          h3='Popular on Buzz'
          h2='Seasonal Instagram templates'
          hashtag='zen'
          animated
          socialIcon={2}
        ></Row>
        <Row h3='Trending now' h2='Instagram stories' hashtag='peace' animated socialIcon={2}></Row>
        <Row
          h3='Ideas for you'
          h2='Instagram videos'
          hashtag='awesome'
          animated
          socialIcon={2}
        ></Row>
        <Row
          h3='Popular in Canada'
          h2='Winter festivals Instagram'
          hashtag='drinks'
          animated
          socialIcon={2}
        ></Row>
      </>
    ),
    [],
  );
  const pinterest = useMemo(
    () => (
      <>
        <Row h3='Popular on Buzz' h2='Seasonal Pinterest' hashtag='popping' socialIcon={2}></Row>
        <Row h3='Trending now' h2='Trending Pinterest' hashtag='saturday' socialIcon={2}></Row>
        <Row h3='Ideas for you' h2='Urban Pinterest' hashtag='adventure' socialIcon={2}></Row>
        <Row
          h3='Popular in Canada'
          h2='Winter festivals Pinterest'
          hashtag='pretty'
          socialIcon={2}
        ></Row>
      </>
    ),
    [],
  );
  const yt = useMemo(
    () => (
      <>
        <Row
          h3='Popular on Buzz'
          h2='Seasonal Youtube shorts'
          hashtag='yeah'
          animated
          socialIcon={1}
        ></Row>
        <Row
          h3='Trending now'
          h2='Sports Youtube shorts'
          hashtag='cool'
          animated
          socialIcon={1}
        ></Row>
        <Row
          h3='Ideas for you'
          h2='Food Youtube shorts'
          hashtag='monday'
          animated
          socialIcon={1}
        ></Row>
        <Row
          h3='Popular in Canada'
          h2='Winter Youtube'
          hashtag='tuesday'
          animated
          socialIcon={1}
        ></Row>
      </>
    ),
    [],
  );
  return [all, igPosts, tiktoks, igReels, pinterest, yt][index];
}

export default function Tabs() {
  const [active, setActive] = useState(0);
  const tabs = ['All', 'IG posts', 'TikToks', 'IG Reels', 'Pinterest', 'YT Short'];
  return (
    <div className='tabs'>
      <ul className='flex gap-6 overflow-auto whitespace-nowrap border-b border-solid border-slate-300'>
        {tabs.map((tab, i) => (
          <li
            className={`flex-shrink-0 pb-1${active === i ? ' active' : ''}`}
            key={i}
            onClick={() => {
              setActive(i);
            }}
          >
            {tab}
          </li>
        ))}
      </ul>
      <div className='pb-4'></div>
      <div className='flex flex-col gap-6'>
        <TabContent index={active} />
      </div>
    </div>
  );
}
