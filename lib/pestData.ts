import { COMPANY_IMAGES } from './media';

export interface PestInfo {
  id: string;
  nameAr: string;
  nameEn: string;
  scientificName: string;
  category: 'زواحف' | 'طائرات' | 'قوارض' | 'هياكل وخشب' | 'أثاث وفراش';
  riskLevel: 'منخفض' | 'متوسط' | 'مرتفع' | 'عاجل جداً';
  riskColor: string;
  image: string;
  shortDesc: string;
  locations: string[]; // e.g. 'kitchen', 'bedroom', 'bathroom', 'wood', 'garden', 'storage'
  sizes: ('tiny' | 'small' | 'medium' | 'large')[]; // tiny <3mm, small 3-10mm, medium 10-30mm, large >30mm
  colors: ('black_brown' | 'red_brown' | 'white_beige' | 'yellow_striped' | 'gray_fur')[];
  behaviors: ('flies' | 'crawls_fast' | 'marches' | 'hides_fabrics' | 'night_nocturnal')[];
  damageSigns: ('bites' | 'spots_smell' | 'mud_wood' | 'food_waste' | 'chewed_wires' | 'none')[];
  matchedTraits: string[];
  diyAdvice: string[];
  mistakesToAvoid: string[];
  recommendedServiceSlug: string;
  recommendedServiceName: string;
}

