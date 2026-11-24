export const initialEventsData = {
  // SECTION 1 — Tendances & Actualités
  upcoming: [
    {
      id: 'integration-2026',
      featured: true,
      title: {
        fr: "Journée d'Intégration — ESTK 2026",
        ar: 'يوم الاستقبال والاندماج - المدرسة العليا للتكنولوجيا 2026',
      },
      category: {
        fr: 'Événement Officiel',
        ar: 'فعالية رسمية',
      },
      date: '2026-11-12',
      time: '09:00',
      location: {
        fr: 'EST Kelaa des Sraghna',
        ar: 'المدرسة العليا للتكنولوجيا بقلعة السراغنة',
      },
      image:
        'https://images.unsplash.com/photo-1542744094-3a312169a19d?auto=format&fit=crop&w=1200&q=80',
      desc: {
        fr: "Grande journée d'intégration organisée par l'ESTK en présence de Monsieur le Gouverneur de la province de El Kelaa des Sraghna, des différents clubs, cadres et de notre club M&M-HUB présent en force pour marquer cet événement.",
        ar: 'يوم كبير للاندماج تنظمه المدرسة العليا للتكنولوجيا بحضور السيد عامل إقليم قلعة السراغنة، مختلف الأندية والأطر، وحضور قوي ومتميز لنادينا M&M-HUB.',
      },
      status: {
        fr: 'À venir',
        ar: 'قريباً',
      },
    },
  ],

  // SECTION 2 — Événements réalisés
  past: [
    {
      id: 'journee-integration-estk-2026',
      title: {
        fr: "Journée d'Intégration : Un moment fort à l'ESTK avec plus de 90 nouveaux membres",
        ar: 'يوم الاندماج: لحظة مميزة بالمدرسة العليا للتكنولوجيا مع أكثر من 90 عضواً جديداً',
      },
      category: {
        fr: 'Vie Étudiante & Intégration',
        ar: 'الحياة الطلابية والاندماج',
      },
      date: '2026-11-12',
      likes: 0,
      likedByUser: false,
      image: '/images/events/photo1.png',
      summary: {
        fr: "Le 12/11/2026 à l'ESTK, une journée d'intégration mémorable marquée par la présence du Président de l'Université Cadi Ayyad, d'invités d'honneur de poids, des professeurs, du cadre administratif et des étudiants de différents niveaux, réunissant plus de 90 nouveaux membres.",
        ar: 'بتاريخ 12/11/2026 بالمدرسة العليا للتكنولوجيا، تم تنظيم يوم اندماج متميز بحضور رئيس جامعة القاضي عياض وضيوف شرف وازنين والأساتذة والأطر الإدارية والطلبة بمختلف مستوياتهم، مع انضمام أكثر من 90 عضواً جديداً في أجواء رائعة.',
      },
      intro: {
        fr: "Le 12/11/2026, au sein de l'EST Kelaa des Sraghna, s'est tenue la Journée d'Intégration avec la participation de notre club M&M-HUB. Ce fut un véritable honneur de prendre part à cet événement marquant, honoré par la présence de Monsieur le Président de l'Université Cadi Ayyad et d'invités d'honneur de grande envergure, entourés des professeurs, du cadre administratif et des étudiants de différents niveaux.",
        ar: 'في 12/11/2026، احتضنت المدرسة العليا للتكنولوجيا بقلعة السراغنة يوم الاندماج بمشاركة نادينا M&M-HUB. وكان لنا شرف كبير أن نكون جزءاً من هذا الحدث البارز الذي عرف حضور رئيس جامعة القاضي عياض وضيوف شرف كبار، إلى جانب الأساتذة والأطر الإدارية والطلبة من مختلف المستويات.',
      },
      sections: [
        {
          subtitle: {
            fr: '1. Une présence institutionnelle et académique d’exception',
            ar: '١. حضور مؤسساتي وأكاديمي متميز',
          },
          text: {
            fr: "La participation de Monsieur le Président de l'Université Cadi Ayyad et d'autres personnalités et invités de marque, aux côtés des enseignants, du corps administratif et des étudiants de toutes promotions, a donné à cette journée une dimension inspirante et fédératrice.",
            ar: 'أضفى حضور رئيس جامعة القاضي عياض وضيوف الشرف الوازنين، إلى جانب الأساتذة والأطر الإدارية والطلبة من مختلف المستويات، طابعاً ملهماً وموحداً جعل من هذا اليوم محطة استثنائية.',
          },
        },
        {
          subtitle: {
            fr: '2. Plus de 90 nouveaux membres et une ambiance inoubliable',
            ar: '٢. أكثر من 90 عضواً جديداً وأجواء لا تُنسى',
          },
          text: {
            fr: "Grâce à cette dynamique collective, nous avons pu réunir plus de 90 nouveaux membres et partager des moments forts, conviviaux et riches en échanges, laissant un souvenir particulièrement chaleureux au sein de la communauté de l'ESTK.",
            ar: 'بفضل هذه الدينامية الجماعية، تمكنا من جمع أكثر من 90 عضواً جديداً وقضاء لحظات جميلة ومليئة بالتفاعل والروح الإيجابية التي تركت أثراً طيباً لدى الجميع.',
          },
        },
      ],
        image: '/images/events/photo1.png',
      gallery: [
        '/images/events/photo2.png',
        '/images/events/photo3.png',
      ],

      comments: [],
    },
    {
      id: 'portes-ouvertes-2026',
      title: {
        fr: 'Journée Portes Ouvertes : Accueil et Orientation des bacheliers',
        ar: 'أبواب مفتوحة: استقبال وتوجيه حاملي شهادة البكالوريا',
      },
      category: {
        fr: 'Orientation & Accueil',
        ar: 'توجيه واستقبال',
      },
      date: '2026-04-13',
      likes: 64,
      likedByUser: false,
      image: '/images/portes-ouvertes/image1.png',
      summary: {
        fr: 'Trois jours mémorables d’accueil des étudiants du baccalauréat venus de différents lycées et régions. Orientation, découverte des filières et échanges riches.',
        ar: 'ثلاثة أيام لا تنسى لاستقبال طلاب البكالوريا القادمين من مختلف الثانويات والمناطق. توجيه، تعريف بالمسالك وحوارات مثمرة.',
      },
      intro: {
        fr: 'Les 13, 14 et 15 avril 2026, l’EST Kelâa des Sraghna a ouvert ses portes aux futurs bacheliers. Notre club M&M-HUB était au cœur de cet événement pour guider, orienter et faire découvrir nos filières.',
        ar: 'أيام 13، 14 و 15 أبريل 2026، فتحت المدرسة العليا للتكنولوجيا بقلعة السراغنة أبوابها للطلبة المقبلين على البكالوريا. وكان نادينا في قلب الحدث للإرشاد والتوجيه.',
      },
      sections: [
        {
          subtitle: {
            fr: '1. Accueil et immersion des bacheliers',
            ar: '١. استقبال واندماج الطلبة',
          },
          text: {
            fr: 'Nous avons accueilli des centaines d’élèves venus de divers horizons et lycées. L’objectif était de les rassurer, de leur faire découvrir l’environnement universitaire et de répondre à toutes leurs interrogations.',
            ar: 'استقبلنا مئات التلاميذ القادمين من آفاق وثانويات مختلفة. كان الهدف هو طمأنتهم، تعريفهم بالبيئة الجامعية والإجابة على كل تساؤلاتهم.',
          },
        },
        {
          subtitle: {
            fr: '2. Sessions d’orientation et présentation des filières',
            ar: '٢. حصص التوجيه والتعريف بالمسالك',
          },
          text: {
            fr: 'Des stands interactifs et des ateliers d’orientation ont été animés pour présenter en détail les différentes filières de l’ESTK, en mettant en avant les débouchés et les perspectives d’avenir.',
            ar: 'تم تنظيم أروقة تفاعلية وورشات توجيهية لتقديم تفاصيل مسالك المدرسة، مع إبراز الآفاق المستقبلية لكل شعبة.',
          },
        },
      ],
      gallery: [
        '/images/portes-ouvertes/image2.png',
        '/images/portes-ouvertes/image3.png',
      ],
      comments: [
        {
          id: 'c1',
          author: 'Ayoub El Idrissi',
          date: '2026-04-16',
          text: 'Une belle initiative ! J’ai eu toutes les réponses concernant les filières.',
        },
        {
          id: 'c2',
          author: 'Hiba fatih',
          date: '2026-04-16',
          text: 'شكراً لنادي M&M-HUB على حسن الاستقبال والتوجيه الراقي.',
        },
      ],
    },
  ],

  // SECTION 3 — Nos projets futurs
  projects: [
    {
      id: 'proj-1',
      title: {
        fr: 'M&M-HUB Academy',
        ar: 'أكاديمية M&M-HUB',
      },
      status: {
        fr: 'En préparation',
        ar: 'قيد التحضير',
      },
      statusColor: 'bg-energeticOrange text-white',
      image:
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
      desc: {
        fr: 'Développer un cycle annuel d’ateliers pratiques et de masterclasses certifiantes en management, marketing digital et soft skills.',
        ar: 'تطوير برنامج سنوي من الورشات التطبيقية والدروس الماستر بشواهد في التسيير والتسويق الرقمي.',
      },
      goal: {
        fr: 'Objectif : Former au moins 150 étudiants qualifiés par an.',
        ar: 'الهدف: تدريب 150 طالباً سنوياً بمهارات عالية.',
      },
    },
  ],
};