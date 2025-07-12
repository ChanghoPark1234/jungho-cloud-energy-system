import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Legend } from 'recharts';

// Styled Components
const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Section = styled(motion.section)`
  background: rgba(255,255,255,0.12);
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 24px 20px;
  margin-bottom: 0;
  backdrop-filter: blur(8px);
`;

const SectionTitle = styled.h2`
  color: #007BFF;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 18px;
  letter-spacing: -1px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
`;

const KpiCard = styled(motion.div)`
  background: rgba(255,255,255,0.18);
  border-radius: 16px;
  padding: 20px 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-left: 6px solid ${props => props.color || '#007BFF'};
`;

const KpiLabel = styled.div`
  color: #222;
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 6px;
`;

const KpiValue = styled.div`
  color: #007BFF;
  font-size: 2rem;
  font-weight: 700;
`;

const KpiSub = styled.div`
  color: #888;
  font-size: 0.9rem;
  margin-top: 2px;
`;

const SliderLabel = styled.div`
  font-size: 0.95rem;
  color: #333;
  margin-bottom: 4px;
`;

const SliderInput = styled.input`
  width: 100%;
  margin: 0 0 12px 0;
`;

const TimelineList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TimelineItem = styled.li`
  margin-bottom: 12px;
  padding-left: 18px;
  position: relative;
  color: #007BFF;
  font-weight: 600;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 7px;
    width: 8px;
    height: 8px;
    background: #28A745;
    border-radius: 50%;
  }
`;

const SupportBox = styled.div`
  background: rgba(40,167,69,0.12);
  border-left: 6px solid #28A745;
  border-radius: 12px;
  padding: 18px 16px;
  color: #222;
  font-size: 1.1rem;
  margin-top: 10px;
`;

// KPI/Chart Data
const beforeAfterData = [
  { name: 'Before', Revenue: 100, Cost: 100, Satisfaction: 60 },
  { name: 'After', Revenue: 140, Cost: 70, Satisfaction: 90 },
];

const timeline = [
  { milestone: '3개월', desc: 'PoC 및 초기 구축' },
  { milestone: '6개월', desc: '시스템 통합 및 시범 운영' },
  { milestone: '12개월', desc: '전사 확산 및 최적화' },
];

