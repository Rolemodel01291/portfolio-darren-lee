import Link from 'next/link'
const Menu = () => {
  return (
    <div className='p-4 text-white text-base rounded-l-sm' style={{backgroundColor:'rgba(33,33,55,0.8)'}}>
      <div className='text-left '>
        <Link href="/">
          <a className="hover:cursor-pointer">
            Home
          </a>
        </Link>
      </div>
      <div className='text-left '>
        <Link href="/about">
          <a className="hover:cursor-pointer">
            About
          </a>
        </Link>
      </div>
      <div className='text-left pt-1'>
        <Link href="/portfolio">
          <a className="hover:cursor-pointer">
            Projects
          </a>
        </Link>
      </div>
      <div className='text-left pt-1'>
        <Link href="/service">
          <a className="hover:cursor-pointer">
            Support
          </a>
        </Link>
      </div>
      <div className='text-left pt-1'>
        <Link href="/contact">
          <a className="hover:cursor-pointer">
            Contact
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Menu
