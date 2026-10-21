import { Product, EducationArticle, Order, User } from '../types';

import HERO_IMAGE from '../assets/images/hero.jpg';
import SHOPPING_BAG_IMAGE from '../assets/images/tas.jpg';
import POUCH_IMAGE from '../assets/images/Pouch.jpg';
import ID_HOLDER_IMAGE from '../assets/images/idcard.png';
import LAMPSHADE_IMAGE from '../assets/images/lampu.jpg';
import LOGO_IMAGE from '../assets/images/logo.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Bioplastic Shopping Bag (Singkong)',
    slug: 'bioplastic-shopping-bag',
    shortDescription: 'Tas belanja ramah lingkungan berbahan dasar polimer pati singkong, kuat dan mudah terurai.',
    fullDescription: 'Prototipe kantong belanja ramah lingkungan yang dikembangkan dari ekstrak pati umbi singkong (cassava starch) dan limbah kulit singkong hasil industri olahan lokal. Dirancang untuk menggantikan kantong plastik sekali pakai dalam kegiatan belanja harian dengan ketahanan beban hingga 4 kg dalam kondisi kering.',
    category: 'Shopping Bags',
    price: 18000,
    stock: 120,
    image: SHOPPING_BAG_IMAGE,
    availability: 'Tersedia',
    materialInfo: 'Formulasi polimer pati singkong (cassava starch), gliserol nabati sebagai pemlastis, dan serat selulosa kulit singkong.',
    specs: {
      material: 'Pati Singkong Terplastisasi (TPS) & Serat Selulosa',
      intendedUse: 'Belanja kering, retail groceries, pakaian, barang ringan',
      shelfLifeEstimate: '6-9 bulan penyimpanan kering tertutup',
      dimensions: '30 cm x 40 cm x 10 cm gusset'
    },
    featured: true
  },
  {
    id: 'prod-02',
    name: 'Bioplastic Pouch & Clutch Serbaguna',
    slug: 'bioplastic-pouch',
    shortDescription: 'Pouch serbaguna bertekstur alami dengan ritsleting halus, cocok untuk alat tulis & kosmetik.',
    fullDescription: 'Pouch fungsional dan estetis dengan tekstur semi-leather yang dihasilkan dari proses kompresi lembaran bioplastik berbahan dasar pati dengan penguat serat alami. Dilengkapi ritsleting logam daur ulang untuk menyimpan alat tulis, perangkat kosmetik, atau aksesori harian.',
    category: 'Pouches and Handbags',
    price: 45000,
    stock: 45,
    image: POUCH_IMAGE,
    availability: 'Tersedia',
    materialInfo: 'Komposit bioplastik pati dan selulosa dengan pelapis lilin nabati alami penolak percikan air.',
    specs: {
      material: 'Bio-composite fleksibel bertekstur & Ritsleting metalik',
      intendedUse: 'Penyimpanan kosmetik, stationery, kabel & charger',
      shelfLifeEstimate: '12-18 bulan pemakaian wajar',
      dimensions: '22 cm x 13 cm x 2 cm'
    },
    featured: true
  },
  {
    id: 'prod-03',
    name: 'Bioplastic ID Card Holder & Lanyard',
    slug: 'bioplastic-id-card-holder',
    shortDescription: 'Tempat kartu identitas kantor & kampus dari biopolimer alami dengan tali katun organik.',
    fullDescription: 'Aksesori profesional berupa tempat kartu identitas (ID Card Holder) yang dicetak menggunakan cetakan presisi dari resin bioplastik berbahan dasar pati dan ampas jagung. Tahan benturan ringan, bertekstur matte alami, dan dilengkapi tali pengait berbahan katun organik tanpa pewarna kimia berbahaya.',
    category: 'Accessories',
    price: 35000,
    stock: 60,
    image: ID_HOLDER_IMAGE,
    availability: 'Tersedia',
    materialInfo: 'Resin bio-komposit kaku dari pati pati alami dan mikrofiber ampas pengolahan hasil panen.',
    specs: {
      material: 'Rigid bio-resin alami & Tali katun organik',
      intendedUse: 'Kartu tanda pengenal (KTP, kartu mahasiswa, kartu akses kantor)',
      shelfLifeEstimate: '18-24 bulan pemakaian normal ruangan',
      dimensions: '7.2 cm x 10.5 cm (standar kartu ID)'
    },
    featured: true
  },
  {
    id: 'prod-04',
    name: 'Bioplastic Ambient Lampshade (Kap Lampu)',
    slug: 'bioplastic-lampshade',
    shortDescription: 'Kap lampu dekoratif dengan kontur organik yang membiaskan cahaya hangat dan menenangkan.',
    fullDescription: 'Eksplorasi produk dekorasi interior berupa kap lampu gantung atau meja dengan lekukan bergelombang organik. Sifat semi-translusen bioplastik menghasilkan pendaran cahaya temaram yang hangat. Dirancang untuk bohlam LED berdaya rendah (maksimal 9W LED dingin) guna menjaga kestabilan material terhadap paparan panas.',
    category: 'Home Decor',
    price: 175000,
    stock: 15,
    image: LAMPSHADE_IMAGE,
    availability: 'Tersedia',
    materialInfo: 'Lembaran bio-termoplastik semi-transparan dengan struktur pendukung kayu daur ulang.',
    specs: {
      material: 'Biopolimer termo-formable semi-translusen & Dudukan kayu',
      intendedUse: 'Dekorasi lampu meja atau lampu gantung interior (Hanya bohlam LED hemat energi)',
      shelfLifeEstimate: '2+ tahun untuk penggunaan interior kering terhindar panas tinggi',
      dimensions: 'Diameter 32 cm, tinggi 24 cm'
    },
    featured: true
  },
  {
    id: 'prod-05',
    name: 'Foldable Bioplastic Market Bag (Ukuran Medium)',
    slug: 'foldable-bioplastic-market-bag',
    shortDescription: 'Kantong belanja lipat praktis yang ringan disimpan dalam saku atau ransel harian.',
    fullDescription: 'Variasi tas belanja bioplastik dengan ketebalan ekstra dan pegangan ergonomis yang dapat dilipat menjadi ukuran kecil. Ideal untuk pengguna yang aktif bepergian dan ingin selalu siap menolak kantong plastik sekali pakai di supermarket.',
    category: 'Shopping Bags',
    price: 24000,
    stock: 75,
    image: SHOPPING_BAG_IMAGE,
    availability: 'Tersedia',
    materialInfo: 'Campuran pati umbi termoplastik dengan fleksibilitas tinggi dan keuletan tarikan.',
    specs: {
      material: 'Cassava Thermoplastic Elastomer Formula',
      intendedUse: 'Belanja harian, buah & sayuran, keperluan minimarket',
      shelfLifeEstimate: '6-8 bulan dalam suhu ruang',
      dimensions: '35 cm x 45 cm x 12 cm'
    },
    featured: false
  },
  {
    id: 'prod-06',
    name: 'Minimalist Bioplastic Key & Coin Holder',
    slug: 'bioplastic-key-holder',
    shortDescription: 'Tempat kunci dan koin minimalis saku dengan kancing jepret alami ramah lingkungan.',
    fullDescription: 'Aksesori saku praktis untuk mengorganisir kunci rumah, kunci kendaraan, dan uang koin. Dibuat dengan metode thermoforming bioplastik presisi, berbobot sangat ringan namun protektif terhadap goresan barang di dalam tas.',
    category: 'Accessories',
    price: 28000,
    stock: 30,
    image: POUCH_IMAGE,
    availability: 'Stok Menipis',
    materialInfo: 'Bio-resin selulosa nabati tahan aus dengan kancing jepret kuningan bebas timbal.',
    specs: {
      material: 'Selulosa Biopolimer & Kuningan',
      intendedUse: 'Penyimpanan kunci, koin, kancing cadangan',
      shelfLifeEstimate: '12-18 bulan',
      dimensions: '11 cm x 7 cm'
    },
    featured: false
  }
];

