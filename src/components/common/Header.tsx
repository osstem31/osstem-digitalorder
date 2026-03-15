'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

import { CATEGORY_TOTALS } from '@/data/categoryData';

export default function Header() {
  const [activeMenu1, setActiveMenu1] = useState('DigitalOrder');
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('name') || (activeMenu1 === 'DigitalOrder' ? '제품주문' : null);
  
  const digitalOrderRef = useRef<HTMLButtonElement>(null);
  const [submenuLeft, setSubmenuLeft] = useState<number | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (digitalOrderRef.current) {
        const rect = digitalOrderRef.current.getBoundingClientRect();
        setSubmenuLeft(rect.left + rect.width / 2);
      }
    };
    
    // Slight delay to ensure layout is done
    setTimeout(updatePosition, 0);
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const menuGroup1 = ['BOOK', 'CRM', 'POST', 'JOB', 'MY PAGE'];
  const menuGroup2 = ['TV', 'Mall', 'Education', 'Software', 'DigitalOrder', 'Service', 'Interior', 'Conference', 'Map'];

  const digitalOrderCategories = [
    { name: '제품주문', count: '0', path: '/' },
    { name: '주문내역', count: '0', path: '/preparing' },
    { name: '제품소개', count: '0', path: '/preparing' },
  ];

  const categories = activeMenu1 === 'DigitalOrder' ? digitalOrderCategories : [
    { name: '위생용품', count: CATEGORY_TOTALS['위생용품'].toString() },
    { name: '기구', count: CATEGORY_TOTALS['기구'].toString() },
    { name: '의약품', count: CATEGORY_TOTALS['의약품'].toString() },
    { name: '장비', count: CATEGORY_TOTALS['장비'].toString() },
    { name: '메디컬', count: CATEGORY_TOTALS['메디컬'].toString() },
    { name: '생활가전', count: CATEGORY_TOTALS['생활가전'].toString() },
  ];

  return (
    <header className="w-full bg-white font-pretendard">
      {/* 1st Depth Layer: 50px Height */}
      <div className="border-b border-[#EB6100]">
        <div className="max-w-[1800px] w-full mx-auto flex items-center h-[50px] justify-between">
          <div className="flex items-center h-full gap-6">
            {/* Logo */}
            <Link
              href="/"
              className="shrink-0 flex items-center"
            >
              <img
                src="https://denall-esg-jenkins.s3.ap-northeast-2.amazonaws.com/bi-denall-m.png"
                alt="DENALL"
                className="h-[28px] w-auto object-contain"
              />
            </Link>

            {/* Account Name */}
            <div className="text-[#333333] text-[16px] font-bold ml-1">
              오스템치과
            </div>

            {/* Middle Menus */}
            <nav className="flex items-center h-full ml-4">
              {/* Group 1: BOOK ~ MY PAGE */}
              <div className="flex items-center gap-2 mr-4">
                {menuGroup1.map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveMenu1(item)}
                    className={`px-3 h-8 text-[16px] font-bold ${activeMenu1 === item
                      ? 'bg-[#EB6100] text-white rounded-[5px]'
                      : 'text-[#EB6100]'
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Group 2: TV ~ Map */}
              <div className="flex items-center h-full">
                {menuGroup2.map((item) => (
                  <button
                    key={item}
                    ref={item === 'DigitalOrder' ? digitalOrderRef : null}
                    onClick={() => setActiveMenu1(item)}
                    className={`px-4 h-[50px] relative text-[18px] font-bold transition-all flex items-center justify-center text-center align-middle leading-[28px] ${activeMenu1 === item
                      ? 'text-[#000000]'
                      : 'text-[#666666]'
                      }`}
                  >
                    {item}
                    {activeMenu1 === item && (
                      <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-[#EB6100]"></div>
                    )}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Right Area */}
          <div className="flex items-center">
            {/* Bell Icon */}
            <button className="text-[#333333] mr-2 hover:text-[#EB6100] transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>

            {/* About OSSTEM Button-like Badge */}
            <Link href="/" className="border border-gray-300 rounded-none w-[72px] h-[36px] flex flex-col items-center justify-center bg-white leading-none p-0">
              <span className="text-[#888888] text-[11px] font-medium tracking-tighter">About</span>
              <span className="text-[#EB6100] text-[13px] font-bold tracking-tight">OSSTEM</span>
            </Link>

            {/* Dot Separator */}
            <div className="w-[3px] h-[3px] bg-[#CCCCCC] rounded-full mx-[5px]"></div>

            {/* Customer Center */}
            <Link href="/" className="text-[#000] text-[14px] font-semibold">
              고객센터
            </Link>
          </div>
        </div>
      </div>

      {/* 2nd Depth Layer: 44px Height */}
      <div className="bg-white border-b border-[#E6E6E6] sticky top-0 z-[110]">
        <div className="h-[44px] relative">
          <div 
            className="flex items-center h-full gap-10 absolute -translate-x-1/2 whitespace-nowrap"
            style={{ 
              left: submenuLeft ? `${submenuLeft}px` : '54.5%', 
              opacity: submenuLeft ? 1 : 0, 
              transition: 'opacity 0.2s' 
            }}
          >
            {categories.map((cat, i) => {
              const isSelected = activeCategory === cat.name;
              return (
                <Link
                  key={i}
                  href={(cat as { path?: string }).path || `/category?name=${encodeURIComponent(cat.name)}`}
                  className="flex flex-col items-center justify-center cursor-pointer group shrink-0 h-full"
                >
                  <span className={`text-[14px] font-bold group-hover:text-[#EB6100] leading-none ${isSelected ? 'text-[#EB6100]' : 'text-[#212529]'}`}>
                    {cat.name}
                  </span>
                  {cat.count !== '0' && (
                    <span className="text-[10px] text-[#9E9E9E] font-medium leading-none mt-0.5">
                      {cat.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
