import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 250ms ease-in-out;
  min-height: 44px;
  gap: 8px;
  
  &:focus {
    outline: 2px solid #3B82F6;
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
  
  ${props => props.variant === 'primary' && `
    background: linear-gradient(135deg, #3B82F6, #1D4ED8);
    color: #FFFFFF;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background-color: #FFFFFF;
    color: #3B82F6;
    border: 2px solid #3B82F6;
    
    &:hover:not(:disabled) {
      background-color: #3B82F6;
      color: #FFFFFF;
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  `}
  
  ${props => props.variant === 'success' && `
    background: linear-gradient(135deg, #10B981, #059669);
    color: #FFFFFF;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
  `}
  
  ${props => props.variant === 'warning' && `
    background: linear-gradient(135deg, #F59E0B, #D97706);
    color: #FFFFFF;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
  `}
  
  ${props => props.variant === 'error' && `
    background: linear-gradient(135deg, #EF4444, #DC2626);
    color: #FFFFFF;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
  `}
  
  ${props => props.size === 'small' && `
    padding: 8px 16px;
    font-size: 14px;
    min-height: 36px;
  `}
  
  ${props => props.size === 'large' && `
    padding: 16px 32px;
    font-size: 18px;
    min-height: 52px;
  `}
  
  ${props => props.fullWidth && `
    width: 100%;
  `}
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className,
  ...props 
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={className}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 