export type Language = 'en' | 'pt' | 'es';

export type TranslationKey = 
  | 'title'
  | 'subtitle'
  | 'hero_title'
  | 'startInvesting'
  | 'applyFunding'
  | 'apply_funding'
  | 'connectWallet'
  | 'platform_badge'
  | 'security_first'
  | 'trending_now'
  | 'join_revolution'
  | 'safetyBuiltTitle'
  | 'featuredTitle'
  | 'readyTitle'
  | 'readySubtitle'
  | 'viewInvestments'
  | 'learnMore'
  | 'opportunities'
  | 'safety'
  | 'dashboard'
  | 'smart_contract_escrow'
  | 'milestone_based_release'
  | 'community_verification'
  | 'performance_tracking'
  | 'smart_contract_description'
  | 'milestone_description'
  | 'community_description'
  | 'performance_description'
  | 'alex_description'
  | 'maria_description'
  | 'david_description'
  | 'milestone_mvp'
  | 'milestone_series_a'
  | 'milestone_revenue'
  | 'milestone_course'
  | 'milestone_partnerships'
  | 'milestone_launch'
  | 'milestone_retail'
  | 'milestone_ipo'
  | 'total_invested'
  | 'active_investors'
  | 'success_rate'
  | 'avg_return'
  | 'progress'
  | 'backers'
  | 'rating'
  | 'expected_return'
  | 'timeframe'
  | 'next_milestones'
  | 'invest_now'
  | 'view_all_opportunities'
  | 'safety_description'
  | 'featured_description'
  | 'footer_description'
  | 'platform'
  | 'browse_opportunities'
  | 'support'
  | 'help_center'
  | 'contact_us'
  | 'privacy_policy'
  | 'all_rights_reserved';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    title: 'AtriaFi',
    subtitle: 'Where talent meets capital in perfect harmony. Connect with visionaries and support breakthrough ideas through our circular investment ecosystem.',
    hero_title: 'Where Vision Meets Value',
    startInvesting: 'Start Investing',
    applyFunding: 'Apply for Funding',
    apply_funding: 'Apply for Funding',
    connectWallet: 'Connect Wallet',
    platform_badge: 'Revolutionary Investment Platform',
    security_first: 'Security First',
    trending_now: 'Trending Now',
    join_revolution: 'Join the Revolution',
    safetyBuiltTitle: 'Safety Built Into Every Investment',
    featuredTitle: 'Featured Investment Opportunities',
    readyTitle: 'Ready to Start Your Investment Journey?',
    readySubtitle: 'Join thousands of investors who are already backing the next generation of innovators.',
    viewInvestments: 'View Investments',
    learnMore: 'Learn More',
    opportunities: 'Opportunities',
    safety: 'Safety',
    dashboard: 'Dashboard',
    smart_contract_escrow: 'Smart Contract Escrow',
    milestone_based_release: 'Milestone-Based Release',
    community_verification: 'Community Verification',
    performance_tracking: 'Performance Tracking',
    smart_contract_description: 'Funds are held securely in smart contracts until milestones are achieved',
    milestone_description: 'Money is released only when predetermined goals are reached',
    community_description: 'Every creator is verified by our community before being listed',
    performance_description: 'Track real-time progress and returns on all your investments',
    alex_description: 'Building the next generation of AI development tools with proven track record',
    maria_description: 'Educational tech content creator with 500K+ engaged followers',
    david_description: 'Sustainable fashion brand disrupting the traditional retail model',
    milestone_mvp: 'MVP Launch',
    milestone_series_a: 'Series A Funding',
    milestone_revenue: 'Revenue Targets',
    milestone_course: 'Course Launch',
    milestone_partnerships: 'Brand Partnerships',
    milestone_launch: 'Product Launch',
    milestone_retail: 'Retail Expansion',
    milestone_ipo: 'IPO Preparation',
    total_invested: 'Total Invested',
    active_investors: 'Active Investors',
    success_rate: 'Success Rate',
    avg_return: 'Avg. Return',
    progress: 'Progress',
    backers: 'Backers',
    rating: 'Rating',
    expected_return: 'Expected Return',
    timeframe: 'Timeframe',
    next_milestones: 'Next Milestones',
    invest_now: 'Invest Now',
    view_all_opportunities: 'View All Opportunities',
    safety_description: 'Our platform uses cutting-edge blockchain technology to ensure your investments are secure and transparent.',
    featured_description: 'Discover high-potential individuals and groundbreaking projects selected by our expert team.',
    footer_description: 'Empowering the future by connecting investors with extraordinary people and revolutionary ideas.',
    platform: 'Platform',
    browse_opportunities: 'Browse Opportunities',
    support: 'Support',
    help_center: 'Help Center',
    contact_us: 'Contact Us',
    privacy_policy: 'Privacy Policy',
    all_rights_reserved: 'All rights reserved'
  },
  pt: {
    title: 'AtriaFi',
    subtitle: 'Onde talento encontra capital em perfeita harmonia. Conecte-se com visionários e apoie ideias inovadoras através do nosso ecossistema de investimento circular.',
    hero_title: 'Onde Visão Encontra Valor',
    startInvesting: 'Começar a Investir',
    applyFunding: 'Solicitar Financiamento',
    apply_funding: 'Solicitar Financiamento',
    connectWallet: 'Conectar Carteira',
    platform_badge: 'Plataforma de Investimento Revolucionária',
    security_first: 'Segurança em Primeiro Lugar',
    trending_now: 'Em Alta Agora',
    join_revolution: 'Junte-se à Revolução',
    safetyBuiltTitle: 'Segurança Integrada em Cada Investimento',
    featuredTitle: 'Oportunidades de Investimento em Destaque',
    readyTitle: 'Pronto para Iniciar sua Jornada de Investimento?',
    readySubtitle: 'Junte-se a milhares de investidores que já estão apoiando a próxima geração de inovadores.',
    viewInvestments: 'Ver Investimentos',
    learnMore: 'Saiba Mais',
    opportunities: 'Oportunidades',
    safety: 'Segurança',
    dashboard: 'Painel',
    smart_contract_escrow: 'Garantia por Contrato Inteligente',
    milestone_based_release: 'Liberação por Marcos',
    community_verification: 'Verificação da Comunidade',
    performance_tracking: 'Acompanhamento de Performance',
    smart_contract_description: 'Fundos são mantidos seguros em contratos inteligentes até que marcos sejam alcançados',
    milestone_description: 'Dinheiro é liberado apenas quando objetivos predeterminados são atingidos',
    community_description: 'Cada criador é verificado pela nossa comunidade antes de ser listado',
    performance_description: 'Acompanhe progresso e retornos em tempo real de todos os seus investimentos',
    alex_description: 'Construindo a próxima geração de ferramentas de desenvolvimento de IA com histórico comprovado',
    maria_description: 'Criadora de conteúdo educacional tech com mais de 500K seguidores engajados',
    david_description: 'Marca de moda sustentável revolucionando o modelo de varejo tradicional',
    milestone_mvp: 'Lançamento MVP',
    milestone_series_a: 'Financiamento Série A',
    milestone_revenue: 'Metas de Receita',
    milestone_course: 'Lançamento do Curso',
    milestone_partnerships: 'Parcerias de Marca',
    milestone_launch: 'Lançamento do Produto',
    milestone_retail: 'Expansão Varejo',
    milestone_ipo: 'Preparação IPO',
    total_invested: 'Total Investido',
    active_investors: 'Investidores Ativos',
    success_rate: 'Taxa de Sucesso',
    avg_return: 'Retorno Médio',
    progress: 'Progresso',
    backers: 'Apoiadores',
    rating: 'Avaliação',
    expected_return: 'Retorno Esperado',
    timeframe: 'Prazo',
    next_milestones: 'Próximos Marcos',
    invest_now: 'Investir Agora',
    view_all_opportunities: 'Ver Todas as Oportunidades',
    safety_description: 'Nossa plataforma usa tecnologia blockchain de ponta para garantir que seus investimentos sejam seguros e transparentes.',
    featured_description: 'Descubra indivíduos de alto potencial e projetos inovadores selecionados por nossa equipe especializada.',
    footer_description: 'Capacitando o futuro conectando investidores com pessoas extraordinárias e ideias revolucionárias.',
    platform: 'Plataforma',
    browse_opportunities: 'Explorar Oportunidades',
    support: 'Suporte',
    help_center: 'Central de Ajuda',
    contact_us: 'Fale Conosco',
    privacy_policy: 'Política de Privacidade',
    all_rights_reserved: 'Todos os direitos reservados'
  },
  es: {
    title: 'AtriaFi',
    subtitle: 'Donde el talento encuentra capital en perfecta armonía. Conéctate con visionarios y respalda ideas innovadoras a través de nuestro ecosistema de inversión circular.',
    hero_title: 'Donde Visión Encuentra Valor',
    startInvesting: 'Comenzar a Invertir',
    applyFunding: 'Solicitar Financiamiento',
    apply_funding: 'Solicitar Financiamiento',
    connectWallet: 'Conectar Billetera',
    platform_badge: 'Plataforma de Inversión Revolucionaria',
    security_first: 'Seguridad Primero',
    trending_now: 'Tendencia Ahora',
    join_revolution: 'Únete a la Revolución',
    safetyBuiltTitle: 'Seguridad Integrada en Cada Inversión',
    featuredTitle: 'Oportunidades de Inversión Destacadas',
    readyTitle: '¿Listo para Comenzar tu Viaje de Inversión?',
    readySubtitle: 'Únete a miles de inversores que ya están respaldando la próxima generación de innovadores.',
    viewInvestments: 'Ver Inversiones',
    learnMore: 'Saber Más',
    opportunities: 'Oportunidades',
    safety: 'Seguridad',
    dashboard: 'Panel',
    smart_contract_escrow: 'Depósito en Garantía por Contrato Inteligente',
    milestone_based_release: 'Liberación Basada en Hitos',
    community_verification: 'Verificación de la Comunidad',
    performance_tracking: 'Seguimiento de Rendimiento',
    smart_contract_description: 'Los fondos se mantienen seguros en contratos inteligentes hasta que se alcancen los hitos',
    milestone_description: 'El dinero se libera solo cuando se alcanzan objetivos predeterminados',
    community_description: 'Cada creador es verificado por nuestra comunidad antes de ser listado',
    performance_description: 'Rastrea el progreso y retornos en tiempo real de todas tus inversiones',
    alex_description: 'Construyendo la próxima generación de herramientas de desarrollo de IA con historial comprobado',
    maria_description: 'Creadora de contenido educativo tech con más de 500K seguidores comprometidos',
    david_description: 'Marca de moda sostenible revolucionando el modelo de venta tradicional',
    milestone_mvp: 'Lanzamiento MVP',
    milestone_series_a: 'Financiamiento Serie A',
    milestone_revenue: 'Objetivos de Ingresos',
    milestone_course: 'Lanzamiento del Curso',
    milestone_partnerships: 'Asociaciones de Marca',
    milestone_launch: 'Lanzamiento del Producto',
    milestone_retail: 'Expansión Minorista',
    milestone_ipo: 'Preparación OPI',
    total_invested: 'Total Invertido',
    active_investors: 'Inversores Activos',
    success_rate: 'Tasa de Éxito',
    avg_return: 'Retorno Prom.',
    progress: 'Progreso',
    backers: 'Patrocinadores',
    rating: 'Calificación',
    expected_return: 'Retorno Esperado',
    timeframe: 'Plazo',
    next_milestones: 'Próximos Hitos',
    invest_now: 'Invertir Ahora',
    view_all_opportunities: 'Ver Todas las Oportunidades',
    safety_description: 'Nuestra plataforma usa tecnología blockchain de vanguardia para asegurar que tus inversiones sean seguras y transparentes.',
    featured_description: 'Descubre individuos de alto potencial y proyectos innovadores seleccionados por nuestro equipo experto.',
    footer_description: 'Empoderando el futuro conectando inversores con personas extraordinarias e ideas revolucionarias.',
    platform: 'Plataforma',
    browse_opportunities: 'Explorar Oportunidades',
    support: 'Soporte',
    help_center: 'Centro de Ayuda',
    contact_us: 'Contáctanos',
    privacy_policy: 'Política de Privacidad',
    all_rights_reserved: 'Todos los derechos reservados'
  }
};
