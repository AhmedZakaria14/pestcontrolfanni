import { COMPANY_IMAGES, PEST_IMAGES } from './media';

export interface PestInfo {
  id: string;
  nameAr: string;
  nameEn: string;
  scientificName: string;
  category: string;
  categoryKey?: 'زواحف' | 'طائرات' | 'قوارض' | 'هياكل وخشب' | 'أثاث وفراش';
  riskLevel: string;
  riskColor: string;
  image: string;
  shortDesc: string;
  locations: string[];
  sizes: ('tiny' | 'small' | 'medium' | 'large')[];
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
    categoryKey: 'زواحف',
    riskLevel: 'مرتفع',
    riskColor: 'text-amber-600 bg-amber-50 border-amber-200',
    image: PEST_IMAGES.cockroachGerman,
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
    recommendedServiceName: 'إبادة الصراصير والنمل',
  },
  {
    id: 'bed-bug',
    nameAr: 'بق الفراش',
    nameEn: 'Bed Bug',
    scientificName: 'Cimex lectularius',
    category: 'أثاث وفراش',
    categoryKey: 'أثاث وفراش',
    riskLevel: 'عاجل جداً',
    riskColor: 'text-red-600 bg-red-50 border-red-200',
    image: PEST_IMAGES.bedBug,
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
    recommendedServiceName: 'مكافحة وإبادة بق الفراش',
  },
  {
    id: 'termite',
    nameAr: 'النمل الأبيض (الأرضة)',
    nameEn: 'Subterranean Termite',
    scientificName: 'Reticulitermes',
    category: 'هياكل وخشب',
    categoryKey: 'هياكل وخشب',
    riskLevel: 'عاجل جداً',
    riskColor: 'text-rose-700 bg-rose-50 border-rose-200',
    image: PEST_IMAGES.termite,
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
      'عدم حك الأنابيب الطينية حتى يتمكن الفني من تتبع مسار المستعمرة بدقة.',
    ],
    mistakesToAvoid: [
      'لا ترش الديزل أو الكيروسين لأنه يضر بالخرسانة ولا يصل إلى عمق المستعمرة تحت الأرض.',
      'تجنب استبدال الأبواب قبل معالجة التربة والأساسات حتى لا تُصاب الأبواب الجديدة.',
    ],
    recommendedServiceSlug: 'termite-control',
    recommendedServiceName: 'مكافحة النمل الأبيض (الأرضة)',
  },
  {
    id: 'mouse-rodent',
    nameAr: 'الفأر المنزلي والجرذان',
    nameEn: 'House Mouse & Rats',
    scientificName: 'Mus musculus / Rattus',
    category: 'قوارض',
    categoryKey: 'قوارض',
    riskLevel: 'عاجل جداً',
    riskColor: 'text-orange-700 bg-orange-50 border-orange-200',
    image: PEST_IMAGES.mouseRodent,
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
      'تنظيف وتعقيم المناطق التي تم رصد الفضلات فيها بالمطهرات.',
    ],
    mistakesToAvoid: [
      'تجنب وضع سموم مكشوفة في أماكن يسهل للأطفال أو الحيوانات الأليفة الوصول إليها.',
      'تجنب ترك الفتحات الخارجية دون سد بشبك معدني بعد الاصطياد.',
    ],
    recommendedServiceSlug: 'rodent-control',
    recommendedServiceName: 'مكافحة الفئران والقوارض',
  },
  {
    id: 'black-ant',
    nameAr: 'النمل الأسود ونمل السكر',
    nameEn: 'Black House Ant',
    scientificName: 'Ochetellus glaber',
    category: 'زواحف',
    categoryKey: 'زواحف',
    riskLevel: 'متوسط',
    riskColor: 'text-amber-600 bg-amber-50 border-amber-200',
    image: PEST_IMAGES.blackAnt,
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
      'حفظ العسل والحلويات داخل أواني محكمة الإغلاق.',
    ],
    mistakesToAvoid: [
      'رش رذاذ المبيدات على الطابور الخارجي يقتل الحشرات السطحية فقط ويترك الملكة تضع بيوضاً أكثر داخل الجدار.',
    ],
    recommendedServiceSlug: 'cockroach-ant-control',
    recommendedServiceName: 'إبادة الصراصير والنمل',
  },
  {
    id: 'mosquito',
    nameAr: 'البعوض والناموس',
    nameEn: 'Mosquito',
    scientificName: 'Culicidae',
    category: 'طائرات',
    categoryKey: 'طائرات',
    riskLevel: 'مرتفع',
    riskColor: 'text-red-600 bg-red-50 border-red-200',
    image: PEST_IMAGES.mosquito,
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
      'استخدام زيوت طاردة طبيعية في الجلسات الخارجية.',
    ],
    mistakesToAvoid: [
      'ترك صواني تصريف المكيفات ممتلئة بالماء الراكد، حيث تعد الحاضنة الأولى لتكاثر يرقات البعوض.',
    ],
    recommendedServiceSlug: 'residential-pest-control',
    recommendedServiceName: 'مكافحة حشرات المنازل والفلل',
  },
  {
    id: 'wasp-hornet',
    nameAr: 'الدبابير والنحل البري',
    nameEn: 'Wasps & Hornets',
    scientificName: 'Vespidae',
    category: 'طائرات',
    categoryKey: 'طائرات',
    riskLevel: 'عاجل جداً',
    riskColor: 'text-red-700 bg-red-50 border-red-200',
    image: PEST_IMAGES.waspHornet,
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
      'محاولة ضرب العش بالعصا أو إحراقه، حيث يؤدي ذلك إلى هجوم جماعي عنيف للدبابير.',
    ],
    recommendedServiceSlug: 'residential-pest-control',
    recommendedServiceName: 'مكافحة حشرات المنازل والفلل',
  },
  {
    id: 'pantry-beetle',
    nameAr: 'سوس الحبوب وخنافس المؤن',
    nameEn: 'Pantry Weevils & Beetles',
    scientificName: 'Sitophilus oryzae',
    category: 'زواحف',
    categoryKey: 'زواحف',
    riskLevel: 'منخفض',
    riskColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    image: PEST_IMAGES.pantryBeetle,
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
      'حفظ الحبوب الجديدة في أوعية محكمة الإغلاق تماماً.',
    ],
    mistakesToAvoid: [
      'تخزين المؤن في أكياس ورقية أو بلاستيكية رقيقة يسهل للحشرات ثقبها واختراقها.',
    ],
    recommendedServiceSlug: 'commercial-pest-control',
    recommendedServiceName: 'مكافحة آفات الشركات والمنشآت',
  },
];

