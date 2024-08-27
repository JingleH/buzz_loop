import adobeLogo from '/Adobe-Icon.svg';
import avatar from '/avatar.png';
import menu from '/Menu.svg';

export default function Header() {
  return (
    <header className='max-w-sm mx-auto px-3 text-center bg-white'>
      <div className='flex items-center justify-between border-solid border-b-2 py-3'>
        <img src={menu} className='size-9 py-2' alt='fake menu' />
        <a href='/' className='text-center flex gap-2 items-center justify-center'>
          <img src={adobeLogo} className='size-7' alt='Adobe logo' />
          <span className='text-[#eb1000]'>Adobe</span>
        </a>
        <div></div>
        <div></div>
        <div className='pr-4'>
          <img src={avatar} className='size-8' alt='fake profile' />
        </div>
      </div>
    </header>
  );
}
