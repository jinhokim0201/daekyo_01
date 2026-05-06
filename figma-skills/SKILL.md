---
name: figma-spec
description: Figma 화면설계 스펙 작업 스킬. 리그오브매스 Admin 화면설계 프로젝트에서 사용하는 Figma Plugin API 패턴, 스펙 프레임 구조, 서클 번호 추가, 디스크립션 패널 관리, 팝업 배치 기준, 테이블 컬럼 수정, 반복 실수 방지 체크리스트를 포함. Use when working on Figma spec frames, adding circles/descriptions, modifying tables, creating popup specs, or cloning spec frames.
---

# Figma 스펙 작업 스킬

## 기본 정보
- **Figma 파일 키**: `NWpJqpnd8RfG1FsiiywSpY`
- **작업 페이지**: `└ [26] 리그오브매스 : Admin 영역 [작성중]`
- **페이지 전환 (필수 — 모든 코드 블록 최상단)**:
```javascript
const adminPage = figma.root.children.find(p => p.name.includes('Admin'));
await figma.setCurrentPageAsync(adminPage);
```

---

## 1. 스펙 프레임 구조

### 외부 크기 (전체 공통)
```
w = 2765px,  h = 1645px
```

### 내부 구성 요소 좌표 (스펙 프레임 기준)
| 요소 | x | y | w | h |
|------|---|---|---|---|
| 스펙 헤더 | 0 | 0 | 2765 | 132 |
| 브라우저 컨테이너 | 59 | 150 | 1940 | 1357 |
| 브라우저 크롬 | 0 | 0 | 1940 | 64 |
| GNB | 0 | 0 | 1940 | 97 |
| LNB (사이드바) | 0 | 97 | 269 | 1196 |
| 메인 콘텐츠 | 269 | 97 | ~1671 | 1196 |
| 디스크립션 패널 | 2204 | 199 | 500 | 가변 |

### 좌표 오프셋
```
메인 콘텐츠 절대 y = 150(브라우저) + 64(크롬) + 97(GNB) + 요소_y = 311 + 요소_y
메인 콘텐츠 절대 x = 59(브라우저) + 269(LNB) + 요소_x = 328 + 요소_x
```

---

## 2. 안전한 노드 탐색 헬퍼 (반드시 포함)

```javascript
const SKIP_CH = new Set([
  'TEXT','VECTOR','BOOLEAN_OPERATION','RECTANGLE','ELLIPSE','STAR','POLYGON','LINE'
]);

function findTexts(node, res = []) {
  if (node.type === 'TEXT') { res.push(node); return res; }
  if (!SKIP_CH.has(node.type) && node.children)
    for (const c of node.children) findTexts(c, res);
  return res;
}

function findByText(node, txt) {
  if (node.type === 'TEXT' && node.characters === txt) return node;
  if (!SKIP_CH.has(node.type) && node.children)
    for (const c of node.children) { const r = findByText(c, txt); if (r) return r; }
  return null;
}

function findFrameWhere(node, predicate) {
  if (!SKIP_CH.has(node.type) && node.children) {
    for (const c of node.children) {
      if (c.type === 'FRAME' && predicate(c)) return c;
      const r = findFrameWhere(c, predicate); if (r) return r;
    }
  }
  return null;
}
```

---

## 3. 폰트 로드 (모든 코드 상단에 포함)

```javascript
await figma.loadFontAsync({ family: 'Noto Sans KR', style: 'Regular' });
await figma.loadFontAsync({ family: 'Noto Sans KR', style: 'Medium' });
await figma.loadFontAsync({ family: 'Noto Sans KR', style: 'Bold' });
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' }); // 공백 필수
await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
```

---

## 4. 서클(Circle) 추가 패턴

### 기본 규칙
- ①② → `color: 'red'`
- ③ 이상 → `color: 'Default'`

### 표준 생성 코드
```javascript
const circleData = [
  ['1', 342, 376, 'red'],
  ['2', 342, 424, 'red'],
  ['3', 342, 490, 'Default'],
  // ...
];
const template = figma.getNodeById('TEMPLATE_CIRCLE_ID');
const specFrame = figma.getNodeById('SPEC_FRAME_ID');

for (const [num, cx, cy, color] of circleData) {
  const inst = template.clone();
  specFrame.appendChild(inst);
  inst.x = cx; inst.y = cy;
  if (num === '11') {
    inst.setProperties({ number: '10', color: 'Default' });
    const texts = findTexts(inst);
    await figma.loadFontAsync(texts[0].fontName);
    texts[0].characters = '11';
  } else {
    inst.setProperties({ number: num, color }); // clone 직후 즉시 호출
  }
}
```

### ⚠️ 자주 발생한 실수
- **clone 후 setProperties 미호출 → 모든 서클이 #1로 표시**
- 반드시 `clone()` 직후 바로 `setProperties()` 호출할 것

---

## 5. 디스크립션 패널

### 구조
```
descPanel (x=2204, y=199, w=500)
├── Title (h=40)
├── description ① (h=110~129)
│   ├── Header: number 서클 + 제목 텍스트
│   └── Body: "• 내용1\n• 내용2\n• 내용3"
├── description ② ...
```

### 번호로 항목 찾기
```javascript
function findDescByNumber(panel, num) {
  for (const entry of panel.children || []) {
    if (findTexts(entry).some(t => t.characters === String(num))) return entry;
  }
  return null;
}
```

