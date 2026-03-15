'use client';

import React, { useState } from 'react';

// Chevron Icon for Accordion
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg 
    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
    fill="none" viewBox="0 0 24 24" stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  isRequired?: boolean;
  isDisabled?: boolean;
}

const AccordionItem = ({ title, isOpen, onToggle, children, isRequired = false, isDisabled = false }: AccordionItemProps) => {
  return (
    <div className={`border border-[#E0E0E0] rounded-[5px] mb-4 overflow-hidden transition-opacity duration-200 ${isDisabled ? 'opacity-50 pointer-events-none bg-gray-100' : 'bg-white'}`}>
      <button 
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <h2 className={`text-[18px] font-bold ${isDisabled ? 'text-gray-400' : 'text-[#212529]'}`}>{title}</h2>
          {isRequired && <span className="text-[#EB6100] text-[18px] font-bold">*</span>}
        </div>
        {!isDisabled && <ChevronIcon isOpen={isOpen} />}
      </button>
      
      {isOpen && !isDisabled && (
        <div className="px-6 pb-6 pt-2 border-t border-[#E0E0E0]">
          {children}
        </div>
      )}
    </div>
  );
};

export default function OneGuideOrderDetailPage() {
  // === State Management ===
  // 1. Multiple Accordion State Management
  const [openSections, setOpenSections] = useState<string[]>(['serviceType', 'additionalProducts', 'patientInfo', 'toothSelection']);
  
  // 2. 서비스 유형 선택 (단일 선택, 기본값 없음)
  const [serviceType, setServiceType] = useState<string>('');
  
  // 3. 함께 주문 가능한 제품 (다중 선택)
  const [additionalProducts, setAdditionalProducts] = useState<string[]>([]);
  
  // 4. 환자 정보 (환자명만)
  const [patientName, setPatientName] = useState<string>('');
  
  // 5. 치식 상태 (다중 선택) - 11~18, 21~28, 31~38, 41~48 (영구치)
  const [selectedTeeth, setSelectedTeeth] = useState<number[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleAdditionalProductToggle = (product: string) => {
    setAdditionalProducts(prev => 
      prev.includes(product) 
        ? prev.filter(p => p !== product) 
        : [...prev, product]
    );
  };

  const handleToothToggle = (toothNum: number) => {
    setSelectedTeeth(prev => 
      prev.includes(toothNum)
        ? prev.filter(t => t !== toothNum)
        : [...prev, toothNum]
    );
  };

  // 치아 번호 배열 생성
  const upperRightTeeth = [18, 17, 16, 15, 14, 13, 12, 11];
  const upperLeftTeeth = [21, 22, 23, 24, 25, 26, 27, 28];
  const lowerRightTeeth = [48, 47, 46, 45, 44, 43, 42, 41];
  const lowerLeftTeeth = [31, 32, 33, 34, 35, 36, 37, 38];

  // 하단 영역(파일 업로드 ~ 기타) 활성화 상태
  const isLowerSectionsEnabled = serviceType !== '';

  const handleServiceTypeSelect = (type: string) => {
    setServiceType(type);
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen py-10 w-full">
      <div className="max-w-[1500px] w-full mx-auto px-4">

        {/* 본문 레이아웃: 좌측 입력(75%) / 우측 요약(25%) */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* ======================= 좌측 입력 및 선택 영역 ======================= */}
          <div className="w-full lg:w-[75%] flex flex-col gap-0">
            
            {/* 1. 서비스 유형 */}
            <AccordionItem 
              title="서비스 유형 선택" 
              isOpen={openSections.includes('serviceType')} 
              onToggle={() => toggleSection('serviceType')}
              isRequired
            >
              <div className="flex flex-col gap-3 pt-2">
                {/* 상단: 상품 표기 안내 영역 */}
                <div className="px-5 py-4 bg-[#FFF8F3] border border-[#FBE6DB] rounded-[5px] flex items-center justify-between text-[#212529]">
                  <span className="font-bold">선택 상품</span>
                  <span className="font-bold text-[#EB6100]">OneGuide</span>
                </div>
                
                {/* 하단: 실제 유형 선택 버튼 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['제작', '디자인', '프린팅'].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleServiceTypeSelect(type)}
                      className={`py-4 rounded-[5px] border ${
                        serviceType === type 
                          ? 'border-[#EB6100] bg-white text-[#EB6100] font-bold shadow-sm' 
                          : 'border-[#E0E0E0] bg-white text-[#666666] hover:border-[#CCCCCC]'
                      } transition-all text-center`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </AccordionItem>

            {/* 2. 함께 주문 가능한 제품 */}
            <AccordionItem 
              title="함께 주문 가능한 제품" 
              isOpen={openSections.includes('additionalProducts')} 
              onToggle={() => toggleSection('additionalProducts')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {['OneFit', 'Temporary Crown'].map((product) => (
                  <label 
                    key={product}
                    className={`flex items-center gap-3 p-4 rounded-[5px] border cursor-pointer transition-colors ${
                      additionalProducts.includes(product)
                        ? 'border-[#EB6100] bg-[#FFF8F3]'
                        : 'border-[#E0E0E0] bg-white hover:bg-gray-50'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 cursor-pointer accent-[#EB6100]"
                      checked={additionalProducts.includes(product)}
                      onChange={() => handleAdditionalProductToggle(product)}
                    />
                    <span className={`font-medium ${additionalProducts.includes(product) ? 'text-[#EB6100]' : 'text-[#333333]'}`}>
                      {product}
                    </span>
                  </label>
                ))}
              </div>
            </AccordionItem>

            {/* 3. 환자 정보 */}
            <AccordionItem 
              title="환자 정보 입력" 
              isOpen={openSections.includes('patientInfo')} 
              onToggle={() => toggleSection('patientInfo')}
              isRequired
            >
              <div className="flex flex-col gap-2 pt-2">
                <input 
                  type="text" 
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="border border-[#E0E0E0] p-3 rounded-[5px] focus:outline-none focus:border-[#EB6100] max-w-[400px] transition-colors" 
                  placeholder="환자명을 입력해주세요." 
                />
              </div>
            </AccordionItem>

            {/* 4. 치식 선택 */}
            <AccordionItem 
              title="치식 선택" 
              isOpen={openSections.includes('toothSelection')} 
              onToggle={() => toggleSection('toothSelection')}
              isRequired
            >
              <div className="flex flex-col items-center pt-6 pb-4">
                {/* 상악 */}
                <div className="flex items-end justify-center gap-2 mb-2 pb-6 border-b-2 border-dashed border-gray-200 w-full max-w-[800px]">
                  {/* 상악 우측 (18~11) */}
                  <div className="flex gap-1">
                    {upperRightTeeth.map(num => (
                      <button 
                        key={num} 
                        onClick={() => handleToothToggle(num)}
                        className={`w-12 h-16 flex flex-col items-center justify-end rounded-t-lg border-2 ${
                          selectedTeeth.includes(num) ? 'border-[#EB6100] bg-[#FFF8F3]' : 'border-transparent hover:bg-gray-100'
                        } transition-colors`}
                      >
                        <div className={`w-8 h-8 rounded-full mb-1 flex items-center justify-center ${selectedTeeth.includes(num) ? 'bg-[#EB6100] text-white' : 'bg-gray-200 text-gray-400'}`}>🦷</div>
                        <span className={`text-[13px] font-bold ${selectedTeeth.includes(num) ? 'text-[#EB6100]' : 'text-[#666666]'}`}>{num}</span>
                      </button>
                    ))}
                  </div>
                  {/* Center Line Marker */}
                  <div className="h-20 w-[2px] bg-gray-300 mx-1"></div>
                  {/* 상악 좌측 (21~28) */}
                  <div className="flex gap-1">
                    {upperLeftTeeth.map(num => (
                      <button 
                        key={num} 
                        onClick={() => handleToothToggle(num)}
                        className={`w-12 h-16 flex flex-col items-center justify-end rounded-t-lg border-2 ${
                          selectedTeeth.includes(num) ? 'border-[#EB6100] bg-[#FFF8F3]' : 'border-transparent hover:bg-gray-100'
                        } transition-colors`}
                      >
                        <div className={`w-8 h-8 rounded-full mb-1 flex items-center justify-center ${selectedTeeth.includes(num) ? 'bg-[#EB6100] text-white' : 'bg-gray-200 text-gray-400'}`}>🦷</div>
                        <span className={`text-[13px] font-bold ${selectedTeeth.includes(num) ? 'text-[#EB6100]' : 'text-[#666666]'}`}>{num}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 하악 */}
                <div className="flex items-start justify-center gap-2 pt-2 w-full max-w-[800px]">
                  {/* 하악 우측 (48~41) */}
                  <div className="flex gap-1">
                    {lowerRightTeeth.map(num => (
                      <button 
                        key={num} 
                        onClick={() => handleToothToggle(num)}
                        className={`w-12 h-16 flex flex-col items-center justify-start rounded-b-lg border-2 ${
                          selectedTeeth.includes(num) ? 'border-[#EB6100] bg-[#FFF8F3]' : 'border-transparent hover:bg-gray-100'
                        } transition-colors`}
                      >
                        <span className={`text-[13px] font-bold mt-1 ${selectedTeeth.includes(num) ? 'text-[#EB6100]' : 'text-[#666666]'}`}>{num}</span>
                        <div className={`w-8 h-8 rounded-full mt-1 flex items-center justify-center ${selectedTeeth.includes(num) ? 'bg-[#EB6100] text-white' : 'bg-gray-200 text-gray-400'}`}>🦷</div>
                      </button>
                    ))}
                  </div>
                  {/* Center Line Marker */}
                  <div className="h-20 w-[2px] bg-gray-300 mx-1"></div>
                  {/* 하악 좌측 (31~38) */}
                  <div className="flex gap-1">
                    {lowerLeftTeeth.map(num => (
                      <button 
                        key={num} 
                        onClick={() => handleToothToggle(num)}
                        className={`w-12 h-16 flex flex-col items-center justify-start rounded-b-lg border-2 ${
                          selectedTeeth.includes(num) ? 'border-[#EB6100] bg-[#FFF8F3]' : 'border-transparent hover:bg-gray-100'
                        } transition-colors`}
                      >
                        <span className={`text-[13px] font-bold mt-1 ${selectedTeeth.includes(num) ? 'text-[#EB6100]' : 'text-[#666666]'}`}>{num}</span>
                        <div className={`w-8 h-8 rounded-full mt-1 flex items-center justify-center ${selectedTeeth.includes(num) ? 'bg-[#EB6100] text-white' : 'bg-gray-200 text-gray-400'}`}>🦷</div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {selectedTeeth.length > 0 && (
                  <div className="mt-8 px-6 py-3 bg-[#FFF8F3] rounded-[5px] text-[#EB6100] font-bold border border-[#FBE6DB]">
                    선택된 치아: {selectedTeeth.sort().join(', ')}
                  </div>
                )}
              </div>
            </AccordionItem>

            {/* 5. 파일 업로드 */}
            <AccordionItem 
              title="파일 업로드 (CT/Scan Data 등)" 
              isOpen={openSections.includes('fileUpload')} 
              onToggle={() => toggleSection('fileUpload')}
              isRequired
              isDisabled={!isLowerSectionsEnabled}
            >
              <div className="p-10 border-2 border-dashed border-[#CCCCCC] rounded-[5px] flex flex-col items-center justify-center text-[#666666] gap-4 bg-[#FAFAFA] hover:bg-gray-50 transition-colors cursor-pointer">
                <svg className="w-12 h-12 text-[#999999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <div className="text-center">
                  <p className="text-[16px] mb-1">파일을 여기로 드래그 하거나 <span className="font-bold text-[#EB6100] underline">파일 선택</span>을 클릭하세요.</p>
                  <p className="text-[13px] text-[#999999]">(DICOM, STL 파일 형식만 지원합니다)</p>
                </div>
              </div>
            </AccordionItem>

            {/* 6. Implant 사양 */}
            <AccordionItem 
              title="Implant 사양 선택" 
              isOpen={openSections.includes('implant')} 
              onToggle={() => toggleSection('implant')}
              isDisabled={!isLowerSectionsEnabled}
            >
              <div className="p-4 bg-gray-50 rounded text-gray-500 text-sm">드롭다운 및 옵션 리스트 UI 예정</div>
            </AccordionItem>

            {/* 7. Abutment 사양 */}
            <AccordionItem 
              title="Abutment 사양 선택" 
              isOpen={openSections.includes('abutment')} 
              onToggle={() => toggleSection('abutment')}
              isDisabled={!isLowerSectionsEnabled}
            >
              <div className="p-4 bg-gray-50 rounded text-gray-500 text-sm">드롭다운 및 옵션 리스트 UI 예정</div>
            </AccordionItem>

            {/* 8. Temporary Crown 사양 */}
            <AccordionItem 
              title="Temporary Crown 사양 선택" 
              isOpen={openSections.includes('tempCrown')} 
              onToggle={() => toggleSection('tempCrown')}
              isDisabled={!isLowerSectionsEnabled}
            >
              <div className="p-4 bg-gray-50 rounded text-gray-500 text-sm">드롭다운 및 옵션 리스트 UI 예정</div>
            </AccordionItem>

            {/* 9. 수술 예정일 및 특이사항 */}
            <AccordionItem 
              title="수술 예정일 및 기타 요청사항" 
              isOpen={openSections.includes('dateRequest')} 
              onToggle={() => toggleSection('dateRequest')}
              isDisabled={!isLowerSectionsEnabled}
            >
              <div className="flex flex-col gap-6 pt-2">
                <div className="flex flex-col gap-2">
                  <label className="text-[15px] font-bold text-[#212529]">수술 예정일 지정</label>
                  <input type="date" className="border border-[#E0E0E0] p-3 rounded-[5px] w-full max-w-[300px] focus:outline-none focus:border-[#EB6100]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[15px] font-bold text-[#212529]">기타 요청사항</label>
                  <textarea className="border border-[#E0E0E0] p-3 rounded-[5px] min-h-[120px] focus:outline-none focus:border-[#EB6100] resize-y" placeholder="기타 전달 사항을 자유롭게 입력해주세요." />
                </div>
              </div>
            </AccordionItem>

          </div>


          {/* ======================= 우측 주문 요약 영역 ======================= */}
          <div className="w-full lg:w-[25%] flex-shrink-0">
            {/* Sticky Container */}
            <div className="sticky top-[110px] bg-white border border-[#E0E0E0] rounded-[5px] p-6 shadow-sm">
              <h3 className="text-[20px] font-bold text-[#212529] mb-4 border-b pb-4 border-[#EEEEEE]">주문 요약</h3>
              
              <div className="flex flex-col gap-5 min-h-[180px]">
                {/* Summary Items */}
                <div className="flex justify-between items-start">
                  <span className="text-[14px] text-[#666666]">선택된 서비스</span>
                  <span className="text-[14px] font-bold text-[#212529] text-right">{serviceType || '-'}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-[14px] text-[#666666]">추가 옵션</span>
                  <div className="text-[14px] font-bold text-[#212529] text-right flex flex-col items-end">
                    {additionalProducts.length > 0 
                      ? additionalProducts.map((p, idx) => <span key={idx}>{p}</span>)
                      : '-'
                    }
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-[14px] text-[#666666]">환자명</span>
                  <span className="text-[14px] font-bold text-[#212529] text-right">{patientName || '-'}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-[14px] text-[#666666]">선택 치식 수</span>
                  <span className="text-[14px] font-bold text-[#212529] text-right">
                    {selectedTeeth.length > 0 ? `${selectedTeeth.length}개` : '-'}
                  </span>
                </div>
              </div>

              {/* Total Price & Button */}
              <div className="mt-6 pt-5 border-t border-[#EEEEEE]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[16px] font-bold text-[#212529]">예상 금액</span>
                  <span className="text-[22px] font-bold text-[#EB6100]">영업사원 문의</span>
                </div>

                <div className="flex flex-col gap-2">
                  <button className="w-full py-4 text-center bg-[#EB6100] text-white font-bold rounded-[5px] hover:bg-[#D55600] transition-colors text-[18px]">
                    주문하기
                  </button>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