export default function ExecutiveDashboard() {
  // ROI Calculator State
  const [investment, setInvestment] = useState(8000); // 만원 단위
  const [revenueGrowth, setRevenueGrowth] = useState(40); // %
  const [costSaving, setCostSaving] = useState(30); // %

  // ROI 계산 (예시)
  const roi = ((investment * (revenueGrowth + costSaving) / 100) / investment) * 100;
  const payback = investment / ((investment * (revenueGrowth + costSaving) / 100));

  return (
    <DashboardContainer>
      {/* KPI Cards */}
      <Section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <SectionTitle>ROI Metrics / 주요 성과 지표</SectionTitle>
        <CardGrid>
          <KpiCard color="#007BFF" whileHover={{ scale: 1.04 }}>
            <KpiLabel>매출 증가<br/><span style={{fontWeight:400, fontSize:'0.95rem'}}>Revenue Growth</span></KpiLabel>
            <KpiValue>+{revenueGrowth}%</KpiValue>
            <KpiSub>클라우드 도입 후</KpiSub>
          </KpiCard>
          <KpiCard color="#28A745" whileHover={{ scale: 1.04 }}>
            <KpiLabel>비용 절감<br/><span style={{fontWeight:400, fontSize:'0.95rem'}}>Cost Savings</span></KpiLabel>
            <KpiValue>-{costSaving}%</KpiValue>
            <KpiSub>운영/유지보수 기준</KpiSub>
          </KpiCard>
          <KpiCard color="#6F42C1" whileHover={{ scale: 1.04 }}>
            <KpiLabel>투자 회수 기간<br/><span style={{fontWeight:400, fontSize:'0.95rem'}}>Payback Period</span></KpiLabel>
            <KpiValue>{payback.toFixed(1)}년</KpiValue>
            <KpiSub>ROI 기준</KpiSub>
          </KpiCard>
        </CardGrid>
      </Section>

      {/* Before/After Comparison Charts */}
      <Section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
        <SectionTitle>Before / After 비교</SectionTitle>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={beforeAfterData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Revenue" fill="#007BFF" name="매출" />
            <Bar dataKey="Cost" fill="#28A745" name="비용" />
            <Bar dataKey="Satisfaction" fill="#6F42C1" name="만족도" />
          </BarChart>
        </ResponsiveContainer>
      </Section>

      {/* ROI Calculator */}
      <Section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
        <SectionTitle>ROI 계산기 / ROI Calculator</SectionTitle>
        <SliderLabel>투자 금액 (만원): {investment.toLocaleString()} 만원</SliderLabel>
        <SliderInput type="range" min={1000} max={20000} step={100} value={investment} onChange={e => setInvestment(Number(e.target.value))} />
        <SliderLabel>매출 증가율 (%): {revenueGrowth}%</SliderLabel>
        <SliderInput type="range" min={0} max={100} step={1} value={revenueGrowth} onChange={e => setRevenueGrowth(Number(e.target.value))} />
        <SliderLabel>비용 절감율 (%): {costSaving}%</SliderLabel>
        <SliderInput type="range" min={0} max={100} step={1} value={costSaving} onChange={e => setCostSaving(Number(e.target.value))} />
        <KpiSub>예상 ROI: <span style={{color:'#007BFF', fontWeight:700}}>{roi.toFixed(1)}%</span> / 투자 회수 기간: <span style={{color:'#28A745', fontWeight:700}}>{payback.toFixed(1)}년</span></KpiSub>
      </Section>

      {/* Market Expansion & Operational Efficiency & Customer Satisfaction */}
      <Section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
        <SectionTitle>Business Impact / 비즈니스 임팩트</SectionTitle>
        <CardGrid>
          <KpiCard color="#007BFF" whileHover={{ scale: 1.04 }}>
            <KpiLabel>B2B 확장<br/><span style={{fontWeight:400, fontSize:'0.95rem'}}>B2B Expansion</span></KpiLabel>
            <KpiValue>+3개사</KpiValue>
            <KpiSub>신규 파트너 확보</KpiSub>
          </KpiCard>
          <KpiCard color="#007BFF" whileHover={{ scale: 1.04 }}>
            <KpiLabel>B2C 신규 진입<br/><span style={{fontWeight:400, fontSize:'0.95rem'}}>B2C Entry</span></KpiLabel>
            <KpiValue>+1만명</KpiValue>
            <KpiSub>신규 사용자</KpiSub>
          </KpiCard>
          <KpiCard color="#28A745" whileHover={{ scale: 1.04 }}>
            <KpiLabel>유지보수 비용 절감<br/><span style={{fontWeight:400, fontSize:'0.95rem'}}>Maintenance Savings</span></KpiLabel>
            <KpiValue>-25%</KpiValue>
            <KpiSub>원격 관리 도입</KpiSub>
          </KpiCard>
          <KpiCard color="#28A745" whileHover={{ scale: 1.04 }}>
            <KpiLabel>에너지 절약<br/><span style={{fontWeight:400, fontSize:'0.95rem'}}>Energy Savings</span></KpiLabel>
            <KpiValue>-18%</KpiValue>
            <KpiSub>스마트 제어</KpiSub>
          </KpiCard>
          <KpiCard color="#6F42C1" whileHover={{ scale: 1.04 }}>
            <KpiLabel>실시간 지원<br/><span style={{fontWeight:400, fontSize:'0.95rem'}}>Real-time Support</span></KpiLabel>
            <KpiValue>24/7</KpiValue>
            <KpiSub>고객센터</KpiSub>
          </KpiCard>
          <KpiCard color="#6F42C1" whileHover={{ scale: 1.04 }}>
            <KpiLabel>앱 만족도<br/><span style={{fontWeight:400, fontSize:'0.95rem'}}>App Satisfaction</span></KpiLabel>
            <KpiValue>92%</KpiValue>
            <KpiSub>앱스토어 평점</KpiSub>
          </KpiCard>
        </CardGrid>
      </Section>

      {/* Timeline Roadmap */}
      <Section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
        <SectionTitle>Implementation Timeline / 도입 로드맵</SectionTitle>
        <TimelineList>
          {timeline.map((item, idx) => (
            <TimelineItem key={idx}>
              <span style={{fontWeight:700}}>{item.milestone}</span> - {item.desc}
            </TimelineItem>
          ))}
        </TimelineList>
      </Section>

      {/* Government Support */}
      <Section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
        <SectionTitle>정부 지원 / Government Support</SectionTitle>
        <SupportBox>
          <span role="img" aria-label="voucher">💰</span> 클라우드 바우처 최대 <b>8,000만원</b> 지원<br/>
          <span style={{fontSize:'0.95rem', color:'#555'}}>정부 지원 사업을 통해 초기 투자 부담 완화</span>
        </SupportBox>
      </Section>
    </DashboardContainer>
  );
} 