export const PEST_DATABASE: PestInfo[] = [
  {
    id: 'cockroach-german',
    nameAr: 'الصرصور الألماني الصغير',
    nameEn: 'German Cockroach',
    scientificName: 'Blattella germanica',
    category: 'زواحف',
    riskLevel: 'مرتفع',
    riskColor: 'text-amber-600 bg-amber-50 border-amber-200',
    image: COMPANY_IMAGES.kitchenTreatment,
    shortDesc: 'حشرة بنية فاتحة صغيرة الحجم تنشط ليلاً وتتكاثر بسرعة فائقة داخل شقوق المطابخ وخلف الأجهزة الكهربائية.',
    locations: ['kitchen', 'bathroom', 'storage'],
    sizes: ['small', 'medium'],
    colors: ['red_brown', 'black_brown'],
    behaviors: ['crawls_fast', 'night_nocturnal'],
    damageSigns: ['spots_smell', 'food_waste'],
    matchedTraits: ['التواجد في المطابخ وزوايا الأفران', 'الهروب السريع عند إشعال الضوء', 'ترك نقاط سوداء صغيرة كفضلات'],
    diyAdvice: [
      'تفريغ القمامة يومياً ومسح بقايا الزيوت والفتات عن أسطح الطهي فوراً.',
      'إصلاح أي تسريبات مياه تحت الأحواض لتجفيف مصادر الشرب للحشرة.',
      'حفظ جميع الحبوب والمعجنات في أوعية زجاجية أو بلاستيكية محكمة الإغلاق.',
    ],
    mistakesToAvoid: [
      'تجنب رش المبيدات البخاخة العادية لأنها تشتت المستعمرة وتزيد انتشارها في غرف أخرى.',
      'تجنب ترك أطباق طعام الحيوانات الأليفة ممتلئة طوال الليل.',
    ],
    recommendedServiceSlug: 'cockroach-ant-control',
    recommendedServiceName: 'خدمة إبادة الصراصير بالجل الحيوي الموجه',
  },
  {
    id: 'bed-bug',
    nameAr: 'بق الفراش',
    nameEn: 'Bed Bug',
    scientificName: 'Cimex lectularius',
    category: 'أثاث وفراش',
    riskLevel: 'عاجل جداً',
    riskColor: 'text-red-600 bg-red-50 border-red-200',
    image: COMPANY_IMAGES.residentialInspection,
    shortDesc: 'حشرة متناهية الصغر بنية مائلة للحمرة تختبئ في طيات المراتب ودرزات الأثاث وتتغذى على دم الإنسان ليلاً.',
    locations: ['bedroom', 'storage'],
    sizes: ['tiny', 'small'],
    colors: ['red_brown', 'black_brown'],
    behaviors: ['hides_fabrics', 'night_nocturnal'],
    damageSigns: ['bites', 'spots_smell'],
    matchedTraits: ['ظهور لدغات متسلسلة وحكة جلدية بعد الاستيقاظ', 'وجود بقع دماء أو نقاط سوداء على الملاءات', 'التواجد بين ثنايا المراتب وإطارات الأسرة'],
    diyAdvice: [
      'غسل جميع الملاءات والأغطية بالماء الساخن جداً (أعلى من 60 درجة مئوية) وتجفيفها بالحرارة العالية.',
      'استخدام مكنسة كهربائية قوية لشفط المراتب والشقوق والتخلص من الكيس فوراً خارج المنزل.',
      'تغليف المراتب بأغطية واقية محكمة مخصصة لعزل البق.',
    ],
    mistakesToAvoid: [
      'لا تنقل المراتب المصابة إلى غرف أخرى حتى لا تنقل العدوى لبقية المنزل.',
      'المبيدات المنزلية الرخيصة لا تقتل بيض البق وتزيد مقاومته الحيوية.',
    ],
    recommendedServiceSlug: 'bed-bug-treatment',
    recommendedServiceName: 'برنامج الإبادة الحرارية المتطورة لبق الفراش',
  },
  {
    id: 'termite',
    nameAr: 'النمل الأبيض (الأرضة)',
    nameEn: 'Subterranean Termite',
    scientificName: 'Reticulitermes',
    category: 'هياكل وخشب',
    riskLevel: 'عاجل جداً',
    riskColor: 'text-rose-700 bg-rose-50 border-rose-200',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    shortDesc: 'حشرة بيضاء أو بيج باهتة تلتهم خشب الأبواب والأثاث والباركيه وتبني أنابيب طينية سرية على الجدران.',
    locations: ['wood', 'storage', 'garden'],
    sizes: ['tiny', 'small'],
    colors: ['white_beige'],
    behaviors: ['marches', 'night_nocturnal'],
    damageSigns: ['mud_wood'],
    matchedTraits: ['مشاهدة خطوط وأنفاق طينية على الجدران أو الحلوق', 'سماع صوت مجوف فارغ عند النقر على الخشب', 'تساقط بودرة تشبه نشارة الخشب الدقيقة'],
    diyAdvice: [
      'فحص محيط حلوق الأبواب وألواح الباركيه لتحديد مدى تخلخل الخشب.',
      'إبعاد أي أخشاب تالفة أو كراتين مبللة عن ملامسة جدران المنزل مباشرة.',
      'عدم حك الأنابيب الطينية حتى يتمكن الفني من تتبع مسار الملكة بالرادار.',
    ],
    mistakesToAvoid: [
      'لا ترش الديزل أو الكيروسين لأنه يضر بالخرسانة ولا يصل إلى عمق المستعمرة تحت الأرض.',
      'تجنب استبدال الأبواب قبل معالجة التربة والأساسات حتى لا تُصاب الأبواب الجديدة.',
    ],
    recommendedServiceSlug: 'termite-control',
    recommendedServiceName: 'المعالجة بالحقن والرادار الذكي للنمل الأبيض',
  },
  {
    id: 'mouse-rodent',
    nameAr: 'الفأر المنزلي والجرذان',
    nameEn: 'House Mouse & Rats',
    scientificName: 'Mus musculus / Rattus',
    category: 'قوارض',
    riskLevel: 'عاجل جداً',
    riskColor: 'text-orange-700 bg-orange-50 border-orange-200',
    image: COMPANY_IMAGES.fieldWorkerBackpack,
    shortDesc: 'قوارض رمادية أو بنية سريعة الحركة تترك فضلات سوداء صغيرة وتسبب تلف الأسلاك الكهربائية والمؤن.',
    locations: ['kitchen', 'storage', 'bathroom', 'garden'],
    sizes: ['large'],
    colors: ['gray_fur', 'black_brown'],
    behaviors: ['crawls_fast', 'night_nocturnal'],
    damageSigns: ['chewed_wires', 'food_waste', 'spots_smell'],
    matchedTraits: ['سماع أصوات خربشة وقرض داخل الجدران أو الأسقف المستعارة', 'وجود فضلات أسطوانية داكنة بحجم حبة الأرز', 'قرض أكياس المواد الغذائية أو تآكل الأسلاك'],
    diyAdvice: [
      'إحكام إغلاق أي فتحات أو شقوق بالجدران ومخارج المكيفات بشبكات معدنية صلبة.',
      'حفظ جميع المؤن في خزائن مرتفعة وعلب محكمة مانعة للقرض.',
      'تنظيف وتعقيم المناطق التي تم رصد الفضلات فيها بالكلور الطبي.',
    ],
    mistakesToAvoid: [
      'تجنب وضع سموم غير مقيدة في أماكن يسهل للأطفال أو الحيوانات الأليفة الوصول إليها.',
      'تجنب ترك القارض النافق في الجدران دون إخلاء لمنع الروائح والحشرات الرمية.',
    ],
    recommendedServiceSlug: 'rodent-control',
    recommendedServiceName: 'العزل الهيكلي والإبادة المتكاملة للقوارض',
  },
  {
    id: 'black-ant',
    nameAr: 'النمل الأسود ونمل السكر',
    nameEn: 'Black House Ant',
    scientificName: 'Ochetellus glaber',
    category: 'زواحف',
    riskLevel: 'متوسط',
    riskColor: 'text-amber-600 bg-amber-50 border-amber-200',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
    shortDesc: 'نمل صغير يتجمع في مسارات منتظمة بحثاً عن السكريات وبقايا الطعام قرب مصادر الرطوبة والمطابخ.',
    locations: ['kitchen', 'bathroom', 'garden'],
    sizes: ['tiny', 'small'],
    colors: ['black_brown'],
    behaviors: ['marches'],
    damageSigns: ['food_waste', 'none'],
    matchedTraits: ['المشي في خطوط منتظمة نحو أوعية السكر أو سلة المهملات', 'تجمع أعداد كبيرة فجأة حول أي فتات حلوى أو دهون'],
    diyAdvice: [
      'مسح مسارات النمل بخليط الماء والخل لمسح الفيرمونات التي تتبعها بقية المجموعة.',
      'سد الشقوق بين الوزرات وبلاط السيراميك بالسليكون العازل.',
      'حفظ العسل والحلويات داخل أواني محكمة الإغلاق أو أحواض مائية خفيفة.',
    ],
    mistakesToAvoid: [
      'رش رذاذ المبيدات على الطابور الخارجي يقتل الحشرات السطحية فقط ويترك الملكة تضع بيوضاً أكثر داخل الجدار.',
    ],
    recommendedServiceSlug: 'cockroach-ant-control',
    recommendedServiceName: 'إبادة مستعمرات النمل بالطعوم الهرمونية الجاذبة',
  },
  {
    id: 'mosquito',
    nameAr: 'البعوض والناموس',
    nameEn: 'Mosquito',
    scientificName: 'Culicidae',
    category: 'طائرات',
    riskLevel: 'مرتفع',
    riskColor: 'text-red-600 bg-red-50 border-red-200',
    image: COMPANY_IMAGES.outdoorSpraying,
    shortDesc: 'حشرة طائرة ليلية تتغذى إناثها على امتصاص الدم وتنقل الأمراض، تتكاثر في المياه الراكدة والحدائق.',
    locations: ['garden', 'bedroom'],
    sizes: ['small'],
    colors: ['black_brown', 'yellow_striped'],
    behaviors: ['flies', 'night_nocturnal'],
    damageSigns: ['bites'],
    matchedTraits: ['طنين مزعج حول الأذنين ليلاً', 'لدغات منتفخة تسبب حكة مستمرة واحمراراً على الذراعين والساقين', 'التواجد بكثافة قرب أحواض النباتات وتجمعات المياه'],
    diyAdvice: [
      'تفريغ أي أواني أو صحون ري تحوي مياه راكدة في الحدائق والمناور.',
      'تركيب شبكات سلكية ضيقة (سلك منخل) على جميع النوافذ وفتحات التهوية.',
      'استخدام زيوت طاردة طبيعية مثل زيت السترونيلا أو شمع الأوكالبتوس في الجلسات الخارجية.',
    ],
    mistakesToAvoid: [
      'ترك صواني تصريف المكيفات ممتلئة بالماء الراكد، حيث تعد الحاضنة الأولى لتكاثر يرقات البعوض.',
    ],
    recommendedServiceSlug: 'residential-pest-control',
    recommendedServiceName: 'المكافحة البيولوجية للبعوض بالضباب العضوي للحدائق',
  },
  {
    id: 'wasp-hornet',
    nameAr: 'الدبابير والنحل البري',
    nameEn: 'Wasps & Hornets',
    scientificName: 'Vespidae',
    category: 'طائرات',
    riskLevel: 'عاجل جداً',
    riskColor: 'text-red-700 bg-red-50 border-red-200',
    image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=1200&auto=format&fit=crop',
    shortDesc: 'حشرات طائرة صفراء وسوداء تبني خلايا طينية أو كرتونية تحت أسقف المنازل والمظلات وتلسع بشراسة عند الاقتراب.',
    locations: ['garden', 'storage'],
    sizes: ['medium', 'large'],
    colors: ['yellow_striped', 'black_brown'],
    behaviors: ['flies'],
    damageSigns: ['bites', 'none'],
    matchedTraits: ['رؤية أعشاش بيضاوية أو طينية تحت مظلات القرميد والأسطح', 'حركة طيران سريعة وقريبة من النوافذ الخارجية', 'لسعات حادة ومؤلمة جداً قد تسبب حساسية مفرطة'],
    diyAdvice: [
      'الابتعاد تماماً عن محيط العش وإبقاء الأطفال والحيوانات الأليفة داخل المنزل.',
      'إغلاق النوافذ والشرفات القريبة من مسار الطيران.',
      'عدم الاقتراب بالأضواء المباشرة أو إلقاء الماء على العش.',
    ],
    mistakesToAvoid: [
      'محاولة ضرب العش بالعصا أو إحراقه، حيث يؤدي ذلك إلى هجوم جماعي عنيف ومميت للدبابير.',
    ],
    recommendedServiceSlug: 'residential-pest-control',
    recommendedServiceName: 'إزالة أعشاش الدبابير والرش العازل للمظلات',
  },
  {
    id: 'pantry-beetle',
    nameAr: 'سوس الحبوب وخنافس المؤن',
    nameEn: 'Pantry Weevils & Beetles',
    scientificName: 'Sitophilus oryzae',
    category: 'زواحف',
    riskLevel: 'منخفض',
    riskColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    image: COMPANY_IMAGES.precisionGelInjection,
    shortDesc: 'خنافس بنية داكنة متناهية الصغر تظهر داخل أكياس الأرز، الطحين، التوابل والحبوب المخزنة.',
    locations: ['kitchen', 'storage'],
    sizes: ['tiny', 'small'],
    colors: ['black_brown', 'red_brown'],
    behaviors: ['crawls_fast'],
    damageSigns: ['food_waste'],
    matchedTraits: ['العثور على حشرات صغيرة داخل علب الحبوب أو أكياس الطحين المفتوحة', 'وجود خيوط نسيجية دقيقة أو بودرة ناعمة في أسفل الدواليب'],
    diyAdvice: [
      'التخلص فوراً من الأكياس المصابة وإلقاؤها في حاوية القمامة الخارجية.',
      'تفريغ دواليب المؤن ومسحها بالماء الدافئ والخل الأبيض.',
      'تجميد الحبوب الجديدة في الفريزر لمدة 48 ساعة قبل تخزينها للقضاء على أي يرقات غير مرئية.',
    ],
    mistakesToAvoid: [
      'تخزين المؤن في أكياس ورقية أو بلاستيكية رقيقة يسهل للحشرات ثقبها واختراقها.',
    ],
    recommendedServiceSlug: 'commercial-pest-control',
    recommendedServiceName: 'حماية وتطهير مستودعات ومطابخ المواد التموينية',
  },
];

