import React, { useState } from 'react';
import MermaidDiagram from './MermaidDiagram';

const AdvancedMermaidExamples = () => {
  const [selectedType, setSelectedType] = useState('sequence');

  // 시퀀스 다이어그램 - 사용자 인증 플로우
  const sequenceDiagram = `
    sequenceDiagram
      participant U as 사용자
      participant A as 앱
      participant S as 서버
      participant DB as 데이터베이스
      
      U->>A: 로그인 요청
      A->>S: 인증 토큰 요청
      S->>DB: 사용자 정보 확인
      DB-->>S: 사용자 데이터
      S-->>A: JWT 토큰 발급
      A-->>U: 로그인 성공
      
      Note over U,DB: 에너지 데이터 조회
      U->>A: 에너지 사용량 조회
      A->>S: API 요청 (토큰 포함)
      S->>DB: 에너지 데이터 조회
      DB-->>S: 실시간 데이터
      S-->>A: JSON 응답
      A-->>U: 차트로 표시
  `;

  // 클래스 다이어그램 - 시스템 구조
  const classDiagram = `
    classDiagram
      class EnergySystem {
        +String systemId
        +String location
        +Date createdAt
        +getEnergyData()
        +updateSettings()
        +generateReport()
      }
      
      class Sensor {
        +String sensorId
        +String type
        +Number value
        +Date timestamp
        +readData()
        +calibrate()
      }
      
      class Controller {
        +String controllerId
        +String status
        +Number powerLevel
        +activate()
        +deactivate()
        +setPowerLevel()
      }
      
      class User {
        +String userId
        +String email
        +String role
        +login()
        +logout()
        +getPermissions()
      }
      
      class Dashboard {
        +String dashboardId
        +Array widgets
        +refreshData()
        +addWidget()
        +removeWidget()
      }
      
      EnergySystem --o Sensor : contains
      EnergySystem --o Controller : manages
      User --o Dashboard : accesses
      Dashboard --o EnergySystem : monitors
  `;

  // 상태 다이어그램 - 시스템 상태 변화
  const stateDiagram = `
    stateDiagram-v2
      [*] --> 초기화
      초기화 --> 대기중
      대기중 --> 데이터수집
      데이터수집 --> 분석중
      분석중 --> 최적화
      최적화 --> 제어실행
      제어실행 --> 대기중
      
      대기중 --> 오류상태 : 오류발생
      오류상태 --> 대기중 : 복구완료
      
      state 최적화 {
        [*] --> 알고리즘실행
        알고리즘실행 --> 결과검증
        결과검증 --> [*] : 검증성공
        결과검증 --> 알고리즘실행 : 검증실패
      }
  `;

  // 엔티티 관계 다이어그램
  const erDiagram = `
    erDiagram
      USERS {
        string user_id PK
        string email
        string name
        string role
        datetime created_at
      }
      
      SYSTEMS {
        string system_id PK
        string user_id FK
        string name
        string location
        string status
        datetime installed_at
      }
      
      SENSORS {
        string sensor_id PK
        string system_id FK
        string type
        string model
        float current_value
        datetime last_reading
      }
      
      ENERGY_DATA {
        string data_id PK
        string sensor_id FK
        float value
        string unit
        datetime timestamp
      }
      
      ALERTS {
        string alert_id PK
        string system_id FK
        string type
        string message
        string severity
        datetime created_at
        boolean resolved
      }
      
      USERS --o SYSTEMS : owns
      SYSTEMS --o SENSORS : contains
      SENSORS --o ENERGY_DATA : generates
      SYSTEMS --o ALERTS : triggers
  `;

  // 간트 차트 - 프로젝트 일정
  const ganttDiagram = `
    gantt
      title 클라우드 에너지 시스템 구축 일정
      dateFormat YYYY-MM-DD
      section 기획 단계
      요구사항 분석    :done, req1, 2024-01-01, 2024-01-15
      시스템 설계      :done, design1, 2024-01-16, 2024-02-15
      기술 스택 선정   :done, tech1, 2024-02-01, 2024-02-28
      
      section 개발 단계
      백엔드 개발      :active, backend1, 2024-03-01, 2024-05-31
      프론트엔드 개발  :active, frontend1, 2024-03-15, 2024-06-15
      API 개발         :active, api1, 2024-04-01, 2024-05-15
      
      section 테스트 단계
      단위 테스트      :test1, 2024-05-01, 2024-06-30
      통합 테스트      :test2, 2024-06-01, 2024-07-15
      사용자 테스트    :test3, 2024-06-15, 2024-07-31
      
      section 배포 단계
      파일럿 배포      :deploy1, 2024-07-01, 2024-08-31
      상용 배포        :deploy2, 2024-08-01, 2024-09-30
      모니터링 설정    :monitor1, 2024-09-01, 2024-09-30
  `;

  // 사용자 여정 맵
  const journeyDiagram = `
    journey
      title 고객 여정: 에너지 관리 시스템 사용
      section 시스템 도입
        시스템 설치: 5: 고객
        초기 설정: 4: 고객
        사용법 교육: 5: 고객
      section 일상 사용
        데이터 확인: 4: 고객
        설정 조정: 3: 고객
        리포트 생성: 4: 고객
      section 문제 해결
        오류 발생: 2: 고객
        고객 지원: 4: 고객
        문제 해결: 5: 고객
      section 시스템 업그레이드
        새 기능 알림: 4: 고객
        업그레이드: 5: 고객
        기능 활용: 5: 고객
  `;

  const diagramTypes = {
    sequence: {
      title: '시퀀스 다이어그램',
      description: '사용자 인증 및 데이터 조회 플로우',
      chart: sequenceDiagram
    },
    class: {
      title: '클래스 다이어그램',
      description: '시스템 주요 클래스 구조',
      chart: classDiagram
    },
    state: {
      title: '상태 다이어그램',
      description: '시스템 상태 변화 과정',
      chart: stateDiagram
    },
    er: {
      title: 'ER 다이어그램',
      description: '데이터베이스 엔티티 관계',
      chart: erDiagram
    },
    gantt: {
      title: '간트 차트',
      description: '프로젝트 구축 일정',
      chart: ganttDiagram
    },
    journey: {
      title: '사용자 여정 맵',
      description: '고객 경험 여정',
      chart: journeyDiagram
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{
        textAlign: 'center',
        color: '#2c3e50',
        marginBottom: '30px',
        fontFamily: 'Inter, sans-serif'
      }}>
        고급 Mermaid 다이어그램 예시
      </h2>

      {/* 다이어그램 타입 선택 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        {Object.entries(diagramTypes).map(([key, diagram]) => (
          <button
            key={key}
            onClick={() => setSelectedType(key)}
            style={{
              padding: '8px 16px',
              border: selectedType === key ? '2px solid #3498db' : '1px solid #bdc3c7',
              borderRadius: '6px',
              backgroundColor: selectedType === key ? '#3498db' : '#ffffff',
              color: selectedType === key ? '#ffffff' : '#2c3e50',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
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
          {diagramTypes[selectedType].title}
        </h3>
        <p style={{
          color: '#7f8c8d',
          marginBottom: '20px',
          fontFamily: 'Inter, sans-serif'
        }}>
          {diagramTypes[selectedType].description}
        </p>
        <MermaidDiagram
          chart={diagramTypes[selectedType].chart}
          style={{
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            padding: '20px',
            overflow: 'auto'
          }}
        />
      </div>

      {/* Mermaid 문법 가이드 */}
      <div style={{
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        padding: '20px',
        fontFamily: 'Inter, sans-serif'
      }}>
        <h4 style={{ color: '#2c3e50', marginBottom: '15px' }}>
          Mermaid 다이어그램 타입별 특징
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          <div>
            <h5 style={{ color: '#3498db', marginBottom: '8px' }}>시퀀스 다이어그램</h5>
            <p style={{ color: '#34495e', fontSize: '14px', lineHeight: '1.5' }}>
              시스템 간 상호작용과 메시지 흐름을 시간순으로 표현
            </p>
          </div>
          <div>
            <h5 style={{ color: '#3498db', marginBottom: '8px' }}>클래스 다이어그램</h5>
            <p style={{ color: '#34495e', fontSize: '14px', lineHeight: '1.5' }}>
              객체지향 시스템의 클래스 구조와 관계를 표현
            </p>
          </div>
          <div>
            <h5 style={{ color: '#3498db', marginBottom: '8px' }}>상태 다이어그램</h5>
            <p style={{ color: '#34495e', fontSize: '14px', lineHeight: '1.5' }}>
              시스템의 상태 변화와 전이 조건을 표현
            </p>
          </div>
          <div>
            <h5 style={{ color: '#3498db', marginBottom: '8px' }}>ER 다이어그램</h5>
            <p style={{ color: '#34495e', fontSize: '14px', lineHeight: '1.5' }}>
              데이터베이스 엔티티와 관계를 표현
            </p>
          </div>
          <div>
            <h5 style={{ color: '#3498db', marginBottom: '8px' }}>간트 차트</h5>
            <p style={{ color: '#34495e', fontSize: '14px', lineHeight: '1.5' }}>
              프로젝트 일정과 작업 진행 상황을 표현
            </p>
          </div>
          <div>
            <h5 style={{ color: '#3498db', marginBottom: '8px' }}>사용자 여정 맵</h5>
            <p style={{ color: '#34495e', fontSize: '14px', lineHeight: '1.5' }}>
              사용자 경험과 감정 변화를 단계별로 표현
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedMermaidExamples; 