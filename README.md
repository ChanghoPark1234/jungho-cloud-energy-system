# Cloud-Based Energy System Architecture

A modern, interactive React component that visualizes a cloud system architecture for a lighting control company. This project demonstrates a comprehensive cloud infrastructure with glassmorphism effects, smooth animations, and professional presentation-ready design.

## Features

### 🏗️ Architecture Components
- **Field Devices**: 조명장치 (Lighting), 전력센서 (Power Sensors), IoT 센서
- **IoT Platform**: AWS IoT Core / Azure IoT Hub
- **Data Storage**: S3, TimescaleDB, PostgreSQL
- **Analytics**: SageMaker, Power BI, QuickSight
- **Customer Services**: B2B Dashboard, Mobile App
- **Security**: IAM, KMS
- **Global Centers**: 한국, 미국, 캐나다, 대만

### 🎨 Design Features
- **Glassmorphism Effects**: Modern glass-like UI with backdrop blur
- **Smooth Animations**: Framer Motion powered animations
- **Interactive Tooltips**: Hover effects with business value explanations
- **Data Flow Visualization**: Animated arrows showing data movement
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Professional Color Scheme**: Blue (#007BFF) for IoT/Data, Green (#28A745) for Analytics

### 🌐 Internationalization
- Korean labels with English subtitles
- Global data center visualization
- Multi-language tooltips

## Technology Stack

- **React 18**: Modern React with hooks
- **Framer Motion**: Smooth animations and transitions
- **Styled Components**: CSS-in-JS styling
- **Modern CSS**: Glassmorphism, gradients, and responsive design

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cloud-energy-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── CloudArchitecture.js    # Main architecture component
│   ├── ArchitectureNode.js     # Individual node components
│   ├── DataFlowArrow.js        # Animated data flow arrows
│   └── GlobalCenters.js        # Global data centers
├── App.js                      # Main app component
├── App.css                     # App-specific styles
├── index.js                    # React entry point
└── index.css                   # Global styles
```

## Usage

The component is designed for executive presentations and can be easily integrated into existing React applications:

```jsx
import CloudArchitecture from './components/CloudArchitecture';

function App() {
  return (
    <div className="App">
      <CloudArchitecture />
    </div>
  );
}
```

## Customization

### Colors
The color scheme can be customized by modifying the color values in the component files:
- IoT/Data: `#007BFF` (Blue)
- Analytics: `#28A745` (Green)
- Customer Services: `#6F42C1` (Purple)
- Security: `#DC3545` (Red)

### Adding New Components
To add new architecture components, modify the data arrays in `CloudArchitecture.js` and add corresponding tooltips in `ArchitectureNode.js`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request 