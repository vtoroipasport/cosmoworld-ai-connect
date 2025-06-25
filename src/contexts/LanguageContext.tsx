import React, { createContext, useState, useContext, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'app.title': 'CosmoLife',
    'app.subtitle': 'All services in one app',
    
    // Services
    'services.title': 'Services',
    'services.messenger': 'Messenger',
    'services.messenger.desc': 'Chat and messaging',
    'services.payments': 'Cosmo Pay',
    'services.payments.desc': 'Payments',
    'services.housing': 'Housing Rental',
    'services.housing.desc': 'Find housing',
    'services.taxi': 'Taxi',
    'services.taxi.desc': 'Rides',
    'services.food': 'Food Delivery',
    'services.food.desc': 'Order food',
    'services.jobs': 'Jobs',
    'services.jobs.desc': 'Find work',
    'services.marketplace': 'Marketplace',
    'services.marketplace.desc': 'Shopping',
    'services.groups': 'Groups',
    'services.groups.desc': 'Communities',
    
    // Quick Actions
    'quick.actions': 'Quick Actions',
    'quick.send.message': 'Send Message',
    'quick.transfer': 'Transfer',
    'quick.payment': 'Quick payment',
    'quick.open.store': 'Open Store',
    
    // Voice
    'voice.prompt': 'Voice command',
    'voice.context': 'App control',
    
    // AI Assistant
    'ai.welcome': 'Hi! I\'m your AI assistant. How can I help?',
    'ai.placeholder': 'Ask something...',
    
    // Payments
    'payments.wallet.needed': 'Wallet needed',
    'payments.wallet.create': 'Create wallet in profile',
    'payments.success': 'Payment completed',
    'payments.transferred': 'Transferred',
    
    // Common
    'common.back': 'Back',
    'common.search': 'Search',
    'common.send': 'Send',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    
    // Messenger
    'messenger.title': 'CosmoMessenger',
    'messenger.search': 'Search chats...',
    'messenger.type': 'Type a message...',
    'messenger.online': 'online',
    'messenger.offline': 'was recently',
    'messenger.members': 'members',
    
    // Payments
    'payments.title': 'CosmoWallet',
    'payments.balance': 'Main balance',
    'payments.topup': 'Top up',
    'payments.send': 'Send',
    'payments.recipient': 'Recipient (email or phone)',
    'payments.amount': 'Amount in COSMO',
    
    // Housing
    'housing.title': 'CosmoHousing',
    'housing.search': 'Search location...',
    'housing.checkin': 'Check-in',
    'housing.checkout': 'Check-out',
    'housing.guests': 'Guests',
    'housing.book': 'Book now',
    'housing.night': 'per night',
    
    // Taxi
    'taxi.title': 'CosmoTaxi',
    'taxi.from': 'From',
    'taxi.to': 'To',
    'taxi.tariff': 'Choose tariff',
    'taxi.order': 'Order taxi',
    'taxi.economy': 'Economy',
    'taxi.comfort': 'Comfort',
    'taxi.business': 'Business',
    
    // Food
    'food.title': 'CosmoFood',
    'food.search': 'Search restaurants...',
    'food.delivery': 'Delivery',
    'food.pickup': 'Pickup',
    'food.cart': 'Cart',
    'food.order': 'Order',
    
    // Jobs
    'jobs.title': 'CosmoJob',
    'jobs.client': 'I need a service',
    'jobs.worker': 'I want to work',
    'jobs.search': 'Search services...',
    'jobs.accept': 'Accept order',
    'jobs.complete': 'Complete order',
    
    // Marketplace
    'marketplace.title': 'CosmoMarket',
    'marketplace.search': 'Search products...',
    'marketplace.category': 'All categories',
    'marketplace.buy': 'Buy now',
    'marketplace.cart': 'Add to cart',
    
    // Groups
    'groups.title': 'CosmoGroups',
    'groups.my': 'My groups',
    'groups.discover': 'Discover',
    'groups.create': 'Create group',
    'groups.join': 'Join'
  },
  ru: {
    // Header
    'app.title': 'CosmoLife',
    'app.subtitle': 'Все сервисы в одном приложении',
    
    // Services
    'services.title': 'Сервисы',
    'services.messenger': 'Мессенджер',
    'services.messenger.desc': 'Общение и чаты',
    'services.payments': 'Cosmo Pay',
    'services.payments.desc': 'Платежи',
    'services.housing': 'Аренда жилья',
    'services.housing.desc': 'Поиск жилья',
    'services.taxi': 'Такси',
    'services.taxi.desc': 'Поездки',
    'services.food': 'Доставка еды',
    'services.food.desc': 'Заказ еды',
    'services.jobs': 'Работа',
    'services.jobs.desc': 'Поиск работы',
    'services.marketplace': 'Маркетплейс',
    'services.marketplace.desc': 'Покупки',
    'services.groups': 'Группы',
    'services.groups.desc': 'Сообщества',
    
    // Quick Actions
    'quick.actions': 'Быстрые действия',
    'quick.send.message': 'Написать сообщение',
    'quick.transfer': 'Перевести',
    'quick.payment': 'Быстрый платеж',
    'quick.open.store': 'Открыть магазин',
    
    // Voice
    'voice.prompt': 'Голосовая команда',
    'voice.context': 'Управление приложением',
    
    // AI Assistant
    'ai.welcome': 'Привет! Я ваш AI-помощник. Чем могу помочь?',
    'ai.placeholder': 'Спросите что-нибудь...',
    
    // Payments
    'payments.wallet.needed': 'Нужен кошелек',
    'payments.wallet.create': 'Создайте кошелек в профиле',
    'payments.success': 'Платеж выполнен',
    'payments.transferred': 'Переведено',
    
    // Common
    'common.back': 'Назад',
    'common.search': 'Поиск',
    'common.send': 'Отправить',
    'common.cancel': 'Отмена',
    'common.confirm': 'Подтвердить',
    'common.loading': 'Загрузка...',
    'common.error': 'Ошибка',
    'common.success': 'Успех',
    
    // Messenger
    'messenger.title': 'CosmoMessenger',
    'messenger.search': 'Поиск чатов...',
    'messenger.type': 'Написать сообщение...',
    'messenger.online': 'в сети',
    'messenger.offline': 'был(а) недавно',
    'messenger.members': 'участников',
    
    // Payments
    'payments.title': 'CosmoWallet',
    'payments.balance': 'Основной баланс',
    'payments.topup': 'Пополнить',
    'payments.send': 'Отправить',
    'payments.recipient': 'Получатель (email или номер телефона)',
    'payments.amount': 'Сумма в COSMO',
    
    // Housing
    'housing.title': 'CosmoHousing',
    'housing.search': 'Поиск местоположения...',
    'housing.checkin': 'Заезд',
    'housing.checkout': 'Выезд',
    'housing.guests': 'Гости',
    'housing.book': 'Забронировать',
    'housing.night': 'за ночь',
    
    // Taxi
    'taxi.title': 'CosmoTaxi',
    'taxi.from': 'Откуда',
    'taxi.to': 'Куда',
    'taxi.tariff': 'Выберите тариф',
    'taxi.order': 'Заказать такси',
    'taxi.economy': 'Эконом',
    'taxi.comfort': 'Комфорт',
    'taxi.business': 'Бизнес',
    
    // Food
    'food.title': 'CosmoFood',
    'food.search': 'Поиск ресторанов...',
    'food.delivery': 'Доставка',
    'food.pickup': 'Самовывоз',
    'food.cart': 'Корзина',
    'food.order': 'Заказать',
    
    // Jobs
    'jobs.title': 'CosmoJob',
    'jobs.client': 'Мне нужна услуга',
    'jobs.worker': 'Хочу работать',
    'jobs.search': 'Поиск услуг...',
    'jobs.accept': 'Принять заказ',
    'jobs.complete': 'Выполнить заказ',
    
    // Marketplace
    'marketplace.title': 'CosmoMarket',
    'marketplace.search': 'Поиск товаров...',
    'marketplace.category': 'Все категории',
    'marketplace.buy': 'Купить сейчас',
    'marketplace.cart': 'В корзину',
    
    // Groups
    'groups.title': 'CosmoGroups',
    'groups.my': 'Мои группы',
    'groups.discover': 'Обзор',
    'groups.create': 'Создать группу',
    'groups.join': 'Присоединиться'
  },
  es: {
    // Header
    'app.title': 'CosmoLife',
    'app.subtitle': 'Todos los servicios en una aplicación',
    
    // Services
    'services.messenger': 'Mensajería',
    'services.messenger.desc': 'Chat y mensajes',
    'services.payments': 'Cosmo Pay',
    'services.payments.desc': 'Pagos',
    'services.housing': 'Alquiler de vivienda',
    'services.housing.desc': 'Buscar alojamiento',
    'services.taxi': 'Taxi',
    'services.taxi.desc': 'Viajes',
    'services.food': 'Entrega de comida',
    'services.food.desc': 'Pedir comida',
    'services.jobs': 'Trabajos',
    'services.jobs.desc': 'Buscar trabajo',
    'services.marketplace': 'Mercado',
    'services.marketplace.desc': 'Compras',
    'services.groups': 'Grupos',
    'services.groups.desc': 'Comunidades',
    
    // Common
    'common.back': 'Atrás',
    'common.search': 'Buscar',
    'common.send': 'Enviar',
    'common.cancel': 'Cancelar',
    'common.confirm': 'Confirmar',
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito'
  },
  zh: {
    // Header
    'app.title': 'CosmoLife',
    'app.subtitle': '一个应用中的所有服务',
    
    // Services
    'services.messenger': '消息',
    'services.messenger.desc': '聊天和消息',
    'services.payments': 'Cosmo Pay',
    'services.payments.desc': '支付',
    'services.housing': '房屋租赁',
    'services.housing.desc': '寻找住房',
    'services.taxi': '出租车',
    'services.taxi.desc': '出行',
    'services.food': '外卖',
    'services.food.desc': '订餐',
    'services.jobs': '工作',
    'services.jobs.desc': '找工作',
    'services.marketplace': '市场',
    'services.marketplace.desc': '购物',
    'services.groups': '群组',
    'services.groups.desc': '社区',
    
    // Common
    'common.back': '返回',
    'common.search': '搜索',
    'common.send': '发送',
    'common.cancel': '取消',
    'common.confirm': '确认',
    'common.loading': '加载中...',
    'common.error': '错误',
    'common.success': '成功'
  },
  hi: {
    // Header
    'app.title': 'CosmoLife',
    'app.subtitle': 'एक ऐप में सभी सेवाएं',
    
    // Services
    'services.messenger': 'मैसेंजर',
    'services.messenger.desc': 'चैट और संदेश',
    'services.payments': 'Cosmo Pay',
    'services.payments.desc': 'भुगतान',
    'services.housing': 'आवास किराया',
    'services.housing.desc': 'आवास खोजें',
    'services.taxi': 'टैक्सी',
    'services.taxi.desc': 'यात्राएं',
    'services.food': 'खाना डिलीवरी',
    'services.food.desc': 'खाना ऑर्डर करें',
    'services.jobs': 'नौकरियां',
    'services.jobs.desc': 'काम खोजें',
    'services.marketplace': 'मार्केटप्लेस',
    'services.marketplace.desc': 'खरीदारी',
    'services.groups': 'समूह',
    'services.groups.desc': 'समुदाय',
    
    // Common
    'common.back': 'वापस',
    'common.search': 'खोजें',
    'common.send': 'भेजें',
    'common.cancel': 'रद्द करें',
    'common.confirm': 'पुष्टि करें',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता'
  },
  ar: {
    // Header
    'app.title': 'CosmoLife',
    'app.subtitle': 'جميع الخدمات في تطبيق واحد',
    
    // Services
    'services.messenger': 'المراسلة',
    'services.messenger.desc': 'الدردشة والرسائل',
    'services.payments': 'Cosmo Pay',
    'services.payments.desc': 'المدفوعات',
    'services.housing': 'تأجير المساكن',
    'services.housing.desc': 'البحث عن سكن',
    'services.taxi': 'التاكسي',
    'services.taxi.desc': 'الرحلات',
    'services.food': 'توصيل الطعام',
    'services.food.desc': 'طلب الطعام',
    'services.jobs': 'الوظائف',
    'services.jobs.desc': 'البحث عن عمل',
    'services.marketplace': 'السوق',
    'services.marketplace.desc': 'التسوق',
    'services.groups': 'المجموعات',
    'services.groups.desc': 'المجتمعات',
    
    // Common
    'common.back': 'رجوع',
    'common.search': 'بحث',
    'common.send': 'إرسال',
    'common.cancel': 'إلغاء',
    'common.confirm': 'تأكيد',
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح'
  },
  fr: {
    // Header
    'app.title': 'CosmoLife',
    'app.subtitle': 'Tous les services dans une application',
    
    // Services
    'services.messenger': 'Messagerie',
    'services.messenger.desc': 'Chat et messages',
    'services.payments': 'Cosmo Pay',
    'services.payments.desc': 'Paiements',
    'services.housing': 'Location de logement',
    'services.housing.desc': 'Trouver un logement',
    'services.taxi': 'Taxi',
    'services.taxi.desc': 'Trajets',
    'services.food': 'Livraison de nourriture',
    'services.food.desc': 'Commander de la nourriture',
    'services.jobs': 'Emplois',
    'services.jobs.desc': 'Trouver du travail',
    'services.marketplace': 'Marché',
    'services.marketplace.desc': 'Shopping',
    'services.groups': 'Groupes',
    'services.groups.desc': 'Communautés',
    
    // Common
    'common.back': 'Retour',
    'common.search': 'Rechercher',
    'common.send': 'Envoyer',
    'common.cancel': 'Annuler',
    'common.confirm': 'Confirmer',
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès'
  },
  pt: {
    // Header
    'app.title': 'CosmoLife',
    'app.subtitle': 'Todos os serviços em um aplicativo',
    
    // Services
    'services.messenger': 'Mensageiro',
    'services.messenger.desc': 'Chat e mensagens',
    'services.payments': 'Cosmo Pay',
    'services.payments.desc': 'Pagamentos',
    'services.housing': 'Aluguel de moradia',
    'services.housing.desc': 'Buscar moradia',
    'services.taxi': 'Táxi',
    'services.taxi.desc': 'Viagens',
    'services.food': 'Entrega de comida',
    'services.food.desc': 'Pedir comida',
    'services.jobs': 'Trabalhos',
    'services.jobs.desc': 'Buscar trabalho',
    'services.marketplace': 'Mercado',
    'services.marketplace.desc': 'Compras',
    'services.groups': 'Grupos',
    'services.groups.desc': 'Comunidades',
    
    // Common
    'common.back': 'Voltar',
    'common.search': 'Pesquisar',
    'common.send': 'Enviar',
    'common.cancel': 'Cancelar',
    'common.confirm': 'Confirmar',
    'common.loading': 'Carregando...',
    'common.error': 'Erro',
    'common.success': 'Sucesso'
  },
  de: {
    // Header
    'app.title': 'CosmoLife',
    'app.subtitle': 'Alle Dienste in einer App',
    
    // Services
    'services.messenger': 'Messenger',
    'services.messenger.desc': 'Chat und Nachrichten',
    'services.payments': 'Cosmo Pay',
    'services.payments.desc': 'Zahlungen',
    'services.housing': 'Wohnungsvermietung',
    'services.housing.desc': 'Wohnung finden',
    'services.taxi': 'Taxi',
    'services.taxi.desc': 'Fahrten',
    'services.food': 'Essenslieferung',
    'services.food.desc': 'Essen bestellen',
    'services.jobs': 'Jobs',
    'services.jobs.desc': 'Arbeit finden',
    'services.marketplace': 'Marktplatz',
    'services.marketplace.desc': 'Einkaufen',
    'services.groups': 'Gruppen',
    'services.groups.desc': 'Gemeinschaften',
    
    // Common
    'common.back': 'Zurück',
    'common.search': 'Suchen',
    'common.send': 'Senden',
    'common.cancel': 'Abbrechen',
    'common.confirm': 'Bestätigen',
    'common.loading': 'Laden...',
    'common.error': 'Fehler',
    'common.success': 'Erfolg'
  },
  ja: {
    // Header
    'app.title': 'CosmoLife',
    'app.subtitle': '1つのアプリですべてのサービス',
    
    // Services
    'services.messenger': 'メッセンジャー',
    'services.messenger.desc': 'チャットとメッセージ',
    'services.payments': 'Cosmo Pay',
    'services.payments.desc': '支払い',
    'services.housing': '住宅賃貸',
    'services.housing.desc': '住宅を探す',
    'services.taxi': 'タクシー',
    'services.taxi.desc': '乗車',
    'services.food': 'フードデリバリー',
    'services.food.desc': '食事の注文',
    'services.jobs': '仕事',
    'services.jobs.desc': '仕事を探す',
    'services.marketplace': 'マーケットプレイス',
    'services.marketplace.desc': 'ショッピング',
    'services.groups': 'グループ',
    'services.groups.desc': 'コミュニティ',
    
    // Common
    'common.back': '戻る',
    'common.search': '検索',
    'common.send': '送信',
    'common.cancel': 'キャンセル',
    'common.confirm': '確認',
    'common.loading': '読み込み中...',
    'common.error': 'エラー',
    'common.success': '成功'
  }
};

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }
];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('cosmo_language');
    return saved || 'ru';
  });

  useEffect(() => {
    localStorage.setItem('cosmo_language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export { languages };
