import favorite from '/favorite.svg';
import { useState, useContext, useMemo, useRef } from 'react';
import { StateContext } from './App';
import profile0 from '/profiles/0.png';
import profile1 from '/profiles/1.png';
import profile2 from '/profiles/2.png';
import profile3 from '/profiles/3.png';
import profile4 from '/profiles/4.png';
import socialFB from '/FB.svg';
import socialYT from '/YT.svg';
import socialIG from '/IG.svg';
import socialTikTok from '/TikTok.svg';
import socialPinterest from '/pinterest.png';
import socialTwitter from '/twitter.png';

const profiles = [profile0, profile1, profile2, profile3, profile4];
const names = ['Lindsey', 'Jocelyn', 'Davis Levin', 'Aspen', 'Jaxson Siphron'];
export type TemplateInfo = {
  src: string;
  poster?: string;
  branchUrl: string;
  topics: string[];
  title: string;
};
function lorem() {
  return Array.from({ length: 1 + Math.floor(Math.random() * 2) })
    .map(() => 'Lorem ipsum, or lipsum as it is sometimes known.')
    .join(' ');
}

const socialVideoIcon = [
  [socialTikTok, 'tiktok icon'],
  [socialYT, 'yt icon'],
  [socialIG, 'ig icon'],
];
const socialImageIcon = [
  [socialFB, 'fb icon'],
  [socialIG, 'ig icon'],
  [socialPinterest, 'pinterest icon'],
  [socialTwitter, 'twitter icon'],
];

function UGC() {
  const sentence = lorem();
  return (
    <div className='flex flex-col gap-1'>
      <div className='flex gap-2'>
        <img
          className='object-cover rounded-full h-6 w-6'
          src={profiles[Math.floor(Math.random() * 5)]}
          alt='fake profile photo'
        ></img>
        <div>{names[Math.floor(Math.random() * 5)]}</div>
      </div>
      <div className='text-sm text-left text-slate-600'>{sentence}</div>
      {Math.random() < 0.5 && (
        <div className='bg-black text-white py-1 px-2 w-max rounded-lg text-sm'>
          Used {(Math.random() * 20 + 5).toFixed(1)}k times
        </div>
      )}
    </div>
  );
}

export default function Template({
  templateInfo,
  socialIcon,
}: {
  templateInfo: TemplateInfo;
  socialIcon?: number;
}) {
  const {
    state: { searching },
  } = useContext(StateContext);
  const [liked, setLiked] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hover, setHover] = useState(false);
  const timeoutRef = useRef<number>(0);
  const ugc = useMemo(() => <UGC />, []);
  const socialImageRand = useMemo(
    () =>
      socialIcon !== undefined &&
      Number.isInteger(socialIcon) &&
      socialIcon < socialImageIcon.length
        ? socialIcon
        : Math.floor(Math.random() * socialImageIcon.length),
    [socialIcon],
  );
  const socialVideoRand = useMemo(
    () =>
      socialIcon !== undefined &&
      Number.isInteger(socialIcon ?? null) &&
      socialIcon < socialVideoIcon.length
        ? socialIcon
        : Math.floor(Math.random() * socialVideoIcon.length),
    [socialIcon],
  );
  const clickHandler = () => {
    setClicked(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setClicked(false);
    }, 3000);
  };
  const cta = (
    <a
      href={templateInfo.branchUrl}
      className={`${
        clicked || hover ? '' : 'hidden '
      }text-sm z-10 w-20 text-white bg-violet-600 p-1 rounded-full absolute bottom-2 left-1/2 -translate-x-1/2`}
    >
      Remix
    </a>
  );

  const isVideo = !!templateInfo.poster;
  const icons = (
    <>
      <div className={`absolute bottom-0.5 left-0.5 rounded-full p-1`}>
        <img
          className='size-4'
          src={isVideo ? socialVideoIcon[socialVideoRand][0] : socialImageIcon[socialImageRand][0]}
          alt={isVideo ? socialVideoIcon[socialVideoRand][1] : socialImageIcon[socialImageRand][1]}
        ></img>
      </div>
      <div
        className={`absolute top-0.5 right-0.5 rounded-full p-1 cursor-pointer${
          liked ? ' bg-orange-500' : ' bg-white'
        }`}
        onClick={() => {
          setLiked((l) => !l);
        }}
      >
        <img className='size-3' src={favorite} alt='like'></img>
      </div>
    </>
  );
  const templateContent = isVideo ? (
    <>
      <video
        muted
        playsInline
        autoPlay
        loop
        preload='auto'
        poster={templateInfo.poster}
        className={`w-full${searching ? '' : ' h-56'}`}
      >
        <source src={templateInfo.src}></source>
      </video>
    </>
  ) : (
    <>
      <img
        className={searching ? '' : 'h-36'}
        src={templateInfo.src}
        alt={templateInfo.title}
      ></img>
    </>
  );
  return (
    <div className='flex flex-col shrink-0 gap-2'>
      <div
        className='relative'
        onClick={clickHandler}
        onMouseLeave={() => {
          setHover(false);
        }}
        onMouseOver={() => {
          setHover(true);
        }}
      >
        {templateContent}
        {icons}
        {cta}
      </div>

      {searching && ugc}
    </div>
  );
}
