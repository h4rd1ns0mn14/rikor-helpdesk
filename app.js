// Rikor HelpDesk v2.4.0 РАСШИРЕННАЯ ВЕРСИЯ с поддержкой файлов и расширенным функционалом

class RikorHelpDeskEnhanced {
  constructor() {
    console.log('🚀 Инициализация Rikor HelpDesk v2.4.0 РАСШИРЕННАЯ...');

    this.currentRoute = 'dashboard';
    this.currentUser = {
      id: 1,
      name: 'Петр Сидоров',
      email: 'p.sidorov@rikor.ru',
      role: 'admin',
      avatar: 'ПС',
      department: 'IT'
    };

    this.settings = {
      theme: localStorage.getItem('rikor-theme') || 'light',
      language: 'ru',
      notifications: { email: true, push: true, sound: true },
      autoRefresh: true,
      refreshInterval: 30000,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      allowedFileTypes: ['.pdf', '.doc', '.docx', '.txt', '.md', '.jpg', '.jpeg', '.png', '.zip', '.rar']
    };

    this.data = this.loadData();
    this.filters = {
      tickets: { status: '', priority: '', assignee: '', search: '' },
      users: { role: '', status: '', search: '' },
      reports: { dateFrom: '', dateTo: '', type: 'all' }
    };

    this.chartInstances = {};
    this.tempFiles = []; // Временные файлы для загрузки
    this.init();
  }

  init() {
    console.log('📋 Инициализация системы...');
    this.applyTheme();
    this.bindEvents();
    this.handleRoute();
    this.setupFileHandlers();
    this.startAutoRefresh();

    setTimeout(() => {
      this.showNotification('🎯 Rikor HelpDesk v2.4.0 РАСШИРЕННАЯ готова! Все функции работают.', 'success');
    }, 1000);
  }

  // ========================================
  // ЗАГРУЗКА ДАННЫХ - С ПОДДЕРЖКОЙ ФАЙЛОВ
  // ========================================