export const INITIAL_ARTICLES: EducationArticle[] = [
  {
    id: 'art-01',
    slug: 'understanding-bioplastics',
    title: 'Apa Sebenarnya Bioplastik? Memahami Definisi, Jenis & Mitos',
    category: 'Pengenalan Material',
    readTime: '4 min baca',
    excerpt: 'Membedakan antara plastik bio-based (berbasis sumber hayati) dan plastik biodegradable (dapat terurai hayati) serta faktor lingkungan penguraiannya.',
    image: SHOPPING_BAG_IMAGE,
    content: {
      intro: 'Istilah "bioplastik" sering kali disalahpahami masyarakat sebagai plastik yang secara otomatis akan lenyap dalam beberapa hari begitu dibuang ke sembarang tempat. Dalam literatur sains material, definisi bioplastik mencakup dua spektrum penting yang tidak selalu tumpang tindih: asal sumber bahan mentah (bio-based) dan kemampuan penguraiannya (biodegradability).',
      sections: [
        {
          heading: '1. Spektrum Bio-Based vs. Biodegradable',
          body: [
            'Tidak semua plastik berbahan dasar nabati dapat terurai secara biologis, dan tidak semua plastik yang dapat terurai dibuat dari tanaman. Sebagai contoh, Bio-PET yang dibuat sebagian dari tebu memiliki struktur molekul identik dengan PET fosil konvensional sehingga tetap tidak terurai selama ratusan tahun di alam.',
            'Sebaliknya, produk bioplastik BioLiving berfokus pada kelompok "Bio-based AND Biodegradable" — yaitu polimer yang diproduksi dari sumber daya organik terbarukan (seperti pati dan selulosa) dan memiliki ikatan kimia yang dapat dikenali dan diputus oleh mikroorganisme pengurai.'
          ]
        },
        {
          heading: '2. Polimer Alami: Pati dan Selulosa',
          body: [
            'Pati (starch) terdiri dari amilosa dan amilopektin, rantai polimer glukosa yang secara alami mudah terhidrolisis oleh enzim amilase di alam.',
            'Dengan menambahkan pemlastis ramah lingkungan (plasticizer) seperti gliserol nabati dan pemrosesan panas-tekanan terkontrol, rantai pati dapat berubah wujud menjadi lembaran Thermoplastic Starch (TPS) yang memiliki elastisitas mirip film polietilena konvensional.'
          ]
        },
        {
          heading: '3. Realitas Penguraian di Lingkungan',
          body: [
            'Daya urai suatu bioplastik sangat dipengaruhi oleh parameter lingkungan: ketersediaan mikroba, kelembapan, suhu, dan pasokan oksigen.',
            'Suatu bioplastik yang teruji terurai di fasilitas pengomposan industri (suhu 55–60°C) mungkin membutuhkan waktu lebih lama di lingkungan tanah terbuka bersuhu ruang, dan jauh lebih lambat jika berada di dasar laut yang dingin dan minim oksigen. Karena itu, pengelolaan sampah yang bertanggung jawab tetap menjadi pilar utama.'
          ]
        }
      ],
      keyTakeaways: [
        'Bio-based merujuk pada asal bahan baku (tumbuhan/organik), sedangkan biodegradable merujuk pada mekanisme akhir hidup produk.',
        'Pati singkong merupakan polimer alami kaya amilosa yang dapat diolah menjadi bioplastik ramah lingkungan.',
        'Bioplastik bukan izin untuk membuang sampah sembarangan; sistem pemilahan dan pengomposan tetap diperlukan.'
      ],
      references: [
        'European Bioplastics Association (2024). Facts and Figures on Bioplastics Taxonomy.',
        'Van den Oever, M. et al. (2017). Bio-based and biodegradable plastics – Facts and figures. Wageningen Food & Biobased Research.',
        'Dokumen Konseptual Sustainable Urban Development Project (SUDP), 2026.'
      ]
    }
  },
  {
    id: 'art-02',
    slug: 'from-organic-waste-to-useful-products',
    title: 'Dari Limbah Organik Menjadi Sumber Daya Material Bernilai Tinggi',
    category: 'Riset & Pemanfaatan Limbah',
    readTime: '5 min baca',
    excerpt: 'Bagaimana limbah kulit singkong, ampas pengolahan pati, dan residu pertanian perkotaan diubah menjadi material pengganti kantong belanja fosil.',
    image: HERO_IMAGE,
    content: {
      intro: 'Di kota-kota besar di Indonesia, limbah organik mendominasi lebih dari 50% timbulan sampah di Tempat Pemrosesan Akhir (TPA). Di sisi lain, industri olahan singkong dan hasil bumi menghasilkan kulit umbi dan ampas padat yang belum teroptimalkan pemanfaatannya.',
      sections: [
        {
          heading: '1. Potensi Tersembunyi Limbah Kulit Singkong',
          body: [
            'Kulit singkong menyumbang sekitar 10-15% dari total bobot umbi segar. Di dalamnya terkandung serat selulosa dan sisa pati yang cukup potensial jika diekstraksi secara tepat.',
            'Dalam inisiatif BioLiving SUDP, tim mengeksplorasi pemanfaatan serat kulit singkong yang telah dicuci, dikeringkan, dan ditepungkan sebagai bahan pengisi penguat (filler/reinforcement agent) untuk memperbaiki ketahanan tarik bioplastik.'
          ]
        },
        {
          heading: '2. Proses Alur Pengolahan Ramah Lingkungan',
          body: [
            'Tahap 1: Pengumpulan & Pemilahan — Mengambil residu bersih dari sentra olahan singkong lokal.',
            'Tahap 2: Ekstraksi & Pencampuran — Pengeringan, penghalusan, dan pencampuran formula pati dengan agen pemlastis organik.',
            'Tahap 3: Pembentukan Lembaran (Casting / Extrusion) — Memanaskan campuran pada suhu terkontrol hingga tergelatinisasi dan dicetak menjadi lembaran lentur.',
            'Tahap 4: Perakitan Produk Prototipe — Pemotongan dan perlekatan panas untuk menghasilkan tas belanja, kantong serbaguna, hingga kap lampu.'
          ]
        },
        {
          heading: '3. Batasan Prototipe Akademik',
          body: [
            'Sebagai prototipe proyek SUDP, produk BioLiving yang ditampilkan di platform ini merupakan pembuktian konsep (proof of concept).',
            'Penelitian lanjutan masih diperlukan untuk standardisasi kekuatan tarik, ketahanan air dalam jangka panjang, dan optimasi efisiensi energi skala produksi massal.'
          ]
        }
      ],
      keyTakeaways: [
        'Limbah kulit singkong mengandung serat penguat yang dapat meningkatkan kekuatan mekanis lembaran bioplastik.',
        'Memanfaatkan limbah organik lokal membantu mengurangi beban TPA sekaligus menekan ketergantungan pada resin fosil impor.',
        'Pengembangan bioplastik berbasis limbah mendukung simbiosis industri dan ekonomi sirkular lokal.'
      ],
      references: [
        'Kementerian Lingkungan Hidup dan Kehutanan (KLHK) RI (2025). Data Pengelolaan Sampah Nasional.',
        'Wahyuningtyas, D. et al. (2023). Extraction of Cellulose from Cassava Peels for Eco-Friendly Bioplastic Synthesis.',
        'Laporan Kemajuan Proyek BioLiving SUDP, 2026.'
      ]
    }
  },
  {
    id: 'art-03',
    slug: 'understanding-plastic-waste-crisis',
    title: 'Krisis Sampah Plastik Perkotaan: Menelaah Ancaman & Solusi Nyata',
    category: 'Isu Lingkungan & Polusi',
    readTime: '4 min baca',
    excerpt: 'Tantangan polusi plastik sekali pakai, pembentukan mikroplastik, dampaknya pada drainase perkotaan, dan kebutuhan mendesak material alternatif.',
    image: ID_HOLDER_IMAGE,
    content: {
      intro: 'Plastik konvensional berbasis minyak bumi (seperti LDPE, HDPE, dan PP) telah merevolusi kenyamanan hidup modern sejak pertengahan abad ke-20. Namun, sifatnya yang persisten dan lambat terdegradasi menjadi ancaman serius bagi kelestarian lingkungan dan sistem drainase perkotaan.',
      sections: [
        {
          heading: '1. Sumbatan Saluran Air dan Risiko Banjir',
          body: [
            'Di area perkotaan padat, kantong plastik tipis sekali pakai sering kali berakhir di saluran air pemukiman, gorong-gorong, dan sungai.',
            'Sampah plastik ini menangkap endapan lumpur dan sampah organik lain, memicu pendangkalan saluran dan memperparah genangan banjir musiman.'
          ]
        },
        {
          heading: '2. Fragmentasi Menjadi Mikroplastik',
          body: [
            'Di bawah paparan sinar matahari dan gesekan mekanis, plastik konvensional tidak pernah benar-benar lenyap; melainkan terpecah menjadi partikel mikroskopis (<5 mm) yang dikenal sebagai mikroplastik.',
            'Mikroplastik kini telah terdeteksi dalam sedimen sungai, biota laut konsumsi, air tanah, hingga udara ambien perkotaan.'
          ]
        },
        {
          heading: '3. Peran Material Alternatif',
          body: [
            'Mengganti kantong plastik sekali pakai dengan material alternatif yang dapat terurai secara hayati jika tercecer di lingkungan adalah salah satu pilar intervensi hilir.',
            'Namun demikian, pengurangan konsumsi (Reduce) dan penggunaan berulang (Reuse) tetap harus berjalan beriringan dengan adopsi material baru.'
          ]
        }
      ],
      keyTakeaways: [
        'Plastik konvensional persisten ratusan tahun dan terfragmentasi menjadi mikroplastik berbahaya.',
        'Kantong plastik sekali pakai menjadi kontributor utama penyumbatan sistem drainase perkotaan.',
        'Solusi membutuhkan kombinasi pengurangan konsumsi berlebih dan substitusi material yang aman secara ekologis.'
      ],
      references: [
        'UNEP (2021). From Pollution to Solution: A Global Assessment of Marine Litter and Plastic Pollution.',
        'Jambeck, J. R. et al. (2015). Plastic waste inputs from land into the ocean. Science 347(6223).'
      ]
    }
  },
  {
    id: 'art-04',
    slug: 'circular-economy-in-action',
    title: 'Ekonomi Sirkular: Mengubah Paradigma Ambil-Pakai-Buang',
    category: 'Sistem & Keberlanjutan',
    readTime: '5 min baca',
    excerpt: 'Menerapkan model sirkular di mana produk dirancang dari awal untuk dapat kembali menjadi nutrisi biologis bagi ekosistem.',
    image: POUCH_IMAGE,
    content: {
      intro: 'Model ekonomi linear tradisional beroperasi dengan prinsip "Ambil - Buat - Buang" (Take - Make - Dispose). Model ini menguras sumber daya alam tak terbarukan dan menghasilkan gunungan polusi di ujung siklusnya. Ekonomi sirkular menawarkan cetak biru regeneratif yang menjaga nilai material selama mungkin.',
      sections: [
        {
          heading: '1. Siklus Biologis dan Siklus Teknis',
          body: [
            'Dalam kerangka Ellen MacArthur Foundation, ekonomi sirkular terbagi menjadi dua siklus: siklus teknis (logam, kaca, plastik keras yang dirancang untuk perbaikan dan daur ulang mekanis) dan siklus biologis (material organik yang dirancang untuk kembali ke tanah secara aman).',
            'Produk bioplastik BioLiving beroperasi dalam siklus biologis: bersumber dari tanaman, dimanfaatkan dalam kehidupan sehari-hari, dan pada akhir masa pakai dapat terurai menjadi biomassa dan humus penyubur tanah.'
          ]
        },
        {
          heading: '2. Desain Sejak Awal (Design for Disassembly / Decay)',
          body: [
            'Keberlanjutan tidak dimulai saat produk dibuang, melainkan saat produk dirancang di meja gambar.',
            'Pada prototipe BioLiving, kami membatasi penggunaan pewarna sintetis berat dan memilih pengikat alami sehingga ketika material memasuki fase pengomposan, tidak meninggalkan residu racun bagi mikroorganisme tanah.'
          ]
        }
      ],
      keyTakeaways: [
        'Ekonomi sirkular memisahkan pertumbuhan ekonomi dari konsumsi sumber daya tak terbarukan.',
        'Bioplastik pati singkong masuk ke dalam siklus biologis yang mengembalikan nutrisi ke alam.',
        'Perancangan produk bertanggung jawab harus mempertimbangkan seluruh siklus hidup material.'
      ],
      references: [
        'Ellen MacArthur Foundation (2020). The New Plastics Economy: Rethinking the future of plastics.',
        'Bappenas (2021). Peta Jalan Ekonomi Sirkular Indonesia 2020-2024.'
      ]
    }
  },
  {
    id: 'art-05',
    slug: 'sustainable-everyday-habits',
    title: '5 Kebiasaan Berkelanjutan Praktis untuk Masyarakat Urban',
    category: 'Gaya Hidup & Aksi',
    readTime: '3 min baca',
    excerpt: 'Langkah konkret yang dapat diterapkan mulai hari ini: dari membawa kantong belanja mandiri hingga memilah sampah organik dapur.',
    image: LAMPSHADE_IMAGE,
    content: {
      intro: 'Menjalani gaya hidup ramah lingkungan sering kali terasa rumit atau mahal. Padahal, perubahan sistemik berskala besar selalu bermula dari akumulasi keputusan sadar yang konsisten oleh warga kota sehari-hari.',
      sections: [
        {
          heading: '1. Praktik 5 Langkah Nyata',
          body: [
            'Langkah 1: Selalu Siapkan Tas Belanja di Tas Utama — Selipkan 1-2 kantong bioplastik atau kantong lipat di tas kerja Anda agar tidak pernah perlu meminta kantong plastik di kasir.',
            'Langkah 2: Menolak Kemasan Berlebih — Katakan dengan sopan pada pedagang atau kasir saat memesan makanan bawa pulang tanpa sendok plastik atau kantong kresek tambahan.',
            'Langkah 3: Pemilahan Organik dari Dapur — Pisahkan sisa sayur, kulit buah, dan sisa bahan masakan agar tidak tercampur sampah anorganik.',
            'Langkah 4: Pilih Material dengan Akhir Masa Pakai Jelas — Teliti label kemasan: apakah material dapat didaur ulang secara lokal atau dapat terurai di komposter rumah tangga.',
            'Langkah 5: Bagikan Edukasi, Bukan Menghakimi — Ajak teman dan keluarga dengan contoh nyata dan diskusi positif mengenai dampak sampah plastik.'
          ]
        }
      ],
      keyTakeaways: [
        'Perubahan dimulai dari kebiasaan kecil yang diulang secara konsisten.',
        'Menolak plastik sekali pakai di kasir merupakan langkah pencegahan paling efektif di hulu.',
        'Pendidikan lingkungan yang bersahabat memperluas gerakan keberlanjutan perkotaan.'
      ],
      references: [
        'World Wildlife Fund (WWF) Indonesia (2023). Panduan Gaya Hidup Bijak Plastik.',
        'SUDP Urban Sustainability Guide, 2026.'
      ]
    }
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderReference: 'BIO-2026-8812',
    userId: 'user-01',
    customerName: 'Budi Pratama',
    email: 'user@bioliving.id',
    phone: '081234567890',
    shippingAddress: 'Jl. Surya Kencana No. 42, RT 03 / RW 07',
    city: 'Bandung',
    postalCode: '40132',
    notes: 'Mohon kemas dengan packaging kertas tanpa plastik tambahan.',
    shippingMethod: 'Reguler Eco-Courier (2-3 Hari)',
    paymentMethod: 'Transfer Bank Manual (Simulasi)',
    items: [
      {
        productId: 'prod-01',
        name: 'Bioplastic Shopping Bag (Singkong)',
        price: 18000,
        quantity: 2,
        image: SHOPPING_BAG_IMAGE,
        category: 'Shopping Bags'
      },
      {
        productId: 'prod-03',
        name: 'Bioplastic ID Card Holder & Lanyard',
        price: 35000,
        quantity: 1,
        image: ID_HOLDER_IMAGE,
        category: 'Accessories'
      }
    ],
    subtotal: 71000,
    shippingCost: 15000,
    total: 86000,
    status: 'Menunggu Konfirmasi',
    createdAt: '2026-10-10 14:22'
  },
  {
    id: 'ord-1002',
    orderReference: 'BIO-2026-7241',
    userId: 'user-02',
    customerName: 'Siti Rahmawati',
    email: 'siti.rahma@example.com',
    phone: '082198765432',
    shippingAddress: 'Apartemen Green Garden Tower B No. 1205',
    city: 'Jakarta Barat',
    postalCode: '11520',
    notes: 'Kirim saat jam kerja kantor.',
    shippingMethod: 'Express 1 Hari',
    paymentMethod: 'Cash on Delivery (Simulasi)',
    items: [
      {
        productId: 'prod-02',
        name: 'Bioplastic Pouch & Clutch Serbaguna',
        price: 45000,
        quantity: 1,
        image: POUCH_IMAGE,
        category: 'Pouches and Handbags'
      }
    ],
    subtotal: 45000,
    shippingCost: 25000,
    total: 70000,
    status: 'Diproses',
    createdAt: '2026-10-09 09:15'
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'user-01',
    fullName: 'Budi Pratama (Demo Customer)',
    email: 'user@bioliving.id',
    role: 'customer',
    createdAt: '2026-09-15'
  },
  {
    id: 'admin-01',
    fullName: 'Tim BioLiving (SUDP Admin)',
    email: 'admin@bioliving.id',
    role: 'admin',
    createdAt: '2026-09-01'
  }
];
