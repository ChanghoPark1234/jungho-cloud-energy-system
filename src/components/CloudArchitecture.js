import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import DataFlowArrow from './DataFlowArrow';
import ArchitectureNode from './ArchitectureNode';
import GlobalCenters from './GlobalCenters';

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
`;

const Title = styled(motion.h1)`
  text-align: center;
  color: #3B82F6;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled(motion.p)`
  text-align: center;
  color: #64748B;
  font-size: 1.1rem;
  margin-bottom: 3rem;
  font-weight: 300;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }
`;

const ArchitectureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-bottom: 40px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const SectionTitle = styled(motion.h2)`
  color: #3B82F6;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CloudArchitecture = () => {
  const [hoveredNode, setHoveredNode] = useState(null);

  const fieldDevices = [
    { id: 'lighting', name: '조명장치', subtitle: 'Lighting Devices', icon: '💡', color: '#007BFF' },
    { id: 'power-sensors', name: '전력센서', subtitle: 'Power Sensors', icon: '⚡', color: '#007BFF' },
    { id: 'iot-sensors', name: 'IoT 센서', subtitle: 'IoT Sensors', icon: '📡', color: '#007BFF' }
  ];

  const iotPlatform = [
    { id: 'aws-iot', name: 'AWS IoT Core', subtitle: 'IoT Platform', icon: '☁️', color: '#007BFF' },
    { id: 'azure-iot', name: 'Azure IoT Hub', subtitle: 'IoT Platform', icon: '☁️', color: '#007BFF' }
  ];

  const dataStorage = [
    { id: 's3', name: 'S3 Storage', subtitle: 'Object Storage', icon: '🗄️', color: '#007BFF' },
    { id: 'timescaledb', name: 'TimescaleDB', subtitle: 'Time Series DB', icon: '📊', color: '#007BFF' },
    { id: 'postgresql', name: 'PostgreSQL', subtitle: 'Relational DB', icon: '🗃️', color: '#007BFF' }
  ];

  const analytics = [
    { id: 'sagemaker', name: 'SageMaker', subtitle: 'ML Platform', icon: '🤖', color: '#28A745' },
    { id: 'powerbi', name: 'Power BI', subtitle: 'Business Intelligence', icon: '📈', color: '#28A745' },
    { id: 'quicksight', name: 'QuickSight', subtitle: 'Data Visualization', icon: '📊', color: '#28A745' }
  ];

  const customerServices = [
    { id: 'b2b-dashboard', name: 'B2B 대시보드', subtitle: 'Real-time Monitoring', icon: '🖥️', color: '#6F42C1' },
    { id: 'mobile-app', name: '모바일 앱', subtitle: 'Mobile App', icon: '📱', color: '#6F42C1' }
  ];

  const security = [
    { id: 'iam', name: 'IAM', subtitle: 'Identity & Access', icon: '🔐', color: '#DC3545' },
    { id: 'kms', name: 'KMS', subtitle: 'Key Management', icon: '🔑', color: '#DC3545' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <Container>
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        클라우드 기반 에너지 시스템 아키텍처
      </Title>
      <Subtitle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Cloud-Based Energy System Architecture for Lighting Control
      </Subtitle>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Field Devices Section */}
        <motion.div variants={itemVariants}>
          <SectionTitle>Field Devices / 현장 장치</SectionTitle>
          <ArchitectureGrid>
            {fieldDevices.map((device) => (
              <ArchitectureNode
                key={device.id}
                node={device}
                onHover={setHoveredNode}
                isHovered={hoveredNode === device.id}
              />
            ))}
          </ArchitectureGrid>
        </motion.div>

        {/* IoT Platform Section */}
        <motion.div variants={itemVariants}>
          <SectionTitle>IoT Platform / IoT 플랫폼</SectionTitle>
          <ArchitectureGrid>
            {iotPlatform.map((platform) => (
              <ArchitectureNode
                key={platform.id}
                node={platform}
                onHover={setHoveredNode}
                isHovered={hoveredNode === platform.id}
              />
            ))}
          </ArchitectureGrid>
        </motion.div>

        {/* Data Storage Section */}
        <motion.div variants={itemVariants}>
          <SectionTitle>Data Storage / 데이터 저장소</SectionTitle>
          <ArchitectureGrid>
            {dataStorage.map((storage) => (
              <ArchitectureNode
                key={storage.id}
                node={storage}
                onHover={setHoveredNode}
                isHovered={hoveredNode === storage.id}
              />
            ))}
          </ArchitectureGrid>
        </motion.div>

        {/* Analytics Section */}
        <motion.div variants={itemVariants}>
          <SectionTitle>Analytics / 분석</SectionTitle>
          <ArchitectureGrid>
            {analytics.map((analytic) => (
              <ArchitectureNode
                key={analytic.id}
                node={analytic}
                onHover={setHoveredNode}
                isHovered={hoveredNode === analytic.id}
              />
            ))}
          </ArchitectureGrid>
        </motion.div>

        {/* Customer Services Section */}
        <motion.div variants={itemVariants}>
          <SectionTitle>Customer Services / 고객 서비스</SectionTitle>
          <ArchitectureGrid>
            {customerServices.map((service) => (
              <ArchitectureNode
                key={service.id}
                node={service}
                onHover={setHoveredNode}
                isHovered={hoveredNode === service.id}
              />
            ))}
          </ArchitectureGrid>
        </motion.div>

        {/* Security Section */}
        <motion.div variants={itemVariants}>
          <SectionTitle>Security / 보안</SectionTitle>
          <ArchitectureGrid>
            {security.map((sec) => (
              <ArchitectureNode
                key={sec.id}
                node={sec}
                onHover={setHoveredNode}
                isHovered={hoveredNode === sec.id}
              />
            ))}
          </ArchitectureGrid>
        </motion.div>

        {/* Global Centers */}
        <motion.div variants={itemVariants}>
          <GlobalCenters />
        </motion.div>

        {/* Data Flow Arrows */}
        <DataFlowArrow />
      </motion.div>
    </Container>
  );
};

export default CloudArchitecture; 