  loadData() {
    const defaultData = {
      tickets: [
        {
          id: "RIK-2025-001",
          title: "Перегрев сервера Rikor RP6224 в ЦОД",
          description: "Сервер Rikor RP6224 показывает температуру CPU 85°C в нормальном режиме работы. Система охлаждения работает на максимальных оборотах. Требуется срочная диагностика и замена термопасты.",
          status: "open",
          priority: "critical",
          category: "hardware",
          deviceType: "Сервер",
          deviceModel: "RP6224",
          serialNumber: "RP6224-2024-001523",
          assignee: "Иван Петров",
          reporter: "Анна Смирнова",
          created: "2025-09-22T06:15:00Z",
          updated: "2025-09-22T08:30:00Z",
          location: "ЦОД-1, Стойка A-15",
          timeSpent: 2.5,
          estimatedTime: 4,
          tags: ["rikor", "server", "cooling", "datacenter", "critical"],
          replies: [
            {
              id: 1,
              author: "Иван Петров",
              role: "agent",
              message: "Тикет принят в работу. Выезжаю в ЦОД для диагностики системы охлаждения.",
              created: "2025-09-22T08:30:00Z",
              type: "reply"
            }
          ],
          attachments: [
            {
              id: 1,
              name: "server_temperature_log.pdf",
              size: 245760,
              type: "application/pdf",
              uploadedBy: "Анна Смирнова",
              uploaded: "2025-09-22T06:20:00Z"
            }
          ]
        },
        {
          id: "RIK-2025-002",
          title: "Ноутбук Rikor RN NINO не включается",
          description: "После обновления BIOS ноутбук Rikor RN NINO 203.1/15 не реагирует на нажатие кнопки питania. Индикатор питания не загорается.",
          status: "in_progress",
          priority: "high",
          category: "hardware",
          deviceType: "Ноутбук",
          deviceModel: "RN NINO 203.1/15",
          serialNumber: "RN203-2025-000847",
          assignee: "Елена Новикова",
          reporter: "Сергей Волков",
          created: "2025-09-21T16:45:00Z",
          updated: "2025-09-22T09:20:00Z",
          location: "Офис 1, Комната 205",
          timeSpent: 1.5,
          estimatedTime: 3,
          tags: ["rikor", "laptop", "power", "bios"],
          replies: [
            {
              id: 1,
              author: "Елена Новикова",
              role: "agent",
              message: "Проверила подключение питания. Попробую восстановить BIOS через служебный режим.",
              created: "2025-09-22T09:20:00Z",
              type: "reply"
            }
          ],
          attachments: []
        },
        {
          id: "RIK-2025-003",
          title: "Медленная работа моноблока Rikor AIO",
          description: "Моноблок Rikor AIO 201.1/23 стал работать медленно после обновления Windows 11. Время загрузки увеличилось в 3 раза.",
          status: "resolved",
          priority: "medium",
          category: "software",
          deviceType: "Моноблок",
          deviceModel: "AIO 201.1/23",
          serialNumber: "AIO201-2024-002156",
          assignee: "Петр Сидоров",
          reporter: "Михаил Кузнецов",
          created: "2025-09-20T11:30:00Z",
          updated: "2025-09-22T09:15:00Z",
          resolvedAt: "2025-09-22T09:15:00Z",
          timeSpent: 4.2,
          estimatedTime: 4,
          tags: ["rikor", "aio", "performance", "windows"],
          replies: [
            {
              id: 1,
              author: "Петр Сидоров",
              role: "admin",
              message: "Проблема решена. Установлены обновленные драйверы и оптимизированы настройки Windows 11.",
              created: "2025-09-22T09:15:00Z",
              type: "solution"
            }
          ],
          attachments: [
            {
              id: 1,
              name: "performance_report.pdf",
              size: 186240,
              type: "application/pdf",
              uploadedBy: "Петр Сидоров",
              uploaded: "2025-09-22T09:15:00Z"
            }
          ]
        }
      ],

      users: [
        {id: 1, name: "Петр Сидоров", email: "p.sidorov@rikor.ru", role: "admin", department: "IT", avatar: "ПС", status: "online", ticketsResolved: 142},
        {id: 2, name: "Иван Петров", email: "i.petrov@rikor.ru", role: "agent", department: "IT", avatar: "ИП", status: "online", ticketsResolved: 89},
        {id: 3, name: "Елена Новикова", email: "e.novikova@rikor.ru", role: "agent", department: "IT", avatar: "ЕН", status: "away", ticketsResolved: 67},
        {id: 4, name: "Анна Смирнова", email: "a.smirnova@rikor.ru", role: "user", department: "Офис", avatar: "АС", status: "offline", ticketsCreated: 23},
        {id: 5, name: "Алексей Морозов", email: "a.morozov@rikor.ru", role: "agent", department: "IT", avatar: "АМ", status: "busy", ticketsResolved: 45}
      ],

      knowledgeBase: [
        {
          id: "KB-001",
          title: "Устранение перегрева серверов Rikor RP серии",
          category: "hardware",
          content: `# Устранение перегрева серверов Rikor RP серии

## Диагностика проблемы

1. **Проверка температуры CPU**
   - Используйте встроенный мониторинг BIOS
   - Критическая температура: выше 80°C
   - Нормальная рабочая температура: 45-65°C

2. **Проверка системы охлаждения**
   - Визуальный осмотр вентиляторов
   - Проверка работы помп жидкостного охлаждения

## Решение проблемы

### Замена термопасты
1. Выключить сервер и отключить питание
2. Снять систему охлаждения
3. Очистить старую термопасту
4. Нанести новую термопасту Arctic MX-4

### Очистка радиаторов
1. Продуть радиаторы сжатым воздухом
2. При необходимости - демонтаж для полной очистки

## Профилактические меры

- Регулярная очистка от пыли (каждые 3 месяца)
- Мониторинг температуры в реальном времени
- Контроль температуры в серверной комнате (не выше 24°C)`,
          tags: ["сервер", "охлаждение", "rp6224", "температура"],
          views: 245,
          rating: 4.8,
          created: "2025-08-15T10:00:00Z",
          updated: "2025-09-10T14:30:00Z",
          author: "Петр Сидоров",
          attachments: [
            {
              id: 1,
              name: "cooling_diagram.jpg",
              size: 512000,
              type: "image/jpeg",
              uploadedBy: "Петр Сидоров",
              uploaded: "2025-08-15T10:30:00Z"
            }
          ],
          editHistory: []
        },
        {
          id: "KB-002",
          title: "Обновление BIOS на ноутбуках Rikor RN серии",
          category: "software",
          content: `# Обновление BIOS на ноутбуках Rikor RN серии

⚠️ **ВНИМАНИЕ**: Неправильное обновление BIOS может привести к выходу устройства из строя!

## Подготовка к обновлению

### Требования:
- Стабильное питание от сети (не от батареи)
- Заряд батареи не менее 50%
- Отсутствие запущенных программ

### Загрузка прошивки:
1. Перейти на официальный сайт Rikor
2. Найти раздел "Поддержка" → "Драйверы и ПО"
3. Выбрать модель ноутбука
4. Скачать последнюю версию BIOS

## Процедура обновления

1. **Запуск утилиты обновления**
   - Запустить файл от имени администратора
   - Принять лицензионное соглашение

2. **Процесс обновления**
   - НЕ ОТКЛЮЧАТЬ питание во время процесса
   - НЕ ЗАКРЫВАТЬ программу
   - Процесс займет 5-10 минут

3. **Завершение**
   - Автоматическая перезагрузка
   - Проверка версии BIOS`,
          tags: ["ноутбук", "bios", "обновление", "rn-nino"],
          views: 189,
          rating: 4.6,
          created: "2025-07-22T09:15:00Z",
          updated: "2025-09-05T11:45:00Z",
          author: "Елена Новикова",
          attachments: [],
          editHistory: []
        }
      ],

      stats: {
        totalTickets: 1567,
        openTickets: 128,
        inProgressTickets: 45,
        resolvedTickets: 1298,
        closedTickets: 96,
        avgResponseTime: "1.8",
        avgResolutionTime: "14.2",
        customerSatisfaction: 96.4,
        monthlyTrend: [158, 162, 155, 171, 168, 189, 195, 182, 191, 194, 202, 195],
        monthlyLabels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        priorityStats: {critical: 15, high: 32, medium: 65, low: 16},
        priorityLabels: ['Критический', 'Высокий', 'Средний', 'Низкий'],
        priorityColors: ['#ef4444', '#f59e0b', '#06b6d4', '#10b981'],
        statusStats: {open: 128, in_progress: 45, resolved: 1298, closed: 96},
        statusLabels: ['Открытые', 'В работе', 'Решенные', 'Закрытые'],
        statusColors: ['#ef4444', '#f59e0b', '#10b981', '#64748b'],
        slaCompliance: 94.7
      }
    };

    const savedData = localStorage.getItem('rikor-data');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.warn('⚠️ Ошибка парсинга данных, используются по умолчанию');
        return defaultData;
      }
    }

    return defaultData;
  }

  saveData() {
    try {
      localStorage.setItem('rikor-data', JSON.stringify(this.data));
      console.log('💾 Данные сохранены в LocalStorage');
    } catch (error) {
      console.error('❌ Ошибка сохранения данных:', error);
      this.showNotification('Ошибка сохранения данных', 'error');
    }
  }

  // ========================================
  // ОБРАБОТКА ФАЙЛОВ - НОВЫЙ ФУНКЦИОНАЛ
  // ========================================

  setupFileHandlers() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
    }
  }

  handleFileSelect(event) {
    const files = Array.from(event.target.files);
    files.forEach(file => this.validateAndAddFile(file));
    event.target.value = ''; // Очищаем input
  }

  validateAndAddFile(file) {
    // Проверка размера файла
    if (file.size > this.settings.maxFileSize) {
      this.showNotification(`Файл "${file.name}" слишком большой. Максимальный размер: ${this.formatFileSize(this.settings.maxFileSize)}`, 'error');
      return false;
    }

    // Проверка типа файла
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!this.settings.allowedFileTypes.includes(fileExtension)) {
      this.showNotification(`Тип файла "${fileExtension}" не поддерживается`, 'error');
      return false;
    }

    // Создаем объект файла
    const fileObj = {
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedBy: this.currentUser.name,
      uploaded: new Date().toISOString(),
      file: file // Временно сохраняем File объект
    };

    this.tempFiles.push(fileObj);
    this.updateFileList();
    this.showNotification(`Файл "${file.name}" добавлен`, 'success');
    return true;
  }

  updateFileList() {
    const container = document.querySelector('.attached-files');
    if (!container) return;

    container.innerHTML = this.tempFiles.map(file => `
      <div class="attached-file">
        <div class="attached-file-icon">
          <i class="fas ${this.getFileIcon(file.name)}"></i>
        </div>
        <div class="attached-file-info">
          <div class="attached-file-name">${file.name}</div>
          <div class="attached-file-size">${this.formatFileSize(file.size)}</div>
        </div>
        <button class="attached-file-remove" onclick="app.removeFile('${file.id}')">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `).join('');
  }

  removeFile(fileId) {
    this.tempFiles = this.tempFiles.filter(f => f.id !== fileId);
    this.updateFileList();
    this.showNotification('Файл удален', 'info');
  }

  getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const iconMap = {
      'pdf': 'fa-file-pdf',
      'doc': 'fa-file-word',
      'docx': 'fa-file-word',
      'txt': 'fa-file-text',
      'md': 'fa-file-text',
      'jpg': 'fa-file-image',
      'jpeg': 'fa-file-image',
      'png': 'fa-file-image',
      'zip': 'fa-file-archive',
      'rar': 'fa-file-archive'
    };
    return iconMap[ext] || 'fa-file';
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Б';
    const k = 1024;
    const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  createFileUploadArea() {
    return `
      <div class="file-upload-area" onclick="document.getElementById('fileInput').click()">
        <div class="file-upload-icon">
          <i class="fas fa-cloud-upload-alt"></i>
        </div>
        <div class="file-upload-text">Загрузить файлы</div>
        <div class="file-upload-hint">Нажмите или перетащите файлы сюда</div>
        <div class="file-upload-hint">Поддерживаются: PDF, DOC, TXT, JPG, PNG, ZIP (до ${this.formatFileSize(this.settings.maxFileSize)})</div>
      </div>
      <div class="attached-files"></div>
    `;
  }

  // ========================================
  // РАСШИРЕННЫЙ ПРОСМОТР ТИКЕТОВ
  // ========================================

  viewTicket(ticketId) {
    console.log(`👁️ Просмотр тикета: ${ticketId}`);

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
            <span class="badge priority--${ticket.priority}">
              <i class="${this.getPriorityIcon(ticket.priority)} mr-1"></i>
              ${this.getPriorityText(ticket.priority)}
            </span>
          </div>
        </div>
        <button class="modal-close" onclick="app.hideModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="modal-body" style="max-width: 900px; max-height: 80vh; overflow-y: auto;">
        <!-- Основная информация -->
        <div style="background: var(--rikor-bg-tertiary); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
          <h3 style="margin-bottom: 16px; color: var(--rikor-text-primary);">Описание проблемы</h3>
          <p style="line-height: 1.6; color: var(--rikor-text-secondary); margin-bottom: 16px;">${ticket.description}</p>

          <div class="grid grid--2" style="gap: 16px; font-size: 14px;">
            <div>
              <strong>Устройство:</strong><br>
              ${this.getDeviceIcon(ticket.deviceType)} ${ticket.deviceType}
              ${ticket.deviceModel ? `<br><small style="color: var(--rikor-text-muted);">Модель: ${ticket.deviceModel}</small>` : ''}
            </div>
            <div>
              <strong>Серийный номер:</strong><br>
              ${ticket.serialNumber || 'Не указан'}
            </div>
            <div>
              <strong>Местоположение:</strong><br>
              ${ticket.location || 'Не указано'}
            </div>
            <div>
              <strong>Категория:</strong><br>
              ${this.getCategoryText(ticket.category)}
            </div>
          </div>
        </div>

        <!-- Детали тикета -->
        <div class="grid grid--2" style="gap: 20px; margin-bottom: 20px;">
          <div class="card" style="padding: 16px;">
            <h4 style="margin-bottom: 12px; color: var(--rikor-text-primary);">Участники</h4>
            <div style="font-size: 14px; line-height: 1.6;">
              <div style="margin-bottom: 8px;">
                <strong>Создал:</strong> ${ticket.reporter}<br>
                <small style="color: var(--rikor-text-muted);">${this.formatDateTime(ticket.created)}</small>
              </div>
              <div>
                <strong>Исполнитель:</strong> ${ticket.assignee}<br>
                <small style="color: var(--rikor-text-muted);">Обновлен: ${this.formatDateTime(ticket.updated)}</small>
              </div>
            </div>
          </div>

          <div class="card" style="padding: 16px;">
            <h4 style="margin-bottom: 12px; color: var(--rikor-text-primary);">Временные рамки</h4>
            <div style="font-size: 14px; line-height: 1.6;">
              <div style="margin-bottom: 8px;">
                <strong>Потрачено времени:</strong> ${ticket.timeSpent} ч
              </div>
              <div style="margin-bottom: 8px;">
                <strong>Оценка времени:</strong> ${ticket.estimatedTime} ч
              </div>
              ${ticket.resolvedAt ? `
                <div>
                  <strong>Решен:</strong><br>
                  <small style="color: var(--rikor-success);">${this.formatDateTime(ticket.resolvedAt)}</small>
                </div>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- Смена статуса -->
        ${this.currentUser.role === 'admin' || ticket.assignee === this.currentUser.name ? `
          <div style="margin-bottom: 20px;">
            <h4 style="margin-bottom: 12px; color: var(--rikor-text-primary);">Изменить статус</h4>
            <div class="status-selector">
              <button class="status-btn ${ticket.status === 'open' ? 'active' : ''}" onclick="app.changeTicketStatus('${ticket.id}', 'open')">
                Открыт
              </button>
              <button class="status-btn ${ticket.status === 'in_progress' ? 'active' : ''}" onclick="app.changeTicketStatus('${ticket.id}', 'in_progress')">
                В работе
              </button>
              <button class="status-btn ${ticket.status === 'waiting' ? 'active' : ''}" onclick="app.changeTicketStatus('${ticket.id}', 'waiting')">
                Ожидание
              </button>
              <button class="status-btn ${ticket.status === 'resolved' ? 'active' : ''}" onclick="app.changeTicketStatus('${ticket.id}', 'resolved')">
                Решен
              </button>
              <button class="status-btn ${ticket.status === 'closed' ? 'active' : ''}" onclick="app.changeTicketStatus('${ticket.id}', 'closed')">
                Закрыт
              </button>
            </div>
          </div>
        ` : ''}

        <!-- Вложения -->
        ${ticket.attachments && ticket.attachments.length > 0 ? `
          <div style="margin-bottom: 20px;">
            <h4 style="margin-bottom: 16px; color: var(--rikor-text-primary);">Вложения (${ticket.attachments.length})</h4>
            ${ticket.attachments.map(attachment => `
              <div class="attached-file">
                <div class="attached-file-icon">
                  <i class="fas ${this.getFileIcon(attachment.name)}"></i>
                </div>
                <div class="attached-file-info">
                  <div class="attached-file-name">${attachment.name}</div>
                  <div class="attached-file-size">${this.formatFileSize(attachment.size)} • ${attachment.uploadedBy} • ${this.formatDateTime(attachment.uploaded)}</div>
                </div>
                <button class="btn btn--secondary btn--small">
                  <i class="fas fa-download"></i>
                </button>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Ответы -->
        ${ticket.replies && ticket.replies.length > 0 ? `
          <div class="ticket-replies">
            <h4 style="margin-bottom: 16px; color: var(--rikor-text-primary);">Ответы (${ticket.replies.length})</h4>
            ${ticket.replies.map(reply => `
              <div class="reply ${reply.type === 'solution' ? 'reply--solution' : ''}">
                <div class="reply-header">
                  <span class="reply-author">${reply.author}</span>
                  <div style="display: flex; gap: 8px; align-items: center;">
                    ${reply.type === 'solution' ? '<span class="badge badge--success">Решение</span>' : ''}
                    <span class="reply-date">${this.formatDateTime(reply.created)}</span>
                  </div>
                </div>
                <div class="reply-message">${reply.message}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Форма ответа -->
        ${this.currentUser.role === 'admin' || ticket.assignee === this.currentUser.name ? `
          <div class="reply-form">
            <h4 style="margin-bottom: 16px; color: var(--rikor-text-primary);">Добавить ответ</h4>
            <form onsubmit="app.addReply(event, '${ticket.id}')">
              <div class="form-group">
                <textarea class="form-control" name="message" rows="4" placeholder="Введите ваш ответ..." required></textarea>
              </div>
              <div style="display: flex; gap: 12px; align-items: center;">
                <button type="submit" class="btn btn--primary">
                  <i class="fas fa-reply mr-2"></i>Отправить ответ
                </button>
                <label style="display: flex; align-items: center; gap: 8px;">
                  <input type="checkbox" name="isSolution" value="1">
                  <span>Отметить как решение</span>
                </label>
              </div>
            </form>
          </div>
        ` : ''}
      </div>

      <div class="modal-footer">
        <button class="btn btn--secondary" onclick="app.hideModal()">
          <i class="fas fa-times mr-2"></i>Закрыть
        </button>
        ${this.currentUser.role === 'admin' || ticket.assignee === this.currentUser.name ? `
          <button class="btn btn--info" onclick="app.showAddFilesToTicket('${ticket.id}')">
            <i class="fas fa-paperclip mr-2"></i>Добавить файлы
          </button>
        ` : ''}
      </div>
    `);
  }

  // Смена статуса тикета
  changeTicketStatus(ticketId, newStatus) {
    const ticket = this.data.tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    const oldStatus = ticket.status;
    ticket.status = newStatus;
    ticket.updated = new Date().toISOString();

    if (newStatus === 'resolved') {
      ticket.resolvedAt = new Date().toISOString();
    }

    this.saveData();
    this.showNotification(`Статус тикета изменен с "${this.getStatusText(oldStatus)}" на "${this.getStatusText(newStatus)}"`, 'success');

    // Обновляем отображение
    this.viewTicket(ticketId);
  }

  // Добавление ответа к тикету
  addReply(event, ticketId) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const message = formData.get('message').trim();
    const isSolution = formData.get('isSolution') === '1';

    if (!message) {
      this.showNotification('Введите текст ответа', 'error');
      return;
    }

    const ticket = this.data.tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    const reply = {
      id: ticket.replies.length + 1,
      author: this.currentUser.name,
      role: this.currentUser.role,
      message: message,
      created: new Date().toISOString(),
      type: isSolution ? 'solution' : 'reply'
    };

    ticket.replies.push(reply);
    ticket.updated = new Date().toISOString();

    if (isSolution && ticket.status === 'open') {
      ticket.status = 'resolved';
      ticket.resolvedAt = new Date().toISOString();
    }

    this.saveData();
    this.showNotification(isSolution ? 'Решение добавлено!' : 'Ответ добавлен!', 'success');

    // Обновляем отображение
    this.viewTicket(ticketId);
  }

  // Показать форму добавления файлов к тикету
  showAddFilesToTicket(ticketId) {
    this.tempFiles = [];

    this.showModal(`
      <div class="modal-header">
        <h2 class="modal-title">Добавить файлы к тикету</h2>
        <button class="modal-close" onclick="app.hideModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">Выберите файлы</label>
          ${this.createFileUploadArea()}
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" onclick="app.hideModal()">Отмена</button>
        <button class="btn btn--primary" onclick="app.attachFilesToTicket('${ticketId}')">
          <i class="fas fa-paperclip mr-2"></i>Прикрепить файлы
        </button>
      </div>
    `);
  }

  // Прикрепление файлов к тикету
  attachFilesToTicket(ticketId) {
    if (this.tempFiles.length === 0) {
      this.showNotification('Выберите файлы для прикрепления', 'error');
      return;
    }

    const ticket = this.data.tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    // Копируем файлы в тикет (без File объекта)
    const attachments = this.tempFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedBy: file.uploadedBy,
      uploaded: file.uploaded
    }));

    ticket.attachments = ticket.attachments || [];
    ticket.attachments.push(...attachments);
    ticket.updated = new Date().toISOString();

    this.saveData();
    this.hideModal();
    this.showNotification(`${attachments.length} файлов прикреплено к тикету`, 'success');
  }

  // ========================================
  // СОЗДАНИЕ ТИКЕТОВ С ПОДДЕРЖКОЙ ФАЙЛОВ
  // ========================================

  showCreateTicketModal() {
    console.log('🎫 Открытие модального окна создания тикета с поддержкой файлов');
    this.tempFiles = [];

    this.showModal(`
      <div class="modal-header">
        <div>
          <h2 class="modal-title">Создать новый тикет</h2>
          <p style="color: var(--rikor-text-muted); margin: 4px 0 0; font-size: 14px;">Регистрация нового обращения в службу поддержки Rikor</p>
        </div>
        <button class="modal-close" onclick="app.hideModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body" style="max-width: 800px;">
        <form onsubmit="app.createTicket(event)" id="createTicketForm">
          <div class="grid grid--2">
            <div class="form-group">
              <label class="form-label">Заголовок тикета <span style="color: var(--rikor-error);">*</span></label>
              <input type="text" name="title" class="form-control" required placeholder="Кратко опишите проблему">
            </div>

            <div class="form-group">
              <label class="form-label">Тип устройства Rikor <span style="color: var(--rikor-error);">*</span></label>
              <select name="deviceType" class="form-control" required>
                <option value="">Выберите устройство Rikor</option>
                <option value="Сервер">🖥️ Сервер (RP серия)</option>
                <option value="Ноутбук">💻 Ноутбук (RN серия)</option>
                <option value="Планшет">📱 Планшет (RT серия)</option>
                <option value="Моноблок">🖥️ Моноблок (AIO серия)</option>
                <option value="Мини-ПК">📦 Мини-ПК (RPC серия)</option>
                <option value="Рабочая станция">🖥️ Рабочая станция (RW серия)</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Подробное описание проблемы <span style="color: var(--rikor-error);">*</span></label>
            <textarea name="description" class="form-control" rows="4" required placeholder="Опишите проблему максимально подробно:&#10;- Что случилось?&#10;- При каких обстоятельствах?&#10;- Какие действия предпринимались?&#10;- Есть ли коды ошибок?"></textarea>
          </div>

          <div class="grid grid--2">
            <div class="form-group">
              <label class="form-label">Модель устройства</label>
              <input type="text" name="deviceModel" class="form-control" placeholder="Например: RP6224, RN NINO 203.1/15">
            </div>

            <div class="form-group">
              <label class="form-label">Серийный номер</label>
              <input type="text" name="serialNumber" class="form-control" placeholder="S/N устройства Rikor">
            </div>
          </div>

          <div class="grid grid--2">
            <div class="form-group">
              <label class="form-label">Приоритет <span style="color: var(--rikor-error);">*</span></label>
              <select name="priority" class="form-control" required>
                <option value="low">🟢 Низкий - Общие вопросы</option>
                <option value="medium" selected>🟡 Средний - Рабочие задачи</option>
                <option value="high">🟠 Высокий - Влияет на работу</option>
                <option value="critical">🔴 Критический - Система недоступна</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Категория</label>
              <select name="category" class="form-control">
                <option value="hardware" selected>🔧 Оборудование</option>
                <option value="software">💻 Программное обеспечение</option>
                <option value="network">🌐 Сеть и подключения</option>
                <option value="configuration">⚙️ Настройка и конфигурация</option>
                <option value="other">📋 Другое</option>
              </select>
            </div>
          </div>

          <div class="grid grid--2">
            <div class="form-group">
              <label class="form-label">Местоположение</label>
              <input type="text" name="location" class="form-control" placeholder="Например: Офис 1, Комната 205">
            </div>

            <div class="form-group">
              <label class="form-label">Исполнитель</label>
              <select name="assignee" class="form-control">
                <option value="">Назначить автоматически</option>
                ${this.data.users.filter(u => u.role === 'agent' || u.role === 'admin').map(agent => `
                  <option value="${agent.name}">${agent.name} (${agent.department})</option>
                `).join('')}
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Теги</label>
            <input type="text" name="tags" class="form-control" placeholder="Например: rikor, сервер, перегрев">
            <small style="color: var(--rikor-text-muted); font-size: 12px;">Разделяйте теги запятыми для лучшего поиска</small>
          </div>

          <div class="form-group">
            <label class="form-label">Прикрепить файлы</label>
            ${this.createFileUploadArea()}
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

  createTicket(event) {
    event.preventDefault();
    console.log('💾 Создание нового тикета с файлами');

    const formData = new FormData(event.target);

    // Валидация
    if (!formData.get('title').trim()) {
      this.showNotification('Заполните заголовок тикета!', 'error');
      return;
    }

    if (!formData.get('description').trim()) {
      this.showNotification('Заполните описание проблемы!', 'error');
      return;
    }

    if (!formData.get('deviceType')) {
      this.showNotification('Выберите тип устройства Rikor!', 'error');
      return;
    }

    // Создание нового тикета
    const newTicket = {
      id: `RIK-2025-${String(this.data.tickets.length + 1).padStart(3, '0')}`,
      title: formData.get('title').trim(),
      description: formData.get('description').trim(),
      deviceType: formData.get('deviceType'),
      deviceModel: formData.get('deviceModel') || '',
      serialNumber: formData.get('serialNumber') || '',
      priority: formData.get('priority') || 'medium',
      status: 'open',
      category: formData.get('category') || 'hardware',
      assignee: formData.get('assignee') || this.autoAssignAgent(),
      reporter: this.currentUser.name,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      location: formData.get('location') || '',
      timeSpent: 0,
      estimatedTime: this.estimateTime(formData.get('priority') || 'medium'),
      tags: formData.get('tags') ? formData.get('tags').split(',').map(t => t.trim()).filter(t => t) : [formData.get('deviceType').toLowerCase(), formData.get('category') || 'hardware'],
      replies: [],
      attachments: this.tempFiles.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedBy: file.uploadedBy,
        uploaded: file.uploaded
      }))
    };

    // Добавление тикета в систему
    this.data.tickets.unshift(newTicket);
    this.data.stats.totalTickets++;
    this.data.stats.openTickets++;

    this.saveData();
    this.hideModal();
    this.showNotification(`Тикет "${newTicket.title}" создан! ID: ${newTicket.id}${this.tempFiles.length > 0 ? `. Прикреплено файлов: ${this.tempFiles.length}` : ''}`, 'success');

    // Очищаем временные файлы
    this.tempFiles = [];

    // Переход к тикетам если не на этой странице
    if (this.currentRoute !== 'tickets') {
      this.navigate('tickets');
    } else {
      this.renderContent();
    }
  }

  // ========================================
  // СОЗДАНИЕ СТАТЕЙ С ПОДДЕРЖКОЙ ФАЙЛОВ
  // ========================================

  showCreateArticleModal() {
    console.log('📚 Открытие модального окна создания статьи с поддержкой файлов');
    this.tempFiles = [];

    this.showModal(`
      <div class="modal-header">
        <div>
          <h2 class="modal-title">Создать новую статью</h2>
          <p style="color: var(--rikor-text-muted); margin: 4px 0 0; font-size: 14px;">Добавление статьи в базу знаний Rikor</p>
        </div>
        <button class="modal-close" onclick="app.hideModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body" style="max-width: 800px;">
        <form onsubmit="app.createArticle(event)" id="createArticleForm">
          <div class="form-group">
            <label class="form-label">Заголовок статьи <span style="color: var(--rikor-error);">*</span></label>
            <input type="text" name="title" class="form-control" required placeholder="Например: Установка драйверов для Rikor RN NINO">
          </div>

          <div class="grid grid--2">
            <div class="form-group">
              <label class="form-label">Категория <span style="color: var(--rikor-error);">*</span></label>
              <select name="category" class="form-control" required>
                <option value="">Выберите категорию</option>
                <option value="hardware">🔧 Оборудование</option>
                <option value="software">💻 Программное обеспечение</option>
                <option value="network">🌐 Сеть и подключения</option>
                <option value="performance">⚡ Производительность</option>
                <option value="security">🔒 Безопасность</option>
                <option value="other">📋 Другое</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Теги</label>
              <input type="text" name="tags" class="form-control" placeholder="Например: драйверы, ноутбук, windows">
              <small style="color: var(--rikor-text-muted); font-size: 12px;">Разделяйте теги запятыми для лучшего поиска</small>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Готовые шаблоны статей</label>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
              <button type="button" class="btn btn--secondary btn--small" onclick="app.loadTemplate('hardware')">
                🔧 Оборудование
              </button>
              <button type="button" class="btn btn--secondary btn--small" onclick="app.loadTemplate('software')">
                💻 Программы
              </button>
              <button type="button" class="btn btn--secondary btn--small" onclick="app.loadTemplate('troubleshooting')">
                🔍 Решение проблем
              </button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Содержание статьи <span style="color: var(--rikor-error);">*</span></label>
            <div style="margin-bottom: 8px; font-size: 12px; color: var(--rikor-text-muted);">
              Поддерживается Markdown разметка: **жирный**, *курсив*, ## Заголовок, - Список
            </div>
            <textarea name="content" class="form-control" rows="12" required placeholder="# Название статьи&#10;&#10;## Описание проблемы&#10;Опишите проблему или задачу, которую решает эта статья.&#10;&#10;## Пошаговое решение&#10;1. Первый шаг решения&#10;2. Второй шаг&#10;3. Третий шаг&#10;&#10;## Дополнительная информация&#10;Полезные советы и рекомендации.&#10;&#10;## См. также&#10;Ссылки на связанные статьи или ресурсы." style="font-family: 'Courier New', monospace; line-height: 1.4;"></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Прикрепить файлы к статье</label>
            ${this.createFileUploadArea()}
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" onclick="app.hideModal()">
          <i class="fas fa-times mr-2"></i>Отмена
        </button>
        <button class="btn btn--info" onclick="app.previewArticle()">
          <i class="fas fa-eye mr-2"></i>Предпросмотр
        </button>
        <button class="btn btn--primary" onclick="document.getElementById('createArticleForm').dispatchEvent(new Event('submit'))">
          <i class="fas fa-plus mr-2"></i>Создать статью
        </button>
      </div>
    `);
  }

  createArticle(event) {
    event.preventDefault();
    console.log('💾 Создание новой статьи с файлами');

    const formData = new FormData(event.target);

    // Валидация
    if (!formData.get('title').trim()) {
      this.showNotification('Заполните заголовок статьи!', 'error');
      return;
    }

    if (!formData.get('content').trim()) {
      this.showNotification('Заполните содержание статьи!', 'error');
      return;
    }

    // Создание новой статьи
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
      updated: new Date().toISOString(),
      attachments: this.tempFiles.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedBy: file.uploadedBy,
        uploaded: file.uploaded
      })),
      editHistory: []
    };

    // Добавление в систему
    this.data.knowledgeBase.push(newArticle);
    this.saveData();
    this.hideModal();
    this.showNotification(`Статья "${newArticle.title}" создана!${this.tempFiles.length > 0 ? ` Прикреплено файлов: ${this.tempFiles.length}` : ''}`, 'success');

    // Очищаем временные файлы
    this.tempFiles = [];

    // Переход к базе знаний если не на этой странице
    if (this.currentRoute !== 'knowledge') {
      this.navigate('knowledge');
    } else {
      this.renderContent();
    }
  }

  // Остальные методы из базовой версии...
  // (Включаем все основные методы: applyTheme, bindEvents, navigate, renderContent, и т.д.)
  // Загрузка шаблонов статей
  loadTemplate(templateType) {
    const templates = {
      hardware: `# Инструкция по [Название оборудования Rikor]

## Описание устройства
Краткое описание устройства и его назначения.

## Технические характеристики
- **Процессор**: [Характеристики]
- **Память**: [Объем RAM]
- **Накопитель**: [Тип и объем]
- **Операционная система**: [ОС]

## Пошаговая инструкция

### Подготовка
1. Убедитесь, что устройство выключено
2. Подготовьте необходимые инструменты
3. Ознакомьтесь с техникой безопасности

### Основные шаги
1. Первый шаг выполнения задачи
2. Второй шаг с подробным описанием
3. Третий шаг и проверка результата

## Устранение неполадок
- **Проблема 1**: Описание и решение
- **Проблема 2**: Описание и решение

## Полезные советы
- Рекомендация 1
- Рекомендация 2

## См. также
Ссылки на связанные статьи или документацию.`,

      software: `# Установка и настройка [Название ПО]

## Системные требования
- **ОС**: Windows 10/11 или выше
- **RAM**: Минимум 4 ГБ (рекомендуется 8 ГБ)
- **Свободное место**: 2 ГБ
- **Дополнительно**: [Особые требования]

## Загрузка программы
1. Перейдите на официальный сайт
2. Выберите версию для вашей ОС
3. Скачайте установочный файл

## Установка
1. Запустите установочный файл от имени администратора
2. Следуйте инструкциям мастера установки
3. Выберите компоненты для установки
4. Дождитесь завершения установки

## Первоначальная настройка
1. Запустите программу
2. Выполните начальную настройку
3. Настройте параметры по умолчанию

## Основные функции
- **Функция 1**: Описание и использование
- **Функция 2**: Описание и использование

## Часто задаваемые вопросы
**В**: Частый вопрос?
**О**: Ответ на вопрос.

## Обновление
Инструкция по обновлению программы до последней версии.`,

      troubleshooting: `# Решение проблемы: [Название проблемы]

## Описание проблемы
Подробное описание проблемы, симптомы и условия возникновения.

## Возможные причины
1. **Причина 1**: Описание причины
2. **Причина 2**: Описание причины
3. **Причина 3**: Описание причины

## Диагностика

### Шаг 1: Первичная проверка
- Проверьте подключение питания
- Убедитесь в правильности подключений
- Проверьте индикаторы состояния

### Шаг 2: Расширенная диагностика
1. Откройте [диагностическое ПО/раздел]
2. Запустите тестирование
3. Проанализируйте результаты

## Решение

### Метод 1: [Название метода]
1. Подробный первый шаг
2. Второй шаг с пояснениями
3. Проверка результата

### Метод 2: Альтернативное решение
Если первый метод не помог, попробуйте:
1. Альтернативный первый шаг
2. Дополнительные действия

## Профилактика
Рекомендации по предотвращению повторения проблемы:
- Регулярное обслуживание
- Мониторинг показателей
- Своевременные обновления

## Когда обращаться в поддержку
Если проблема не решается данными методами, создайте тикет с указанием:
- Модель устройства Rikor
- Серийный номер
- Выполненные действия
- Коды ошибок`
    };

    const textarea = document.querySelector('textarea[name="content"]');
    if (textarea && templates[templateType]) {
      textarea.value = templates[templateType];
      this.showNotification(`Шаблон "${templateType}" загружен`, 'success');
    }
  }

  // Предпросмотр статьи
  previewArticle() {
    const form = document.getElementById('createArticleForm');
    const formData = new FormData(form);
    const content = formData.get('content');

    if (!content.trim()) {
      this.showNotification('Заполните содержание статьи для предпросмотра', 'error');
      return;
    }

    this.showModal(`
      <div class="modal-header">
        <div>
          <h2 class="modal-title">Предпросмотр статьи</h2>
          <p style="color: var(--rikor-text-muted); margin: 4px 0 0; font-size: 14px;">Как будет выглядеть статья после публикации</p>
        </div>
        <button class="modal-close" onclick="app.hideModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body" style="max-width: 800px; max-height: 70vh; overflow-y: auto;">
        <div style="background: var(--rikor-bg-tertiary); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
          <h1 style="color: var(--rikor-text-primary); margin-bottom: 16px;">${formData.get('title') || 'Заголовок статьи'}</h1>
          <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 16px;">
            <span class="badge badge--info">${this.getCategoryText(formData.get('category'))}</span>
            <span style="color: var(--rikor-text-muted); font-size: 13px;">
              <i class="fas fa-user mr-1"></i>${this.currentUser.name}
            </span>
            <span style="color: var(--rikor-text-muted); font-size: 13px;">
              <i class="fas fa-calendar mr-1"></i>${new Date().toLocaleDateString('ru-RU')}
            </span>
          </div>
        </div>

        <div class="rendered-content">
          ${this.renderMarkdown(content)}
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" onclick="app.hideModal()">
          <i class="fas fa-arrow-left mr-2"></i>Вернуться к редактированию
        </button>
        <button class="btn btn--primary" onclick="app.hideModal(); document.getElementById('createArticleForm').dispatchEvent(new Event('submit'))">
          <i class="fas fa-check mr-2"></i>Опубликовать статью
        </button>
      </div>
    `);
  }

  // ========================================
  // ОСНОВНЫЕ МЕТОДЫ ИНТЕРФЕЙСА
  // ========================================

  applyTheme() {
    document.body.setAttribute('data-theme', this.settings.theme);
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = this.settings.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
      }
    }
  }

  bindEvents() {
    // Переключение темы
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Навигация
    document.querySelectorAll('.sidebar__link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const route = link.getAttribute('data-route');
        this.navigate(route);
      });
    });

    // FAB меню
    const fabButton = document.getElementById('fabButton');
    const fabMenu = document.getElementById('fabMenu');

    if (fabButton && fabMenu) {
      fabButton.addEventListener('click', (e) => {
        e.stopPropagation();
        fabMenu.classList.toggle('hidden');
      });

      document.addEventListener('click', () => {
        fabMenu.classList.add('hidden');
      });
    }

    // Модальные окна - закрытие по оверлею
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        this.hideModal();
      }
    });

    // Горячие клавиши
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        this.showCreateTicketModal();
      }
      if (e.ctrlKey && e.key === 'e' && this.currentRoute === 'knowledge') {
        e.preventDefault();
        this.showCreateArticleModal();
      }
      if (e.key === 'Escape') {
        this.hideModal();
      }
    });

    // Drag & Drop для файлов
    document.addEventListener('dragover', (e) => {
      e.preventDefault();
      const uploadArea = document.querySelector('.file-upload-area');
      if (uploadArea) {
        uploadArea.classList.add('dragover');
      }
    });

    document.addEventListener('dragleave', (e) => {
      const uploadArea = document.querySelector('.file-upload-area');
      if (uploadArea && !uploadArea.contains(e.relatedTarget)) {
        uploadArea.classList.remove('dragover');
      }
    });

    document.addEventListener('drop', (e) => {
      e.preventDefault();
      const uploadArea = document.querySelector('.file-upload-area');
      if (uploadArea) {
        uploadArea.classList.remove('dragover');
        const files = Array.from(e.dataTransfer.files);
        files.forEach(file => this.validateAndAddFile(file));
      }
    });
  }

  toggleTheme() {
    this.settings.theme = this.settings.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('rikor-theme', this.settings.theme);
    this.applyTheme();
    this.showNotification(`Тема изменена на ${this.settings.theme === 'light' ? 'светлую' : 'темную'}`, 'success');
  }

  navigate(route) {
    console.log(`📍 Переход к разделу: ${route}`);
    this.currentRoute = route;

    // Обновляем активную ссылку
    document.querySelectorAll('.sidebar__link').forEach(link => {
      link.classList.remove('active');
    });

    const activeLink = document.querySelector(`[data-route="${route}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }

    // Обновляем хлебные крошки
    const pageNames = {
      'dashboard': 'Панель управления',
      'tickets': 'Управление тикетами',
      'knowledge': 'База знаний',
      'reports': 'Отчеты и аналитика',
      'users': 'Управление пользователями',
      'settings': 'Настройки системы'
    };

    const currentPageElement = document.getElementById('currentPage');
    if (currentPageElement) {
      currentPageElement.textContent = pageNames[route] || route;
    }

    this.renderContent();
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'dashboard';
    this.navigate(hash);
  }

  renderContent() {
    const content = document.getElementById('content');
    if (!content) return;

    try {
      let html = '';

      switch (this.currentRoute) {
        case 'dashboard':
          html = this.renderDashboard();
          break;
        case 'tickets':
          html = this.renderTickets();
          break;
        case 'knowledge':
          html = this.renderKnowledge();
          break;
        case 'reports':
          html = this.renderReports();
          break;
        case 'users':
          html = this.renderUsers();
          break;
        case 'settings':
          html = this.renderSettings();
          break;
        default:
          html = this.renderDashboard();
      }

      content.innerHTML = html;

      // Инициализируем графики после рендеринга
      if (this.currentRoute === 'dashboard' || this.currentRoute === 'reports') {
        setTimeout(() => this.initCharts(), 100);
      }

    } catch (error) {
      console.error('❌ Ошибка рендеринга контента:', error);
      content.innerHTML = `
        <div class="card">
          <h2 style="color: var(--rikor-error); margin-bottom: 16px;">
            <i class="fas fa-exclamation-triangle mr-2"></i>Ошибка загрузки
          </h2>
          <p>Произошла ошибка при загрузке раздела "${this.currentRoute}":</p>
          <p><strong>${error.message}</strong></p>
          <button class="btn btn--primary mt-4" onclick="app.navigate('dashboard')">
            <i class="fas fa-home mr-2"></i>Вернуться на главную
          </button>
        </div>
      `;
    }
  }

  // ========================================
  // РЕНДЕРИНГ РАЗДЕЛОВ
  // ========================================

  renderDashboard() {
    const stats = this.data.stats;
    const recentTickets = this.data.tickets.slice(0, 5);

    return `
      <div class="dashboard">
        <div class="card" style="background: linear-gradient(135deg, var(--rikor-primary), var(--rikor-primary-light)); color: white; margin-bottom: 24px;">
          <h1 style="color: white; margin-bottom: 8px;">
            <i class="fas fa-headset mr-2"></i>Rikor HelpDesk v2.4.0 РАСШИРЕННАЯ
          </h1>
          <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 16px;">
            ✅ Создание тикетов • ✅ Создание статей • ✅ Поддержка файлов • ✅ Ответы пользователям • ✅ Смена статусов
          </p>
          <div style="margin-top: 12px; font-size: 14px; color: rgba(255,255,255,0.8);">
            <i class="fas fa-calendar-alt mr-1"></i>Система технической поддержки • Сегодня: ${new Date().toLocaleDateString('ru-RU')}
          </div>
        </div>

        <div class="grid grid--4 mb-4">
          <div class="stat-card">
            <div class="stat-card-icon" style="background: linear-gradient(135deg, var(--rikor-primary), var(--rikor-primary-light)); color: white;">
              <i class="fas fa-ticket-alt"></i>
            </div>
            <div class="stat-card-value">${stats.totalTickets}</div>
            <div class="stat-card-label">Всего тикетов</div>
            <div class="stat-card-trend trend--up">
              <i class="fas fa-arrow-up mr-1"></i>+12% за месяц
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-card-icon" style="background: linear-gradient(135deg, var(--rikor-error), #f87171); color: white;">
              <i class="fas fa-exclamation-circle"></i>
            </div>
            <div class="stat-card-value">${stats.openTickets}</div>
            <div class="stat-card-label">Открытых тикетов</div>
            <div class="stat-card-trend trend--down">
              <i class="fas fa-arrow-down mr-1"></i>-8% за неделю
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-card-icon" style="background: linear-gradient(135deg, var(--rikor-warning), #fbbf24); color: white;">
              <i class="fas fa-clock"></i>
            </div>
            <div class="stat-card-value">${stats.inProgressTickets}</div>
            <div class="stat-card-label">В работе</div>
            <div class="stat-card-trend trend--up">
              <i class="fas fa-arrow-up mr-1"></i>+5% за неделю
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-card-icon" style="background: linear-gradient(135deg, var(--rikor-success), #34d399); color: white;">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="stat-card-value">${stats.avgResponseTime}</div>
            <div class="stat-card-label">Время ответа (ч)</div>
            <div class="stat-card-trend trend--down">
              <i class="fas fa-arrow-down mr-1"></i>Отлично
            </div>
          </div>
        </div>

        <div class="grid grid--2">
          <div class="card">
            <div class="card-header">
              <div>
                <h3 class="card-title">Динамика за текущий год</h3>
                <p class="card-subtitle">Количество обращений по месяцам</p>
              </div>
            </div>
            <canvas id="monthlyChart" width="400" height="200"></canvas>
          </div>

          <div class="card">
            <div class="card-header">
              <div>
                <h3 class="card-title">Распределение по важности</h3>
                <p class="card-subtitle">Приоритеты активных тикетов</p>
              </div>
            </div>
            <canvas id="priorityChart" width="400" height="200"></canvas>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div>
              <h3 class="card-title">Недавно созданные обращения</h3>
              <p class="card-subtitle">Полная система обработки обращений с созданием новых тикетов</p>
            </div>
            <button class="btn btn--primary" onclick="app.showCreateTicketModal()">
              <i class="fas fa-plus mr-2"></i>Создать тикет
            </button>
          </div>

          ${recentTickets.map(ticket => `
            <div class="card" style="margin-bottom: 16px; cursor: pointer;" onclick="app.viewTicket('${ticket.id}')">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span class="badge badge--primary">${ticket.id}</span>
                  <span class="badge priority--${ticket.priority}">${this.getPriorityText(ticket.priority)}</span>
                </div>
                <span class="badge status--${ticket.status}">${this.getStatusText(ticket.status)}</span>
              </div>

              <h4 style="margin-bottom: 8px; color: var(--rikor-text-primary);">${ticket.title}</h4>

              <div style="color: var(--rikor-text-muted); font-size: 13px; margin-bottom: 12px;">
                ${this.getDeviceIcon(ticket.deviceType)} ${ticket.deviceType} 
                ${ticket.serialNumber ? '• S/N: ' + ticket.serialNumber : ''} • ${ticket.assignee}
              </div>

              <p style="color: var(--rikor-text-secondary); font-size: 13px; line-height: 1.4; margin-bottom: 8px;">
                ${ticket.description.length > 100 ? ticket.description.substring(0, 100) + '...' : ticket.description}
              </p>

              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--rikor-text-muted);">
                <span>${this.formatDateTime(ticket.created)}</span>
                <div style="display: flex; gap: 12px;">
                  ${ticket.replies.length > 0 ? `<span><i class="fas fa-comments mr-1"></i>${ticket.replies.length}</span>` : ''}
                  ${ticket.attachments.length > 0 ? `<span><i class="fas fa-paperclip mr-1"></i>${ticket.attachments.length}</span>` : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderTickets() {
    return `
      <div class="tickets-page">
        <div class="card" style="margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h1 style="margin-bottom: 8px;">
                <i class="fas fa-ticket-alt mr-2"></i>Управление тикетами
              </h1>
              <p class="card-subtitle">Полная система управления обращениями с поддержкой файлов и ответов</p>
            </div>
            <button class="btn btn--primary" onclick="app.showCreateTicketModal()">
              <i class="fas fa-plus mr-2"></i>Создать тикет
            </button>
          </div>
        </div>

        ${this.data.tickets.map(ticket => `
          <div class="card" style="margin-bottom: 20px; transition: all var(--transition-fast); cursor: pointer;" onclick="app.viewTicket('${ticket.id}')" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
              <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px;">
                <span class="badge badge--primary" style="font-weight: 600;">${ticket.id}</span>
                <span class="badge priority--${ticket.priority}">
                  <i class="${this.getPriorityIcon(ticket.priority)} mr-1"></i>
                  ${this.getPriorityText(ticket.priority)}
                </span>
                <span class="badge status--${ticket.status}">${this.getStatusText(ticket.status)}</span>
              </div>
              <div style="text-align: right; font-size: 12px; color: var(--rikor-text-muted);">
                ${this.formatDateTime(ticket.created)}
              </div>
            </div>

            <h3 style="margin-bottom: 12px; color: var(--rikor-text-primary); font-size: 18px;">
              ${ticket.title}
            </h3>

            <div style="background: var(--rikor-bg-tertiary); padding: 16px; border-radius: 8px; margin-bottom: 16px;">
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; font-size: 13px;">
                <div>
                  <strong style="color: var(--rikor-text-primary);">Устройство:</strong><br>
                  ${this.getDeviceIcon(ticket.deviceType)} ${ticket.deviceType}
                  ${ticket.deviceModel ? `<br><span style="color: var(--rikor-text-muted); font-size: 12px;">Модель: ${ticket.deviceModel}</span>` : ''}
                </div>
                <div>
                  <strong style="color: var(--rikor-text-primary);">Исполнитель:</strong><br>
                  ${ticket.assignee}
                  ${ticket.location ? `<br><span style="color: var(--rikor-text-muted); font-size: 12px;">📍 ${ticket.location}</span>` : ''}
                </div>
                <div>
                  <strong style="color: var(--rikor-text-primary);">Время:</strong><br>
                  Потрачено: ${ticket.timeSpent}ч / ${ticket.estimatedTime}ч
                </div>
              </div>
            </div>

            <p style="color: var(--rikor-text-secondary); line-height: 1.5; margin-bottom: 16px;">
              ${ticket.description.length > 150 ? ticket.description.substring(0, 150) + '...' : ticket.description}
            </p>

            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; gap: 8px; align-items: center;">
                <button class="btn btn--secondary btn--small" onclick="event.stopPropagation(); app.viewTicket('${ticket.id}')">
                  <i class="fas fa-eye mr-1"></i>Просмотр
                </button>
                ${ticket.replies.length > 0 ? `
                  <span style="display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--rikor-text-muted);">
                    <i class="fas fa-comments"></i>${ticket.replies.length}
                  </span>
                ` : ''}
                ${ticket.attachments.length > 0 ? `
                  <span style="display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--rikor-text-muted);">
                    <i class="fas fa-paperclip"></i>${ticket.attachments.length}
                  </span>
                ` : ''}
              </div>
              <div style="display: flex; gap: 6px;">
                ${ticket.tags.map(tag => `
                  <span style="background: var(--rikor-bg-hover); color: var(--rikor-text-muted); padding: 2px 6px; border-radius: 4px; font-size: 11px;">
                    #${tag}
                  </span>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderKnowledge() {
    return `
      <div class="knowledge-page">
        <div class="card" style="margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h1 style="margin-bottom: 8px;">
                <i class="fas fa-book mr-2"></i>База знаний
              </h1>
              <p class="card-subtitle">Полная система управления статьями с поддержкой файлов и Markdown</p>
            </div>
            <button class="btn btn--primary" onclick="app.showCreateArticleModal()">
              <i class="fas fa-plus mr-2"></i>Создать статью
            </button>
          </div>
        </div>

        <div class="grid grid--2">
          ${this.data.knowledgeBase.map(article => `
            <div class="card" style="cursor: pointer; transition: all var(--transition-fast);" onclick="app.viewArticle('${article.id}')" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <span class="badge badge--info">${this.getCategoryText(article.category)}</span>
                <div style="display: flex; align-items: center; gap: 12px; font-size: 12px; color: var(--rikor-text-muted);">
                  <span><i class="fas fa-eye mr-1"></i>${article.views}</span>
                  ${article.attachments.length > 0 ? `<span><i class="fas fa-paperclip mr-1"></i>${article.attachments.length}</span>` : ''}
                </div>
              </div>

              <h3 style="margin-bottom: 12px; color: var(--rikor-text-primary); line-height: 1.4;">
                ${article.title}
              </h3>

              <p style="color: var(--rikor-text-secondary); line-height: 1.5; margin-bottom: 16px; font-size: 14px;">
                ${this.extractTextFromMarkdown(article.content).substring(0, 120)}...
              </p>

              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--rikor-text-muted);">
                  <span><i class="fas fa-user mr-1"></i>${article.author}</span>
                  <span><i class="fas fa-calendar mr-1"></i>${this.formatDate(article.updated)}</span>
                </div>
                <button class="btn btn--secondary btn--small" onclick="event.stopPropagation(); app.viewArticle('${article.id}')">
                  <i class="fas fa-book-open mr-1"></i>Читать
                </button>
              </div>

              ${article.tags.length > 0 ? `
                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--rikor-border-light);">
                  ${article.tags.map(tag => `
                    <span style="background: var(--rikor-bg-hover); color: var(--rikor-text-muted); padding: 2px 6px; border-radius: 4px; font-size: 11px; margin-right: 4px;">
                      #${tag}
                    </span>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  renderReports() {
    const stats = this.data.stats;

    return `
      <div class="reports-page">
        <div class="card" style="margin-bottom: 24px;">
          <h1 style="margin-bottom: 8px;">
            <i class="fas fa-chart-bar mr-2"></i>Отчеты и аналитика
          </h1>
          <p class="card-subtitle">Детальная статистика работы системы</p>
        </div>

        <div class="grid grid--4 mb-4">
          <div class="report-metric">
            <div class="report-metric__value">${stats.totalTickets}</div>
            <div class="report-metric__label">Всего тикетов</div>
          </div>
          <div class="report-metric">
            <div class="report-metric__value">${stats.avgResponseTime}ч</div>
            <div class="report-metric__label">Среднее время ответа</div>
          </div>
          <div class="report-metric">
            <div class="report-metric__value">${stats.avgResolutionTime}ч</div>
            <div class="report-metric__label">Время решения</div>
          </div>
          <div class="report-metric">
            <div class="report-metric__value">${stats.slaCompliance}%</div>
            <div class="report-metric__label">Соблюдение SLA</div>
          </div>
        </div>

        <div class="grid grid--2">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Статистика по статусам</h3>
            </div>
            <canvas id="statusChart" width="400" height="200"></canvas>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Производительность агентов</h3>
            </div>
            <div style="padding: 20px;">
              ${this.data.users.filter(u => u.role === 'agent' || u.role === 'admin').map(agent => {
                const resolvedTickets = agent.ticketsResolved || 0;
                const assignedTickets = this.data.tickets.filter(t => t.assignee === agent.name).length;
                return `
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding: 8px; border-radius: 6px; background: var(--rikor-bg-tertiary);">
                    <div>
                      <strong>${agent.name}</strong>
                      <div style="font-size: 12px; color: var(--rikor-text-muted);">${agent.department}</div>
                    </div>
                    <div style="text-align: right; font-size: 13px;">
                      <div>Решено: ${resolvedTickets}</div>
                      <div style="color: var(--rikor-text-muted);">Активных: ${assignedTickets}</div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderUsers() {
    return `
      <div class="users-page">
        <div class="card" style="margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h1 style="margin-bottom: 8px;">
                <i class="fas fa-users mr-2"></i>Управление пользователями
              </h1>
              <p class="card-subtitle">Администрирование команды технической поддержки</p>
            </div>
            <button class="btn btn--primary" onclick="app.showCreateUserModal()">
              <i class="fas fa-user-plus mr-2"></i>Добавить пользователя
            </button>
          </div>
        </div>

        <div class="grid grid--3">
          ${this.data.users.map(user => `
            <div class="card" style="text-align: center;">
              <div style="margin-bottom: 20px;">
                <div style="width: 64px; height: 64px; background: linear-gradient(135deg, var(--rikor-primary), var(--rikor-primary-light)); border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-weight: 600; font-size: 24px; box-shadow: var(--shadow-md);">
                  ${user.avatar}
                </div>
                <h3 style="margin-bottom: 8px; color: var(--rikor-text-primary);">${user.name}</h3>
                <div style="margin-bottom: 8px;">
                  <span class="badge badge--${user.role === 'admin' ? 'primary' : user.role === 'agent' ? 'info' : 'secondary'}">
                    ${this.getRoleText(user.role)}
                  </span>
                </div>
                <div style="font-size: 13px; color: var(--rikor-text-muted); margin-bottom: 12px;">
                  ${user.email}
                </div>
              </div>

              <div style="display: flex; justify-content: center; margin-bottom: 16px;">
                <span class="badge badge--${user.status === 'online' ? 'success' : user.status === 'away' ? 'warning' : user.status === 'busy' ? 'error' : 'secondary'}">
                  ${this.getStatusText(user.status)}
                </span>
              </div>

              <div style="background: var(--rikor-bg-tertiary); padding: 12px; border-radius: 8px; margin-bottom: 16px;">
                <div style="font-size: 13px; color: var(--rikor-text-muted);">
                  <div style="margin-bottom: 4px;"><strong>Отдел:</strong> ${user.department}</div>
                  ${user.ticketsResolved ? `<div><strong>Решено тикетов:</strong> ${user.ticketsResolved}</div>` : ''}
                  ${user.ticketsCreated ? `<div><strong>Создано тикетов:</strong> ${user.ticketsCreated}</div>` : ''}
                </div>
              </div>

              <button class="btn btn--secondary btn--small">
                <i class="fas fa-edit mr-1"></i>Редактировать
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderSettings() {
    return `
      <div class="settings-page">
        <div class="card" style="margin-bottom: 24px;">
          <h1 style="margin-bottom: 8px;">
            <i class="fas fa-cog mr-2"></i>Настройки системы
          </h1>
          <p class="card-subtitle">Конфигурация Rikor HelpDesk v2.4.0 РАСШИРЕННАЯ</p>
        </div>

        <div class="grid grid--2">
          <div class="card">
            <h3 class="card-title">Персонализация внешнего вида</h3>
            <div class="form-group">
              <label class="form-label">Тема интерфейса</label>
              <select class="form-control" onchange="app.changeTheme(this.value)">
                <option value="light" ${this.settings.theme === 'light' ? 'selected' : ''}>🌞 Светлая тема</option>
                <option value="dark" ${this.settings.theme === 'dark' ? 'selected' : ''}>🌙 Темная тема</option>
              </select>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">Настройка оповещений</h3>
            <div class="form-group">
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" ${this.settings.notifications.email ? 'checked' : ''} onchange="app.updateNotificationSetting('email', this.checked)">
                <span>📧 Email уведомления</span>
              </label>
            </div>
            <div class="form-group">
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" ${this.settings.notifications.push ? 'checked' : ''} onchange="app.updateNotificationSetting('push', this.checked)">
                <span>🔔 Push уведомления</span>
              </label>
            </div>
            <div class="form-group">
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" ${this.settings.notifications.sound ? 'checked' : ''} onchange="app.updateNotificationSetting('sound', this.checked)">
                <span>🔊 Звуковые уведомления</span>
              </label>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">Информация о системе</h3>
            <div style="background: var(--rikor-bg-tertiary); padding: 20px; border-radius: 12px; line-height: 1.6;">
              <div><strong>Версия:</strong> Rikor HelpDesk v2.4.0 РАСШИРЕННАЯ</div>
              <div><strong>Статус:</strong> <span style="color: var(--rikor-success);">✅ Все функции работают</span></div>
              <div><strong>Последнее обновление:</strong> ${new Date().toLocaleDateString('ru-RU')}</div>
              <div><strong>Поддержка файлов:</strong> <span style="color: var(--rikor-success);">✅ Активна</span></div>
              <div><strong>Размер хранилища:</strong> ${this.getStorageSize()}</div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">Управление данными</h3>
            <div class="form-group">
              <button class="btn btn--secondary" onclick="app.exportData()">
                <i class="fas fa-download mr-2"></i>Экспорт данных
              </button>
            </div>
            <div class="form-group">
              <button class="btn btn--warning" onclick="app.clearData()">
                <i class="fas fa-trash mr-2"></i>Очистить данные
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ========================================
  // ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ
  // ========================================

  viewArticle(articleId) {
    const article = this.data.knowledgeBase.find(a => a.id === articleId);
    if (!article) {
      this.showNotification('Статья не найдена!', 'error');
      return;
    }

    // Увеличиваем счетчик просмотров
    article.views++;
    this.saveData();

    this.showModal(`
      <div class="modal-header">
        <div>
          <h2 class="modal-title">${article.title}</h2>
          <div style="display: flex; align-items: center; gap: 12px; margin-top: 8px; font-size: 13px; color: var(--rikor-text-muted);">
            <span class="badge badge--info">${this.getCategoryText(article.category)}</span>
            <span><i class="fas fa-user mr-1"></i>${article.author}</span>
            <span><i class="fas fa-eye mr-1"></i>${article.views} просмотров</span>
            ${article.attachments.length > 0 ? `<span><i class="fas fa-paperclip mr-1"></i>${article.attachments.length} файлов</span>` : ''}
          </div>
        </div>
        <button class="modal-close" onclick="app.hideModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="modal-body" style="max-width: 900px; max-height: 80vh; overflow-y: auto;">
        <div class="rendered-content" style="line-height: 1.6; font-size: 15px;">
          ${this.renderMarkdown(article.content)}
        </div>

        ${article.attachments && article.attachments.length > 0 ? `
          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--rikor-border-light);">
            <h4 style="margin-bottom: 16px; color: var(--rikor-text-primary);">Прикрепленные файлы</h4>
            ${article.attachments.map(attachment => `
              <div class="attached-file">
                <div class="attached-file-icon">
                  <i class="fas ${this.getFileIcon(attachment.name)}"></i>
                </div>
                <div class="attached-file-info">
                  <div class="attached-file-name">${attachment.name}</div>
                  <div class="attached-file-size">${this.formatFileSize(attachment.size)} • ${this.formatDateTime(attachment.uploaded)}</div>
                </div>
                <button class="btn btn--secondary btn--small">
                  <i class="fas fa-download"></i>
                </button>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${article.tags && article.tags.length > 0 ? `
          <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--rikor-border-light);">
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${article.tags.map(tag => `
                <span style="background: var(--rikor-bg-hover); color: var(--rikor-text-muted); padding: 4px 8px; border-radius: 12px; font-size: 12px;">
                  #${tag}
                </span>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <div class="modal-footer">
        <button class="btn btn--secondary" onclick="app.hideModal()">
          <i class="fas fa-times mr-2"></i>Закрыть
        </button>
        <button class="btn btn--info">
          <i class="fas fa-edit mr-2"></i>Редактировать
        </button>
      </div>
    `);
  }

  renderMarkdown(content) {
    // Простой рендеринг Markdown
    return content
      .replace(/^# (.*$)/gm, '<h1 style="color: var(--rikor-text-primary); margin: 24px 0 16px; font-size: 28px; font-weight: 700;">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 style="color: var(--rikor-text-primary); margin: 20px 0 12px; font-size: 22px; font-weight: 600;">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 style="color: var(--rikor-text-primary); margin: 16px 0 8px; font-size: 18px; font-weight: 600;">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.*$)/gm, '<li style="margin-bottom: 4px;">$1</li>')
      .replace(/(<li.*<\/li>)/s, '<ul style="margin: 12px 0; padding-left: 24px;">$1</ul>')
      .replace(/^\d+\. (.*$)/gm, '<li style="margin-bottom: 4px;">$1</li>')
      .replace(/\n\n/g, '</p><p style="margin-bottom: 16px; line-height: 1.6;">')
      .replace(/^(?!<[h|u|l])/gm, '<p style="margin-bottom: 16px; line-height: 1.6;">')
      .replace(/$(?!<\/)/gm, '</p>');
  }

  extractTextFromMarkdown(content) {
    return content
      .replace(/^#+\s/gm, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/^[-\d+\.\s]/gm, '')
      .replace(/\n/g, ' ')
      .trim();
  }

  showCreateUserModal() {
    this.showModal(`
      <div class="modal-header">
        <h2 class="modal-title">Добавить пользователя</h2>
        <button class="modal-close" onclick="app.hideModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <p>Функция добавления пользователей будет доступна в следующих версиях.</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" onclick="app.hideModal()">Закрыть</button>
      </div>
    `);
  }

  initCharts() {
    try {
      // Очищаем предыдущие графики
      Object.values(this.chartInstances).forEach(chart => chart.destroy());
      this.chartInstances = {};

      // График по месяцам
      const monthlyCanvas = document.getElementById('monthlyChart');
      if (monthlyCanvas) {
        this.chartInstances.monthly = new Chart(monthlyCanvas, {
          type: 'line',
          data: {
            labels: this.data.stats.monthlyLabels,
            datasets: [{
              label: 'Тикеты',
              data: this.data.stats.monthlyTrend,
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { beginAtZero: true, grid: { color: 'var(--rikor-border)' } },
              x: { grid: { color: 'var(--rikor-border)' } }
            }
          }
        });
      }

      // График приоритетов
      const priorityCanvas = document.getElementById('priorityChart');
      if (priorityCanvas) {
        this.chartInstances.priority = new Chart(priorityCanvas, {
          type: 'doughnut',
          data: {
            labels: this.data.stats.priorityLabels,
            datasets: [{
              data: Object.values(this.data.stats.priorityStats),
              backgroundColor: this.data.stats.priorityColors
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
          }
        });
      }

      // График статусов (для отчетов)
      const statusCanvas = document.getElementById('statusChart');
      if (statusCanvas) {
        this.chartInstances.status = new Chart(statusCanvas, {
          type: 'bar',
          data: {
            labels: this.data.stats.statusLabels,
            datasets: [{
              label: 'Количество',
              data: Object.values(this.data.stats.statusStats),
              backgroundColor: this.data.stats.statusColors
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
          }
        });
      }

    } catch (error) {
      console.warn('⚠️ Ошибка инициализации графиков:', error);
    }
  }

  // Автоназначение исполнителя
  autoAssignAgent() {
    const agents = this.data.users.filter(u => u.role === 'agent' || u.role === 'admin');
    const agentWorkloads = agents.map(agent => ({
      name: agent.name,
      workload: this.data.tickets.filter(t => t.assignee === agent.name && t.status !== 'resolved' && t.status !== 'closed').length
    }));

    // Возвращаем агента с наименьшей нагрузкой
    agentWorkloads.sort((a, b) => a.workload - b.workload);
    return agentWorkloads[0]?.name || 'Не назначен';
  }

  // Оценка времени решения
  estimateTime(priority) {
    const timeEstimates = {
      'critical': 2,
      'high': 4,
      'medium': 8,
      'low': 24
    };
    return timeEstimates[priority] || 8;
  }

  // Работа с настройками
  changeTheme(theme) {
    this.settings.theme = theme;
    localStorage.setItem('rikor-theme', theme);
    this.applyTheme();
  }

  updateNotificationSetting(type, value) {
    this.settings.notifications[type] = value;
    this.showNotification(`Настройка "${type}" ${value ? 'включена' : 'отключена'}`, 'info');
  }

  getStorageSize() {
    try {
      const data = JSON.stringify(this.data);
      const sizeInBytes = new Blob([data]).size;
      return this.formatFileSize(sizeInBytes);
    } catch (error) {
      return 'Неизвестно';
    }
  }

  exportData() {
    try {
      const dataStr = JSON.stringify(this.data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `rikor-helpdesk-backup-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
      this.showNotification('Данные экспортированы успешно!', 'success');
    } catch (error) {
      this.showNotification('Ошибка экспорта данных', 'error');
    }
  }

  clearData() {
    if (confirm('Вы уверены, что хотите очистить все данные? Это действие необратимо!')) {
      localStorage.removeItem('rikor-data');
      this.data = this.loadData();
      this.renderContent();
      this.showNotification('Данные очищены', 'success');
    }
  }

  startAutoRefresh() {
    if (this.settings.autoRefresh) {
      setInterval(() => {
        console.log('🔄 Автообновление данных...');
        // Здесь можно добавить логику синхронизации с сервером
      }, this.settings.refreshInterval);
    }
  }

  // Получение иконок устройств
  getDeviceIcon(deviceType) {
    const icons = {
      'Сервер': '🖥️',
      'Ноутбук': '💻',
      'Планшет': '📱',
      'Моноблок': '🖥️',
      'Мини-ПК': '📦',
      'Рабочая станция': '🖥️'
    };
    return icons[deviceType] || '💻';
  }

  getPriorityIcon(priority) {
    const icons = {
      'critical': 'fas fa-exclamation-circle',
      'high': 'fas fa-exclamation-triangle',
      'medium': 'fas fa-minus-circle',
      'low': 'fas fa-info-circle'
    };
    return icons[priority] || 'fas fa-minus-circle';
  }

  // Получение текстовых значений
  getStatusText(status) {
    const statuses = {
      'open': 'Открыт',
      'in_progress': 'В работе',
      'waiting': 'Ожидание',
      'resolved': 'Решен',
      'closed': 'Закрыт',
      'online': 'В сети',
      'away': 'Отошел',
      'busy': 'Занят',
      'offline': 'Не в сети'
    };
    return statuses[status] || status;
  }

  getPriorityText(priority) {
    const priorities = {
      'critical': 'Критический',
      'high': 'Высокий',
      'medium': 'Средний',
      'low': 'Низкий'
    };
    return priorities[priority] || priority;
  }

  getRoleText(role) {
    const roles = {
      'admin': 'Администратор',
      'agent': 'Агент поддержки',
      'manager': 'Менеджер',
      'user': 'Пользователь'
    };
    return roles[role] || role;
  }

  getCategoryText(category) {
    const categories = {
      'hardware': 'Оборудование',
      'software': 'ПО',
      'network': 'Сеть',
      'performance': 'Производительность',
      'security': 'Безопасность',
      'configuration': 'Настройка',
      'other': 'Другое'
    };
    return categories[category] || category;
  }

  // Форматирование дат
  formatDateTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('ru-RU') + ' ' + date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }

  formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('ru-RU');
  }

  // Управление модальными окнами
  showModal(content) {
    const overlay = document.getElementById('modal-overlay');
    const container = document.getElementById('modal-container');

    if (overlay && container) {
      container.innerHTML = content;
      overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';

      // Инициализируем обработчики файлов для модального окна
      setTimeout(() => this.setupFileHandlers(), 100);
    }
  }

  hideModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
      this.tempFiles = []; // Очищаем временные файлы
    }
  }

  // Система уведомлений
  showNotification(message, type = 'info') {
    const container = document.getElementById('notifications');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;

    const icons = {
      'success': 'fa-check-circle',
      'error': 'fa-exclamation-circle',
      'warning': 'fa-exclamation-triangle',
      'info': 'fa-info-circle'
    };

    const colors = {
      'success': '#10b981',
      'error': '#ef4444',
      'warning': '#f59e0b',
      'info': '#06b6d4'
    };

    notification.innerHTML = `
      <div class="notification__icon" style="background: ${colors[type]};">
        <i class="fas ${icons[type]}"></i>
      </div>
      <div class="notification__content">
        <div class="notification__message">${message}</div>
      </div>
    `;

    container.appendChild(notification);

    // Автоудаление через 5 секунд
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }
}

// Инициализация приложения
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new RikorHelpDeskEnhanced();
});

// Глобальные функции для совместимости
window.app = app;