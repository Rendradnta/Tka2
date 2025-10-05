// Utility function to shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Base question pools for each subject
const questionPools = {
  'matematika': [
    {
      id: 'mat_001',
      subject: 'Matematika',
      type: 'multiple-choice',
      question: "Tentukan nilai limit berikut:\n\n\\[\\lim_{x \\to 2} \\frac{x^2 + 3x - 10}{x - 2}\\]",
      options: ["5", "7", "9", "11", "Tidak ada"],
      correctAnswer: 1,
      explanation: "Faktorkan pembilang: \\(x^2 + 3x - 10 = (x + 5)(x - 2)\\). Maka limit = \\(\\lim_{x \\to 2} \\frac{(x + 5)(x - 2)}{x - 2} = \\lim_{x \\to 2} (x + 5) = 2 + 5 = 7\\)."
    },
    {
      id: 'mat_002',
      subject: 'Matematika',
      type: 'multiple-choice-complex',
      question: "Diketahui persamaan lingkaran \\(x^2 + y^2 - 6x - 2y - 26 = 0\\). Pernyataan yang benar adalah:",
      options: [
        "Pusat lingkaran di (3, 1)",
        "Jari-jari lingkaran adalah 6",
        "Lingkaran menyinggung sumbu-y",
        "Garis y = 7 adalah garis singgung lingkaran"
      ],
      correctAnswers: [0, 1, 3],
      explanation: "Pusat lingkaran \\((-A/2, -B/2) = (3, 1)\\). Jari-jari \\(r = \\sqrt{3^2+1^2-(-26)} = \\sqrt{9+1+26} = \\sqrt{36} = 6\\). Jarak pusat (3,1) ke sumbu-y adalah 3. Garis y=7 adalah garis singgung karena jarak pusat (3,1) ke garis y-7=0 sama dengan jari-jari."
    },
    {
      id: 'mat_003',
      subject: 'Matematika',
      type: 'true-false',
      question: "Jika \\(\\log_2 8 = 3\\) dan \\(\\log_2 4 = 2\\), maka \\(\\log_2 32 = 5\\)",
      correctAnswer: true,
      explanation: "\\(32 = 2^5\\), maka \\(\\log_2 32 = \\log_2 2^5 = 5\\). Atau bisa dihitung: \\(32 = 8 \\times 4\\), maka \\(\\log_2 32 = \\log_2 8 + \\log_2 4 = 3 + 2 = 5\\)."
    },
    {
      id: 'mat_004',
      subject: 'Matematika',
      type: 'multiple-choice',
      question: "Sebuah segitiga memiliki sisi-sisi dengan panjang 5 cm, 12 cm, dan 13 cm. Luas segitiga tersebut adalah...",
      options: ["30 cm²", "60 cm²", "65 cm²", "78 cm²", "156 cm²"],
      correctAnswer: 0,
      explanation: "Segitiga dengan sisi 5, 12, 13 adalah segitiga siku-siku \\((5^2 + 12^2 = 13^2)\\). Luas = \\(\\frac{1}{2} \\times \\text{alas} \\times \\text{tinggi} = \\frac{1}{2} \\times 5 \\times 12 = 30\\) cm²."
    },
    {
      id: 'mat_005',
      subject: 'Matematika',
      type: 'true-false',
      question: "Dalam suatu barisan aritmatika dengan suku pertama a = 5 dan beda b = 3, suku ke-10 adalah 32",
      correctAnswer: true,
      explanation: "Rumus suku ke-n barisan aritmatika: \\(U_n = a + (n-1)b\\). Maka \\(U_{10} = 5 + (10-1) \\times 3 = 5 + 27 = 32\\)."
    },
    {
      id: 'mat_006',
      subject: 'Matematika',
      type: 'multiple-choice-complex',
      question: "Sebuah toko memberikan diskon 20% untuk pembelian di atas Rp500.000. Jika seseorang membeli barang seharga Rp750.000, maka:",
      options: [
        "Mendapat diskon Rp150.000",
        "Harus membayar Rp600.000",
        "Hemat 1/5 dari harga asli",
        "Membayar 80% dari harga asli"
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: "Diskon 20% dari Rp750.000 = Rp150.000. Yang harus dibayar = Rp750.000 - Rp150.000 = Rp600.000. Hemat 1/5 (20%) dan membayar 4/5 (80%) dari harga asli."
    }
  ],
  'bahasa-indonesia': [
    {
      id: 'bind_001',
      subject: 'Bahasa Indonesia',
      type: 'multiple-choice',
      question: "Bacalah teks berikut!\n\n'Pendidikan karakter merupakan fondasi penting dalam pembentukan generasi muda yang berkualitas. Melalui pendidikan karakter, siswa tidak hanya memperoleh pengetahuan akademis, tetapi juga nilai-nilai moral yang akan membentuk kepribadian mereka.'\n\nIde pokok paragraf tersebut adalah...",
      options: [
        "Pendidikan karakter sangat penting untuk generasi muda",
        "Siswa memerlukan pengetahuan akademis dan moral",
        "Nilai-nilai moral membentuk kepribadian siswa",
        "Generasi muda harus berkualitas dalam pendidikan",
        "Fondasi pendidikan harus kuat untuk masa depan"
      ],
      correctAnswer: 0,
      explanation: "Ide pokok paragraf adalah pendidikan karakter sebagai fondasi penting untuk generasi muda berkualitas. Kalimat utama menjelaskan pentingnya pendidikan karakter, sedangkan kalimat penjelas memberikan detail tentang manfaatnya."
    },
    {
      id: 'bind_002',
      subject: 'Bahasa Indonesia',
      type: 'true-false',
      question: "Kalimat 'Meskipun hujan deras, para siswa tetap semangat mengikuti upacara bendera' termasuk kalimat majemuk bertingkat",
      correctAnswer: true,
      explanation: "Kalimat majemuk bertingkat karena terdiri dari anak kalimat 'Meskipun hujan deras' (subordinatif) dan induk kalimat 'para siswa tetap semangat mengikuti upacara bendera'."
    },
    {
      id: 'bind_003',
      subject: 'Bahasa Indonesia',
      type: 'multiple-choice-complex',
      question: "Bacalah puisi berikut!\n\n'Angin berbisik di telinga\nMembawa kabar dari jauh\nTentang rindu yang terpendam\nDi sudut hati yang sunyi'\n\nUnsur yang terdapat dalam puisi tersebut adalah:",
      options: [
        "Personifikasi pada 'Angin berbisik'",
        "Metafora pada 'sudut hati'",
        "Rima silang (a-b-a-b)",
        "Tema tentang kerinduan"
      ],
      correctAnswers: [0, 1, 3],
      explanation: "Personifikasi terlihat pada 'Angin berbisik' - angin diberi sifat manusia. Metafora pada 'sudut hati' - hati diibaratkan memiliki sudut. Tema jelas tentang kerinduan. Rima tidak silang melainkan bebas."
    },
    {
      id: 'bind_004',
      subject: 'Bahasa Indonesia',
      type: 'multiple-choice',
      question: "Perhatikan teks argumentasi berikut!\n\n'Penggunaan gadget berlebihan pada anak dapat mengganggu perkembangan sosial mereka. Anak-anak menjadi kurang berinteraksi dengan lingkungan sekitar dan lebih memilih dunia virtual.'\n\nStruktur argumentasi yang tepat untuk melengkapi teks tersebut adalah...",
      options: [
        "Menambahkan data statistik penggunaan gadget",
        "Memberikan solusi pembatasan penggunaan gadget",
        "Menyebutkan dampak positif gadget untuk pembelajaran",
        "Menjelaskan jenis-jenis gadget yang berbahaya",
        "Membandingkan anak zaman dulu dan sekarang"
      ],
      correctAnswer: 1,
      explanation: "Teks argumentasi yang baik harus memiliki struktur: pernyataan posisi, argumen, dan rekomendasi/solusi. Setelah menyampaikan masalah, langkah selanjutnya adalah memberikan solusi."
    },
    {
      id: 'bind_005',
      subject: 'Bahasa Indonesia',
      type: 'true-false',
      question: "Sudut pandang orang ketiga serba tahu memungkinkan narator mengetahui perasaan dan pikiran semua tokoh dalam cerita",
      correctAnswer: true,
      explanation: "Sudut pandang orang ketiga serba tahu memberikan kebebasan kepada narator untuk mengetahui dan menceritakan perasaan, pikiran, serta tindakan semua tokoh dalam cerita."
    },
    {
      id: 'bind_006',
      subject: 'Bahasa Indonesia',
      type: 'multiple-choice-complex',
      question: "Ciri-ciri teks eksposisi yang benar adalah:",
      options: [
        "Bersifat informatif dan objektif",
        "Menggunakan bahasa yang lugas dan jelas",
        "Bertujuan menghibur pembaca",
        "Menyajikan fakta dan data pendukung"
      ],
      correctAnswers: [0, 1, 3],
      explanation: "Teks eksposisi bersifat informatif dan objektif, menggunakan bahasa lugas dan jelas, serta menyajikan fakta dan data. Tujuannya bukan menghibur melainkan menjelaskan atau memaparkan informasi."
    }
  ],
  'bahasa-inggris': [
    {
      id: 'bing_001',
      subject: 'Bahasa Inggris',
      type: 'multiple-choice',
      question: "Choose the correct form of the verb to complete the sentence:\n\n'By the time we arrive at the theater, the movie _____ already _____.'\n\nA. will have, started\nB. has, started\nC. will, start\nD. had, started\nE. would have, started",
      options: [
        "will have, started",
        "has, started",
        "will, start",
        "had, started",
        "would have, started"
      ],
      correctAnswer: 0,
      explanation: "Future Perfect Tense digunakan untuk menyatakan aksi yang akan selesai sebelum waktu tertentu di masa depan. Struktur: will have + past participle. 'By the time' menunjukkan waktu di masa depan."
    },
    {
      id: 'bing_002',
      subject: 'Bahasa Inggris',
      type: 'true-false',
      question: "The sentence 'The results will be announced by the committee tomorrow' is the correct passive voice of 'The committee will announce the results tomorrow'",
      correctAnswer: true,
      explanation: "Passive voice untuk future tense: will + be + past participle. 'The results will be announced by the committee tomorrow' adalah bentuk yang benar."
    },
    {
      id: 'bing_003',
      subject: 'Bahasa Inggris',
      type: 'multiple-choice-complex',
      question: "Read the following text:\n\n'The new renewable energy project will reduce carbon emissions by 40% within five years. This initiative demonstrates our commitment to environmental sustainability.'\n\nWhat can be inferred from the text?",
      options: [
        "The project has already reduced emissions",
        "The company prioritizes environmental issues",
        "Carbon emissions are currently very high",
        "The project will take exactly five years"
      ],
      correctAnswers: [1],
      explanation: "Dari kalimat 'This initiative demonstrates our commitment to environmental sustainability' dapat disimpulkan bahwa perusahaan memprioritaskan isu lingkungan."
    },
    {
      id: 'bing_004',
      subject: 'Bahasa Inggris',
      type: 'multiple-choice',
      question: "What is the main purpose of the following text?\n\n'Scientists have discovered that regular exercise not only improves physical health but also enhances cognitive function and memory retention in students.'",
      options: [
        "To persuade people to exercise more",
        "To inform about research findings",
        "To compare physical and mental health",
        "To criticize sedentary lifestyle",
        "To promote student wellness programs"
      ],
      correctAnswer: 1,
      explanation: "Teks tersebut bertujuan untuk menginformasikan (to inform) tentang temuan penelitian ilmiah mengenai manfaat olahraga teratur bagi kesehatan fisik dan fungsi kognitif."
    },
    {
      id: 'bing_005',
      subject: 'Bahasa Inggris',
      type: 'true-false',
      question: "In the sentence 'I'm really worried about the upcoming presentation', the most appropriate response would be 'Don't worry about it. You've prepared well for it.'",
      correctAnswer: true,
      explanation: "'Don't worry about it' adalah respons yang paling tepat untuk menenangkan seseorang yang khawatir, diikuti dengan alasan positif bahwa dia sudah mempersiapkan dengan baik."
    },
    {
      id: 'bing_006',
      subject: 'Bahasa Inggris',
      type: 'multiple-choice-complex',
      question: "Choose the correct statements about conditional sentences:",
      options: [
        "First conditional uses 'if + present simple, will + infinitive'",
        "Second conditional expresses unreal present situations",
        "Third conditional talks about past regrets",
        "Zero conditional uses 'if + present simple, present simple'"
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: "Semua pernyataan benar. First conditional untuk kemungkinan masa depan, second untuk situasi tidak nyata sekarang, third untuk penyesalan masa lalu, dan zero untuk fakta umum."
    }
  ],
  'matematika-lanjut': [
    {
      id: 'matlanj_001',
      subject: 'Matematika Lanjut',
      type: 'multiple-choice',
      question: "Diketahui fungsi \\(f(x) = 2x^3 - 6x^2 + 4x + 1\\). Tentukan turunan kedua \\(f''(x)\\):",
      options: [
        "\\(12x - 12\\)",
        "\\(6x^2 - 12x + 4\\)",
        "\\(12x^2 - 12x\\)",
        "\\(6x - 6\\)",
        "\\(12x + 4\\)"
      ],
      correctAnswer: 0,
      explanation: "\\(f(x) = 2x^3 - 6x^2 + 4x + 1\\)\n\\(f'(x) = 6x^2 - 12x + 4\\)\n\\(f''(x) = 12x - 12\\)"
    },
    {
      id: 'matlanj_002',
      subject: 'Matematika Lanjut',
      type: 'true-false',
      question: "Integral dari \\(\\int (3x^2 + 2x - 1)dx\\) adalah \\(x^3 + x^2 - x + C\\)",
      correctAnswer: true,
      explanation: "\\(\\int (3x^2 + 2x - 1)dx = \\int 3x^2dx + \\int 2xdx + \\int(-1)dx = 3\\cdot\\frac{x^3}{3} + 2\\cdot\\frac{x^2}{2} - x + C = x^3 + x^2 - x + C\\)"
    },
    {
      id: 'matlanj_003',
      subject: 'Matematika Lanjut',
      type: 'multiple-choice-complex',
      question: "Tentukan persamaan garis singgung kurva \\(y = x^2 - 4x + 3\\) di titik \\((1, 0)\\). Pernyataan yang benar:",
      options: [
        "Gradien garis singgung adalah -2",
        "Persamaan garis singgung: \\(y = -2x + 2\\)",
        "Titik (1,0) terletak pada kurva",
        "Garis singgung memotong sumbu-y di (0,2)"
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: "\\(y' = 2x - 4\\). Di titik \\((1,0)\\): gradien = \\(2(1) - 4 = -2\\). Persamaan garis: \\(y - 0 = -2(x - 1) \\Rightarrow y = -2x + 2\\). Titik (1,0) ada di kurva dan garis memotong sumbu-y di (0,2)."
    },
    {
      id: 'matlanj_004',
      subject: 'Matematika Lanjut',
      type: 'multiple-choice',
      question: "Tentukan nilai maksimum fungsi \\(f(x) = -x^2 + 4x + 5\\) pada interval \\([0, 5]\\):",
      options: ["5", "9", "10", "15", "20"],
      correctAnswer: 1,
      explanation: "\\(f'(x) = -2x + 4 = 0 \\Rightarrow x = 2\\). \\(f(2) = -(2)^2 + 4(2) + 5 = -4 + 8 + 5 = 9\\). Cek ujung interval: \\(f(0) = 5\\), \\(f(5) = 0\\). Maksimum adalah 9."
    },
    {
      id: 'matlanj_005',
      subject: 'Matematika Lanjut',
      type: 'true-false',
      question: "Determinan hasil kali dua matriks \\(A\\) dan \\(B\\) sama dengan hasil kali determinan masing-masing matriks: \\(\\det(AB) = \\det(A) \\times \\det(B)\\)",
      correctAnswer: true,
      explanation: "Sifat determinan: \\(\\det(AB) = \\det(A) \\times \\det(B)\\). Ini adalah salah satu sifat fundamental dalam aljabar linear."
    },
    {
      id: 'matlanj_006',
      subject: 'Matematika Lanjut',
      type: 'multiple-choice-complex',
      question: "Dalam suatu barisan aritmatika, suku ke-5 adalah 17 dan suku ke-12 adalah 38. Pernyataan yang benar:",
      options: [
        "Suku pertama adalah 5",
        "Beda barisan adalah 3",
        "Suku ke-10 adalah 32",
        "Jumlah 10 suku pertama adalah 185"
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: "\\(U_5 = a + 4b = 17\\) dan \\(U_{12} = a + 11b = 38\\). Eliminasi: \\(7b = 21\\), maka \\(b = 3\\). Substitusi: \\(a = 5\\). \\(U_{10} = 5 + 9(3) = 32\\). \\(S_{10} = \\frac{10}{2}(2a + 9b) = 5(10 + 27) = 185\\)."
    }
  ],
  'geografi': [
    {
      id: 'geo_001',
      subject: 'Geografi',
      type: 'multiple-choice',
      question: "Fenomena La Nina menyebabkan dampak berikut di Indonesia, kecuali...",
      options: [
        "Curah hujan meningkat di sebagian besar wilayah",
        "Suhu permukaan laut lebih dingin dari normal",
        "Musim kemarau lebih panjang",
        "Intensitas badai tropis meningkat",
        "Produktivitas perikanan meningkat"
      ],
      correctAnswer: 2,
      explanation: "La Nina menyebabkan curah hujan meningkat, suhu laut lebih dingin, badai tropis lebih intensif, dan produktivitas perikanan naik. Yang tidak terjadi adalah musim kemarau lebih panjang - justru sebaliknya, musim hujan lebih panjang."
    },
    {
      id: 'geo_002',
      subject: 'Geografi',
      type: 'true-false',
      question: "Proses pembentukan tanah yang dipengaruhi oleh iklim, batuan induk, topografi, organisme, dan waktu disebut pedogenesis",
      correctAnswer: true,
      explanation: "Pedogenesis adalah proses pembentukan tanah yang dipengaruhi oleh lima faktor: iklim, batuan induk, topografi, organisme, dan waktu."
    },
    {
      id: 'geo_003',
      subject: 'Geografi',
      type: 'multiple-choice-complex',
      question: "Wilayah Indonesia yang memiliki risiko gempa tektonik tinggi adalah:",
      options: [
        "Sumatera bagian barat",
        "Kepulauan Maluku",
        "Pulau Jawa bagian selatan",
        "Nusa Tenggara"
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: "Semua wilayah tersebut memiliki risiko gempa tinggi karena berada di jalur pertemuan lempeng tektonik (Ring of Fire). Sumatera barat dekat patahan Sumatera, Maluku di pertemuan 3 lempeng, Jawa selatan dekat zona subduksi, dan Nusa Tenggara di jalur vulkanik aktif."
    },
    {
      id: 'geo_004',
      subject: 'Geografi',
      type: 'multiple-choice',
      question: "Konsep aglomerasi dalam geografi ekonomi merujuk pada...",
      options: [
        "Penyebaran industri ke daerah terpencil",
        "Pengelompokan kegiatan ekonomi di suatu wilayah",
        "Perpindahan penduduk dari desa ke kota",
        "Pembagian wilayah berdasarkan fungsi ekonomi",
        "Integrasi ekonomi antar negara"
      ],
      correctAnswer: 1,
      explanation: "Aglomerasi adalah pengelompokan atau konsentrasi kegiatan ekonomi (industri, perdagangan, jasa) di suatu wilayah untuk memperoleh keuntungan ekonomi dan efisiensi."
    },
    {
      id: 'geo_005',
      subject: 'Geografi',
      type: 'true-false',
      question: "Fenomena urban heat island terjadi karena berkurangnya ruang terbuka hijau dan dominasi material beton yang menyerap panas",
      correctAnswer: true,
      explanation: "Urban heat island terjadi karena berkurangnya ruang terbuka hijau dan dominasi material beton/aspal yang menyerap dan memancarkan panas lebih banyak daripada vegetasi."
    },
    {
      id: 'geo_006',
      subject: 'Geografi',
      type: 'multiple-choice-complex',
      question: "Faktor-faktor yang mempengaruhi persebaran flora dan fauna di Indonesia:",
      options: [
        "Iklim dan curah hujan",
        "Kondisi tanah dan topografi",
        "Sejarah geologis dan tektonik",
        "Aktivitas manusia dan urbanisasi"
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: "Semua faktor tersebut mempengaruhi persebaran flora dan fauna. Iklim menentukan jenis vegetasi, tanah dan topografi mempengaruhi habitat, sejarah geologis membentuk endemisme, dan aktivitas manusia mengubah ekosistem."
    }, 
    {
  id: 'geo_007',
  subject: 'Geografi',
  type: 'multiple-true-false',
  question: "Analisis kebenaran dari setiap pernyataan geografis berikut:",
  statements: [
    { text: "Garis khatulistiwa melewati Provinsi Kalimantan Barat.", answer: true },
    { text: "Gunung tertinggi di Indonesia adalah Gunung Semeru.", answer: false },
    { text: "Danau Toba merupakan danau vulkanik.", answer: true },
    { text: "Indonesia tidak memiliki gurun pasir alami.", answer: true }
  ],
  explanation: "Penjelasan: Garis khatulistiwa melewati kota Pontianak di Kalbar (Benar). Gunung tertinggi di Indonesia adalah Puncak Jaya di Papua (Pernyataan Salah). Danau Toba terbentuk dari letusan supervulkan (Benar). Indonesia memiliki gumuk pasir di Parangkusumo, tapi bukan gurun pasir luas (Benar)."
}
  ],
  'fisika': [
    {
      id: 'fis_001',
      subject: 'Fisika',
      type: 'multiple-choice',
      question: "Sebuah benda bermassa 2 kg bergerak dengan kecepatan 10 m/s. Energi kinetik benda tersebut adalah...",
      options: ["50 J", "100 J", "200 J", "400 J", "1000 J"],
      correctAnswer: 1,
      explanation: "Energi kinetik \\(E_k = \\frac{1}{2}mv^2 = \\frac{1}{2} \\times 2 \\times 10^2 = \\frac{1}{2} \\times 2 \\times 100 = 100\\) J."
    },
    {
      id: 'fis_002',
      subject: 'Fisika',
      type: 'true-false',
      question: "Hukum Newton I menyatakan bahwa benda akan tetap diam atau bergerak lurus beraturan jika resultan gaya yang bekerja padanya nol",
      correctAnswer: true,
      explanation: "Hukum Newton I (Hukum Inersia) menyatakan bahwa benda akan mempertahankan keadaan diam atau gerak lurus beraturannya selama tidak ada gaya luar yang bekerja padanya."
    },
    {
      id: 'fis_003',
      subject: 'Fisika',
      type: 'multiple-choice-complex',
      question: "Gelombang elektromagnetik memiliki sifat-sifat berikut:",
      options: [
        "Dapat merambat dalam ruang hampa",
        "Kecepatan rambat sama dengan kecepatan cahaya",
        "Merupakan gelombang transversal",
        "Memerlukan medium untuk merambat"
      ],
      correctAnswers: [0, 1, 2],
      explanation: "Gelombang elektromagnetik dapat merambat dalam ruang hampa, kecepatannya sama dengan kecepatan cahaya (3×10⁸ m/s), dan merupakan gelombang transversal. Tidak memerlukan medium untuk merambat."
    },
    {
      id: 'fis_004',
      subject: 'Fisika',
      type: 'multiple-choice',
      question: "Sebuah pegas dengan konstanta 200 N/m ditekan sejauh 5 cm. Energi potensial elastis yang tersimpan adalah...",
      options: ["0,25 J", "0,5 J", "2,5 J", "5 J", "25 J"],
      correctAnswer: 0,
      explanation: "Energi potensial elastis \\(E_p = \\frac{1}{2}kx^2 = \\frac{1}{2} \\times 200 \\times (0,05)^2 = \\frac{1}{2} \\times 200 \\times 0,0025 = 0,25\\) J."
    },
    {
      id: 'fis_005',
      subject: 'Fisika',
      type: 'true-false',
      question: "Dalam efek fotolistrik, energi kinetik elektron yang dipancarkan bergantung pada intensitas cahaya yang mengenai permukaan logam",
      correctAnswer: false,
      explanation: "Dalam efek fotolistrik, energi kinetik elektron bergantung pada frekuensi (atau panjang gelombang) cahaya, bukan intensitasnya. Intensitas hanya mempengaruhi jumlah elektron yang dipancarkan."
    },
    {
      id: 'fis_006',
      subject: 'Fisika',
      type: 'multiple-choice-complex',
      question: "Hukum Termodinamika I dapat dinyatakan dalam bentuk:",
      options: [
        "\\(\\Delta U = Q - W\\)",
        "Energi tidak dapat diciptakan atau dimusnahkan",
        "\\(dU = \\delta Q - \\delta W\\)",
        "Kalor yang masuk sama dengan kerja yang keluar"
      ],
      correctAnswers: [0, 1, 2],
      explanation: "Hukum Termodinamika I menyatakan kekekalan energi: \\(\\Delta U = Q - W\\) atau \\(dU = \\delta Q - \\delta W\\). Energi tidak dapat diciptakan atau dimusnahkan, hanya berubah bentuk. Pernyataan terakhir tidak selalu benar."
    }
  ],
  'kimia': [
    {
      id: 'kim_001',
      subject: 'Kimia',
      type: 'multiple-choice',
      question: "Konfigurasi elektron atom Cl (Z = 17) adalah...",
      options: [
        "1s² 2s² 2p⁶ 3s² 3p⁵",
        "1s² 2s² 2p⁶ 3s² 3p⁶",
        "1s² 2s² 2p⁶ 3s¹ 3p⁶",
        "1s² 2s² 2p⁵ 3s² 3p⁶",
        "1s² 2s² 2p⁶ 3s² 3p⁴"
      ],
      correctAnswer: 0,
      explanation: "Atom Cl memiliki 17 elektron. Konfigurasi elektronnya: 1s² (2e⁻) + 2s² (2e⁻) + 2p⁶ (6e⁻) + 3s² (2e⁻) + 3p⁵ (5e⁻) = 17 elektron total."
    },
    {
      id: 'kim_002',
      subject: 'Kimia',
      type: 'true-false',
      question: "Dalam reaksi redoks, oksidator adalah zat yang mengalami reduksi dan menerima elektron",
      correctAnswer: true,
      explanation: "Oksidator adalah zat yang menyebabkan oksidasi pada zat lain, dan dalam prosesnya oksidator sendiri mengalami reduksi (menerima elektron)."
    },
    {
      id: 'kim_003',
      subject: 'Kimia',
      type: 'multiple-choice-complex',
      question: "Sifat-sifat asam kuat meliputi:",
      options: [
        "Terionisasi sempurna dalam air",
        "Memiliki pH < 7",
        "Dapat menghantarkan listrik",
        "Bersifat korosif terhadap logam"
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: "Asam kuat terionisasi sempurna dalam air, memiliki pH < 7 (biasanya 0-3), dapat menghantarkan listrik karena menghasilkan ion, dan bersifat korosif terhadap logam."
    },
    {
      id: 'kim_004',
      subject: 'Kimia',
      type: 'multiple-choice',
      question: "Massa molekul relatif (Mr) dari Ca(OH)₂ adalah... (Ar Ca = 40, O = 16, H = 1)",
      options: ["58", "74", "82", "90", "114"],
      correctAnswer: 1,
      explanation: "Mr Ca(OH)₂ = Ar Ca + 2(Ar O + Ar H) = 40 + 2(16 + 1) = 40 + 2(17) = 40 + 34 = 74."
    },
    {
      id: 'kim_005',
      subject: 'Kimia',
      type: 'true-false',
      question: "Dalam sistem periodik, jari-jari atom cenderung bertambah dari kiri ke kanan dalam satu periode",
      correctAnswer: false,
      explanation: "Jari-jari atom cenderung berkurang dari kiri ke kanan dalam satu periode karena bertambahnya muatan inti yang menarik elektron lebih kuat."
    },
    {
      id: 'kim_006',
      subject: 'Kimia',
      type: 'multiple-choice-complex',
      question: "Faktor-faktor yang mempengaruhi laju reaksi kimia:",
      options: [
        "Konsentrasi reaktan",
        "Suhu reaksi",
        "Luas permukaan sentuh",
        "Keberadaan katalis"
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: "Semua faktor tersebut mempengaruhi laju reaksi. Konsentrasi tinggi meningkatkan tumbukan, suhu tinggi menambah energi kinetik, luas permukaan besar memperbanyak kontak, dan katalis menurunkan energi aktivasi."
    }
  ]
};

// Generate exam data for each subject
export const generateExamData = (subjectId) => {
  const pool = questionPools[subjectId];
  if (!pool) {
    throw new Error(`Subject ${subjectId} not found`);
  }

  // Shuffle and select 5 questions
  const selectedQuestions = shuffleArray(pool).slice(0, 5);
  
  // Shuffle options for multiple choice questions
  const shuffledQuestions = selectedQuestions.map(question => {
    if (question.type === 'multiple-choice') {
      const shuffledOptions = shuffleArray(question.options.map((option, index) => ({ option, index })));
      const newCorrectAnswer = shuffledOptions.findIndex(item => item.index === question.correctAnswer);
      
      return {
        ...question,
        options: shuffledOptions.map(item => item.option),
        correctAnswer: newCorrectAnswer
      };
    } else if (question.type === 'multiple-choice-complex') {
      const shuffledOptions = shuffleArray(question.options.map((option, index) => ({ option, index })));
      const newCorrectAnswers = question.correctAnswers.map(oldIndex => 
        shuffledOptions.findIndex(item => item.index === oldIndex)
      );
      
      return {
        ...question,
        options: shuffledOptions.map(item => item.option),
        correctAnswers: newCorrectAnswers
      };
    }
    return question;
  });

  return {
    id: subjectId,
    title: `Simulasi ${getSubjectName(subjectId)}`,
    description: `Simulasi TKA untuk mata pelajaran ${getSubjectName(subjectId)}`,
    duration: 10,
    totalQuestions: 5,
    subject: subjectId,
    questions: shuffledQuestions
  };
};

// Helper function to get subject display name
const getSubjectName = (subjectId) => {
  const names = {
    'matematika': 'Matematika',
    'bahasa-indonesia': 'Bahasa Indonesia',
    'bahasa-inggris': 'Bahasa Inggris',
    'matematika-lanjut': 'Matematika Lanjut',
    'geografi': 'Geografi',
    'fisika': 'Fisika',
    'kimia': 'Kimia'
  };
  return names[subjectId] || subjectId;
};

// Subject categories for dashboard
export const subjectCategories = {
  wajib: {
    title: 'Mata Pelajaran Wajib',
    subjects: ['matematika', 'bahasa-indonesia', 'bahasa-inggris']
  },
  pilihan: {
    title: 'Mata Pelajaran Pilihan', 
    subjects: ['matematika-lanjut', 'geografi', 'fisika', 'kimia']
  }
};

// Export for backward compatibility
export const examData = [];
export default { generateExamData, subjectCategories, questionPools };