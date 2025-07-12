import React, { useState, useEffect } from 'react';

const DeploymentHelper = () => {
  const [savedDiagrams, setSavedDiagrams] = useState([]);
  const [selectedDiagrams, setSelectedDiagrams] = useState([]);
  const [deploymentName, setDeploymentName] = useState('배포용_다이어그램');

  // 로컬 스토리지에서 저장된 다이어그램 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('mermaidDiagrams');
    if (saved) {
      setSavedDiagrams(JSON.parse(saved));
    }
  }, []);

  // 다이어그램 선택/해제
  const toggleDiagramSelection = (diagramId) => {
    setSelectedDiagrams(prev => 
      prev.includes(diagramId) 
        ? prev.filter(id => id !== diagramId)
        : [...prev, diagramId]
    );
  };

  // 전체 선택/해제
  const toggleAllDiagrams = () => {
    if (selectedDiagrams.length === savedDiagrams.length) {
      setSelectedDiagrams([]);
    } else {
      setSelectedDiagrams(savedDiagrams.map(d => d.id));
    }
  };

  // 선택된 다이어그램들로 배포용 파일 생성
  const generateDeploymentFiles = () => {
    if (selectedDiagrams.length === 0) {
      alert('배포할 다이어그램을 선택해주세요.');
      return;
    }

    const selectedDiagramData = savedDiagrams.filter(d => selectedDiagrams.includes(d.id));

    // 1. 개별 컴포넌트 파일들 생성
    selectedDiagramData.forEach(diagram => {
      const componentCode = `import React from 'react';
import MermaidDiagram from './MermaidDiagram';

const ${diagram.name.replace(/[^a-zA-Z0-9]/g, '')}Diagram = () => {
  const chart = \`${diagram.code.replace(/`/g, '\\`')}\`;
  
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#ffffff', 
      borderRadius: '8px', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      margin: '20px 0'
    }}>
      <h3 style={{ 
        marginBottom: '16px', 
        color: '#2c3e50',
        fontSize: '18px',
        fontWeight: '600'
      }}>
        ${diagram.name}
      </h3>
      <MermaidDiagram chart={chart} />
    </div>
  );
};

export default ${diagram.name.replace(/[^a-zA-Z0-9]/g, '')}Diagram;`;
      
      const blob = new Blob([componentCode], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${diagram.name.replace(/[^a-zA-Z0-9]/g, '')}Diagram.js`;
      a.click();
      URL.revokeObjectURL(url);
    });

    // 2. 통합 갤러리 컴포넌트 생성
    const galleryCode = `import React from 'react';
import MermaidDiagram from './MermaidDiagram';

${selectedDiagramData.map(diagram => 
  `const ${diagram.name.replace(/[^a-zA-Z0-9]/g, '')}Chart = \`${diagram.code.replace(/`/g, '\\`')}\`;`
).join('\n')}

const ${deploymentName.replace(/[^a-zA-Z0-9]/g, '')}Gallery = () => {
  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#2c3e50', 
        marginBottom: '40px',
        fontSize: '28px',
        fontWeight: '700'
      }}>
        ${deploymentName}
      </h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '30px' 
      }}>
        ${selectedDiagramData.map(diagram => `
        <div key="${diagram.id}" style={{ 
          backgroundColor: '#ffffff', 
          borderRadius: '12px', 
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ 
            marginBottom: '16px', 
            color: '#2c3e50',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            ${diagram.name}
          </h3>
          <MermaidDiagram chart={${diagram.name.replace(/[^a-zA-Z0-9]/g, '')}Chart} />
        </div>`).join('')}
      </div>
    </div>
  );
};

export default ${deploymentName.replace(/[^a-zA-Z0-9]/g, '')}Gallery;`;

    const galleryBlob = new Blob([galleryCode], { type: 'text/javascript' });
    const galleryUrl = URL.createObjectURL(galleryBlob);
    const galleryA = document.createElement('a');
    galleryA.href = galleryUrl;
    galleryA.download = `${deploymentName.replace(/[^a-zA-Z0-9]/g, '')}Gallery.js`;
    galleryA.click();
    URL.revokeObjectURL(galleryUrl);

    // 3. README 파일 생성
    const readmeCode = `# ${deploymentName}

