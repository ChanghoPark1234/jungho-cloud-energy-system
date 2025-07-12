import React from 'react';
import styled from 'styled-components';

const StyledHeading = styled.h1`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 16px 0;
  color: #1E293B;
  
  ${props => props.variant === 'h1' && `
    font-size: 32px;
    font-weight: 700;
  `}
  
  ${props => props.variant === 'h2' && `
    font-size: 24px;
    font-weight: 600;
  `}
  
  ${props => props.variant === 'h3' && `
    font-size: 20px;
    font-weight: 600;
  `}
  
  ${props => props.variant === 'h4' && `
    font-size: 18px;
    font-weight: 600;
  `}
  
  ${props => props.variant === 'h5' && `
    font-size: 16px;
    font-weight: 600;
  `}
  
  ${props => props.variant === 'h6' && `
    font-size: 14px;
    font-weight: 600;
  `}
  
  ${props => props.color === 'primary' && `
    color: #3B82F6;
  `}
  
  ${props => props.color === 'secondary' && `
    color: #64748B;
  `}
  
  ${props => props.color === 'success' && `
    color: #10B981;
  `}
  
  ${props => props.color === 'warning' && `
    color: #F59E0B;
  `}
  
  ${props => props.color === 'error' && `
    color: #EF4444;
  `}
  
  ${props => props.align === 'center' && `
    text-align: center;
  `}
  
  ${props => props.align === 'right' && `
    text-align: right;
  `}
  
  ${props => props.align === 'left' && `
    text-align: left;
  `}
`;

const StyledText = styled.p`
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  margin: 0 0 16px 0;
  color: #1E293B;
  
  ${props => props.variant === 'body' && `
    font-size: 16px;
    font-weight: 400;
  `}
  
  ${props => props.variant === 'body-large' && `
    font-size: 18px;
    font-weight: 400;
  `}
  
  ${props => props.variant === 'body-small' && `
    font-size: 14px;
    font-weight: 400;
  `}
  
  ${props => props.variant === 'caption' && `
    font-size: 12px;
    font-weight: 400;
    color: #64748B;
  `}
  
  ${props => props.variant === 'label' && `
    font-size: 14px;
    font-weight: 500;
    color: #374151;
  `}
  
  ${props => props.color === 'primary' && `
    color: #3B82F6;
  `}
  
  ${props => props.color === 'secondary' && `
    color: #64748B;
  `}
  
  ${props => props.color === 'success' && `
    color: #10B981;
  `}
  
  ${props => props.color === 'warning' && `
    color: #F59E0B;
  `}
  
  ${props => props.color === 'error' && `
    color: #EF4444;
  `}
  
  ${props => props.align === 'center' && `
    text-align: center;
  `}
  
  ${props => props.align === 'right' && `
    text-align: right;
  `}
  
  ${props => props.align === 'left' && `
    text-align: left;
  `}
  
  ${props => props.bold && `
    font-weight: 600;
  `}
  
  ${props => props.italic && `
    font-style: italic;
  `}
  
  ${props => props.underline && `
    text-decoration: underline;
  `}
  
  ${props => props.noMargin && `
    margin: 0;
  `}
`;

const StyledLink = styled.a`
  font-family: 'Inter', sans-serif;
  color: #3B82F6;
  text-decoration: none;
  transition: all 250ms ease-in-out;
  cursor: pointer;
  
  &:hover {
    color: #1D4ED8;
    text-decoration: underline;
  }
  
  ${props => props.variant === 'subtle' && `
    color: #64748B;
    
    &:hover {
      color: #3B82F6;
    }
  `}
  
  ${props => props.variant === 'button' && `
    display: inline-flex;
    align-items: center;
    padding: 12px 24px;
    background: linear-gradient(135deg, #3B82F6, #1D4ED8);
    color: #FFFFFF;
    border-radius: 12px;
    font-weight: 500;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      text-decoration: none;
    }
  `}
`;

// Heading Component
export const Heading = ({ 
  children, 
  variant = 'h1', 
  color = 'default',
  align = 'left',
  className,
  ...props 
}) => {
  return (
    <StyledHeading
      as={variant}
      variant={variant}
      color={color}
      align={align}
      className={className}
      {...props}
    >
      {children}
    </StyledHeading>
  );
};

// Text Component
export const Text = ({ 
  children, 
  variant = 'body', 
  color = 'default',
  align = 'left',
  bold = false,
  italic = false,
  underline = false,
  noMargin = false,
  className,
  ...props 
}) => {
  return (
    <StyledText
      variant={variant}
      color={color}
      align={align}
      bold={bold}
      italic={italic}
      underline={underline}
      noMargin={noMargin}
      className={className}
      {...props}
    >
      {children}
    </StyledText>
  );
};

// Link Component
export const Link = ({ 
  children, 
  href, 
  variant = 'default',
  target,
  rel,
  className,
  ...props 
}) => {
  return (
    <StyledLink
      href={href}
      variant={variant}
      target={target}
      rel={rel}
      className={className}
      {...props}
    >
      {children}
    </StyledLink>
  );
};

// Export individual components
export const H1 = (props) => <Heading variant="h1" {...props} />;
export const H2 = (props) => <Heading variant="h2" {...props} />;
export const H3 = (props) => <Heading variant="h3" {...props} />;
export const H4 = (props) => <Heading variant="h4" {...props} />;
export const H5 = (props) => <Heading variant="h5" {...props} />;
export const H6 = (props) => <Heading variant="h6" {...props} />;

export const Body = (props) => <Text variant="body" {...props} />;
export const BodyLarge = (props) => <Text variant="body-large" {...props} />;
export const BodySmall = (props) => <Text variant="body-small" {...props} />;
export const Caption = (props) => <Text variant="caption" {...props} />;
export const Label = (props) => <Text variant="label" {...props} />;

export default {
  Heading,
  Text,
  Link,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Body,
  BodyLarge,
  BodySmall,
  Caption,
  Label
}; 