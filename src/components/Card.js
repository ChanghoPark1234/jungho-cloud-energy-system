import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  background-color: #FFFFFF;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 250ms ease-in-out;
  border: 1px solid #E5E7EB;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  
  ${props => props.variant === 'elevated' && `
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    
    &:hover {
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
  `}
  
  ${props => props.variant === 'outlined' && `
    box-shadow: none;
    border: 2px solid #E5E7EB;
    
    &:hover {
      border-color: #3B82F6;
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
  `}
  
  ${props => props.variant === 'gradient' && `
    background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%);
    border: 1px solid #E5E7EB;
  `}
  
  ${props => props.padding === 'small' && `
    padding: 16px;
  `}
  
  ${props => props.padding === 'large' && `
    padding: 32px;
  `}
  
  ${props => props.fullWidth && `
    width: 100%;
  `}
  
  ${props => props.clickable && `
    cursor: pointer;
    user-select: none;
  `}
`;

const CardHeader = styled.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E5E7EB;
  
  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #1E293B;
  }
  
  p {
    margin: 8px 0 0 0;
    color: #64748B;
    font-size: 14px;
  }
`;

const CardContent = styled.div`
  color: #1E293B;
  line-height: 1.6;
`;

const CardFooter = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const Card = ({ 
  children, 
  variant = 'default',
  padding = 'medium',
  fullWidth = false,
  clickable = false,
  onClick,
  className,
  header,
  footer,
  ...props 
}) => {
  return (
    <StyledCard
      variant={variant}
      padding={padding}
      fullWidth={fullWidth}
      clickable={clickable}
      onClick={onClick}
      className={className}
      {...props}
    >
      {header && (
        <CardHeader>
          {typeof header === 'string' ? <h3>{header}</h3> : header}
        </CardHeader>
      )}
      
      <CardContent>
        {children}
      </CardContent>
      
      {footer && (
        <CardFooter>
          {footer}
        </CardFooter>
      )}
    </StyledCard>
  );
};

export default Card; 