export interface QuizQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: {
    value: string;
    label: string;
    desc: string;
    icon: string;
    badge?: string;
  }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'location',
    title: 'أين شاهدت الحشرة أو آثار نشاطها لأول مرة؟',
    subtitle: 'يساعدنا المكان في حصر البيئة المفضلة للآفة',
    options: [
      {
        value: 'kitchen',
        label: 'في المطبخ وخزائن الأطعمة والأفران',
        desc: 'قرب مصادر الغذاء، الرطوبة، وأسفل الأحواض',
        icon: 'UtensilsCrossed',
      },
      {
        value: 'bedroom',
        label: 'في غرفة النوم، المراتب والستائر',
        desc: 'حول السرير، طيات الأقمشة، وخلف اللوحات',
        icon: 'Bed',
      },
      {
        value: 'wood',
        label: 'في إطارات الأبواب، الباركيه أو الأخشاب',
        desc: 'قرب الجدران والأساسات مع وجود نشارة خشب',
        icon: 'Trees',
      },
      {
        value: 'bathroom',
        label: 'في دورات المياه والمصارف ومناور التهوية',
        desc: 'في الأماكن عالية الرطوبة ومواسير الصرف',
        icon: 'Droplets',
      },
      {
        value: 'garden',
        label: 'في الحديقة، الفناء الخارجي أو تحت المظلات',
        desc: 'بين الأشجار، أحواض الزراعة ومظلات الأسطح',
        icon: 'Flower2',
      },
      {
        value: 'storage',
        label: 'في المستودع، القبو، أو غرف التخزين والأسقف',
        desc: 'بين الكراتين، الأجهزة القديمة وتجاويف الجبس',
        icon: 'Package',
      },
    ],
  },
  {
    id: 'size',
    title: 'ما هو الحجم التقديري للحشرة المشاهدة؟',
    subtitle: 'مؤشر هائل لتحديد طور النمو والفصيلة الدقيقة',
    options: [
      {
        value: 'tiny',
        label: 'دقيقة جداً (أصغر من 3 ملم)',
        desc: 'مثل بق الفراش، سوس المؤن، ونمل السكر',
        icon: 'Search',
      },
      {
        value: 'small',
        label: 'صغيرة (3 - 10 ملم)',
        desc: 'مثل الصرصور الألماني الصغير، البعوض، والنمل الأسود',
        icon: 'Bug',
      },
      {
        value: 'medium',
        label: 'متوسطة (1 - 3 سم)',
        desc: 'مثل الدبابير، خنافس الأثاث، والصرصور الشرقي',
        icon: 'ShieldAlert',
      },
      {
        value: 'large',
        label: 'كبيرة (أكبر من 3 سم)',
        desc: 'مثل الفئران، الجرذان، الصرصور الأمريكي الكبير',
        icon: 'Rat',
      },
    ],
  },
  {
    id: 'color',
    title: 'ما هو اللون البارز للحشرة أو الآفة؟',
    subtitle: 'لون جسم الحشرة يساعد في استبعاد الفصائل الأخرى',
    options: [
      {
        value: 'black_brown',
        label: 'أسود أو بني داكن',
        desc: 'شائع في الصراصير، النمل الأسود، والجرذان',
        icon: 'Circle',
      },
      {
        value: 'red_brown',
        label: 'بني مائل للحمرة أو نحاسي',
        desc: 'مميز لحشرة بق الفراش والصرصور الألماني',
        icon: 'Flame',
      },
      {
        value: 'white_beige',
        label: 'أبيض شاحب أو بيج كريمي',
        desc: 'خاص بالنمل الأبيض (الأرضة) وديدان الأخشاب',
        icon: 'Sparkles',
      },
      {
        value: 'yellow_striped',
        label: 'أصفر مخطط بالأسود',
        desc: 'خاص بالدبابير والنحل وبعض الحشرات الطائرة',
        icon: 'Zap',
      },
      {
        value: 'gray_fur',
        label: 'رمادي أو فروي',
        desc: 'خاص بالفئران والقوارض المنزلية',
        icon: 'Eye',
      },
    ],
  },
  {
    id: 'behavior',
    title: 'كيف تصف حركة وسلوك الآفة في المكان؟',
    subtitle: 'طريقة الحركة والنشاط اليومي تكشف نوعها مباشرة',
    options: [
      {
        value: 'crawls_fast',
        label: 'تزحف بسرعة وهرب مفاجئ عند الضوء',
        desc: 'سلوك نمطي للصراصير والفئران عند كشفها',
        icon: 'Footprints',
      },
      {
        value: 'hides_fabrics',
        label: 'تختبئ في ثنايا القماش والسرير وتنزل ليلاً',
        desc: 'سلوك حشرة بق الفراش أثناء النوم',
        icon: 'BedDouble',
      },
      {
        value: 'marches',
        label: 'تسير في خطوط وطوابير منتظمة ثابته',
        desc: 'سلوك تنظيم مستعمرات النمل الأسود والأبيض',
        icon: 'GitCommit',
      },
      {
        value: 'flies',
        label: 'تطير في الهواء وتحوم حول الأضواء أو المظلات',
        desc: 'سلوك البعوض والذباب والدبابير',
        icon: 'Wind',
      },
    ],
  },
  {
    id: 'damage',
    title: 'ما هي الآثار أو الأضرار التي لاحظتها؟',
    subtitle: 'العلامة التشخيصية الأكثر دقة للتقييم الفني',
    options: [
      {
        value: 'bites',
        label: 'لدغات جلدية وحكة بعد الاستيقاظ مباشرة',
        desc: 'علامة مؤكدة لبق الفراش أو البعوض',
        icon: 'Activity',
      },
      {
        value: 'spots_smell',
        label: 'نقاط سوداء دقيقة أو رائحة زيتية كريهة',
        desc: 'فضلات الصراصير والبق على الأسطح',
        icon: 'AlertCircle',
      },
      {
        value: 'mud_wood',
        label: 'خطوط طينية أو تآكل وتجويف بالأخشاب',
        desc: 'علامة نشاط النمل الأبيض (الأرضة)',
        icon: 'Binary',
      },
      {
        value: 'food_waste',
        label: 'تلف الأطعمة، أكياس مثقوبة أو بقايا فتات',
        desc: 'نشاط سوس المؤن، الصراصير ونمل السكر',
        icon: 'Apple',
      },
      {
        value: 'chewed_wires',
        label: 'أسلاك كهربائية أو أخشاب مقروضة وفضلات',
        desc: 'علامة قاطعة على وجود فئران أو قوارض',
        icon: 'Scissors',
      },
    ],
  },
];

