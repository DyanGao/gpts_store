import Image from "next/image"
import githubIcon from '@/public/github-icon.svg'

const Footer = () => {
  return (
    <div className='bg-gray-800 text-white py-12 px-4 w-full bottom-0 mt-12' >
      <div className="flex container justify-between">
        <div className="flex flex-row items-center">
          <div>
            <div className="text-2xl mb-3">GPTs Store</div>
            <div className="text-sm">©  2024</div>
            <div className="mt-2 text-xs uppercase">Made with ❤️ By Dongyang</div>
            <div className="text-xs uppercase">no cookies🍪 just colors🎨 and code👩🏻‍💻</div>
          </div>
        </div>
        <div className="flex">
          <a href='https://github.com/DyanGao' target="_blank" className='m-6'>
          <Image src={githubIcon} alt="github" width={32} height={32} />
        </a>
        </div>
      </div>
    </div>
  )
}

export default Footer