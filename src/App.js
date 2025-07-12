import React, { useState } from 'react';
import styled from 'styled-components';
import CloudArchitecture from './components/CloudArchitecture';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import CustomerJourney from './components/CustomerJourney';
import TechArchComparison from './components/TechArchComparison';
import EnergySystemDiagrams from './components/EnergySystemDiagrams';
import AdvancedMermaidExamples from './components/AdvancedMermaidExamples';
import MermaidEditor from './components/MermaidEditor';
import MermaidGallery from './components/MermaidGallery';
import DeploymentHelper from './components/DeploymentHelper';
import Button from './components/Button';
import Card from './components/Card';
import { H1, H2, H3, Text, Body } from './components/Typography';
import './App.css';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%);
  padding-bottom: 32px;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #3B82F6, #1D4ED8);
  color: white;
  padding: 24px 0;
  margin-bottom: 32px;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
`;

const CompanyName = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: white;
`;

const CompanyTagline = styled.p`
  font-size: 16px;
  margin: 0;
  opacity: 0.9;
  color: white;
`;

const NavBar = styled.nav`
  max-width: 1200px;
  margin: 0 auto 32px auto;
  padding: 0 24px;
  display: flex;
  justify-content: center;
  gap: 8px;
  background: white;
  border-radius: 16px;
  padding: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const NavButton = styled.button`
  background: ${({ active }) => (active ? 'linear-gradient(135deg, #3B82F6, #1D4ED8)' : 'transparent')};
  color: ${({ active }) => (active ? '#FFFFFF' : '#64748B')};
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 250ms ease-in-out;
  outline: none;
  
  &:hover {
    background: ${({ active }) => (active ? 'linear-gradient(135deg, #3B82F6, #1D4ED8)' : '#F1F5F9')};
    color: ${({ active }) => (active ? '#FFFFFF' : '#3B82F6')};
    transform: translateY(-1px);
  }
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const OverviewContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: 32px;
`;

const List = styled.ul`
  margin: 0 0 16px 0;
  padding-left: 24px;
  color: #1E293B;
  line-height: 1.6;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
