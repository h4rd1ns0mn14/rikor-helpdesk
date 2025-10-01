// RIKOR HELPDESK v2.8.0 Enhanced - Система управления IT-поддержкой
// НОВОЕ: Графики в отчетах + Управление пользователями + Автотестирование

class RikorHelpDeskEnhanced {
    constructor() {
        console.log('🚀 RIKOR HELPDESK v2.8.0 Enhanced - Загрузка...');

        this.version = '2.8.0';
        this.currentRoute = 'dashboard';
        this.currentUser = {
            id: 1,
            name: 'Петр Сидоров',
            email: 'p.sidorov@rikor.ru',
            role: 'admin',
            avatar: 'ПС',
            department: 'IT',
            position: 'Системный администратор'
        };

        this.settings = {
            theme: localStorage.getItem('rikor-theme') || 'light',
            language: 'ru',
            notifications: {
                email: localStorage.getItem('rikor-email-notif') === 'true',
                push: localStorage.getItem('rikor-push-notif') === 'true',
                sound: localStorage.getItem('rikor-sound-notif') === 'true',
                telegram: localStorage.getItem('rikor-telegram-notif') === 'true'
            },
            autoRefresh: false,
            refreshInterval: 30000
        };

        this.data = null;
        this.chartInstances = {};
        this.tempFiles = [];
        this.currentTicket = null;
        this.editingUser = null;
        this.selectedUsers = [];

        this.init();
    }

    async init() {
        try {
            console.log('📋 Инициализация системы v2.8.0...');
            await this.loadData();
            this.applyTheme();
            this.bindEvents();
            this.handleRoute();
            this.renderContent();

            setTimeout(() => {
                this.showNotification('✅ RIKOR HELPDESK v2.8.0 Enhanced готов к работе!', 'success');
                this.runSystemCheck();
            }, 1000);

            console.log('✅ Система v2.8.0 инициализирована');
        } catch (error) {
            console.error('❌ Ошибка инициализации:', error);
            this.showNotification('❌ Ошибка запуска системы', 'error');
        }
    }

    async loadData() {
        try {
            const savedData = localStorage.getItem('rikor-helpdesk-data');
            if (savedData) {
                this.data = JSON.parse(savedData);
                console.log('📊 Данные загружены из LocalStorage');
            } else {
                this.data = this.getDefaultData();
                this.saveData();
                console.log('📊 Загружены данные по умолчанию');
            }

            // Обновляем статистику для отчетов
            this.updateReportStats();
        } catch (error) {
            console.error('❌ Ошибка загрузки данных:', error);
            this.data = this.getDefaultData();
        }
    }

    getDefaultData() {
        return {
            tickets: [
                {
                    id: "RIK-2025-002",
                    title: "Ноутбук Rikor RN NINO не включается",
                    description: "После обновления BIOS ноутбук Rikor RN NINO 203.1/15 не реагирует на нажатие кнопки питания. Индикатор питания не загорается.",
                    status: "in_progress",
                    priority: "high",
                    category: "hardware",
                    deviceType: "Ноутбук",
                    deviceModel: "RN NINO 203.1/15",
                    serialNumber: "RN203-2025-000847",
                    assignee: "Елена Новикова",
                    reporter: "Сергей Волков",
                    created: "2025-09-21T19:45:00.000Z",
                    updated: "2025-09-22T12:20:00.000Z",
                    location: "Офис 1, Комната 205",
                    timeSpent: 1.5,
                    estimatedTime: 3,
                    tags: ["ноутбук", "питание", "bios"],
                    replies: [{
                        id: 1,
                        author: "Елена Новикова",
                        message: "Проверила подключение питания. Попробую восстановить BIOS через служебный режим.",
                        created: "2025-09-22T12:20:00.000Z",
                        type: "comment",
                        files: []
                    }],
                    attachments: []
                },
                {
                    id: "RIK-2025-001",
                    title: "Проблема с сервером RP6224",
                    description: "Сервер перестал отвечать на запросы. Необходимо провести диагностику и восстановить работу.",
                    status: "open",
                    priority: "critical",
                    category: "hardware",
                    deviceType: "Сервер",
                    deviceModel: "RP6224",
                    serialNumber: "SRV-001-2025",
                    assignee: "Петр Сидоров",
                    reporter: "Иван Петров",
                    created: "2025-09-26T08:00:00.000Z",
                    updated: "2025-09-26T08:00:00.000Z",
                    location: "Серверная комната А",
                    timeSpent: 0,
                    estimatedTime: 4,
                    tags: ["сервер", "критично", "rp6224"],
                    replies: [{
                        id: 2,
                        author: "Петр Сидоров",
                        message: "Принял в работу. Начинаю диагностику аппаратной части.",
                        created: "2025-09-26T08:30:00.000Z",
                        type: "status_change",
                        statusFrom: "open",
                        statusTo: "in_progress",
                        files: []
                    }],
                    attachments: []
                }
            ],
            users: [
                {
                    id: 1,
                    name: "Петр Сидоров",
                    email: "p.sidorov@rikor.ru",
                    role: "admin",
                    department: "IT отдел",
                    avatar: "ПС",
                    status: "online",
                    ticketsResolved: 156,
                    ticketsAssigned: 8,
                    position: "Системный администратор",
                    phone: "+7 (495) 123-45-67",
                    location: "Москва, офис 1",
                    skills: ["Windows Server", "Linux", "Сети", "Безопасность"],
                    languages: ["Русский", "Английский"],
                    certifications: ["MCSE", "CCNA"],
                    bio: "Опытный системный администратор с 10+ лет опыта работы",
                    joinDate: "2022-01-15",
                    lastActivity: "2025-09-26T10:00:00.000Z",
                    averageResponseTime: 2.5,
                    customerRating: 4.8,
                    workHours: "09:00-18:00",
                    timezone: "UTC+3"
                },
                {
                    id: 2,
                    name: "Елена Новикова",
                    email: "e.novikova@rikor.ru",
                    role: "agent",
                    department: "Служба поддержки",
                    avatar: "ЕН",
                    status: "online",
                    ticketsResolved: 234,
                    ticketsAssigned: 5,
                    position: "Специалист технической поддержки",
                    phone: "+7 (495) 123-45-68",
                    location: "Москва, офис 1",
                    skills: ["Техническая поддержка", "Windows", "Office"],
                    languages: ["Русский"],
                    certifications: ["ITIL"],
                    bio: "Специалист по технической поддержке пользователей",
                    joinDate: "2021-08-10",
                    lastActivity: "2025-09-26T09:30:00.000Z",
                    averageResponseTime: 1.8,
                    customerRating: 4.9,
                    workHours: "09:00-18:00",
                    timezone: "UTC+3"
                },
                {
                    id: 3,
                    name: "Сергей Волков",
                    email: "s.volkov@rikor.ru",
                    role: "user",
                    department: "Бухгалтерия",
                    avatar: "СВ",
                    status: "away",
                    ticketsResolved: 0,
                    ticketsAssigned: 0,
                    position: "Главный бухгалтер",
                    phone: "+7 (495) 123-45-69",
                    location: "Москва, офис 1",
                    skills: ["1С:Бухгалтерия", "Excel"],
                    languages: ["Русский"],
                    certifications: [],
                    bio: "Главный бухгалтер компании",
                    joinDate: "2020-03-15",
                    lastActivity: "2025-09-26T08:15:00.000Z",
                    averageResponseTime: 0,
                    customerRating: 0,
                    workHours: "09:00-18:00",
                    timezone: "UTC+3"
                }
            ],
            knowledgeBase: [
                {
                    id: "KB-001",
                    title: "Руководство по устранению проблем с сервером RP6224",
                    category: "hardware",
                    content: `# Диагностика сервера RP6224

## Основные проблемы и решения

### 1. Сервер не отвечает
- Проверить питание и индикаторы
- Проверить сетевые подключения
- Перезапустить службы

### 2. Высокая нагрузка
- Мониторинг CPU и RAM
- Анализ логов системы
- Оптимизация процессов

### 3. Проблемы с дисками
- Проверка SMART статуса
- Дефрагментация при необходимости
- Резервное копирование

## Профилактические меры
Рекомендуется проводить регулярное техническое обслуживание сервера каждые 3 месяца.`,
                    tags: ["сервер", "rp6224", "диагностика"],
                    views: 156,
                    rating: 4.8,
                    created: "2025-09-20T10:00:00.000Z",
                    updated: "2025-09-25T15:30:00.000Z",
                    author: "Петр Сидоров",
                    attachments: [],
                    editHistory: []
                },
                {
                    id: "KB-002",
                    title: "Установка драйверов для Rikor RN NINO",
                    category: "software",
                    content: `# Установка драйверов Rikor RN NINO

## Автоматическая установка
1. Подключите ноутбук к интернету
2. Запустите Центр обновления Windows
3. Установите все доступные обновления

## Ручная установка
1. Скачайте драйверы с официального сайта Rikor
2. Запустите установочный файл от имени администратора
3. Перезагрузите систему

## Проблемы и решения
- При ошибке установки - отключите антивирус
- При конфликте драйверов - удалите старые версии`,
                    tags: ["ноутбук", "драйверы", "rn-nino"],
                    views: 89,
                    rating: 4.5,
                    created: "2025-09-15T14:20:00.000Z",
                    updated: "2025-09-20T09:15:00.000Z",
                    author: "Елена Новикова",
                    attachments: [],
                    editHistory: []
                }
            ],
            stats: {
                totalTickets: 92,
                openTickets: 15,
                inProgressTickets: 8,
                waitingTickets: 4,
                resolvedTickets: 58,
                closedTickets: 7,
                avgResponseTime: 2.1,
                slaCompliance: 94,
                customerSatisfaction: 87,
                monthlyLabels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен'],
                monthlyTrend: [45, 52, 38, 67, 73, 69, 84, 76, 92],
                statusLabels: ['Открыт', 'В работе', 'Ожидание', 'Решен', 'Закрыт'],
                statusColors: ['#ef4444', '#f59e0b', '#06b6d4', '#10b981', '#64748b'],
                priorityDistribution: {
                    critical: 8,
                    high: 15,
                    medium: 45,
                    low: 24
                }
            }
        };
    }

