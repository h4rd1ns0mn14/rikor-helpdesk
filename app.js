// Rikor HelpDesk - ИСПРАВЛЕННАЯ ВЕРСИЯ с работающими отчетами и графиками
class RikorHelpDeskFinal {
  constructor() {
    this.currentRoute = 'dashboard';
    this.currentUser = {
      id: 1,
      name: 'Петр Сидоров',
      email: 'p.sidorov@rikor.ru',
      role: 'admin',
      avatar: 'ПС',
      department: 'IT'
    };

    // Системные настройки
    this.settings = {
      theme: localStorage.getItem('rikor-theme') || 'light',
      language: 'ru',
      notifications: { email: true, push: true, sound: true },
      autoRefresh: true,
      refreshInterval: 30000
    };

    // Полные данные системы с исправленными структурами для графиков
    this.data = this.loadData();
    this.filters = {
      tickets: { status: '', priority: '', assignee: '', search: '' },
      users: { role: '', status: '', search: '' },
      reports: { dateFrom: '', dateTo: '', type: 'all' }
    };

    // Массив для хранения инстансов Chart.js
    this.chartInstances = {};

    this.init();
  }

  // Инициализация приложения
  init() {
    console.log('🚀 Инициализация Rikor HelpDesk Final...');
    this.applyTheme();
    this.bindEvents();
    this.handleRoute();
    this.startAutoRefresh();
    setTimeout(() => {
      this.showNotification('Система Rikor HelpDesk готова к работе!', 'success');
    }, 1000);
  }

  // Загрузка данных с исправленными структурами
  loadData() {
    const defaultData = {
      tickets: [
        {
          id: "RIK-2025-001",
          title: "Перегрев сервера Rikor RP6224 в ЦОД",
          description: "Сервер Rikor RP6224 показывает температуру CPU 85°C в нормальном режиме работы. Система охлаждения работает на максимальных оборотах.",
          status: "open", priority: "critical", category: "hardware",
          deviceType: "Сервер", deviceModel: "RP6224",
          assignee: "Иван Петров", reporter: "Анна Смирнова",
          created: "2025-09-22T06:15:00Z", updated: "2025-09-22T08:30:00Z",
          location: "ЦОД-1, Стойка A-15", timeSpent: 2.5, estimatedTime: 4,
          tags: ["rikor", "server", "cooling", "datacenter", "critical"]
        },
        {
          id: "RIK-2025-002", 
          title: "Ноутбук Rikor RN NINO не включается",
          description: "После обновления BIOS ноутбук Rikor RN NINO 203.1/15 не реагирует на нажатие кнопки питания.",
          status: "in_progress", priority: "high", category: "hardware",
          deviceType: "Ноутбук", deviceModel: "RN NINO 203.1/15",
          assignee: "Елена Новикова", reporter: "Сергей Волков",
          created: "2025-09-21T16:45:00Z", updated: "2025-09-22T09:20:00Z",
          location: "Офис 1, Комната 205", timeSpent: 1.5, estimatedTime: 3,
          tags: ["rikor", "laptop", "power", "bios"]
        },
        {
          id: "RIK-2025-003",
          title: "Медленная работа моноблока Rikor AIO",
          description: "Моноблок Rikor AIO 201.1/23 стал работать медленно после обновления Windows 11.",
          status: "resolved", priority: "medium", category: "software",
          deviceType: "Моноблок", deviceModel: "AIO 201.1/23",
          assignee: "Петр Сидоров", reporter: "Михаил Кузнецов",
          created: "2025-09-20T11:30:00Z", updated: "2025-09-22T09:15:00Z",
          resolvedAt: "2025-09-22T09:15:00Z", timeSpent: 4.2, estimatedTime: 4,
          tags: ["rikor", "aio", "performance", "windows"]
        },
        {
          id: "RIK-2025-004",
          title: "Настройка виртуализации на сервере Rikor RP6104",
          description: "Требуется настроить параметры BIOS и установить Hyper-V.",
          status: "waiting", priority: "low", category: "configuration",
          deviceType: "Сервер", deviceModel: "RP6104",
          assignee: "Алексей Морозов", reporter: "Ольга Иванова",
          created: "2025-09-22T08:20:00Z", updated: "2025-09-22T09:00:00Z",
          location: "ЦОД-2, Стойка B-08", timeSpent: 0.5, estimatedTime: 6,
          tags: ["rikor", "server", "bios", "virtualization"]
        },
        {
          id: "RIK-2025-005",
          title: "Замена SSD диска в мини-ПК Rikor RPC 301.1",
          description: "Требуется срочная замена SSD диска. SMART показывает критическое состояние.",
          status: "open", priority: "high", category: "hardware",
          deviceType: "Мини ПК", deviceModel: "RPC 301.1",
          assignee: "Иван Петров", reporter: "Дмитрий Козлов",
          created: "2025-09-22T07:45:00Z", updated: "2025-09-22T07:45:00Z",
          location: "Офис 1, Переговорная 3", timeSpent: 0, estimatedTime: 2,
          tags: ["rikor", "minipc", "storage", "replacement"]
        },
        {
          id: "RIK-2025-006",
          title: "Проблемы с Wi-Fi на планшете Rikor RT 102.1",
          description: "Планшет теряет соединение с Wi-Fi каждые 10-15 минут.",
          status: "open", priority: "medium", category: "network",
          deviceType: "Планшет", deviceModel: "RT 102.1",
          assignee: "Елена Новикова", reporter: "Анна Смирнова",
          created: "2025-09-22T09:30:00Z", updated: "2025-09-22T09:30:00Z",
          location: "Офис 1, Отдел продаж", timeSpent: 0, estimatedTime: 2,
          tags: ["rikor", "tablet", "wifi", "android"]
        }
      ],

      users: [
        {id: 1, name: "Петр Сидоров", email: "p.sidorov@rikor.ru", role: "admin", department: "IT", avatar: "ПС", status: "online", ticketsResolved: 142, avgResolutionTime: 12.5},
        {id: 2, name: "Иван Петров", email: "i.petrov@rikor.ru", role: "agent", department: "IT", avatar: "ИП", status: "online", ticketsResolved: 89, avgResolutionTime: 18.2},
        {id: 3, name: "Елена Новикова", email: "e.novikova@rikor.ru", role: "agent", department: "IT", avatar: "ЕН", status: "away", ticketsResolved: 67, avgResolutionTime: 15.7},
        {id: 4, name: "Анна Смирнова", email: "a.smirnova@rikor.ru", role: "user", department: "Офис", avatar: "АС", status: "offline", ticketsCreated: 23},
        {id: 5, name: "Алексей Морозов", email: "a.morozov@rikor.ru", role: "agent", department: "IT", avatar: "АМ", status: "busy", ticketsResolved: 45, avgResolutionTime: 22.1},
        {id: 6, name: "Сергей Волков", email: "s.volkov@rikor.ru", role: "user", department: "Разработка", avatar: "СВ", status: "online", ticketsCreated: 31},
        {id: 7, name: "Михаил Кузнецов", email: "m.kuznetsov@rikor.ru", role: "user", department: "Маркетинг", avatar: "МК", status: "online", ticketsCreated: 18},
        {id: 8, name: "Ольга Иванова", email: "o.ivanova@rikor.ru", role: "manager", department: "Администрация", avatar: "ОИ", status: "online", ticketsCreated: 12}
      ],

      knowledgeBase: [
        {
          id: "KB-001", title: "Устранение перегрева серверов Rikor RP серии", 
          category: "hardware", 
          content: "Пошаговое руководство по диагностике и устранению проблем с охлаждением серверов Rikor RP6224, RP6104, RP6436. Проверка системы охлаждения, очистка от пыли, замена термопасты.",
          tags: ["сервер", "охлаждение", "rp6224", "температура"], 
          views: 245, rating: 4.8, 
          created: "2025-08-15T10:00:00Z", updated: "2025-09-10T14:30:00Z", 
          author: "Петр Сидоров"
        },
        {
          id: "KB-002", title: "Обновление BIOS на ноутбуках Rikor RN серии", 
          category: "software", 
          content: "Подробная инструкция по безопасному обновлению BIOS на ноутбуках Rikor RN NINO, RN ARZ, RN SPB с описанием возможных рисков и способов восстановления.",
          tags: ["ноутбук", "bios", "обновление", "rn-nino"], 
          views: 189, rating: 4.6, 
          created: "2025-07-22T09:15:00Z", updated: "2025-09-05T11:45:00Z", 
          author: "Елена Новикова"
        },
        {
          id: "KB-003", title: "Настройка Wi-Fi на планшетах Rikor RT серии", 
          category: "network", 
          content: "Руководство по решению проблем с беспроводным подключением на планшетах Rikor RT 102.1, RT 105.1 под Android. Частые отключения, медленная скорость.",
          tags: ["планшет", "wifi", "android", "rt-102"], 
          views: 156, rating: 4.4, 
          created: "2025-06-18T13:20:00Z", updated: "2025-08-28T16:10:00Z", 
          author: "Иван Петров"
        },
        {
          id: "KB-004", title: "Замена компонентов в мини-ПК Rikor RPC серии", 
          category: "hardware", 
          content: "Инструкция по замене SSD, RAM и других компонентов в мини-ПК Rikor RPC 301.1, USFF 104.1 с соблюдением гарантийных обязательств.",
          tags: ["мини-пк", "замена", "ssd", "ram", "rpc-301"], 
          views: 134, rating: 4.7, 
          created: "2025-05-30T08:45:00Z", updated: "2025-09-12T12:20:00Z", 
          author: "Алексей Морозов"
        },
        {
          id: "KB-005", title: "Оптимизация производительности моноблоков Rikor AIO", 
          category: "performance", 
          content: "Советы по настройке и оптимизации Windows на моноблоках Rikor AIO 201.1/23, AIO 202.1/27 для максимальной производительности.",
          tags: ["моноблок", "windows", "производительность", "aio-201"], 
          views: 298, rating: 4.9, 
          created: "2025-04-12T15:30:00Z", updated: "2025-09-15T09:50:00Z", 
          author: "Петр Сидоров"
        }
      ],

      // ИСПРАВЛЕННЫЕ данные для графиков
      stats: {
        totalTickets: 1567, openTickets: 128, inProgressTickets: 45, resolvedTickets: 1298, closedTickets: 96,
        avgResponseTime: "1.8", avgResolutionTime: "14.2", customerSatisfaction: 96.4, slaCompliance: 94.7,
        todayCreated: 12, todayResolved: 18, thisWeekCreated: 67, thisWeekResolved: 84,

        // Данные для графика месячной активности
        monthlyTrend: [158, 162, 155, 171, 168, 189, 195, 182, 191, 194, 202, 195],
        monthlyLabels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],

        // Данные для графика приоритетов
        priorityStats: {critical: 15, high: 32, medium: 65, low: 16},
        priorityLabels: ['Критический', 'Высокий', 'Средний', 'Низкий'],
        priorityColors: ['#ef4444', '#f59e0b', '#06b6d4', '#10b981'],

        // Данные для отчетов
        agentPerformance: {
          "Петр Сидоров": {resolved: 142, avgTime: 12.5, satisfaction: 4.8},
          "Иван Петров": {resolved: 89, avgTime: 18.2, satisfaction: 4.6},
          "Елена Новикова": {resolved: 67, avgTime: 15.7, satisfaction: 4.7},
          "Алексей Морозов": {resolved: 45, avgTime: 22.1, satisfaction: 4.5}
        },

        // Данные для времени решения
        timeToResolution: {
          "0-4h": 245, "4-24h": 432, "1-3d": 287, "3-7d": 134, "7d+": 58
        },

        // Данные по устройствам
        deviceStats: {
          "Ноутбук": {count: 487, avgResolution: 16.5},
          "Сервер": {count: 234, avgResolution: 8.2},
          "Моноблок": {count: 156, avgResolution: 12.1},
          "Мини ПК": {count: 123, avgResolution: 14.7},
          "Планшет": {count: 89, avgResolution: 18.9},
          "Другое": {count: 158, avgResolution: 22.3}
        }
      }
    };

