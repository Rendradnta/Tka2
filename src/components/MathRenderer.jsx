import React from 'react';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';

const TextWithMath = ({ text, className = '' }) => {
  if (typeof text !== 'string') {
    return null;
  }

  // Pola untuk menemukan semua format LaTeX
  const mathRegex = /(\$[^$]+\$|\\\[.+?\\\]|\\\(.+?\\\))/g;
  
  // Pecah teks menjadi array berisi teks biasa dan rumus
  const parts = text.split(mathRegex);

  return (
    // Kita tambahkan kelas 'whitespace-pre-wrap' di sini agar \n berfungsi
    <span className={`${className} whitespace-pre-wrap`}>
      {parts.map((part, index) => {
        // Cek apakah bagian ini adalah rumus matematika
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
          // Jika bukan rumus, render sebagai teks biasa.
          // \n akan berfungsi karena ada 'whitespace-pre-wrap' di parent <span>
          return part;
        }
      })}
    </span>
  );
};

export { TextWithMath };