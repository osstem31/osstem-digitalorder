'use client';

import React from 'react';
import Link from 'next/link';

interface ProductCardProps {
    image: string;
    title: string;
    description: string;
    status: 'order' | 'coming_soon';
}

const ProductCard = ({ image, title, description, status }: ProductCardProps) => (
    <div className="bg-white border border-[#E0E0E0] p-6 flex flex-col h-full min-h-[520px]">
        {/* Product Image Area */}
        <div className="flex-1 flex items-center justify-center mb-6 overflow-hidden min-h-[220px]">
            <img src={image} alt={title} className="max-h-full object-contain transform transition-transform hover:scale-105" />
        </div>

        {/* Content Area */}
        <div className="flex flex-col gap-3">
            <h3 className="text-[20px] font-bold text-[#212529]">{title}</h3>
            <p className="text-[14px] text-[#666666] leading-relaxed line-clamp-3 mb-6">
                {description}
            </p>

            {/* Button */}
            {status === 'order' ? (
                <Link 
                    href={title === 'OneGuide' ? '/order/detail/oneguide' : '#'} 
                    className="w-full py-3 bg-[#EB6100] text-white text-[16px] font-bold hover:bg-[#D55600] transition-colors rounded-[3px] text-center"
                >
                    주문하기
                </Link>
            ) : (
                <button className="w-full py-3 bg-[#A0A0A0] text-white text-[16px] font-bold cursor-not-allowed rounded-[3px]">
                    출시예정
                </button>
            )}
        </div>
    </div>
);

export default function ProductOrderPage() {
    const products: ProductCardProps[] = [
        {
          image: "https://denall-esg-jenkins.s3.ap-northeast-2.amazonaws.com/temp-product-1.png",
          title: "OneGuide",
          description: "OneGuide 실물 template, CBCT-STL 기반 환자 맞춤형 수술 가이드를 정밀 설계 후 제작합니다.",
          status: 'order'
        },
        {
          image: "https://denall-esg-jenkins.s3.ap-northeast-2.amazonaws.com/temp-product-5.png",
          title: "OneFit",
          description: "환자 맞춤형 커스텀 어버트먼트로 정밀 적합과 심미-기능을 동시에 구현합니다.",
          status: 'order'
        },
        {
          image: "https://denall-esg-jenkins.s3.ap-northeast-2.amazonaws.com/temp-product-4.png",
          title: "Radiographic",
          description: "무치악 또는 적은 잔존치용, 진단용 방사선 가이드를 제작해 정확한 식립 계획 수립을 지원합니다.",
          status: 'order'
        },
        {
          image: "https://denall-esg-jenkins.s3.ap-northeast-2.amazonaws.com/temp-product-6.png",
          title: "OneArch",
          description: "완진 무치악 환자를 위한 All-on-X 솔루션으로 전략 고정성 보철 치료를 지원합니다.",
          status: 'coming_soon'
        },
        {
          image: "https://denall-esg-jenkins.s3.ap-northeast-2.amazonaws.com/temp-product-2.png", 
          title: "Neodent Stent",
          description: "Neodent 임플란트 전용 Surgical Stent를 정밀 제작합니다.",
          status: 'order'
        },
        {
          image: "https://denall-esg-jenkins.s3.ap-northeast-2.amazonaws.com/temp-product-3.png", 
          title: "Temporary Crown",
          description: "정밀한 적합도와 심미성을 갖춘 임시 치아를 제작합니다.",
          status: 'order'
        },
        {
          image: "https://denall-esg-jenkins.s3.ap-northeast-2.amazonaws.com/temp-product-1.png", 
          title: "Final Crown",
          description: "우수한 강도와 자연치와 유사한 심미성을 제공하는 최종 보철물입니다.",
          status: 'order'
        },
        {
          image: "https://denall-esg-jenkins.s3.ap-northeast-2.amazonaws.com/temp-product-2.png", 
          title: "Lab Analog",
          description: "정교한 보철물 제작을 위한 고정밀 모델용 아날로그입니다.",
          status: 'order'
        },
        {
          image: "https://denall-esg-jenkins.s3.ap-northeast-2.amazonaws.com/temp-product-3.png", 
          title: "NightGuard",
          description: "이갈이 방지 및 턱관절 보호를 위한 환자 맞춤형 나이트가드입니다.",
          status: 'order'
        }
    ];

    return (
        <div className="max-w-[1800px] w-full mx-auto px-4 py-12 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {products.map((product, index) => (
                    <ProductCard key={index} {...product} />
                ))}
            </div>
        </div>
    );
}
