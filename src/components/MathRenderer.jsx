import React, { useEffect, useRef, Fragment } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Komponen dasar untuk merender satu rumus LaTeX
const KatexRenderer = ({ math, isBlock }) => {
  const katexRef = useRef();

  useEffect(() => {
    if (katexRef.current) {
      katex.render(math, katexRef.current, {
        throwOnError: false,
        displayMode: isBlock, // Gunakan displayMode untuk rumus block
      });
    }
  }, [math, isBlock]);

  // Jika block, render sebagai div. Jika inline, render sebagai span.
  return isBlock 
    ? <div ref={katexRef} /> 
    : <span ref={katexRef} />;
};

// Komponen utama yang memproses seluruh teks
const TextWithMath = ({ text, className = '' }) => {
  if (typeof text !== 'string') {
    return null;
  }

  // Pola untuk menemukan semua format LaTeX
  const mathRegex = /(\$[^$]+\$|\\\[.+?\\\]|\\\(.+?\\\))/g;
  
  // Pecah teks menjadi array berisi teks biasa dan rumus
  const parts = text.split(mathRegex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        // Cek apakah bagian ini adalah rumus matematika
        if (part.match(mathRegex)) {
          let mathContent = part;
          let isBlock = false;

          // Hapus pembatas dan tentukan apakah ini 'block' math
          if (part.startsWith('$') && part.endsWith('$')) {
            mathContent = part.slice(1, -1);
          } else if (part.startsWith('\\(') && part.endsWith('\\)')) {
            mathContent = part.slice(2, -2);
          } else if (part.startsWith('\\[') && part.endsWith('\\]')) {
            mathContent = part.slice(2, -2);
            isBlock = true;
          }
          
          return <KatexRenderer key={index} math={mathContent} isBlock={isBlock} />;

        } else {
          // Handle teks biasa dan ganti karakter '\n' dengan tag <br />
          const textParts = part.split(/(\n)/g);
          return textParts.map((textPart, i) => {
            if (textPart === '\n') {
              return <br key={`${index}-${i}`} />;
            }
            return <Fragment key={`${index}-${i}`}>{textPart}</Fragment>;
          });
        }
      })}
    </span>
  );
};

export { TextWithMath };