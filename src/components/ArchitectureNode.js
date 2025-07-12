import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const NodeContainer = styled(motion.div)`
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
    border-color: ${props => props.color}40;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${props => props.color}, ${props => props.color}80);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
`;

const Icon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 10px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
`;

const Name = styled.h3`
  color: #1E293B;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Subtitle = styled.p`
  color: #64748B;
  font-size: 0.8rem;
  font-weight: 400;
  margin: 0;
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  bottom: -60px;
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

const PulseRing = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border: 2px solid ${props => props.color};
  border-radius: 16px;
  opacity: 0;
`;

const ArchitectureNode = ({ node, onHover, isHovered }) => {
  const handleMouseEnter = () => {
    onHover(node.id);
  };

  const handleMouseLeave = () => {
    onHover(null);
  };

  const getTooltipContent = (nodeId) => {
    const tooltips = {
      'lighting': '실시간 조명 제어 및 에너지 최적화',
      'power-sensors': '전력 소비량 실시간 모니터링',
      'iot-sensors': '환경 데이터 수집 및 분석',
      'aws-iot': 'AWS IoT Core를 통한 디바이스 연결 관리',
      'azure-iot': 'Azure IoT Hub를 통한 스케일러블 IoT 솔루션',
      's3': '대용량 데이터 저장 및 백업',
      'timescaledb': '시계열 데이터 최적화 저장',
      'postgresql': '관계형 데이터베이스 관리',
      'sagemaker': '머신러닝 모델 개발 및 배포',
      'powerbi': '비즈니스 인텔리전스 및 리포트',
      'quicksight': '데이터 시각화 및 대시보드',
      'b2b-dashboard': '실시간 모니터링 및 제어 대시보드',
      'mobile-app': '모바일 기반 사용자 인터페이스',
      'iam': '사용자 인증 및 권한 관리',
      'kms': '암호화 키 관리 및 보안'
    };
    return tooltips[nodeId] || 'Component description';
  };

  return (
    <NodeContainer
      color={node.color}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isHovered && (
        <PulseRing
          color={node.color}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      <Icon>{node.icon}</Icon>
      <Name>{node.name}</Name>
      <Subtitle>{node.subtitle}</Subtitle>
      
      {isHovered && (
        <Tooltip
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {getTooltipContent(node.id)}
        </Tooltip>
      )}
    </NodeContainer>
  );
};

export default ArchitectureNode; 