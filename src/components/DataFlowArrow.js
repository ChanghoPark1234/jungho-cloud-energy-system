import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ArrowContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const Arrow = styled(motion.path)`
  stroke: ${props => props.color};
  stroke-width: 2;
  fill: none;
  stroke-dasharray: 10;
  filter: drop-shadow(0 0 5px ${props => props.color}40);
`;

const DataFlowArrow = () => {
  const arrows = [
    {
      id: 'field-to-iot',
      path: 'M 200 150 Q 400 150 600 150',
      color: '#007BFF',
      delay: 0
    },
    {
      id: 'iot-to-storage',
      path: 'M 600 200 Q 800 200 1000 200',
      color: '#007BFF',
      delay: 0.5
    },
    {
      id: 'storage-to-analytics',
      path: 'M 1000 250 Q 1200 250 1400 250',
      color: '#28A745',
      delay: 1
    },
    {
      id: 'analytics-to-services',
      path: 'M 1400 300 Q 1600 300 1800 300',
      color: '#6F42C1',
      delay: 1.5
    }
  ];

  return (
    <ArrowContainer>
      <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
        {arrows.map((arrow) => (
          <g key={arrow.id}>
            <Arrow
              d={arrow.path}
              color={arrow.color}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 2, delay: arrow.delay, ease: "easeInOut" },
                opacity: { duration: 1, delay: arrow.delay }
              }}
            />
            <motion.circle
              cx="0"
              cy="0"
              r="3"
              fill={arrow.color}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: arrow.delay + 1 }}
            >
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                path={arrow.path}
                begin={`${arrow.delay}s`}
              />
            </motion.circle>
          </g>
        ))}
      </svg>
    </ArrowContainer>
  );
};

export default DataFlowArrow; 