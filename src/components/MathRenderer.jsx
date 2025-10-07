import React from 'react';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';

const TextWithMath = ({ text, className = '' }) => {
  if (typeof text !== 'string') {
    return null;
  }

  // Regex untuk menemukan semua format LaTeX
  const mathRegex = /(\$[^$]+\$|\\\[.+?\\\]|\\\(.+?\\\))/g;
  const parts = text.split(mathRegex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.match(mathRegex)) {
          let mathContent = part;
          let isBlock = false; // Default-nya adalah inline

          // Hapus pembatas dan cek apakah ini 'block' math
          if (part.startsWith('$') && part.endsWith('$')) {
            mathContent = part.slice(1, -1);
          } else if (part.startsWith('\\(') && part.endsWith('\\)')) {
            mathContent = part.slice(2, -2);
          } else if (part.startsWith('\\[') && part.endsWith('\\]')) {
            mathContent = part.slice(2, -2);
            isBlock = true; // Ini adalah 'block' math, harus di baris baru
          }
          
          // Gunakan prop 'block' jika isBlock adalah true
          if (isBlock) {
            return <TeX key={index} block math={mathContent} />;
          }
          return <TeX key={index} math={mathContent} />;

        } else {
          // Render sebagai teks biasa
          return <span key={index}>{part}</span>;
        }
      })}
    </span>
  );
};

export { TextWithMath };