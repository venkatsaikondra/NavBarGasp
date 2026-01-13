"use client"
import React,{useRef,useEffect,useState} from 'react'
import Link from 'next/link';
import "./menu.css";
const MenuLinks=[
  {path:'/',label:'Home'},
  {path:'/about',label:'About'},
  {path:'/lab',label:'Lab'},
  {path:'/work',label:'Work'},
  {path:'/contact',label:'Contact'},
]
const menu = () => {
  const container=useRef();
  const [isMenuOpen,setIsMenuOpen]=useState(false);
  const toggleMenu=()=>{
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <div className='menu-container' ref={container}>
      <div className="menu-bar">
        <div className="menu-logo">
          <Link href="/">NavBar</Link>
        </div>
        <div className="menu-open" onClick={toggleMenu}>
          <p>Menu</p>
        </div>
      </div>
      <div className="menu-overlay">
        <div className="menu-overlay-bar">
          <div className="menu-logo">
            <Link href='/</div>'>NavBar</Link>
          </div>
          <div className="menu-close" onClick={toggleMenu}><p>Close</p></div>
        </div>
        <div className="menu-close-icon">
          <p>&#x2715;</p>
        </div>
        <div className="menu-copy">
          <div className="menu-links">
            {MenuLinks.map((link,index)=>(
              <div className="menu-link-item" key={index}>
                <div className="menu-link-item-holder" onClick={toggleMenu}>
                  <Link href={link.path} className='menu-link'>
                  {Link.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="menu-info">
            <div className="menu-info-col">
              <a href="#">X &#8599;</a>
               <a href="#">Instagram &#8599;</a>
                <a href="#">LinkedIn &#8599;</a>
                 <a href="#">Behance &#8599;</a>
                  <a href="#">Dribble &#8599;</a>
            </div>
            <div className="menu-info-col">
              <p>info@NavBar.com</p>
              <p>2342 232 343</p>
            </div>
          </div>
        </div>
        <div className="menu-preview">
          <p>View Showreel</p>
        </div>
      </div>
    </div>
  )
}

export default menu
