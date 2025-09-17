// Rikor HelpDesk - Система технической поддержки
class RikorHelpDesk {
  constructor() {
    this.currentRoute = 'dashboard';
    this.currentUser = {
      id: 1,
      name: 'Петр Сидоров',
      email: 'p.sidorov@rikor.ru',
      role: 'admin',
      avatar: 'ПС'
    };
    
    // Данные системы с обновленными тикетами Rikor
    this.data = {
      tickets: [
        {
          id: "RIK-2025-001",
          title: "Не работает Wi-Fi на ноутбуке после обновления Windows",
          description: "После последнего обновления Windows 11 пропало Wi-Fi подключение",
          status: "open",
          priority: "high",
          category: "network",
          deviceType: "Ноутбук",
          assignee: "Иван Петров",
          reporter: "Анна Смирнова",
          created: "2025-09-17T09:30:00Z",
          updated: "2025-09-17T14:20:00Z",
          comments: [
            {author: "Анна Смирнова", text: "Проблема возникла сразу после перезагрузки", timestamp: "2025-09-17T09:30:00Z", type: "user"},
            {author: "Иван Петров", text: "Попробуйте откатить драйвер через Диспетчер устройств", timestamp: "2025-09-17T14:20:00Z", type: "agent"}
          ]
        },
        {
          id: "RIK-2025-002",
          title: "Зависание сервера при высокой нагрузке",
          description: "Сервер периодически зависает при нагрузке более 80%",
          status: "in_progress",
          priority: "critical",
          category: "performance",
          deviceType: "Сервер",
          assignee: "Петр Сидоров",
          reporter: "Михаил Кузнецов",
          created: "2025-09-16T15:20:00Z",
          updated: "2025-09-17T10:15:00Z",
          comments: []
        },
        {
          id: "RIK-2025-003",
          title: "Не включается мини ПК в переговорной",
          description: "Мини ПК не реагирует на нажатие кнопки питания",
          status: "waiting",
          priority: "medium",
          category: "hardware",
          deviceType: "Мини ПК",
          assignee: "Елена Новикова",
          reporter: "Сергей Волков",
          created: "2025-09-17T11:45:00Z",
          updated: "2025-09-17T12:00:00Z",
          comments: []
        },
        {
          id: "RIK-2025-004",
          title: "Проблемы с подключением корпоративного телефона",
          description: "IP-телефон не регистрируется в системе",
          status: "resolved",
          priority: "low",
          category: "network",
          deviceType: "Телефон",
          assignee: "Алексей Морозов",
          reporter: "Ольга Иванова",
          created: "2025-09-15T14:30:00Z",
          updated: "2025-09-16T16:45:00Z",
          comments: []
        },
        {
          id: "RIK-2025-005", 
          title: "Настройка принтера в отделе кадров",
          description: "Необходимо настроить сетевой принтер для печати документов",
          status: "open",
          priority: "low",
          category: "hardware",
          deviceType: "Другое",
          assignee: "Иван Петров",
          reporter: "Мария Соколова",
          created: "2025-09-17T13:15:00Z",
          updated: "2025-09-17T13:15:00Z",
          comments: []
        }
      ],
      deviceTypes: [
        {id: "laptop", name: "Ноутбук", icon: "💻"},
        {id: "server", name: "Сервер", icon: "🖥️"}, 
        {id: "minipc", name: "Мини ПК", icon: "📦"},
        {id: "phone", name: "Телефон", icon: "📞"},
        {id: "other", name: "Другое", icon: "🔧"}
      ],
      users: [
        {id: 1, name: "Петр Сидоров", email: "p.sidorov@rikor.ru", role: "admin", department: "IT Support", avatar: "ПС", status: "online", joinDate: "2023-01-15", ticketsResolved: 156, avgRating: 4.8},
        {id: 2, name: "Иван Петров", email: "i.petrov@rikor.ru", role: "agent", department: "IT Support", avatar: "ИП", status: "online", joinDate: "2023-03-10", ticketsResolved: 89, avgRating: 4.6},
        {id: 3, name: "Елена Новикова", email: "e.novikova@rikor.ru", role: "agent", department: "IT Support", avatar: "ЕН", status: "away", joinDate: "2023-06-20", ticketsResolved: 134, avgRating: 4.9},
        {id: 4, name: "Анна Смирнова", email: "a.smirnova@rikor.ru", role: "user", department: "Marketing", avatar: "АС", status: "offline", joinDate: "2024-01-12", ticketsCreated: 23}
      ],
      knowledgeBase: [
        {id: 1, title: "Настройка Wi-Fi на ноутбуках Rikor", category: "Ноутбук", content: "Пошаговая инструкция по настройке беспроводного подключения на корпоративных ноутбуках", views: 287, helpful: 45, tags: ["ноутбук", "wifi"], lastUpdated: "2025-09-10"},
        {id: 2, title: "Обслуживание серверов Rikor", category: "Сервер", content: "Рекомендации по обслуживанию и мониторингу серверного оборудования", views: 156, helpful: 28, tags: ["сервер", "мониторинг"], lastUpdated: "2025-09-05"},
        {id: 3, title: "Настройка мини ПК в переговорных", category: "Мини ПК", content: "Инструкция по установке и настройке мини ПК в переговорных комнатах", views: 98, helpful: 19, tags: ["мини пк", "переговорная"], lastUpdated: "2025-09-12"},
        {id: 4, title: "Подключение IP-телефонов", category: "Телефон", content: "Пошаговое руководство по подключению и настройке IP-телефонов", views: 234, helpful: 41, tags: ["телефон", "ip"], lastUpdated: "2025-09-08"},
        {id: 5, title: "Принтеры и периферия", category: "Другое", content: "Настройка принтеров и другого периферийного оборудования", views: 178, helpful: 33, tags: ["принтер", "периферия"], lastUpdated: "2025-09-14"}
      ],
      categories: [
        {id: "network", name: "Сеть", color: "#3b82f6", icon: "🌐"},
        {id: "hardware", name: "Оборудование", color: "#ef4444", icon: "🔧"},
        {id: "software", name: "ПО", color: "#10b981", icon: "💿"},
        {id: "performance", name: "Производительность", color: "#f59e0b", icon: "⚡"}
      ],
      stats: {
        totalTickets: 156, 
        openTickets: 23, 
        inProgressTickets: 8, 
        resolvedTickets: 125,
        avgResponseTime: "1.2", 
        avgResolutionTime: "4.8", 
        customerSatisfaction: 96.2,
        activeAgents: 12, 
        todayTickets: 23, 
        weeklyTrend: [12, 18, 15, 22, 19, 25, 23],
        deviceStats: {
          "Ноутбук": 45,
          "Сервер": 12,
          "Мини ПК": 8,
          "Телефон": 15,
          "Другое": 76
        }
      }
    };

    this.filteredTickets = [...this.data.tickets];
    this.currentTicket = null;
    this.charts = {};
    this.formValidation = {};
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.handleRoute();
    this.updateBreadcrumb();
  }