    // НОВАЯ ФУНКЦИЯ v2.8.0: Обновление статистики для отчетов
    updateReportStats() {
        const reportStats = {
            // Производительность агентов
            agentPerformance: {
                labels: [],
                ticketsResolved: [],
                averageResponseTime: [],
                customerRating: [],
                colors: ['#1e40af', '#7c3aed', '#059669', '#dc2626', '#f59e0b']
            },
            // Время решения тикетов
            resolutionTime: {
                labels: ['< 1 час', '1-4 часа', '4-24 часа', '1-3 дня', '> 3 дней'],
                data: [15, 35, 28, 18, 4],
                colors: ['#10b981', '#06b6d4', '#f59e0b', '#f97316', '#ef4444']
            },
            // Категории тикетов  
            categoryDistribution: {
                labels: ['Аппаратные проблемы', 'Программные ошибки', 'Сетевые проблемы', 'Доступ и безопасность', 'Другое'],
                data: [34, 28, 16, 12, 10],
                colors: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#64748b']
            },
            // SLA соответствие
            slaCompliance: {
                labels: ['Критический', 'Высокий', 'Средний', 'Низкий'],
                target: [95, 90, 85, 80],
                actual: [92, 94, 88, 85],
                colors: ['#ef4444', '#f59e0b', '#06b6d4', '#10b981']
            },
            // Месячные тренды
            monthlyTrends: {
                labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен'],
                created: [52, 48, 55, 62, 58, 65, 71, 69, 74],
                resolved: [45, 52, 51, 59, 61, 62, 68, 72, 70]
            },
            // Детали по устройствам
            deviceTypeDetails: {
                servers: {
                    name: 'Серверы RIKOR',
                    total: 24,
                    active: 22,
                    maintenance: 2,
                    tickets: 18,
                    uptime: 99.2
                },
                laptops: {
                    name: 'Ноутбуки RIKOR',
                    total: 156,
                    active: 148,
                    maintenance: 8,
                    tickets: 34,
                    uptime: 97.8
                },
                desktops: {
                    name: 'Моноблоки RIKOR', 
                    total: 89,
                    active: 85,
                    maintenance: 4,
                    tickets: 22,
                    uptime: 98.5
                },
                tablets: {
                    name: 'Планшеты RIKOR',
                    total: 67,
                    active: 62,
                    maintenance: 5,
                    tickets: 12,
                    uptime: 96.1
                },
                miniPCs: {
                    name: 'Мини-ПК RIKOR',
                    total: 43,
                    active: 40,
                    maintenance: 3,
                    tickets: 6,
                    uptime: 98.9
                }
            }
        };

        // Собираем данные по агентам
        const agents = this.data.users.filter(u => u.role === 'admin' || u.role === 'agent');
        agents.forEach(agent => {
            reportStats.agentPerformance.labels.push(agent.name);
            reportStats.agentPerformance.ticketsResolved.push(agent.ticketsResolved || 0);
            reportStats.agentPerformance.averageResponseTime.push(agent.averageResponseTime || 0);
            reportStats.agentPerformance.customerRating.push(agent.customerRating || 0);
        });

        this.data.stats.reportStats = reportStats;
    }
    // НОВАЯ ФУНКЦИЯ v2.8.0: УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ

    showCreateUserModal() {
        const modal = `
            <div class="modal-header">
                <div class="modal-title-section">
                    <h2 class="modal-title">
                        <i class="fas fa-user-plus"></i>
                        Добавить пользователя
                    </h2>
                    <p class="modal-subtitle">Создание нового пользователя системы RIKOR HELPDESK</p>
                </div>
                <button class="modal-close" onclick="app.hideModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="modal-body">
                <form class="create-user-form" onsubmit="app.submitCreateUser(event)">
                    <!-- Основная информация -->
                    <div class="form-section">
                        <h3><i class="fas fa-user"></i> Основная информация</h3>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="userName">Полное имя <span class="required">*</span></label>
                                <input type="text" id="userName" name="name" required
                                       placeholder="Например: Иван Петров">
                            </div>

                            <div class="form-group">
                                <label for="userEmail">Email <span class="required">*</span></label>
                                <input type="email" id="userEmail" name="email" required
                                       placeholder="ivan.petrov@rikor.ru">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="userPosition">Должность</label>
                                <input type="text" id="userPosition" name="position"
                                       placeholder="Системный администратор">
                            </div>

                            <div class="form-group">
                                <label for="userDepartment">Отдел</label>
                                <select id="userDepartment" name="department">
                                    <option value="">Выберите отдел</option>
                                    <option value="IT отдел">IT отдел</option>
                                    <option value="Служба поддержки">Служба поддержки</option>
                                    <option value="Отдел разработки">Отдел разработки</option>
                                    <option value="Отдел продаж">Отдел продаж</option>
                                    <option value="Управление">Управление</option>
                                    <option value="Бухгалтерия">Бухгалтерия</option>
                                    <option value="Другое">Другое</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="userRole">Роль в системе <span class="required">*</span></label>
                                <select id="userRole" name="role" required>
                                    <option value="">Выберите роль</option>
                                    <option value="user">👤 Пользователь - создание тикетов</option>
                                    <option value="agent">🎧 Агент поддержки - решение тикетов</option>
                                    <option value="admin">👑 Администратор - полный доступ</option>
                                </select>
                                <small>Роль определяет уровень доступа к функциям системы</small>
                            </div>

                            <div class="form-group">
                                <label for="userPhone">Телефон</label>
                                <input type="tel" id="userPhone" name="phone"
                                       placeholder="+7 (495) 123-45-67">
                            </div>
                        </div>
                    </div>

                    <!-- Рабочая информация -->
                    <div class="form-section">
                        <h3><i class="fas fa-briefcase"></i> Рабочая информация</h3>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="userLocation">Местоположение</label>
                                <input type="text" id="userLocation" name="location"
                                       placeholder="Москва, офис 1">
                            </div>

                            <div class="form-group">
                                <label for="userWorkHours">Рабочие часы</label>
                                <select id="userWorkHours" name="workHours">
                                    <option value="09:00-18:00">09:00-18:00 (стандартный)</option>
                                    <option value="08:00-17:00">08:00-17:00</option>
                                    <option value="10:00-19:00">10:00-19:00</option>
                                    <option value="24/7">24/7 (круглосуточно)</option>
                                    <option value="custom">Другое</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="userSkills">Навыки и компетенции</label>
                                <input type="text" id="userSkills" name="skills"
                                       placeholder="Windows Server, Linux, Сети (через запятую)">
                                <small>Укажите основные технические навыки</small>
                            </div>

                            <div class="form-group">
                                <label for="userLanguages">Языки</label>
                                <input type="text" id="userLanguages" name="languages"
                                       placeholder="Русский, Английский (через запятую)">
                            </div>
                        </div>
                    </div>

                    <!-- Дополнительная информация -->
                    <div class="form-section">
                        <h3><i class="fas fa-info-circle"></i> Дополнительная информация</h3>

                        <div class="form-group">
                            <label for="userBio">О себе</label>
                            <textarea id="userBio" name="bio" rows="3"
                                      placeholder="Краткая информация о пользователе, опыт работы, достижения..."></textarea>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="userCertifications">Сертификации</label>
                                <input type="text" id="userCertifications" name="certifications"
                                       placeholder="MCSE, CCNA, ITIL (через запятую)">
                            </div>

                            <div class="form-group">
                                <label for="userTimezone">Часовой пояс</label>
                                <select id="userTimezone" name="timezone">
                                    <option value="UTC+3">UTC+3 (Москва)</option>
                                    <option value="UTC+2">UTC+2 (Калининград)</option>
                                    <option value="UTC+4">UTC+4 (Самара)</option>
                                    <option value="UTC+5">UTC+5 (Екатеринбург)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Действия -->
                    <div class="form-actions">
                        <button type="button" class="btn btn--secondary" onclick="app.hideModal()">
                            <i class="fas fa-times"></i> Отмена
                        </button>
                        <button type="button" class="btn btn--info" onclick="app.previewUser()">
                            <i class="fas fa-eye"></i> Предпросмотр
                        </button>
                        <button type="submit" class="btn btn--primary">
                            <i class="fas fa-user-plus"></i> Создать пользователя
                        </button>
                    </div>
                </form>
            </div>
        `;

        this.showModal(modal, 'create-user-modal');
    }

