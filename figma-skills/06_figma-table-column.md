# 스킬: figma-table-column
## 테이블 컬럼 추가·수정 패턴

---

### 이 프로젝트의 테이블 구조 유형

#### 유형 A — Flat 구조 (SPEC_08 결과관리)
- 하나의 테이블 FRAME 안에 모든 셀이 자식으로 평면 배치
- 각 셀: `{ x: 컬럼_x, y: 행_y, w: 컬럼_w, h: 행_h }`
- 헤더 행: y=0, 데이터 행: y=30, 64, 100, 136...

#### 유형 B — Row Frame 구조 (SPEC_04 회원관리)
- 각 행이 별도 FRAME으로 분리
- 헤더 FRAME + 데이터 FRAME들이 나란히 배치
- 각 행 내부에 TEXT/FRAME 노드가 x 좌표로 컬럼 구분

---

### 컬럼 추가 전 필수 사전 확인 — 너비 오버플로우 방지
```javascript
// 테이블 총 컬럼 너비 합산 확인
const headerRow = figma.getNodeById('HEADER_ROW_ID');
let totalW = 0;
for (const c of headerRow.children || []) {
  if (c.type === 'TEXT') totalW = Math.max(totalW, c.x + c.width);
}
const tableFrameW = tableFrame.width; // e.g. 1595
const availableW = tableFrameW - totalW;
console.log(`사용 가능 너비: ${availableW}px`); // 신규 컬럼 너비와 비교
```
> ⚠️ 신규 컬럼 너비 > 사용 가능 너비이면 기존 컬럼 축소 필요

---

### 컬럼 삽입 패턴 (삽입 후 이후 컬럼 shift)
```javascript
const INSERT_X = 432;   // 삽입 위치 (이름 컬럼 끝)
const NEW_W = 120;      // 신규 컬럼 너비
const SHIFT = NEW_W;    // 이후 컬럼 이동량

// 1. 헤더 행 shift
for (const child of headerRow.children || []) {
  if (child.x >= INSERT_X) child.x += SHIFT;
}

// 2. 헤더 신규 셀 추가
const hdrTxt = figma.createText();
headerRow.appendChild(hdrTxt);
hdrTxt.fontName = { family: 'Inter', style: 'Semi Bold' };
hdrTxt.fontSize = 14;
hdrTxt.characters = '회원번호';
hdrTxt.x = INSERT_X;
hdrTxt.y = 16;
hdrTxt.resize(NEW_W, 27);

// 3. 각 데이터 행 shift + 신규 셀 추가
const dataRows = ['ROW1_ID', 'ROW2_ID', 'ROW3_ID'];
const sampleData = ['0051447600', '0058166320', '0050820560'];

for (let i = 0; i < dataRows.length; i++) {
  const row = figma.getNodeById(dataRows[i]);
  for (const child of row.children || []) {
    if (child.x >= INSERT_X) child.x += SHIFT;
  }
  const dataTxt = figma.createText();
  row.appendChild(dataTxt);
  dataTxt.fontName = { family: 'Inter', style: 'Regular' };
  dataTxt.fontSize = 14;
  dataTxt.characters = sampleData[i];
  dataTxt.x = INSERT_X;
  dataTxt.y = 19;
  dataTxt.resize(NEW_W, 27);
}
```

---

### 데이터 행 제거 (빈 상태로 만들기)
```javascript
// Flat 구조: y >= 헤더높이인 셀 전부 삭제
const headerH = 64;
const toRemove = (table.children || []).filter(c => c.y >= headerH);
for (const c of toRemove) c.remove();
table.resize(table.width, headerH + 48); // 빈 상태 행 높이 포함

// 빈 상태 메시지 추가
const emptyRow = figma.createFrame();
table.appendChild(emptyRow);
emptyRow.x = 0;
emptyRow.y = headerH;
emptyRow.resize(table.width, 48);
emptyRow.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

const emptyTxt = figma.createText();
emptyRow.appendChild(emptyTxt);
emptyTxt.fontName = { family: 'Noto Sans KR', style: 'Regular' };
emptyTxt.fontSize = 13;
emptyTxt.characters = '조회 결과가 없습니다.';
emptyTxt.fills = [{ type: 'SOLID', color: { r: 0.6, g: 0.6, b: 0.6 } }];
emptyTxt.textAlignHorizontal = 'CENTER';
emptyTxt.resize(table.width, 48);
emptyTxt.y = (48 - 13) / 2;
```

---

### ⚠️ 주의사항
- 미발표(EMPTY) 화면에 발표 완료 테이블을 clone 시 데이터 행 반드시 제거
- 테이블 clone 후 상태 구분:
  - 발표 완료 → 데이터 행 유지
  - 미발표 → 데이터 행 제거 + 빈 상태 메시지