export const PEST_DATABASE_EN: PestInfo[] = [
  {
    id: 'cockroach-german',
    nameAr: 'German Cockroach',
    nameEn: 'German Cockroach',
    scientificName: 'Blattella germanica',
    category: 'Crawling Insects',
    categoryKey: 'زواحف',
    riskLevel: 'High Risk',
    riskColor: 'text-amber-600 bg-amber-50 border-amber-200',
    image: PEST_IMAGES.cockroachGerman,
    shortDesc: 'Small light-brown insect active at night that reproduces rapidly inside kitchen crevices and behind electrical appliances.',
    locations: ['kitchen', 'bathroom', 'storage'],
    sizes: ['small', 'medium'],
    colors: ['red_brown', 'black_brown'],
    behaviors: ['crawls_fast', 'night_nocturnal'],
    damageSigns: ['spots_smell', 'food_waste'],
    matchedTraits: ['Found inside kitchens, cabinets, and oven corners', 'Scatters rapidly when lights are turned on', 'Leaves tiny dark pepper-like droppings'],
    diyAdvice: [
      'Empty trash daily and wipe grease or crumbs off cooking surfaces immediately.',
      'Fix any water leaks under sinks to eliminate moisture sources.',
      'Store grains and dry foods in airtight glass or heavy plastic containers.',
    ],
    mistakesToAvoid: [
      'Avoid spraying over-the-counter aerosol cans as they scatter the colony into other rooms.',
      'Avoid leaving pet food bowls out overnight.',
    ],
    recommendedServiceSlug: 'cockroach-ant-control',
    recommendedServiceName: 'Cockroach & Ant Eradication',
  },
  {
    id: 'bed-bug',
    nameAr: 'Bed Bug',
    nameEn: 'Bed Bug',
    scientificName: 'Cimex lectularius',
    category: 'Bed & Upholstery',
    categoryKey: 'أثاث وفراش',
    riskLevel: 'Critical / Urgent',
    riskColor: 'text-red-600 bg-red-50 border-red-200',
    image: PEST_IMAGES.bedBug,
    shortDesc: 'Tiny reddish-brown insect that hides in mattress seams and furniture joints, feeding on human blood at night.',
    locations: ['bedroom', 'storage'],
    sizes: ['tiny', 'small'],
    colors: ['red_brown', 'black_brown'],
    behaviors: ['hides_fabrics', 'night_nocturnal'],
    damageSigns: ['bites', 'spots_smell'],
    matchedTraits: ['Rows of itchy skin bites appearing upon waking', 'Tiny blood smears or dark spots on bedsheets', 'Hiding inside mattress piping and bed frames'],
    diyAdvice: [
      'Wash all bedsheets and linens in hot water (above 60°C) and dry on high heat.',
      'Vacuum mattress seams and crevices thoroughly and dispose of the vacuum bag outside immediately.',
      'Use certified bed-bug-proof mattress encasements.',
    ],
    mistakesToAvoid: [
      'Do not move infested mattresses or pillows into other rooms to avoid spreading the infestation.',
      'Cheap household sprays do not penetrate bed bug eggs and increase resistance.',
    ],
    recommendedServiceSlug: 'bed-bug-treatment',
    recommendedServiceName: 'Bed Bug Treatment & Eradication',
  },
  {
    id: 'termite',
    nameAr: 'Subterranean Termite',
    nameEn: 'Subterranean Termite',
    scientificName: 'Reticulitermes',
    category: 'Wood & Structure',
    categoryKey: 'هياكل وخشب',
    riskLevel: 'Critical / Urgent',
    riskColor: 'text-rose-700 bg-rose-50 border-rose-200',
    image: PEST_IMAGES.termite,
    shortDesc: 'Pale cream or white insect that silently consumes wooden doors, furniture, and parquet while building mud tubes on walls.',
    locations: ['wood', 'storage', 'garden'],
    sizes: ['tiny', 'small'],
    colors: ['white_beige'],
    behaviors: ['marches', 'night_nocturnal'],
    damageSigns: ['mud_wood'],
    matchedTraits: ['Pencil-thin earthen mud tubes on walls or door frames', 'Hollow sound when tapping wooden frames or parquet', 'Fine wood powder accumulating near thresholds'],
    diyAdvice: [
      'Inspect door frames and parquet boards to assess the extent of hollow wood.',
      'Keep damp cardboard or scrap wood away from direct contact with walls.',
      'Do not scrape off mud tubes before inspection so the technician can trace the active pathway.',
    ],
    mistakesToAvoid: [
      'Never pour diesel or kerosene as it damages concrete and fails to reach the underground colony.',
      'Avoid replacing wooden doors before treating the soil and foundation first.',
    ],
    recommendedServiceSlug: 'termite-control',
    recommendedServiceName: 'Subterranean Termite Control',
  },
  {
    id: 'mouse-rodent',
    nameAr: 'House Mouse & Rats',
    nameEn: 'House Mouse & Rats',
    scientificName: 'Mus musculus / Rattus',
    category: 'Rodents',
    categoryKey: 'قوارض',
    riskLevel: 'Critical / Urgent',
    riskColor: 'text-orange-700 bg-orange-50 border-orange-200',
    image: PEST_IMAGES.mouseRodent,
    shortDesc: 'Fast-moving gray or brown rodents that leave dark pellet droppings and chew electrical wires and food packaging.',
    locations: ['kitchen', 'storage', 'bathroom', 'garden'],
    sizes: ['large'],
    colors: ['gray_fur', 'black_brown'],
    behaviors: ['crawls_fast', 'night_nocturnal'],
    damageSigns: ['chewed_wires', 'food_waste', 'spots_smell'],
    matchedTraits: ['Scratching or gnawing sounds inside walls or false ceilings', 'Dark rice-sized cylindrical droppings', 'Gnawed food bags or damaged electrical cables'],
    diyAdvice: [
      'Seal wall openings and AC pipe gaps with heavy-duty metal mesh.',
      'Keep all food supplies in elevated cabinets and gnaw-proof containers.',
      'Sanitize areas where droppings were spotted using medical disinfectants.',
    ],
    mistakesToAvoid: [
      'Never place loose, unsecured poison where children or pets can reach it.',
      'Do not leave exterior entry holes unsealed after trapping.',
    ],
    recommendedServiceSlug: 'rodent-control',
    recommendedServiceName: 'Rodent, Mouse & Rat Control',
  },
  {
    id: 'black-ant',
    nameAr: 'Black House Ant & Sugar Ant',
    nameEn: 'Black House Ant',
    scientificName: 'Ochetellus glaber',
    category: 'Crawling Insects',
    categoryKey: 'زواحف',
    riskLevel: 'Moderate Risk',
    riskColor: 'text-amber-600 bg-amber-50 border-amber-200',
    image: PEST_IMAGES.blackAnt,
    shortDesc: 'Small ants marching in organized trails seeking sweets and food crumbs near moisture sources and kitchens.',
    locations: ['kitchen', 'bathroom', 'garden'],
    sizes: ['tiny', 'small'],
    colors: ['black_brown'],
    behaviors: ['marches'],
    damageSigns: ['food_waste', 'none'],
    matchedTraits: ['Marching in organized lines toward sugar bowls or trash bins', 'Sudden large gatherings around sweet crumbs or spills'],
    diyAdvice: [
      'Wipe ant trails with a water and vinegar solution to erase pheromone trails.',
      'Seal tiny gaps between baseboards and ceramic tiles with silicone.',
      'Keep honey and sweets in tightly sealed containers.',
    ],
    mistakesToAvoid: [
      'Spraying aerosol insecticide on visible trails only kills surface worker ants while leaving the queen laying eggs inside the wall.',
    ],
    recommendedServiceSlug: 'cockroach-ant-control',
    recommendedServiceName: 'Cockroach & Ant Eradication',
  },
  {
    id: 'mosquito',
    nameAr: 'Mosquitoes',
    nameEn: 'Mosquito',
    scientificName: 'Culicidae',
    category: 'Flying Insects',
    categoryKey: 'طائرات',
    riskLevel: 'High Risk',
    riskColor: 'text-red-600 bg-red-50 border-red-200',
    image: PEST_IMAGES.mosquito,
    shortDesc: 'Nocturnal flying insects that feed on blood and breed in standing water and garden foliage.',
    locations: ['garden', 'bedroom'],
    sizes: ['small'],
    colors: ['black_brown', 'yellow_striped'],
    behaviors: ['flies', 'night_nocturnal'],
    damageSigns: ['bites'],
    matchedTraits: ['High-pitched buzzing around ears at night', 'Swollen, itchy red bites on arms and legs', 'High density near plant pots and standing water'],
    diyAdvice: [
      'Empty any plant saucers or containers holding standing water in gardens and balconies.',
      'Install fine mesh screens on all windows and ventilation shafts.',
      'Trim dense garden shrubs where adult mosquitoes rest during the day.',
    ],
    mistakesToAvoid: [
      'Leaving AC drainage trays full of stagnant water, which serves as the primary breeding ground for larvae.',
    ],
    recommendedServiceSlug: 'residential-pest-control',
    recommendedServiceName: 'Residential & Villa Pest Control',
  },
  {
    id: 'wasp-hornet',
    nameAr: 'Wasps & Hornets',
    nameEn: 'Wasps & Hornets',
    scientificName: 'Vespidae',
    category: 'Flying Insects',
    categoryKey: 'طائرات',
    riskLevel: 'Critical / Urgent',
    riskColor: 'text-red-700 bg-red-50 border-red-200',
    image: PEST_IMAGES.waspHornet,
    shortDesc: 'Yellow-and-black flying insects that build mud or papery nests under roofs and canopies and sting aggressively when approached.',
    locations: ['garden', 'storage'],
    sizes: ['medium', 'large'],
    colors: ['yellow_striped', 'black_brown'],
    behaviors: ['flies'],
    damageSigns: ['bites', 'none'],
    matchedTraits: ['Oval papery or mud nests under eaves, pergolas, or roofs', 'Fast flight activity near exterior windows', 'Painful stings that can trigger severe allergic reactions'],
    diyAdvice: [
      'Keep a safe distance from the nest and keep children and pets indoors.',
      'Close windows and balcony doors near the flight path.',
      'Never shine direct lights or throw water at the nest.',
    ],
    mistakesToAvoid: [
      'Never attempt to knock down or burn a wasp nest yourself, as this provokes a dangerous swarm attack.',
    ],
    recommendedServiceSlug: 'residential-pest-control',
    recommendedServiceName: 'Residential & Villa Pest Control',
  },
  {
    id: 'pantry-beetle',
    nameAr: 'Pantry Weevils & Grain Beetles',
    nameEn: 'Pantry Weevils & Beetles',
    scientificName: 'Sitophilus oryzae',
    category: 'Crawling Insects',
    categoryKey: 'زواحف',
    riskLevel: 'Low Risk',
    riskColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    image: PEST_IMAGES.pantryBeetle,
    shortDesc: 'Tiny dark-brown beetles appearing inside stored bags of rice, flour, spices, and dry grains.',
    locations: ['kitchen', 'storage'],
    sizes: ['tiny', 'small'],
    colors: ['black_brown', 'red_brown'],
    behaviors: ['crawls_fast'],
    damageSigns: ['food_waste'],
    matchedTraits: ['Tiny beetles inside grain containers or opened flour bags', 'Fine webbing or powdery residue on pantry shelves'],
    diyAdvice: [
      'Dispose of infested food bags immediately in an outdoor trash bin.',
      'Empty pantry shelves and wipe them down with warm water and white vinegar.',
      'Store dry grains in sealed glass or heavy-duty plastic containers.',
    ],
    mistakesToAvoid: [
      'Storing grains in thin paper or plastic bags that pantry beetles can easily chew through.',
    ],
    recommendedServiceSlug: 'commercial-pest-control',
    recommendedServiceName: 'Commercial & Corporate Pest Control',
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
        icon: 'Boxes',
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
        icon: 'Dot',
      },
      {
        value: 'small',
        label: 'صغيرة (3 - 10 ملم)',
        desc: 'مثل الصرصور الألماني الصغير، البعوض، والنمل الأسود',
        icon: 'Minus',
      },
      {
        value: 'medium',
        label: 'متوسطة (1 - 3 سم)',
        desc: 'مثل الدبابير، خنافس الأثاث، والصرصور الشرقي',
        icon: 'Maximize2',
      },
      {
        value: 'large',
        label: 'كبيرة (أكبر من 3 سم)',
        desc: 'مثل الفئران، الجرذان، الصرصور الأمريكي الكبير',
        icon: 'Maximize',
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
        icon: 'Palette',
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
        icon: 'Zap',
      },
      {
        value: 'hides_fabrics',
        label: 'تختبئ في ثنايا القماش والسرير وتنزل ليلاً',
        desc: 'سلوك حشرة بق الفراش أثناء النوم',
        icon: 'Moon',
      },
      {
        value: 'marches',
        label: 'تسير في خطوط وطوابير منتظمة ثابتة',
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
        icon: 'AlertTriangle',
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
        icon: 'Layers',
      },
      {
        value: 'food_waste',
        label: 'تلف الأطعمة، أكياس مثقوبة أو بقايا فتات',
        desc: 'نشاط سوس المؤن، الصراصير ونمل السكر',
        icon: 'UtensilsCrossed',
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

export const QUIZ_QUESTIONS_EN: QuizQuestion[] = [
  {
    id: 'location',
    title: 'Where did you first spot the pest or signs of its activity?',
    subtitle: 'The location helps us narrow down the pest’s preferred habitat',
    options: [
      {
        value: 'kitchen',
        label: 'In the Kitchen, Food Cabinets & Near Ovens',
        desc: 'Near food sources, moisture, and under sinks',
        icon: 'UtensilsCrossed',
      },
      {
        value: 'bedroom',
        label: 'In the Bedroom, Mattresses & Curtains',
        desc: 'Around the bed frame, fabric seams, and behind wall frames',
        icon: 'Bed',
      },
      {
        value: 'wood',
        label: 'In Door Frames, Parquet Flooring or Woodwork',
        desc: 'Near walls and foundations with fine wood powder',
        icon: 'Trees',
      },
      {
        value: 'bathroom',
        label: 'In Bathrooms, Drains & Ventilation Shafts',
        desc: 'In high-humidity areas and plumbing conduits',
        icon: 'Droplets',
      },
      {
        value: 'garden',
        label: 'In the Garden, Outdoor Patio or Under Canopies',
        desc: 'Among trees, plant beds, and roof pergolas',
        icon: 'Flower2',
      },
      {
        value: 'storage',
        label: 'In the Warehouse, Basement, Storage or False Ceiling',
        desc: 'Among cardboard boxes, appliances, and ceiling voids',
        icon: 'Boxes',
      },
    ],
  },
  {
    id: 'size',
    title: 'What is the approximate size of the observed pest?',
    subtitle: 'A key indicator to identify the life stage and exact species',
    options: [
      {
        value: 'tiny',
        label: 'Very Tiny (Smaller than 3 mm)',
        desc: 'Such as bed bugs, pantry weevils, and sugar ants',
        icon: 'Dot',
      },
      {
        value: 'small',
        label: 'Small (3 – 10 mm)',
        desc: 'Such as German cockroaches, mosquitoes, and black ants',
        icon: 'Minus',
      },
      {
        value: 'medium',
        label: 'Medium (1 – 3 cm)',
        desc: 'Such as wasps, beetles, and Oriental cockroaches',
        icon: 'Maximize2',
      },
      {
        value: 'large',
        label: 'Large (Larger than 3 cm)',
        desc: 'Such as mice, rats, and large American cockroaches',
        icon: 'Maximize',
      },
    ],
  },
  {
    id: 'color',
    title: 'What is the dominant color of the insect or pest?',
    subtitle: 'Body color helps rule out unrelated species',
    options: [
      {
        value: 'black_brown',
        label: 'Black or Dark Brown',
        desc: 'Common in cockroaches, black ants, and rats',
        icon: 'Palette',
      },
      {
        value: 'red_brown',
        label: 'Reddish-Brown or Coppery Tan',
        desc: 'Characteristic of bed bugs and German cockroaches',
        icon: 'Flame',
      },
      {
        value: 'white_beige',
        label: 'Pale White or Creamy Beige',
        desc: 'Typical of subterranean termites and wood borers',
        icon: 'Sparkles',
      },
      {
        value: 'yellow_striped',
        label: 'Yellow with Black Stripes',
        desc: 'Typical of wasps, hornets, and certain flying insects',
        icon: 'Zap',
      },
      {
        value: 'gray_fur',
        label: 'Gray or Furry Coat',
        desc: 'Typical of house mice and rodents',
        icon: 'Eye',
      },
    ],
  },
  {
    id: 'behavior',
    title: 'How would you describe the pest’s movement and behavior?',
    subtitle: 'Movement pattern and daily activity directly reveal its species',
    options: [
      {
        value: 'crawls_fast',
        label: 'Crawls Rapidly & Scatters When Lights Turn On',
        desc: 'Typical behavior of cockroaches and mice when exposed',
        icon: 'Zap',
      },
      {
        value: 'hides_fabrics',
        label: 'Hides in Fabric Seams & Emerges at Night',
        desc: 'Typical behavior of bed bugs during sleep hours',
        icon: 'Moon',
      },
      {
        value: 'marches',
        label: 'Marches in Steady, Organized Trails',
        desc: 'Typical colony behavior of black ants and termites',
        icon: 'GitCommit',
      },
      {
        value: 'flies',
        label: 'Flies in the Air & Hovers Around Lights or Eaves',
        desc: 'Typical behavior of mosquitoes, flies, and wasps',
        icon: 'Wind',
      },
    ],
  },
  {
    id: 'damage',
    title: 'What signs or damages have you noticed?',
    subtitle: 'The most accurate diagnostic clue for technical assessment',
    options: [
      {
        value: 'bites',
        label: 'Itchy Skin Bites Right After Waking Up',
        desc: 'Strong indicator of bed bugs or mosquitoes',
        icon: 'AlertTriangle',
      },
      {
        value: 'spots_smell',
        label: 'Tiny Dark Specks or Musty Oily Odor',
        desc: 'Cockroach or bed bug droppings on surfaces',
        icon: 'AlertCircle',
      },
      {
        value: 'mud_wood',
        label: 'Mud Tubes or Hollowed / Damaged Wood',
        desc: 'Clear sign of subterranean termite activity',
        icon: 'Layers',
      },
      {
        value: 'food_waste',
        label: 'Contaminated Food, Punctured Bags or Crumbs',
        desc: 'Activity of pantry weevils, cockroaches, or ants',
        icon: 'UtensilsCrossed',
      },
      {
        value: 'chewed_wires',
        label: 'Gnawed Electrical Wires, Wood & Pellet Droppings',
        desc: 'Definitive sign of mice or rats',
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
  reasons: string[];
}

export function diagnosePest(answers: QuizAnswers, locale: 'ar' | 'en' = 'ar'): MatchResult[] {
  const isEn = locale === 'en';
  const db = isEn ? PEST_DATABASE_EN : PEST_DATABASE;

  const results = db.map((pest) => {
    let score = 0;
    const reasons: string[] = [];

    if (answers.location && pest.locations.includes(answers.location)) {
      score += 25;
      reasons.push(
        isEn
          ? 'Presence in this location matches the pest’s preferred natural habitat'
          : 'تواجد الحشرة في هذه المنطقة يطابق بيئتها الطبيعية المفضلة'
      );
    }

    if (answers.size && pest.sizes.includes(answers.size as any)) {
      score += 20;
      reasons.push(
        isEn
          ? 'Observed body size accurately matches this species'
          : 'الحجم الملحوظ ينطبق على هذه الفصيلة بشكل دقيق'
      );
    }

    if (answers.color && pest.colors.includes(answers.color as any)) {
      score += 20;
      reasons.push(
        isEn
          ? 'Visible color matches the morphological traits of this pest'
          : 'اللون الظاهري يطابق الخصائص الشكلية للآفة'
      );
    }

    if (answers.behavior && pest.behaviors.includes(answers.behavior as any)) {
      score += 20;
      reasons.push(
        isEn
          ? 'Movement pattern and nocturnal activity match its known behavior'
          : 'نمط الحركة والنشاط الليلي يطابق سلوكها المعروف'
      );
    }

    if (answers.damage) {
      if (answers.damage === 'none') {
        score += 10;
      } else if (pest.damageSigns.includes(answers.damage as any)) {
        score += 15;
        reasons.push(
          isEn
            ? 'Recorded damages and traces are primary diagnostic indicators'
            : 'الأضرار والآثار المسجلة هي علامات تشخيصية بارزة'
        );
      }
    }

    const finalScore = Math.min(100, Math.max(30, score));

    const reasonsList =
      reasons.length > 0
        ? reasons
        : [
            isEn
              ? 'Partial match in general behavioral characteristics'
              : 'تطابق جزئي في السمات السلوكية العامة',
          ];

    return {
      pest,
      score: finalScore,
      matchingReasons: reasonsList,
      reasons: reasonsList,
    };
  });

  return results.sort((a, b) => b.score - a.score);
}

export const matchPests = diagnosePest;

export function getPestDataByLocale(locale: 'ar' | 'en') {
  const isEn = locale === 'en';
  const db = isEn ? PEST_DATABASE_EN : PEST_DATABASE;
  const questions = isEn ? QUIZ_QUESTIONS_EN : QUIZ_QUESTIONS;
  return {
    pestDatabase: db,
    database: db,
    quizQuestions: questions,
    questions: questions,
  };
}