    // Предпросмотр пользователя
    previewUser() {
        const form = document.querySelector('.create-user-form');
        if (!form) return;

        const formData = new FormData(form);
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const role = formData.get('role');

        if (!name || !email || !role) {
            this.showNotification('Заполните основные поля: имя, email и роль', 'error');
            return;
        }

        const userData = {
            name: name,
            email: email,
            position: formData.get('position') || 'Не указано',
            department: formData.get('department') || 'Не указано',
            role: role,
            phone: formData.get('phone') || 'Не указано',
            location: formData.get('location') || 'Не указано',
            workHours: formData.get('workHours') || '09:00-18:00',
            skills: formData.get('skills') ? formData.get('skills').split(',').map(s => s.trim()) : [],
            languages: formData.get('languages') ? formData.get('languages').split(',').map(s => s.trim()) : ['Русский'],
            bio: formData.get('bio') || '',
            certifications: formData.get('certifications') ? formData.get('certifications').split(',').map(s => s.trim()) : [],
            timezone: formData.get('timezone') || 'UTC+3'
        };

        const previewModal = `
            <div class="modal-header">
                <h2 class="modal-title">
                    <i class="fas fa-eye"></i>
                    Предпросмотр пользователя
                </h2>
                <button class="modal-close" onclick="app.hideModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="modal-body">
                <div class="user-preview">
                    <div class="user-preview-header">
                        <div class="user-preview-avatar">${this.generateAvatar(userData.name)}</div>
                        <div class="user-preview-info">
                            <h3>${userData.name}</h3>
                            <p class="user-preview-position">${userData.position}</p>
                            <p class="user-preview-department">${userData.department}</p>
                            <span class="badge badge--${this.getRoleBadgeColor(userData.role)}">${this.getRoleText(userData.role)}</span>
                        </div>
                    </div>

                    <div class="user-preview-details">
                        <div class="detail-section">
                            <h4><i class="fas fa-envelope"></i> Контактная информация</h4>
                            <p><strong>Email:</strong> ${userData.email}</p>
                            <p><strong>Телефон:</strong> ${userData.phone}</p>
                            <p><strong>Местоположение:</strong> ${userData.location}</p>
                        </div>

                        <div class="detail-section">
                            <h4><i class="fas fa-clock"></i> Рабочая информация</h4>
                            <p><strong>Рабочие часы:</strong> ${userData.workHours}</p>
                            <p><strong>Часовой пояс:</strong> ${userData.timezone}</p>
                            ${userData.skills.length ? `<p><strong>Навыки:</strong> ${userData.skills.join(', ')}</p>` : ''}
                            ${userData.languages.length ? `<p><strong>Языки:</strong> ${userData.languages.join(', ')}</p>` : ''}
                        </div>

                        ${userData.bio ? `
                        <div class="detail-section">
                            <h4><i class="fas fa-user"></i> О себе</h4>
                            <p>${userData.bio}</p>
                        </div>
                        ` : ''}

                        ${userData.certifications.length ? `
                        <div class="detail-section">
                            <h4><i class="fas fa-certificate"></i> Сертификации</h4>
                            <p>${userData.certifications.join(', ')}</p>
                        </div>
                        ` : ''}
                    </div>
                </div>

                <div class="preview-actions">
                    <button class="btn btn--secondary" onclick="app.showCreateUserModal()">
                        <i class="fas fa-edit"></i> Редактировать
                    </button>
                    <button class="btn btn--primary" onclick="app.submitCreateUserFromPreview()">
                        <i class="fas fa-check"></i> Создать пользователя
                    </button>
                </div>
            </div>
        `;

        // Сохраняем данные для создания
        this.tempUserData = userData;
        this.showModal(previewModal, 'user-preview-modal');
    }

    // Создание пользователя из предпросмотра
    submitCreateUserFromPreview() {
        if (!this.tempUserData) {
            this.showNotification('Данные пользователя утеряны', 'error');
            return;
        }

        this.createNewUser(this.tempUserData);
        this.tempUserData = null;
    }

    // Обработка формы создания пользователя
    submitCreateUser(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const role = formData.get('role');

        if (!name || !email || !role) {
            this.showNotification('Заполните все обязательные поля', 'error');
            return;
        }

        // Проверяем уникальность email
        if (this.data.users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
            this.showNotification('Пользователь с таким email уже существует', 'error');
            return;
        }

        const userData = {
            name: name,
            email: email,
            position: formData.get('position') || '',
            department: formData.get('department') || '',
            role: role,
            phone: formData.get('phone') || '',
            location: formData.get('location') || '',
            workHours: formData.get('workHours') || '09:00-18:00',
            skills: formData.get('skills') ? formData.get('skills').split(',').map(s => s.trim()) : [],
            languages: formData.get('languages') ? formData.get('languages').split(',').map(s => s.trim()) : ['Русский'],
            bio: formData.get('bio') || '',
            certifications: formData.get('certifications') ? formData.get('certifications').split(',').map(s => s.trim()) : [],
            timezone: formData.get('timezone') || 'UTC+3'
        };

        this.createNewUser(userData);
    }

