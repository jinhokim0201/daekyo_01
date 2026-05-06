# 스킬: figma-desc-panel
## 디스크립션 패널 구조 및 관리

---

### 패널 위치 (스펙 프레임 기준)
```
x = 2204, y = 199, w = 500, h = 가변
```

### 내부 구조
```
descPanel (FRAME, w=500)
├── Title (FRAME, h=40)
│   └── TEXT "Description"
├── description ① (FRAME, h=110~129)
│   ├── Header (FRAME, h=24)
│   │   ├── number (INSTANCE) ← 서클 컴포넌트
│   │   └── TEXT "제목"
│   └── Body (FRAME, h=38~57)
│       └── TEXT "• 내용1\n• 내용2\n• 내용3"
├── description ② (FRAME)
│   └── ...
```

---

### 디스크립션 추가 — 기존 항목 clone 후 수정 패턴
```javascript
// 마지막 desc 항목을 clone해서 새 항목 생성
const lastDesc = descPanel.children[descPanel.children.length - 1];
const newDesc = lastDesc.clone();
descPanel.appendChild(newDesc);
newDesc.y = lastDesc.y + lastDesc.height;
descPanel.resize(500, newDesc.y + newDesc.height); // 패널 높이 조정

// 텍스트 수정
const texts = findTexts(newDesc);
for (const t of texts) {
  if (t.characters === '기존번호') t.characters = '새번호';
  if (t.characters.includes('기존제목')) t.characters = '새제목';
  if (t.characters.startsWith('•')) t.characters = '• 내용1\n• 내용2\n• 내용3';
}
```

### 번호로 특정 desc 찾기
```javascript
function findDescByNumber(panel, num) {
  for (const entry of panel.children || []) {
    const texts = findTexts(entry);
    if (texts.some(t => t.characters === String(num))) return entry;
  }
  return null;
}
const desc3 = findDescByNumber(descPanel, 3);
```

---

### 기존 패널 전체 교체 패턴 (다른 스펙에서 clone)
```javascript
// 1. 기존 desc 항목 전부 삭제
const oldChildren = [...(descPanel.children || [])];
for (const c of oldChildren) c.remove();

// 2. 소스 스펙 desc 패널에서 항목들 clone
const srcPanel = figma.getNodeById('SOURCE_PANEL_ID');
for (const entry of srcPanel.children || []) {
  const clone = entry.clone();
  descPanel.appendChild(clone);
  clone.x = entry.x;
  clone.y = entry.y;
}

// 3. 패널 높이 재조정
descPanel.resize(500, 목표_높이);
```

---

### ⚠️ 주의사항
- DESC 제목과 내용은 화면 상태(발표 전/후, 미발표/발표완료)에 맞게 구분 작성
  - ❌ "주차별 성적 입력 셀" (수정 가능한 느낌)
  - ✅ "주차별 성적 조회 셀" (읽기 전용 명시)
  - ❌ "결과 발표 버튼" (발표 완료 후 상태에서)
  - ✅ "최종결과발표 안내 메시지" (발표 완료 후 상태)
- Body 텍스트는 `\n` 으로 줄바꿈, 각 줄 앞에 `•` 불릿 포함
- 항목 높이: 내용 3줄 = h=129, 내용 2줄 = h=110
