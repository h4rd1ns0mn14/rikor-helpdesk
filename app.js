// Rikor HelpDesk v2.3.0 - РАСШИРЕННАЯ ВЕРСИЯ с редактированием статей, загрузкой файлов и ответами в тикетах
class RikorHelpDeskAdvanced {
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
      refreshInterval: 30000,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      allowedFileTypes: ['.pdf', '.doc', '.docx', '.txt', '.md', '.jpg', '.png', '.zip']
    };

    // ОБНОВЛЕННЫЕ данные с новыми полями для v2.3.0
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
    console.log('🚀 Инициализация Rikor HelpDesk v2.3.0 с расширенными функциями...');
    this.applyTheme();
    this.bindEvents();
    this.handleRoute();
    this.startAutoRefresh();
    setTimeout(() => {
      this.showNotification('Система Rikor HelpDesk v2.3.0 готова к работе! Новые функции: редактирование статей, загрузка файлов, ответы в тикетах', 'success');
    }, 1000);
  }

  // ОБНОВЛЕННАЯ загрузка данных с новыми полями для v2.3.0
  loadData() {
    const defaultData = {
      tickets: [
        {
          id: "RIK-2025-001",
          title: "Перегрев сервера Rikor RP6224 в ЦОД",
          description: "Сервер Rikor RP6224 показывает температуру CPU 85°C в нормальном режиме работы. Система охлаждения работает на максимальных оборотах.",
          status: "open", priority: "critical", category: "hardware",
          deviceType: "Сервер", deviceModel: "RP6224", 
          serialNumber: "RP6224-2024-001523",
          assignee: "Иван Петров", reporter: "Анна Смирнова",
          created: "2025-09-22T06:15:00Z", updated: "2025-09-22T08:30:00Z",
          location: "ЦОД-1, Стойка A-15", timeSpent: 2.5, estimatedTime: 4,
          tags: ["rikor", "server", "cooling", "datacenter", "critical"],
          // НОВОЕ: Система ответов в тикетах
          replies: [
            {
              id: 1, author: "Иван Петров", role: "agent", 
              message: "Тикет принят в работу. Выезжаю в ЦОД для диагностики системы охлаждения.", 
              created: "2025-09-22T08:30:00Z", type: "reply"
            },
            {
              id: 2, author: "Анна Смирнова", role: "user",
              message: "Спасибо! Сервер критически важен для работы отдела разработки.",
              created: "2025-09-22T08:45:00Z", type: "reply"
            }
          ],
          // НОВОЕ: Вложенные файлы
          attachments: [
            { id: 1, name: "server-logs.txt", size: 15420, type: "text/plain", uploadedBy: "Анна Смирнова", uploaded: "2025-09-22T06:20:00Z" },
            { id: 2, name: "temperature-screenshot.png", size: 245680, type: "image/png", uploadedBy: "Анна Смирнова", uploaded: "2025-09-22T06:25:00Z" }
          ]
        },
        {
          id: "RIK-2025-002", 
          title: "Ноутбук Rikor RN NINO не включается",
          description: "После обновления BIOS ноутбук Rikor RN NINO 203.1/15 не реагирует на нажатие кнопки питания.",
          status: "in_progress", priority: "high", category: "hardware",
          deviceType: "Ноутбук", deviceModel: "RN NINO 203.1/15",
          serialNumber: "RN203-2025-000847",
          assignee: "Елена Новикова", reporter: "Сергей Волков",
          created: "2025-09-21T16:45:00Z", updated: "2025-09-22T09:20:00Z",
          location: "Офис 1, Комната 205", timeSpent: 1.5, estimatedTime: 3,
          tags: ["rikor", "laptop", "power", "bios"],
          // НОВОЕ: Ответы в тикетах
          replies: [
            {
              id: 1, author: "Елена Новикова", role: "agent",
              message: "Проверила ноутбук. Проблема связана с неудачным обновлением BIOS. Необходимо восстановление прошивки.",
              created: "2025-09-22T09:20:00Z", type: "reply"
            }
          ],
          attachments: []
        },
        {
          id: "RIK-2025-003",
          title: "Медленная работа моноблока Rikor AIO",
          description: "Моноблок Rikor AIO 201.1/23 стал работать медленно после обновления Windows 11.",
          status: "resolved", priority: "medium", category: "software",
          deviceType: "Моноблок", deviceModel: "AIO 201.1/23",
          serialNumber: "AIO201-2024-002156",
          assignee: "Петр Сидоров", reporter: "Михаил Кузнецов",
          created: "2025-09-20T11:30:00Z", updated: "2025-09-22T09:15:00Z",
          resolvedAt: "2025-09-22T09:15:00Z", timeSpent: 4.2, estimatedTime: 4,
          tags: ["rikor", "aio", "performance", "windows"],
          replies: [
            {
              id: 1, author: "Петр Сидоров", role: "admin",
              message: "Проблема решена. Установлены обновленные драйверы и оптимизированы настройки Windows 11. Производительность восстановлена.",
              created: "2025-09-22T09:15:00Z", type: "solution"
            }
          ],
          attachments: [
            { id: 1, name: "performance-report.pdf", size: 892340, type: "application/pdf", uploadedBy: "Петр Сидоров", uploaded: "2025-09-22T09:10:00Z" }
          ]
        },
        {
          id: "RIK-2025-004",
          title: "Настройка виртуализации на сервере Rikor RP6104",
          description: "Требуется настроить параметры BIOS и установить Hyper-V.",
          status: "waiting", priority: "low", category: "configuration",
          deviceType: "Сервер", deviceModel: "RP6104",
          serialNumber: "RP6104-2024-000329",
          assignee: "Алексей Морозов", reporter: "Ольга Иванова",
          created: "2025-09-22T08:20:00Z", updated: "2025-09-22T09:00:00Z",
          location: "ЦОД-2, Стойка B-08", timeSpent: 0.5, estimatedTime: 6,
          tags: ["rikor", "server", "bios", "virtualization"],
          replies: [],
          attachments: [
            { id: 1, name: "virtualization-requirements.docx", size: 45680, type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", uploadedBy: "Ольга Иванова", uploaded: "2025-09-22T08:25:00Z" }
          ]
        },
        {
          id: "RIK-2025-005",
          title: "Замена SSD диска в мини-ПК Rikor RPC 301.1",
          description: "Требуется срочная замена SSD диска. SMART показывает критическое состояние.",
          status: "open", priority: "high", category: "hardware",
          deviceType: "Мини ПК", deviceModel: "RPC 301.1",
          serialNumber: "RPC301-2025-001092",
          assignee: "Иван Петров", reporter: "Дмитрий Козлов",
          created: "2025-09-22T07:45:00Z", updated: "2025-09-22T07:45:00Z",
          location: "Офис 1, Переговорная 3", timeSpent: 0, estimatedTime: 2,
          tags: ["rikor", "minipc", "storage", "replacement"],
          replies: [],
          attachments: [
            { id: 1, name: "smart-report.txt", size: 3420, type: "text/plain", uploadedBy: "Дмитрий Козлов", uploaded: "2025-09-22T07:50:00Z" }
          ]
        },
        {
          id: "RIK-2025-006",
          title: "Проблемы с Wi-Fi на планшете Rikor RT 102.1",
          description: "Планшет теряет соединение с Wi-Fi каждые 10-15 минут.",
          status: "open", priority: "medium", category: "network",
          deviceType: "Планшет", deviceModel: "RT 102.1",
          serialNumber: "RT102-2025-000634",
          assignee: "Елена Новикова", reporter: "Анна Смирнова",
          created: "2025-09-22T09:30:00Z", updated: "2025-09-22T09:30:00Z",
          location: "Офис 1, Отдел продаж", timeSpent: 0, estimatedTime: 2,
          tags: ["rikor", "tablet", "wifi", "android"],
          replies: [],
          attachments: []
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

      // ОБНОВЛЕННАЯ база знаний с возможностью редактирования и файлами
      knowledgeBase: [
        {
          id: "KB-001", title: "Устранение перегрева серверов Rikor RP серии", 
          category: "hardware", 
          content: "# Устранение перегрева серверов Rikor RP серии\n\n## Диагностика проблемы\n\n1. **Проверка температуры CPU**\n   - Используйте встроенный мониторинг BIOS\n   - Критическая температура: выше 80°C\n\n2. **Проверка системы охлаждения**\n   - Визуальный осмотр вентиляторов\n   - Проверка работы помп жидкостного охлаждения\n\n3. **Очистка от пыли**\n   - Использовать сжатый воздух\n   - Обратить внимание на радиаторы\n\n## Решение проблемы\n\n### Замена термопасты\n1. Выключить сервер и отключить питание\n2. Снять систему охлаждения\n3. Очистить старую термопасту спиртом\n4. Нанести новую термопасту (Arctic MX-4)\n5. Установить охлаждение обратно\n\n### Проверка вентиляторов\n- Заменить неисправные вентиляторы\n- Проверить подключение к материнской плате\n\n## Профилактика\n\n- Регулярная очистка от пыли (раз в 3 месяца)\n- Мониторинг температуры\n- Проверка системы охлаждения",
          tags: ["сервер", "охлаждение", "rp6224", "температура"], 
          views: 245, rating: 4.8, 
          created: "2025-08-15T10:00:00Z", updated: "2025-09-10T14:30:00Z", 
          author: "Петр Сидоров",
          // НОВОЕ: Прикрепленные файлы к статьям
          attachments: [
            { id: 1, name: "thermal-paste-guide.pdf", size: 2340000, type: "application/pdf", uploadedBy: "Петр Сидоров", uploaded: "2025-08-15T10:15:00Z" },
            { id: 2, name: "server-cleaning-checklist.docx", size: 45000, type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", uploadedBy: "Петр Сидоров", uploaded: "2025-08-15T10:20:00Z" }
          ],
          // НОВОЕ: История редактирования
          editHistory: [
            { editor: "Петр Сидоров", edited: "2025-09-10T14:30:00Z", changes: "Добавлен раздел профилактики" }
          ]
        },
        {
          id: "KB-002", title: "Обновление BIOS на ноутбуках Rikor RN серии", 
          category: "software", 
          content: "# Обновление BIOS на ноутбуках Rikor RN серии\n\n⚠️ **ВНИМАНИЕ**: Неправильное обновление BIOS может привести к выходу устройства из строя!\n\n## Подготовка к обновлению\n\n### Требования:\n- Стабильное питание (подключенный адаптер)\n- Заряд батареи не менее 50%\n- Закрытые программы и отключенный антивирус\n\n### Определение версии BIOS:\n1. Нажать Win + R\n2. Ввести `msinfo32`\n3. Найти строку 'Версия BIOS'\n\n## Процедура обновления\n\n### Загрузка прошивки:\n1. Посетить сайт поддержки Rikor\n2. Найти модель ноутбука\n3. Скачать последнюю версию BIOS\n\n### Установка:\n1. Запустить файл прошивки от имени администратора\n2. Следовать инструкциям мастера\n3. НЕ ОТКЛЮЧАТЬ питание во время процесса\n4. Дождаться автоматической перезагрузки\n\n## Восстановление после сбоя\n\n### Если ноутбук не включается:\n1. Извлечь батарею на 10 минут\n2. Зажать кнопку питания на 30 сек\n3. Подключить только адаптер питания\n4. Попробовать включить\n\n### Recovery режим:\n- Для RN NINO: Fn + F2 при включении\n- Для RN ARZ: Fn + F8 при включении",
          tags: ["ноутбук", "bios", "обновление", "rn-nino"], 
          views: 189, rating: 4.6, 
          created: "2025-07-22T09:15:00Z", updated: "2025-09-05T11:45:00Z", 
          author: "Елена Новикова",
          attachments: [
            { id: 1, name: "bios-recovery-tool.zip", size: 5600000, type: "application/zip", uploadedBy: "Елена Новикова", uploaded: "2025-07-22T09:30:00Z" }
          ],
          editHistory: []
        },
        {
          id: "KB-003", title: "Настройка Wi-Fi на планшетах Rikor RT серии", 
          category: "network", 
          content: "# Настройка Wi-Fi на планшетах Rikor RT серии\n\n## Частые проблемы и решения\n\n### Планшет не видит сеть Wi-Fi\n\n1. **Перезагрузка модуля Wi-Fi:**\n   - Настройки → Wi-Fi → Выкл/Вкл\n   - Или через панель уведомлений\n\n2. **Забытые сети:**\n   - Настройки → Wi-Fi → Сохраненные сети\n   - Удалить проблемную сеть\n   - Подключиться заново\n\n### Частые отключения\n\n**Причина**: Энергосбережение Wi-Fi модуля\n\n**Решение**:\n1. Настройки → Wi-Fi → Дополнительно\n2. Отключить 'Wi-Fi в спящем режиме'\n3. Настройки → Батарея → Wi-Fi → Без ограничений\n\n### Медленная скорость\n\n1. **Проверить частоту:**\n   - Предпочтение 5 ГГц сетям\n   - Избегать перегруженных каналов\n\n2. **Сброс сетевых настроек:**\n   - Настройки → Система → Сброс → Сеть\n   - Потребуется повторная настройка всех сетей\n\n## Оптимальные настройки\n\n- **Безопасность**: WPA3 или WPA2\n- **Частота**: 5 ГГц (при наличии)\n- **DNS**: 8.8.8.8, 1.1.1.1\n\n## Диагностика\n\nИспользовать приложение 'Wi-Fi Analyzer' для анализа сигнала и помех.",
          tags: ["планшет", "wifi", "android", "rt-102"], 
          views: 156, rating: 4.4, 
          created: "2025-06-18T13:20:00Z", updated: "2025-08-28T16:10:00Z", 
          author: "Иван Петров",
          attachments: [],
          editHistory: [
            { editor: "Иван Петров", edited: "2025-08-28T16:10:00Z", changes: "Добавлен раздел диагностики" }
          ]
        },
        {
          id: "KB-004", title: "Замена компонентов в мини-ПК Rikor RPC серии", 
          category: "hardware", 
          content: "# Замена компонентов в мини-ПК Rikor RPC серии\n\n## Поддерживаемые обновления\n\n### RPC 301.1\n- **RAM**: DDR4 SODIMM до 32GB (2 слота)\n- **SSD**: M.2 2280 SATA/NVMe\n- **Wi-Fi**: M.2 2230 модуль\n\n### RPC USFF 104.1\n- **RAM**: DDR4 SODIMM до 16GB (1 слот)\n- **SSD**: M.2 2242 SATA только\n\n## Процедура замены\n\n### Подготовка:\n1. Выключить устройство\n2. Отключить все кабели\n3. Подготовить антистатический браслет\n\n### Замена SSD:\n\n**RPC 301.1:**\n1. Открутить 4 винта на задней панели\n2. Снять крышку\n3. Отсоединить старый SSD\n4. Установить новый, закрепить винтом\n5. Собрать в обратном порядке\n\n**Совместимые SSD:**\n- Samsung 980 PRO (NVMe)\n- Crucial MX500 (SATA)\n- WD Black SN750 (NVMe)\n\n### Замена RAM:\n\n1. Найти слот(ы) памяти\n2. Отжать защелки\n3. Извлечь старую планку под углом 30°\n4. Вставить новую до щелчка\n5. Проверить надежность фиксации\n\n**Совместимая RAM:**\n- DDR4-2666 SODIMM\n- DDR4-3200 SODIMM (работает на 2666)\n\n## Гарантийные обязательства\n\n⚠️ **Важно**: Самостоятельная замена компонентов НЕ влияет на гарантию, если:\n- Используются совместимые компоненты\n- Не повреждены пломбы на материнской плате\n- Соблюдена процедура замены\n\n## После замены\n\n1. Включить устройство\n2. Зайти в BIOS (F2 при загрузке)\n3. Проверить определение компонентов\n4. При замене SSD - переустановить ОС",
          tags: ["мини-пк", "замена", "ssd", "ram", "rpc-301"], 
          views: 134, rating: 4.7, 
          created: "2025-05-30T08:45:00Z", updated: "2025-09-12T12:20:00Z", 
          author: "Алексей Морозов",
          attachments: [
            { id: 1, name: "rpc-disassembly-guide.pdf", size: 3400000, type: "application/pdf", uploadedBy: "Алексей Морозов", uploaded: "2025-05-30T09:00:00Z" },
            { id: 2, name: "compatible-components-list.xlsx", size: 89000, type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", uploadedBy: "Алексей Морозов", uploaded: "2025-09-12T12:25:00Z" }
          ],
          editHistory: [
            { editor: "Алексей Морозов", edited: "2025-09-12T12:20:00Z", changes: "Обновлен список совместимых компонентов" }
          ]
        },
        {
          id: "KB-005", title: "Оптимизация производительности моноблоков Rikor AIO", 
          category: "performance", 
          content: "# Оптимизация производительности моноблоков Rikor AIO\n\n## Диагностика производительности\n\n### Проверка загрузки системы:\n\n1. **Диспетчер задач** (Ctrl+Shift+Esc):\n   - Вкладка 'Процессы'\n   - Сортировка по ЦП и памяти\n   - Выявление ресурсоемких программ\n\n2. **Автозагрузка**:\n   - Диспетчер задач → Автозагрузка\n   - Отключить ненужные программы\n   - Оставить только системные и антивирус\n\n### Тест производительности:\n\n```\nПроизводительность AIO 201.1/23:\n- CPU: Intel i5-1235U\n- RAM: 8-16GB DDR4\n- SSD: 256-512GB NVMe\n```\n\n## Оптимизация Windows 11\n\n### Отключение визуальных эффектов:\n\n1. Система → О программе → Дополнительные параметры\n2. Быстродействие → Параметры\n3. Выбрать 'Обеспечить наилучшее быстродействие'\n\n### Настройка энергопитания:\n\n- Панель управления → Электропитание\n- Выбрать план 'Высокая производительность'\n- Дополнительные параметры → Отключить USB энергосбережение\n\n### Очистка диска:\n\n1. **Встроенная очистка**:\n   - Параметры → Система → Память\n   - Настроить 'Контроль памяти'\n\n2. **Дополнительная очистка**:\n   ```\n   cleanmgr /sagerun:1\n   ```\n\n## Обновление драйверов\n\n### Автоматическое обновление:\n- Windows Update → Дополнительные обновления\n- Установить все драйверы устройств\n\n### Ручное обновление:\n1. Диспетчер устройств\n2. Правой кнопкой → Обновить драйвер\n3. Поиск на сайте производителя\n\n## Мониторинг температуры\n\n**Критические температуры:**\n- CPU: выше 70°C\n- SSD: выше 50°C\n\n**Решения при перегреве:**\n1. Очистка вентиляционных отверстий\n2. Проверка термопасты (через 2-3 года)\n3. Подставка для улучшения вентиляции\n\n## Профилактические меры\n\n- Еженедельный перезапуск системы\n- Ежемесячная проверка обновлений\n- Квартальная очистка от пыли\n- Полугодовая дефрагментация HDD (если есть)",
          tags: ["моноблок", "windows", "производительность", "aio-201"], 
          views: 298, rating: 4.9, 
          created: "2025-04-12T15:30:00Z", updated: "2025-09-15T09:50:00Z", 
          author: "Петр Сидоров",
          attachments: [
            { id: 1, name: "performance-monitoring-tools.zip", size: 8900000, type: "application/zip", uploadedBy: "Петр Сидоров", uploaded: "2025-04-12T15:45:00Z" },
            { id: 2, name: "optimization-checklist.pdf", size: 1200000, type: "application/pdf", uploadedBy: "Петр Сидоров", uploaded: "2025-09-15T10:00:00Z" }
          ],
          editHistory: [
            { editor: "Петр Сидоров", edited: "2025-09-15T09:50:00Z", changes: "Добавлена информация о мониторинге температуры" }
          ]
        }
      ],

      // Данные для графиков остаются без изменений
      stats: {
        totalTickets: 1567, openTickets: 128, inProgressTickets: 45, resolvedTickets: 1298, closedTickets: 96,
        avgResponseTime: "1.8", avgResolutionTime: "14.2", customerSatisfaction: 96.4, slaCompliance: 94.7,
        todayCreated: 12, todayResolved: 18, thisWeekCreated: 67, thisWeekResolved: 84,

        monthlyTrend: [158, 162, 155, 171, 168, 189, 195, 182, 191, 194, 202, 195],
        monthlyLabels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],

        priorityStats: {critical: 15, high: 32, medium: 65, low: 16},
        priorityLabels: ['Критический', 'Высокий', 'Средний', 'Низкий'],
        priorityColors: ['#ef4444', '#f59e0b', '#06b6d4', '#10b981'],

        agentPerformance: {
          "Петр Сидоров": {resolved: 142, avgTime: 12.5, satisfaction: 4.8},
          "Иван Петров": {resolved: 89, avgTime: 18.2, satisfaction: 4.6},
          "Елена Новикова": {resolved: 67, avgTime: 15.7, satisfaction: 4.7},
          "Алексей Морозов": {resolved: 45, avgTime: 22.1, satisfaction: 4.5}
        },

        timeToResolution: { "0-4h": 245, "4-24h": 432, "1-3d": 287, "3-7d": 134, "7d+": 58 },

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
    console.log('💾 Данные v2.3.0 сохранены в LocalStorage');
  }

  // Применение темы (без изменений)
  applyTheme() {
    document.body.setAttribute('data-theme', this.settings.theme);
    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
      themeIcon.className = this.settings.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    console.log(`🎨 Применена тема: ${this.settings.theme}`);
  }

  // Привязка событий (обновлено для новых функций)
  bindEvents() {
    console.log('🔗 Привязка событий v2.3.0...');

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

    // НОВОЕ: Обработчик загрузки файлов
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
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

    // Клавиатурные сокращения (расширенные)
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
          case 'e':
            if (this.currentRoute === 'knowledge') {
              e.preventDefault();
              this.showCreateArticleModal();
            }
            break;
        }
      }
      if (e.key === 'Escape') {
        this.hideModal();
        document.getElementById('fabMenu')?.classList.add('hidden');
      }
    });

    console.log('✅ События v2.3.0 привязаны');
  }

  // Остальные методы навигации без изменений
  toggleTheme() {
    this.settings.theme = this.settings.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('rikor-theme', this.settings.theme);
    this.applyTheme();
    this.showNotification(`Тема изменена на ${this.settings.theme === 'light' ? 'светлую' : 'темную'}`, 'success');
  }

  navigate(route) {
    console.log(`📍 Переход к: ${route}`);
    this.currentRoute = route;
    this.updateActiveLink(route);
    this.updateBreadcrumb(route);
    this.renderContent();
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

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'dashboard';
    this.navigate(hash);
  }

  // Рендеринг контента (обновлен для v2.3.0)
  renderContent() {
    const container = document.getElementById('content');
    if (!container) return;

    container.innerHTML = '<div class="loading" style="min-height: 300px; display: flex; align-items: center; justify-content: center;"><div style="text-align: center;"><div style="font-size: 48px; margin-bottom: 16px;">⏳</div><div>Загрузка...</div></div></div>';

    this.destroyCharts();

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
        console.log(`✅ Контент v2.3.0 отрендерен: ${this.currentRoute}`);
      } catch (error) {
        console.error('❌ Ошибка рендеринга v2.3.0:', error);
        container.innerHTML = `<div class="card"><h2>Ошибка загрузки</h2><p>Произошла ошибка при загрузке раздела "${this.currentRoute}": ${error.message}</p></div>`;
      }
    }, 300);
  }

  destroyCharts() {
    Object.values(this.chartInstances).forEach(chart => {
      if (chart && typeof chart.destroy === 'function') {
        chart.destroy();
      }
    });
    this.chartInstances = {};
  }

  // Dashboard остается без изменений (сохраняем исправленные графики)
  renderDashboard() {
    const stats = this.data.stats;
    return `
      <div class="dashboard">
        <div class="dashboard__header mb-4">
          <h1>Панель управления Rikor HelpDesk v2.3.0</h1>
          <p class="card__subtitle">Общий обзор системы технической поддержки • ${new Date().toLocaleDateString('ru-RU')} • Новые функции: редактирование статей, загрузка файлов, ответы в тикетах</p>
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
                  ${this.getDeviceIcon(ticket.deviceType)} ${ticket.deviceType} • S/N: ${ticket.serialNumber || 'Не указан'} • ${ticket.assignee}
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="display: flex; gap: 8px; align-items: center;">
                    <span class="badge status--${ticket.status}">${this.getStatusText(ticket.status)}</span>
                    ${ticket.replies && ticket.replies.length > 0 ? `<span class="badge badge--info" title="Ответов: ${ticket.replies.length}"><i class="fas fa-comments mr-1"></i>${ticket.replies.length}</span>` : ''}
                    ${ticket.attachments && ticket.attachments.length > 0 ? `<span class="badge badge--secondary" title="Файлов: ${ticket.attachments.length}"><i class="fas fa-paperclip mr-1"></i>${ticket.attachments.length}</span>` : ''}
                  </div>
                  <span style="color: var(--rikor-text-muted); font-size: 12px;">${this.formatDate(ticket.created)}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // ИСПРАВЛЕННАЯ инициализация графиков Dashboard (сохраняем рабочую версию)
  initDashboardCharts() {
    setTimeout(() => {
      try {
        console.log('📊 Инициализация графиков Dashboard v2.3.0...');

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
              plugins: { legend: { display: false } },
              scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(148, 163, 184, 0.1)' } },
                x: { grid: { display: false } }
              },
              elements: { line: { borderWidth: 3 } }
            }
          });
          console.log('✅ График месячной активности создан');
        }

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
                legend: { position: 'bottom', labels: { padding: 20, usePointStyle: true } }
              }
            }
          });
          console.log('✅ График приоритетов создан');
        }

        console.log('🎉 Все графики Dashboard v2.3.0 инициализированы');
      } catch (error) {
        console.error('❌ Ошибка инициализации графиков Dashboard:', error);
      }
    }, 100);
  }

  // ОБНОВЛЕННАЯ функция просмотра тикета с системой ответов и загрузкой файлов
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
            ${ticket.serialNumber ? `<span class="badge badge--info">🏷️ S/N: ${ticket.serialNumber}</span>` : ''}
            ${ticket.replies && ticket.replies.length > 0 ? `<span class="badge badge--success"><i class="fas fa-comments mr-1"></i>${ticket.replies.length} ответов</span>` : ''}
            ${ticket.attachments && ticket.attachments.length > 0 ? `<span class="badge badge--secondary"><i class="fas fa-paperclip mr-1"></i>${ticket.attachments.length} файлов</span>` : ''}
          </div>
        </div>
        <button class="modal-close" onclick="app.hideModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body" style="max-height: 80vh; overflow-y: auto;">
        <div class="ticket-details">
          <!-- Информация о тикете -->
          <div style="background: var(--rikor-bg-tertiary); padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <div class="grid grid--2" style="gap: 16px; font-size: 14px;">
              <div><strong>Устройство:</strong> ${this.getDeviceIcon(ticket.deviceType)} ${ticket.deviceType}</div>
              <div><strong>Модель:</strong> ${ticket.deviceModel || 'Не указана'}</div>
              <div><strong>Серийный номер:</strong> ${ticket.serialNumber ? `🏷️ ${ticket.serialNumber}` : '⚠️ Не указан'}</div>
              <div><strong>Категория:</strong> ${this.getCategoryText(ticket.category)}</div>
              <div><strong>Создатель:</strong> ${ticket.reporter}</div>
              <div><strong>Исполнитель:</strong> ${ticket.assignee}</div>
              <div><strong>Создан:</strong> ${this.formatDateTime(ticket.created)}</div>
              <div><strong>Обновлен:</strong> ${this.formatDateTime(ticket.updated)}</div>
              ${ticket.location ? `<div style="grid-column: 1 / -1;"><strong>Местоположение:</strong> 📍 ${ticket.location}</div>` : ''}
            </div>
          </div>

          <!-- Описание проблемы -->
          <div style="margin-bottom: 20px;">
            <h4 style="margin-bottom: 12px; color: var(--rikor-text-primary);">Описание проблемы</h4>
            <div style="background: var(--rikor-bg-secondary); padding: 16px; border-radius: 8px; border-left: 4px solid var(--rikor-primary); line-height: 1.6;">
              ${ticket.description}
            </div>
          </div>

          <!-- НОВОЕ: Прикрепленные файлы -->
          ${ticket.attachments && ticket.attachments.length > 0 ? `
            <div style="margin-bottom: 20px;">
              <h4 style="margin-bottom: 12px; color: var(--rikor-text-primary); display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-paperclip"></i>
                Прикрепленные файлы (${ticket.attachments.length})
              </h4>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${ticket.attachments.map(file => `
                  <div style="background: var(--rikor-bg-tertiary); padding: 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <div style="width: 32px; height: 32px; background: var(--rikor-primary); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white;">
                        <i class="fas fa-${this.getFileIcon(file.type)}"></i>
                      </div>
                      <div>
                        <div style="font-weight: 500; color: var(--rikor-text-primary);">${file.name}</div>
                        <div style="font-size: 12px; color: var(--rikor-text-muted);">
                          ${this.formatFileSize(file.size)} • ${file.uploadedBy} • ${this.formatDate(file.uploaded)}
                        </div>
                      </div>
                    </div>
                    <button class="btn btn--small btn--secondary" onclick="app.downloadFile('${file.name}', '${file.type}')" title="Скачать">
                      <i class="fas fa-download"></i>
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- НОВОЕ: Система ответов -->
          ${ticket.replies && ticket.replies.length > 0 ? `
            <div style="margin-bottom: 20px;">
              <h4 style="margin-bottom: 12px; color: var(--rikor-text-primary); display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-comments"></i>
                Ответы и комментарии (${ticket.replies.length})
              </h4>
              <div class="ticket-replies" style="display: flex; flex-direction: column; gap: 12px;">
                ${ticket.replies.map(reply => `
                  <div class="reply ${reply.type === 'solution' ? 'reply--solution' : ''}" style="background: var(--rikor-bg-secondary); padding: 16px; border-radius: 8px; border-left: 4px solid ${reply.type === 'solution' ? 'var(--rikor-success)' : reply.role === 'agent' || reply.role === 'admin' ? 'var(--rikor-primary)' : 'var(--rikor-info)'};">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                      <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 32px; height: 32px; background: ${reply.role === 'agent' || reply.role === 'admin' ? 'var(--rikor-primary)' : 'var(--rikor-info)'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 12px;">
                          ${reply.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div style="font-weight: 600; color: var(--rikor-text-primary);">${reply.author}</div>
                          <div style="font-size: 12px; color: var(--rikor-text-muted);">
                            ${this.getRoleText(reply.role)} • ${this.formatDateTime(reply.created)}
                            ${reply.type === 'solution' ? ' • Решение' : ''}
                          </div>
                        </div>
                      </div>
                      ${reply.type === 'solution' ? '<div class="badge badge--success"><i class="fas fa-check-circle mr-1"></i>Решение</div>' : ''}
                    </div>
                    <div style="color: var(--rikor-text-primary); line-height: 1.6;">
                      ${reply.message.replace(/\n/g, '<br>')}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- НОВОЕ: Форма добавления ответа -->
          <div style="margin-bottom: 20px;">
            <h4 style="margin-bottom: 12px; color: var(--rikor-text-primary); display: flex; align-items: center; gap: 8px;">
              <i class="fas fa-reply"></i>
              Добавить ответ
            </h4>
            <div style="background: var(--rikor-bg-tertiary); padding: 16px; border-radius: 8px;">
              <form onsubmit="app.addTicketReply(event, '${ticket.id}')" id="replyForm">
                <div class="form-group">
                  <textarea name="message" class="form-control" rows="4" required placeholder="Введите ваш ответ или комментарий..." style="resize: vertical;"></textarea>
                </div>
                <div style="display: flex; justify-content: between; align-items: center; gap: 12px;">
                  <div style="display: flex; gap: 8px;">
                    <button type="submit" class="btn btn--primary btn--small">
                      <i class="fas fa-paper-plane mr-1"></i>Отправить ответ
                    </button>
                    <button type="button" class="btn btn--success btn--small" onclick="app.addTicketReply(event, '${ticket.id}', 'solution')">
                      <i class="fas fa-check-circle mr-1"></i>Решение
                    </button>
                  </div>
                  <button type="button" class="btn btn--secondary btn--small" onclick="app.showAddFileModal('${ticket.id}')">
                    <i class="fas fa-paperclip mr-1"></i>Прикрепить файл
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Дополнительные метрики -->
          <div class="grid grid--3" style="gap: 12px; margin-bottom: 20px;">
            <div style="text-align: center; padding: 12px; background: var(--rikor-bg-tertiary); border-radius: 8px;">
              <div style="font-size: 18px; font-weight: 600; color: var(--rikor-warning); margin-bottom: 4px;">${ticket.timeSpent}ч</div>
              <div style="font-size: 12px; color: var(--rikor-text-muted);">Затрачено времени</div>
            </div>
            <div style="text-align: center; padding: 12px; background: var(--rikor-bg-tertiary); border-radius: 8px;">
              <div style="font-size: 18px; font-weight: 600; color: var(--rikor-info); margin-bottom: 4px;">${ticket.estimatedTime}ч</div>
              <div style="font-size: 12px; color: var(--rikor-text-muted);">Оценка времени</div>
            </div>
            <div style="text-align: center; padding: 12px; background: var(--rikor-bg-tertiary); border-radius: 8px;">
              <div style="font-size: 18px; font-weight: 600; color: var(--rikor-success); margin-bottom: 4px;">${Math.round((ticket.timeSpent / ticket.estimatedTime) * 100) || 0}%</div>
              <div style="font-size: 12px; color: var(--rikor-text-muted);">Прогресс</div>
            </div>
          </div>

          ${ticket.tags && ticket.tags.length > 0 ? `
            <div>
              <h4 style="margin-bottom: 8px; color: var(--rikor-text-primary);">Теги</h4>
              <div>
                ${ticket.tags.map(tag => `<span class="badge badge--info" style="margin-right: 4px; margin-bottom: 4px;">#${tag}</span>`).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" onclick="app.hideModal()">
          <i class="fas fa-times mr-2"></i>Закрыть
        </button>
        <button class="btn btn--warning" onclick="app.showChangeStatusModal('${ticket.id}')">
          <i class="fas fa-edit mr-2"></i>Изменить статус
        </button>
        <button class="btn btn--primary" onclick="app.hideModal(); app.editTicket('${ticket.id}')">
          <i class="fas fa-edit mr-2"></i>Редактировать тикет
        </button>
      </div>
    `);
  }

  // НОВАЯ функция добавления ответа к тикету
  addTicketReply(event, ticketId, type = 'reply') {
    event.preventDefault();

    const ticket = this.data.tickets.find(t => t.id === ticketId);
    if (!ticket) {
      this.showNotification('Тикет не найден!', 'error');
      return;
    }

    const form = event.target.closest('form');
    const message = form.message.value.trim();

    if (!message) {
      this.showNotification('Введите сообщение!', 'error');
      return;
    }

    // Создаем новый ответ
    const newReply = {
      id: (ticket.replies?.length || 0) + 1,
      author: this.currentUser.name,
      role: this.currentUser.role,
      message: message,
      created: new Date().toISOString(),
      type: type
    };

    // Добавляем ответ к тикету
    if (!ticket.replies) ticket.replies = [];
    ticket.replies.push(newReply);

    // Обновляем статус тикета если это решение
    if (type === 'solution') {
      ticket.status = 'resolved';
      ticket.resolvedAt = new Date().toISOString();
    }

    // Обновляем время последнего изменения
    ticket.updated = new Date().toISOString();

    // Сохраняем данные
    this.saveData();

    // Показываем уведомление
    const actionText = type === 'solution' ? 'решение добавлено' : 'ответ добавлен';
    this.showNotification(`${actionText.charAt(0).toUpperCase() + actionText.slice(1)} к тикету ${ticketId}`, 'success');

    // Обновляем модальное окно
    this.viewTicket(ticketId);
  }

  // НОВАЯ функция показа модального окна добавления файлов
  showAddFileModal(ticketId) {
    this.showModal(`
      <div class="modal-header">
        <div>
          <h2 class="modal-title">Прикрепить файлы к тикету</h2>
          <p style="color: var(--rikor-text-muted); margin: 4px 0 0; font-size: 14px;">Загрузите документы, изображения или другие файлы</p>
        </div>
        <button class="modal-close" onclick="app.hideModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <div style="text-align: center; padding: 40px; border: 2px dashed var(--rikor-border); border-radius: 8px; background: var(--rikor-bg-tertiary);">
          <div style="font-size: 48px; color: var(--rikor-text-muted); margin-bottom: 16px;">
            <i class="fas fa-cloud-upload-alt"></i>
          </div>
          <h3 style="margin-bottom: 8px; color: var(--rikor-text-primary);">Перетащите файлы сюда</h3>
          <p style="color: var(--rikor-text-muted); margin-bottom: 20px;">или нажмите кнопку для выбора файлов</p>

          <button class="btn btn--primary" onclick="app.triggerFileUpload('${ticketId}')">
            <i class="fas fa-plus mr-2"></i>Выбрать файлы
          </button>

          <div style="margin-top: 20px; font-size: 12px; color: var(--rikor-text-muted); text-align: left;">
            <strong>Поддерживаемые форматы:</strong><br>
            ${this.settings.allowedFileTypes.join(', ')}<br>
            <strong>Максимальный размер:</strong> ${this.formatFileSize(this.settings.maxFileSize)}
          </div>
        </div>

        <div id="uploadedFiles" style="margin-top: 20px; display: none;">
          <h4 style="margin-bottom: 12px; color: var(--rikor-text-primary);">Загруженные файлы:</h4>
          <div id="filesList"></div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" onclick="app.hideModal()">
          <i class="fas fa-times mr-2"></i>Отмена
        </button>
        <button class="btn btn--primary" onclick="app.attachFilesToTicket('${ticketId}')" id="attachFilesBtn" disabled>
          <i class="fas fa-paperclip mr-2"></i>Прикрепить файлы
        </button>
      </div>
    `);
  }

  // НОВАЯ функция инициации загрузки файлов
  triggerFileUpload(ticketId) {
    const fileInput = document.getElementById('fileInput');
    fileInput.setAttribute('data-ticket-id', ticketId);
    fileInput.click();
  }

  // НОВАЯ функция обработки загрузки файлов
  handleFileUpload(event) {
    const files = Array.from(event.target.files);
    const ticketId = event.target.getAttribute('data-ticket-id');

    if (files.length === 0) return;

    // Проверяем файлы
    const validFiles = [];
    const errors = [];

    files.forEach(file => {
      // Проверяем размер
      if (file.size > this.settings.maxFileSize) {
        errors.push(`Файл "${file.name}" слишком большой (максимум: ${this.formatFileSize(this.settings.maxFileSize)})`);
        return;
      }

      // Проверяем тип
      const extension = '.' + file.name.split('.').pop().toLowerCase();
      if (!this.settings.allowedFileTypes.includes(extension)) {
        errors.push(`Тип файла "${file.name}" не поддерживается`);
        return;
      }

      validFiles.push({
        name: file.name,
        size: file.size,
        type: file.type,
        file: file
      });
    });

    // Показываем ошибки
    if (errors.length > 0) {
      this.showNotification(`Ошибки загрузки: ${errors.join(', ')}`, 'error');
    }

    // Показываем валидные файлы
    if (validFiles.length > 0) {
      this.displayUploadedFiles(validFiles);
    }

    // Очищаем input
    event.target.value = '';
  }

  // НОВАЯ функция отображения загруженных файлов
  displayUploadedFiles(files) {
    const uploadedFiles = document.getElementById('uploadedFiles');
    const filesList = document.getElementById('filesList');
    const attachBtn = document.getElementById('attachFilesBtn');

    if (!uploadedFiles || !filesList || !attachBtn) return;

    uploadedFiles.style.display = 'block';
    attachBtn.disabled = false;

    // Сохраняем файлы для дальнейшего использования
    this.tempUploadedFiles = files;

    filesList.innerHTML = files.map((file, index) => `
      <div style="background: var(--rikor-bg-secondary); padding: 12px; border-radius: 6px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 32px; height: 32px; background: var(--rikor-success); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white;">
            <i class="fas fa-${this.getFileIcon(file.type)}"></i>
          </div>
          <div>
            <div style="font-weight: 500; color: var(--rikor-text-primary);">${file.name}</div>
            <div style="font-size: 12px; color: var(--rikor-text-muted);">${this.formatFileSize(file.size)}</div>
          </div>
        </div>
        <button class="btn btn--small btn--error" onclick="app.removeUploadedFile(${index})" title="Удалить">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `).join('');
  }

  // НОВАЯ функция удаления файла из списка загрузки
  removeUploadedFile(index) {
    if (!this.tempUploadedFiles || !this.tempUploadedFiles[index]) return;

    this.tempUploadedFiles.splice(index, 1);

    if (this.tempUploadedFiles.length === 0) {
      document.getElementById('uploadedFiles').style.display = 'none';
      document.getElementById('attachFilesBtn').disabled = true;
    } else {
      this.displayUploadedFiles(this.tempUploadedFiles);
    }
  }

  // НОВАЯ функция прикрепления файлов к тикету
  attachFilesToTicket(ticketId) {
    if (!this.tempUploadedFiles || this.tempUploadedFiles.length === 0) {
      this.showNotification('Нет файлов для прикрепления!', 'error');
      return;
    }

    const ticket = this.data.tickets.find(t => t.id === ticketId);
    if (!ticket) {
      this.showNotification('Тикет не найден!', 'error');
      return;
    }

    // Инициализируем массив вложений если не существует
    if (!ticket.attachments) ticket.attachments = [];

    // Добавляем файлы (в реальном приложении здесь была бы загрузка на сервер)
    const newAttachments = this.tempUploadedFiles.map((file, index) => ({
      id: ticket.attachments.length + index + 1,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedBy: this.currentUser.name,
      uploaded: new Date().toISOString(),
      // В реальном приложении здесь был бы URL файла на сервере
      url: `#simulated-file-${ticketId}-${Date.now()}-${index}`
    }));

    ticket.attachments.push(...newAttachments);
    ticket.updated = new Date().toISOString();

    this.saveData();

    // Очищаем временные файлы
    this.tempUploadedFiles = [];

    this.hideModal();
    this.showNotification(`Прикреплено ${newAttachments.length} файлов к тикету ${ticketId}`, 'success');

    // Обновляем просмотр тикета если открыт
    setTimeout(() => {
      this.viewTicket(ticketId);
    }, 100);
  }

  // ОБНОВЛЕННОЕ отображение базы знаний с возможностью редактирования
  renderKnowledgeBase() {
    const categories = [...new Set(this.data.knowledgeBase.map(a => a.category))];

    return `
      <div class="knowledge">
        <div class="knowledge__header mb-4" style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h1>База знаний Rikor v2.3.0</h1>
            <p class="card__subtitle">Документация и решения для оборудования и ПО компании Rikor • Теперь с редактированием и файлами</p>
          </div>
          <div style="display: flex; gap: 12px;">
            <button class="btn btn--secondary" onclick="app.exportKnowledgeBase()">
              <i class="fas fa-file-export mr-2"></i>Экспорт
            </button>
            <button class="btn btn--primary" onclick="app.showCreateArticleModal()">
              <i class="fas fa-plus mr-2"></i>Создать статью
            </button>
          </div>
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
            <div class="card knowledge-card" style="cursor: pointer; transition: all 0.3s ease; position: relative;">
              <!-- НОВОЕ: Кнопки управления статьей -->
              <div style="position: absolute; top: 16px; right: 16px; display: flex; gap: 4px; z-index: 10;">
                <button class="btn btn--small btn--secondary" onclick="event.stopPropagation(); app.showEditArticleModal('${article.id}')" title="Редактировать статью">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn--small btn--primary" onclick="event.stopPropagation(); app.viewArticle('${article.id}')" title="Просмотр">
                  <i class="fas fa-eye"></i>
                </button>
              </div>

              <div onclick="app.viewArticle('${article.id}')">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; padding-right: 80px;">
                  <span class="badge badge--primary">${this.getCategoryText(article.category)}</span>
                  <div style="display: flex; align-items: center; gap: 4px; color: var(--rikor-text-muted); font-size: 12px;">
                    <i class="fas fa-star" style="color: #fbbf24;"></i>
                    ${article.rating}
                  </div>
                </div>

                <h3 style="margin-bottom: 12px; color: var(--rikor-text-primary); font-size: 16px; line-height: 1.4; padding-right: 20px;">${article.title}</h3>

                <p style="color: var(--rikor-text-secondary); font-size: 14px; line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                  ${article.content.replace(/#|\*\*|\*/g, '').replace(/\n/g, ' ').substring(0, 120)}...
                </p>

                <!-- НОВОЕ: Отображение прикрепленных файлов -->
                ${article.attachments && article.attachments.length > 0 ? `
                  <div style="margin-bottom: 16px;">
                    <div style="display: flex; align-items: center; gap: 4px; color: var(--rikor-text-muted); font-size: 12px; margin-bottom: 6px;">
                      <i class="fas fa-paperclip"></i>
                      <span>${article.attachments.length} файлов</span>
                    </div>
                    <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                      ${article.attachments.slice(0, 3).map(file => `
                        <span style="background: var(--rikor-bg-hover); padding: 2px 6px; border-radius: 4px; font-size: 10px; color: var(--rikor-text-muted);">
                          <i class="fas fa-${this.getFileIcon(file.type)} mr-1"></i>${file.name.substring(0, 15)}${file.name.length > 15 ? '...' : ''}
                        </span>
                      `).join('')}
                      ${article.attachments.length > 3 ? `<span style="font-size: 10px; color: var(--rikor-text-muted);">+${article.attachments.length - 3}</span>` : ''}
                    </div>
                  </div>
                ` : ''}

                <!-- НОВОЕ: История редактирования -->
                ${article.editHistory && article.editHistory.length > 0 ? `
                  <div style="margin-bottom: 16px;">
                    <div style="display: flex; align-items: center; gap: 4px; color: var(--rikor-success); font-size: 11px;">
                      <i class="fas fa-history"></i>
                      <span>Обновлено: ${this.formatDate(article.editHistory[article.editHistory.length - 1].edited)}</span>
                    </div>
                  </div>
                ` : ''}

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
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // НОВАЯ функция показа модального окна редактирования статьи
  showEditArticleModal(articleId) {
    const article = this.data.knowledgeBase.find(a => a.id === articleId);
    if (!article) {
      this.showNotification('Статья не найдена!', 'error');
      return;
    }

    this.showModal(`
      <div class="modal-header">
        <div>
          <h2 class="modal-title">Редактировать статью</h2>
          <p style="color: var(--rikor-text-muted); margin: 4px 0 0; font-size: 14px;">
            Редактирование: "${article.title}" • ${this.getCategoryText(article.category)}
          </p>
        </div>
        <button class="modal-close" onclick="app.hideModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body" style="max-height: 80vh; overflow-y: auto;">
        <form onsubmit="app.saveArticleChanges(event, '${article.id}')" id="editArticleForm">
          <div class="form-group">
            <label class="form-label">Заголовок статьи <span style="color: var(--rikor-error);">*</span></label>
            <input type="text" name="title" class="form-control" required value="${article.title.replace(/"/g, '&quot;')}">
          </div>

          <div class="form-group">
            <label class="form-label">Категория</label>
            <select name="category" class="form-control">
              <option value="hardware" ${article.category === 'hardware' ? 'selected' : ''}>🔧 Оборудование</option>
              <option value="software" ${article.category === 'software' ? 'selected' : ''}>💻 Программное обеспечение</option>
              <option value="network" ${article.category === 'network' ? 'selected' : ''}>🌐 Сетевые технологии</option>
              <option value="performance" ${article.category === 'performance' ? 'selected' : ''}>⚡ Производительность</option>
              <option value="security" ${article.category === 'security' ? 'selected' : ''}>🔒 Безопасность</option>
              <option value="other" ${article.category === 'other' ? 'selected' : ''}>📋 Другое</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Содержание статьи <span style="color: var(--rikor-error);">*</span></label>
            <div style="margin-bottom: 8px; font-size: 12px; color: var(--rikor-text-muted);">
              💡 Поддерживается Markdown разметка: **жирный**, *курсив*, # заголовок, - список
            </div>
            <textarea name="content" class="form-control" rows="15" required style="font-family: 'Courier New', monospace; line-height: 1.4;">${article.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Теги</label>
            <input type="text" name="tags" class="form-control" 
                   value="${(article.tags || []).join(', ')}" 
                   placeholder="тег1, тег2, тег3">
            <small style="color: var(--rikor-text-muted); font-size: 12px; margin-top: 4px; display: block;">
              Разделяйте теги запятыми
            </small>
          </div>

          <!-- НОВОЕ: Управление файлами статьи -->
          ${article.attachments && article.attachments.length > 0 ? `
            <div class="form-group">
              <label class="form-label">Прикрепленные файлы (${article.attachments.length})</label>
              <div style="background: var(--rikor-bg-tertiary); padding: 12px; border-radius: 6px;">
                ${article.attachments.map((file, index) => `
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: var(--rikor-bg-secondary); border-radius: 4px; margin-bottom: 6px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <i class="fas fa-${this.getFileIcon(file.type)}" style="color: var(--rikor-primary);"></i>
                      <div>
                        <div style="font-weight: 500; font-size: 13px;">${file.name}</div>
                        <div style="font-size: 11px; color: var(--rikor-text-muted);">${this.formatFileSize(file.size)}</div>
                      </div>
                    </div>
                    <button type="button" class="btn btn--small btn--error" onclick="app.removeFileFromArticle('${article.id}', ${index})" title="Удалить файл">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div class="form-group">
            <button type="button" class="btn btn--secondary" onclick="app.showAddFileToArticleModal('${article.id}')">
              <i class="fas fa-paperclip mr-2"></i>Добавить файлы
            </button>
          </div>
        </form>

        <!-- НОВОЕ: История редактирования -->
        ${article.editHistory && article.editHistory.length > 0 ? `
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--rikor-border);">
            <h4 style="margin-bottom: 12px; color: var(--rikor-text-primary); display: flex; align-items: center; gap: 8px;">
              <i class="fas fa-history"></i>История изменений
            </h4>
            <div style="background: var(--rikor-bg-tertiary); padding: 12px; border-radius: 6px;">
              ${article.editHistory.map(edit => `
                <div style="margin-bottom: 8px; font-size: 13px;">
                  <div style="color: var(--rikor-text-primary); font-weight: 500;">
                    ${edit.editor} • ${this.formatDateTime(edit.edited)}
                  </div>
                  <div style="color: var(--rikor-text-muted); margin-top: 2px;">
                    ${edit.changes}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" onclick="app.hideModal()">
          <i class="fas fa-times mr-2"></i>Отмена
        </button>
        <button class="btn btn--warning" onclick="app.showDeleteArticleConfirm('${article.id}')">
          <i class="fas fa-trash mr-2"></i>Удалить статью
        </button>
        <button class="btn btn--primary" onclick="document.getElementById('editArticleForm').dispatchEvent(new Event('submit'))">
          <i class="fas fa-save mr-2"></i>Сохранить изменения
        </button>
      </div>
    `);
  }

  // НОВАЯ функция сохранения изменений в статье
  saveArticleChanges(event, articleId) {
    event.preventDefault();

    const article = this.data.knowledgeBase.find(a => a.id === articleId);
    if (!article) {
      this.showNotification('Статья не найдена!', 'error');
      return;
    }

    const formData = new FormData(event.target);
    const oldTitle = article.title;
    const oldContent = article.content;

    // Обновляем данные статьи
    const newTitle = formData.get('title').trim();
    const newContent = formData.get('content').trim();
    const newCategory = formData.get('category');
    const newTags = formData.get('tags') ? formData.get('tags').split(',').map(t => t.trim()).filter(t => t) : [];

    if (!newTitle || !newContent) {
      this.showNotification('Заполните заголовок и содержание статьи!', 'error');
      return;
    }

    // Сохраняем старые значения для истории изменений
    const changes = [];
    if (oldTitle !== newTitle) changes.push(`изменен заголовок`);
    if (oldContent !== newContent) changes.push(`обновлено содержание`);
    if (article.category !== newCategory) changes.push(`изменена категория`);
    if (JSON.stringify(article.tags || []) !== JSON.stringify(newTags)) changes.push(`обновлены теги`);

    // Обновляем статью
    article.title = newTitle;
    article.content = newContent;
    article.category = newCategory;
    article.tags = newTags;
    article.updated = new Date().toISOString();

    // Добавляем запись в историю изменений
    if (changes.length > 0) {
      if (!article.editHistory) article.editHistory = [];
      article.editHistory.push({
        editor: this.currentUser.name,
        edited: new Date().toISOString(),
        changes: changes.join(', ')
      });
    }

    this.saveData();
    this.hideModal();
    this.showNotification(`Статья "${article.title}" успешно обновлена!`, 'success');

    if (this.currentRoute === 'knowledge') {
      this.renderContent();
    }
  }

  // НОВАЯ функция показа модального окна добавления файлов к статье
  showAddFileToArticleModal(articleId) {
    this.showModal(`
      <div class="modal-header">
        <div>
          <h2 class="modal-title">Добавить файлы к статье</h2>
          <p style="color: var(--rikor-text-muted); margin: 4px 0 0; font-size: 14px;">Прикрепите документы, изображения или другие файлы к статье</p>
        </div>
        <button class="modal-close" onclick="app.hideModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <div style="text-align: center; padding: 40px; border: 2px dashed var(--rikor-border); border-radius: 8px; background: var(--rikor-bg-tertiary);">
          <div style="font-size: 48px; color: var(--rikor-text-muted); margin-bottom: 16px;">
            <i class="fas fa-cloud-upload-alt"></i>
          </div>
          <h3 style="margin-bottom: 8px; color: var(--rikor-text-primary);">Перетащите файлы сюда</h3>
          <p style="color: var(--rikor-text-muted); margin-bottom: 20px;">или нажмите кнопку для выбора файлов</p>

          <button class="btn btn--primary" onclick="app.triggerFileUploadForArticle('${articleId}')">
            <i class="fas fa-plus mr-2"></i>Выбрать файлы
          </button>

          <div style="margin-top: 20px; font-size: 12px; color: var(--rikor-text-muted); text-align: left;">
            <strong>Поддерживаемые форматы:</strong><br>
            ${this.settings.allowedFileTypes.join(', ')}<br>
            <strong>Максимальный размер:</strong> ${this.formatFileSize(this.settings.maxFileSize)}
          </div>
        </div>

        <div id="uploadedFiles" style="margin-top: 20px; display: none;">
          <h4 style="margin-bottom: 12px; color: var(--rikor-text-primary);">Загруженные файлы:</h4>
          <div id="filesList"></div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" onclick="app.hideModal()">
          <i class="fas fa-times mr-2"></i>Отмена
        </button>
        <button class="btn btn--primary" onclick="app.attachFilesToArticle('${articleId}')" id="attachFilesBtn" disabled>
          <i class="fas fa-paperclip mr-2"></i>Добавить к статье
        </button>
      </div>
    `);
  }

  // НОВАЯ функция инициации загрузки файлов для статьи
  triggerFileUploadForArticle(articleId) {
    const fileInput = document.getElementById('fileInput');
    fileInput.setAttribute('data-article-id', articleId);
    fileInput.setAttribute('data-upload-type', 'article');
    fileInput.click();
  }

  // НОВАЯ функция прикрепления файлов к статье
  attachFilesToArticle(articleId) {
    if (!this.tempUploadedFiles || this.tempUploadedFiles.length === 0) {
      this.showNotification('Нет файлов для прикрепления!', 'error');
      return;
    }

    const article = this.data.knowledgeBase.find(a => a.id === articleId);
    if (!article) {
      this.showNotification('Статья не найдена!', 'error');
      return;
    }

    if (!article.attachments) article.attachments = [];

    const newAttachments = this.tempUploadedFiles.map((file, index) => ({
      id: article.attachments.length + index + 1,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedBy: this.currentUser.name,
      uploaded: new Date().toISOString(),
      url: `#simulated-file-${articleId}-${Date.now()}-${index}`
    }));

    article.attachments.push(...newAttachments);
    article.updated = new Date().toISOString();

    // Добавляем в историю изменений
    if (!article.editHistory) article.editHistory = [];
    article.editHistory.push({
      editor: this.currentUser.name,
      edited: new Date().toISOString(),
      changes: `добавлено файлов: ${newAttachments.length}`
    });

    this.saveData();
    this.tempUploadedFiles = [];

    this.hideModal();
    this.showNotification(`Добавлено ${newAttachments.length} файлов к статье`, 'success');

    // Показываем модальное окно редактирования снова
    setTimeout(() => {
      this.showEditArticleModal(articleId);
    }, 100);
  }

  // НОВАЯ функция удаления файла из статьи
  removeFileFromArticle(articleId, fileIndex) {
    const article = this.data.knowledgeBase.find(a => a.id === articleId);
    if (!article || !article.attachments || !article.attachments[fileIndex]) {
      this.showNotification('Файл не найден!', 'error');
      return;
    }

    const fileName = article.attachments[fileIndex].name;
    article.attachments.splice(fileIndex, 1);
    article.updated = new Date().toISOString();

    // Добавляем в историю изменений
    if (!article.editHistory) article.editHistory = [];
    article.editHistory.push({
      editor: this.currentUser.name,
      edited: new Date().toISOString(),
      changes: `удален файл: ${fileName}`
    });

    this.saveData();
    this.showNotification(`Файл "${fileName}" удален из статьи`, 'success');

    // Обновляем модальное окно
    this.showEditArticleModal(articleId);
  }

  // Reports раздел остается без изменений (сохраняем рабочие графики)
  renderReports() {
    const stats = this.data.stats;
    const agents = this.data.users.filter(u => u.role === 'agent' || u.role === 'admin');

    return `
      <div class="reports">
        <div class="reports__header mb-4" style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h1>Отчеты и аналитика v2.3.0</h1>
            <p class="card__subtitle">Детальная статистика работы службы технической поддержки Rikor с расширенной аналитикой</p>
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

  // ИСПРАВЛЕННАЯ инициализация графиков Reports (сохраняем рабочую версию)
  initReportCharts() {
    setTimeout(() => {
      try {
        console.log('📊 Инициализация графиков Reports v2.3.0...');

        const agentCtx = document.getElementById('agentPerformanceChart');
        if (agentCtx) {
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
              plugins: { legend: { display: false } },
              scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(148, 163, 184, 0.1)' } },
                x: { grid: { display: false } }
              }
            }
          });
        }

        const priorityDistCtx = document.getElementById('priorityDistributionChart');
        if (priorityDistCtx) {
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
                legend: { position: 'right', labels: { padding: 15, usePointStyle: true } }
              }
            }
          });
        }

        const resolutionCtx = document.getElementById('resolutionTimeChart');
        if (resolutionCtx) {
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
              plugins: { legend: { display: false } },
              scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(148, 163, 184, 0.1)' } },
                x: { grid: { display: false } }
              }
            }
          });
        }

        const deviceCtx = document.getElementById('deviceStatsChart');
        if (deviceCtx) {
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
                legend: { position: 'bottom', labels: { padding: 15, usePointStyle: true } }
              },
              scales: { r: { beginAtZero: true, grid: { color: 'rgba(148, 163, 184, 0.1)' } } }
            }
          });
        }

        console.log('🎉 Все графики Reports v2.3.0 инициализированы');
      } catch (error) {
        console.error('❌ Ошибка инициализации графиков Reports:', error);
        this.showNotification('Ошибка при создании графиков отчетов', 'error');
      }
    }, 200);
  }

  // Users и Settings разделы остаются без изменений
  renderUsers() {
    const filteredUsers = this.getFilteredUsers();
    const roles = [...new Set(this.data.users.map(u => u.role))];

    return `
      <div class="users">
        <div class="users__header mb-4" style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h1>Управление пользователями v2.3.0</h1>
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

  renderSettings() {
    return `
      <div class="settings">
        <div class="settings__header mb-4">
          <h1>Настройки системы v2.3.0</h1>
          <p class="card__subtitle">Конфигурация, персонализация и администрирование • Новые возможности: загрузка файлов, расширенная аналитика</p>
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

          <!-- НОВОЕ: Настройки загрузки файлов -->
          <div class="card">
            <div class="card__header">
              <div>
                <h3 class="card__title">Настройки загрузки файлов</h3>
                <p class="card__subtitle">Ограничения и параметры файловых вложений</p>
              </div>
            </div>
            <div class="settings-section">
              <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: rgba(16, 185, 129, 0.1); border-radius: 8px; border-left: 4px solid var(--rikor-success);">
                  <div>
                    <div style="font-weight: 500; color: var(--rikor-success);">Максимальный размер файла</div>
                    <div style="font-size: 12px; color: var(--rikor-text-muted);">Лимит для одного файла</div>
                  </div>
                  <div style="font-weight: 600; color: var(--rikor-text-primary);">${this.formatFileSize(this.settings.maxFileSize)}</div>
                </div>

                <div style="padding: 12px; background: rgba(6, 182, 212, 0.1); border-radius: 8px; border-left: 4px solid var(--rikor-info);">
                  <div style="font-weight: 500; color: var(--rikor-info); margin-bottom: 8px;">Поддерживаемые форматы</div>
                  <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                    ${this.settings.allowedFileTypes.map(type => `
                      <span style="background: var(--rikor-bg-hover); padding: 2px 6px; border-radius: 4px; font-size: 11px; color: var(--rikor-text-muted);">
                        ${type}
                      </span>
                    `).join('')}
                  </div>
                </div>

                <div style="padding: 12px; background: rgba(245, 158, 11, 0.1); border-radius: 8px; border-left: 4px solid var(--rikor-warning);">
                  <div style="font-weight: 500; color: var(--rikor-warning); margin-bottom: 4px;">⚠️ Ограения безопасности</div>
                  <div style="font-size: 12px; color: var(--rikor-text-muted); line-height: 1.4;">
                    • Исполняемые файлы (.exe, .bat, .sh) запрещены<br>
                    • Все файлы сканируются на вирусы<br>
                    • История загрузок ведется в целях аудита
                  </div>
                </div>
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
                  <strong style="color: var(--rikor-primary);">Rikor HelpDesk v2.3.0</strong>
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

                <!-- НОВОЕ: Статистика файлов -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: var(--rikor-bg-tertiary); border-radius: 8px;">
                  <span style="color: var(--rikor-text-secondary);">Загружено файлов</span>
                  <strong style="color: var(--rikor-info)">${this.getTotalAttachmentsCount()}</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <div>
                <h3 class="card__title">Экспорт и резервное копирование</h3>
                <p class="card__subtitle">Сохранение данных системы v2.3.0</p>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <button class="btn btn--secondary" onclick="app.exportTicketsCSV()">
                <i class="fas fa-file-csv mr-2"></i>Экспорт тикетов с ответами (CSV)
              </button>
              <button class="btn btn--secondary" onclick="app.exportUsersCSV()">
                <i class="fas fa-users mr-2"></i>Экспорт пользователей (CSV)
              </button>
              <button class="btn btn--secondary" onclick="app.exportKnowledgeBase()">
                <i class="fas fa-book mr-2"></i>Экспорт базы знаний с файлами
              </button>
              <button class="btn btn--primary" onclick="app.generateFullReport()">
                <i class="fas fa-file-pdf mr-2"></i>Полный отчет системы (PDF)
              </button>
              <button class="btn btn--warning" onclick="app.backupAllData()">
                <i class="fas fa-download mr-2"></i>Резервная копия всех данных v2.3.0
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // НОВЫЕ утилитарные функции для работы с файлами
  getFileIcon(mimeType) {
    const icons = {
      'application/pdf': 'file-pdf',
      'application/msword': 'file-word',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'file-word',
      'application/vnd.ms-excel': 'file-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'file-excel',
      'application/zip': 'file-archive',
      'application/x-zip-compressed': 'file-archive',
      'text/plain': 'file-alt',
      'text/markdown': 'file-alt',
      'image/jpeg': 'file-image',
      'image/jpg': 'file-image',
      'image/png': 'file-image',
      'image/gif': 'file-image',
      'image/webp': 'file-image'
    };
    return icons[mimeType] || 'file';
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'КБ', 'МБ', 'ГБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  getTotalAttachmentsCount() {
    let count = 0;
    this.data.tickets.forEach(ticket => {
      if (ticket.attachments) count += ticket.attachments.length;
    });
    this.data.knowledgeBase.forEach(article => {
      if (article.attachments) count += article.attachments.length;
    });
    return count;
  }

  // НОВАЯ функция симуляции скачивания файла
  downloadFile(fileName, mimeType) {
    // В реальном приложении здесь был бы запрос к серверу
    this.showNotification(`Скачивание файла "${fileName}" (симуляция)`, 'info');
  }

  // ОБНОВЛЕННЫЙ экспорт тикетов с ответами и файлами
  exportTicketsCSV() {
    try {
      const headers = [
        'ID', 'Тема', 'Статус', 'Приоритет', 'Устройство', 'Модель', 'Серийный номер', 
        'Исполнитель', 'Создан', 'Обновлен', 'Описание', 'Количество ответов', 'Количество файлов', 'Теги'
      ];

      const rows = this.data.tickets.map(ticket => [
        ticket.id,
        ticket.title,
        this.getStatusText(ticket.status),
        this.getPriorityText(ticket.priority),
        ticket.deviceType,
        ticket.deviceModel || '',
        ticket.serialNumber || 'Не указан',
        ticket.assignee,
        this.formatDateTime(ticket.created),
        this.formatDateTime(ticket.updated),
        ticket.description,
        ticket.replies ? ticket.replies.length : 0, // НОВОЕ
        ticket.attachments ? ticket.attachments.length : 0, // НОВОЕ
        (ticket.tags || []).join('; ')
      ]);

      const csv = [headers, ...rows].map(row => 
        row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ).join('\n');

      this.downloadCSVFile(csv, 'rikor-tickets-extended-v2.3.0.csv');
      this.showNotification('Расширенные данные тикетов экспортированы в CSV', 'success');
    } catch (error) {
      this.showNotification('Ошибка при экспорте тикетов', 'error');
    }
  }

  // НОВАЯ функция экспорта базы знаний
  exportKnowledgeBase() {
    try {
      const headers = [
        'ID', 'Заголовок', 'Категория', 'Автор', 'Создан', 'Обновлен', 
        'Просмотры', 'Рейтинг', 'Теги', 'Количество файлов', 'История изменений'
      ];

      const rows = this.data.knowledgeBase.map(article => [
        article.id,
        article.title,
        this.getCategoryText(article.category),
        article.author,
        this.formatDateTime(article.created),
        this.formatDateTime(article.updated),
        article.views,
        article.rating,
        (article.tags || []).join('; '),
        article.attachments ? article.attachments.length : 0,
        article.editHistory ? article.editHistory.length : 0
      ]);

      const csv = [headers, ...rows].map(row => 
        row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ).join('\n');

      this.downloadCSVFile(csv, 'rikor-knowledge-base-v2.3.0.csv');
      this.showNotification('База знаний экспортирована в CSV', 'success');
    } catch (error) {
      this.showNotification('Ошибка при экспорте базы знаний', 'error');
    }
  }

  // ОБНОВЛЕННАЯ функция резервного копирования
  backupAllData() {
    try {
      const backup = {
        version: 'Rikor HelpDesk v2.3.0 (с ответами, файлами и редактированием)',
        timestamp: new Date().toISOString(),
        data: this.data,
        settings: this.settings,
        features: [
          'Система ответов в тикетах',
          'Загрузка файлов в тикеты и статьи',
          'Редактирование статей базы знаний',
          'История изменений статей',
          'Расширенная валидация файлов',
          'Улучшенный экспорт данных'
        ]
      };

      const backupData = JSON.stringify(backup, null, 2);
      const filename = `rikor-helpdesk-backup-v2.3.0-${new Date().toISOString().split('T')[0]}.json`;

      this.downloadFile(backupData, filename, 'application/json');
      this.showNotification('Резервная копия v2.3.0 создана и скачана', 'success');
    } catch (error) {
      this.showNotification('Ошибка при создании резервной копии', 'error');
    }
  }

  downloadCSVFile(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Остальные утилитарные функции остаются без изменений
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
        ticket.id.toLowerCase().includes(this.filters.tickets.search.toLowerCase()) ||
        (ticket.serialNumber && ticket.serialNumber.toLowerCase().includes(this.filters.tickets.search.toLowerCase())) ||
        (ticket.deviceModel && ticket.deviceModel.toLowerCase().includes(this.filters.tickets.search.toLowerCase()));

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
    console.log('🔍 Поиск в базе знаний v2.3.0:', { search, category });
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

  initReportFilters() {
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

  updateReportFilters() {
    this.filters.reports = {
      dateFrom: document.getElementById('reportDateFrom')?.value || '',
      dateTo: document.getElementById('reportDateTo')?.value || '',
      type: document.getElementById('reportType')?.value || 'all'
    };
  }

  updateReportCharts() {
    this.showNotification('Графики обновляются...', 'info');
    this.destroyCharts();
    setTimeout(() => {
      this.initReportCharts();
      this.showNotification('Графики успешно обновлены', 'success');
    }, 1000);
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

  // Модальные окна (основные функции остаются)
  showCreateTicketModal() {
    this.showModal(`
      <div class="modal-header">
        <div>
          <h2 class="modal-title">Создать новый тикет</h2>
          <p style="color: var(--rikor-text-muted); margin: 4px 0 0; font-size: 14px;">Заполните обязательные поля для создания тикета • v2.3.0</p>
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

          <div class="grid grid--2">
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
          </div>

          <div class="form-group">
            <label class="form-label">Серийный номер устройства <span style="color: var(--rikor-info);">📋</span></label>
            <input type="text" 
                   name="serialNumber" 
                   class="form-control" 
                   placeholder="Например: RP6224-2024-001523, RN203-2025-000847"
                   pattern="[A-Z0-9-]+"
                   title="Серийный номер должен содержать только буквы, цифры и дефисы">
            <small style="color: var(--rikor-text-muted); font-size: 12px; margin-top: 4px; display: block;">
              💡 Серийный номер поможет быстрее идентифицировать устройство и найти его в системе учета
            </small>
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

    const serialNumber = formData.get('serialNumber').trim();
    if (serialNumber && !/^[A-Z0-9-]+$/.test(serialNumber)) {
      this.showNotification('Серийный номер должен содержать только буквы, цифры и дефисы!', 'error');
      return;
    }

    if (serialNumber && this.data.tickets.some(t => t.serialNumber === serialNumber)) {
      this.showNotification(`Тикет с серийным номером ${serialNumber} уже существует!`, 'warning');
    }

    const newTicket = {
      id: `RIK-2025-${String(this.data.tickets.length + 1).padStart(3, '0')}`,
      title: formData.get('title').trim(),
      description: formData.get('description').trim(),
      deviceType: formData.get('deviceType'),
      deviceModel: formData.get('deviceModel') || '',
      serialNumber: serialNumber || '',
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
      tags: [formData.get('deviceType').toLowerCase(), formData.get('category')],
      replies: [], // НОВОЕ: инициализируем пустой массив ответов
      attachments: [] // НОВОЕ: инициализируем пустой массив файлов
    };

    this.data.tickets.unshift(newTicket);
    this.data.stats.totalTickets++;
    this.data.stats.openTickets++;

    this.saveData();
    this.hideModal();
    this.showNotification(`Тикет ${newTicket.id} успешно создан!${serialNumber ? ` S/N: ${serialNumber}` : ''}`, 'success');

    if (this.currentRoute === 'tickets') {
      this.renderContent();
    }
  }

  // Остальные модальные окна
  showCreateUserModal() {
    this.showModal(`
      <div class="modal-header">
        <div>
          <h2 class="modal-title">Добавить пользователя</h2>
          <p style="color: var(--rikor-text-muted); margin: 4px 0 0; font-size: 14px;">Создание новой учетной записи в системе v2.3.0</p>
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

  showCreateArticleModal() {
    this.showModal(`
      <div class="modal-header">
        <div>
          <h2 class="modal-title">Создать статью в базе знаний</h2>
          <p style="color: var(--rikor-text-muted); margin: 4px 0 0; font-size: 14px;">Новая инструкция или решение для базы знаний v2.3.0</p>
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
            <div style="margin-bottom: 8px; font-size: 12px; color: var(--rikor-text-muted);">
              💡 Поддерживается Markdown разметка: **жирный**, *курсив*, # заголовок, - список
            </div>
            <textarea name="content" class="form-control" rows="12" required 
                      placeholder="# Заголовок статьи&#10;&#10;## Описание проблемы&#10;&#10;Подробное описание...&#10;&#10;## Решение&#10;&#10;1. Первый шаг&#10;2. Второй шаг&#10;&#10;## Дополнительная информация&#10;&#10;Полезные советы..."
                      style="font-family: 'Courier New', monospace; line-height: 1.4;"></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Теги</label>
            <input type="text" name="tags" class="form-control" placeholder="тег1, тег2, тег3">
            <small style="color: var(--rikor-text-muted); font-size: 12px; margin-top: 4px; display: block;">
              Разделяйте теги запятыми. Теги помогают найти статью через поиск.
            </small>
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

  createArticle(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    if (!formData.get('title').trim() || !formData.get('content').trim()) {
      this.showNotification('Заполните заголовок и содержание статьи!', 'error');
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
      updated: new Date().toISOString(),
      attachments: [], // НОВОЕ: пустой массив для файлов
      editHistory: [] // НОВОЕ: пустая история изменений
    };

    this.data.knowledgeBase.push(newArticle);
    this.saveData();
    this.hideModal();
    this.showNotification(`Статья "${newArticle.title}" успешно создана!`, 'success');

    if (this.currentRoute === 'knowledge') {
      this.renderContent();
    }
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
            ${article.attachments && article.attachments.length > 0 ? `
              <span style="color: var(--rikor-info); font-size: 13px;">
                <i class="fas fa-paperclip mr-1"></i>${article.attachments.length} файлов
              </span>
            ` : ''}
          </div>
        </div>
        <button class="modal-close" onclick="app.hideModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body" style="max-height: 80vh; overflow-y: auto;">
        <!-- Содержание статьи -->
        <div style="line-height: 1.7; color: var(--rikor-text-primary); margin-bottom: 20px;">
          ${article.content.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/^# (.*$)/gm, '<h1 style="font-size: 24px; margin: 20px 0 10px; color: var(--rikor-primary);">$1</h1>').replace(/^## (.*$)/gm, '<h2 style="font-size: 20px; margin: 16px 0 8px; color: var(--rikor-text-primary);">$1</h2>').replace(/^### (.*$)/gm, '<h3 style="font-size: 16px; margin: 12px 0 6px; color: var(--rikor-text-primary);">$1</h3>')}
        </div>

        <!-- НОВОЕ: Прикрепленные файлы -->
        ${article.attachments && article.attachments.length > 0 ? `
          <div style="margin-bottom: 20px; padding-top: 20px; border-top: 1px solid var(--rikor-border);">
            <h4 style="margin-bottom: 12px; color: var(--rikor-text-primary); display: flex; align-items: center; gap: 8px;">
              <i class="fas fa-paperclip"></i>
              Прикрепленные файлы (${article.attachments.length})
            </h4>
            <div style="display: grid; gap: 8px;">
              ${article.attachments.map(file => `
                <div style="background: var(--rikor-bg-tertiary); padding: 12px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 32px; height: 32px; background: var(--rikor-success); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white;">
                      <i class="fas fa-${this.getFileIcon(file.type)}"></i>
                    </div>
                    <div>
                      <div style="font-weight: 500; color: var(--rikor-text-primary);">${file.name}</div>
                      <div style="font-size: 12px; color: var(--rikor-text-muted);">
                        ${this.formatFileSize(file.size)} • ${file.uploadedBy} • ${this.formatDate(file.uploaded)}
                      </div>
                    </div>
                  </div>
                  <button class="btn btn--small btn--primary" onclick="app.downloadFile('${file.name}', '${file.type}')" title="Скачать">
                    <i class="fas fa-download"></i>
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Информация о статье -->
        <div style="background: var(--rikor-bg-tertiary); padding: 16px; border-radius: 8px; margin-top: 20px;">
          <div class="grid grid--2" style="gap: 16px; font-size: 14px;">
            <div><strong>Автор:</strong> ${article.author}</div>
            <div><strong>Создана:</strong> ${this.formatDate(article.created)}</div>
            <div><strong>Обновлена:</strong> ${this.formatDate(article.updated)}</div>
            <div><strong>Рейтинг:</strong> ⭐ ${article.rating}</div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn--secondary" onclick="app.hideModal()">
          <i class="fas fa-times mr-2"></i>Закрыть
        </button>
        <button class="btn btn--primary" onclick="app.hideModal(); app.showEditArticleModal('${article.id}')">
          <i class="fas fa-edit mr-2"></i>Редактировать
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

  // Утилитарные функции
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
  viewUserProfile(userId) { this.showNotification('Просмотр профиля (функция в разработке)', 'info'); }
  savePersonalSettings() { this.showNotification('Настройки сохранены', 'success'); }
  generateFullReport() { this.showNotification('Генерация полного отчета (функция в разработке)', 'info'); }
  generatePDFReport() { this.showNotification('PDF отчет готов к скачиванию (эмуляция)', 'success'); }
  exportReportData() { setTimeout(() => this.exportTicketsCSV(), 1000); }
  showChangeStatusModal(ticketId) { this.showNotification('Изменение статуса (функция в разработке)', 'info'); }
  showDeleteArticleConfirm(articleId) { this.showNotification('Удаление статьи (функция в разработке)', 'warning'); }

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
    }, 5000);
  }

  // Автообновление
  startAutoRefresh() {
    if (this.settings.autoRefresh) {
      setInterval(() => {
        if (Math.random() < 0.05) { // 5% шанс
          this.showNotification('Данные обновлены автоматически', 'info');
        }
      }, this.settings.refreshInterval);
    }
  }
}

// Инициализация приложения
let app;
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎯 Запуск Rikor HelpDesk v2.3.0 с расширенными возможностями...');
  app = new RikorHelpDeskAdvanced();

  window.addEventListener('hashchange', () => app.handleRoute());

  window.addEventListener('error', (e) => {
    console.error('❌ Глобальная ошибка v2.3.0:', e.error);
    app?.showNotification('Произошла системная ошибка', 'error');
  });

  console.log('✅ Rikor HelpDesk v2.3.0 готов к работе!');
  console.log('🆕 Новые функции:');
  console.log('   • Система ответов в тикетах');
  console.log('   • Загрузка файлов в тикеты и статьи');
  console.log('   • Редактирование статей базы знаний');
  console.log('   • История изменений статей');
  console.log('   • Расширенная валидация и экспорт');
});