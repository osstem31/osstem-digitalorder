'use client';

import Link from 'next/link';

export default function PreparingPage() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white font-pretendard px-4">
            {/* Icon/Illustration Placeholder */}
            <div className="mb-8 relative">
                <div className="w-24 h-24 bg-[#FFF0E6] rounded-full flex items-center justify-center">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#EB6100" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-[#EB6100] rounded-full flex items-center justify-center">
                    <span className="text-[#EB6100] text-[18px] font-bold">!</span>
                </div>
            </div>

            <h1 className="text-[28px] font-bold text-[#212529] mb-4 text-center">
                서비스 <span className="text-[#EB6100]">준비 중</span>입니다.
            </h1>

            <p className="text-[16px] text-[#666666] mb-10 text-center leading-relaxed max-w-[400px]">
                보다 나은 서비스를 위해 현재 준비 중인 기능입니다.<br />
                빠른 시일 내에 찾아뵙겠습니다. 감사합니다.
            </p>

            <div className="flex gap-4">
                <Link
                    href="/"
                    className="px-8 py-3 bg-[#EB6100] text-white rounded-[5px] font-bold text-[16px] hover:bg-[#D55600] transition-colors"
                >
                    홈으로 가기
                </Link>
                <button
                    onClick={() => window.history.back()}
                    className="px-8 py-3 border border-[#D8D8D8] text-[#666666] rounded-[5px] font-medium text-[16px] hover:bg-gray-50 transition-colors"
                >
                    이전으로
                </button>
            </div>
        </div>
    );
}
