import React, { useState } from 'react';
import MermaidDiagram from './MermaidDiagram';

const EnergySystemDiagrams = () => {
  const [selectedDiagram, setSelectedDiagram] = useState('architecture');

  // 클라우드 에너지 시스템 아키텍처 다이어그램
  const architectureDiagram = `
    graph TB
      subgraph "사용자 레이어"
        UI[사용자 인터페이스]
        Mobile[모바일 앱]
        Web[웹 대시보드]
      end
      
      subgraph "클라우드 플랫폼"
        API[API Gateway]
        Auth[인증 서비스]
        DB[(데이터베이스)]
        Cache[(캐시)]
      end
      
      subgraph "에너지 관리 시스템"
        EMS[에너지 관리 시스템]
        Analytics[데이터 분석]
        ML[머신러닝 엔진]
      end
      
      subgraph "IoT 디바이스"
        Sensors[센서 네트워크]
        Controllers[제어 시스템]
        Lighting[조명 시스템]
      end
      
      UI --> API
      Mobile --> API
      Web --> API
      API --> Auth
      API --> EMS
      EMS --> Analytics
      EMS --> ML
      EMS --> DB
      EMS --> Cache
      EMS --> Sensors
      Sensors --> Controllers
      Controllers --> Lighting
  `;

  // 데이터 플로우 다이어그램
  const dataFlowDiagram = `
    flowchart LR
      subgraph "데이터 수집"
        S1[센서 1]
        S2[센서 2]
        S3[센서 3]
      end
      
      subgraph "데이터 처리"
        P1[전처리]
        P2[필터링]
        P3[집계]
      end
      
      subgraph "데이터 저장"
        D1[(실시간 DB)]
        D2[(히스토리 DB)]
        D3[(백업)]
      end
      
      subgraph "분석 및 시각화"
        A1[실시간 분석]
        A2[예측 모델]
        A3[대시보드]
      end
      
      S1 --> P1
      S2 --> P1
      S3 --> P1
      P1 --> P2
      P2 --> P3
      P3 --> D1
      D1 --> D2
      D2 --> D3
      D1 --> A1
      A1 --> A2
      A2 --> A3
  `;

  // 시스템 컴포넌트 관계도
  const componentDiagram = `
    graph TD
      subgraph "프론트엔드"
        React[React 앱]
        Redux[상태 관리]
        UI[UI 컴포넌트]
      end
      
      subgraph "백엔드"
        Node[Node.js 서버]
        Express[Express.js]
        Socket[WebSocket]
      end
      
      subgraph "데이터베이스"
        MongoDB[(MongoDB)]
        Redis[(Redis)]
      end
      
      subgraph "외부 서비스"
        AWS[AWS 클라우드]
        IoT[IoT 플랫폼]
      end
      
      React --> Redux
      Redux --> UI
      React --> Node
      Node --> Express
      Express --> MongoDB
      Express --> Redis
      Node --> Socket
      Socket --> IoT
      Node --> AWS
  `;

  // 에너지 최적화 프로세스
  const optimizationDiagram = `
    flowchart TD
      Start([시작]) --> Collect[데이터 수집]
      Collect --> Analyze[데이터 분석]
      Analyze --> Predict[사용량 예측]
      Predict --> Optimize[최적화 계산]
      Optimize --> Decision{최적화 가능?}
      Decision -->|Yes| Apply[최적화 적용]
      Decision -->|No| Monitor[모니터링 계속]
      Apply --> Monitor
      Monitor --> Collect
      
      style Start fill:#e1f5fe
      style Apply fill:#c8e6c9
      style Decision fill:#fff3e0
  `;

  const diagrams = {
    architecture: {
      title: '시스템 아키텍처',
      description: '클라우드 기반 에너지 관리 시스템의 전체 아키텍처',
      chart: architectureDiagram
    },
    dataFlow: {
      title: '데이터 플로우',
      description: '센서에서 대시보드까지의 데이터 흐름',
      chart: dataFlowDiagram
    },
    components: {
      title: '컴포넌트 관계',
      description: '시스템 구성 요소들의 관계도',
      chart: componentDiagram
    },
    optimization: {
      title: '에너지 최적화 프로세스',
      description: '에너지 사용량 최적화를 위한 프로세스',
      chart: optimizationDiagram
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: '#2c3e50', 
        marginBottom: '30px',
        fontFamily: 'Inter, sans-serif'
      }}>
        클라우드 에너지 시스템 다이어그램
      </h2>
      
      {/* 다이어그램 선택 버튼 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '10px', 
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        {Object.entries(diagrams).map(([key, diagram]) => (
          <button
            key={key}
            onClick={() => setSelectedDiagram(key)}
            style={{
              padding: '10px 20px',
              border: selectedDiagram === key ? '2px solid #3498db' : '1px solid #bdc3c7',
              borderRadius: '8px',
              backgroundColor: selectedDiagram === key ? '#3498db' : '#ffffff',
              color: selectedDiagram === key ? '#ffffff' : '#2c3e50',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
          >
            {diagram.title}
          </button>
        ))}
      </div>
      
      {/* 선택된 다이어그램 표시 */}
      <div style={{ 
        backgroundColor: '#ffffff', 
        borderRadius: '12px', 
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}>
        <h3 style={{ 
          color: '#2c3e50', 
          marginBottom: '10px',
          fontFamily: 'Inter, sans-serif'
        }}>
          {diagrams[selectedDiagram].title}
        </h3>
        <p style={{ 
          color: '#7f8c8d', 
          marginBottom: '20px',
          fontFamily: 'Inter, sans-serif'
        }}>
          {diagrams[selectedDiagram].description}
        </p>
        <MermaidDiagram 
          chart={diagrams[selectedDiagram].chart}
          style={{ 
            backgroundColor: '#f8f9fa', 
            borderRadius: '8px',
            padding: '20px'
          }}
        />
      </div>
      
      {/* 다이어그램 설명 */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px', 
        padding: '20px',
        fontFamily: 'Inter, sans-serif'
      }}>
        <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>
          다이어그램 사용법
        </h4>
        <ul style={{ color: '#34495e', lineHeight: '1.6' }}>
          <li>위의 버튼을 클릭하여 다양한 다이어그램을 확인할 수 있습니다.</li>
          <li>각 다이어그램은 시스템의 다른 측면을 보여줍니다.</li>
          <li>Mermaid 문법을 사용하여 다이어그램이 자동으로 렌더링됩니다.</li>
          <li>반응형 디자인으로 다양한 화면 크기에서 최적화됩니다.</li>
        </ul>
      </div>
    </div>
  );
};

export default EnergySystemDiagrams; 