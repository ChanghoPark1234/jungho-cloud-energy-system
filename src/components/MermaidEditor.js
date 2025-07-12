import React, { useState, useEffect } from 'react';
import MermaidDiagram from './MermaidDiagram';

const MermaidEditor = () => {
  const [mermaidCode, setMermaidCode] = useState(`graph TD
    A[시작] --> B{조건 확인}
    B -->|Yes| C[처리 실행]
    B -->|No| D[종료]
    C --> E[결과 출력]
    E --> D`);

  const [diagramName, setDiagramName] = useState('새 다이어그램');
  const [savedDiagrams, setSavedDiagrams] = useState([]);
  const [selectedDiagram, setSelectedDiagram] = useState(null);
  const [error, setError] = useState('');

  // 로컬 스토리지에서 저장된 다이어그램 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('mermaidDiagrams');
    if (saved) {
      setSavedDiagrams(JSON.parse(saved));
    }
  }, []);

  // 다이어그램 저장
  const saveDiagram = () => {
    if (!diagramName.trim()) {
      setError('다이어그램 이름을 입력해주세요.');
      return;
    }

    const newDiagram = {
      id: Date.now(),
      name: diagramName,
      code: mermaidCode,
      createdAt: new Date().toISOString()
    };

    const updatedDiagrams = [...savedDiagrams, newDiagram];
    setSavedDiagrams(updatedDiagrams);
    localStorage.setItem('mermaidDiagrams', JSON.stringify(updatedDiagrams));
    setError('');
  };

  // 다이어그램 불러오기
  const loadDiagram = (diagram) => {
    setMermaidCode(diagram.code);
    setDiagramName(diagram.name);
    setSelectedDiagram(diagram);
    setError('');
  };

  // 다이어그램 삭제
  const deleteDiagram = (id) => {
    const updatedDiagrams = savedDiagrams.filter(d => d.id !== id);
    setSavedDiagrams(updatedDiagrams);
    localStorage.setItem('mermaidDiagrams', JSON.stringify(updatedDiagrams));
    if (selectedDiagram && selectedDiagram.id === id) {
      setSelectedDiagram(null);
    }
  };

  // PNG로 내보내기
  const exportAsPNG = async () => {
    try {
      const svgElement = document.querySelector('.mermaid svg');
      if (!svgElement) {
        setError('다이어그램을 먼저 렌더링해주세요.');
        return;
      }

      const svgData = new XMLSerializer().serializeToString(svgElement);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          const downloadUrl = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = `${diagramName}.png`;
          a.click();
          URL.revokeObjectURL(downloadUrl);
        });
      };
      
      img.src = url;
    } catch (err) {
      setError('PNG 내보내기 중 오류가 발생했습니다.');
    }
  };

  // SVG로 내보내기
  const exportAsSVG = () => {
    try {
      const svgElement = document.querySelector('.mermaid svg');
      if (!svgElement) {
        setError('다이어그램을 먼저 렌더링해주세요.');
        return;
      }

      const svgData = new XMLSerializer().serializeToString(svgElement);
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${diagramName}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('SVG 내보내기 중 오류가 발생했습니다.');
    }
  };

  // 배포용 컴포넌트 코드 생성
  const generateComponentCode = () => {
    const componentCode = `import React from 'react';
import MermaidDiagram from './MermaidDiagram';

const ${diagramName.replace(/[^a-zA-Z0-9]/g, '')}Diagram = () => {
  const chart = \`${mermaidCode.replace(/`/g, '\\`')}\`;
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginBottom: '16px', color: '#2c3e50' }}>${diagramName}</h3>
      <MermaidDiagram chart={chart} />
    </div>
  );
};

export default ${diagramName.replace(/[^a-zA-Z0-9]/g, '')}Diagram;`;
    
    const blob = new Blob([componentCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${diagramName.replace(/[^a-zA-Z0-9]/g, '')}Diagram.js`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 예시 템플릿들
  const templates = {
    flowchart: `graph TD
    A[시작] --> B{조건 확인}
    B -->|Yes| C[처리 실행]
    B -->|No| D[종료]
    C --> E[결과 출력]
    E --> D`,
    
    sequence: `sequenceDiagram
    participant A as 사용자
    participant B as 시스템
    participant C as 데이터베이스
    
    A->>B: 요청
    B->>C: 데이터 조회
    C-->>B: 응답
    B-->>A: 결과`,
    
    class: `classDiagram
    class Animal {
        +String name
        +move()
    }
    class Dog {
        +bark()
    }
    class Bird {
        +fly()
    }
    Animal <|-- Dog
    Animal <|-- Bird`,
    
    er: `erDiagram
    CUSTOMER {
        string id PK
        string name
        string email
    }
    ORDER {
        string id PK
        string customer_id FK
        date order_date
    }
    CUSTOMER ||--o{ ORDER : places`
  };

  const handleTemplateChange = (templateKey) => {
    setMermaidCode(templates[templateKey]);
    setError('');
  };

  const handleCodeChange = (e) => {
    setMermaidCode(e.target.value);
    setError('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: '#2c3e50', 
        marginBottom: '30px',
        fontFamily: 'Inter, sans-serif'
      }}>
        Mermaid 다이어그램 편집기
      </h2>
      
      {/* 저장된 다이어그램 목록 */}
      {savedDiagrams.length > 0 && (
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px', 
          padding: '20px',
          marginBottom: '20px',
          fontFamily: 'Inter, sans-serif'
        }}>
          <h4 style={{ color: '#2c3e50', marginBottom: '15px' }}>
            저장된 다이어그램
          </h4>
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            flexWrap: 'wrap' 
          }}>
            {savedDiagrams.map((diagram) => (
              <div key={diagram.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                backgroundColor: selectedDiagram?.id === diagram.id ? '#3498db' : '#ffffff',
                color: selectedDiagram?.id === diagram.id ? '#ffffff' : '#2c3e50',
                borderRadius: '6px',
                border: '1px solid #bdc3c7',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                <span onClick={() => loadDiagram(diagram)}>{diagram.name}</span>
                <button
                  onClick={() => deleteDiagram(diagram.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    fontSize: '12px',
                    padding: '2px 6px',
                    borderRadius: '3px'
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* 템플릿 선택 */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px', 
        padding: '20px',
        marginBottom: '20px',
        fontFamily: 'Inter, sans-serif'
      }}>
        <h4 style={{ color: '#2c3e50', marginBottom: '15px' }}>
          템플릿 선택
        </h4>
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          flexWrap: 'wrap' 
        }}>
          {Object.entries(templates).map(([key, template]) => (
            <button
              key={key}
              onClick={() => handleTemplateChange(key)}
              style={{
                padding: '8px 16px',
                border: '1px solid #bdc3c7',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                color: '#2c3e50',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px',
        minHeight: '600px'
      }}>
        {/* 코드 편집기 */}
        <div style={{ 
          backgroundColor: '#ffffff', 
          borderRadius: '12px', 
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ 
              color: '#2c3e50',
              fontFamily: 'Inter, sans-serif',
              margin: 0
            }}>
              Mermaid 코드 편집
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={diagramName}
                onChange={(e) => setDiagramName(e.target.value)}
                placeholder="다이어그램 이름"
                style={{
                  padding: '6px 12px',
                  border: '1px solid #bdc3c7',
                  borderRadius: '4px',
                  fontSize: '14px',
                  width: '150px'
                }}
              />
              <button
                onClick={saveDiagram}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#27ae60',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                저장
              </button>
            </div>
          </div>
          <textarea
            value={mermaidCode}
            onChange={handleCodeChange}
            style={{
              width: '100%',
              height: '500px',
              border: '1px solid #bdc3c7',
              borderRadius: '8px',
              padding: '15px',
              fontFamily: 'Consolas, Monaco, monospace',
              fontSize: '14px',
              lineHeight: '1.4',
              resize: 'vertical',
              backgroundColor: '#f8f9fa'
            }}
            placeholder="Mermaid 다이어그램 코드를 입력하세요..."
          />
          {error && (
            <div style={{ 
              color: '#e74c3c', 
              marginTop: '10px',
              padding: '10px',
              backgroundColor: '#fdf2f2',
              borderRadius: '6px',
              fontSize: '14px'
            }}>
              오류: {error}
            </div>
          )}
        </div>
        
        {/* 미리보기 */}
        <div style={{ 
          backgroundColor: '#ffffff', 
          borderRadius: '12px', 
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ 
              color: '#2c3e50',
              fontFamily: 'Inter, sans-serif',
              margin: 0
            }}>
              실시간 미리보기
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={exportAsPNG}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#3498db',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                PNG
              </button>
              <button
                onClick={exportAsSVG}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#9b59b6',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                SVG
              </button>
              <button
                onClick={generateComponentCode}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#f39c12',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                컴포넌트
              </button>
            </div>
          </div>
          <div style={{ 
            minHeight: '500px',
            border: '1px solid #bdc3c7',
            borderRadius: '8px',
            padding: '15px',
            backgroundColor: '#f8f9fa'
          }}>
            <MermaidDiagram 
              chart={mermaidCode}
              style={{ 
                minHeight: '470px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            />
          </div>
        </div>
      </div>
      
      {/* 사용법 가이드 */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px', 
        padding: '20px',
        marginTop: '20px',
        fontFamily: 'Inter, sans-serif'
      }}>
        <h4 style={{ color: '#2c3e50', marginBottom: '15px' }}>
          Mermaid 문법 가이드
        </h4>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px' 
        }}>
          <div>
            <h5 style={{ color: '#3498db', marginBottom: '8px' }}>기본 노드</h5>
            <pre style={{ color: '#34495e', fontSize: '14px', lineHeight: '1.5', fontFamily: 'monospace', background: 'none', border: 'none', padding: 0, margin: 0 }}>
A[텍스트]   - 사각형 노드
B(텍스트)   - 둥근 모서리 노드
C&#123;텍스트&#125;   - 다이아몬드 노드
D((텍스트)) - 원형 노드
            </pre>
          </div>
          <div>
            <h5 style={{ color: '#3498db', marginBottom: '8px' }}>화살표</h5>
            <ul style={{ color: '#34495e', fontSize: '14px', lineHeight: '1.5' }}>
              <li><code>A --> B</code> - 화살표</li>
              <li><code>A --- B</code> - 선</li>
              <li><code>A -.-> B</code> - 점선 화살표</li>
              <li><code>A ==> B</code> - 굵은 화살표</li>
            </ul>
          </div>
          <div>
            <h5 style={{ color: '#3498db', marginBottom: '8px' }}>그룹</h5>
            <ul style={{ color: '#34495e', fontSize: '14px', lineHeight: '1.5' }}>
              <li><code>subgraph "제목"</code> - 그룹 시작</li>
              <li><code>end</code> - 그룹 끝</li>
              <li>노드들을 그룹으로 묶어서 표현</li>
            </ul>
          </div>
        </div>
        
        <div style={{ 
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#e8f4fd',
          borderRadius: '6px',
          border: '1px solid #3498db'
        }}>
          <h5 style={{ color: '#2c3e50', marginBottom: '10px' }}>💡 팁</h5>
          <ul style={{ color: '#34495e', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
            <li>코드를 수정하면 실시간으로 미리보기가 업데이트됩니다.</li>
            <li>위의 템플릿을 선택하여 다양한 다이어그램 타입을 시작할 수 있습니다.</li>
            <li>다이어그램을 저장하면 나중에 다시 불러올 수 있습니다.</li>
            <li>PNG/SVG로 내보내기하여 다른 문서에 삽입할 수 있습니다.</li>
            <li>컴포넌트 버튼을 클릭하면 React 컴포넌트 코드를 다운로드할 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MermaidEditor; 