### 새 항목 추가
```javascript
const lastDesc = descPanel.children[descPanel.children.length - 1];
const newDesc = lastDesc.clone();
descPanel.appendChild(newDesc);
newDesc.y = lastDesc.y + lastDesc.height;
descPanel.resize(500, newDesc.y + newDesc.height);
// 텍스트 수정
findTexts(newDesc).forEach(t => {
  if (t.characters === '기존번호') t.characters = '새번호';
  if (t.characters.includes('기존제목')) t.characters = '새제목';
  if (t.characters.startsWith('•')) t.characters = '• 내용1\n• 내용2\n• 내용3';
});
```

### ⚠️ DESC 표현 기준
| 상황 | 올바른 표현 | 잘못된 표현 |
|------|------------|------------|
| 읽기 전용 셀 | "주차별 성적 조회 셀" | "주차별 성적 입력 셀" |
| 발표 전 버튼 | "결과 발표 버튼" | "최종결과발표 안내 메시지" |
| 발표 후 | "최종결과발표 안내 메시지" | "결과 발표 버튼" |

---

## 6. 테이블 컬럼 추가

### 사전 확인 — 너비 오버플로우 방지
```javascript
// 신규 컬럼 너비 + 기존 총 너비 ≤ 테이블 프레임 width(보통 1595)
```

### 컬럼 삽입 패턴
```javascript
const INSERT_X = 432; // 삽입 위치
const SHIFT = 120;    // 이후 컬럼 이동량

// 헤더 shift
for (const c of headerRow.children || [])
  if (c.x >= INSERT_X) c.x += SHIFT;

// 데이터 행 shift + 신규 셀 추가
for (const rowId of dataRowIds) {
  const row = figma.getNodeById(rowId);
  for (const c of row.children || [])
    if (c.x >= INSERT_X) c.x += SHIFT;
  const txt = figma.createText();
  row.appendChild(txt);
  txt.fontName = { family: 'Inter', style: 'Regular' };
  txt.fontSize = 14; txt.x = INSERT_X; txt.y = 19;
  txt.characters = '데이터'; txt.resize(SHIFT, 27);
}
```

### 빈 상태 처리 (미발표 화면)
```javascript
// 데이터 행 삭제 후 빈 메시지
const toRemove = table.children.filter(c => c.y >= HEADER_H);
toRemove.forEach(c => c.remove());
// 빈 상태 행 추가 → "조회 결과가 없습니다."
```
> ⚠️ 미발표 화면에 발표 완료 데이터를 그대로 clone하지 말 것

---

## 7. 팝업 스펙 기준

### 등록된 팝업 목록
| 스펙명 | 노드 ID |
|--------|---------|
| SPEC_POP01_회원상세팝업 | 30:275 |
| SPEC_POP02_학습분석멘트팝업 | 32:293 |
| SPEC_POP03_리그생성팝업 | 33:311 |
| SPEC_POP05_01_총학생수팝업 | 372:879 |
| SPEC_POP05_02_신청완료팝업 | 372:1279 |
| SPEC_POP05_03_신청대기팝업 | 372:1657 |
| SPEC_POP05_04_미신청팝업 | 372:2025 |
| SPEC_POP06_알림톡발송이력팝업 | 377:911 |
| SPEC_POP_선물등록팝업 | 756:803 |

### 팝업 유형
- **전체 오버레이** (POP01~03): 브라우저 page content 내부에 팝업 UI 배치
- **소형 모달** (POP05, POP06): 스펙 프레임의 직접 자식으로 브라우저 위에 overlay

### 소형 모달 중앙 배치 공식
```javascript
function calcModalPosition(modalW, modalH) {
  return {
    x: Math.round(1029 - modalW / 2), // 브라우저 중심 x=1029
    y: Math.round(829  - modalH / 2)  // 브라우저 중심 y=829
  };
}
// 실제 예: w=540 → x=759, w=500 → x=779
```

### ⚠️ 팝업 누락 체크
- [ ] 메인 화면 버튼 클릭으로 열리는 팝업 목록 파악
- [ ] 각 팝업에 대응하는 SPEC_POP 프레임 존재 여부 확인
- [ ] 메인 스펙 DESC에 "클릭 시 SPEC_POPXX 호출" 명시

---

## 8. 스펙 Clone 패턴

```javascript
const clone = srcSpec.clone();
adminPage.appendChild(clone);
clone.name = 'SPEC_XX_이름';
clone.x = srcSpec.x + srcSpec.width + 80;
clone.y = srcSpec.y;
```

### 버튼 active/inactive 교환
```javascript
const DARK = [{ type:'SOLID', color:{ r:0.173, g:0.373, b:0.478 } }];
const WHITE = [{ type:'SOLID', color:{ r:1, g:1, b:1 } }];
btnActive.fills = DARK;
btnInactive.fills = WHITE;
```
> ⚠️ 버튼은 반드시 독립 FRAME으로 분리 (하나의 컨테이너에 묶여 있으면 분리 필요)

---

## 9. 작업 완료 체크리스트

- [ ] 서클 번호가 의도한 번호로 표시되는가? (스크린샷 확인)
- [ ] 컬럼 총 너비가 테이블 프레임 너비를 초과하지 않는가?
- [ ] 화면 상태(발표 전/후)에 맞는 데이터/DESC인가?
- [ ] 누락된 팝업 SPEC이 없는가?
- [ ] 각 버튼이 독립 FRAME으로 분리되어 있는가?
- [ ] clone 후 상태(버튼, 데이터, DESC)가 올바르게 수정되었는가?