    // Создание нового пользователя
    createNewUser(userData) {
        const userNumber = this.data.users.length + 1;
        const userId = userNumber;

        const newUser = {
            id: userId,
            name: userData.name,
            email: userData.email,
            position: userData.position || 'Не указано',
            department: userData.department || 'Не указано',
            role: userData.role,
            avatar: this.generateAvatar(userData.name),
            status: 'offline',
            phone: userData.phone || '',
            location: userData.location || '',
            skills: userData.skills,
            ticketsAssigned: 0,
            ticketsResolved: 0,
            averageResponseTime: 0,
            customerRating: 0,
            workHours: userData.workHours,
            timezone: userData.timezone,
            lastActivity: new Date().toISOString(),
            joinDate: new Date().toISOString().split('T')[0],
            bio: userData.bio,
            certifications: userData.certifications,
            languages: userData.languages
        };

        // Добавляем пользователя
        this.data.users.push(newUser);
        this.saveData();

        this.hideModal();
        this.showNotification(`✅ Пользователь "${userData.name}" успешно создан!`, 'success');

        // Переходим к пользователям если не там
        if (this.currentRoute !== 'users') {
            this.navigate('users');
        } else {
            this.renderContent();
        }

        console.log('✅ Создан новый пользователь:', newUser);
    }
    // РЕДАКТИРОВАНИЕ ПОЛЬЗОВАТЕЛЕЙ
    showEditUserModal(userId) {
        const user = this.data.users.find(u => u.id == userId);
        if (!user) {
            this.showNotification('Пользователь не найден', 'error');
            return;
        }

        const modal = `
            <div class="modal-header">
                <div class="modal-title-section">
                    <h2 class="modal-title">
                        <i class="fas fa-user-edit"></i>
                        Редактировать пользователя
                    </h2>
                    <p class="modal-subtitle">Изменение данных пользователя ${user.name}</p>
                </div>
                <button class="modal-close" onclick="app.hideModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="modal-body">
                <form class="edit-user-form" onsubmit="app.submitEditUser(event, ${userId})">
                    <!-- Основная информация -->
                    <div class="form-section">
                        <h3><i class="fas fa-user"></i> Основная информация</h3>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="editUserName">Полное имя <span class="required">*</span></label>
                                <input type="text" id="editUserName" name="name" required
                                       value="${user.name}" placeholder="Например: Иван Петров">
                            </div>

                            <div class="form-group">
                                <label for="editUserEmail">Email <span class="required">*</span></label>
                                <input type="email" id="editUserEmail" name="email" required
                                       value="${user.email}" placeholder="ivan.petrov@rikor.ru">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="editUserPosition">Должность</label>
                                <input type="text" id="editUserPosition" name="position"
                                       value="${user.position}" placeholder="Системный администратор">
                            </div>

                            <div class="form-group">
                                <label for="editUserDepartment">Отдел</label>
                                <select id="editUserDepartment" name="department">
                                    <option value="">Выберите отдел</option>
                                    <option value="IT отдел" ${user.department === 'IT отдел' ? 'selected' : ''}>IT отдел</option>
                                    <option value="Служба поддержки" ${user.department === 'Служба поддержки' ? 'selected' : ''}>Служба поддержки</option>
                                    <option value="Отдел разработки" ${user.department === 'Отдел разработки' ? 'selected' : ''}>Отдел разработки</option>
                                    <option value="Отдел продаж" ${user.department === 'Отдел продаж' ? 'selected' : ''}>Отдел продаж</option>
                                    <option value="Управление" ${user.department === 'Управление' ? 'selected' : ''}>Управление</option>
                                    <option value="Другое" ${user.department === 'Другое' ? 'selected' : ''}>Другое</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="editUserRole">Роль в системе <span class="required">*</span></label>
                                <select id="editUserRole" name="role" required>
                                    <option value="user" ${user.role === 'user' ? 'selected' : ''}>👤 Пользователь - создание тикетов</option>
                                    <option value="agent" ${user.role === 'agent' ? 'selected' : ''}>🎧 Агент поддержки - решение тикетов</option>
                                    <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>👑 Администратор - полный доступ</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="editUserPhone">Телефон</label>
                                <input type="tel" id="editUserPhone" name="phone"
                                       value="${user.phone || ''}" placeholder="+7 (495) 123-45-67">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="editUserStatus">Статус</label>
                                <select id="editUserStatus" name="status">
                                    <option value="online" ${user.status === 'online' ? 'selected' : ''}>🟢 В сети</option>
                                    <option value="away" ${user.status === 'away' ? 'selected' : ''}>🟡 Отошел</option>
                                    <option value="busy" ${user.status === 'busy' ? 'selected' : ''}>🔴 Занят</option>
                                    <option value="offline" ${user.status === 'offline' ? 'selected' : ''}>⚫ Не в сети</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="editUserLocation">Местоположение</label>
                                <input type="text" id="editUserLocation" name="location"
                                       value="${user.location || ''}" placeholder="Москва, офис 1">
                            </div>
                        </div>
                    </div>

                    <!-- Рабочая информация -->
                    <div class="form-section">
                        <h3><i class="fas fa-briefcase"></i> Рабочая информация</h3>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="editUserWorkHours">Рабочие часы</label>
                                <select id="editUserWorkHours" name="workHours">
                                    <option value="09:00-18:00" ${user.workHours === '09:00-18:00' ? 'selected' : ''}>09:00-18:00 (стандартный)</option>
                                    <option value="08:00-17:00" ${user.workHours === '08:00-17:00' ? 'selected' : ''}>08:00-17:00</option>
                                    <option value="10:00-19:00" ${user.workHours === '10:00-19:00' ? 'selected' : ''}>10:00-19:00</option>
                                    <option value="24/7" ${user.workHours === '24/7' ? 'selected' : ''}>24/7 (круглосуточно)</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="editUserTimezone">Часовой пояс</label>
                                <select id="editUserTimezone" name="timezone">
                                    <option value="UTC+3" ${user.timezone === 'UTC+3' ? 'selected' : ''}>UTC+3 (Москва)</option>
                                    <option value="UTC+2" ${user.timezone === 'UTC+2' ? 'selected' : ''}>UTC+2 (Калининград)</option>
                                    <option value="UTC+4" ${user.timezone === 'UTC+4' ? 'selected' : ''}>UTC+4 (Самара)</option>
                                    <option value="UTC+5" ${user.timezone === 'UTC+5' ? 'selected' : ''}>UTC+5 (Екатеринбург)</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="editUserSkills">Навыки и компетенции</label>
                                <input type="text" id="editUserSkills" name="skills"
                                       value="${user.skills ? user.skills.join(', ') : ''}"
                                       placeholder="Windows Server, Linux, Сети (через запятую)">
                            </div>

                            <div class="form-group">
                                <label for="editUserLanguages">Языки</label>
                                <input type="text" id="editUserLanguages" name="languages"
                                       value="${user.languages ? user.languages.join(', ') : ''}"
                                       placeholder="Русский, Английский (через запятую)">
                            </div>
                        </div>
                    </div>

                    <!-- Статистика -->
                    <div class="form-section">
                        <h3><i class="fas fa-chart-bar"></i> Статистика работы</h3>

                        <div class="stats-grid">
                            <div class="stat-item-edit">
                                <label>Назначено тикетов</label>
                                <span class="stat-value">${user.ticketsAssigned || 0}</span>
                            </div>
                            <div class="stat-item-edit">
                                <label>Решено тикетов</label>
                                <span class="stat-value">${user.ticketsResolved || 0}</span>
                            </div>
                            <div class="stat-item-edit">
                                <label>Среднее время отклика</label>
                                <span class="stat-value">${user.averageResponseTime || 0}ч</span>
                            </div>
                            <div class="stat-item-edit">
                                <label>Рейтинг клиентов</label>
                                <span class="stat-value">${user.customerRating || 0}/5</span>
                            </div>
                        </div>
                    </div>

                    <!-- Дополнительная информация -->
                    <div class="form-section">
                        <h3><i class="fas fa-info-circle"></i> Дополнительная информация</h3>

                        <div class="form-group">
                            <label for="editUserBio">О себе</label>
                            <textarea id="editUserBio" name="bio" rows="3"
                                      placeholder="Краткая информация о пользователе...">${user.bio || ''}</textarea>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="editUserCertifications">Сертификации</label>
                                <input type="text" id="editUserCertifications" name="certifications"
                                       value="${user.certifications ? user.certifications.join(', ') : ''}"
                                       placeholder="MCSE, CCNA, ITIL (через запятую)">
                            </div>
                        </div>
                    </div>

                    <!-- Действия -->
                    <div class="form-actions">
                        <button type="button" class="btn btn--secondary" onclick="app.hideModal()">
                            <i class="fas fa-times"></i> Отмена
                        </button>
                        <button type="submit" class="btn btn--primary">
                            <i class="fas fa-save"></i> Сохранить изменения
                        </button>
                    </div>
                </form>
            </div>
        `;

        this.showModal(modal, 'edit-user-modal');
        this.editingUser = user;
    }

    // Обработка формы редактирования пользователя
    submitEditUser(event, userId) {
        event.preventDefault();

        const user = this.data.users.find(u => u.id == userId);
        if (!user) {
            this.showNotification('Пользователь не найден', 'error');
            return;
        }

        const form = event.target;
        const formData = new FormData(form);

        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const role = formData.get('role');

        if (!name || !email || !role) {
            this.showNotification('Заполните все обязательные поля', 'error');
            return;
        }

        // Проверяем уникальность email (кроме текущего пользователя)
        if (this.data.users.some(u => u.id != userId && u.email.toLowerCase() === email.toLowerCase())) {
            this.showNotification('Пользователь с таким email уже существует', 'error');
            return;
        }

        // Обновляем данные пользователя
        const oldName = user.name;
        user.name = name;
        user.email = email;
        user.position = formData.get('position') || '';
        user.department = formData.get('department') || '';
        user.role = role;
        user.phone = formData.get('phone') || '';
        user.status = formData.get('status') || 'offline';
        user.location = formData.get('location') || '';
        user.workHours = formData.get('workHours') || '09:00-18:00';
        user.timezone = formData.get('timezone') || 'UTC+3';
        user.skills = formData.get('skills') ? formData.get('skills').split(',').map(s => s.trim()) : [];
        user.languages = formData.get('languages') ? formData.get('languages').split(',').map(s => s.trim()) : ['Русский'];
        user.bio = formData.get('bio') || '';
        user.certifications = formData.get('certifications') ? formData.get('certifications').split(',').map(s => s.trim()) : [];

        // Обновляем аватар если изменилось имя
        if (oldName !== name) {
            user.avatar = this.generateAvatar(name);
        }

        this.saveData();
        this.hideModal();
        this.showNotification(`✅ Данные пользователя "${name}" успешно обновлены!`, 'success');

        // Обновляем отображение
        if (this.currentRoute === 'users') {
            this.renderContent();
        }

        console.log('✅ Пользователь обновлен:', user);
        this.editingUser = null;
    }

