import React, { useState, useEffect } from 'react';
import MermaidDiagram from './MermaidDiagram';

const MermaidGallery = () => {
  const [savedDiagrams, setSavedDiagrams] = useState([]);
  const [selectedDiagram, setSelectedDiagram] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 로컬 스토리지에서 저장된 다이어그램 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('mermaidDiagrams');
    if (saved) {
      setSavedDiagrams(JSON.parse(saved));
    }
  }, []);

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
  const exportAsPNG = async (diagram) => {
    try {
      // 임시로 다이어그램을 렌더링
      const tempDiv = document.createElement('div');
      tempDiv.className = 'mermaid';
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      document.body.appendChild(tempDiv);
      
      tempDiv.textContent = diagram.code;
      
      // Mermaid 렌더링 대기
      setTimeout(() => {
        const svgElement = tempDiv.querySelector('svg');
        if (svgElement) {
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
        document.body.removeChild(tempDiv);
      }, 1000);
    } catch (err) {
      console.error('PNG 내보내기 오류:', err);
    }
  };

  // SVG로 내보내기
  const exportAsSVG = (diagram) => {
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
          const svgData = new XMLSerializer().serializeToString(svgElement);
          const blob = new Blob([svgData], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${diagram.name}.svg`;
          a.click();
          URL.revokeObjectURL(url);
        }
        document.body.removeChild(tempDiv);
      }, 1000);
    } catch (err) {
      console.error('SVG 내보내기 오류:', err);
    }
  };

  // 배포용 컴포넌트 코드 생성
  const generateComponentCode = (diagram) => {
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
  };

  // 전체 다이어그램을 하나의 파일로 내보내기
  const exportAllAsComponents = () => {
    const allComponentsCode = savedDiagrams.map(diagram => {
      return `// ${diagram.name}
const ${diagram.name.replace(/[^a-zA-Z0-9]/g, '')}Chart = \`${diagram.code.replace(/`/g, '\\`')}\`;`;
    }).join('\n\n');

    const indexCode = `import React from 'react';
import MermaidDiagram from './MermaidDiagram';

${allComponentsCode}

const MermaidGallery = () => {
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
        Mermaid 다이어그램 갤러리
      </h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '30px' 
      }}>
        ${savedDiagrams.map(diagram => `
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

export default MermaidGallery;`;

    const blob = new Blob([indexCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MermaidGallery.js';
    a.click();
    URL.revokeObjectURL(url);
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
      maxWidth: '1400px', 
      margin: '0 auto',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{ 
          color: '#2c3e50', 
          fontSize: '28px',
          fontWeight: '700',
          margin: 0
        }}>
          Mermaid 다이어그램 갤러리
        </h1>
        <button
          onClick={exportAllAsComponents}
          style={{
            padding: '12px 24px',
            backgroundColor: '#27ae60',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500'
          }}
        >
          전체 컴포넌트 내보내기
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '30px' 
      }}>
        {savedDiagrams.map((diagram) => (
          <div key={diagram.id} style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: '12px', 
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h3 style={{ 
                color: '#2c3e50',
                fontSize: '18px',
                fontWeight: '600',
                margin: 0
              }}>
                {diagram.name}
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => exportAsPNG(diagram)}
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
                  onClick={() => exportAsSVG(diagram)}
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
                  onClick={() => generateComponentCode(diagram)}
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
                <button
                  onClick={() => deleteDiagram(diagram.id)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#e74c3c',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
            
            <div style={{ 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              minHeight: '300px'
            }}>
              <MermaidDiagram 
                chart={diagram.code}
                style={{ 
                  minHeight: '270px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              />
            </div>
            
            <div style={{ 
              marginTop: '12px',
              fontSize: '12px',
              color: '#64748b'
            }}>
              생성일: {new Date(diagram.createdAt).toLocaleDateString('ko-KR')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MermaidGallery; 