이 프로젝트는 Mermaid 다이어그램을 React 컴포넌트로 변환한 배포용 자료입니다.

## 포함된 다이어그램

${selectedDiagramData.map(diagram => `- ${diagram.name}`).join('\n')}

## 사용법

1. \`MermaidDiagram.js\` 컴포넌트를 프로젝트에 추가하세요.
2. 각 다이어그램 컴포넌트를 import하여 사용하세요.
3. 또는 통합 갤러리 컴포넌트를 사용하세요.

## 예시

\`\`\`jsx
import ${selectedDiagramData[0]?.name.replace(/[^a-zA-Z0-9]/g, '')}Diagram from './${selectedDiagramData[0]?.name.replace(/[^a-zA-Z0-9]/g, '')}Diagram';

function App() {
  return (
    <div>
      <${selectedDiagramData[0]?.name.replace(/[^a-zA-Z0-9]/g, '')}Diagram />
    </div>
  );
}
\`\`\`

## 생성일

${new Date().toLocaleDateString('ko-KR')}

## 참고사항

- 모든 다이어그램은 Mermaid.js를 사용하여 렌더링됩니다.
- 반응형 디자인이 적용되어 있습니다.
- 필요에 따라 스타일을 커스터마이징할 수 있습니다.`;

    const readmeBlob = new Blob([readmeCode], { type: 'text/markdown' });
    const readmeUrl = URL.createObjectURL(readmeBlob);
    const readmeA = document.createElement('a');
    readmeA.href = readmeUrl;
    readmeA.download = 'README.md';
    readmeA.click();
    URL.revokeObjectURL(readmeUrl);

    alert(`${selectedDiagrams.length}개의 다이어그램이 성공적으로 내보내졌습니다!`);
  };

  // PNG/SVG 일괄 내보내기
  const exportAllAsImages = (format) => {
    if (selectedDiagrams.length === 0) {
      alert('내보낼 다이어그램을 선택해주세요.');
      return;
    }

    const selectedDiagramData = savedDiagrams.filter(d => selectedDiagrams.includes(d.id));
    
    selectedDiagramData.forEach((diagram, index) => {
      setTimeout(() => {
        try {
          const tempDiv = document.createElement('div');
          tempDiv.className = 'mermaid';
          tempDiv.style.position = 'absolute';
          tempDiv.style.left = '-9999px';
          document.body.appendChild(tempDiv);
          
          tempDiv.textContent = diagram.code;
          
          setTimeout(() => {
            const svgElement = tempDiv.querySelector('svg');
            if (svgElement) {
              if (format === 'svg') {
                const svgData = new XMLSerializer().serializeToString(svgElement);
                const blob = new Blob([svgData], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${diagram.name}.svg`;
                a.click();
                URL.revokeObjectURL(url);
              } else if (format === 'png') {
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
                    a.download = `${diagram.name}.png`;
                    a.click();
                    URL.revokeObjectURL(downloadUrl);
                  });
                };
                
                img.src = url;
              }
            }
            document.body.removeChild(tempDiv);
          }, 1000);
        } catch (err) {
          console.error(`${diagram.name} 내보내기 오류:`, err);
        }
      }, index * 1500); // 각 다이어그램마다 1.5초 간격으로 처리
    });

    alert(`${selectedDiagrams.length}개의 다이어그램을 ${format.toUpperCase()} 형식으로 내보내기 시작했습니다.`);
  };

  if (savedDiagrams.length === 0) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        fontFamily: 'Inter, sans-serif'
      }}>
        <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>
          저장된 다이어그램이 없습니다
        </h2>
        <p style={{ color: '#64748b', fontSize: '16px' }}>
          Mermaid 편집기에서 다이어그램을 생성하고 저장해주세요.
        </p>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h1 style={{ 
        color: '#2c3e50', 
        fontSize: '28px',
        fontWeight: '700',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        배포용 다이어그램 생성 도구
      </h1>

      {/* 배포 설정 */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px', 
        padding: '20px',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>
          배포 설정
        </h3>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <label style={{ fontSize: '14px', color: '#2c3e50' }}>
            배포명:
            <input
              type="text"
              value={deploymentName}
              onChange={(e) => setDeploymentName(e.target.value)}
              style={{
                marginLeft: '8px',
                padding: '8px 12px',
                border: '1px solid #bdc3c7',
                borderRadius: '4px',
                fontSize: '14px',
                width: '200px'
              }}
            />
          </label>
        </div>
      </div>

      {/* 다이어그램 선택 */}
      <div style={{ 
        backgroundColor: '#ffffff', 
        borderRadius: '8px', 
        padding: '20px',
        marginBottom: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#2c3e50', margin: 0 }}>
            다이어그램 선택 ({selectedDiagrams.length}/{savedDiagrams.length})
          </h3>
          <button
            onClick={toggleAllDiagrams}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3498db',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {selectedDiagrams.length === savedDiagrams.length ? '전체 해제' : '전체 선택'}
          </button>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '15px' 
        }}>
          {savedDiagrams.map((diagram) => (
            <div
              key={diagram.id}
              style={{
                padding: '15px',
                border: `2px solid ${selectedDiagrams.includes(diagram.id) ? '#3498db' : '#e5e7eb'}`,
                borderRadius: '8px',
                backgroundColor: selectedDiagrams.includes(diagram.id) ? '#f0f8ff' : '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => toggleDiagramSelection(diagram.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  checked={selectedDiagrams.includes(diagram.id)}
                  onChange={() => {}}
                  style={{ transform: 'scale(1.2)' }}
                />
                <div>
                  <h4 style={{ 
                    color: '#2c3e50', 
                    margin: '0 0 5px 0',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    {diagram.name}
                  </h4>
                  <p style={{ 
                    color: '#64748b', 
                    margin: 0,
                    fontSize: '12px'
                  }}>
                    생성일: {new Date(diagram.createdAt).toLocaleDateString('ko-KR')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 배포 옵션 */}
      <div style={{ 
        backgroundColor: '#ffffff', 
        borderRadius: '8px', 
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>
          배포 옵션
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px' 
        }}>
          <button
            onClick={generateDeploymentFiles}
            disabled={selectedDiagrams.length === 0}
            style={{
              padding: '15px 20px',
              backgroundColor: selectedDiagrams.length === 0 ? '#bdc3c7' : '#27ae60',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: selectedDiagrams.length === 0 ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            React 컴포넌트 생성
          </button>

          <button
            onClick={() => exportAllAsImages('png')}
            disabled={selectedDiagrams.length === 0}
            style={{
              padding: '15px 20px',
              backgroundColor: selectedDiagrams.length === 0 ? '#bdc3c7' : '#3498db',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: selectedDiagrams.length === 0 ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            PNG 이미지 내보내기
          </button>

          <button
            onClick={() => exportAllAsImages('svg')}
            disabled={selectedDiagrams.length === 0}
            style={{
              padding: '15px 20px',
              backgroundColor: selectedDiagrams.length === 0 ? '#bdc3c7' : '#9b59b6',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: selectedDiagrams.length === 0 ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            SVG 이미지 내보내기
          </button>
        </div>

        <div style={{ 
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#e8f4fd',
          borderRadius: '6px',
          border: '1px solid #3498db'
        }}>
          <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>💡 사용법</h4>
          <ul style={{ color: '#34495e', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
            <li>배포할 다이어그램들을 선택하세요.</li>
            <li><strong>React 컴포넌트 생성:</strong> 선택된 다이어그램들을 React 컴포넌트로 변환하여 다운로드합니다.</li>
            <li><strong>PNG/SVG 내보내기:</strong> 선택된 다이어그램들을 이미지 파일로 변환하여 다운로드합니다.</li>
            <li>생성된 파일들은 프레젠테이션, 문서, 웹사이트 등에 바로 사용할 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeploymentHelper; 