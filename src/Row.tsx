import up from '/up.svg';
import useTemplateAPI from './hooks/useTemplateAPI';
import Template from './Template';
import './Row.css';

interface RowProps {
  h3: string;
  h2: string;
  hashtag: string;
  animated?: boolean;
  socialIcon?: number;
}

export default function Row({ h3, h2, animated = false, socialIcon }: RowProps) {
  // const queryClient = useQueryClient();
  const { data, isPending, isError } = useTemplateAPI(h2, animated);
  const templates = isPending
    ? 'loading'
    : isError || !data
    ? 'error'
    : data.data.map((templateInfo, i) => (
        <Template socialIcon={socialIcon} templateInfo={templateInfo} key={i} />
      ));
  return (
    <div>
      <h3 className='text-left font-md text-sm'>{h3}</h3>
      <div className='flex justify-between pb-2 items-center'>
        <h2 className='font-bold text-xl'>{h2}</h2>
        <a href='https://new.express.adobe.com' className='text-xs text-violet-600 pr-5'>
          View all
        </a>
      </div>
      <div
        className={`flex gap-2 overflow-auto pb-2 items-center ${
          animated ? 'min-video-height' : 'min-image-height'
        }`}
      >
        {templates}
      </div>
      <div className='flex gap-6 justify-end items-center'>
        {/* <div className='font-medium text-sm'>#{hashtag}</div> */}
        <div className='text-xs flex'>
          <div className='text-slate-600'>{(95 + Math.random() * 200).toFixed(1)}k posts</div>
          <img src={up} alt='uploaded cnt'></img>
        </div>
      </div>
    </div>
  );
}
