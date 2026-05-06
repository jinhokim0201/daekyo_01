# 스킬: figma-circle-numbering
## 넘버 서클 추가 및 수정 패턴

---

### 기본 사용법
```javascript
// 컴포넌트에서 clone 후 setProperties 로 번호/색상 설정
const template = figma.getNodeById('CIRCLE_INSTANCE_ID');
const inst = template.clone();
parentFrame.appendChild(inst);
inst.x = cx;
inst.y = cy;
inst.setProperties({ number: 'N', color: 'Default' }); // N = '1'~'10'
```

### 색상 규칙
| 번호 | color 값 |
|------|----------|
| ①② | `'red'` |
| ③ 이상 | `'Default'` |

```javascript
const color = (num <= 2) ? 'red' : 'Default';
inst.setProperties({ number: String(num), color });
```

---

### ⚠️ 11번 이상 우회법 (컴포넌트가 1~10만 지원)
```javascript
// 1단계: number='10'으로 기본 설정
inst.setProperties({ number: '10', color: 'Default' });

// 2단계: 내부 TEXT 노드를 직접 override
function findTexts(node, res = []) {
  if (node.type === 'TEXT') { res.push(node); return res; }
  if (!SKIP_CH.has(node.type) && node.children)
    for (const c of node.children) findTexts(c, res);
  return res;
}
const texts = findTexts(inst);
await figma.loadFontAsync(texts[0].fontName);
texts[0].characters = '11'; // 원하는 숫자로 변경
```

---

### ⚠️ 자주 발생한 실수 — 서클 번호가 모두 #1로 표시되는 문제
- **원인**: `clone()` 직후 `setProperties()` 미호출 → 기본값(#1)으로 고정됨
- **해결**: clone 후 반드시 즉시 `setProperties` 호출
- **검증**: 생성 후 `log.push(`Circle ${num} -> ${inst.id}`)` 로 확인

```javascript
// ✅ 올바른 패턴
for (const [num, cx, cy, color] of circleData) {
  const inst = template.clone();
  parentFrame.appendChild(inst);
  inst.x = cx;
  inst.y = cy;
  inst.setProperties({ number: num, color }); // ← clone 직후 바로 호출
}
```

---

### 서클 한 번에 생성하는 표준 패턴
```javascript
const circleData = [
  ['1',  342, 376, 'red'],
  ['2',  342, 424, 'red'],
  ['3',  342, 490, 'Default'],
  // ...
];

const template = figma.getNodeById('TEMPLATE_CIRCLE_ID');
const specFrame = figma.getNodeById('SPEC_FRAME_ID');

for (const [num, cx, cy, color] of circleData) {
  const inst = template.clone();
  specFrame.appendChild(inst);
  inst.x = cx;
  inst.y = cy;
  if (num === '11') {
    inst.setProperties({ number: '10', color: 'Default' });
    const texts = findTexts(inst);
    await figma.loadFontAsync(texts[0].fontName);
    texts[0].characters = '11';
  } else {
    inst.setProperties({ number: num, color });
  }
}
```
