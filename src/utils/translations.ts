
export type Language = 'en' | 'pt' | 'es';

export type TranslationKey = 
  // Header and Navigation
  | 'title' | 'connectWallet' | 'connected' | 'opportunities' | 'safety' | 'dashboard'
  // Hero Section
  | 'subtitle' | 'startInvesting' | 'applyFunding' | 'platform_badge' | 'hero_title'
  | 'security_first' | 'trending_now' | 'join_revolution'
  // Stats and Features
  | 'total_invested' | 'active_investors' | 'success_rate' | 'avg_return'
  | 'smart_contract_escrow' | 'smart_contract_description'
  | 'milestone_based_release' | 'milestone_description'
  | 'community_verification' | 'community_description'
  | 'performance_tracking' | 'performance_description'
  // Investment Cards
  | 'alex_description' | 'maria_description' | 'david_description'
  | 'milestone_mvp' | 'milestone_series_a' | 'milestone_revenue'
  | 'milestone_course' | 'milestone_partnerships' | 'milestone_launch'
  | 'milestone_retail' | 'milestone_ipo'
  | 'progress' | 'backers' | 'rating' | 'expected_return' | 'timeframe'
  | 'next_milestones' | 'invest_now'
  // Sections
  | 'featuredTitle' | 'featured_description' | 'safetyBuiltTitle' | 'safety_description'
  | 'readyTitle' | 'readySubtitle' | 'viewInvestments' | 'view_all_opportunities'
  | 'learnMore'
  // Footer
  | 'footer_description' | 'platform' | 'browse_opportunities' | 'support'
  | 'help_center' | 'contact_us' | 'privacy_policy' | 'all_rights_reserved';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    // Header and Navigation
    title: 'PeopleFi',
    connectWallet: 'Connect Wallet',
    connected: 'Connected ✓',
    opportunities: 'Opportunities',
    safety: 'Safety',
    dashboard: 'Dashboard',
    
    // Hero Section
    subtitle: 'Invest in People\'s Potential. Support the next generation of innovators, creators, and entrepreneurs through blockchain-powered investment platform.',
    startInvesting: 'Start Investing',
    applyFunding: 'Apply for Funding',
    platform_badge: 'Next-Gen Investment Platform',
    hero_title: 'Invest in Human Potential',
    security_first: 'Security First',
    trending_now: 'Trending Now',
    join_revolution: 'Join the Revolution',
    
    // Stats and Features
    total_invested: 'Total Invested',
    active_investors: 'Active Investors',
    success_rate: 'Success Rate',
    avg_return: 'Avg. Return',
    smart_contract_escrow: 'Smart Contract Escrow',
    smart_contract_description: 'Funds locked in blockchain escrow until milestones are met',
    milestone_based_release: 'Milestone-Based Release',
    milestone_description: 'Money released only when predetermined goals are achieved',
    community_verification: 'Community Verification',
    community_description: 'Peer review and verification of progress by other investors',
    performance_tracking: 'Performance Tracking',
    performance_description: 'Real-time tracking of progress and transparent reporting',
    
    // Investment Cards
    alex_description: 'Building next-generation AI development tools with proven track record',
    maria_description: 'Educational tech content creator with 500K+ engaged followers',
    david_description: 'Sustainable fashion brand disrupting the fast fashion industry',
    milestone_mvp: 'Launch MVP Product',
    milestone_series_a: 'Raise Series A',
    milestone_revenue: 'Revenue Sharing Begins',
    milestone_course: 'Course Platform Launch',
    milestone_partnerships: 'Brand Partnerships',
    milestone_launch: 'Product Launch',
    milestone_retail: 'Retail Partnerships',
    milestone_ipo: 'IPO Consideration',
    progress: 'Progress',
    backers: 'Backers',
    rating: 'Rating',
    expected_return: 'Expected Return',
    timeframe: 'Timeframe',
    next_milestones: 'Next Milestones',
    invest_now: 'Invest Now',
    
    // Sections
    featuredTitle: 'Featured Investment Opportunities',
    featured_description: 'Hand-picked high-potential individuals and projects with verified track records',
    safetyBuiltTitle: 'Built for Safety and Transparency',
    safety_description: 'Our platform uses cutting-edge blockchain technology to ensure your investments are secure and transparent',
    readyTitle: 'Ready to Invest in the Future?',
    readySubtitle: 'Join thousands of investors supporting the next generation of innovators. Start with just $100 and diversify your portfolio with human potential.',
    viewInvestments: 'View Investments',
    view_all_opportunities: 'View All Opportunities',
    learnMore: 'Learn More',
    
    // Footer
    footer_description: 'The first blockchain-powered platform for investing in human potential and supporting the next generation of innovators.',
    platform: 'Platform',
    browse_opportunities: 'Browse Opportunities',
    support: 'Support',
    help_center: 'Help Center',
    contact_us: 'Contact Us',
    privacy_policy: 'Privacy Policy',
    all_rights_reserved: 'All rights reserved.'
  },
  
  pt: {
    // Header and Navigation
    title: 'PeopleFi',
    connectWallet: 'Conectar Carteira',
    connected: 'Conectado ✓',
    opportunities: 'Oportunidades',
    safety: 'Segurança',
    dashboard: 'Dashboard',
    
    // Hero Section
    subtitle: 'Invista no Potencial das Pessoas. Apoie a próxima geração de inovadores, criadores e empreendedores através de nossa plataforma de investimento blockchain.',
    startInvesting: 'Começar a Investir',
    applyFunding: 'Candidatar-se para Financiamento',
    platform_badge: 'Plataforma de Investimento Nova Geração',
    hero_title: 'Invista em Potencial Humano',
    security_first: 'Segurança em Primeiro Lugar',
    trending_now: 'Em Alta Agora',
    join_revolution: 'Junte-se à Revolução',
    
    // Stats and Features
    total_invested: 'Total Investido',
    active_investors: 'Investidores Ativos',
    success_rate: 'Taxa de Sucesso',
    avg_return: 'Retorno Médio',
    smart_contract_escrow: 'Custódia por Smart Contract',
    smart_contract_description: 'Fundos bloqueados em custódia blockchain até que marcos sejam atingidos',
    milestone_based_release: 'Liberação por Marcos',
    milestone_description: 'Dinheiro liberado apenas quando objetivos predeterminados são alcançados',
    community_verification: 'Verificação da Comunidade',
    community_description: 'Revisão por pares e verificação de progresso por outros investidores',
    performance_tracking: 'Rastreamento de Performance',
    performance_description: 'Acompanhamento em tempo real do progresso e relatórios transparentes',
    
    // Investment Cards
    alex_description: 'Construindo ferramentas de desenvolvimento de IA de próxima geração com histórico comprovado',
    maria_description: 'Criadora de conteúdo educacional tech com mais de 500K seguidores engajados',
    david_description: 'Marca de moda sustentável revolucionando a indústria de fast fashion',
    milestone_mvp: 'Lançar Produto MVP',
    milestone_series_a: 'Levantar Série A',
    milestone_revenue: 'Início do Compartilhamento de Receita',
    milestone_course: 'Lançamento da Plataforma de Cursos',
    milestone_partnerships: 'Parcerias com Marcas',
    milestone_launch: 'Lançamento do Produto',
    milestone_retail: 'Parcerias de Varejo',
    milestone_ipo: 'Consideração de IPO',
    progress: 'Progresso',
    backers: 'Apoiadores',
    rating: 'Avaliação',
    expected_return: 'Retorno Esperado',
    timeframe: 'Prazo',
    next_milestones: 'Próximos Marcos',
    invest_now: 'Investir Agora',
    
    // Sections
    featuredTitle: 'Oportunidades de Investimento em Destaque',
    featured_description: 'Indivíduos e projetos de alto potencial selecionados com históricos verificados',
    safetyBuiltTitle: 'Construído para Segurança e Transparência',
    safety_description: 'Nossa plataforma usa tecnologia blockchain de ponta para garantir que seus investimentos sejam seguros e transparentes',
    readyTitle: 'Pronto para Investir no Futuro?',
    readySubtitle: 'Junte-se a milhares de investidores apoiando a próxima geração de inovadores. Comece com apenas $100 e diversifique seu portfólio com potencial humano.',
    viewInvestments: 'Ver Investimentos',
    view_all_opportunities: 'Ver Todas as Oportunidades',
    learnMore: 'Saber Mais',
    
    // Footer
    footer_description: 'A primeira plataforma blockchain para investir em potencial humano e apoiar a próxima geração de inovadores.',
    platform: 'Plataforma',
    browse_opportunities: 'Explorar Oportunidades',
    support: 'Suporte',
    help_center: 'Central de Ajuda',
    contact_us: 'Fale Conosco',
    privacy_policy: 'Política de Privacidade',
    all_rights_reserved: 'Todos os direitos reservados.'
  },
  
  es: {
    // Header and Navigation
    title: 'PeopleFi',
    connectWallet: 'Conectar Billetera',
    connected: 'Conectado ✓',
    opportunities: 'Oportunidades',
    safety: 'Seguridad',
    dashboard: 'Dashboard',
    
    // Hero Section
    subtitle: 'Invierte en el Potencial de las Personas. Apoya a la próxima generación de innovadores, creadores y emprendedores a través de nuestra plataforma de inversión blockchain.',
    startInvesting: 'Comenzar a Invertir',
    applyFunding: 'Solicitar Financiamiento',
    platform_badge: 'Plataforma de Inversión Nueva Generación',
    hero_title: 'Invierte en Potencial Humano',
    security_first: 'Seguridad Primero',
    trending_now: 'Tendencia Ahora',
    join_revolution: 'Únete a la Revolución',
    
    // Stats and Features
    total_invested: 'Total Invertido',
    active_investors: 'Inversores Activos',
    success_rate: 'Tasa de Éxito',
    avg_return: 'Retorno Promedio',
    smart_contract_escrow: 'Custodia por Smart Contract',
    smart_contract_description: 'Fondos bloqueados en custodia blockchain hasta que se cumplan los hitos',
    milestone_based_release: 'Liberación por Hitos',
    milestone_description: 'Dinero liberado solo cuando se logran objetivos predeterminados',
    community_verification: 'Verificación de la Comunidad',
    community_description: 'Revisión por pares y verificación de progreso por otros inversores',
    performance_tracking: 'Seguimiento de Rendimiento',
    performance_description: 'Seguimiento en tiempo real del progreso y reportes transparentes',
    
    // Investment Cards
    alex_description: 'Construyendo herramientas de desarrollo de IA de próxima generación con historial comprobado',
    maria_description: 'Creadora de contenido educacional tech con más de 500K seguidores comprometidos',
    david_description: 'Marca de moda sostenible revolucionando la industria de fast fashion',
    milestone_mvp: 'Lanzar Producto MVP',
    milestone_series_a: 'Levantar Serie A',
    milestone_revenue: 'Inicio del Reparto de Ingresos',
    milestone_course: 'Lanzamiento de Plataforma de Cursos',
    milestone_partnerships: 'Asociaciones con Marcas',
    milestone_launch: 'Lanzamiento del Producto',
    milestone_retail: 'Asociaciones de Retail',
    milestone_ipo: 'Consideración de OPV',
    progress: 'Progreso',
    backers: 'Patrocinadores',
    rating: 'Calificación',
    expected_return: 'Retorno Esperado',
    timeframe: 'Plazo',
    next_milestones: 'Próximos Hitos',
    invest_now: 'Invertir Ahora',
    
    // Sections
    featuredTitle: 'Oportunidades de Inversión Destacadas',
    featured_description: 'Individuos y proyectos de alto potencial seleccionados con historiales verificados',
    safetyBuiltTitle: 'Construido para Seguridad y Transparencia',
    safety_description: 'Nuestra plataforma usa tecnología blockchain de vanguardia para asegurar que tus inversiones sean seguras y transparentes',
    readyTitle: '¿Listo para Invertir en el Futuro?',
    readySubtitle: 'Únete a miles de inversores apoyando la próxima generación de innovadores. Comienza con solo $100 y diversifica tu portafolio con potencial humano.',
    viewInvestments: 'Ver Inversiones',
    view_all_opportunities: 'Ver Todas las Oportunidades',
    learnMore: 'Saber Más',
    
    // Footer
    footer_description: 'La primera plataforma blockchain para invertir en potencial humano y apoyar la próxima generación de innovadores.',
    platform: 'Plataforma',
    browse_opportunities: 'Explorar Oportunidades',
    support: 'Soporte',
    help_center: 'Centro de Ayuda',
    contact_us: 'Contáctanos',
    privacy_policy: 'Política de Privacidad',
    all_rights_reserved: 'Todos los derechos reservados.'
  }
};
