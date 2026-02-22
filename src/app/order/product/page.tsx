'use client';

import React from 'react';

interface ProductCardProps {
    image: string;
    title: string;
    description: string;
    tags: string[];
    status: 'order' | 'coming_soon';
}

const ProductCard = ({ image, title, description, tags, status }: ProductCardProps) => (
    <div className="bg-white border border-[#E0E0E0] p-6 flex flex-col h-full min-h-[520px]">
        {/* Product Image Area */}
        <div className="flex-1 flex items-center justify-center mb-6 overflow-hidden min-h-[220px]">
            <img src={image} alt={title} className="max-h-full object-contain transform transition-transform hover:scale-105" />
        </div>

        {/* Content Area */}
        <div className="flex flex-col gap-3">
            <h3 className="text-[20px] font-bold text-[#212529]">{title}</h3>
            <p className="text-[14px] text-[#666666] leading-relaxed line-clamp-3">
                {description}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-2 mb-6 min-h-[32px]">
                <span className="text-[13px] text-[#212529] font-bold mr-1">필수첨부</span>
                {tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-0.5 bg-[#E8F5FF] text-[#0085FF] text-[12px] font-medium rounded-full">
                        {tag}
                    </span>
                ))}
                {tags.length === 0 && <span className="text-[13px] text-[#9E9E9E] font-medium italic">해당사항 없음</span>}
            </div>

            {/* Button */}
            {status === 'order' ? (
                <button className="w-full py-3 bg-[#EB6100] text-white text-[16px] font-bold hover:bg-[#D55600] transition-colors rounded-[3px]">
                    주문하기
                </button>
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
            image: "https://denall-esg-jenkins.s3.ap-northeast-2.amazonaws.com/temp-product-1.png", // OneGuide Template
            title: "OneGuide Template 제작",
            description: "OneGuide 실물 template, CBCT-STL 기반 환자 맞춤형 수술 가이드를 정밀 설계 후 제작합니다.",
            tags: ["CT Data", "Scan Data"],
            status: 'order'
        },
        {
            image: "https://denall-esg-jenkins.s3.ap-northeast-2.amazonaws.com/temp-product-2.png", // OneGuide Design File
            title: "OneGuide Design 파일 제작",
            description: "OneGuide Design 파일 제공, CBCT-STL 기반 수술 계획을 반영한 가이드 설계 파일을 제공합니다.",
            tags: ["Scan Data"],
            status: 'order'
        },
        {
            image: "https://denall-esg-jenkins.s3.ap-northeast-2.amazonaws.com/temp-product-3.png", // OneGuide Printing
            title: "OneGuide Printing 요청",
            description: "센터에서 프린팅만 진행, 승인된 설계 파일로 정밀 가이드를 출력/후가공 후 배송합니다.",
            tags: ["디자인 파일"],
            status: 'order'
        },
        {
            image: "https://denall-esg-jenkins.s3.ap-northeast-2.amazonaws.com/temp-product-4.png", // Radiographic Template
            title: "Radiographic Template 제작",
            description: "무치악 또는 적은 잔존치용, 진단용 방사선 가이드를 제작해 정확한 식립 계획 수립을 지원합니다.",
            tags: ["환자 석고 모형"],
            status: 'order'
        },
        {
            image: "https://denall-esg-jenkins.s3.ap-northeast-2.amazonaws.com/temp-product-5.png", // OneFit
            title: "OneFit 제작",
            description: "환자 맞춤형 커스텀 어버트먼트로 정밀 적합과 심미-기능을 동시에 구현합니다.",
            tags: ["환자 석고 모형", "Scan Data", "디자인 파일"],
            status: 'order'
        },
        {
            image: "https://denall-esg-jenkins.s3.ap-northeast-2.amazonaws.com/temp-product-6.png", // OneArch
            title: "OneArch(All-on-X)",
            description: "완진 무치악 환자를 위한 All-on-X 솔루션으로 전략 고정성 보철 치료를 지원합니다.",
            tags: [],
            status: 'coming_soon'
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
