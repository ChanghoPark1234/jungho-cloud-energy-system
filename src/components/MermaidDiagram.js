import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false });

const MermaidDiagram = ({ chart, className = '', style = {} }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && chart) {
      ref.current.innerHTML = '';
      try {
        // 문법 체크 (에러 발생 시 catch로 이동)
        mermaid.parse(chart);
        // mermaid 클래스를 가진 div에 자동으로 SVG 삽입
        ref.current.removeAttribute('data-processed'); // 강제 재렌더링
        ref.current.classList.add('mermaid');
        ref.current.textContent = chart;
        mermaid.run({ nodes: [ref.current] });
      } catch (err) {
        console.error('Mermaid 렌더링 오류:', err);
        ref.current.innerHTML = '<p>다이어그램을 렌더링할 수 없습니다.</p>';
      }
    }
  }, [chart]);

  return (
    <div
      ref={ref}
      className={`mermaid ${className}`}
      style={style}
    />
  );
};

export default MermaidDiagram; 