  bindEvents() {
    // Навигация по боковой панели
    document.addEventListener('click', (e) => {
      // Навигация
      if (e.target.closest('.sidebar__link')) {
        e.preventDefault();
        const link = e.target.closest('.sidebar__link');
        const route = link.dataset.route;
        if (route) {
          this.navigate(route);
        }
      }

      // Кнопки создания тикета
      if ((e.target.textContent && e.target.textContent.includes('Создать тикет')) || 
          e.target.classList.contains('create-ticket-btn')) {
        e.preventDefault();
        this.openCreateTicketModal();
      }

      // Просмотр тикета
      if (e.target.closest('[data-ticket-id]') || 
          (e.target.textContent === 'Открыть' && e.target.classList.contains('btn'))) {
        e.preventDefault();
        let ticketId;
        if (e.target.closest('[data-ticket-id]')) {
          ticketId = e.target.closest('[data-ticket-id]').dataset.ticketId;
        } else {
          const row = e.target.closest('tr');
          if (row) {
            const idCell = row.querySelector('td strong');
            if (idCell) {
              ticketId = idCell.textContent;
            }
          }
        }
        if (ticketId) {
          this.viewTicket(ticketId);
        }
      }

      // Просмотр статьи
      if (e.target.closest('[data-article-id]')) {
        e.preventDefault();
        const articleId = parseInt(e.target.closest('[data-article-id]').dataset.articleId);
        if (articleId) {
          this.viewArticle(articleId);
        }
      }

      // Закрытие модальных окон
      if (e.target.classList.contains('modal__close') || e.target.id === 'modal-backdrop') {
        this.closeModal();
      }

      // Кнопки в модальных окнах
      if (e.target.classList.contains('add-comment-btn') || 
          e.target.textContent === 'Добавить комментарий') {
        const ticketId = this.currentTicket?.id;
        if (ticketId) {
          this.addComment(ticketId);
        }
      }

      if (e.target.classList.contains('helpful-btn') || 
          e.target.textContent.includes('Полезно')) {
        const modal = e.target.closest('.modal');
        if (modal && modal.id === 'article-modal') {
          const titleElement = modal.querySelector('.modal__title');
          if (titleElement) {
            const title = titleElement.textContent;
            const article = this.data.knowledgeBase.find(a => a.title === title);
            if (article) {
              this.markArticleHelpful(article.id);
            }
          }
        }
      }

      // Переключение меню и уведомлений
      if (e.target.classList.contains('notification-btn') || e.target.textContent === '🔔') {
        this.toggleNotifications();
      }

      if (e.target.classList.contains('user-menu-btn') || e.target.closest('.user-menu-btn')) {
        this.toggleUserMenu();
      }

      if (e.target.classList.contains('mobile-menu-toggle')) {
        this.toggleSidebar();
      }

      // Экспорт тикетов
      if (e.target.textContent && e.target.textContent.includes('Экспорт')) {
        this.exportTickets();
      }

      // Навигация к тикетам из dashboard
      if (e.target.classList.contains('tickets-nav-btn')) {
        this.navigate('tickets');
      }
    });

    // Глобальный поиск
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
      globalSearch.addEventListener('input', (e) => this.handleGlobalSearch(e.target.value));
    }

    // Закрытие модальных окон по Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });

    // Формы
    document.addEventListener('submit', (e) => {
      if (e.target.id === 'create-ticket-form') {
        this.handleFormSubmit(e);
      }
    });
    
    // Валидация полей в реальном времени
    document.addEventListener('input', (e) => {
      if (e.target.closest('#create-ticket-form')) {
        this.validateField(e.target);
      }
    });

