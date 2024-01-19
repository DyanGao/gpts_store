import Link from "next/link"
import Image from "next/image"
import githubIcon from "@/public/github-icon.svg"
const Header = () => {
  return (
    <div className='border flex justify-between w-full text-center'>
      <Link href='/' className='m-6 text-3xl'>GPTs Store</Link>
      <a href='https://github.com/DyanGao' target="_blank" className='m-6'>
        <Image src={githubIcon} alt="github" width={32} height={32} />
      </a>
    </div>
  )
}

export default Header