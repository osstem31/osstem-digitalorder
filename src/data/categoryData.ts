// 하위 카테고리별 수량 정의 (합계가 100~500 사이가 되도록 구성)
export const SUB_CATEGORY_COUNTS: Record<string, Record<string, number>> = {
    '위생용품': {
        '가운/진료복': 42,
        '감염방지커버/베리어필름': 35,
        '거즈/솜/에이프런/1회용품': 88,
        '공포/소독포/수술용품': 45,
        '글러브': 92,
        '기타 위생용품/일반서적': 15,
        '니들/주사기/수액세트/밴드': 64,
        '마스크/페이스실드': 78,
        '방사선 관련 용품': 25,
        '봉합침/봉합사/스템플러': 18,
        '석션팁/석션홀더': 22,
        '소독비닐/테이프/실링기': 14,
        '소독제/에탄올/액체류': 36,
        '에이프런/에이프런홀더': 19,
        '카트/수술준비대/수납장': 12
    },
    '기구': { '기구수납/기타': 28, '수술기구 KIT': 34, '외과용 기구': 85, '진단용 기구': 112 },
    '의약품': { '진통제/항생제/스테로이드': 45, '지혈제': 22, '연고류/크림류': 38, '식염수/증류수/영양제': 56, '시약/기타': 18, '소독제/구내염/치주치료제': 42, '보톡스/필러/피부미용': 25, '미백제': 15, '마취제/냉각spray/해독제': 30 },
    '장비': { '혈당/혈압계': 48, '현미경': 12, '컴프레서/드라이어': 25, '체온계': 34, '체어용품/샤프닝': 42, '전기 메스기/모터': 18, '영상장비': 22, '에어폴리셔': 15, '수관세척기': 10, '소독/세척기': 28, '멸균기': 24, '마취기': 8, '루페/라이트/무영등': 35, '레이저/턱관절': 12, '기타': 20, '공기 살균기': 15, 'PRF/PRP/생화학분석기': 14, 'AED/PMS': 18 },
    '메디컬': { '기구 및 병원용품': 120, '원내의약품/에스테틱': 85, '의료소모품': 145, '의료장비': 62 },
    '생활가전': { 'IT/컴퓨터': 45, '디지털/가전': 68, '사무용품': 32, '생활용품': 54, '식품': 22, '건강기능식품': 48, '취미용품': 15, '뷰티': 28, '가구/침구': 35, '패션/잡화': 42, '유아용품': 18, '반려동물용품': 12 }
};

// 상위 카테고리 수량 합계 계산
export const CATEGORY_TOTALS = Object.entries(SUB_CATEGORY_COUNTS).reduce((acc, [key, subs]) => {
    acc[key] = Object.values(subs).reduce((sum, count) => sum + count, 0);
    return acc;
}, {} as Record<string, number>);

export const BRANDS = [
    "3M Medical", "Osstem Implant", "GE Healthcare", "Philips Medical", "Siemens Healthineers",
    "Dentsply Sirona", "Henry Schein", "Cardinal Health", "Baxter", "Medtronic",
    "Johnson & Johnson", "Stryker", "B.Braun", " Zimmer Biomet", "Smith & Nephew",
    "Terumo", "Olympus", "Fujifilm Medical", "Shimadzu", "Hologic", "Varian",
    "Carestream", "Danaher", "Align Technology", "Straumann", "Planmeca",
    "Envista", "Ivoclar Vivadent", "Kuraray", "GC Corporation", "Kulzer",
    "Zhermack", "NSK", "W&H", "KaVo", "Morita", "Acteon", "A-dec", "Midmark"
];

// 브랜드별 임의 수량 (합계가 일관성 있도록, 최소 1개 보장)
export const BRAND_COUNTS: Record<string, number> = BRANDS.reduce((acc, brand, idx) => {
    // 0이 되지 않도록 최소 1 이상 할당
    acc[brand] = [195, 10, 27, 4, 29, 18, 15, 30, 28, 34, 21, 52, 7, 48, 11, 34][idx] || 1;
    return acc;
}, {} as Record<string, number>);
