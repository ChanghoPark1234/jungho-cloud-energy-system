import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

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
  font-size: 2.2rem;
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

const JourneyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  width: 100%;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const PathContainer = styled.div`
  background: rgba(255,255,255,0.13);
  border-radius: 18px;
  padding: 24px 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  position: relative;
`;

const PathTitle = styled.h2`
  color: #222;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 18px;
  text-align: center;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: relative;
`;

const Stage = styled(motion.div)`
  background: rgba(0,123,255,0.07);
  border-radius: 14px;
  padding: 18px 14px;
  margin-bottom: 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
  cursor: pointer;
  position: relative;
  border-left: 6px solid ${props => props.active ? '#28A745' : '#007BFF'};
  transition: border-color 0.2s;
`;

const StageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StageTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #007BFF;
`;

const StageSub = styled.div`
  font-size: 0.98rem;
  color: #888;
`;

const ValueBox = styled(motion.div)`
  background: rgba(40,167,69,0.13);
  border-left: 4px solid #28A745;
  border-radius: 10px;
  padding: 10px 12px;
  margin-top: 10px;
  color: #222;
  font-size: 0.98rem;
`;

const PainSolutionBox = styled(motion.div)`
  background: rgba(255,193,7,0.13);
  border-left: 4px solid #FFC107;
  border-radius: 10px;
  padding: 10px 12px;
  margin-top: 10px;
  color: #222;
  font-size: 0.98rem;
`;

const Touchpoint = styled.div`
  position: absolute;
  left: -18px;
  top: 24px;
  width: 16px;
  height: 16px;
  background: ${props => props.active ? '#28A745' : '#007BFF'};
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(0,123,255,0.08);
  border: 2px solid #fff;
  z-index: 2;
`;

const stagesB2B = [
  {
    title: '문제 인식',
    sub: '에너지 비용 증가, 수동 관리',
    pain: '높은 에너지 비용, 비효율적 운영',
    solution: '실시간 데이터 수집 및 자동화 제안',
    value: '비용 절감 가능성 인식, 혁신 필요성 공감'
  },
  {
    title: '솔루션 검토',
    sub: '실시간 모니터링 데모',
    pain: '기존 시스템과의 연동 불안, 도입 효과 불확실',
    solution: '데모 대시보드 제공, 실제 데이터 기반 효과 시각화',
    value: '신뢰도 향상, 도입 의사 결정 지원'
  },
  {
    title: '도입',
    sub: '클라우드 시스템 설치',
    pain: '초기 투자 부담, 설치/교육 번거로움',
    solution: '정부 바우처 안내, 맞춤형 교육 지원',
    value: '도입 장벽 해소, 빠른 적응'
  },
  {
    title: '운영',
    sub: '대시보드 활용, 에너지 절감',
    pain: '운영 데이터 해석 어려움, 추가 최적화 필요',
    solution: 'AI 기반 리포트, 컨설팅 서비스 제공',
    value: '지속적 비용 절감, 운영 효율화'
  },
  {
    title: '확장',
    sub: '추가 시설 적용, 컨설팅 서비스',
    pain: '확장 시 비용/리스크 우려',
    solution: '성공 사례 공유, 단계별 확장 컨설팅',
    value: '사업 확장, 장기적 파트너십'
  }
];

const stagesB2C = [
  {
    title: '문제 인식',
    sub: '복잡한 조명 설정, 높은 전기료',
    pain: '설정이 어렵고, 전기료 부담',
    solution: '간편 앱 안내, 절약 효과 강조',
    value: '편리함 기대, 절약 동기 부여'
  },
  {
    title: '솔루션 검토',
    sub: '앱 다운로드, 제품 정보',
    pain: '신뢰 부족, 정보 부족',
    solution: '리뷰/평점 제공, 체험 영상 안내',
    value: '신뢰도 상승, 구매 의사 강화'
  },
  {
    title: '구매',
    sub: '온라인 주문, 설치 가이드',
    pain: '설치 번거로움, 초기 비용 부담',
    solution: '간편 설치 가이드, 프로모션/할인',
    value: '구매 장벽 해소, 빠른 도입'
  },
  {
    title: '사용',
    sub: '앱으로 원격 제어, 에너지 절약',
    pain: '앱 사용법 미숙, 기대 효과 미흡',
    solution: '사용법 영상, 절약 리포트 제공',
    value: '실질적 절약, 사용 만족도 증가'
  },
  {
    title: '만족',
    sub: '리뷰 작성, 추천',
    pain: 'A/S, 추가 정보 부족',
    solution: '실시간 지원, 커뮤니티 운영',
    value: '재구매/추천, 충성 고객화'
  }
];

export default function CustomerJourney() {
  const [activeB2B, setActiveB2B] = useState(0);
  const [activeB2C, setActiveB2C] = useState(0);

  return (
    <Container>
      <Title>고객 여정 맵 (Customer Journey Map)</Title>
      <Subtitle>조명 제어 클라우드 시스템의 B2B/B2C 고객 여정과 비즈니스 가치</Subtitle>
      <JourneyGrid>
        {/* B2B Journey */}
        <PathContainer>
          <PathTitle>B2B Journey<br/><span style={{fontWeight:400, fontSize:'1rem'}}>백화점, 데이터센터</span></PathTitle>
          <Timeline>
            {stagesB2B.map((stage, idx) => (
              <Stage
                key={idx}
                active={activeB2B === idx}
                whileHover={{ scale: 1.03 }}
                onClick={() => setActiveB2B(idx)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Touchpoint active={activeB2B === idx} style={{top: 24}} />
                <StageHeader>
                  <StageTitle>{stage.title}</StageTitle>
                  <StageSub>{stage.sub}</StageSub>
                </StageHeader>
                <AnimatePresence>
                  {activeB2B === idx && (
                    <>
                      <PainSolutionBox
                        key="pain"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <b>고객 Pain Point:</b> {stage.pain}<br/>
                        <b>솔루션:</b> {stage.solution}
                      </PainSolutionBox>
                      <ValueBox
                        key="value"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <b>비즈니스 가치:</b> {stage.value}
                      </ValueBox>
                    </>
                  )}
                </AnimatePresence>
              </Stage>
            ))}
          </Timeline>
        </PathContainer>
        {/* B2C Journey */}
        <PathContainer>
          <PathTitle>B2C Journey<br/><span style={{fontWeight:400, fontSize:'1rem'}}>가정, 소상공인</span></PathTitle>
          <Timeline>
            {stagesB2C.map((stage, idx) => (
              <Stage
                key={idx}
                active={activeB2C === idx}
                whileHover={{ scale: 1.03 }}
                onClick={() => setActiveB2C(idx)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Touchpoint active={activeB2C === idx} style={{top: 24}} />
                <StageHeader>
                  <StageTitle>{stage.title}</StageTitle>
                  <StageSub>{stage.sub}</StageSub>
                </StageHeader>
                <AnimatePresence>
                  {activeB2C === idx && (
                    <>
                      <PainSolutionBox
                        key="pain"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <b>고객 Pain Point:</b> {stage.pain}<br/>
                        <b>솔루션:</b> {stage.solution}
                      </PainSolutionBox>
                      <ValueBox
                        key="value"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <b>비즈니스 가치:</b> {stage.value}
                      </ValueBox>
                    </>
                  )}
                </AnimatePresence>
              </Stage>
            ))}
          </Timeline>
        </PathContainer>
      </JourneyGrid>
    </Container>
  );
} 