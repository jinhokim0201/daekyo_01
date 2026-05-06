# 스킬: figma-spec-clone
## 기존 Spec을 클론해서 새 Spec 생성하는 패턴

---

### 기본 클론 패턴
```javascript
const srcSpec = figma.getNodeById('SOURCE_SPEC_ID');
const clone = srcSpec.clone();
adminPage.appendChild(clone);
clone.name = 'SPEC_XX_새스펙이름';
clone.x = srcSpec.x + srcSpec.width + 80; // 오른쪽에 배치 (간격 80px)
clone.y = srcSpec.y;
```

---

### 클론 후 내부 요소 탐색 (ID 대신 조건 기반)
클론된 노드는 새 ID를 갖기 때문에 원본 ID로 접근 불가. 아래 방법 사용:

```javascript
// 방법 1: x/y 좌표로 찾기 (desc 패널)
let descPanel = null;
for (const c of clone.children || []) {
  if (c.type === 'FRAME' && Math.round(c.x) === 2204 && Math.round(c.y) === 199) {
    descPanel = c;
    break;
  }
}

// 방법 2: 크기로 찾기 (버튼 프레임)
function findAllFrames(node, res = []) {
  if (!SKIP_CH.has(node.type) && node.children) {
    for (const c of node.children) {
      if (c.type === 'FRAME') res.push(c);
      findAllFrames(c, res);
    }
  }
  return res;
}
const allFrames = findAllFrames(clone);
const targetBtn = allFrames.find(f =>
  f.width === 118 && f.height === 30 &&
  findTexts(f).some(t => t.characters === '버튼텍스트')
);

// 방법 3: 텍스트 내용으로 찾기
const titleNode = findByText(clone, '써밋 리그 결과 관리');
```

---

### 버튼 active/inactive 상태 교환
```javascript
const DARK_BLUE = [{ type: 'SOLID', color: { r: 0.173, g: 0.373, b: 0.478 } }];
const WHITE = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

// active: 진한 파랑 배경 + 흰 텍스트
btnActive.fills = DARK_BLUE;
findTexts(btnActive).forEach(t => t.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]);

// inactive: 흰 배경 + 진한 텍스트
btnInactive.fills = WHITE;
findTexts(btnInactive).forEach(t => t.fills = [{ type: 'SOLID', color: { r: 0.173, g: 0.373, b: 0.478 } }]);
```

---

### ⚠️ 주의사항
- 버튼이 하나의 프레임에 묶여 있을 경우 분리 필요
  - 각 버튼은 독립적인 FRAME으로 배치
  - 합쳐진 채로 수정하면 한 버튼 수정 시 다른 버튼 영향
- 클론한 스펙에서 상태에 맞지 않는 데이터/컴포넌트 반드시 수정
  - 테이블 데이터 (발표 전/후 구분)
  - 버튼 상태 (active/inactive)
  - 디스크립션 내용 (화면 상태 반영)
