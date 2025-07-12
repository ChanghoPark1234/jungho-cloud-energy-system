import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #007BFF;
  font-size: 2.1rem;
  font-weight: 700;
  margin-bottom: 8px;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #555;
  font-size: 1.1rem;
  margin-bottom: 32px;
  text-align: center;
`;

const CompareGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 60px 1fr;
  gap: 24px;
  width: 100%;
  align-items: start;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const SystemBox = styled(motion.div)`
  background: rgba(255,255,255,0.13);
  border-radius: 18px;
  padding: 28px 20px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  min-height: 340px;
`;

const SystemTitle = styled.h2`
  color: #222;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 18px;
  text-align: left;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 18px 0;
`;

const Feature = styled.li`
  font-size: 1.05rem;
  color: #007BFF;
  margin-bottom: 10px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ImpactBox = styled.div`
  background: rgba(40,167,69,0.13);
  border-left: 4px solid #28A745;
  border-radius: 10px;
  padding: 10px 12px;
  color: #222;
  font-size: 0.98rem;
  margin-bottom: 10px;
`;

const ArrowCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Arrow = styled(motion.div)`
  width: 40px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @media (max-width: 900px) {
    display: none;
  }
`;

const Timeline = styled.div`
  margin: 32px 0 0 0;
  width: 100%;
  background: rgba(0,123,255,0.07);
  border-radius: 12px;
  padding: 18px 14px;
`;

const TimelineTitle = styled.div`
  color: #007BFF;
  font-weight: 700;
  margin-bottom: 10px;
`;

const TimelineStep = styled.div`
  font-size: 1rem;
  color: #333;
  margin-bottom: 6px;
  padding-left: 12px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 7px;
    height: 7px;
    background: #28A745;
    border-radius: 50%;
  }
`;

const CostCompare = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
  margin: 32px 0 0 0;
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const CostBox = styled.div`
  background: rgba(255,193,7,0.13);
  border-left: 4px solid #FFC107;
  border-radius: 10px;
  padding: 14px 16px;
  color: #222;
  font-size: 1rem;
  min-width: 180px;
`;

const RiskBox = styled.div`
  background: rgba(220,53,69,0.13);
  border-left: 4px solid #DC3545;
  border-radius: 10px;
  padding: 14px 16px;
  color: #222;
  font-size: 1rem;
  margin-top: 18px;
`;

export default function TechArchComparison() {
  return (
    <Container>
      <Title>기술 아키텍처 비교 (Current vs. Future)</Title>
      <Subtitle>조명 제어 시스템의 현재 온프레미스 환경과 미래 클라우드 기반 시스템 비교</Subtitle>
      <CompareGrid>
        {/* Current System */}
        <SystemBox initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <SystemTitle>Current System<br/><span style={{fontWeight:400, fontSize:'1rem'}}>온프레미스</span></SystemTitle>
          <FeatureList>
            <Feature>🖥️ 온프레미스 서버</Feature>
            <Feature>✍️ 수동 데이터 수집</Feature>
            <Feature>📊 제한된 분석</Feature>
            <Feature>📞 개별 고객 지원</Feature>
          </FeatureList>
          <ImpactBox>
            • 높은 유지보수 비용<br/>
            • 확장성 한계<br/>
            • 실시간 대응 어려움
          </ImpactBox>
        </SystemBox>
        {/* Arrow & Migration Path */}
        <ArrowCol>
          <Arrow initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <svg width="40" height="180" viewBox="0 0 40 180">
              <defs>
                <linearGradient id="migArrow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#007BFF" />
                  <stop offset="100%" stopColor="#28A745" />
                </linearGradient>
              </defs>
              <path d="M20 10 Q20 90 20 170" stroke="url(#migArrow)" strokeWidth="6" fill="none" strokeDasharray="8 8" />
              <polygon points="20,170 12,160 28,160" fill="#28A745" />
            </svg>
          </Arrow>
        </ArrowCol>
        {/* Future System */}
        <SystemBox initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <SystemTitle>Future System<br/><span style={{fontWeight:400, fontSize:'1rem'}}>클라우드 기반</span></SystemTitle>
          <FeatureList>
            <Feature>☁️ AWS/Azure 클라우드</Feature>
            <Feature>📡 실시간 IoT 데이터 수집</Feature>
            <Feature>🤖 AI 기반 분석 및 예측</Feature>
            <Feature>🌐 통합 B2B/B2C 플랫폼</Feature>
          </FeatureList>
          <ImpactBox>
            • 비용 절감 및 정부 지원<br/>
            • 무제한 확장성<br/>
            • 실시간 대응 및 자동화
          </ImpactBox>
        </SystemBox>
      </CompareGrid>
      {/* Migration Timeline */}
      <Timeline>
        <TimelineTitle>Migration Path / 마이그레이션 단계</TimelineTitle>
        <TimelineStep>1. 요구사항 분석 및 PoC</TimelineStep>
        <TimelineStep>2. 데이터 마이그레이션 및 연동</TimelineStep>
        <TimelineStep>3. 클라우드 시스템 구축</TimelineStep>
        <TimelineStep>4. 사용자 교육 및 시범 운영</TimelineStep>
        <TimelineStep>5. 전체 전환 및 최적화</TimelineStep>
      </Timeline>
      {/* Cost Comparison & Risk Mitigation */}
      <CostCompare>
        <CostBox>
          <b>현재 연간 비용:</b><br/> 약 1억원 (서버, 인건비, 유지보수)<br/>
          <b>미래 연간 비용:</b><br/> 약 6,000만원 (클라우드, 자동화)<br/>
          <b>정부 지원:</b><br/> 클라우드 바우처 최대 8,000만원
        </CostBox>
        <RiskBox>
          <b>Risk Mitigation:</b><br/>
          • 단계별 전환으로 서비스 중단 최소화<br/>
          • 데이터 백업 및 이중화<br/>
          • 보안/컴플라이언스 컨설팅 제공
        </RiskBox>
      </CostCompare>
    </Container>
  );
} 