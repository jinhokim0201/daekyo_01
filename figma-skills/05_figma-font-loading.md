# 스킬: figma-font-loading
## 이 프로젝트 폰트 로드 표준

---

### 사용 폰트 목록
| 폰트 패밀리 | 스타일 | 용도 |
|------------|--------|------|
| Noto Sans KR | Regular | 본문 데이터, 일반 텍스트 |
| Noto Sans KR | Medium | DESC 제목, 레이블 |
| Noto Sans KR | Bold | 페이지 타이틀 |
| Inter | Regular | 숫자 데이터, 영문 |
| Inter | Semi Bold | 테이블 헤더 (공백 포함 주의) |
| Inter | Bold | 강조 숫자 |

---

### 표준 로드 블록 (모든 코드 상단에 포함)
```javascript
await figma.loadFontAsync({ family: 'Noto Sans KR', style: 'Regular' });
await figma.loadFontAsync({ family: 'Noto Sans KR', style: 'Medium' });
await figma.loadFontAsync({ family: 'Noto Sans KR', style: 'Bold' });
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' }); // 반드시 공백 포함
await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
```

---

### ⚠️ 주의사항
- `'Semi Bold'` — 공백 포함 (SemiBold 불가)
- `'Extra Bold'` — 공백 포함 (ExtraBold 불가)
- 기존 노드의 fontName을 그대로 복사할 경우:
  ```javascript
  await figma.loadFontAsync(existingTextNode.fontName); // 기존 폰트 그대로 로드
  ```
- 텍스트 생성/수정 전 반드시 해당 폰트 로드 완료 후 진행

---

### 텍스트 노드 생성 표준 패턴
```javascript
const txt = figma.createText();
txt.fontName = { family: 'Noto Sans KR', style: 'Regular' };
txt.fontSize = 13;
txt.fills = [{ type: 'SOLID', color: { r: 0.2, g: 0.2, b: 0.2 } }];
txt.textAlignHorizontal = 'CENTER';
txt.characters = '텍스트 내용';
txt.x = 0;
txt.y = 0;
txt.resize(width, height);
```