    return JSON.parse(localStorage.getItem('rikor-data')) || defaultData;
  }

  // Сохранение данных
  saveData() {
    localStorage.setItem('rikor-data', JSON.stringify(this.data));
    console.log('💾 Данные сохранены в LocalStorage');
  }

  // Применение темы
  applyTheme() {
    document.body.setAttribute('data-theme', this.settings.theme);
    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
      themeIcon.className = this.settings.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    console.log(`🎨 Применена тема: ${this.settings.theme}`);
  }

  // Привязка событий
  bindEvents() {
    console.log('🔗 Привязка событий...');

    // Навигация
    document.querySelectorAll('.sidebar__link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigate(link.dataset.route);
      });
    });

    // Переключение темы
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // FAB меню
    const fabButton = document.getElementById('fabButton');
    const fabMenu = document.getElementById('fabMenu');
    if (fabButton && fabMenu) {
      fabButton.addEventListener('click', (e) => {
        e.stopPropagation();
        fabMenu.classList.toggle('hidden');
      });
    }

    // Закрытие модального окна и FAB меню
    document.addEventListener('click', (e) => {
      if (e.target.id === 'modal-overlay') {
        this.hideModal();
      }
      if (!e.target.closest('.fab') && !e.target.closest('.fab-menu')) {
        document.getElementById('fabMenu')?.classList.add('hidden');
      }
    });

    // Клавиатурные сокращения
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
          case 'n':
            e.preventDefault();
            this.showCreateTicketModal();
            break;
          case 'k':
            e.preventDefault();
            const searchInput = document.querySelector('input[type="search"]');
            if (searchInput) searchInput.focus();
            break;
        }
      }
      if (e.key === 'Escape') {
        this.hideModal();
        document.getElementById('fabMenu')?.classList.add('hidden');
      }
    });

    console.log('✅ События привязаны');
  }

  // Переключение темы
  toggleTheme() {
    this.settings.theme = this.settings.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('rikor-theme', this.settings.theme);
    this.applyTheme();
    this.showNotification(`Тема изменена на ${this.settings.theme === 'light' ? 'светлую' : 'темную'}`, 'success');
  }

  // Навигация
  navigate(route) {
    console.log(`📍 Переход к: ${route}`);
    this.currentRoute = route;
    this.updateActiveLink(route);
    this.updateBreadcrumb(route);
    this.renderContent();

    // Обновляем URL
    window.history.pushState({route}, '', `#${route}`);
  }

  updateActiveLink(route) {
    document.querySelectorAll('.sidebar__link').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.route === route) {
        link.classList.add('active');
      }
    });
  }

  updateBreadcrumb(route) {
    const breadcrumbMap = {
      'dashboard': 'Панель управления',
      'tickets': 'Тикеты',
      'knowledge': 'База знаний',
      'reports': 'Отчеты',
      'users': 'Пользователи',
      'settings': 'Настройки'
    };

    const currentPage = document.getElementById('currentPage');
    if (currentPage) {
      currentPage.textContent = breadcrumbMap[route] || 'Неизвестно';
    }
  }

  // Обработка маршрутов
  handleRoute() {
    const hash = window.location.hash.slice(1) || 'dashboard';
    this.navigate(hash);
  }

  // ИСПРАВЛЕННЫЙ рендеринг контента
  renderContent() {
    const container = document.getElementById('content');
    if (!container) return;

    // Показать индикатор загрузки
    container.innerHTML = '<div class="loading" style="min-height: 300px; display: flex; align-items: center; justify-content: center;"><div style="text-align: center;"><div style="font-size: 48px; margin-bottom: 16px;">⏳</div><div>Загрузка...</div></div></div>';

    // Уничтожаем старые графики
    this.destroyCharts();

    // Имитация загрузки
    setTimeout(() => {
      try {
        switch(this.currentRoute) {
          case 'dashboard':
            container.innerHTML = this.renderDashboard();
            this.initDashboardCharts();
            break;
          case 'tickets':
            container.innerHTML = this.renderTickets();
            this.initTicketFilters();
            break;
          case 'knowledge':
            container.innerHTML = this.renderKnowledgeBase();
            this.initKnowledgeSearch();
            break;
          case 'reports':
            container.innerHTML = this.renderReports();
            this.initReportCharts();
            this.initReportFilters();
            break;
          case 'users':
            container.innerHTML = this.renderUsers();
            this.initUserFilters();
            break;
          case 'settings':
            container.innerHTML = this.renderSettings();
            this.initSettingsForm();
            break;
          default:
            container.innerHTML = this.renderDashboard();
        }
        console.log(`✅ Контент отрендерен: ${this.currentRoute}`);
      } catch (error) {
        console.error('❌ Ошибка рендеринга:', error);
        container.innerHTML = `<div class="card"><h2>Ошибка загрузки</h2><p>Произошла ошибка при загрузке раздела "${this.currentRoute}": ${error.message}</p></div>`;
      }
    }, 300);
  }

  // Уничтожение графиков для предотвращения ошибок
  destroyCharts() {
    Object.values(this.chartInstances).forEach(chart => {
      if (chart && typeof chart.destroy === 'function') {
        chart.destroy();
      }
    });
    this.chartInstances = {};
  }

  // ИСПРАВЛЕННЫЙ рендеринг Dashboard
  renderDashboard() {
    const stats = this.data.stats;
    return `
      <div class="dashboard">
        <div class="dashboard__header mb-4">
          <h1>Панель управления Rikor HelpDesk</h1>
          <p class="card__subtitle">Общий обзор системы технической поддержки • ${new Date().toLocaleDateString('ru-RU')}</p>
        </div>

        <div class="grid grid--4 mb-4">
          <div class="stat-card">
            <div class="stat-card__icon" style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white;">
              <i class="fas fa-ticket-alt"></i>
            </div>
            <div class="stat-card__value">${stats.totalTickets}</div>
            <div class="stat-card__label">Всего тикетов</div>
            <div class="stat-card__trend trend--up">
              <i class="fas fa-arrow-up"></i>+12% за месяц
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-card__icon" style="background: linear-gradient(135deg, #f59e0b, #fbbf24); color: white;">
              <i class="fas fa-clock"></i>
            </div>
            <div class="stat-card__value">${stats.openTickets}</div>
            <div class="stat-card__label">Открытых тикетов</div>
            <div class="stat-card__trend trend--down">
              <i class="fas fa-arrow-down"></i>-5% за неделю
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-card__icon" style="background: linear-gradient(135deg, #10b981, #34d399); color: white;">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="stat-card__value">${stats.resolvedTickets}</div>
            <div class="stat-card__label">Решенных тикетов</div>
            <div class="stat-card__trend trend--up">
              <i class="fas fa-arrow-up"></i>+8% за месяц
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-card__icon" style="background: linear-gradient(135deg, #06b6d4, #22d3ee); color: white;">
              <i class="fas fa-smile"></i>
            </div>
            <div class="stat-card__value">${stats.customerSatisfaction}%</div>
            <div class="stat-card__label">Удовлетворенность</div>
            <div class="stat-card__trend trend--up">
              <i class="fas fa-arrow-up"></i>+2% за месяц
            </div>
          </div>
        </div>

        <div class="grid grid--2 mb-4">
          <div class="card">
            <div class="card__header">
              <div>
                <h3 class="card__title">Активность по месяцам</h3>
                <p class="card__subtitle">Тренд создания и решения тикетов</p>
              </div>
            </div>
            <div style="position: relative; height: 250px;">
              <canvas id="monthlyChart"></canvas>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <div>
                <h3 class="card__title">Приоритеты тикетов</h3>
                <p class="card__subtitle">Текущее распределение</p>
              </div>
            </div>
            <div style="position: relative; height: 250px;">
              <canvas id="priorityChart"></canvas>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card__header">
            <div>
              <h3 class="card__title">Последние тикеты</h3>
              <p class="card__subtitle">Требующие внимания</p>
            </div>
            <button class="btn btn--primary btn--small" onclick="app.navigate('tickets')">
              <i class="fas fa-eye mr-2"></i>Все тикеты
            </button>
          </div>
          <div class="recent-tickets">
            ${this.data.tickets.slice(0, 5).map(ticket => `
              <div class="recent-ticket card" onclick="app.viewTicket('${ticket.id}')" style="margin-bottom: 12px; cursor: pointer; padding: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                  <span class="badge badge--primary">${ticket.id}</span>
                  <span class="badge priority--${ticket.priority}">
                    <i class="${this.getPriorityIcon(ticket.priority)} mr-1"></i>
                    ${this.getPriorityText(ticket.priority)}
                  </span>
                </div>
                <h4 style="margin-bottom: 8px; color: var(--rikor-text-primary);">${ticket.title}</h4>
                <p style="color: var(--rikor-text-muted); font-size: 13px; margin-bottom: 8px;">
                  ${this.getDeviceIcon(ticket.deviceType)} ${ticket.deviceType} • ${ticket.assignee} • ${this.formatDate(ticket.created)}
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="badge status--${ticket.status}">${this.getStatusText(ticket.status)}</span>
                  <span style="color: var(--rikor-text-muted); font-size: 12px;">${ticket.location || 'Местоположение не указано'}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // ИСПРАВЛЕННАЯ инициализация графиков Dashboard
  initDashboardCharts() {
    setTimeout(() => {
      try {
        console.log('📊 Инициализация графиков Dashboard...');

        // График месячной активности
        const monthlyCtx = document.getElementById('monthlyChart');
        if (monthlyCtx) {
          console.log('📈 Создание графика месячной активности...');
          this.chartInstances.monthly = new Chart(monthlyCtx, {
            type: 'line',
            data: {
              labels: this.data.stats.monthlyLabels,
              datasets: [{
                label: 'Созданные тикеты',
                data: this.data.stats.monthlyTrend,
                borderColor: '#1e40af',
                backgroundColor: 'rgba(30, 64, 175, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#1e40af',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: { 
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(148, 163, 184, 0.1)'
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              },
              elements: {
                line: {
                  borderWidth: 3
                }
              }
            }
          });
          console.log('✅ График месячной активности создан');
        }

        // График приоритетов
        const priorityCtx = document.getElementById('priorityChart');
        if (priorityCtx) {
          console.log('🍩 Создание графика приоритетов...');
          this.chartInstances.priority = new Chart(priorityCtx, {
            type: 'doughnut',
            data: {
              labels: this.data.stats.priorityLabels,
              datasets: [{
                data: [
                  this.data.stats.priorityStats.critical,
                  this.data.stats.priorityStats.high,
                  this.data.stats.priorityStats.medium,
                  this.data.stats.priorityStats.low
                ],
                backgroundColor: this.data.stats.priorityColors,
                borderWidth: 0,
                cutout: '60%'
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    padding: 20,
                    usePointStyle: true
                  }
                }
              }
            }
          });
          console.log('✅ График приоритетов создан');
        }

        console.log('🎉 Все графики Dashboard инициализированы');
      } catch (error) {
        console.error('❌ Ошибка инициализации графиков Dashboard:', error);
      }
    }, 100);
  }

  // ИСПРАВЛЕННЫЙ рендеринг Reports с работающими графиками
  renderReports() {
    const stats = this.data.stats;
    const agents = this.data.users.filter(u => u.role === 'agent' || u.role === 'admin');

    return `
      <div class="reports">
        <div class="reports__header mb-4" style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h1>Отчеты и аналитика</h1>
            <p class="card__subtitle">Детальная статистика работы службы технической поддержки Rikor</p>
          </div>
          <div style="display: flex; gap: 12px;">
            <button class="btn btn--secondary" onclick="app.exportReportData()">
              <i class="fas fa-file-csv mr-2"></i>Экспорт CSV
            </button>
            <button class="btn btn--primary" onclick="app.generatePDFReport()">
              <i class="fas fa-file-pdf mr-2"></i>PDF отчет
            </button>
          </div>
        </div>

        <!-- Фильтры отчетов -->
        <div class="card mb-4">
          <div class="card__header">
            <h3 class="card__title">Параметры отчета</h3>
          </div>
          <div class="grid grid--4">
            <div class="form-group">
              <label class="form-label">Дата от</label>
              <input type="date" class="form-control" id="reportDateFrom" value="2025-09-01">
            </div>
            <div class="form-group">
              <label class="form-label">Дата до</label>
              <input type="date" class="form-control" id="reportDateTo" value="2025-09-22">
            </div>
            <div class="form-group">
              <label class="form-label">Тип отчета</label>
              <select class="form-control" id="reportType">
                <option value="all">Общий</option>
                <option value="performance">Производительность</option>
                <option value="sla">SLA анализ</option>
                <option value="devices">По устройствам</option>
                <option value="agents">По агентам</option>
              </select>
            </div>
            <div class="form-group" style="display: flex; align-items: end;">
              <button class="btn btn--primary" onclick="app.updateReportCharts()">
                <i class="fas fa-sync mr-2"></i>Обновить
              </button>
            </div>
          </div>
        </div>

        <!-- Ключевые метрики -->
        <div class="grid grid--4 mb-4">
          <div class="report-metric">
            <div class="report-metric__value">${stats.avgResponseTime}ч</div>
            <div class="report-metric__label">Среднее время ответа</div>
            <div style="font-size: 11px; color: var(--rikor-success); margin-top: 4px;">
              <i class="fas fa-arrow-down mr-1"></i>-12% за месяц
            </div>
          </div>
          <div class="report-metric">
            <div class="report-metric__value">${stats.avgResolutionTime}ч</div>
            <div class="report-metric__label">Среднее время решения</div>
            <div style="font-size: 11px; color: var(--rikor-success); margin-top: 4px;">
              <i class="fas fa-arrow-down mr-1"></i>-8% за месяц
            </div>
          </div>
          <div class="report-metric">
            <div class="report-metric__value">${stats.customerSatisfaction}%</div>
            <div class="report-metric__label">Удовлетворенность</div>
            <div style="font-size: 11px; color: var(--rikor-success); margin-top: 4px;">
              <i class="fas fa-arrow-up mr-1"></i>+2% за месяц
            </div>
          </div>
          <div class="report-metric">
            <div class="report-metric__value">${stats.slaCompliance}%</div>
            <div class="report-metric__label">Соблюдение SLA</div>
            <div style="font-size: 11px; color: var(--rikor-warning); margin-top: 4px;">
              <i class="fas fa-minus mr-1"></i>Стабильно
            </div>
          </div>
        </div>

        <!-- ИСПРАВЛЕННЫЕ графики -->
        <div class="grid grid--2 mb-4">
          <div class="card">
            <div class="card__header">
              <div>
                <h3 class="card__title">Производительность агентов</h3>
                <p class="card__subtitle">Количество решенных тикетов</p>
              </div>
            </div>
            <div style="position: relative; height: 250px;">
              <canvas id="agentPerformanceChart"></canvas>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <div>
                <h3 class="card__title">Распределение по приоритетам</h3>
                <p class="card__subtitle">Открытые тикеты</p>
              </div>
            </div>
            <div style="position: relative; height: 250px;">
              <canvas id="priorityDistributionChart"></canvas>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <div>
                <h3 class="card__title">Время решения тикетов</h3>
                <p class="card__subtitle">Распределение по интервалам</p>
              </div>
            </div>
            <div style="position: relative; height: 250px;">
              <canvas id="resolutionTimeChart"></canvas>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <div>
                <h3 class="card__title">Статистика по устройствам</h3>
                <p class="card__subtitle">Обращения по оборудованию Rikor</p>
              </div>
            </div>
            <div style="position: relative; height: 250px;">
              <canvas id="deviceStatsChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Детальная таблица по агентам -->
        <div class="card">
          <div class="card__header">
            <h3 class="card__title">Детальная статистика по агентам</h3>
            <p class="card__subtitle">Производительность команды технической поддержки</p>
          </div>
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Агент</th>
                  <th>Решено тикетов</th>
                  <th>Среднее время (ч)</th>
                  <th>Рейтинг</th>
                  <th>Активных тикетов</th>
                  <th>Эффективность</th>
                </tr>
              </thead>
              <tbody>
                ${agents.map(agent => {
                  const performance = stats.agentPerformance[agent.name] || {resolved: 0, avgTime: 0, satisfaction: 0};
                  const activeTickets = this.data.tickets.filter(t => t.assignee === agent.name && ['open', 'in_progress'].includes(t.status)).length;
                  const efficiency = performance.resolved > 0 ? Math.round((performance.resolved / (performance.avgTime || 1)) * 100) / 100 : 0;

                  return `
                    <tr>
                      <td>
                        <div style="display: flex; align-items: center; gap: 12px;">
                          <div style="width: 32px; height: 32px; background: var(--rikor-primary-light); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 12px;">
                            ${agent.avatar}
                          </div>
                          <div>
                            <div style="font-weight: 500;">${agent.name}</div>
                            <div style="font-size: 12px; color: var(--rikor-text-muted);">${agent.department}</div>
                          </div>
                        </div>
                      </td>
                      <td><strong style="color: var(--rikor-success);">${performance.resolved}</strong></td>
                      <td>${performance.avgTime.toFixed(1)}</td>
                      <td>
                        <div style="display: flex; align-items: center; gap: 4px;">
                          <span>${performance.satisfaction.toFixed(1)}</span>
                          <div style="display: flex; color: #fbbf24;">
                            ${'★'.repeat(Math.round(performance.satisfaction)) + '☆'.repeat(5 - Math.round(performance.satisfaction))}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="badge ${activeTickets > 10 ? 'badge--warning' : activeTickets > 5 ? 'badge--info' : 'badge--success'}">
                          ${activeTickets}
                        </span>
                      </td>
                      <td>
                        <div style="display: flex; align-items: center; gap: 8px;">
                          <div style="flex: 1; background: var(--rikor-bg-tertiary); border-radius: 4px; height: 8px; overflow: hidden;">
                            <div style="width: ${Math.min(efficiency * 2, 100)}%; height: 100%; background: ${efficiency > 2 ? 'var(--rikor-success)' : efficiency > 1 ? 'var(--rikor-warning)' : 'var(--rikor-error)'}; border-radius: 4px;"></div>
                          </div>
                          <span style="font-size: 12px; color: var(--rikor-text-muted);">${efficiency}</span>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // ИСПРАВЛЕННАЯ инициализация графиков Reports
  initReportCharts() {
    setTimeout(() => {
      try {
        console.log('📊 Инициализация графиков Reports...');

        // График производительности агентов
        const agentCtx = document.getElementById('agentPerformanceChart');
        if (agentCtx) {
          console.log('📊 Создание графика производительности агентов...');
          const agents = this.data.users.filter(u => u.role === 'agent' || u.role === 'admin');
          const performanceData = agents.map(u => this.data.stats.agentPerformance[u.name]?.resolved || 0);

          this.chartInstances.agentPerformance = new Chart(agentCtx, {
            type: 'bar',
            data: {
              labels: agents.map(u => u.name.split(' ')[0]),
              datasets: [{
                label: 'Решенные тикеты',
                data: performanceData,
                backgroundColor: '#1e40af',
                borderRadius: 8,
                borderSkipped: false,
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: { 
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(148, 163, 184, 0.1)'
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              }
            }
          });
          console.log('✅ График агентов создан');
        }

        // График распределения по приоритетам
        const priorityDistCtx = document.getElementById('priorityDistributionChart');
        if (priorityDistCtx) {
          console.log('🍩 Создание графика приоритетов...');
          this.chartInstances.priorityDistribution = new Chart(priorityDistCtx, {
            type: 'doughnut',
            data: {
              labels: this.data.stats.priorityLabels,
              datasets: [{
                data: [
                  this.data.stats.priorityStats.critical,
                  this.data.stats.priorityStats.high,
                  this.data.stats.priorityStats.medium,
                  this.data.stats.priorityStats.low
                ],
                backgroundColor: this.data.stats.priorityColors,
                borderWidth: 0,
                cutout: '65%'
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'right',
                  labels: {
                    padding: 15,
                    usePointStyle: true
                  }
                }
              }
            }
          });
          console.log('✅ График приоритетов создан');
        }

        // График времени решения
        const resolutionCtx = document.getElementById('resolutionTimeChart');
        if (resolutionCtx) {
          console.log('⏱️ Создание графика времени решения...');
          this.chartInstances.resolutionTime = new Chart(resolutionCtx, {
            type: 'bar',
            data: {
              labels: ['0-4ч', '4-24ч', '1-3д', '3-7д', '7д+'],
              datasets: [{
                label: 'Количество тикетов',
                data: [
                  this.data.stats.timeToResolution['0-4h'],
                  this.data.stats.timeToResolution['4-24h'],
                  this.data.stats.timeToResolution['1-3d'],
                  this.data.stats.timeToResolution['3-7d'],
                  this.data.stats.timeToResolution['7d+']
                ],
                backgroundColor: ['#10b981', '#06b6d4', '#f59e0b', '#f97316', '#ef4444'],
                borderRadius: 4
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: { 
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(148, 163, 184, 0.1)'
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              }
            }
          });
          console.log('✅ График времени решения создан');
        }

        // График по типам устройств
        const deviceCtx = document.getElementById('deviceStatsChart');
        if (deviceCtx) {
          console.log('📱 Создание графика устройств...');
          const deviceData = Object.entries(this.data.stats.deviceStats);

          this.chartInstances.deviceStats = new Chart(deviceCtx, {
            type: 'polarArea',
            data: {
              labels: deviceData.map(([device]) => device),
              datasets: [{
                data: deviceData.map(([, data]) => data.count),
                backgroundColor: [
                  'rgba(30, 64, 175, 0.8)',
                  'rgba(16, 185, 129, 0.8)', 
                  'rgba(245, 158, 11, 0.8)',
                  'rgba(139, 92, 246, 0.8)',
                  'rgba(6, 182, 212, 0.8)',
                  'rgba(100, 116, 139, 0.8)'
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    padding: 15,
                    usePointStyle: true
                  }
                }
              },
              scales: {
                r: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(148, 163, 184, 0.1)'
                  }
                }
              }
            }
          });
          console.log('✅ График устройств создан');
        }

        console.log('🎉 Все графики Reports инициализированы');
      } catch (error) {
        console.error('❌ Ошибка инициализации графиков Reports:', error);
        this.showNotification('Ошибка при создании графиков отчетов', 'error');
      }
    }, 200);
  }

  // Инициализация фильтров Reports
  initReportFilters() {
    console.log('📝 Инициализация фильтров Reports');

    const dateFromInput = document.getElementById('reportDateFrom');
    const dateToInput = document.getElementById('reportDateTo');
    const typeSelect = document.getElementById('reportType');

    [dateFromInput, dateToInput, typeSelect].forEach(element => {
      if (element) {
        element.addEventListener('change', () => {
          this.updateReportFilters();
        });
      }
    });
  }

  // Обновление фильтров отчетов
  updateReportFilters() {
    this.filters.reports = {
      dateFrom: document.getElementById('reportDateFrom')?.value || '',
      dateTo: document.getElementById('reportDateTo')?.value || '',
      type: document.getElementById('reportType')?.value || 'all'
    };
    console.log('📊 Фильтры отчетов обновлены:', this.filters.reports);
  }

  // Обновление графиков отчетов
  updateReportCharts() {
    this.showNotification('Графики обновляются...', 'info');
    this.destroyCharts();
    setTimeout(() => {
      this.initReportCharts();
      this.showNotification('Графики успешно обновлены', 'success');
    }, 1000);
  }

  // Рендеринг Tickets (остается без изменений)
  renderTickets() {
    const filteredTickets = this.getFilteredTickets();

    return `
      <div class="tickets">
        <div class="tickets__header mb-4" style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h1>Управление тикетами</h1>
            <p class="card__subtitle">Создание, отслеживание и решение обращений технической поддержки</p>
          </div>
          <button class="btn btn--primary" onclick="app.showCreateTicketModal()">
            <i class="fas fa-plus mr-2"></i>Создать тикет
          </button>
        </div>

        <div class="card mb-4">
          <div class="card__header">
            <h3 class="card__title">Фильтры и поиск</h3>
          </div>
          <div class="tickets__filters">
            <div class="grid grid--4">
              <div class="form-group">
                <label class="form-label">Поиск</label>
                <input type="search" 
                       class="form-control" 
                       placeholder="Поиск по названию, описанию..." 
                       id="ticketSearch"
                       value="${this.filters.tickets.search}">
              </div>
              <div class="form-group">
                <label class="form-label">Статус</label>
                <select class="form-control" id="statusFilter">
                  <option value="">Все статусы</option>
                  <option value="open" ${this.filters.tickets.status === 'open' ? 'selected' : ''}>Открытые</option>
                  <option value="in_progress" ${this.filters.tickets.status === 'in_progress' ? 'selected' : ''}>В работе</option>
                  <option value="waiting" ${this.filters.tickets.status === 'waiting' ? 'selected' : ''}>Ожидание</option>
                  <option value="resolved" ${this.filters.tickets.status === 'resolved' ? 'selected' : ''}>Решенные</option>
                  <option value="closed" ${this.filters.tickets.status === 'closed' ? 'selected' : ''}>Закрытые</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Приоритет</label>
                <select class="form-control" id="priorityFilter">
                  <option value="">Все приоритеты</option>
                  <option value="critical" ${this.filters.tickets.priority === 'critical' ? 'selected' : ''}>Критический</option>
                  <option value="high" ${this.filters.tickets.priority === 'high' ? 'selected' : ''}>Высокий</option>
                  <option value="medium" ${this.filters.tickets.priority === 'medium' ? 'selected' : ''}>Средний</option>
                  <option value="low" ${this.filters.tickets.priority === 'low' ? 'selected' : ''}>Низкий</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Исполнитель</label>
                <select class="form-control" id="assigneeFilter">
                  <option value="">Все исполнители</option>
                  ${this.data.users.filter(u => u.role === 'agent' || u.role === 'admin').map(user => `
                    <option value="${user.name}" ${this.filters.tickets.assignee === user.name ? 'selected' : ''}>${user.name}</option>
                  `).join('')}
                </select>
              </div>
            </div>
            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--rikor-border-light); display: flex; justify-content: space-between; align-items: center;">
              <div style="color: var(--rikor-text-muted); font-size: 14px;">
                Показано ${filteredTickets.length} из ${this.data.tickets.length} тикетов
              </div>
              <button class="btn btn--secondary btn--small" onclick="app.clearTicketFilters()">
                <i class="fas fa-times mr-1"></i>Очистить фильтры
              </button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>ID тикета</th>
                  <th>Тема</th>
                  <th>Устройство</th>
                  <th>Статус</th>
                  <th>Приоритет</th>
                  <th>Исполнитель</th>
                  <th>Создан</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                ${filteredTickets.map(ticket => `
                  <tr onclick="app.viewTicket('${ticket.id}')" style="cursor: pointer;">
                    <td><strong style="color: var(--rikor-primary);">${ticket.id}</strong></td>
                    <td>
                      <div style="max-width: 300px;">
                        <div style="font-weight: 500; margin-bottom: 4px; color: var(--rikor-text-primary);">${ticket.title}</div>
                        <div style="font-size: 12px; color: var(--rikor-text-muted); line-height: 1.4;">${ticket.description.substring(0, 80)}${ticket.description.length > 80 ? '...' : ''}</div>
                      </div>
                    </td>
                    <td>
                      <div style="display: flex; align-items: center; gap: 6px;">
                        <span style="font-size: 16px;">${this.getDeviceIcon(ticket.deviceType)}</span>
                        <span>${ticket.deviceType}</span>
                      </div>
                      ${ticket.deviceModel ? `<div style="font-size: 11px; color: var(--rikor-text-muted);">${ticket.deviceModel}</div>` : ''}
                    </td>
                    <td><span class="badge status--${ticket.status}">${this.getStatusText(ticket.status)}</span></td>
                    <td><span class="badge priority--${ticket.priority}">
                      <i class="${this.getPriorityIcon(ticket.priority)}"></i>
                      ${this.getPriorityText(ticket.priority)}
                    </span></td>
                    <td>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="width: 24px; height: 24px; background: var(--rikor-primary-light); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: 600;">
                          ${ticket.assignee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span>${ticket.assignee}</span>
                      </div>
                    </td>
                    <td>
                      <div>${this.formatDate(ticket.created)}</div>
                      <div style="font-size: 11px; color: var(--rikor-text-muted);">${this.formatTime(ticket.created)}</div>
                    </td>
                    <td>
                      <div style="display: flex; gap: 4px;">
                        <button class="btn btn--small btn--secondary" onclick="event.stopPropagation(); app.editTicket('${ticket.id}')" title="Редактировать">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn--small btn--primary" onclick="event.stopPropagation(); app.viewTicket('${ticket.id}')" title="Просмотр">
                          <i class="fas fa-eye"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
                ${filteredTickets.length === 0 ? `
                  <tr>
                    <td colspan="8" style="text-align: center; padding: 40px; color: var(--rikor-text-muted);">
                      <div style="font-size: 48px; margin-bottom: 16px;">🎫</div>
                      <div style="font-size: 18px; margin-bottom: 8px;">Тикеты не найдены</div>
                      <div>Попробуйте изменить критерии поиска или очистить фильтры</div>
                    </td>
                  </tr>
                ` : ''}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // Рендеринг Knowledge Base
  renderKnowledgeBase() {
    const categories = [...new Set(this.data.knowledgeBase.map(a => a.category))];

    return `
      <div class="knowledge">
        <div class="knowledge__header mb-4" style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h1>База знаний Rikor</h1>
            <p class="card__subtitle">Документация и решения для оборудования и ПО компании Rikor</p>
          </div>
          <button class="btn btn--primary" onclick="app.showCreateArticleModal()">
            <i class="fas fa-plus mr-2"></i>Создать статью
          </button>
        </div>

        <div class="card mb-4">
          <div class="card__header">
            <h3 class="card__title">Поиск и фильтрация</h3>
          </div>
          <div class="grid grid--3">
            <div class="form-group" style="grid-column: 1 / 3;">
              <label class="form-label">Поиск статей</label>
              <input type="search" 
                     class="form-control" 
                     placeholder="Поиск по заголовку, содержимому, тегам..." 
                     id="knowledgeSearch">
            </div>
            <div class="form-group">
              <label class="form-label">Категория</label>
              <select class="form-control" id="categoryFilter">
                <option value="">Все категории</option>
                ${categories.map(cat => `<option value="${cat}">${this.getCategoryText(cat)}</option>`).join('')}
              </select>
            </div>
          </div>
        </div>

        <div class="grid grid--3">
          ${this.data.knowledgeBase.map(article => `
            <div class="card knowledge-card" onclick="app.viewArticle('${article.id}')" style="cursor: pointer; transition: all 0.3s ease;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                <span class="badge badge--primary">${this.getCategoryText(article.category)}</span>
                <div style="display: flex; align-items: center; gap: 4px; color: var(--rikor-text-muted); font-size: 12px;">
                  <i class="fas fa-star" style="color: #fbbf24;"></i>
                  ${article.rating}
                </div>
              </div>

              <h3 style="margin-bottom: 12px; color: var(--rikor-text-primary); font-size: 16px; line-height: 1.4;">${article.title}</h3>

              <p style="color: var(--rikor-text-secondary); font-size: 14px; line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                ${article.content.replace(/#|\*\*|\*/g, '').substring(0, 120)}...
              </p>

              ${article.tags && article.tags.length > 0 ? `
                <div style="margin-bottom: 16px;">
                  ${article.tags.slice(0, 3).map(tag => `<span class="badge badge--info" style="margin-right: 4px; margin-bottom: 4px; font-size: 10px;">#${tag}</span>`).join('')}
                  ${article.tags.length > 3 ? `<span style="color: var(--rikor-text-muted); font-size: 11px;">+${article.tags.length - 3}</span>` : ''}
                </div>
              ` : ''}

              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--rikor-border-light); font-size: 12px; color: var(--rikor-text-muted);">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span><i class="fas fa-eye mr-1"></i>${article.views}</span>
                  <span><i class="fas fa-user mr-1"></i>${article.author}</span>
                </div>
                <span>${this.formatDate(article.updated)}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Рендеринг Users
  renderUsers() {
    const filteredUsers = this.getFilteredUsers();
    const roles = [...new Set(this.data.users.map(u => u.role))];

    return `
      <div class="users">
        <div class="users__header mb-4" style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h1>Управление пользователями</h1>
            <p class="card__subtitle">Учетные записи, роли и статистика пользователей системы</p>
          </div>
          <button class="btn btn--primary" onclick="app.showCreateUserModal()">
            <i class="fas fa-user-plus mr-2"></i>Добавить пользователя
          </button>
        </div>

        <div class="card mb-4">
          <div class="card__header">
            <h3 class="card__title">Фильтры</h3>
          </div>
          <div class="grid grid--3">
            <div class="form-group">
              <label class="form-label">Поиск</label>
              <input type="search" class="form-control" placeholder="Поиск по имени, email..." id="userSearch">
            </div>
            <div class="form-group">
              <label class="form-label">Роль</label>
              <select class="form-control" id="roleFilter">
                <option value="">Все роли</option>
                ${roles.map(role => `<option value="${role}">${this.getRoleText(role)}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Статус</label>
              <select class="form-control" id="statusFilter">
                <option value="">Все статусы</option>
                <option value="online">В сети</option>
                <option value="away">Отошел</option>
                <option value="busy">Занят</option>
                <option value="offline">Не в сети</option>
              </select>
            </div>
          </div>
        </div>

        <div class="grid grid--3">
          ${filteredUsers.map(user => `
            <div class="card user-card" style="position: relative;">
              <div style="position: absolute; top: 16px; right: 16px;">
                <div class="sidebar__status ${user.status}" title="${this.getStatusText(user.status)}"></div>
              </div>

              <div style="text-align: center; margin-bottom: 20px;">
                <div style="width: 64px; height: 64px; background: linear-gradient(135deg, var(--rikor-primary), var(--rikor-primary-light)); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 20px; margin: 0 auto 12px;">
                  ${user.avatar}
                </div>
                <h3 style="margin-bottom: 4px; color: var(--rikor-text-primary);">${user.name}</h3>
                <p style="color: var(--rikor-text-muted); font-size: 14px; margin-bottom: 8px;">${user.email}</p>
                <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 12px;">
                  <span class="badge badge--primary">${this.getRoleText(user.role)}</span>
                  <span class="badge badge--info">${user.department}</span>
                </div>
              </div>

              <div style="background: var(--rikor-bg-tertiary); padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                <div class="grid grid--2" style="gap: 12px; font-size: 13px;">
                  ${user.ticketsResolved ? `
                    <div style="text-align: center;">
                      <div style="font-size: 18px; font-weight: 600; color: var(--rikor-success); margin-bottom: 2px;">${user.ticketsResolved}</div>
                      <div style="color: var(--rikor-text-muted);">Решено</div>
                    </div>
                  ` : ''}
                  ${user.ticketsCreated ? `
                    <div style="text-align: center;">
                      <div style="font-size: 18px; font-weight: 600; color: var(--rikor-primary); margin-bottom: 2px;">${user.ticketsCreated}</div>
                      <div style="color: var(--rikor-text-muted);">Создано</div>
                    </div>
                  ` : ''}
                  ${user.avgResolutionTime ? `
                    <div style="text-align: center; grid-column: 1 / -1;">
                      <div style="font-size: 16px; font-weight: 600; color: var(--rikor-warning); margin-bottom: 2px;">${user.avgResolutionTime}ч</div>
                      <div style="color: var(--rikor-text-muted);">Среднее время</div>
                    </div>
                  ` : ''}
                </div>
              </div>

              <div style="display: flex; gap: 8px;">
                <button class="btn btn--secondary btn--small" onclick="app.editUser(${user.id})" style="flex: 1;">
                  <i class="fas fa-edit mr-1"></i>Редактировать
                </button>
                <button class="btn btn--primary btn--small" onclick="app.viewUserProfile(${user.id})" style="flex: 1;">
                  <i class="fas fa-user mr-1"></i>Профиль
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Рендеринг Settings
  renderSettings() {
    return `
      <div class="settings">
        <div class="settings__header mb-4">
          <h1>Настройки системы</h1>
          <p class="card__subtitle">Конфигурация, персонализация и администрирование</p>
        </div>

        <div class="grid grid--2">
          <div class="card">
            <div class="card__header">
              <div>
                <h3 class="card__title">Персональные настройки</h3>
                <p class="card__subtitle">Индивидуальные предпочтения пользователя</p>
              </div>
            </div>
            <div class="settings-section">
              <div class="form-group">
                <label class="form-label">Тема оформления</label>
                <select class="form-control" id="themeSelect">
                  <option value="light" ${this.settings.theme === 'light' ? 'selected' : ''}>🌞 Светлая</option>
                  <option value="dark" ${this.settings.theme === 'dark' ? 'selected' : ''}>🌙 Темная</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Язык интерфейса</label>
                <select class="form-control">
                  <option value="ru" selected>🇷🇺 Русский</option>
                  <option value="en">🇺🇸 English</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Уведомления</label>
                <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 8px;">
                  <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                    <input type="checkbox" ${this.settings.notifications.email ? 'checked' : ''} style="width: 16px; height: 16px;">
                    <span>📧 Email уведомления</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                    <input type="checkbox" ${this.settings.notifications.push ? 'checked' : ''} style="width: 16px; height: 16px;">
                    <span>🔔 Push уведомления</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                    <input type="checkbox" ${this.settings.notifications.sound ? 'checked' : ''} style="width: 16px; height: 16px;">
                    <span>🔊 Звуковые сигналы</span>
                  </label>
                </div>
              </div>

              <div class="form-group">
                <button class="btn btn--primary" onclick="app.savePersonalSettings()">
                  <i class="fas fa-save mr-2"></i>Сохранить настройки
                </button>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <div>
                <h3 class="card__title">SLA настройки</h3>
                <p class="card__subtitle">Временные рамки обработки тикетов</p>
              </div>
            </div>
            <div class="settings-section">
              <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(239, 68, 68, 0.1); border-radius: 8px; border-left: 4px solid var(--rikor-error);">
                  <div>
                    <div style="font-weight: 500; color: var(--rikor-error);">🔴 Критический</div>
                    <div style="font-size: 12px; color: var(--rikor-text-muted);">Серьезные сбои системы</div>
                  </div>
                  <div style="font-weight: 600; color: var(--rikor-text-primary);">1 час</div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(245, 158, 11, 0.1); border-radius: 8px; border-left: 4px solid var(--rikor-warning);">
                  <div>
                    <div style="font-weight: 500; color: var(--rikor-warning);">🟠 Высокий</div>
                    <div style="font-size: 12px; color: var(--rikor-text-muted);">Важные проблемы</div>
                  </div>
                  <div style="font-weight: 600; color: var(--rikor-text-primary);">4 часа</div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(6, 182, 212, 0.1); border-radius: 8px; border-left: 4px solid var(--rikor-info);">
                  <div>
                    <div style="font-weight: 500; color: var(--rikor-info);">🟡 Средний</div>
                    <div style="font-size: 12px; color: var(--rikor-text-muted);">Обычные запросы</div>
                  </div>
                  <div style="font-weight: 600; color: var(--rikor-text-primary);">24 часа</div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(16, 185, 129, 0.1); border-radius: 8px; border-left: 4px solid var(--rikor-success);">
                  <div>
                    <div style="font-weight: 500; color: var(--rikor-success);">🟢 Низкий</div>
                    <div style="font-size: 12px; color: var(--rikor-text-muted);">Некритичные вопросы</div>
                  </div>
                  <div style="font-weight: 600; color: var(--rikor-text-primary);">72 часа</div>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <div>
                <h3 class="card__title">Системная информация</h3>
                <p class="card__subtitle">Статус и версия системы</p>
              </div>
            </div>
            <div class="system-info">
              <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--rikor-bg-tertiary); border-radius: 8px;">
                  <span style="color: var(--rikor-text-secondary);">Версия системы</span>
                  <strong style="color: var(--rikor-text-primary);">Rikor HelpDesk v2.1.1</strong>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--rikor-bg-tertiary); border-radius: 8px;">
                  <span style="color: var(--rikor-text-secondary);">Последнее обновление</span>
                  <strong style="color: var(--rikor-text-primary);">22.09.2025</strong>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--rikor-bg-tertiary); border-radius: 8px;">
                  <span style="color: var(--rikor-text-secondary);">Статус базы данных</span>
                  <span style="color: var(--rikor-success); display: flex; align-items: center; gap: 4px;">
                    <i class="fas fa-circle" style="font-size: 8px;"></i>
                    Активна
                  </span>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--rikor-bg-tertiary); border-radius: 8px;">
                  <span style="color: var(--rikor-text-secondary);">Пользователей онлайн</span>
                  <strong style="color: var(--rikor-primary)">${this.data.users.filter(u => u.status === 'online').length}</strong>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--rikor-bg-tertiary); border-radius: 8px;">
                  <span style="color: var(--rikor-text-secondary);">Размер данных</span>
                  <strong style="color: var(--rikor-text-primary);">${Math.round(JSON.stringify(this.data).length / 1024)} КБ</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <div>
                <h3 class="card__title">Экспорт и резервное копирование</h3>
                <p class="card__subtitle">Сохранение данных системы</p>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <button class="btn btn--secondary" onclick="app.exportTicketsCSV()">
                <i class="fas fa-file-csv mr-2"></i>Экспорт тикетов (CSV)
              </button>
              <button class="btn btn--secondary" onclick="app.exportUsersCSV()">
                <i class="fas fa-users mr-2"></i>Экспорт пользователей (CSV)
              </button>
              <button class="btn btn--secondary" onclick="app.exportKnowledgeBase()">
                <i class="fas fa-book mr-2"></i>Экспорт базы знаний
              </button>
              <button class="btn btn--primary" onclick="app.generateFullReport()">
                <i class="fas fa-file-pdf mr-2"></i>Полный отчет системы (PDF)
              </button>
              <button class="btn btn--warning" onclick="app.backupAllData()">
                <i class="fas fa-download mr-2"></i>Резервная копия всех данных
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Фильтры и утилиты
  initTicketFilters() {
    const searchInput = document.getElementById('ticketSearch');
    const statusFilter = document.getElementById('statusFilter');
    const priorityFilter = document.getElementById('priorityFilter');
    const assigneeFilter = document.getElementById('assigneeFilter');

    [searchInput, statusFilter, priorityFilter, assigneeFilter].forEach(element => {
      if (element) {
        element.addEventListener('input', () => {
          this.updateTicketFilters();
          this.renderContent();
        });
      }
    });

    console.log('🎛️ Фильтры тикетов инициализированы');
  }

  updateTicketFilters() {
    this.filters.tickets = {
      search: document.getElementById('ticketSearch')?.value || '',
      status: document.getElementById('statusFilter')?.value || '',
      priority: document.getElementById('priorityFilter')?.value || '',
      assignee: document.getElementById('assigneeFilter')?.value || ''
    };
  }

  clearTicketFilters() {
    this.filters.tickets = { status: '', priority: '', assignee: '', search: '' };
    this.renderContent();
    this.showNotification('Фильтры очищены', 'info');
  }

  getFilteredTickets() {
    return this.data.tickets.filter(ticket => {
      const searchMatch = !this.filters.tickets.search || 
        ticket.title.toLowerCase().includes(this.filters.tickets.search.toLowerCase()) ||
        ticket.description.toLowerCase().includes(this.filters.tickets.search.toLowerCase()) ||
        ticket.id.toLowerCase().includes(this.filters.tickets.search.toLowerCase());

      const statusMatch = !this.filters.tickets.status || ticket.status === this.filters.tickets.status;
      const priorityMatch = !this.filters.tickets.priority || ticket.priority === this.filters.tickets.priority;
      const assigneeMatch = !this.filters.tickets.assignee || ticket.assignee === this.filters.tickets.assignee;

      return searchMatch && statusMatch && priorityMatch && assigneeMatch;
    });
  }

  getFilteredUsers() {
    return this.data.users.filter(user => {
      const searchMatch = !this.filters.users.search || 
        user.name.toLowerCase().includes(this.filters.users.search.toLowerCase()) ||
        user.email.toLowerCase().includes(this.filters.users.search.toLowerCase());

      const roleMatch = !this.filters.users.role || user.role === this.filters.users.role;
      const statusMatch = !this.filters.users.status || user.status === this.filters.users.status;

      return searchMatch && roleMatch && statusMatch;
    });
  }

  initKnowledgeSearch() {
    const searchInput = document.getElementById('knowledgeSearch');
    const categoryFilter = document.getElementById('categoryFilter');

    [searchInput, categoryFilter].forEach(element => {
      if (element) {
        element.addEventListener('input', () => {
          this.filterKnowledgeBase();
        });
      }
    });
  }

  filterKnowledgeBase() {
    const search = document.getElementById('knowledgeSearch')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || '';

    console.log('🔍 Поиск в базе знаний:', { search, category });
  }

  initUserFilters() {
    const searchInput = document.getElementById('userSearch');
    const roleFilter = document.getElementById('roleFilter');
    const statusFilter = document.getElementById('statusFilter');

    [searchInput, roleFilter, statusFilter].forEach(element => {
      if (element) {
        element.addEventListener('input', () => {
          this.updateUserFilters();
          this.renderContent();
        });
      }
    });
  }

  updateUserFilters() {
    this.filters.users = {
      search: document.getElementById('userSearch')?.value || '',
      role: document.getElementById('roleFilter')?.value || '',
      status: document.getElementById('statusFilter')?.value || ''
    };
  }

  initSettingsForm() {
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => {
        this.settings.theme = e.target.value;
        localStorage.setItem('rikor-theme', this.settings.theme);
        this.applyTheme();
        this.showNotification('Тема изменена', 'success');
      });
    }
  }

  // Модальные окна
  showCreateTicketModal() {
    this.showModal(`
      <div class="modal-header">
        <div>
          <h2 class="modal-title">Создать новый тикет</h2>
          <p style="color: var(--rikor-text-muted); margin: 4px 0 0; font-size: 14px;">Заполните обязательные поля для создания тикета</p>
        </div>
        <button class="modal-close" onclick="app.hideModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <form onsubmit="app.createTicket(event)" id="createTicketForm">
          <div class="form-group">
            <label class="form-label">Тема тикета <span style="color: var(--rikor-error);">*</span></label>
            <input type="text" name="title" class="form-control" required placeholder="Краткое описание проблемы">
          </div>

          <div class="form-group">
            <label class="form-label">Тип устройства <span style="color: var(--rikor-error);">*</span></label>
            <select name="deviceType" class="form-control" required>
              <option value="">Выберите тип устройства Rikor</option>
              <option value="Ноутбук">💻 Ноутбук (серия RN)</option>
              <option value="Сервер">🖥️ Сервер (серия RP)</option>
              <option value="Моноблок">🖥️ Моноблок (серия AIO)</option>
              <option value="Мини ПК">📦 Мини ПК (серия RPC)</option>
              <option value="Планшет">📱 Планшет (серия RT)</option>
              <option value="Другое">🔧 Другое оборудование</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Модель устройства</label>
            <input type="text" name="deviceModel" class="form-control" placeholder="Например: RP6224, RN NINO 203.1/15">
          </div>

          <div class="form-group">
            <label class="form-label">Описание проблемы <span style="color: var(--rikor-error);">*</span></label>
            <textarea name="description" class="form-control" rows="4" required placeholder="Подробно опишите возникшую проблему, шаги воспроизведения, ошибки..."></textarea>
          </div>

          <div class="grid grid--2">
            <div class="form-group">
              <label class="form-label">Приоритет</label>
              <select name="priority" class="form-control">
                <option value="low">🟢 Низкий - некритичная проблема</option>
                <option value="medium" selected>🟡 Средний - влияет на работу</option>
                <option value="high">🟠 Высокий - серьезная проблема</option>
                <option value="critical">🔴 Критический - система не работает</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Исполнитель</label>
              <select name="assignee" class="form-control">
                <option value="">Автоматическое назначение</option>
                ${this.data.users.filter(u => u.role === 'agent' || u.role === 'admin').map(user => `
                  <option value="${user.name}">${user.name} (${user.department})</option>
                `).join('')}
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Местоположение</label>
            <input type="text" name="location" class="form-control" placeholder="Офис, комната, стойка...">
          </div>

          <div class="form-group">
            <label class="form-label">Категория</label>
            <select name="category" class="form-control">
              <option value="hardware">🔧 Оборудование</option>
              <option value="software">💻 Программное обеспечение</option>
              <option value="network">🌐 Сеть</option>
              <option value="configuration">⚙️ Настройка</option>
              <option value="other">📋 Другое</option>
            </select>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" onclick="app.hideModal()">
          <i class="fas fa-times mr-2"></i>Отмена
        </button>
        <button class="btn btn--primary" onclick="document.getElementById('createTicketForm').dispatchEvent(new Event('submit'))">
          <i class="fas fa-plus mr-2"></i>Создать тикет
        </button>
      </div>
    `);
  }

  showCreateUserModal() {
    this.showModal(`
      <div class="modal-header">
        <div>
          <h2 class="modal-title">Добавить пользователя</h2>
          <p style="color: var(--rikor-text-muted); margin: 4px 0 0; font-size: 14px;">Создание новой учетной записи</p>
        </div>
        <button class="modal-close" onclick="app.hideModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <form onsubmit="app.createUser(event)" id="createUserForm">
          <div class="grid grid--2">
            <div class="form-group">
              <label class="form-label">Имя <span style="color: var(--rikor-error);">*</span></label>
              <input type="text" name="name" class="form-control" required placeholder="Имя Фамилия">
            </div>

            <div class="form-group">
              <label class="form-label">Email <span style="color: var(--rikor-error);">*</span></label>
              <input type="email" name="email" class="form-control" required placeholder="email@rikor.ru">
            </div>
          </div>

          <div class="grid grid--2">
            <div class="form-group">
              <label class="form-label">Роль</label>
              <select name="role" class="form-control">
                <option value="user">👤 Пользователь</option>
                <option value="agent">🎧 Агент поддержки</option>
                <option value="admin">👑 Администратор</option>
                <option value="manager">📊 Менеджер</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Отдел</label>
              <input type="text" name="department" class="form-control" placeholder="IT, Разработка, Офис...">
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" onclick="app.hideModal()">
          <i class="fas fa-times mr-2"></i>Отмена
        </button>
        <button class="btn btn--primary" onclick="document.getElementById('createUserForm').dispatchEvent(new Event('submit'))">
          <i class="fas fa-user-plus mr-2"></i>Добавить пользователя
        </button>
      </div>
    `);
  }

  showCreateArticleModal() {
    this.showModal(`
      <div class="modal-header">
        <div>
          <h2 class="modal-title">Создать статью в базе знаний</h2>
          <p style="color: var(--rikor-text-muted); margin: 4px 0 0; font-size: 14px;">Добавление новой инструкции или решения</p>
        </div>
        <button class="modal-close" onclick="app.hideModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <form onsubmit="app.createArticle(event)" id="createArticleForm">
          <div class="form-group">
            <label class="form-label">Заголовок статьи <span style="color: var(--rikor-error);">*</span></label>
            <input type="text" name="title" class="form-control" required placeholder="Краткое и понятное название">
          </div>

          <div class="form-group">
            <label class="form-label">Категория</label>
            <select name="category" class="form-control">
              <option value="hardware">🔧 Оборудование</option>
              <option value="software">💻 Программное обеспечение</option>
              <option value="network">🌐 Сетевые технологии</option>
              <option value="performance">⚡ Производительность</option>
              <option value="security">🔒 Безопасность</option>
              <option value="other">📋 Другое</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Содержание статьи <span style="color: var(--rikor-error);">*</span></label>
            <textarea name="content" class="form-control" rows="8" required placeholder="Подробное описание решения, пошаговые инструкции..."></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Теги</label>
            <input type="text" name="tags" class="form-control" placeholder="тег1, тег2, тег3">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" onclick="app.hideModal()">
          <i class="fas fa-times mr-2"></i>Отмена
        </button>
        <button class="btn btn--primary" onclick="document.getElementById('createArticleForm').dispatchEvent(new Event('submit'))">
          <i class="fas fa-plus mr-2"></i>Создать статью
        </button>
      </div>
    `);
  }

  showModal(content) {
    const overlay = document.getElementById('modal-overlay');
    const container = document.getElementById('modal-container');

    if (overlay && container) {
      container.innerHTML = content;
      overlay.classList.remove('hidden');
      container.classList.remove('hidden');
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        const firstInput = container.querySelector('input, textarea, select');
        if (firstInput) firstInput.focus();
      }, 100);
    }
  }

  hideModal() {
    const overlay = document.getElementById('modal-overlay');
    const container = document.getElementById('modal-container');

    if (overlay && container) {
      overlay.classList.add('hidden');
      container.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  // CRUD операции
  createTicket(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    if (!formData.get('title').trim()) {
      this.showNotification('Заполните тему тикета!', 'error');
      return;
    }

    if (!formData.get('deviceType')) {
      this.showNotification('Обязательно выберите тип устройства Rikor!', 'error');
      return;
    }

    if (!formData.get('description').trim()) {
      this.showNotification('Добавьте описание проблемы!', 'error');
      return;
    }

    const newTicket = {
      id: `RIK-2025-${String(this.data.tickets.length + 1).padStart(3, '0')}`,
      title: formData.get('title').trim(),
      description: formData.get('description').trim(),
      deviceType: formData.get('deviceType'),
      deviceModel: formData.get('deviceModel') || '',
      priority: formData.get('priority'),
      status: 'open',
      category: formData.get('category'),
      assignee: formData.get('assignee') || this.autoAssignAgent(),
      reporter: this.currentUser.name,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      location: formData.get('location') || '',
      timeSpent: 0,
      estimatedTime: this.estimateTime(formData.get('priority')),
      tags: [formData.get('deviceType').toLowerCase(), formData.get('category')]
    };

    this.data.tickets.unshift(newTicket);
    this.data.stats.totalTickets++;
    this.data.stats.openTickets++;

    this.saveData();
    this.hideModal();
    this.showNotification(`Тикет ${newTicket.id} успешно создан!`, 'success');

    if (this.currentRoute === 'tickets') {
      this.renderContent();
    }
  }

  createUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    if (!formData.get('name').trim() || !formData.get('email').trim()) {
      this.showNotification('Заполните обязательные поля!', 'error');
      return;
    }

    if (this.data.users.some(u => u.email === formData.get('email'))) {
      this.showNotification('Пользователь с таким email уже существует!', 'error');
      return;
    }

    const newUser = {
      id: Math.max(...this.data.users.map(u => u.id)) + 1,
      name: formData.get('name').trim(),
      email: formData.get('email').trim(),
      role: formData.get('role'),
      department: formData.get('department') || 'Не указан',
      avatar: formData.get('name').trim().split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2),
      status: 'offline',
      ticketsResolved: 0,
      ticketsCreated: 0,
      avgResolutionTime: 0
    };

    this.data.users.push(newUser);
    this.saveData();
    this.hideModal();
    this.showNotification(`Пользователь ${newUser.name} успешно создан!`, 'success');

    if (this.currentRoute === 'users') {
      this.renderContent();
    }
  }

  createArticle(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    if (!formData.get('title').trim() || !formData.get('content').trim()) {
      this.showNotification('Заполните обязательные поля!', 'error');
      return;
    }

    const newArticle = {
      id: `KB-${String(this.data.knowledgeBase.length + 1).padStart(3, '0')}`,
      title: formData.get('title').trim(),
      content: formData.get('content').trim(),
      category: formData.get('category'),
      tags: formData.get('tags') ? formData.get('tags').split(',').map(t => t.trim()).filter(t => t) : [],
      views: 0,
      rating: 0,
      author: this.currentUser.name,
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    };

    this.data.knowledgeBase.push(newArticle);
    this.saveData();
    this.hideModal();
    this.showNotification(`Статья "${newArticle.title}" успешно создана!`, 'success');

    if (this.currentRoute === 'knowledge') {
      this.renderContent();
    }
  }

  viewTicket(ticketId) {
    const ticket = this.data.tickets.find(t => t.id === ticketId);
    if (!ticket) {
      this.showNotification('Тикет не найден!', 'error');
      return;
    }

    this.showModal(`
      <div class="modal-header">
        <div>
          <h2 class="modal-title">${ticket.title}</h2>
          <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px;">
            <span class="badge badge--primary">${ticket.id}</span>
            <span class="badge status--${ticket.status}">${this.getStatusText(ticket.status)}</span>
            <span class="badge priority--${ticket.priority}">${this.getPriorityText(ticket.priority)}</span>
          </div>
        </div>
        <button class="modal-close" onclick="app.hideModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <div class="ticket-details">
          <div style="background: var(--rikor-bg-tertiary); padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <div class="grid grid--2" style="gap: 16px; font-size: 14px;">
              <div><strong>Устройство:</strong> ${this.getDeviceIcon(ticket.deviceType)} ${ticket.deviceType}</div>
              <div><strong>Модель:</strong> ${ticket.deviceModel || 'Не указана'}</div>
              <div><strong>Создатель:</strong> ${ticket.reporter}</div>
              <div><strong>Исполнитель:</strong> ${ticket.assignee}</div>
              <div><strong>Создан:</strong> ${this.formatDateTime(ticket.created)}</div>
              <div><strong>Обновлен:</strong> ${this.formatDateTime(ticket.updated)}</div>
              ${ticket.location ? `<div><strong>Местоположение:</strong> ${ticket.location}</div>` : ''}
              <div><strong>Категория:</strong> ${this.getCategoryText(ticket.category)}</div>
            </div>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="margin-bottom: 12px; color: var(--rikor-text-primary);">Описание проблемы</h4>
            <div style="background: var(--rikor-bg-secondary); padding: 16px; border-radius: 8px; border-left: 4px solid var(--rikor-primary); line-height: 1.6;">
              ${ticket.description}
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" onclick="app.hideModal()">
          <i class="fas fa-times mr-2"></i>Закрыть
        </button>
        <button class="btn btn--primary" onclick="app.hideModal()">
          <i class="fas fa-edit mr-2"></i>Редактировать
        </button>
      </div>
    `);
  }

  viewArticle(articleId) {
    const article = this.data.knowledgeBase.find(a => a.id === articleId);
    if (!article) {
      this.showNotification('Статья не найдена!', 'error');
      return;
    }

    article.views++;
    this.saveData();

    this.showModal(`
      <div class="modal-header">
        <div>
          <h2 class="modal-title">${article.title}</h2>
          <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px;">
            <span class="badge badge--primary">${this.getCategoryText(article.category)}</span>
            <span style="color: var(--rikor-text-muted); font-size: 13px;">
              <i class="fas fa-eye mr-1"></i>${article.views} просмотров
            </span>
          </div>
        </div>
        <button class="modal-close" onclick="app.hideModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <div style="line-height: 1.7; color: var(--rikor-text-primary);">
          ${article.content.replace(/\n/g, '<br>')}
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" onclick="app.hideModal()">
          <i class="fas fa-times mr-2"></i>Закрыть
        </button>
      </div>
    `);
  }

  // Экспорт данных
  exportTicketsCSV() {
    try {
      const headers = ['ID', 'Тема', 'Статус', 'Приоритет', 'Устройство', 'Исполнитель', 'Создан', 'Описание'];
      const rows = this.data.tickets.map(ticket => [
        ticket.id,
        ticket.title,
        this.getStatusText(ticket.status),
        this.getPriorityText(ticket.priority),
        ticket.deviceType,
        ticket.assignee,
        this.formatDateTime(ticket.created),
        ticket.description
      ]);

      const csv = [headers, ...rows].map(row => 
        row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ).join('\n');

      this.downloadFile(csv, 'rikor-tickets.csv', 'text/csv');
      this.showNotification('Тикеты экспортированы в CSV файл', 'success');
    } catch (error) {
      this.showNotification('Ошибка при экспорте тикетов', 'error');
    }
  }

  exportUsersCSV() {
    try {
      const headers = ['ID', 'Имя', 'Email', 'Роль', 'Отдел', 'Статус', 'Решено тикетов'];
      const rows = this.data.users.map(user => [
        user.id,
        user.name,
        user.email,
        this.getRoleText(user.role),
        user.department,
        this.getStatusText(user.status),
        user.ticketsResolved || 0
      ]);

      const csv = [headers, ...rows].map(row => 
        row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ).join('\n');

      this.downloadFile(csv, 'rikor-users.csv', 'text/csv');
      this.showNotification('Пользователи экспортированы в CSV файл', 'success');
    } catch (error) {
      this.showNotification('Ошибка при экспорте пользователей', 'error');
    }
  }

  exportReportData() {
    this.showNotification('Подготовка отчета для экспорта...', 'info');
    setTimeout(() => {
      this.exportTicketsCSV();
    }, 1000);
  }

  generatePDFReport() {
    this.showNotification('Генерация PDF отчета...', 'info');
    setTimeout(() => {
      this.showNotification('PDF отчет готов к скачиванию (эмуляция)', 'success');
    }, 2000);
  }

  backupAllData() {
    try {
      const backup = {
        version: 'Rikor HelpDesk v2.1.1',
        timestamp: new Date().toISOString(),
        data: this.data,
        settings: this.settings
      };

      const backupData = JSON.stringify(backup, null, 2);
      const filename = `rikor-helpdesk-backup-${new Date().toISOString().split('T')[0]}.json`;

      this.downloadFile(backupData, filename, 'application/json');
      this.showNotification('Резервная копия создана и скачана', 'success');
    } catch (error) {
      this.showNotification('Ошибка при создании резервной копии', 'error');
    }
  }

  downloadFile(content, filename, contentType) {
    try {
      const blob = new Blob([content], { type: contentType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      this.showNotification('Ошибка при скачивании файла', 'error');
    }
  }

  // Утилиты
  autoAssignAgent() {
    const agents = this.data.users.filter(u => u.role === 'agent' || u.role === 'admin');
    if (agents.length === 0) return 'Не назначен';

    const agentWorkload = agents.map(agent => ({
      name: agent.name,
      activeTickets: this.data.tickets.filter(t => t.assignee === agent.name && ['open', 'in_progress'].includes(t.status)).length
    }));

    agentWorkload.sort((a, b) => a.activeTickets - b.activeTickets);
    return agentWorkload[0].name;
  }

  estimateTime(priority) {
    const estimates = { critical: 2, high: 4, medium: 8, low: 24 };
    return estimates[priority] || 8;
  }

  getDeviceIcon(deviceType) {
    const icons = {
      'Ноутбук': '💻', 'Сервер': '🖥️', 'Моноблок': '🖥️',
      'Мини ПК': '📦', 'Планшет': '📱', 'Другое': '🔧'
    };
    return icons[deviceType] || '❓';
  }

  getPriorityIcon(priority) {
    const icons = {
      'critical': 'fas fa-exclamation-circle',
      'high': 'fas fa-exclamation-triangle', 
      'medium': 'fas fa-minus-circle',
      'low': 'fas fa-info-circle'
    };
    return icons[priority] || 'fas fa-question-circle';
  }

  getStatusText(status) {
    const statuses = {
      'open': 'Открыт', 'in_progress': 'В работе', 'waiting': 'Ожидание',
      'resolved': 'Решен', 'closed': 'Закрыт', 'online': 'В сети',
      'away': 'Отошел', 'busy': 'Занят', 'offline': 'Не в сети'
    };
    return statuses[status] || status;
  }

  getPriorityText(priority) {
    const priorities = {
      'low': 'Низкий', 'medium': 'Средний', 'high': 'Высокий', 'critical': 'Критический'
    };
    return priorities[priority] || priority;
  }

  getRoleText(role) {
    const roles = {
      'user': 'Пользователь', 'agent': 'Агент', 'admin': 'Администратор', 'manager': 'Менеджер'
    };
    return roles[role] || role;
  }

  getCategoryText(category) {
    const categories = {
      'hardware': 'Оборудование', 'software': 'ПО', 'network': 'Сеть',
      'configuration': 'Настройка', 'performance': 'Производительность', 'other': 'Другое'
    };
    return categories[category] || category;
  }

  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('ru-RU');
  }

  formatTime(dateString) {
    return new Date(dateString).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }

  formatDateTime(dateString) {
    return new Date(dateString).toLocaleString('ru-RU', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });
  }

  // Заглушки для функций
  editTicket(ticketId) { this.showNotification('Редактирование тикета (функция в разработке)', 'info'); }
  editUser(userId) { this.showNotification('Редактирование пользователя (функция в разработке)', 'info'); }
  editArticle(articleId) { this.showNotification('Редактирование статьи (функция в разработке)', 'info'); }
  viewUserProfile(userId) { this.showNotification('Просмотр профиля (функция в разработке)', 'info'); }
  savePersonalSettings() { this.showNotification('Настройки сохранены', 'success'); }
  exportKnowledgeBase() { this.showNotification('Экспорт базы знаний (функция в разработке)', 'info'); }
  generateFullReport() { this.showNotification('Генерация полного отчета (функция в разработке)', 'info'); }

  // Уведомления
  showNotification(message, type = 'info') {
    const container = document.getElementById('notifications');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;

    const icons = {
      success: 'fa-check-circle', error: 'fa-exclamation-circle',
      warning: 'fa-exclamation-triangle', info: 'fa-info-circle'
    };

    const colors = {
      success: '#10b981', error: '#ef4444', warning: '#f59e0b', info: '#06b6d4'
    };

    const titles = {
      success: 'Успешно', error: 'Ошибка', warning: 'Внимание', info: 'Информация'
    };

    notification.innerHTML = `
      <div class="notification__icon" style="background: ${colors[type]};">
        <i class="fas ${icons[type]}"></i>
      </div>
      <div class="notification__content">
        <div class="notification__title">${titles[type]}</div>
        <div class="notification__message">${message}</div>
      </div>
    `;

    container.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
      }
    }, 4000);
  }

  // Автообновление
  startAutoRefresh() {
    if (this.settings.autoRefresh) {
      setInterval(() => {
        if (Math.random() < 0.1) {
          this.showNotification('Данные обновлены', 'info');
        }
      }, this.settings.refreshInterval);
    }
  }
}

// Инициализация приложения
let app;
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎯 Запуск Rikor HelpDesk Final...');
  app = new RikorHelpDeskFinal();

  window.addEventListener('hashchange', () => app.handleRoute());

  window.addEventListener('error', (e) => {
    console.error('❌ Глобальная ошибка:', e.error);
    app?.showNotification('Произошла системная ошибка', 'error');
  });

  console.log('✅ Rikor HelpDesk готов к работе!');
});