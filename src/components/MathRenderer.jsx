import React from 'react';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';

/**
 * Komponen ini akan memecah teks menjadi dua jenis: teks biasa dan rumus matematika.
 * Teks biasa akan ditampilkan apa adanya.
 * Rumus matematika (yang diapit oleh $...$, \\[...\\] atau \\(...) ) akan dirender menggunakan KaTeX.
 * Seluruh komponen dibungkus dengan <span> agar tidak merusak layout.
 */
const TextWithMath = ({ text, className = '' }) => {
  // Pastikan input adalah string untuk mencegah error
  if (typeof text !== 'string') {
    return null;
  }

  // BARU: Regex diperbarui untuk mengenali format \\(...) juga
  const mathRegex = /(\$[^$]+\$|\\\[.+?\\\]|\\\(.+?\\\))/g;
  
  // Pecah teks menjadi array berisi teks biasa dan rumus
  const parts = text.split(mathRegex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        // Cek apakah bagian ini adalah rumus matematika
        if (part.match(mathRegex)) {
          let mathContent = part;

          // Hapus pembatas agar bisa dirender oleh library
          if (part.startsWith('$') && part.endsWith('$')) {
            mathContent = part.slice(1, -1);
          } else if (part.startsWith('\\[') && part.endsWith('\\]')) {
            mathContent = part.slice(2, -2);
          } else if (part.startsWith('\\(') && part.endsWith('\\)')) {
            mathContent = part.slice(2, -2);
          }
          
          // Render bagian rumus menggunakan komponen TeX (KaTeX)
          return <TeX key={index} math={mathContent} />;
        } else {
          // Jika bukan rumus, render sebagai teks biasa
          return <span key={index}>{part}</span>;
        }
      })}
    </span>
  );
};

export { TextWithMath };