`;

const Highlight = styled.span`
  color: #10B981;
  font-weight: 600;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  background: linear-gradient(135deg, #3B82F6, #1D4ED8);
  color: white;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;

const Td = styled.td`
  border: 1px solid #E5E7EB;
  padding: 16px;
  font-size: 16px;
  text-align: center;
  color: #1E293B;
  
  &:nth-child(even) {
    background-color: #F8FAFC;
  }
`;

const Timeline = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Milestone = styled.div`
  background: linear-gradient(135deg, #3B82F6, #1D4ED8);
  color: white;
  border-radius: 12px;
  padding: 16px 24px;
  font-weight: 600;
  font-size: 16px;
  min-width: 140px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
  transition: all 250ms ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin: 32px 0;
`;

const StatCard = styled(Card)`
  text-align: center;
  
  h3 {
    color: #3B82F6;
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 8px 0;
  }
  
  p {
    color: #64748B;
    margin: 0;
  }
`;

function Overview() {
  return (
    <OverviewContainer>
      <H1 align="center" color="primary" style={{ marginBottom: '32px' }}>
        조명제어 클라우드 시스템 구축 계획
      </H1>
      
      <StatsGrid>
        <StatCard>
          <H3>20-30%</H3>
          <Text color="secondary">매출 증가 예상</Text>
        </StatCard>
        <StatCard>
          <H3>12-18개월</H3>
          <Text color="secondary">투자 회수 기간</Text>
        </StatCard>
        <StatCard>
          <H3>90%+</H3>
          <Text color="secondary">고객 만족도 목표</Text>
        </StatCard>
        <StatCard>
          <H3>20%</H3>
          <Text color="secondary">운영 비용 절감</Text>
        </StatCard>
      </StatsGrid>

      <Section>
        <H2 color="primary">🎯 핵심 요약</H2>
        <List>
          <ListItem><strong>왜 클라우드 시스템이 필요한가?</strong></ListItem>
          <ListItem>• <strong>현재:</strong> 조명/전력/FMS 시스템 개별 운영, 데이터 활용 부족, 글로벌 지원 한계</ListItem>
          <ListItem>• <strong>클라우드 도입 후:</strong> <Highlight>실시간 데이터 분석</Highlight>, <Highlight>구독형 서비스</Highlight>, <Highlight>글로벌 지원</Highlight>, <Highlight>B2C 확장</Highlight></ListItem>
        </List>
      </Section>

      <Section>
        <H2 color="primary">시스템 구조 (비기술적 설명)</H2>
        <List>
          <ListItem>현장 장비 → 데이터 수집 → 클라우드 저장/분석 → 고객 서비스</ListItem>
          <ListItem>조명/센서 → 실시간 전송 → AWS/Azure → 앱/대시보드</ListItem>
        </List>
        <List>
          <ListItem>현장: 데이터 생성 (공장 기계)</ListItem>
          <ListItem>수집: 실시간 전송 (트럭 운반)</ListItem>
          <ListItem>저장: 안전 보관 (창고)</ListItem>
          <ListItem>분석: 정보 생성 (가공/제작)</ListItem>
          <ListItem>서비스: 고객 가치 제공 (완성품 판매)</ListItem>
        </List>
      </Section>

      <Section>
        <H2 color="primary">비즈니스 효과</H2>
        <Table>
          <thead>
            <tr>
              <Th>구분</Th>
              <Th>현재</Th>
              <Th>클라우드 도입 후</Th>
              <Th>개선 효과</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>B2B 서비스</Td>
              <Td>단순 설치/유지보수</Td>
              <Td>실시간 모니터링+컨설팅</Td>
              <Td><Highlight>매출 20~30%↑</Highlight></Td>
            </tr>
            <tr>
              <Td>B2C 확장</Td>
              <Td>없음</Td>
              <Td>가정용 스마트 조명 앱</Td>
              <Td><Highlight>신규 시장 진입</Highlight></Td>
            </tr>
            <tr>
              <Td>운영 효율</Td>
              <Td>수동 관리</Td>
              <Td>예측 유지보수</Td>
              <Td><Highlight>비용 20%↓</Highlight></Td>
            </tr>
            <tr>
              <Td>고객 만족</Td>
              <Td>기본 지원</Td>
              <Td>24/7 원격 지원</Td>
              <Td><Highlight>만족도 90%+</Highlight></Td>
            </tr>
          </tbody>
        </Table>
      </Section>

      <Section>
        <H2 color="primary">투자 비용 및 정부 지원</H2>
        <List>
          <ListItem>초기 투자: <Highlight>$10,000~20,000</Highlight> / 월 운영비: <Highlight>$1,000~2,500</Highlight></ListItem>
          <ListItem>정부 지원(2025): <Highlight>클라우드 바우처 최대 8,000만원</Highlight> (실제 부담 20~50%)</ListItem>
          <ListItem>투자 회수: <Highlight>12~18개월</Highlight> / 연간 매출 20~30% 증가</ListItem>
        </List>
      </Section>

      <Section>
        <H2 color="primary">성공 사례</H2>
        <List>
          <ListItem>Signify(구 Philips Lighting): AWS 기반, 에너지 절감 18%, 매출 12%↑</ListItem>
          <ListItem>한국 스마트빌딩 중소기업: 정부 지원, 6개월 구축, 매출 15%↑</ListItem>
        </List>
      </Section>

      <Section>
        <H2 color="primary">🚀 다음 단계</H2>
        <Timeline>
          <Milestone>3개월: 파일럿 테스트</Milestone>
          <Milestone>6개월: B2C 앱 프로토타입</Milestone>
          <Milestone>12개월: 전체 상용화</Milestone>
        </Timeline>
      </Section>
    </OverviewContainer>
  );
}

const pages = [
  { key: 'overview', label: '개요', component: <Overview /> },
  { key: 'arch', label: '아키텍처', component: <CloudArchitecture /> },
  { key: 'diagrams', label: '시스템 다이어그램', component: <EnergySystemDiagrams /> },
  { key: 'advanced', label: '고급 다이어그램', component: <AdvancedMermaidExamples /> },
  { key: 'editor', label: '다이어그램 편집기', component: <MermaidEditor /> },
  { key: 'gallery', label: '다이어그램 갤러리', component: <MermaidGallery /> },
  { key: 'deployment', label: '배포 도구', component: <DeploymentHelper /> },
  { key: 'dashboard', label: '임원 대시보드', component: <ExecutiveDashboard /> },
  { key: 'journey', label: '고객 여정', component: <CustomerJourney /> },
  { key: 'compare', label: '기술 비교', component: <TechArchComparison /> },
];

function App() {
  const [page, setPage] = useState('overview');
  const currentPage = pages.find(p => p.key === page);
  
  return (
    <AppContainer>
      <Header>
        <HeaderContent>
          <CompanyName>JUNGHO GROUP</CompanyName>
          <CompanyTagline>조명제어시스템 전문업체</CompanyTagline>
        </HeaderContent>
      </Header>
      
      <NavBar>
        {pages.map(p => (
          <NavButton
            key={p.key}
            active={page === p.key}
            onClick={() => setPage(p.key)}
          >
            {p.label}
          </NavButton>
        ))}
      </NavBar>
      
      <MainContent>
        {currentPage && currentPage.component}
      </MainContent>
    </AppContainer>
  );
}

export default App; 