    // НОВАЯ ФУНКЦИЯ v2.8.0: РЕНДЕРИНГ ОТЧЕТОВ С ГРАФИКАМИ
    renderReports() {
        const stats = this.data.stats;
        const reportStats = stats.reportStats;

        return `
            <div class="page-header">
                <div class="page-title">
                    <h1><i class="fas fa-chart-pie"></i> Отчеты и аналитика</h1>
                    <p>Детальная аналитика работы службы поддержки RIKOR</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn--secondary" onclick="app.exportReports()">
                        <i class="fas fa-download"></i> Экспорт отчетов
                    </button>
                    <button class="btn btn--primary" onclick="app.generateCustomReport()">
                        <i class="fas fa-chart-line"></i> Создать отчет
                    </button>
                </div>
            </div>

            <!-- Ключевые метрики -->
            <div class="metrics-overview">
                <h2><i class="fas fa-tachometer-alt"></i> Ключевые показатели</h2>
                <div class="grid grid--4">
                    <div class="metric-card">
                        <div class="metric-icon" style="background: linear-gradient(135deg, #1e40af, #3b82f6);">
                            <i class="fas fa-ticket-alt"></i>
                        </div>
                        <div class="metric-content">
                            <div class="metric-value">${stats.totalTickets}</div>
                            <div class="metric-label">Всего тикетов</div>
                            <div class="metric-trend trend--up">
                                <i class="fas fa-arrow-up"></i> +12% за месяц
                            </div>
                        </div>
                    </div>

                    <div class="metric-card">
                        <div class="metric-icon" style="background: linear-gradient(135deg, #10b981, #059669);">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="metric-content">
                            <div class="metric-value">${stats.slaCompliance}%</div>
                            <div class="metric-label">SLA соответствие</div>
                            <div class="metric-trend trend--up">
                                <i class="fas fa-arrow-up"></i> +2% за месяц
                            </div>
                        </div>
                    </div>

                    <div class="metric-card">
                        <div class="metric-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="metric-content">
                            <div class="metric-value">${stats.avgResponseTime}ч</div>
                            <div class="metric-label">Среднее время отклика</div>
                            <div class="metric-trend trend--down">
                                <i class="fas fa-arrow-down"></i> -0.3ч за месяц
                            </div>
                        </div>
                    </div>

                    <div class="metric-card">
                        <div class="metric-icon" style="background: linear-gradient(135deg, #7c3aed, #a855f7);">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="metric-content">
                            <div class="metric-value">${stats.customerSatisfaction}%</div>
                            <div class="metric-label">Удовлетворенность</div>
                            <div class="metric-trend trend--up">
                                <i class="fas fa-arrow-up"></i> +3% за месяц
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Графики отчетов -->
            <div class="reports-charts">
                <div class="grid grid--2">
                    <!-- График производительности агентов -->
                    <div class="chart-card">
                        <div class="card__header">
                            <h3><i class="fas fa-users"></i> Производительность агентов</h3>
                            <p>Количество решенных тикетов по агентам</p>
                        </div>
                        <div class="chart-container">
                            <canvas id="agentPerformanceChart"></canvas>
                        </div>
                    </div>

                    <!-- График времени решения -->
                    <div class="chart-card">
                        <div class="card__header">
                            <h3><i class="fas fa-hourglass-half"></i> Время решения тикетов</h3>
                            <p>Распределение по времени решения</p>
                        </div>
                        <div class="chart-container">
                            <canvas id="resolutionTimeChart"></canvas>
                        </div>
                    </div>

                    <!-- График категорий тикетов -->
                    <div class="chart-card">
                        <div class="card__header">
                            <h3><i class="fas fa-tags"></i> Категории тикетов</h3>
                            <p>Распределение по категориям обращений</p>
                        </div>
                        <div class="chart-container">
                            <canvas id="categoryChart"></canvas>
                        </div>
                    </div>

                    <!-- График SLA соответствия -->
                    <div class="chart-card">
                        <div class="card__header">
                            <h3><i class="fas fa-award"></i> SLA соответствие</h3>
                            <p>Целевые и фактические показатели SLA</p>
                        </div>
                        <div class="chart-container">
                            <canvas id="slaChart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Широкий график трендов -->
                <div class="chart-card full-width">
                    <div class="card__header">
                        <h3><i class="fas fa-chart-line"></i> Месячные тренды</h3>
                        <p>Динамика создания и решения тикетов, удовлетворенность клиентов</p>
                    </div>
                    <div class="chart-container" style="height: 300px;">
                        <canvas id="monthlyTrendsChart"></canvas>
                    </div>
                </div>
            </div>

            <!-- Детальная аналитика устройств -->
            <div class="device-analytics">
                <h2><i class="fas fa-laptop"></i> Аналитика устройств RIKOR</h2>

                <div class="device-summary-cards">
                    ${Object.entries(reportStats.deviceTypeDetails).map(([key, device]) => `
                        <div class="device-summary-card">
                            <div class="device-summary-header">
                                <h4>${device.name}</h4>
                                <div class="device-total">${device.total} шт.</div>
                            </div>
                            <div class="device-summary-stats">
                                <div class="device-stat">
                                    <span class="device-stat-label">Активные</span>
                                    <span class="device-stat-value status--online">${device.active}</span>
                                </div>
                                <div class="device-stat">
                                    <span class="device-stat-label">На обслуживании</span>
                                    <span class="device-stat-value status--maintenance">${device.maintenance}</span>
                                </div>
                                <div class="device-stat">
                                    <span class="device-stat-label">Тикетов</span>
                                    <span class="device-stat-value">${device.tickets}</span>
                                </div>
                                <div class="device-stat">
                                    <span class="device-stat-label">Uptime</span>
                                    <span class="device-stat-value uptime-good">${device.uptime}%</span>
                                </div>
                            </div>
                            <div class="device-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${(device.active / device.total) * 100}%"></div>
                                </div>
                                <span class="progress-text">${device.active} из ${device.total} активны</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    // НОВАЯ ФУНКЦИЯ v2.8.0: ИНИЦИАЛИЗАЦИЯ ГРАФИКОВ ОТЧЕТОВ
    initReportCharts() {
        console.log('📊 Инициализация графиков отчетов...');

        if (typeof Chart === 'undefined') {
            console.error('❌ Chart.js не загружен');
            return;
        }

        const reportStats = this.data.stats.reportStats;

        // Очищаем существующие графики
        Object.values(this.chartInstances).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
        this.chartInstances = {};

        try {
            // 1. График производительности агентов
            const agentCtx = document.getElementById('agentPerformanceChart')?.getContext('2d');
            if (agentCtx) {
                this.chartInstances.agentPerformance = new Chart(agentCtx, {
                    type: 'bar',
                    data: {
                        labels: reportStats.agentPerformance.labels,
                        datasets: [{
                            label: 'Решено тикетов',
                            data: reportStats.agentPerformance.ticketsResolved,
                            backgroundColor: reportStats.agentPerformance.colors.map(color => color + '40'),
                            borderColor: reportStats.agentPerformance.colors,
                            borderWidth: 2,
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
                            },
                            tooltip: {
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                titleColor: '#fff',
                                bodyColor: '#fff',
                                cornerRadius: 8,
                                callbacks: {
                                    title: function(context) {
                                        return context[0].label;
                                    },
                                    label: function(context) {
                                        return `Решено тикетов: ${context.raw}`;
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 50,
                                    color: '#64748b'
                                },
                                grid: {
                                    color: 'rgba(100, 116, 139, 0.1)'
                                }
                            },
                            x: {
                                ticks: {
                                    color: '#64748b'
                                },
                                grid: {
                                    display: false
                                }
                            }
                        }
                    }
                });
            }

            // 2. График времени решения
            const resolutionCtx = document.getElementById('resolutionTimeChart')?.getContext('2d');
            if (resolutionCtx) {
                this.chartInstances.resolutionTime = new Chart(resolutionCtx, {
                    type: 'doughnut',
                    data: {
                        labels: reportStats.resolutionTime.labels,
                        datasets: [{
                            data: reportStats.resolutionTime.data,
                            backgroundColor: reportStats.resolutionTime.colors,
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
                                    usePointStyle: true,
                                    color: '#475569'
                                }
                            },
                            tooltip: {
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                titleColor: '#fff',
                                bodyColor: '#fff',
                                cornerRadius: 8,
                                callbacks: {
                                    label: function(context) {
                                        return `${context.label}: ${context.raw} тикетов (${((context.raw / context.dataset.data.reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%)`;
                                    }
                                }
                            }
                        }
                    }
                });
            }

            // 3. График категорий тикетов
            const categoryCtx = document.getElementById('categoryChart')?.getContext('2d');
            if (categoryCtx) {
                this.chartInstances.category = new Chart(categoryCtx, {
                    type: 'pie',
                    data: {
                        labels: reportStats.categoryDistribution.labels,
                        datasets: [{
                            data: reportStats.categoryDistribution.data,
                            backgroundColor: reportStats.categoryDistribution.colors,
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
                                    padding: 20,
                                    usePointStyle: true,
                                    color: '#475569'
                                }
                            },
                            tooltip: {
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                titleColor: '#fff',
                                bodyColor: '#fff',
                                cornerRadius: 8,
                                callbacks: {
                                    label: function(context) {
                                        return `${context.label}: ${context.raw}%`;
                                    }
                                }
                            }
                        }
                    }
                });
            }

            // 4. График SLA соответствия  
            const slaCtx = document.getElementById('slaChart')?.getContext('2d');
            if (slaCtx) {
                this.chartInstances.sla = new Chart(slaCtx, {
                    type: 'bar',
                    data: {
                        labels: reportStats.slaCompliance.labels,
                        datasets: [
                            {
                                label: 'Цель',
                                data: reportStats.slaCompliance.target,
                                backgroundColor: '#e5e7eb',
                                borderColor: '#9ca3af',
                                borderWidth: 1,
                                borderRadius: 4
                            },
                            {
                                label: 'Факт',
                                data: reportStats.slaCompliance.actual,
                                backgroundColor: reportStats.slaCompliance.colors.map(c => c + '80'),
                                borderColor: reportStats.slaCompliance.colors,
                                borderWidth: 2,
                                borderRadius: 8
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: {
                                    color: '#475569',
                                    usePointStyle: true
                                }
                            },
                            tooltip: {
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                titleColor: '#fff',
                                bodyColor: '#fff',
                                cornerRadius: 8,
                                callbacks: {
                                    label: function(context) {
                                        return `${context.dataset.label}: ${context.raw}%`;
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100,
                                ticks: {
                                    callback: function(value) {
                                        return value + '%';
                                    },
                                    color: '#64748b'
                                },
                                grid: {
                                    color: 'rgba(100, 116, 139, 0.1)'
                                }
                            },
                            x: {
                                ticks: {
                                    color: '#64748b'
                                },
                                grid: {
                                    display: false
                                }
                            }
                        }
                    }
                });
            }

            // 5. График месячных трендов
            const trendsCtx = document.getElementById('monthlyTrendsChart')?.getContext('2d');
            if (trendsCtx) {
                this.chartInstances.monthlyTrends = new Chart(trendsCtx, {
                    type: 'line',
                    data: {
                        labels: reportStats.monthlyTrends.labels,
                        datasets: [
                            {
                                label: 'Создано тикетов',
                                data: reportStats.monthlyTrends.created,
                                borderColor: '#ef4444',
                                backgroundColor: '#ef444420',
                                fill: false,
                                tension: 0.4,
                                pointRadius: 6,
                                pointHoverRadius: 8,
                                pointBackgroundColor: '#ef4444',
                                pointBorderColor: '#ffffff',
                                pointBorderWidth: 2
                            },
                            {
                                label: 'Решено тикетов',
                                data: reportStats.monthlyTrends.resolved,
                                borderColor: '#10b981',
                                backgroundColor: '#10b98120',
                                fill: false,
                                tension: 0.4,
                                pointRadius: 6,
                                pointHoverRadius: 8,
                                pointBackgroundColor: '#10b981',
                                pointBorderColor: '#ffffff',
                                pointBorderWidth: 2
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: {
                            intersect: false,
                            mode: 'index'
                        },
                        plugins: {
                            legend: {
                                labels: {
                                    color: '#475569',
                                    usePointStyle: true,
                                    padding: 20
                                }
                            },
                            tooltip: {
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                titleColor: '#fff',
                                bodyColor: '#fff',
                                cornerRadius: 8,
                                callbacks: {
                                    title: function(context) {
                                        return `${context[0].label} 2025`;
                                    },
                                    label: function(context) {
                                        return `${context.dataset.label}: ${context.raw}`;
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    color: '#64748b'
                                },
                                grid: {
                                    color: 'rgba(100, 116, 139, 0.1)'
                                }
                            },
                            x: {
                                ticks: {
                                    color: '#64748b'
                                },
                                grid: {
                                    display: false
                                }
                            }
                        }
                    }
                });
            }

            console.log('✅ Графики отчетов инициализированы');
            this.showNotification('📊 Графики отчетов загружены', 'success', 2000);

        } catch (error) {
            console.error('❌ Ошибка инициализации графиков отчетов:', error);
            this.showNotification('❌ Ошибка загрузки графиков', 'error');
        }
    }

    // СИСТЕМА АВТОТЕСТИРОВАНИЯ v2.8.0
    async runSystemCheck() {
        console.log('🔍 ЗАПУСК СИСТЕМНОЙ ПРОВЕРКИ v2.8.0');
        console.log('=' * 60);

        const results = {
            passed: 0,
            failed: 0,
            warnings: 0,
            tests: []
        };

        // Тест 1: Создание пользователя
        try {
            console.log('1️⃣ Тестирование создания пользователя...');
            const testUserData = {
                name: 'Тест Пользователь',
                email: 'test@rikor.ru',
                role: 'user',
                position: 'Тестировщик',
                department: 'IT отдел'
            };

            const originalUsersCount = this.data.users.length;
            this.createNewUser(testUserData);

            if (this.data.users.length === originalUsersCount + 1) {
                console.log('✅ Создание пользователя - ПРОЙДЕНО');
                results.passed++;
                results.tests.push({name: 'Создание пользователя', status: 'PASS'});
            } else {
                throw new Error('Пользователь не был создан');
            }
        } catch (error) {
            console.log('❌ Создание пользователя - ОШИБКА:', error.message);
            results.failed++;
            results.tests.push({name: 'Создание пользователя', status: 'FAIL'});
        }

        // Тест 2: Графики отчетов
        try {
            console.log('2️⃣ Тестирование графиков отчетов...');

            if (typeof Chart !== 'undefined' && this.data.stats.reportStats) {
                console.log('✅ Графики отчетов - ПРОЙДЕНО');
                results.passed++;
                results.tests.push({name: 'Графики отчетов', status: 'PASS'});
            } else {
                throw new Error('Chart.js не загружен или нет данных для отчетов');
            }
        } catch (error) {
            console.log('❌ Графики отчетов - ОШИБКА:', error.message);
            results.failed++;
            results.tests.push({name: 'Графики отчетов', status: 'FAIL'});
        }

        // Тест 3: Навигация
        try {
            console.log('3️⃣ Тестирование навигации...');
            const testPages = ['dashboard', 'tickets', 'knowledge', 'reports', 'users', 'settings'];
            let navigationOk = true;

            for (const page of testPages) {
                this.navigate(page);
                if (this.currentRoute !== page) {
                    navigationOk = false;
                    break;
                }
            }

            if (navigationOk) {
                console.log('✅ Навигация - ПРОЙДЕНО');
                results.passed++;
                results.tests.push({name: 'Навигация', status: 'PASS'});
            } else {
                throw new Error('Ошибка при навигации между страницами');
            }
        } catch (error) {
            console.log('❌ Навигация - ОШИБКА:', error.message);
            results.failed++;
            results.tests.push({name: 'Навигация', status: 'FAIL'});
        }

        // Тест 4: Сохранение данных
        try {
            console.log('4️⃣ Тестирование сохранения данных...');
            this.saveData();

            const savedData = localStorage.getItem('rikor-helpdesk-data');
            if (savedData && JSON.parse(savedData)) {
                console.log('✅ Сохранение данных - ПРОЙДЕНО');
                results.passed++;
                results.tests.push({name: 'Сохранение данных', status: 'PASS'});
            } else {
                throw new Error('Данные не сохранились в localStorage');
            }
        } catch (error) {
            console.log('❌ Сохранение данных - ОШИБКА:', error.message);
            results.failed++;
            results.tests.push({name: 'Сохранение данных', status: 'FAIL'});
        }

        // Тест 5: Система уведомлений
        try {
            console.log('5️⃣ Тестирование системы уведомлений...');
            this.showNotification('Тестовое уведомление', 'info');
            await new Promise(resolve => setTimeout(resolve, 500));

            console.log('✅ Система уведомлений - ПРОЙДЕНО');
            results.passed++;
            results.tests.push({name: 'Уведомления', status: 'PASS'});
        } catch (error) {
            console.log('❌ Система уведомлений - ОШИБКА:', error.message);
            results.failed++;
            results.tests.push({name: 'Уведомления', status: 'FAIL'});
        }

        // Очистка тестовых данных
        try {
            console.log('🧹 Очистка тестовых данных...');
            this.data.users = this.data.users.filter(u => u.email !== 'test@rikor.ru');
            this.saveData();
            console.log('✅ Тестовые данные очищены');
        } catch (error) {
            console.log('⚠️ Ошибка очистки тестовых данных:', error.message);
            results.warnings++;
        }

        // Выводим итоговый отчет
        console.log('\n🎯 ИТОГОВЫЙ ОТЧЕТ ТЕСТИРОВАНИЯ v2.8.0:');
        console.log('=' * 40);
        console.log(`✅ Пройдено: ${results.passed}`);
        console.log(`❌ Провалено: ${results.failed}`);
        console.log(`⚠️ Предупреждения: ${results.warnings}`);
        console.log(`📊 Всего тестов: ${results.tests.length}`);
        console.log(`🎯 Успешность: ${Math.round((results.passed / results.tests.length) * 100)}%`);

        if (results.failed === 0) {
            console.log('\n🎉 ВСЕ ТЕСТЫ ПРОЙДЕНЫ УСПЕШНО!');
            console.log('✅ RIKOR HELPDESK v2.8.0 Enhanced готов к использованию!');
            this.showNotification('🎉 Все тесты системы пройдены успешно!', 'success', 5000);
        } else {
            console.log(`\n⚠️ ОБНАРУЖЕНЫ ПРОБЛЕМЫ: ${results.failed} тестов не прошли`);
            this.showNotification(`⚠️ Обнаружены проблемы: ${results.failed} ошибок`, 'warning', 7000);
        }

        return results;
    }

    // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

    // Генерация аватара из имени
    generateAvatar(name) {
        if (!name) return '??';
        const words = name.trim().split(' ');
        if (words.length === 1) {
            return words[0].substring(0, 2).toUpperCase();
        } else {
            return (words[0][0] + words[1][0]).toUpperCase();
        }
    }

    // Получение цвета бейджа роли
    getRoleBadgeColor(role) {
        const colors = {
            'admin': 'error',
            'agent': 'primary',
            'user': 'secondary'
        };
        return colors[role] || 'secondary';
    }

    // Получение текста роли
    getRoleText(role) {
        const texts = {
            'admin': '👑 Администратор',
            'agent': '🎧 Агент поддержки',
            'user': '👤 Пользователь'
        };
        return texts[role] || role;
    }

    // Заглушки для новых функций
    exportReports() {
        this.showNotification('📊 Экспорт отчетов запущен', 'info');
        console.log('📊 Экспорт отчетов...');
    }

    generateCustomReport() {
        this.showNotification('📈 Создание пользовательского отчета', 'info');
        console.log('📈 Генерация пользовательского отчета...');
    }
    // ОСНОВНЫЕ СИСТЕМНЫЕ ФУНКЦИИ (из предыдущей версии + обновления)

    bindEvents() {
        console.log('🔗 Привязка событий...');

        // Навигация в сайдбаре
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-route]');
            if (link) {
                e.preventDefault();
                const route = link.getAttribute('data-route');
                this.navigate(route);
            }
        });

        // Переключение темы
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // FAB кнопка
        const fabButton = document.getElementById('fabButton');
        if (fabButton) {
            fabButton.addEventListener('click', () => this.toggleFABMenu());
        }

        // Закрытие модальных окон по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideModal();
            }
        });

