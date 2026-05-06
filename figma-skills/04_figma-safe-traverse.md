# 스킬: figma-safe-traverse
## 노드 탐색 안전 헬퍼 함수

---

### 문제
Figma Plugin API에서 `TEXT`, `RECTANGLE` 등 리프 노드에 `.children`을 접근하면 TypeError 발생:
```
TypeError: node.children: no such property 'children' on TEXT node
```

### 해결 — SKIP_CH 세트 + 안전한 findTexts
모든 Figma 코드 블록 상단에 아래 헬퍼를 포함할 것:

```javascript
// 반드시 모든 코드 블록에 포함
const SKIP_CH = new Set([
  'TEXT', 'VECTOR', 'BOOLEAN_OPERATION',
  'RECTANGLE', 'ELLIPSE', 'STAR', 'POLYGON', 'LINE'
]);

// TEXT 노드 재귀 수집
function findTexts(node, res = []) {
  if (node.type === 'TEXT') { res.push(node); return res; }
  if (!SKIP_CH.has(node.type) && node.children)
    for (const c of node.children) findTexts(c, res);
  return res;
}

// 특정 텍스트를 포함하는 노드 탐색
function findByText(node, txt) {
  if (node.type === 'TEXT' && node.characters === txt) return node;
  if (!SKIP_CH.has(node.type) && node.children)
    for (const c of node.children) {
      const r = findByText(c, txt);
      if (r) return r;
    }
  return null;
}

// 조건에 맞는 FRAME 탐색
function findFrameWhere(node, predicate) {
  if (!SKIP_CH.has(node.type) && node.children) {
    for (const c of node.children) {
      if (c.type === 'FRAME' && predicate(c)) return c;
      const r = findFrameWhere(c, predicate);
      if (r) return r;
    }
  }
  return null;
}
```

---

### 사용 예시

```javascript
// 특정 텍스트를 가진 노드 찾기
const titleNode = findByText(specFrame, '써밋 리그 결과 관리');

// 특정 크기의 프레임 찾기
const btnFrame = findFrameWhere(specFrame, f => f.width === 118 && f.height === 30);

// 모든 TEXT 수집 후 수정
const allTexts = findTexts(descEntry);
for (const t of allTexts) {
  if (t.characters.includes('구제하기')) t.characters = '구제완료일시';
}
```

---

### 노드 안전 삭제
```javascript
// ID 기반 삭제 시 try-catch 필수
const toRemove = ['37:820', '37:823', '37:826'];
for (const id of toRemove) {
  try {
    const node = figma.getNodeById(id);
    if (node) node.remove();
  } catch(e) {
    console.log(`Remove failed for ${id}: ${e.message}`);
  }
}
```