    document.addEventListener('change', (e) => {
      if (e.target.closest('#create-ticket-form')) {
        this.validateField(e.target);
      }
    });
  }

  navigate(route) {
    console.log('Навигация к:', route);
    this.currentRoute = route;
    
    // Обновляем активную ссылку
    document.querySelectorAll('.sidebar__link').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.route === route) {
        link.classList.add('active');
      }
    });
    
    this.handleRoute();
    this.updateBreadcrumb();
    
    // Закрываем мобильное меню
    document.querySelector('.sidebar')?.classList.remove('open');

    // Закрываем все открытые меню
    document.getElementById('user-menu-dropdown')?.classList.add('hidden');
    document.getElementById('notifications-panel')?.classList.add('hidden');
  }

  handleRoute() {
    const routerView = document.getElementById('router-view');
    
    switch(this.currentRoute) {
      case 'dashboard':
        routerView.innerHTML = this.renderDashboard();
        setTimeout(() => this.initDashboardCharts(), 100);
        break;
      case 'tickets':
        routerView.innerHTML = this.renderTickets();
        setTimeout(() => this.bindTicketFilters(), 100);
        break;
      case 'knowledge':
        routerView.innerHTML = this.renderKnowledgeBase();
        setTimeout(() => this.bindKnowledgeSearch(), 100);
        break;
      case 'reports':
        routerView.innerHTML = this.renderReports();
        setTimeout(() => this.initReportsCharts(), 100);
        break;
      case 'users':
        routerView.innerHTML = this.renderUsers();
        break;
      case 'settings':
        routerView.innerHTML = this.renderSettings();
        break;
      case 'profile':
        routerView.innerHTML = this.renderProfile();
        break;
    }
  }

  renderDashboard() {
    const stats = this.calculateStats();
    
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Панель управления</h1>
          <p class="page-subtitle">Обзор системы технической поддержки Rikor</p>
        </div>
        <button class="btn btn--primary create-ticket-btn">
          + Создать тикет
        </button>
      </div>

      <div class="stats-grid">
        <div class="stat-card stat-card--primary">
          <div class="stat-card__header">
            <div class="stat-card__icon" style="--icon-color: 33, 128, 141;">📊</div>
          </div>
          <div class="stat-card__value">${this.data.stats.totalTickets.toLocaleString()}</div>
          <div class="stat-card__label">Всего тикетов</div>
          <div class="stat-card__change stat-card__change--positive">+12% за неделю</div>
        </div>

        <div class="stat-card stat-card--warning">
          <div class="stat-card__header">
            <div class="stat-card__icon" style="--icon-color: 245, 158, 11;">🎫</div>
          </div>
          <div class="stat-card__value">${this.data.stats.openTickets}</div>
          <div class="stat-card__label">Открытых тикетов</div>
          <div class="stat-card__change stat-card__change--negative">-5% за неделю</div>
        </div>

        <div class="stat-card stat-card--success">
          <div class="stat-card__header">
            <div class="stat-card__icon" style="--icon-color: 16, 185, 129;">⏱️</div>
          </div>
          <div class="stat-card__value">${this.data.stats.avgResponseTime}ч</div>
          <div class="stat-card__label">Среднее время ответа</div>
          <div class="stat-card__change stat-card__change--positive">-0.3ч за неделю</div>
        </div>

        <div class="stat-card stat-card--primary">
          <div class="stat-card__header">
            <div class="stat-card__icon" style="--icon-color: 33, 128, 141;">😊</div>
          </div>
          <div class="stat-card__value">${this.data.stats.customerSatisfaction}%</div>
          <div class="stat-card__label">Удовлетворенность</div>
          <div class="stat-card__change stat-card__change--positive">+2.1% за месяц</div>
        </div>
      </div>

      <!-- Статистика по типам устройств -->
      <div class="card" style="margin-bottom: var(--space-32);">
        <div class="card__body">
          <h3 style="margin-bottom: var(--space-16);">Статистика по типам устройств</h3>
          <div class="device-stats-grid">
            ${Object.entries(this.data.stats.deviceStats).map(([deviceType, count]) => `
              <div class="device-stat">
                <div class="device-stat__icon">${this.getDeviceIcon(deviceType)}</div>
                <div class="device-stat__count">${count}</div>
                <div class="device-stat__label">${deviceType}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="chart-container">
        <div class="chart-header">
          <h3 class="chart-title">Динамика тикетов за неделю</h3>
          <div>
            <button class="btn btn--secondary btn--sm">7 дней</button>
            <button class="btn btn--secondary btn--sm">30 дней</button>
          </div>
        </div>
        <canvas id="weeklyChart"></canvas>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-top: 24px;">
        <div class="table-container">
          <div class="table-header">
            <h3 class="table-title">Последние тикеты</h3>
            <button class="btn btn--secondary btn--sm tickets-nav-btn">Все тикеты</button>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Заголовок</th>
                <th>Устройство</th>
                <th>Статус</th>
                <th>Приоритет</th>
                <th>Создан</th>
              </tr>
            </thead>
            <tbody>
              ${this.data.tickets.slice(0, 5).map(ticket => `
                <tr data-ticket-id="${ticket.id}">
                  <td><strong>${ticket.id}</strong></td>
                  <td>
                    <span class="text-primary" style="cursor: pointer;">
                      ${ticket.title.length > 40 ? ticket.title.substring(0, 40) + '...' : ticket.title}
                    </span>
                  </td>
                  <td>
                    <span class="device-badge">
                      ${this.getDeviceIcon(ticket.deviceType)} ${ticket.deviceType}
                    </span>
                  </td>
                  <td><span class="badge badge--${this.getStatusClass(ticket.status)}">${this.getStatusName(ticket.status)}</span></td>
                  <td><span class="badge badge--${this.getPriorityClass(ticket.priority)}">${this.getPriorityName(ticket.priority)}</span></td>
                  <td>${this.formatDate(ticket.created)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="table-container">
          <div class="table-header">
            <h3 class="table-title">Активные агенты</h3>
          </div>
          <div style="padding: 16px;">
            ${this.data.users.filter(u => u.role === 'agent').slice(0, 5).map(agent => `
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                <div class="sidebar__avatar" style="width: 32px; height: 32px; font-size: 12px;">${agent.avatar}</div>
                <div style="flex: 1;">
                  <div style="font-weight: 500; font-size: 14px;">${agent.name}</div>
                  <div style="font-size: 12px; color: var(--color-text-secondary);">
                    ${agent.ticketsResolved || 0} тикетов • ⭐ ${agent.avgRating || 0}
                  </div>
                </div>
                <div class="badge ${agent.status === 'online' ? 'badge--success' : 'badge--gray'}">
                  ${agent.status === 'online' ? 'Онлайн' : 'Офлайн'}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderTickets() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Управление тикетами</h1>
          <p class="page-subtitle">Всего тикетов: ${this.filteredTickets.length}</p>
        </div>
        <div class="flex gap-8">
          <button class="btn btn--secondary export-btn">📊 Экспорт</button>
          <button class="btn btn--primary create-ticket-btn">+ Создать тикет</button>
        </div>
      </div>

      <div class="filters">
        <div class="filters__group">
          <span class="filters__label">Тип устройства:</span>
          <select id="deviceTypeFilter" class="form-control filter-select device-filter">
            <option value="">Все устройства</option>
            <option value="Ноутбук">💻 Ноутбук</option>
            <option value="Сервер">🖥️ Сервер</option>
            <option value="Мини ПК">📦 Мини ПК</option>
            <option value="Телефон">📞 Телефон</option>
            <option value="Другое">🔧 Другое</option>
          </select>
        </div>

        <div class="filters__group">
          <span class="filters__label">Статус:</span>
          <select id="statusFilter" class="form-control filter-select">
            <option value="">Все статусы</option>
            <option value="open">Открыт</option>
            <option value="in_progress">В работе</option>
            <option value="waiting">Ожидание</option>
            <option value="resolved">Решен</option>
          </select>
        </div>
        
        <div class="filters__group">
          <span class="filters__label">Приоритет:</span>
          <select id="priorityFilter" class="form-control filter-select">
            <option value="">Все приоритеты</option>
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
            <option value="critical">Критический</option>
          </select>
        </div>

        <div class="filters__group">
          <span class="filters__label">Категория:</span>
          <select id="categoryFilter" class="form-control filter-select">
            <option value="">Все категории</option>
            ${this.data.categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('')}
          </select>
        </div>

        <div class="filters__group">
          <span class="filters__label">Поиск:</span>
          <input type="text" id="ticketSearch" class="form-control filter-input" placeholder="Поиск по заголовку...">
        </div>
      </div>

      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Заголовок</th>
              <th>Устройство</th>
              <th>Статус</th>
              <th>Приоритет</th>
              <th>Категория</th>
              <th>Исполнитель</th>
              <th>Создан</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody id="ticketsTableBody">
            ${this.renderTicketsTable()}
          </tbody>
        </table>
      </div>
    `;
  }

  renderTicketsTable() {
    return this.filteredTickets.map(ticket => `
      <tr>
        <td><strong>${ticket.id}</strong></td>
        <td>
          <span class="text-primary" style="cursor: pointer;" data-ticket-id="${ticket.id}">
            ${ticket.title.length > 50 ? ticket.title.substring(0, 50) + '...' : ticket.title}
          </span>
        </td>
        <td>
          <span class="device-badge">
            ${this.getDeviceIcon(ticket.deviceType)} ${ticket.deviceType}
          </span>
        </td>
        <td><span class="badge badge--${this.getStatusClass(ticket.status)}">${this.getStatusName(ticket.status)}</span></td>
        <td><span class="badge badge--${this.getPriorityClass(ticket.priority)}">${this.getPriorityName(ticket.priority)}</span></td>
        <td>${this.getCategoryName(ticket.category)}</td>
        <td>${ticket.assignee || '<span class="text-muted">Не назначен</span>'}</td>
        <td>${this.formatDate(ticket.created)}</td>
        <td>
          <div class="flex gap-4">
            <button class="btn btn--sm btn--primary view-ticket-btn" data-ticket="${ticket.id}">Открыть</button>
            <button class="btn btn--sm btn--secondary">✏️</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  renderKnowledgeBase() {
    const categories = [...new Set(this.data.knowledgeBase.map(article => article.category))];
    
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">База знаний</h1>
          <p class="page-subtitle">Статьи и руководства по типам устройств</p>
        </div>
        <button class="btn btn--primary">+ Создать статью</button>
      </div>

      <div style="margin-bottom: 32px;">
        <div style="position: relative; max-width: 500px;">
          <input type="text" id="knowledgeSearch" class="form-control kb-search-input" placeholder="🔍 Поиск в базе знаний..." style="padding-left: 40px;">
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px;">
        ${categories.map(category => `
          <div class="card">
            <div class="card__body">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                <div style="width: 40px; height: 40px; border-radius: 8px; background: var(--color-bg-1); display: flex; align-items: center; justify-content: center; font-size: 18px;">
                  ${this.getDeviceIcon(category)}
                </div>
                <h3 style="margin: 0; color: var(--color-text);">${category}</h3>
              </div>
              
              <div style="space-y: 8px;">
                ${this.data.knowledgeBase.filter(article => article.category === category).map(article => `
                  <div class="kb-article-item" style="padding: 12px; border-radius: 6px; border: 1px solid var(--color-border); margin-bottom: 8px; cursor: pointer; transition: all 0.2s ease;" 
                       data-article-id="${article.id}">
                    <div style="font-weight: 500; color: var(--color-primary); margin-bottom: 4px;">
                      ${article.title}
                    </div>
                    <div style="font-size: 12px; color: var(--color-text-secondary); display: flex; gap: 16px;">
                      <span>👁️ ${article.views} просмотров</span>
                      <span>👍 ${article.helpful} полезно</span>
                      <span>📅 ${this.formatDate(article.lastUpdated)}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderReports() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Отчеты и аналитика</h1>
          <p class="page-subtitle">Анализ производительности по типам устройств</p>
        </div>
        <div class="flex gap-8">
          <button class="btn btn--secondary">📊 Экспорт в Excel</button>
          <button class="btn btn--primary">📈 Создать отчет</button>
        </div>
      </div>

      <div class="stats-grid" style="margin-bottom: 32px;">
        <div class="stat-card stat-card--success">
          <div class="stat-card__header">
            <div class="stat-card__icon" style="--icon-color: 16, 185, 129;">✅</div>
          </div>
          <div class="stat-card__value">${this.data.stats.resolvedTickets}</div>
          <div class="stat-card__label">Решенных тикетов</div>
          <div class="stat-card__change stat-card__change--positive">+18% за месяц</div>
        </div>

        <div class="stat-card stat-card--primary">
          <div class="stat-card__header">
            <div class="stat-card__icon" style="--icon-color: 33, 128, 141;">⏱️</div>
          </div>
          <div class="stat-card__value">${this.data.stats.avgResolutionTime}ч</div>
          <div class="stat-card__label">Среднее время решения</div>
          <div class="stat-card__change stat-card__change--positive">-0.5ч за месяц</div>
        </div>

        <div class="stat-card stat-card--warning">
          <div class="stat-card__header">
            <div class="stat-card__icon" style="--icon-color: 245, 158, 11;">👥</div>
          </div>
          <div class="stat-card__value">${this.data.stats.activeAgents}</div>
          <div class="stat-card__label">Активных агентов</div>
          <div class="stat-card__change stat-card__change--positive">+2 за неделю</div>
        </div>

        <div class="stat-card stat-card--primary">
          <div class="stat-card__header">
            <div class="stat-card__icon" style="--icon-color: 33, 128, 141;">📈</div>
          </div>
          <div class="stat-card__value">${this.data.stats.todayTickets}</div>
          <div class="stat-card__label">Тикетов сегодня</div>
          <div class="stat-card__change stat-card__change--positive">+5 с утра</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 32px;">
        <div class="chart-container">
          <div class="chart-header">
            <h3 class="chart-title">Тикеты по типам устройств</h3>
          </div>
          <canvas id="deviceChart"></canvas>
        </div>

        <div class="chart-container">
          <div class="chart-header">
            <h3 class="chart-title">Приоритеты</h3>
          </div>
          <canvas id="prioritiesChart"></canvas>
        </div>
      </div>

      <div class="chart-container">
        <div class="chart-header">
          <h3 class="chart-title">Производительность агентов</h3>
        </div>
        <canvas id="agentsChart"></canvas>
      </div>
    `;
  }

  renderUsers() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Пользователи</h1>
          <p class="page-subtitle">Управление пользователями системы Rikor</p>
        </div>
        <button class="btn btn--primary">+ Добавить пользователя</button>
      </div>

      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Пользователь</th>
              <th>Email</th>
              <th>Роль</th>
              <th>Отдел</th>
              <th>Статус</th>
              <th>Статистика</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            ${this.data.users.map(user => `
              <tr>
                <td>
                  <div class="flex items-center gap-12">
                    <div class="sidebar__avatar" style="width: 36px; height: 36px;">${user.avatar}</div>
                    <div>
                      <div style="font-weight: 500;">${user.name}</div>
                      <div style="font-size: 12px; color: var(--color-text-secondary);">
                        Присоединился ${this.formatDate(user.joinDate)}
                      </div>
                    </div>
                  </div>
                </td>
                <td>${user.email}</td>
                <td>
                  <span class="badge ${user.role === 'admin' ? 'badge--danger' : user.role === 'agent' ? 'badge--success' : 'badge--gray'}">
                    ${user.role === 'admin' ? 'Администратор' : user.role === 'agent' ? 'Агент' : 'Пользователь'}
                  </span>
                </td>
                <td>${user.department}</td>
                <td>
                  <span class="badge ${user.status === 'online' ? 'badge--success' : user.status === 'away' ? 'badge--warning' : 'badge--gray'}">
                    ${user.status === 'online' ? 'Онлайн' : user.status === 'away' ? 'Отошел' : 'Офлайн'}
                  </span>
                </td>
                <td>
                  ${user.role === 'agent' ? `
                    <div style="font-size: 12px;">
                      <div>Решено: ${user.ticketsResolved || 0}</div>
                      <div>Рейтинг: ⭐ ${user.avgRating || 0}</div>
                    </div>
                  ` : user.role === 'user' ? `
                    <div style="font-size: 12px;">
                      Создано: ${user.ticketsCreated || 0}
                    </div>
                  ` : ''}
                </td>
                <td>
                  <div class="flex gap-4">
                    <button class="btn btn--sm btn--secondary">✏️ Изменить</button>
                    <button class="btn btn--sm btn--danger">🗑️</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  renderSettings() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Настройки системы</h1>
          <p class="page-subtitle">Конфигурация Rikor HelpDesk</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px;">
        <div class="card">
          <div class="card__body">
            <h3 style="margin-bottom: 16px;">Типы устройств</h3>
            <div style="space-y: 12px;">
              ${this.data.deviceTypes.map(device => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border-radius: 6px; border: 1px solid var(--color-border);">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 16px;">${device.icon}</span>
                    <span>${device.name}</span>
                  </div>
                  <button class="btn btn--sm btn--secondary">Изменить</button>
                </div>
              `).join('')}
            </div>
            <button class="btn btn--secondary mt-16" style="width: 100%;">+ Добавить тип устройства</button>
          </div>
        </div>

        <div class="card">
          <div class="card__body">
            <h3 style="margin-bottom: 16px;">Категории тикетов</h3>
            <div style="space-y: 12px;">
              ${this.data.categories.map(cat => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border-radius: 6px; border: 1px solid var(--color-border);">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 16px; height: 16px; border-radius: 4px; background: ${cat.color};"></div>
                    <span>${cat.icon} ${cat.name}</span>
                  </div>
                  <button class="btn btn--sm btn--secondary">Изменить</button>
                </div>
              `).join('')}
            </div>
            <button class="btn btn--secondary mt-16" style="width: 100%;">+ Добавить категорию</button>
          </div>
        </div>

        <div class="card">
          <div class="card__body">
            <h3 style="margin-bottom: 16px;">SLA настройки</h3>
            <div style="space-y: 16px;">
              <div>
                <label class="form-label">Время первого ответа (часы)</label>
                <input type="number" class="form-control" value="2">
              </div>
              <div>
                <label class="form-label">Время решения (часы)</label>
                <input type="number" class="form-control" value="24">
              </div>
              <div>
                <label class="form-label">Критические тикеты (часы)</label>
                <input type="number" class="form-control" value="1">
              </div>
            </div>
            <button class="btn btn--primary mt-16" style="width: 100%;">Сохранить настройки</button>
          </div>
        </div>

        <div class="card">
          <div class="card__body">
            <h3 style="margin-bottom: 16px;">Уведомления</h3>
            <div style="space-y: 12px;">
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" checked>
                <span>Email уведомления о новых тикетах</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" checked>
                <span>SMS для критических тикетов</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox">
                <span>Ежедневные отчеты</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" checked>
                <span>Уведомления в браузере</span>
              </label>
            </div>
            <button class="btn btn--primary mt-16" style="width: 100%;">Сохранить настройки</button>
          </div>
        </div>
      </div>
    `;
  }

  renderProfile() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Мой профиль</h1>
          <p class="page-subtitle">Управление личными данными в системе Rikor</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 32px;">
        <div class="card">
          <div class="card__body" style="text-align: center;">
            <div class="sidebar__avatar" style="width: 80px; height: 80px; font-size: 32px; margin: 0 auto 16px;">ПС</div>
            <h3>${this.currentUser.name}</h3>
            <p style="color: var(--color-text-secondary); margin-bottom: 16px;">${this.currentUser.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
            <div class="badge badge--success">Онлайн</div>
            <button class="btn btn--secondary" style="width: 100%; margin-top: 16px;">Изменить аватар</button>
          </div>
        </div>

        <div class="card">
          <div class="card__body">
            <h3 style="margin-bottom: 24px;">Личная информация</h3>
            <form style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label">Имя</label>
                <input type="text" class="form-control" value="${this.currentUser.name}">
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" value="${this.currentUser.email}">
              </div>
              <div class="form-group">
                <label class="form-label">Телефон</label>
                <input type="tel" class="form-control" value="+7 (999) 123-45-67">
              </div>
              <div class="form-group">
                <label class="form-label">Отдel</label>
                <input type="text" class="form-control" value="IT Support">
              </div>
              <div class="form-group" style="grid-column: 1 / -1;">
                <label class="form-label">О себе</label>
                <textarea class="form-control" rows="3">Системный администратор компании Rikor с опытом работы более 5 лет. Специализируюсь на решении технических вопросов и управлении IT-инфраструктурой.</textarea>
              </div>
            </form>
            <button class="btn btn--primary mt-16">Сохранить изменения</button>
          </div>
        </div>
      </div>
    `;
  }

  // Модальные окна
  openCreateTicketModal() {
    const modal = document.getElementById('create-ticket-modal');
    const backdrop = document.getElementById('modal-backdrop');
    
    if (modal && backdrop) {
      modal.classList.remove('hidden');
      backdrop.classList.remove('hidden');
      
      // Заполняем категории
      const categorySelect = document.getElementById('ticket-category');
      if (categorySelect) {
        categorySelect.innerHTML = '<option value="">Выберите категорию</option>' +
          this.data.categories.map(cat => `<option value="${cat.id}">${cat.icon} ${cat.name}</option>`).join('');
      }

      // Очищаем форму и ошибки
      this.clearFormErrors();
      const form = document.getElementById('create-ticket-form');
      if (form) {
        form.reset();
      }
    }
  }

  viewTicket(ticketId) {
    const ticket = this.data.tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    this.currentTicket = ticket;
    const modal = document.getElementById('ticket-modal');
    const body = document.getElementById('ticket-modal-body');
    const footer = document.getElementById('ticket-modal-footer');

    document.getElementById('ticket-modal-title').textContent = `${ticket.id}: ${ticket.title}`;

    body.innerHTML = `
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 24px;">
        <div>
          <h4 style="margin-bottom: 12px;">Описание</h4>
          <p style="line-height: 1.6; margin-bottom: 24px;">${ticket.description}</p>
        </div>
        
        <div>
          <div class="card">
            <div class="card__body">
              <h5 style="margin-bottom: 12px;">Информация</h5>
              <div style="space-y: 8px; font-size: 14px;">
                <div><strong>Устройство:</strong> 
                  <span class="device-badge">
                    ${this.getDeviceIcon(ticket.deviceType)} ${ticket.deviceType}
                  </span>
                </div>
                <div><strong>Статус:</strong> <span class="badge badge--${this.getStatusClass(ticket.status)}">${this.getStatusName(ticket.status)}</span></div>
                <div><strong>Приоритет:</strong> <span class="badge badge--${this.getPriorityClass(ticket.priority)}">${this.getPriorityName(ticket.priority)}</span></div>
                <div><strong>Категория:</strong> ${this.getCategoryName(ticket.category)}</div>
                <div><strong>Исполнитель:</strong> ${ticket.assignee || 'Не назначен'}</div>
                <div><strong>Заявитель:</strong> ${ticket.reporter}</div>
                <div><strong>Создан:</strong> ${this.formatDate(ticket.created)}</div>
                <div><strong>Обновлен:</strong> ${this.formatDate(ticket.updated)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      ${ticket.comments && ticket.comments.length > 0 ? `
        <div style="margin-top: 32px;">
          <h4 style="margin-bottom: 16px;">Комментарии (${ticket.comments.length})</h4>
          ${ticket.comments.map(comment => `
            <div style="display: flex; gap: 12px; margin-bottom: 16px; padding: 16px; background: var(--color-bg-1); border-radius: 8px;">
              <div class="sidebar__avatar" style="width: 36px; height: 36px; flex-shrink: 0;">${this.getAvatarFromName(comment.author)}</div>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <strong>${comment.author}</strong>
                  <span style="font-size: 12px; color: var(--color-text-secondary);">${this.formatDate(comment.timestamp)}</span>
                </div>
                <p style="line-height: 1.5; margin: 0;">${comment.text}</p>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div style="margin-top: 24px;">
        <h5 style="margin-bottom: 8px;">Добавить комментарий</h5>
        <textarea id="new-comment" class="form-control" rows="3" placeholder="Введите комментарий..."></textarea>
      </div>
    `;

    footer.innerHTML = `
      <div style="display: flex; gap: 8px; align-items: center; flex: 1;">
        <select class="form-control" style="width: auto;">
          <option value="open" ${ticket.status === 'open' ? 'selected' : ''}>Открыт</option>
          <option value="in_progress" ${ticket.status === 'in_progress' ? 'selected' : ''}>В работе</option>
          <option value="waiting" ${ticket.status === 'waiting' ? 'selected' : ''}>Ожидание</option>
          <option value="resolved" ${ticket.status === 'resolved' ? 'selected' : ''}>Решен</option>
        </select>
        <button class="btn btn--secondary">Обновить статус</button>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn--secondary close-modal-btn">Закрыть</button>
        <button class="btn btn--success add-comment-btn">Добавить комментарий</button>
      </div>
    `;

    modal.classList.remove('hidden');
    document.getElementById('modal-backdrop').classList.remove('hidden');
  }

  viewArticle(articleId) {
    const article = this.data.knowledgeBase.find(a => a.id === articleId);
    if (!article) return;

    const modal = document.getElementById('article-modal');
    const body = document.getElementById('article-modal-body');
    const footer = document.getElementById('article-modal-footer');

    document.getElementById('article-modal-title').textContent = article.title;

    body.innerHTML = `
      <div style="margin-bottom: 16px; padding: 12px; background: var(--color-bg-1); border-radius: 8px; font-size: 14px; color: var(--color-text-secondary);">
        <div style="display: flex; gap: 16px;">
          <span>${this.getDeviceIcon(article.category)} ${article.category}</span>
          <span>👁️ ${article.views} просмотров</span>
          <span>👍 ${article.helpful} полезно</span>
          <span>📅 Обновлено ${this.formatDate(article.lastUpdated)}</span>
        </div>
      </div>
      
      <div style="line-height: 1.8; font-size: 16px;">
        ${article.content}
      </div>

      ${article.tags ? `
        <div style="margin-top: 24px;">
          <strong>Теги:</strong>
          ${article.tags.map(tag => `<span class="badge badge--gray" style="margin-left: 4px;">${tag}</span>`).join('')}
        </div>
      ` : ''}
    `;

    footer.innerHTML = `
      <div style="flex: 1;">
        <span style="color: var(--color-text-secondary); font-size: 14px;">Была ли эта статья полезна?</span>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn--secondary close-modal-btn">Закрыть</button>
        <button class="btn btn--success helpful-btn">👍 Полезно</button>
      </div>
    `;

    modal.classList.remove('hidden');
    document.getElementById('modal-backdrop').classList.remove('hidden');

    // Увеличиваем счетчик просмотров
    article.views++;
  }

  closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.classList.add('hidden');
    });
    const backdrop = document.getElementById('modal-backdrop');
    if (backdrop) {
      backdrop.classList.add('hidden');
    }
  }

  // Валидация формы
  validateField(field) {
    if (!field.name) return true;
    
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Очищаем предыдущую ошибку
    field.classList.remove('error');
    const errorElement = document.getElementById(`${fieldName}-error`);
    if (errorElement) {
      errorElement.classList.remove('visible');
      errorElement.textContent = '';
    }

    // Валидация по типу поля
    switch (fieldName) {
      case 'title':
        if (!fieldValue) {
          isValid = false;
          errorMessage = 'Заголовок тикета обязателен';
        } else if (fieldValue.length < 10) {
          isValid = false;
          errorMessage = 'Заголовок должен содержать минимум 10 символов';
        }
        break;

      case 'deviceType':
        if (!fieldValue) {
          isValid = false;
          errorMessage = 'Необходимо выбрать тип устройства';
        }
        break;

      case 'category':
        if (!fieldValue) {
          isValid = false;
          errorMessage = 'Необходимо выбрать категорию';
        }
        break;

      case 'priority':
        if (!fieldValue) {
          isValid = false;
          errorMessage = 'Необходимо выбрать приоритет';
        }
        break;

      case 'description':
        if (!fieldValue) {
          isValid = false;
          errorMessage = 'Описание проблемы обязательно';
        } else if (fieldValue.length < 20) {
          isValid = false;
          errorMessage = 'Описание должно содержать минимум 20 символов';
        }
        break;
    }

    // Показываем ошибку если есть
    if (!isValid) {
      field.classList.add('error');
      if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add('visible');
      }
    }

    this.formValidation[fieldName] = isValid;
    return isValid;
  }

  validateForm() {
    const form = document.getElementById('create-ticket-form');
    if (!form) return false;
    
    const requiredFields = ['title', 'deviceType', 'category', 'priority', 'description'];
    let isFormValid = true;

    // Сбрасываем предыдущее состояние валидации
    this.formValidation = {};

    requiredFields.forEach(fieldName => {
      const field = form.querySelector(`[name="${fieldName}"]`);
      if (field) {
        const isFieldValid = this.validateField(field);
        if (!isFieldValid) {
          isFormValid = false;
        }
      } else {
        console.warn(`Field ${fieldName} not found`);
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  clearFormErrors() {
    this.formValidation = {};
    document.querySelectorAll('.form-control.error').forEach(field => {
      field.classList.remove('error');
    });
    document.querySelectorAll('.form-error.visible').forEach(error => {
      error.classList.remove('visible');
      error.textContent = '';
    });
  }

  // Создание тикета
  handleFormSubmit(e) {
    e.preventDefault();
    console.log('Form submitted');
    
    if (this.validateForm()) {
      console.log('Form is valid, creating ticket');
      this.createTicket(e.target);
    } else {
      console.log('Form is invalid');
      this.showNotification('Пожалуйста, исправьте ошибки в форме', 'danger');
    }
  }

  createTicket(form) {
    const formData = new FormData(form);
    const newTicket = {
      id: `RIK-2025-${String(this.data.tickets.length + 1).padStart(3, '0')}`,
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      priority: formData.get('priority'),
      deviceType: formData.get('deviceType'),
      status: 'open',
      assignee: null,
      reporter: this.currentUser.name,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      comments: []
    };

    console.log('Creating new ticket:', newTicket);

    this.data.tickets.unshift(newTicket);
    this.filteredTickets = [...this.data.tickets];
    
    // Обновляем статистику по устройствам
    if (this.data.stats.deviceStats[newTicket.deviceType]) {
      this.data.stats.deviceStats[newTicket.deviceType]++;
    } else {
      this.data.stats.deviceStats[newTicket.deviceType] = 1;
    }
    
    this.closeModal();
    this.showNotification(`Тикет ${newTicket.id} успешно создан!`, 'success');
    
    // Обновляем таблицу тикетов если мы на странице тикетов
    if (this.currentRoute === 'tickets') {
      const tbody = document.getElementById('ticketsTableBody');
      if (tbody) {
        tbody.innerHTML = this.renderTicketsTable();
      }
    }
  }

  addComment(ticketId) {
    const commentText = document.getElementById('new-comment')?.value.trim();
    if (!commentText) {
      this.showNotification('Введите текст комментария', 'warning');
      return;
    }

    const ticket = this.data.tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    const newComment = {
      author: this.currentUser.name,
      text: commentText,
      timestamp: new Date().toISOString(),
      type: 'agent'
    };

    if (!ticket.comments) ticket.comments = [];
    ticket.comments.push(newComment);
    ticket.updated = new Date().toISOString();

    this.showNotification('Комментарий добавлен', 'success');
    this.viewTicket(ticketId);
  }

  markArticleHelpful(articleId) {
    const article = this.data.knowledgeBase.find(a => a.id === articleId);
    if (article) {
      article.helpful++;
      this.showNotification('Спасибо за обратную связь!', 'success');
      this.viewArticle(articleId);
    }
  }

  // Фильтрация тикетов с поддержкой типа устройства
  bindTicketFilters() {
    const deviceTypeFilter = document.getElementById('deviceTypeFilter');
    const statusFilter = document.getElementById('statusFilter');
    const priorityFilter = document.getElementById('priorityFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('ticketSearch');

    [deviceTypeFilter, statusFilter, priorityFilter, categoryFilter].forEach(element => {
      if (element) {
        element.addEventListener('change', () => this.filterTickets());
      }
    });

    if (searchInput) {
      searchInput.addEventListener('input', () => this.filterTickets());
    }
  }

  filterTickets() {
    const deviceTypeFilter = document.getElementById('deviceTypeFilter')?.value || '';
    const statusFilter = document.getElementById('statusFilter')?.value || '';
    const priorityFilter = document.getElementById('priorityFilter')?.value || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const searchQuery = document.getElementById('ticketSearch')?.value.toLowerCase() || '';

    this.filteredTickets = this.data.tickets.filter(ticket => {
      const matchesDeviceType = !deviceTypeFilter || ticket.deviceType === deviceTypeFilter;
      const matchesStatus = !statusFilter || ticket.status === statusFilter;
      const matchesPriority = !priorityFilter || ticket.priority === priorityFilter;
      const matchesCategory = !categoryFilter || ticket.category === categoryFilter;
      const matchesSearch = !searchQuery || ticket.title.toLowerCase().includes(searchQuery) || 
                          ticket.description.toLowerCase().includes(searchQuery);

      return matchesDeviceType && matchesStatus && matchesPriority && matchesCategory && matchesSearch;
    });

    const tbody = document.getElementById('ticketsTableBody');
    if (tbody) {
      tbody.innerHTML = this.renderTicketsTable();
    }

    // Обновляем счетчик
    const subtitle = document.querySelector('.page-subtitle');
    if (subtitle && this.currentRoute === 'tickets') {
      subtitle.textContent = `Всего тикетов: ${this.filteredTickets.length}`;
    }
  }

  // Поиск в базе знаний
  bindKnowledgeSearch() {
    const searchInput = document.getElementById('knowledgeSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) {
          return;
        }

        const results = this.data.knowledgeBase.filter(article => 
          article.title.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query) ||
          article.category.toLowerCase().includes(query)
        );

        console.log(`Найдено ${results.length} результатов для "${query}"`);
        this.showNotification(`Найдено ${results.length} результатов`, 'info');
      });
    }
  }

  // Графики
  initDashboardCharts() {
    const ctx = document.getElementById('weeklyChart');
    if (!ctx) return;

    if (this.charts.weekly) {
      this.charts.weekly.destroy();
    }

    this.charts.weekly = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        datasets: [{
          label: 'Создано тикетов',
          data: this.data.stats.weeklyTrend,
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          tension: 0.4,
          fill: true
        }, {
          label: 'Решено тикетов',
          data: [8, 15, 12, 18, 16, 20, 19],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
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
  }

  initReportsCharts() {
    // График по типам устройств
    const deviceCtx = document.getElementById('deviceChart');
    if (deviceCtx) {
      if (this.charts.device) {
        this.charts.device.destroy();
      }

      this.charts.device = new Chart(deviceCtx, {
        type: 'doughnut',
        data: {
          labels: Object.keys(this.data.stats.deviceStats),
          datasets: [{
            data: Object.values(this.data.stats.deviceStats),
            backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }

    // График приоритетов
    const prioritiesCtx = document.getElementById('prioritiesChart');
    if (prioritiesCtx) {
      const priorityCounts = { low: 0, medium: 0, high: 0, critical: 0 };
      this.data.tickets.forEach(ticket => {
        priorityCounts[ticket.priority]++;
      });

      if (this.charts.priorities) {
        this.charts.priorities.destroy();
      }

      this.charts.priorities = new Chart(prioritiesCtx, {
        type: 'pie',
        data: {
          labels: ['Низкий', 'Средний', 'Высокий', 'Критический'],
          datasets: [{
            data: Object.values(priorityCounts),
            backgroundColor: ['#DB4545', '#D2BA4C', '#964325', '#944454'],
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }

    // График производительности агентов
    const agentsCtx = document.getElementById('agentsChart');
    if (agentsCtx) {
      const agents = this.data.users.filter(u => u.role === 'agent');
      
      if (this.charts.agents) {
        this.charts.agents.destroy();
      }

      this.charts.agents = new Chart(agentsCtx, {
        type: 'bar',
        data: {
          labels: agents.map(a => a.name),
          datasets: [{
            label: 'Решенных тикетов',
            data: agents.map(a => a.ticketsResolved || 0),
            backgroundColor: 'rgba(31, 184, 205, 0.8)',
            borderColor: '#1FB8CD',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  // Утилиты
  updateBreadcrumb() {
    const breadcrumb = document.getElementById('breadcrumb');
    const routeNames = {
      dashboard: 'Панель управления',
      tickets: 'Тикеты',
      knowledge: 'База знаний',
      reports: 'Отчеты',
      users: 'Пользователи',
      settings: 'Настройки',
      profile: 'Профиль'
    };

    if (breadcrumb) {
      breadcrumb.textContent = routeNames[this.currentRoute] || 'Rikor HelpDesk';
    }
  }

  calculateStats() {
    return {
      total: this.data.tickets.length,
      open: this.data.tickets.filter(t => ['open', 'new'].includes(t.status)).length,
      inProgress: this.data.tickets.filter(t => t.status === 'in_progress').length,
      resolved: this.data.tickets.filter(t => ['resolved', 'closed'].includes(t.status)).length
    };
  }

  getDeviceIcon(deviceType) {
    const icons = {
      'Ноутбук': '💻',
      'Сервер': '🖥️',
      'Мини ПК': '📦',
      'Телефон': '📞',
      'Другое': '🔧'
    };
    return icons[deviceType] || '💻';
  }

  getStatusName(status) {
    const names = {
      open: 'Открыт',
      new: 'Новый',
      in_progress: 'В работе',
      waiting: 'Ожидание',
      resolved: 'Решен',
      closed: 'Закрыт'
    };
    return names[status] || status;
  }

  getStatusClass(status) {
    const classes = {
      open: 'success',
      new: 'primary',
      in_progress: 'warning',
      waiting: 'gray',
      resolved: 'success',
      closed: 'gray'
    };
    return classes[status] || 'gray';
  }

  getPriorityName(priority) {
    const names = {
      low: 'Низкий',
      medium: 'Средний',
      high: 'Высокий',
      critical: 'Критический'
    };
    return names[priority] || priority;
  }

  getPriorityClass(priority) {
    const classes = {
      low: 'gray',
      medium: 'warning',
      high: 'danger',
      critical: 'danger'
    };
    return classes[priority] || 'gray';
  }

  getCategoryName(categoryId) {
    const category = this.data.categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  }

  getAvatarFromName(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'только что';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} мин назад`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} ч назад`;
    
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  showNotification(message, type = 'info') {
    const container = document.getElementById('notifications-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
      ${message}
      <button class="notification__close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    container.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);
  }

  // Дополнительные функции
  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('open');
    }
  }

  toggleNotifications() {
    const panel = document.getElementById('notifications-panel');
    const dropdown = document.getElementById('user-menu-dropdown');
    
    if (panel) panel.classList.toggle('hidden');
    if (dropdown) dropdown.classList.add('hidden');
  }

  toggleUserMenu() {
    const dropdown = document.getElementById('user-menu-dropdown');
    const panel = document.getElementById('notifications-panel');
    
    if (dropdown) dropdown.classList.toggle('hidden');
    if (panel) panel.classList.add('hidden');
  }

  exportTickets() {
    this.showNotification('Экспорт тикетов в Excel...', 'info');
    setTimeout(() => {
      this.showNotification('Файл готов к скачиванию', 'success');
    }, 2000);
  }

  handleGlobalSearch(query) {
    if (!query || query.length < 2) return;
    
    console.log('Глобальный поиск:', query);
    this.showNotification(`Поиск по запросу "${query}"...`, 'info');
  }

  toggleProfileMenu() {
    // Placeholder для меню профиля
  }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
  window.app = new RikorHelpDesk();
});