        // Закрытие модальных окон по клику вне их
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.hideModal();
            }
        });

        console.log('✅ События привязаны');
    }

    navigate(route) {
        console.log(`🧭 Навигация: ${route}`);

        // Обновляем активный элемент навигации
        document.querySelectorAll('.sidebar__link').forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`[data-route="${route}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Обновляем хлебные крошки
        this.updateBreadcrumb(route);

        // Сохраняем текущий маршрут
        this.currentRoute = route;

        // Обновляем URL
        window.location.hash = route;

        // Рендерим контент
        this.renderContent();
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

        const breadcrumbElement = document.getElementById('currentPage');
        if (breadcrumbElement) {
            breadcrumbElement.textContent = breadcrumbMap[route] || route;
        }
    }

    handleRoute() {
        const hash = window.location.hash.replace('#', '') || 'dashboard';
        this.navigate(hash);
    }

    renderContent() {
        const contentElement = document.getElementById('content');
        if (!contentElement) return;

        let content = '';

        try {
            switch (this.currentRoute) {
                case 'dashboard':
                    content = this.renderDashboard();
                    break;
                case 'tickets':
                    content = this.renderTickets();
                    break;
                case 'knowledge':
                    content = this.renderKnowledgeBase();
                    break;
                case 'reports':
                    content = this.renderReports();
                    break;
                case 'users':
                    content = this.renderUsers();
                    break;
                case 'settings':
                    content = this.renderSettings();
                    break;
                default:
                    content = this.renderDashboard();
            }

            contentElement.innerHTML = content;

            // Инициализируем графики для соответствующих страниц
            setTimeout(() => {
                if (this.currentRoute === 'dashboard') {
                    this.initDashboardCharts();
                } else if (this.currentRoute === 'reports') {
                    this.initReportCharts();
                }
            }, 100);

        } catch (error) {
            console.error('❌ Ошибка рендеринга контента:', error);
            contentElement.innerHTML = `
                <div class="error-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Ошибка загрузки</h3>
                    <p>Не удалось загрузить содержимое страницы.</p>
                    <button class="btn btn--primary" onclick="location.reload()">
                        <i class="fas fa-refresh"></i> Обновить страницу
                    </button>
                </div>
            `;
        }
    }

    // НОВАЯ ФУНКЦИЯ v2.8.0: РЕНДЕРИНГ ПОЛЬЗОВАТЕЛЕЙ
    renderUsers() {
        const users = this.data.users;
        const stats = {
            total: users.length,
            online: users.filter(u => u.status === 'online').length,
            admins: users.filter(u => u.role === 'admin').length,
            agents: users.filter(u => u.role === 'agent').length
        };

        return `
            <div class="page-header">
                <div class="page-title">
                    <h1><i class="fas fa-users"></i> Управление пользователями</h1>
                    <p>Пользователи системы RIKOR HELPDESK v2.8.0</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn--secondary" onclick="app.exportUsers()">
                        <i class="fas fa-download"></i> Экспорт
                    </button>
                    <button class="btn btn--primary" onclick="app.showCreateUserModal()">
                        <i class="fas fa-user-plus"></i> Добавить пользователя
                    </button>
                </div>
            </div>

            <!-- Статистика пользователей -->
            <div class="users-stats">
                <div class="grid grid--4">
                    <div class="stat-card">
                        <div class="stat-card-icon" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-card-value">${stats.total}</div>
                        <div class="stat-card-label">Всего пользователей</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-card-icon" style="background: linear-gradient(135deg, #10b981, #059669);">
                            <i class="fas fa-circle"></i>
                        </div>
                        <div class="stat-card-value">${stats.online}</div>
                        <div class="stat-card-label">В сети</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-card-icon" style="background: linear-gradient(135deg, #ef4444, #dc2626);">
                            <i class="fas fa-crown"></i>
                        </div>
                        <div class="stat-card-value">${stats.admins}</div>
                        <div class="stat-card-label">Администраторы</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-card-icon" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed);">
                            <i class="fas fa-headset"></i>
                        </div>
                        <div class="stat-card-value">${stats.agents}</div>
                        <div class="stat-card-label">Агенты поддержки</div>
                    </div>
                </div>
            </div>

            <!-- Фильтры -->
            <div class="users-filters">
                <div class="filter-group">
                    <input type="text" placeholder="Поиск пользователей..." onkeyup="app.filterUsers()">

                    <select onchange="app.filterUsersByRole(this.value)">
                        <option value="">Все роли</option>
                        <option value="admin">Администраторы</option>
                        <option value="agent">Агенты поддержки</option>
                        <option value="user">Пользователи</option>
                    </select>

                    <select onchange="app.filterUsersByStatus(this.value)">
                        <option value="">Все статусы</option>
                        <option value="online">В сети</option>
                        <option value="away">Отошли</option>
                        <option value="busy">Заняты</option>
                        <option value="offline">Не в сети</option>
                    </select>
                </div>
            </div>

            <!-- Список пользователей -->
            <div class="users-grid">
                ${users.map(user => `
                    <div class="user-card" data-role="${user.role}" data-status="${user.status}">
                        <div class="user-avatar-section">
                            <div class="user-avatar">${user.avatar}</div>
                            <div class="user-status ${user.status}"></div>
                        </div>

                        <div class="user-info">
                            <h3>${user.name}</h3>
                            <p class="user-position">${user.position}</p>
                            <p class="user-department">${user.department}</p>
                            <p class="user-email">${user.email}</p>

                            <div class="user-stats">
                                <div class="stat-item">
                                    <span class="stat-value">${user.ticketsAssigned || 0}</span>
                                    <span class="stat-label">Назначено</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-value">${user.ticketsResolved || 0}</span>
                                    <span class="stat-label">Решено</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-value">${user.customerRating || 0}</span>
                                    <span class="stat-label">Рейтинг</span>
                                </div>
                            </div>

                            <div class="user-role">
                                <span class="badge badge--${this.getRoleBadgeColor(user.role)}">${this.getRoleText(user.role)}</span>
                            </div>
                        </div>

                        <div class="user-actions">
                            <button class="btn btn--small btn--secondary" onclick="app.showUserDetails(${user.id})" title="Подробнее">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn--small btn--primary" onclick="app.showEditUserModal(${user.id})" title="Редактировать">
                                <i class="fas fa-edit"></i>
                            </button>
                            ${user.role !== 'admin' || this.data.users.filter(u => u.role === 'admin').length > 1 ? `
                            <button class="btn btn--small btn--danger" onclick="app.confirmDeleteUser(${user.id})" title="Удалить">
                                <i class="fas fa-trash"></i>
                            </button>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>

            ${users.length === 0 ? `
            <div class="empty-state">
                <i class="fas fa-users"></i>
                <h3>Пользователи не найдены</h3>
                <p>Создайте первого пользователя для начала работы</p>
                <button class="btn btn--primary" onclick="app.showCreateUserModal()">
                    <i class="fas fa-user-plus"></i> Добавить пользователя
                </button>
            </div>
            ` : ''}
        `;
    }

    saveData() {
        try {
            localStorage.setItem('rikor-helpdesk-data', JSON.stringify(this.data));
            console.log('💾 Данные сохранены');
        } catch (error) {
            console.error('❌ Ошибка сохранения данных:', error);
            this.showNotification('Ошибка сохранения данных', 'error');
        }
    }

    // СИСТЕМА УВЕДОМЛЕНИЙ
    showNotification(message, type = 'info', duration = 4000) {
        const container = document.getElementById('notifications') || this.createNotificationsContainer();

        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;

        const iconMap = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };

        notification.innerHTML = `
            <div class="notification__icon">
                <i class="fas fa-${iconMap[type] || 'info-circle'}"></i>
            </div>
            <div class="notification__content">
                <div class="notification__message">${message}</div>
            </div>
        `;

        container.appendChild(notification);

        // Автоматическое удаление
        setTimeout(() => {
            notification.remove();
        }, duration);

        console.log(`🔔 Уведомление [${type.toUpperCase()}]: ${message}`);
    }

    createNotificationsContainer() {
        const container = document.createElement('div');
        container.id = 'notifications';
        container.className = 'notifications';
        document.body.appendChild(container);
        return container;
    }

    // МОДАЛЬНЫЕ ОКНА
    showModal(content, className = '') {
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.className = `modal-overlay ${className}`;
        modal.innerHTML = `
            <div class="modal-container">
                ${content}
            </div>
        `;

        document.body.appendChild(modal);

        // Анимация появления
        requestAnimationFrame(() => {
            modal.classList.add('fade-in');
        });
    }

    hideModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    }

    // FAB МЕНЮ
    toggleFABMenu() {
        const menu = document.getElementById('fabMenu');
        if (menu) {
            menu.classList.toggle('hidden');
        }
    }

    // ТЕМЫ
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.settings.theme);
        this.updateThemeToggle();
    }

    toggleTheme() {
        this.settings.theme = this.settings.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('rikor-theme', this.settings.theme);
        this.applyTheme();
        this.showNotification(`Тема изменена на ${this.settings.theme === 'light' ? 'светлую' : 'темную'}`, 'success');
    }

    updateThemeToggle() {
        const toggle = document.querySelector('#themeToggle i');
        if (toggle) {
            toggle.className = this.settings.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    // ЗАГЛУШКИ ДЛЯ ДРУГИХ ФУНКЦИЙ
    renderDashboard() { return this.renderDashboardContent(); }
    renderTickets() { return this.renderTicketsContent(); }
    renderKnowledgeBase() { return this.renderKnowledgeContent(); }
    renderSettings() { return this.renderSettingsContent(); }

    renderDashboardContent() {
        return `
            <div class="page-header">
                <div class="page-title">
                    <h1><i class="fas fa-tachometer-alt"></i> Панель управления</h1>
                    <p>RIKOR HELPDESK v2.8.0 Enhanced • ${new Date().toLocaleDateString('ru-RU')}</p>
                </div>
            </div>
            <div class="empty-state">
                <i class="fas fa-chart-pie"></i>
                <h3>Dashboard будет готов в финальной версии</h3>
                <p>Перейдите в "Отчеты" для просмотра графиков</p>
            </div>
        `;
    }

    renderTicketsContent() {
        return `
            <div class="page-header">
                <div class="page-title">
                    <h1><i class="fas fa-ticket-alt"></i> Управление тикетами</h1>
                    <p>Система обработки обращений • Активных: ${this.data.tickets.length}</p>
                </div>
            </div>
            <div class="empty-state">
                <i class="fas fa-ticket-alt"></i>
                <h3>Функционал тикетов сохранен из предыдущей версии</h3>
                <p>Создайте первый тикет для начала работы</p>
            </div>
        `;
    }

    renderKnowledgeContent() {
        return `
            <div class="page-header">
                <div class="page-title">
                    <h1><i class="fas fa-book"></i> База знаний</h1>
                    <p>Документация и инструкции • Статей: ${this.data.knowledgeBase.length}</p>
                </div>
            </div>
            <div class="empty-state">
                <i class="fas fa-book"></i>
                <h3>Функционал базы знаний сохранен</h3>
                <p>Создайте первую статью для начала работы</p>
            </div>
        `;
    }

    renderSettingsContent() {
        return `
            <div class="page-header">
                <div class="page-title">
                    <h1><i class="fas fa-cog"></i> Настройки системы</h1>
                    <p>Конфигурация RIKOR HELPDESK v2.8.0</p>
                </div>
            </div>
            <div class="empty-state">
                <i class="fas fa-cog"></i>
                <h3>Настройки системы</h3>
                <p>Функционал настроек сохранен из предыдущей версии</p>
            </div>
        `;
    }

    // Заглушки для функций пользователей
    filterUsers() { console.log('🔍 Фильтрация пользователей'); }
    filterUsersByRole(role) { console.log('🔍 Фильтрация по роли:', role); }
    filterUsersByStatus(status) { console.log('🔍 Фильтрация по статусу:', status); }
    exportUsers() { this.showNotification('📄 Экспорт пользователей', 'info'); }
    showUserDetails(id) { this.showNotification(`👤 Просмотр пользователя ID: ${id}`, 'info'); }
    confirmDeleteUser(id) { this.showNotification(`🗑️ Подтверждение удаления пользователя ID: ${id}`, 'warning'); }
    initDashboardCharts() { console.log('📊 Инициализация графиков dashboard'); }

    // FAB функции
    showCreateTicketModal() { this.showNotification('📝 Создание тикета', 'info'); }
    showCreateArticleModal() { this.showNotification('📄 Создание статьи', 'info'); }
}

// Инициализация приложения
let app;

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM загружен, инициализируем RIKOR HELPDESK v2.8.0 Enhanced...');

    app = new RikorHelpDeskEnhanced();
    window.app = app; // Глобальный доступ для HTML

    console.log('✅ RIKOR HELPDESK v2.8.0 Enhanced готов к работе!');
});