export type QuizAnswers = Record<string, string>;

export interface MatchResult {
  pest: PestInfo;
  score: number;
  matchingReasons: string[];
}

export function diagnosePest(answers: QuizAnswers): MatchResult[] {
  const results = PEST_DATABASE.map((pest) => {
    let score = 0;
    const reasons: string[] = [];

    // Location match (weight: 25)
    if (answers.location && pest.locations.includes(answers.location)) {
      score += 25;
      reasons.push('تواجد الحشرة في هذه المنطقة يطابق بيئتها الطبيعية المفضلة');
    }

    // Size match (weight: 20)
    if (answers.size && pest.sizes.includes(answers.size as any)) {
      score += 20;
      reasons.push('الحجم الملحوظ ينطبق على هذه الفصيلة بشكل دقيق');
    }

    // Color match (weight: 20)
    if (answers.color && pest.colors.includes(answers.color as any)) {
      score += 20;
      reasons.push('اللون الظاهري يطابق الخصائص الشكلية للآفة');
    }

    // Behavior match (weight: 20)
    if (answers.behavior && pest.behaviors.includes(answers.behavior as any)) {
      score += 20;
      reasons.push('نمط الحركة والنشاط الليلي يطابق سلوكها المعروف');
    }

    // Damage match (weight: 15)
    if (answers.damage) {
      if (answers.damage === 'none') {
        score += 10;
      } else if (pest.damageSigns.includes(answers.damage as any)) {
        score += 15;
        reasons.push('الأضرار والآثار المسجلة هي علامات تشخيصية بارزة');
      }
    }

    // Baseline minimum score for contextual similarity
    const finalScore = Math.min(100, Math.max(30, score));

    return {
      pest,
      score: finalScore,
      matchingReasons: reasons.length > 0 ? reasons : ['تطابق جزئي في السمات السلوكية العامة'],
    };
  });

  return results.sort((a, b) => b.score - a.score);
}

export const matchPests = diagnosePest;
