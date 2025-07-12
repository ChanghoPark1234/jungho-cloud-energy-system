import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const CentersContainer = styled(motion.div)`
  margin-top: 40px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
`;

const SectionTitle = styled.h2`
  color: #3B82F6;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
`;

const CentersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
`;

const CenterCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border-color: #007BFF40;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #007BFF, #007BFF80);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
`;

const Flag = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
`;

const CountryName = styled.h3`
  color: #1E293B;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 5px;
`;

const RegionName = styled.p`
  color: #64748B;
  font-size: 0.8rem;
  font-weight: 400;
  margin: 0;
`;

const StatusIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #28A745;
  margin: 10px auto 0;
  box-shadow: 0 0 10px #28A745;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.2);
    }
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  white-space: nowrap;
  z-index: 1000;
  pointer-events: none;
  
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid rgba(0, 0, 0, 0.9);
  }
`;

const GlobalCenters = () => {
  const [hoveredCenter, setHoveredCenter] = useState(null);

  const centers = [
    {
      id: 'korea',
      flag: '🇰🇷',
      country: '한국',
      region: 'Korea',
      description: '메인 데이터 센터 및 개발 센터'
    },
    {
      id: 'usa',
      flag: '🇺🇸',
      country: '미국',
      region: 'United States',
      description: '북미 지역 서비스 및 분석 센터'
    },
    {
      id: 'canada',
      flag: '🇨🇦',
      country: '캐나다',
      region: 'Canada',
      description: '캐나다 지역 데이터 처리 센터'
    },
    {
      id: 'taiwan',
      flag: '🇹🇼',
      country: '대만',
      region: 'Taiwan',
      description: '아시아 태평양 지역 서비스 센터'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <CentersContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <SectionTitle>Global Data Centers / 글로벌 데이터 센터</SectionTitle>
      <CentersGrid>
        {centers.map((center) => (
          <CenterCard
            key={center.id}
            variants={itemVariants}
            onMouseEnter={() => setHoveredCenter(center.id)}
            onMouseLeave={() => setHoveredCenter(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Flag>{center.flag}</Flag>
            <CountryName>{center.country}</CountryName>
            <RegionName>{center.region}</RegionName>
            <StatusIndicator />
            
            {hoveredCenter === center.id && (
              <Tooltip
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                {center.description}
              </Tooltip>
            )}
          </CenterCard>
        ))}
      </CentersGrid>
    </CentersContainer>
  );
};

export default GlobalCenters; 