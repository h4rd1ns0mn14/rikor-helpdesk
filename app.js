// RIKOR HELPDESK v2.10.0 Advanced Assignment & File Management - ФИНАЛЬНАЯ ВЕРСИЯ
// Добавлено создание тикетов + просмотр статей

class RikorHelpDeskAdvanced {
    constructor() {
        console.log('🚀 RIKOR HELPDESK v2.10.0 - File Upload to Existing Tickets - Загрузка...');

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
                telegram: localStorage.getItem('rikor-telegram-notif') === 'true',
                telegramBotToken: localStorage.getItem('rikor-telegram-token') || '',
                telegramChatId: localStorage.getItem('rikor-telegram-chat') || '',
                emailSettings: {
                    smtp: localStorage.getItem('rikor-email-smtp') || 'smtp.gmail.com',
                    port: localStorage.getItem('rikor-email-port') || '587',
                    user: localStorage.getItem('rikor-email-user') || '',
                    password: localStorage.getItem('rikor-email-password') || ''
                }
            },
            autoRefresh: false,
            refreshInterval: 30000,
            maxFileSize: 10 * 1024 * 1024,
            allowedFileTypes: ['.pdf', '.doc', '.docx', '.txt', '.md', '.jpg', '.jpeg', '.png', '.zip', '.rar']
        };

        this.data = null;
        this.chartInstances = {};
        this.tempFiles = [];
        this.currentTicket = null;
        this.ticketFiles = {}; // Хранилище файлов для тикетов

        this.init();
    }

    async init() {
        try {
            console.log('📋 Инициализация системы...');
            await this.loadData();
            this.applyTheme();
            this.bindEvents();
            this.handleRoute();
            this.renderContent();

            setTimeout(() => {
                this.showNotification('✅ RIKOR HELPDESK v2.10.0 Advanced Assignment & File Management готов к работе!', 'success');
            }, 1000);

            console.log('✅ Система инициализирована');
        } catch (error) {
            console.error('❌ Ошибка инициализации:', error);
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
                    replies: [
                        {
                            id: 1,
                            author: "Елена Новикова",
                            message: "Проверила подключение питания. Попробую восстановить BIOS через служебный режим.",
                            created: "2025-09-22T12:20:00.000Z",
                            type: "comment",
                            files: []
                        }
                    ],
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
                    replies: [
                        {
                            id: 2,
                            author: "Петр Сидоров",
                            message: "Принял в работу. Начинаю диагностику аппаратной части.",
                            created: "2025-09-26T08:30:00.000Z",
                            type: "status_change",
                            statusFrom: "open",
                            statusTo: "in_progress",
                            files: []
                        }
                    ],
                    attachments: []
                }
            ],
            users: [
                {
                    id: 1,
                    name: "Петр Сидоров",
                    email: "p.sidorov@rikor.ru",
                    role: "admin",
                    department: "IT",
                    avatar: "ПС",
                    status: "online",
                    ticketsResolved: 25,
                    position: "Системный администратор",
                    phone: "+7 (495) 123-45-67",
                    lastActivity: "2025-09-26T10:00:00.000Z"
                },
                {
                    id: 2,
                    name: "Елена Новикова",
                    email: "e.novikova@rikor.ru",
                    role: "agent",
                    department: "IT",
                    avatar: "ЕН",
                    status: "online",
                    ticketsResolved: 18,
                    position: "Специалист технической поддержки",
                    phone: "+7 (495) 123-45-68",
                    lastActivity: "2025-09-26T09:30:00.000Z"
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
                    position: "Главный бухгалтер",
                    phone: "+7 (495) 123-45-69",
                    lastActivity: "2025-09-26T08:15:00.000Z"
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
                    content: `# Установка драйверов для ноутбука Rikor RN NINO

## Требования к системе
- Операционная система: Windows 10/11
- Оперативная память: 8 GB
- Свободное место: 2 GB

## Процесс установки

### Шаг 1: Подготовка
1. Скачайте последнюю версию драйверов с официального сайта Rikor
2. Убедитесь, что у вас есть права администратора
3. Отключите антивирус на время установки

### Шаг 2: Установка
1. Запустите установочный файл от имени администратора
2. Следуйте инструкциям мастера установки
3. Перезагрузите компьютер после завершения

### Шаг 3: Проверка
1. Откройте Диспетчер устройств
2. Убедитесь, что все устройства определены корректно
3. Проверьте работу всех функций

## Устранение неисправностей

**Проблема**: Драйвер не устанавливается
**Решение**: Попробуйте установить в режиме совместимости с Windows 8

**Проблема**: Устройство не распознается
**Решение**: Переустановите драйвер через Диспетчер устройств`,
                    tags: ["драйверы", "ноутбук", "установка", "rn-nino"],
                    views: 89,
                    rating: 4.5,
                    created: "2025-09-22T14:20:00.000Z",
                    updated: "2025-09-26T10:15:00.000Z",
                    author: "Елена Новикова",
                    attachments: [],
                    editHistory: []
                }
            ],
            rikorDevices: [
                {
                    type: "Ноутбук",
                    models: ["RN ARZ 103.1/15", "RN ARZ 103.2/15", "RN SPB 301.1/15", "RN MSK 401.1/16", "RN NINO 200.1/15", "RN NINO 201.2/15", "RN NINO 203.1/15", "RN NINO 203.1/17", "RN NINO 203.2/14", "RN NINO 203.1/17"]
                },
                {
                    type: "Сервер", 
                    models: ["RP6224", "RP8224", "RP6248", "RP8248", "RP-RACK 1U", "RP-RACK 2U"]
                },
                {
                    type: "Моноблок",
                    models: ["AIO 201.1/27"]
                },
                {
                    type: "Планшет",
                    models: ["RT-TAB 10", "RT-TAB 12", "RT-PRO 10", "RT-PRO 12", "RT-RUGGED 10"]
                },
                {
                    type: "Мини ПК",
                    models: ["USFF 101.1", "USFF 102.1", "USFF 103.1", "USFF 104.1", "USFF 105.1"]
                }
            ],
            stats: {
                totalTickets: 2,
                openTickets: 1,
                inProgressTickets: 1,
                waitingTickets: 0,
                resolvedTickets: 0,
                closedTickets: 0,
                criticalTickets: 1,
                highTickets: 1,
                mediumTickets: 0,
                lowTickets: 0,
                avgResponseTime: 1.2,
                avgResolutionTime: 6.8,
                customerSatisfaction: 97.5,
                slaCompliance: 94.2,

                monthlyTrend: [12, 15, 18, 16, 20, 19, 22, 25, 21, 24, 26, 28],
                monthlyLabels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],

                priorityStats: { critical: 1, high: 1, medium: 0, low: 0 },
                priorityLabels: ['Критический', 'Высокий', 'Средний', 'Низкий'],
                priorityColors: ['#ef4444', '#f59e0b', '#06b6d4', '#10b981'],

                statusStats: { open: 1, in_progress: 1, waiting: 0, resolved: 0, closed: 0 },
                statusLabels: ['Открытые', 'В работе', 'Ожидание', 'Решенные', 'Закрытые'],
                statusColors: ['#ef4444', '#f59e0b', '#06b6d4', '#10b981', '#64748b'],

                agentStats: {
                    names: ['Петр С.', 'Елена Н.', 'Иван П.'],
                    resolved: [25, 18, 12],
                    avgTime: [6.5, 8.2, 9.1]
                },

                deviceStats: {
                    types: ['Сервер', 'Ноутбук', 'Моноблок', 'Планшет', 'Мини ПК'],
                    counts: [1, 1, 0, 0, 0],
                    colors: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
                }
            }
        };
    }

    saveData() {
        try {
            localStorage.setItem('rikor-helpdesk-data', JSON.stringify(this.data));
            console.log('💾 Данные сохранены');
        } catch (error) {
            console.error('❌ Ошибка сохранения данных:', error);
        }
    }

    // НОВЫЕ МЕТОДЫ ДЛЯ НАЗНАЧЕНИЯ ТИКЕТОВ И РАБОТЫ С ФАЙЛАМИ

    // Показать модальное окно назначения тикета
    showAssignTicketModal(ticketId) {
        const ticket = this.data.tickets.find(t => t.id === ticketId);
        if (!ticket) {
            this.showNotification('Тикет не найден', 'error');
            return;
        }

        // Получаем только агентов и администраторов для назначения
        const assignableUsers = this.data.users.filter(u => u.role === 'agent' || u.role === 'admin');

        const userOptions = assignableUsers.map(user => {
            const isSelected = ticket.assigneeId === user.id ? 'selected' : '';
            const statusIcon = user.status === 'online' ? '🟢' : 
                              user.status === 'busy' ? '🔴' : 
                              user.status === 'away' ? '🟡' : '⚫';
            const workload = user.ticketsAssigned || 0;

            return `<option value="${user.id}" ${isSelected}>
                ${statusIcon} ${user.name} (${user.position}) - Нагрузка: ${workload} тикетов
            </option>`;
        }).join('');

        const modal = `
            <div class="modal-overlay" onclick="app.hideModal()">
                <div class="modal-container" onclick="event.stopPropagation()" style="max-width: 600px;">
                    <div class="modal-header">
                        <div>
                            <div class="modal-title">
                                <i class="fas fa-user-cog"></i>
                                Назначение тикета
                            </div>
                            <div class="modal-subtitle">Тикет: ${ticket.id} - ${ticket.title}</div>
                        </div>
                        <button class="modal-close" onclick="app.hideModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <div class="modal-body">
                        <div class="form-section">
                            <label class="form-label">
                                <i class="fas fa-user"></i>
                                Назначить исполнителя
                            </label>
                            <select id="assignTicketUser" class="form-input">
                                <option value="">— Не назначен —</option>
                                ${userOptions}
                            </select>
                        </div>

                        <div class="form-section">
                            <label class="form-label">
                                <i class="fas fa-clock"></i>
                                Приоритет задачи
                            </label>
                            <select id="assignTicketPriority" class="form-input">
                                <option value="low" ${ticket.priority === 'low' ? 'selected' : ''}>🟢 Низкий</option>
                                <option value="medium" ${ticket.priority === 'medium' ? 'selected' : ''}>🟡 Средний</option>
                                <option value="high" ${ticket.priority === 'high' ? 'selected' : ''}>🟠 Высокий</option>
                                <option value="critical" ${ticket.priority === 'critical' ? 'selected' : ''}>🔴 Критический</option>
                            </select>
                        </div>

                        <div class="form-section">
                            <label class="form-label">
                                <i class="fas fa-comment"></i>
                                Комментарий к назначению
                            </label>
                            <textarea id="assignTicketComment" class="form-input" rows="3" 
                                placeholder="Дополнительные инструкции или комментарии для исполнителя..."></textarea>
                        </div>

                        <div class="form-actions">
                            <button class="btn btn--secondary" onclick="app.hideModal()">
                                <i class="fas fa-times"></i>
                                Отмена
                            </button>
                            <button class="btn btn--primary" onclick="app.assignTicket('${ticketId}')">
                                <i class="fas fa-check"></i>
                                Назначить тикет
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modal);
    }

    // Назначить тикет на пользователя  
    assignTicket(ticketId) {
        const ticket = this.data.tickets.find(t => t.id === ticketId);
        if (!ticket) {
            this.showNotification('Тикет не найден', 'error');
            return;
        }

        const userId = document.getElementById('assignTicketUser').value;
        const priority = document.getElementById('assignTicketPriority').value;
        const comment = document.getElementById('assignTicketComment').value.trim();

        let assignee = null;
        let assigneeId = null;

        if (userId) {
            const user = this.data.users.find(u => u.id == userId);
            if (user) {
                assignee = user.name;
                assigneeId = user.id;

                // Увеличиваем нагрузку пользователя
                user.ticketsAssigned = (user.ticketsAssigned || 0) + (ticket.assigneeId ? 0 : 1);
            }
        }

        // Уменьшаем нагрузку предыдущего исполнителя
        if (ticket.assigneeId && ticket.assigneeId !== assigneeId) {
            const prevUser = this.data.users.find(u => u.id === ticket.assigneeId);
            if (prevUser && prevUser.ticketsAssigned > 0) {
                prevUser.ticketsAssigned--;
            }
        }

        // Обновляем тикет
        ticket.assignee = assignee;
        ticket.assigneeId = assigneeId;
        ticket.priority = priority;
        ticket.updated = new Date().toISOString();

        // Добавляем комментарий о назначении
        if (comment || ticket.assignee) {
            const reply = {
                id: ticket.replies.length + 1,
                author: this.currentUser.name,
                authorId: this.currentUser.id,
                message: comment || `Тикет назначен на ${assignee || 'неназначенный статус'}`,
                created: new Date().toISOString(),
                type: 'assignment',
                assignedTo: assignee,
                assignedToId: assigneeId,
                files: []
            };

            ticket.replies.push(reply);
        }

        this.saveData();
        this.hideModal();
        this.renderContent();

        const message = assignee 
            ? `Тикет ${ticketId} успешно назначен на ${assignee}`
            : `Исполнитель тикета ${ticketId} снят`;

        this.showNotification(message, 'success');
    }

    // Показать модальное окно добавления файлов к тикету
    showAddFilesModal(ticketId) {
        const ticket = this.data.tickets.find(t => t.id === ticketId);
        if (!ticket) {
            this.showNotification('Тикет не найден', 'error');
            return;
        }

        const modal = `
            <div class="modal-overlay" onclick="app.hideModal()">
                <div class="modal-container file-upload-modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <div>
                            <div class="modal-title">
                                <i class="fas fa-paperclip"></i>
                                Добавить файлы к тикету
                            </div>
                            <div class="modal-subtitle">Тикет: ${ticket.id} - ${ticket.title}</div>
                        </div>
                        <button class="modal-close" onclick="app.hideModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <div class="modal-body">
                        <div class="file-upload-zone">
                            <div class="upload-area" id="fileUploadArea">
                                <div class="upload-content">
                                    <div class="upload-icon">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                    </div>
                                    <div class="upload-text">
                                        <h3>Перетащите файлы сюда или нажмите для выбора</h3>
                                        <p>Максимальный размер: 50MB</p>
                                    </div>
                                </div>
                                <input type="file" id="ticketFileInput" multiple 
                                       accept=".pdf,.doc,.docx,.txt,.md,.jpg,.jpeg,.png,.zip,.rar"
                                       style="display: none;">
                            </div>

                            <div class="selected-files-section" id="selectedFilesSection" style="display: none;">
                                <h4><i class="fas fa-list"></i> Выбранные файлы</h4>
                                <div class="files-preview" id="filesPreview"></div>
                            </div>
                        </div>

                        <div class="comment-section">
                            <label for="filesComment" class="comment-label">
                                <i class="fas fa-comment"></i>
                                Комментарий к файлам
                            </label>
                            <textarea id="filesComment" class="comment-textarea" rows="3" 
                                placeholder="Описание прикрепленных файлов..."></textarea>
                        </div>

                        <div class="modal-actions">
                            <button class="btn btn--cancel" onclick="app.hideModal()">
                                <i class="fas fa-times"></i>
                                Отмена
                            </button>
                            <button class="btn btn--upload" onclick="app.uploadTicketFiles('${ticketId}')" id="uploadFilesBtn" disabled>
                                <i class="fas fa-upload"></i>
                                Добавить файлы
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modal);

        // Настройка обработчиков событий
        this.setupFileUploadHandlers(ticketId);
    }

    
    // Настройка обработчиков событий для загрузки файлов
    setupFileUploadHandlers(ticketId) {
        const uploadArea = document.getElementById('fileUploadArea');
        const fileInput = document.getElementById('ticketFileInput');

        // Клик по области загрузки
        uploadArea.onclick = () => {
            fileInput.click();
        };

        // Drag & Drop обработчики
        uploadArea.ondragover = (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        };

        uploadArea.ondragleave = (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
        };

        uploadArea.ondrop = (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');

            const files = Array.from(e.dataTransfer.files);
            if (files.length > 0) {
                this.processSelectedFiles(files, ticketId);
            }
        };

        // Обработчик изменения input файлов
        fileInput.onchange = (e) => {
            const files = Array.from(e.target.files);
            if (files.length > 0) {
                this.processSelectedFiles(files, ticketId);
            }
        };
    }

    // Обработка выбранных файлов
    processSelectedFiles(files, ticketId) {
        const maxSize = 50 * 1024 * 1024; // 50MB
        const allowedTypes = ['.pdf', '.doc', '.docx', '.txt', '.md', '.jpg', '.jpeg', '.png', '.zip', '.rar'];

        const validFiles = [];
        const invalidFiles = [];

        files.forEach(file => {
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            const isValidType = allowedTypes.includes(fileExtension);
            const isValidSize = file.size <= maxSize;

            if (isValidType && isValidSize) {
                validFiles.push(file);
            } else {
                invalidFiles.push({
                    file: file,
                    reason: !isValidType ? 'Неподдерживаемый тип файла' : 'Превышен максимальный размер файла'
                });
            }
        });

        if (invalidFiles.length > 0) {
            const errorMsg = invalidFiles.map(item => `${item.file.name}: ${item.reason}`).join('\n');
            this.showNotification(`Некорректные файлы:\n${errorMsg}`, 'error');
        }

        if (validFiles.length > 0) {
            this.displaySelectedFiles(validFiles);
            this.tempFiles = validFiles;

            // Активируем кнопку загрузки
            const uploadBtn = document.getElementById('uploadFilesBtn');
            if (uploadBtn) {
                uploadBtn.disabled = false;
            }
        }
    }

    // Отображение выбранных файлов
    displaySelectedFiles(files) {
        const selectedSection = document.getElementById('selectedFilesSection');
        const filesPreview = document.getElementById('filesPreview');

        if (!selectedSection || !filesPreview) return;

        const filesHtml = files.map((file, index) => {
            const fileSize = this.formatFileSize(file.size);
            const fileIcon = this.getFileIcon(file.name);

            return `
                <div class="file-item" data-index="${index}">
                    <div class="file-icon">
                        <i class="${fileIcon}"></i>
                    </div>
                    <div class="file-info">
                        <div class="file-name" title="${file.name}">${file.name}</div>
                        <div class="file-size">${fileSize}</div>
                    </div>
                    <button class="remove-file-btn" onclick="helpdesk.removeSelectedFile(${index})" title="Удалить файл">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        }).join('');

        filesPreview.innerHTML = filesHtml;
        selectedSection.style.display = 'block';
    }

    // Получение иконки файла по расширению
    getFileIcon(filename) {
        const extension = filename.split('.').pop().toLowerCase();
        const iconMap = {
            pdf: 'fas fa-file-pdf',
            doc: 'fas fa-file-word',
            docx: 'fas fa-file-word',
            txt: 'fas fa-file-alt',
            md: 'fas fa-file-code',
            jpg: 'fas fa-file-image',
            jpeg: 'fas fa-file-image',
            png: 'fas fa-file-image',
            zip: 'fas fa-file-archive',
            rar: 'fas fa-file-archive'
        };
        return iconMap[extension] || 'fas fa-file';
    }

    // Форматирование размера файла
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Б';

        const k = 1024;
        const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    // Удаление выбранного файла
    removeSelectedFile(index) {
        if (this.tempFiles && this.tempFiles.length > index) {
            this.tempFiles.splice(index, 1);

            if (this.tempFiles.length === 0) {
                const selectedSection = document.getElementById('selectedFilesSection');
                const uploadBtn = document.getElementById('uploadFilesBtn');

                if (selectedSection) selectedSection.style.display = 'none';
                if (uploadBtn) uploadBtn.disabled = true;
            } else {
                this.displaySelectedFiles(this.tempFiles);
            }
        }
    }

    // Обработка выбора файлов для тикета
    handleTicketFileSelect(event, ticketId) {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;

        this.processSelectedFiles(files, ticketId);
    }

    // Загрузить файлы к тикету
    uploadTicketFiles(ticketId) {
        if (!this.tempFiles || this.tempFiles.length === 0) {
            this.showNotification('Не выбраны файлы для загрузки', 'warning');
            return;
        }

        const ticket = this.data.tickets.find(t => t.id === ticketId);
        if (!ticket) {
            this.showNotification('Тикет не найден', 'error');
            return;
        }

        const comment = document.getElementById('filesComment').value.trim();

        // Инициализируем массив файлов для тикета если его нет
        if (!this.ticketFiles[ticketId]) {
            this.ticketFiles[ticketId] = [];
        }

        // Симуляция загрузки файлов
        const uploadedFiles = [];

        for (let file of this.tempFiles) {
            const uploadedFile = {
                id: Date.now() + Math.random(),
                name: file.name,
                size: file.size,
                type: file.type,
                uploadedAt: new Date().toISOString(),
                uploadedBy: this.currentUser.name,
                uploadedById: this.currentUser.id
            };

            uploadedFiles.push(uploadedFile);
            this.ticketFiles[ticketId].push(uploadedFile);
        }

        // Добавляем комментарий с файлами
        const reply = {
            id: ticket.replies.length + 1,
            author: this.currentUser.name,
            authorId: this.currentUser.id,
            message: comment || `Добавлено файлов: ${uploadedFiles.length}`,
            created: new Date().toISOString(),
            type: 'files',
            files: uploadedFiles.map(f => ({
                id: f.id,
                name: f.name,
                size: f.size,
                type: f.type
            }))
        };

        ticket.replies.push(reply);
        ticket.updated = new Date().toISOString();

        this.saveData();
        this.hideModal();
        this.renderContent();

        this.showNotification(`Успешно добавлено ${uploadedFiles.length} файлов к тикету ${ticketId}`, 'success');

        // Очищаем временные файлы
        this.tempFiles = [];
    }

    // Обновление назначения тикета быстрым способом
    updateTicketAssignee(ticketId, userId) {
        const ticket = this.data.tickets.find(t => t.id === ticketId);
        if (!ticket) return;

        let assignee = null;
        let assigneeId = null;

        if (userId) {
            const user = this.data.users.find(u => u.id == userId);
            if (user) {
                assignee = user.name;
                assigneeId = user.id;
            }
        }

        ticket.assignee = assignee;
        ticket.assigneeId = assigneeId;
        ticket.updated = new Date().toISOString();

        this.saveData();
        this.showNotification(assignee ? `Тикет назначен на ${assignee}` : 'Исполнитель снят', 'success');
    }

    // Форматировать размер файла
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Байт';

        const k = 1024;
        const sizes = ['Байт', 'КБ', 'МБ', 'ГБ'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // СОЗДАНИЕ НОВОГО ТИКЕТА (как на первом скрине)
    
    // Обновление функции создания тикетов с назначением
    showCreateTicketModal() {
        const modal = `
            <div class="modal-header">
                <h2 class="modal-title"><i class="fas fa-plus"></i> Регистрация нового обращения</h2>
                <p class="modal-subtitle">Создание тикета в службе поддержки Rikor</p>
                <button class="modal-close" onclick="app.hideModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form class="create-ticket-form" onsubmit="app.submitCreateTicket(event)">
                    <div class="form-row">
                        <!-- Краткое описание -->
                        <div class="form-group">
                            <label for="ticketTitle">Краткое описание проблемы <span class="required">*</span></label>
                            <input type="text" id="ticketTitle" name="title" 
                                   placeholder="Кратко опишите суть проблемы" required>
                        </div>
                        <!-- Тип устройства Rikor -->
                        <div class="form-group">
                            <label for="deviceType">Тип устройства Rikor <span class="required">*</span></label>
                            <select id="deviceType" name="deviceType" required onchange="app.updateDeviceModels(this.value)">
                                <option value="">Выберите тип устройства Rikor</option>
                                ${this.data.rikorDevices.map(device => 
                                    `<option value="${device.type}">${device.type}</option>`
                                ).join('')}
                            </select>
                        </div>
                    </div>

                    <!-- Подробное описание -->
                    <div class="form-group">
                        <label for="ticketDescription">Подробное описание проблемы <span class="required">*</span></label>
                        <textarea id="ticketDescription" name="description" rows="6" required 
                                  placeholder="Опишите проблему максимально подробно:
• Что именно происходит?
• При каких условиях возникает проблема?
• Какие действия уже предпринимались?
• Есть ли сообщения об ошибках?"></textarea>
                    </div>

                    <div class="form-row">
                        <!-- Модель устройства -->
                        <div class="form-group">
                            <label for="deviceModel">Модель устройства</label>
                            <select id="deviceModel" name="deviceModel">
                                <option value="">Сначала выберите тип устройства</option>
                            </select>
                        </div>
                        <!-- Серийный номер -->
                        <div class="form-group">
                            <label for="serialNumber">Серийный номер</label>
                            <input type="text" id="serialNumber" name="serialNumber" 
                                   placeholder="SN устройства Rikor">
                        </div>
                    </div>

                    <div class="form-row">
                        <!-- Приоритет -->
                        <div class="form-group">
                            <label for="priority">Приоритет <span class="required">*</span></label>
                            <select id="priority" name="priority" required>
                                <option value="medium">Средний - плановые задачи</option>
                                <option value="high">Высокий - влияет на работу</option>
                                <option value="critical">Критичный - блокирует работу</option>
                                <option value="low">Низкий - некритичные проблемы</option>
                            </select>
                        </div>
                        <!-- Категория -->
                        <div class="form-group">
                            <label for="category">Категория</label>
                            <select id="category" name="category">
                                <option value="hardware">Аппаратные проблемы</option>
                                <option value="software">Программные проблемы</option>
                                <option value="network">Сетевые проблемы</option>
                                <option value="security">Безопасность</option>
                                <option value="other">Прочее</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <!-- Местоположение -->
                        <div class="form-group">
                            <label for="location">Местоположение</label>
                            <input type="text" id="location" name="location" 
                                   placeholder="Например: Офис 1, Комната 205">
                        </div>
                        <!-- НОВОЕ: Назначить исполнителя -->
                        <div class="form-group">
                            <label for="assignee">Назначить исполнителя</label>
                            <select id="assignee" name="assignee">
                                <option value="">Автоматическое назначение</option>
                                ${this.getActiveAgents().map(user => 
                                    `<option value="${user.name}">${user.name} - ${user.position}</option>`
                                ).join('')}
                            </select>
                            <small>Оставьте пустым для автоматического назначения на свободного агента</small>
                        </div>
                    </div>

                    <!-- Теги -->
                    <div class="form-group">
                        <label for="tags">Теги для поиска</label>
                        <input type="text" id="tags" name="tags" 
                               placeholder="Например: rikor, питание, драйверы">
                        <small>Ключевые слова через запятую для быстрого поиска</small>
                    </div>

                    <!-- Прикрепленные файлы -->
                    <div class="form-group">
                        <label><i class="fas fa-paperclip"></i> Прикрепленные файлы</label>
                        <div class="file-upload-area" onclick="document.getElementById('ticketFiles').click()">
                            <div class="file-upload-content">
                                <i class="fas fa-cloud-upload-alt"></i>
                                <span>Нажмите для выбора файлов или перетащите сюда</span>
                                <small>Поддерживаемые форматы:</small>
                                <small>PDF, DOC, TXT, JPG, PNG, ZIP (макс. 10 МБ)</small>
                            </div>
                            <input type="file" id="ticketFiles" multiple 
                                   accept=".pdf,.doc,.docx,.txt,.md,.jpg,.jpeg,.png,.zip,.rar" 
                                   style="display: none;" onchange="app.handleTicketFiles(this.files)">
                        </div>
                        <div id="ticketFilesList" class="selected-files-list"></div>
                    </div>

                    <!-- Действия -->
                    <div class="form-actions">
                        <button type="button" class="btn btn--secondary" onclick="app.hideModal()">
                            <i class="fas fa-times"></i> Отмена
                        </button>
                        <button type="submit" class="btn btn--primary">
                            <i class="fas fa-plus"></i> Создать тикет
                        </button>
                    </div>
                </form>
            </div>
        `;

        this.showModal(modal, 'create-ticket-modal');
        this.setupTicketFileUpload();
    }

    // Обновление моделей устройств при выборе типа
    updateDeviceModels(deviceType) {
        const modelSelect = document.getElementById('deviceModel');
        if (!modelSelect) return;

        modelSelect.innerHTML = '<option value="">Выберите модель</option>';

        const device = this.data.rikorDevices.find(d => d.type === deviceType);
        if (device) {
            device.models.forEach(model => {
                const option = document.createElement('option');
                option.value = model;
                option.textContent = model;
                modelSelect.appendChild(option);
            });
        }
    }

    // Обработка файлов для тикета
    setupTicketFileUpload() {
        const fileInput = document.getElementById('ticketFiles');
        const fileArea = document.querySelector('.file-upload-area');

        if (!fileInput || !fileArea) return;

        // Drag & Drop
        fileArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileArea.classList.add('dragover');
        });

        fileArea.addEventListener('dragleave', () => {
            fileArea.classList.remove('dragover');
        });

        fileArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileArea.classList.remove('dragover');
            this.handleTicketFiles(e.dataTransfer.files);
        });
    }

    handleTicketFiles(files) {
        const filesList = document.getElementById('ticketFilesList');
        if (!filesList) return;

        filesList.innerHTML = '';
        this.tempFiles = [];

        Array.from(files).forEach((file, index) => {
            // Проверка размера и типа
            const isValidSize = file.size <= this.settings.maxFileSize;
            const isValidType = this.settings.allowedFileTypes.some(type => 
                file.name.toLowerCase().endsWith(type.toLowerCase()));

            if (isValidSize && isValidType) {
                this.tempFiles.push({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    file: file
                });
            }

            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-info ${!isValidSize || !isValidType ? 'invalid' : ''}">
                    <i class="fas ${this.getFileIcon(file.type)}"></i>
                    <div class="file-details">
                        <span class="file-name">${file.name}</span>
                        <span class="file-size">${this.formatFileSize(file.size)}</span>
                        ${!isValidSize ? '<span class="error">Превышен размер файла</span>' : ''}
                        ${!isValidType ? '<span class="error">Недопустимый тип файла</span>' : ''}
                    </div>
                    <button type="button" class="remove-file-btn" onclick="this.parentElement.parentElement.remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;

            filesList.appendChild(fileItem);
        });

        const validFiles = this.tempFiles.length;
        const totalFiles = files.length;

        if (validFiles > 0) {
            this.showNotification(`Добавлено файлов: ${validFiles} из ${totalFiles}`, 'success');
        }
    }

    // Создание тикета
    
    // Обновленная функция создания тикета с поддержкой назначения
    submitCreateTicket(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const deviceType = formData.get('deviceType');
        const priority = formData.get('priority');

        if (!title || !description || !deviceType || !priority) {
            this.showNotification('Заполните все обязательные поля', 'error');
            return;
        }

        // Генерируем ID тикета
        const ticketNumber = this.data.tickets.length + 1;
        const ticketId = `RIK-2025-${String(ticketNumber).padStart(3, '0')}`;

        // Определяем исполнителя
        let assignee = formData.get('assignee');

        // Если исполнитель не выбран - автоматическое назначение
        if (!assignee) {
            const activeAgents = this.getActiveAgents();
            if (activeAgents.length > 0) {
                // Назначаем на агента с наименьшей нагрузкой
                const agentTicketCounts = activeAgents.map(agent => ({
                    agent: agent,
                    count: this.data.tickets.filter(t => t.assignee === agent.name && 
                                                   (t.status === 'open' || t.status === 'inprogress')).length
                }));

                const leastBusyAgent = agentTicketCounts.reduce((min, current) => 
                    current.count < min.count ? current : min
                );

                assignee = leastBusyAgent.agent.name;
                console.log(`🎯 Автоматически назначено на ${assignee} (нагрузка: ${leastBusyAgent.count} тикетов)`);
            }
        }

        // Создаем новый тикет
        const newTicket = {
            id: ticketId,
            title: title,
            description: description,
            status: 'open',
            priority: priority,
            category: formData.get('category') || 'other',
            deviceType: deviceType,
            deviceModel: formData.get('deviceModel') || '',
            serialNumber: formData.get('serialNumber') || '',
            assignee: assignee || '',
            reporter: this.currentUser.name,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            location: formData.get('location') || '',
            timeSpent: 0,
            estimatedTime: priority === 'critical' ? 1 : priority === 'high' ? 2 : 4,
            tags: formData.get('tags') ? formData.get('tags').split(',').map(tag => tag.trim()) : [],
            replies: [{
                id: Date.now(),
                author: this.currentUser.name,
                message: `Тикет создан. Статус: ${this.getStatusText('open')}`,
                created: new Date().toISOString(),
                type: 'statuschange',
                files: []
            }],
            attachments: this.tempFiles.map(file => ({
                name: file.name,
                size: file.size,
                type: file.type
            }))
        };

        // Добавляем тикет
        this.data.tickets.push(newTicket);
        this.updateTicketStats();
        this.saveData();

        // Отправляем уведомления
        this.sendNewTicketNotifications(newTicket);

        // Очищаем временные файлы
        this.tempFiles = [];

        this.hideModal();
        this.showNotification(`Тикет ${ticketId} успешно создан${assignee ? ` и назначен на ${assignee}` : ''}!`, 'success');

        // Переходим к тикетам если не находимся там
        if (this.currentRoute !== 'tickets') {
            this.navigate('tickets');
        } else {
            this.renderContent();
        }

        console.log('✅ Создан новый тикет:', newTicket);
    }

    // Отправка уведомлений о новом тикете
    async sendNewTicketNotifications(ticket) {
        console.log(`📧 Отправка уведомлений для нового тикета ${ticket.id}`);

        const isCritical = ticket.priority === 'critical';

        // Email уведомления
        if (this.settings.notifications.email) {
            this.showNotification(`📧 Email уведомление отправлено исполнителю`, 'info');
        }

        // Push уведомления
        if (this.settings.notifications.push) {
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification(`Новый тикет ${ticket.id}`, {
                    body: `${ticket.title} (${this.getPriorityText(ticket.priority)})`,
                    icon: '/favicon.ico',
                    tag: `new-ticket-${ticket.id}`
                });
            }
        }

        // Звуковые уведомления для критических тикетов
        if (this.settings.notifications.sound && isCritical) {
            this.playCriticalNotificationSound();
        }

        // Telegram уведомления
        if (this.settings.notifications.telegram && this.settings.notifications.telegramBotToken) {
            this.showNotification(`📱 Telegram уведомление отправлено`, 'info');
        }
    }
    // ПРОСМОТР СТАТЬИ ИЗ БАЗЫ ЗНАНИЙ
    viewArticle(articleId) {
        const article = this.data.knowledgeBase.find(a => a.id === articleId);
        if (!article) {
            this.showNotification('Статья не найдена', 'error');
            return;
        }

        // Увеличиваем количество просмотров
        article.views++;
        this.saveData();

        // Простая обработка Markdown
        const processedContent = this.renderMarkdown(article.content);

        const modal = `
            <div class="modal-header">
                <h2 class="modal-title">
                    <i class="fas fa-book-open"></i>
                    ${article.title}
                </h2>
                <div class="article-meta-header">
                    <span class="badge badge--${this.getCategoryColor(article.category)}">${this.getCategoryText(article.category)}</span>
                    <span class="rating-display">
                        <i class="fas fa-star"></i> ${article.rating}
                    </span>
                    <span class="views-display">
                        <i class="fas fa-eye"></i> ${article.views} просмотров
                    </span>
                </div>
                <button class="modal-close" onclick="app.hideModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="modal-body">
                <div class="article-view-container">

                    <!-- Информация об авторе -->
                    <div class="article-author-info">
                        <div class="author-details">
                            <div class="author-avatar">${this.getInitials(article.author)}</div>
                            <div class="author-text">
                                <span class="author-name">${article.author}</span>
                                <span class="publish-date">Опубликовано: ${this.formatDate(article.created)}</span>
                                ${article.updated !== article.created ? `<span class="update-date">Обновлено: ${this.formatDate(article.updated)}</span>` : ''}
                            </div>
                        </div>
                        <div class="article-actions">
                            <button class="btn btn--secondary btn--small" onclick="app.rateArticle('${article.id}')">
                                <i class="fas fa-star"></i> Оценить
                            </button>
                            <button class="btn btn--secondary btn--small" onclick="app.shareArticle('${article.id}')">
                                <i class="fas fa-share"></i> Поделиться
                            </button>
                            ${this.currentUser.role === 'admin' || this.currentUser.role === 'agent' ? `
                            <button class="btn btn--warning btn--small" onclick="app.editArticle('${article.id}')">
                                <i class="fas fa-edit"></i> Редактировать
                            </button>
                            ` : ''}
                        </div>
                    </div>

                    <!-- Содержание статьи -->
                    <div class="article-content-view">
                        ${processedContent}
                    </div>

                    <!-- Теги -->
                    ${article.tags.length > 0 ? `
                    <div class="article-tags-section">
                        <h4><i class="fas fa-tags"></i> Теги:</h4>
                        <div class="article-tags">
                            ${article.tags.map(tag => `<span class="tag clickable" onclick="app.searchByTag('${tag}')">#${tag}</span>`).join('')}
                        </div>
                    </div>
                    ` : ''}

                    <!-- Прикрепленные файлы -->
                    ${article.attachments.length > 0 ? `
                    <div class="article-attachments-section">
                        <h4><i class="fas fa-paperclip"></i> Прикрепленные файлы:</h4>
                        <div class="attachments-list">
                            ${article.attachments.map(file => `
                                <div class="attachment-item">
                                    <i class="fas ${this.getFileIcon(file.type)}"></i>
                                    <span class="attachment-name">${file.name}</span>
                                    <span class="attachment-size">(${this.formatFileSize(file.size)})</span>
                                    <button class="btn btn--small btn--primary" onclick="app.downloadFile('${file.name}')">
                                        <i class="fas fa-download"></i>
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}

                    <!-- Похожие статьи -->
                    ${this.getSimilarArticles(article.id, article.tags).length > 0 ? `
                    <div class="similar-articles-section">
                        <h4><i class="fas fa-lightbulb"></i> Похожие статьи:</h4>
                        <div class="similar-articles-list">
                            ${this.getSimilarArticles(article.id, article.tags).map(similar => `
                                <div class="similar-article-item" onclick="app.viewArticle('${similar.id}')">
                                    <h5>${similar.title}</h5>
                                    <div class="similar-meta">
                                        <span class="badge badge--${this.getCategoryColor(similar.category)}">${this.getCategoryText(similar.category)}</span>
                                        <span><i class="fas fa-eye"></i> ${similar.views}</span>
                                        <span><i class="fas fa-star"></i> ${similar.rating}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}

                    <!-- Оценка статьи -->
                    <div class="article-rating-section">
                        <h4><i class="fas fa-thumbs-up"></i> Была ли статья полезной?</h4>
                        <div class="rating-buttons">
                            <button class="btn btn--success" onclick="app.rateArticle('${article.id}', 5)">
                                <i class="fas fa-thumbs-up"></i> Очень полезно
                            </button>
                            <button class="btn btn--warning" onclick="app.rateArticle('${article.id}', 3)">
                                <i class="fas fa-meh"></i> Частично полезно
                            </button>
                            <button class="btn btn--error" onclick="app.rateArticle('${article.id}', 1)">
                                <i class="fas fa-thumbs-down"></i> Не полезно
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.showModal(modal, 'article-view-modal');
    }

    // Рендеринг Markdown
    renderMarkdown(content) {
        return content
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/^- (.*$)/gm, '<li>$1</li>')
            .replace(/((?:<li>.*<\/li>\s*)+)/g, '<ul>$1</ul>')
            .replace(/^(\d+)\. (.*$)/gm, '<li>$1. $2</li>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>')
            .replace(/^(.+)$/, '<p>$1</p>');
    }

    // Поиск похожих статей
    getSimilarArticles(currentId, tags, maxResults = 3) {
        return this.data.knowledgeBase
            .filter(article => article.id !== currentId)
            .filter(article => article.tags.some(tag => tags.includes(tag)))
            .sort((a, b) => {
                const aMatchingTags = a.tags.filter(tag => tags.includes(tag)).length;
                const bMatchingTags = b.tags.filter(tag => tags.includes(tag)).length;
                return bMatchingTags - aMatchingTags;
            })
            .slice(0, maxResults);
    }

    // Оценка статьи
    rateArticle(articleId, rating = null) {
        const article = this.data.knowledgeBase.find(a => a.id === articleId);
        if (!article) return;

        if (rating) {
            // Простая логика оценки - усреднение
            const currentRating = article.rating || 0;
            const newRating = ((currentRating * 10) + rating) / 11;
            article.rating = Math.round(newRating * 10) / 10;

            this.saveData();
            this.showNotification(`Спасибо за оценку! Новый рейтинг: ${article.rating}`, 'success');

            // Обновляем интерфейс
            setTimeout(() => this.viewArticle(articleId), 500);
        } else {
            // Показать форму оценки
            this.showNotification('Выберите оценку от 1 до 5 звезд', 'info');
        }
    }

    // Поделиться статьей
    shareArticle(articleId) {
        const article = this.data.knowledgeBase.find(a => a.id === articleId);
        if (!article) return;

        const shareUrl = `${window.location.origin}${window.location.pathname}#knowledge/${articleId}`;

        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.content.substring(0, 100) + '...',
                url: shareUrl
            });
        } else {
            // Копировать в буфер обмена
            navigator.clipboard.writeText(shareUrl).then(() => {
                this.showNotification('Ссылка на статью скопирована в буфер обмена', 'success');
            }).catch(() => {
                this.showNotification('Не удалось скопировать ссылку', 'error');
            });
        }
    }

    // Поиск по тегу
    searchByTag(tag) {
        this.hideModal();
        this.navigate('knowledge');
        setTimeout(() => {
            const searchInput = document.querySelector('.knowledge-search input');
            if (searchInput) {
                searchInput.value = `#${tag}`;
                // Здесь можно добавить логику фильтрации
            }
        }, 300);
        this.showNotification(`Поиск статей по тегу: ${tag}`, 'info');
    }

    // Редактирование статьи (заглушка)
    editArticle(articleId) {
        this.showNotification('Редактирование статей будет доступно в следующей версии', 'info');
    }

    // Скачивание файла (заглушка)
    downloadFile(filename) {
        this.showNotification(`Скачивание файла: ${filename}`, 'info');
    }

    // КОМПАКТНОЕ МОДАЛЬНОЕ ОКНО ПРОСМОТРА ТИКЕТА (как раньше)
    viewTicket(ticketId) {
        const ticket = this.data.tickets.find(t => t.id === ticketId);
        if (!ticket) {
            this.showNotification('Тикет не найден', 'error');
            return;
        }

        this.currentTicket = ticket;

        const modal = `
            <div class="modal-header compact">
                <div class="ticket-title-section">
                    <h2 class="modal-title compact">${ticket.title}</h2>
                    <div class="ticket-badges">
                        <span class="badge ticket-id">${ticket.id}</span>
                        <span class="badge badge--${this.getStatusColor(ticket.status)} status-badge">${this.getStatusText(ticket.status).toUpperCase()}</span>
                        <span class="badge badge--${this.getPriorityColor(ticket.priority)} priority-badge">${this.getPriorityText(ticket.priority).toUpperCase()}</span>
                    </div>
                </div>
                <button class="modal-close" onclick="app.hideModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="modal-body compact">
                <div class="ticket-compact-container">

                    <!-- Описание проблемы -->
                    <div class="section">
                        <h4>Описание проблемы</h4>
                        <p class="description-text">${ticket.description}</p>
                    </div>

                    <!-- Основная информация в компактном виде -->
                    <div class="section">
                        <div class="info-grid-compact">
                            <div class="info-row">
                                <span class="label">Устройство:</span>
                                <span class="value"><i class="${this.getDeviceIcon(ticket.deviceType)}"></i> ${ticket.deviceType} ${ticket.deviceModel}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Серийный номер:</span>
                                <span class="value">${ticket.serialNumber}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Местоположение:</span>
                                <span class="value"><i class="fas fa-map-marker-alt"></i> ${ticket.location}</span>
                            </div>
                            <div class="info-row">
                                <span class="label">Категория:</span>
                                <span class="value">${this.getCategoryText(ticket.category)}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Участники -->
                    <div class="section participants">
                        <div class="participants-grid">
                            <div class="participant">
                                <span class="label">Создал:</span>
                                <span class="value">${ticket.reporter}</span>
                                <span class="date">${this.formatDate(ticket.created)}</span>
                            </div>
                            <div class="participant">
                                <span class="label">Исполнитель:</span>
                                <span class="value">${ticket.assignee}</span>
                                <span class="date">Обновлен: ${this.formatDate(ticket.updated)}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Временные рамки -->
                    <div class="section time-frames">
                        <div class="time-info">
                            <div class="time-item">
                                <span class="label">Потрачено времени:</span>
                                <span class="value">${ticket.timeSpent} ч</span>
                            </div>
                            <div class="time-item">
                                <span class="label">Оценка времени:</span>
                                <span class="value">${ticket.estimatedTime} ч</span>
                            </div>
                        </div>
                    </div>

                    <!-- Изменить статус -->
                    <div class="section status-change">
                        <h4>Изменить статус</h4>
                        <div class="status-buttons">
                            <button class="status-btn ${ticket.status === 'open' ? 'active' : ''}" 
                                    onclick="app.changeTicketStatus('${ticket.id}', 'open')">
                                Открыт
                            </button>
                            <button class="status-btn ${ticket.status === 'in_progress' ? 'active' : ''}" 
                                    onclick="app.changeTicketStatus('${ticket.id}', 'in_progress')">
                                В работе
                            </button>
                            <button class="status-btn ${ticket.status === 'waiting' ? 'active' : ''}" 
                                    onclick="app.changeTicketStatus('${ticket.id}', 'waiting')">
                                Ожидание
                            </button>
                            <button class="status-btn ${ticket.status === 'resolved' ? 'active' : ''}" 
                                    onclick="app.changeTicketStatus('${ticket.id}', 'resolved')">
                                Решен
                            </button>
                            <button class="status-btn ${ticket.status === 'closed' ? 'active' : ''}" 
                                    onclick="app.changeTicketStatus('${ticket.id}', 'closed')">
                                Закрыт
                            </button>
                        </div>
                    </div>

                    <!-- Ответы -->
                    <div class="section replies">
                        <h4>Ответы (${ticket.replies.length})</h4>
                        <div class="replies-list">
                            ${ticket.replies.map(reply => `
                                <div class="reply-compact">
                                    <div class="reply-header">
                                        <div class="reply-author">
                                            <div class="author-avatar-small">${this.getInitials(reply.author)}</div>
                                            <span class="author-name">${reply.author}</span>
                                        </div>
                                        <span class="reply-date">${this.formatDate(reply.created)}</span>
                                    </div>
                                    <div class="reply-message">${reply.message}</div>
                                </div>
                            `).join('')}
                        </div>

                        <!-- Быстрая форма ответа -->
                        <form class="quick-reply-form" onsubmit="app.addQuickReply(event, '${ticket.id}')">
                            <textarea placeholder="Добавить комментарий..." name="message" rows="3" required></textarea>
                            <div class="reply-actions">
                                <button type="submit" class="btn btn--primary btn--small">
                                    <i class="fas fa-paper-plane"></i> Отправить
                                </button>
                                <button type="button" class="btn btn--info btn--small" onclick="app.showAddFilesModal('${ticket.id}')">
                                    <i class="fas fa-paperclip"></i> Добавить файлы
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        this.showModal(modal, 'ticket-modal-compact');
    }

    // БЫСТРАЯ СМЕНА СТАТУСА ТИКЕТА
    changeTicketStatus(ticketId, newStatus) {
        const ticket = this.data.tickets.find(t => t.id === ticketId);
        if (!ticket) {
            this.showNotification('Тикет не найден', 'error');
            return;
        }

        const oldStatus = ticket.status;
        ticket.status = newStatus;
        ticket.updated = new Date().toISOString();

        // Добавляем запись об изменении статуса
        ticket.replies.push({
            id: Date.now(),
            author: this.currentUser.name,
            message: `Статус изменен с "${this.getStatusText(oldStatus)}" на "${this.getStatusText(newStatus)}"`,
            created: new Date().toISOString(),
            type: 'status_change',
            files: []
        });

        this.saveData();
        this.updateTicketStats();

        // Отправляем уведомления при изменении статуса
        if (oldStatus !== newStatus) {
            this.sendStatusChangeNotifications(ticket, oldStatus, newStatus);
        }

        // Обновляем интерфейс
        this.viewTicket(ticketId);
        this.showNotification(`Статус тикета изменен на "${this.getStatusText(newStatus)}"`, 'success');

        console.log(`✅ Статус тикета ${ticketId} изменен: ${oldStatus} → ${newStatus}`);
    }

    // БЫСТРЫЙ ОТВЕТ В ТИКЕТЕ
    addQuickReply(event, ticketId) {
        event.preventDefault();

        const form = event.target;
        const message = form.message.value.trim();

        if (!message) {
            this.showNotification('Введите сообщение', 'error');
            return;
        }

        const ticket = this.data.tickets.find(t => t.id === ticketId);
        if (!ticket) {
            this.showNotification('Тикет не найден', 'error');
            return;
        }

        const reply = {
            id: Date.now(),
            author: this.currentUser.name,
            message: message,
            created: new Date().toISOString(),
            type: 'comment',
            files: []
        };

        ticket.replies.push(reply);
        ticket.updated = new Date().toISOString();

        this.saveData();

        // Очищаем форму и обновляем интерфейс
        form.reset();
        this.viewTicket(ticketId);
        this.showNotification('Ответ добавлен', 'success');

        console.log('✅ Быстрый ответ добавлен к тикету:', ticketId);
    }

    // ОТПРАВКА УВЕДОМЛЕНИЙ ПРИ ИЗМЕНЕНИИ СТАТУСА
    async sendStatusChangeNotifications(ticket, oldStatus, newStatus) {
        console.log(`📧 Отправка уведомлений для тикета ${ticket.id}: ${oldStatus} → ${newStatus}`);

        const isCritical = ticket.priority === 'critical';
        const isImportantChange = (oldStatus === 'open' && newStatus === 'resolved') || 
                                 (newStatus === 'critical') || 
                                 (oldStatus !== 'closed' && newStatus === 'closed');

        // Email уведомления
        if (this.settings.notifications.email && isImportantChange) {
            await this.sendEmailNotification(ticket, oldStatus, newStatus);
        }

        // Push уведомления
        if (this.settings.notifications.push) {
            await this.sendPushNotification(ticket, oldStatus, newStatus);
        }

        // Звуковые уведомления для критических тикетов
        if (this.settings.notifications.sound && isCritical) {
            this.playCriticalNotificationSound();
        }

        // Telegram уведомления
        if (this.settings.notifications.telegram && this.settings.notifications.telegramBotToken) {
            await this.sendTelegramNotification(ticket, oldStatus, newStatus);
        }
    }

    // Email уведомления
    async sendEmailNotification(ticket, oldStatus, newStatus) {
        try {
            console.log('📧 Отправка email уведомления...');
            this.showNotification(`📧 Email уведомление отправлено: ${ticket.reporter}`, 'info');
            console.log('✅ Email уведомление отправлено');
        } catch (error) {
            console.error('❌ Ошибка отправки email:', error);
            this.showNotification('Ошибка отправки email уведомления', 'error');
        }
    }

    // Push уведомления
    async sendPushNotification(ticket, oldStatus, newStatus) {
        try {
            console.log('🔔 Отправка push уведомления...');

            if ('Notification' in window) {
                if (Notification.permission === 'granted') {
                    new Notification(`Тикет ${ticket.id}`, {
                        body: `Статус изменен: ${this.getStatusText(oldStatus)} → ${this.getStatusText(newStatus)}`,
                        icon: '/favicon.ico',
                        tag: `ticket-${ticket.id}`
                    });
                } else if (Notification.permission === 'default') {
                    const permission = await Notification.requestPermission();
                    if (permission === 'granted') {
                        new Notification(`Тикет ${ticket.id}`, {
                            body: `Статус изменен: ${this.getStatusText(oldStatus)} → ${this.getStatusText(newStatus)}`,
                            icon: '/favicon.ico',
                            tag: `ticket-${ticket.id}`
                        });
                    }
                }
            }

            this.showNotification('🔔 Push уведомление отправлено', 'info');
            console.log('✅ Push уведомление отправлено');

        } catch (error) {
            console.error('❌ Ошибка отправки push уведомления:', error);
        }
    }

    // Звуковые уведомления
    playCriticalNotificationSound() {
        try {
            console.log('🔊 Воспроизведение критического звукового сигнала...');

            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime + 0.3);
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.6);

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);

            this.showNotification('🔊 Критическое звуковое уведомление', 'warning');
            console.log('✅ Звуковой сигнал воспроизведен');

        } catch (error) {
            console.error('❌ Ошибка воспроизведения звука:', error);
        }
    }

    // Telegram уведомления
    async sendTelegramNotification(ticket, oldStatus, newStatus) {
        try {
            console.log('📱 Отправка Telegram уведомления...');
            this.showNotification('📱 Telegram уведомление отправлено', 'info');
            console.log('✅ Telegram уведомление отправлено');
        } catch (error) {
            console.error('❌ Ошибка отправки Telegram уведомления:', error);
            this.showNotification('Ошибка отправки Telegram уведомления', 'error');
        }
    }
    // ОБНОВЛЕНИЕ СТАТИСТИКИ ТИКЕТОВ
    updateTicketStats() {
        const stats = this.data.stats;

        // Подсчет по статусам
        stats.totalTickets = this.data.tickets.length;
        stats.openTickets = this.data.tickets.filter(t => t.status === 'open').length;
        stats.inProgressTickets = this.data.tickets.filter(t => t.status === 'in_progress').length;
        stats.waitingTickets = this.data.tickets.filter(t => t.status === 'waiting').length;
        stats.resolvedTickets = this.data.tickets.filter(t => t.status === 'resolved').length;
        stats.closedTickets = this.data.tickets.filter(t => t.status === 'closed').length;

        // Подсчет по приоритетам
        stats.criticalTickets = this.data.tickets.filter(t => t.priority === 'critical').length;
        stats.highTickets = this.data.tickets.filter(t => t.priority === 'high').length;
        stats.mediumTickets = this.data.tickets.filter(t => t.priority === 'medium').length;
        stats.lowTickets = this.data.tickets.filter(t => t.priority === 'low').length;

        // Обновляем объекты статистики для графиков
        stats.statusStats = {
            open: stats.openTickets,
            in_progress: stats.inProgressTickets,
            waiting: stats.waitingTickets,
            resolved: stats.resolvedTickets,
            closed: stats.closedTickets
        };

        stats.priorityStats = {
            critical: stats.criticalTickets,
            high: stats.highTickets,
            medium: stats.mediumTickets,
            low: stats.lowTickets
        };

        // Подсчет устройств
        const deviceCounts = {};
        this.data.tickets.forEach(ticket => {
            deviceCounts[ticket.deviceType] = (deviceCounts[ticket.deviceType] || 0) + 1;
        });

        stats.deviceStats.counts = this.data.rikorDevices.map(device => 
            deviceCounts[device.type] || 0
        );

        console.log('📊 Статистика обновлена');
    }

    // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ UI
    getStatusColor(status) {
        const colors = {
            'open': 'error',
            'in_progress': 'warning', 
            'waiting': 'info',
            'resolved': 'success',
            'closed': 'secondary'
        };
        return colors[status] || 'secondary';
    }

    getStatusText(status) {
        const texts = {
            'open': 'Открыт',
            'in_progress': 'В работе',
            'waiting': 'Ожидание',
            'resolved': 'Решен',
            'closed': 'Закрыт'
        };
        return texts[status] || status;
    }

    getPriorityColor(priority) {
        const colors = {
            'critical': 'error',
            'high': 'warning',
            'medium': 'info', 
            'low': 'success'
        };
        return colors[priority] || 'secondary';
    }

    getPriorityText(priority) {
        const texts = {
            'critical': 'Критический',
            'high': 'Высокий',
            'medium': 'Средний',
            'low': 'Низкий'
        };
        return texts[priority] || priority;
    }

    getCategoryColor(category) {
        const colors = {
            'hardware': 'warning',
            'software': 'info',
            'network': 'success',
            'security': 'error',
            'other': 'secondary'
        };
        return colors[category] || 'secondary';
    }

    getCategoryText(category) {
        const texts = {
            'hardware': 'Оборудование',
            'software': 'Программы',
            'network': 'Сеть',
            'security': 'Безопасность',
            'other': 'Другое'
        };
        return texts[category] || category;
    }

    getDeviceIcon(deviceType) {
        const icons = {
            'Сервер': 'fas fa-server',
            'Ноутбук': 'fas fa-laptop',
            'Моноблок': 'fas fa-desktop',
            'Планшет': 'fas fa-tablet-alt',
            'Мини ПК': 'fas fa-microchip'
        };
        return icons[deviceType] || 'fas fa-desktop';
    }

    getFileIcon(fileType) {
        if (fileType.includes('pdf')) return 'fa-file-pdf';
        if (fileType.includes('word') || fileType.includes('doc')) return 'fa-file-word';
        if (fileType.includes('text')) return 'fa-file-alt';
        if (fileType.includes('image')) return 'fa-file-image';
        if (fileType.includes('zip') || fileType.includes('rar')) return 'fa-file-archive';
        return 'fa-file';
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Б';
        const k = 1024;
        const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return 'Неверная дата';
        }
    }

    getInitials(fullName) {
        return fullName.split(' ')
            .map(name => name.charAt(0))
            .join('')
            .toUpperCase()
            .substring(0, 2);
    }

    // УПРАВЛЕНИЕ МОДАЛЬНЫМИ ОКНАМИ
    showModal(content, modalClass = '') {
        const overlay = document.getElementById('modal-overlay');
        const container = document.getElementById('modal-container');

        if (overlay && container) {
            container.innerHTML = content;
            container.className = `modal-container ${modalClass}`;
            overlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    hideModal() {
        // Сначала пытаемся найти статический модальный overlay по ID
        let overlay = document.getElementById('modal-overlay');
        if (overlay && !overlay.classList.contains('hidden')) {
            overlay.classList.add('hidden');
            document.body.style.overflow = 'auto';
            return;
        }

        // Если статический не найден или скрыт, ищем динамически созданные модальные окна
        const dynamicOverlays = document.querySelectorAll('.modal-overlay:not([id])');
        dynamicOverlays.forEach(overlay => {
            overlay.remove();
        });

        // Также ищем любые видимые модальные overlay
        const allOverlays = document.querySelectorAll('.modal-overlay');
        allOverlays.forEach(overlay => {
            if (overlay.id === 'modal-overlay') {
                overlay.classList.add('hidden');
            } else {
                overlay.remove();
            }
        });

        document.body.style.overflow = 'auto';
    }

    // УВЕДОМЛЕНИЯ
    showNotification(message, type = 'info', duration = 4000) {
        const container = document.getElementById('notifications');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__icon">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
            </div>
            <div class="notification__content">
                <div class="notification__message">${message}</div>
            </div>
        `;

        container.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, duration);
    }

    getNotificationIcon(type) {
        const icons = {
            'success': 'fa-check-circle',
            'error': 'fa-exclamation-circle',
            'warning': 'fa-exclamation-triangle',
            'info': 'fa-info-circle'
        };
        return icons[type] || 'fa-info-circle';
    }

    // ОСНОВНЫЕ ФУНКЦИИ СИСТЕМЫ
    applyTheme() {
        try {
            document.body.setAttribute('data-theme', this.settings.theme);
            const themeIcon = document.querySelector('.theme-toggle i');
            if (themeIcon) {
                themeIcon.className = this.settings.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
            console.log('🎨 Тема применена:', this.settings.theme);
        } catch (error) {
            console.warn('⚠️ Ошибка применения темы:', error);
        }
    }

    toggleTheme() {
        this.settings.theme = this.settings.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('rikor-theme', this.settings.theme);
        this.applyTheme();
        this.showNotification(
            `Тема изменена на ${this.settings.theme === 'light' ? 'светлую' : 'темную'}`, 
            'success'
        );
    }

    bindEvents() {
        try {
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

            // Закрытие модальных окон и меню
            document.addEventListener('click', (e) => {
                if (e.target.id === 'modal-overlay') {
                    this.hideModal();
                }

                const fabMenu = document.getElementById('fabMenu');
                if (fabMenu && !fabMenu.classList.contains('hidden')) {
                    fabMenu.classList.add('hidden');
                }
            });

            console.log('✅ События привязаны');
        } catch (error) {
            console.warn('⚠️ Ошибка привязки событий:', error);
        }
    }

    navigate(route) {
        console.log(`📍 Переход к: ${route}`);
        this.currentRoute = route;
        this.updateActiveLink(route);
        this.updateBreadcrumb(route);
        this.renderContent();
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
        this.currentRoute = hash;
        this.updateActiveLink(hash);
        this.updateBreadcrumb(hash);
    }

    renderContent() {
        const container = document.getElementById('content');
        if (!container) {
            console.error('❌ Контейнер content не найден');
            return;
        }

        try {
            switch(this.currentRoute) {
                case 'dashboard':
                    container.innerHTML = this.renderDashboard();
                    setTimeout(() => this.initDashboardCharts(), 500);
                    break;
                case 'tickets':
                    container.innerHTML = this.renderTickets();
                    break;
                case 'knowledge':
                    container.innerHTML = this.renderKnowledgeBase();
                    break;
                case 'reports':
                    container.innerHTML = this.renderReports();
                    setTimeout(() => this.initReportCharts(), 500);
                    break;
                case 'users':
                    container.innerHTML = this.renderUsers();
                    break;
                case 'settings':
                    container.innerHTML = this.renderSettings();
                    break;
                default:
                    container.innerHTML = this.renderDashboard();
            }
            console.log('✅ Контент отрендерен для:', this.currentRoute);
        } catch (error) {
            console.error('❌ Ошибка рендеринга:', error);
            container.innerHTML = `
                <div class="card error-card">
                    <h3>Ошибка отображения</h3>
                    <p>Не удалось загрузить содержимое страницы.</p>
                    <button class="btn btn--primary" onclick="app.navigate('dashboard')">На главную</button>
                </div>
            `;
        }
    }
    // РЕНДЕРЫ СТРАНИЦ

    renderDashboard() {
        return `
            <div class="dashboard">
                <div class="dashboard__header mb-4">
                    <h1><i class="fas fa-tachometer-alt"></i> Панель управления</h1>
                    <p>RIKOR HELPDESK v2.10.0 Advanced Assignment & File Management • ${new Date().toLocaleDateString('ru-RU')}</p>
                </div>

                <div class="grid grid--4 mb-4">
                    <div class="stat-card">
                        <div class="stat-card-icon" style="background: #3b82f6; color: white;">
                            <i class="fas fa-ticket-alt"></i>
                        </div>
                        <div class="stat-card-value">${this.data.stats.totalTickets}</div>
                        <div class="stat-card-label">Всего тикетов</div>
                        <div class="stat-card-trend trend--up">
                            <i class="fas fa-arrow-up"></i> +12% за месяц
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-card-icon" style="background: #ef4444; color: white;">
                            <i class="fas fa-exclamation-circle"></i>
                        </div>
                        <div class="stat-card-value">${this.data.stats.openTickets}</div>
                        <div class="stat-card-label">Открытые тикеты</div>
                        <div class="stat-card-trend">
                            <i class="fas fa-clock"></i> Требуют внимания
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-card-icon" style="background: #10b981; color: white;">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-card-value">${this.data.stats.resolvedTickets}</div>
                        <div class="stat-card-label">Решенные тикеты</div>
                        <div class="stat-card-trend trend--up">
                            <i class="fas fa-check"></i> +5% за неделю
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-card-icon" style="background: #06b6d4; color: white;">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-card-value">${this.data.stats.avgResponseTime}ч</div>
                        <div class="stat-card-label">Время ответа</div>
                        <div class="stat-card-trend trend--down">
                            <i class="fas fa-arrow-down"></i> -15 мин
                        </div>
                    </div>
                </div>

                <div class="grid grid--2 mb-4">
                    <div class="chart-card">
                        <div class="card__header">
                            <h3>Динамика обращений</h3>
                            <p>Тренд по месяцам 2025 года</p>
                        </div>
                        <div class="chart-container">
                            <canvas id="monthlyChart"></canvas>
                        </div>
                    </div>

                    <div class="chart-card">
                        <div class="card__header">
                            <h3>Распределение по приоритетам</h3>
                            <p>Активные тикеты</p>
                        </div>
                        <div class="chart-container">
                            <canvas id="priorityChart"></canvas>
                        </div>
                    </div>
                </div>

                <div class="grid grid--2 mb-4">
                    <div class="chart-card">
                        <div class="card__header">
                            <h3>Статусы тикетов</h3>
                            <p>Текущее распределение</p>
                        </div>
                        <div class="chart-container">
                            <canvas id="statusChart"></canvas>
                        </div>
                    </div>

                    <div class="chart-card">
                        <div class="card__header">
                            <h3>Типы устройств Rikor</h3>
                            <p>По категориям</p>
                        </div>
                        <div class="chart-container">
                            <canvas id="deviceChart"></canvas>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <h3><i class="fas fa-info-circle"></i> Статус системы</h3>
                    <div class="system-status">
                        <div class="status-item">
                            <i class="fas fa-check-circle text-success"></i>
                            <span>Система работает стабильно</span>
                        </div>
                        <div class="status-item">
                            <i class="fas fa-bell text-info"></i>
                            <span>Уведомления: ${Object.values(this.settings.notifications).filter(Boolean).length} активных</span>
                        </div>
                        <div class="status-item">
                            <i class="fas fa-users text-info"></i>
                            <span>Пользователей онлайн: ${this.data.users.filter(u => u.status === 'online').length}</span>
                        </div>
                        <div class="status-item">
                            <i class="fas fa-database text-success"></i>
                            <span>База данных: ${this.data.tickets.length} тикетов, ${this.data.knowledgeBase.length} статей</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderTickets() {
        const savedFilters = this.currentTicketFilters || {};
        const savedSearch = this.currentTicketSearch || '';

        const ticketsHtml = `
            <div class="tickets-page">
                <div class="page-header mb-4">
                    <div class="page-title">
                        <h1><i class="fas fa-ticket-alt"></i> Управление тикетами</h1>
                        <p>Система обработки обращений • Активных: ${this.data.tickets.length}</p>
                    </div>
                    <div class="page-actions">
                        <button class="btn btn--primary" onclick="app.showCreateTicketModal()">
                            <i class="fas fa-plus"></i> Создать тикет
                        </button>
                    </div>
                </div>

                <div class="tickets-filters mb-4">
                    <div class="filter-group">
                        <select onchange="app.filterTickets('status', this.value)" id="statusFilter">
                            <option value="">Все статусы</option>
                            <option value="open">Открытые</option>
                            <option value="in_progress">В работе</option>
                            <option value="waiting">Ожидание</option>
                            <option value="resolved">Решенные</option>
                            <option value="closed">Закрытые</option>
                        </select>

                        <select onchange="app.filterTickets('priority', this.value)" id="priorityFilter">
                            <option value="">Все приоритеты</option>
                            <option value="critical">Критический</option>
                            <option value="high">Высокий</option>
                            <option value="medium">Средний</option>
                            <option value="low">Низкий</option>
                        </select>

                        <input type="text" placeholder="Поиск по тикетам..." 
                               oninput="app.searchTickets(this.value)" id="searchInput" value="${savedSearch}">
                    </div>
                </div>

                <div class="tickets-list">
                    ${this.renderTicketsList()}
                </div>

                ${this.data.tickets.length === 0 ? `
                <div class="empty-state">
                    <i class="fas fa-ticket-alt"></i>
                    <h3>Нет доступных тикетов</h3>
                    <p>Создайте новый тикет для начала работы</p>
                </div>
                ` : ''}
            </div>
        `;

        // После рендера восстанавливаем значения фильтров
        setTimeout(() => {
            if (savedFilters.status) {
                const statusFilter = document.getElementById('statusFilter');
                if (statusFilter) statusFilter.value = savedFilters.status;
            }
            if (savedFilters.priority) {
                const priorityFilter = document.getElementById('priorityFilter');
                if (priorityFilter) priorityFilter.value = savedFilters.priority;
            }
        }, 0);

        return ticketsHtml;
    }

    // Метод для отрисовки списка тикетов с учетом фильтров
    renderTicketsList() {
        let tickets = [...this.data.tickets];

        // Применяем фильтры если они есть
        if (this.currentTicketFilters) {
            Object.keys(this.currentTicketFilters).forEach(filterType => {
                const filterValue = this.currentTicketFilters[filterType];
                tickets = tickets.filter(ticket => {
                    return ticket[filterType] === filterValue;
                });
            });
        }

        // Применяем поиск если он есть
        if (this.currentTicketSearch && this.currentTicketSearch.trim() !== '') {
            const searchQuery = this.currentTicketSearch.toLowerCase();
            tickets = tickets.filter(ticket => {
                return ticket.id.toLowerCase().includes(searchQuery) ||
                       ticket.title.toLowerCase().includes(searchQuery) ||
                       ticket.description.toLowerCase().includes(searchQuery) ||
                       ticket.assignee.toLowerCase().includes(searchQuery) ||
                       ticket.location.toLowerCase().includes(searchQuery);
            });
        }

        if (tickets.length === 0 && (this.currentTicketFilters || this.currentTicketSearch)) {
            return `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>Тикетов не найдено</h3>
                    <p>Попробуйте изменить параметры фильтрации или поиска</p>
                </div>
            `;
        }

        return tickets.map(ticket => `
            <div class="ticket-card" onclick="app.viewTicket('${ticket.id}')">
                <div class="ticket-header">
                    <div class="ticket-id-priority">
                        <span class="badge badge--primary">${ticket.id}</span>
                        <span class="badge badge--${this.getPriorityColor(ticket.priority)}">${this.getPriorityText(ticket.priority)}</span>
                    </div>
                    <span class="badge badge--${this.getStatusColor(ticket.status)}">${this.getStatusText(ticket.status)}</span>
                </div>

                <div class="ticket-content">
                    <h3 class="ticket-title">${ticket.title}</h3>
                    <p class="ticket-description">${ticket.description.substring(0, 150)}${ticket.description.length > 150 ? '...' : ''}</p>

                    <div class="ticket-device">
                        <i class="${this.getDeviceIcon(ticket.deviceType)}"></i>
                        <span>${ticket.deviceType} ${ticket.deviceModel}</span>
                    </div>
                </div>

                <div class="ticket-footer">
                    <div class="ticket-meta">
                        <div class="meta-item">
                            <i class="fas fa-user"></i>
                            <span>${ticket.assignee}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${ticket.location}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-clock"></i>
                            <span>${this.formatDate(ticket.created)}</span>
                        </div>
                    </div>

                    <div class="ticket-stats">
                        <span class="stat-item">
                            <i class="fas fa-comments"></i>
                            ${ticket.replies.length}
                        </span>
                        ${ticket.attachments.length > 0 ? `
                        <span class="stat-item">
                            <i class="fas fa-paperclip"></i>
                            ${ticket.attachments.length}
                        </span>
                        ` : ''}
                        <span class="stat-item">
                            <i class="fas fa-clock"></i>
                            ${ticket.timeSpent}ч/${ticket.estimatedTime}ч
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
    }    renderKnowledgeBase() {
        return `
            <div class="knowledge-page">
                <div class="page-header mb-4">
                    <div class="page-title">
                        <h1><i class="fas fa-book"></i> База знаний</h1>
                        <p>Документация и инструкции • Статей: ${this.data.knowledgeBase.length}</p>
                    </div>
                    <div class="page-actions">
                        <button class="btn btn--primary" onclick="app.showCreateArticleModal()">
                            <i class="fas fa-plus"></i> Создать статью
                        </button>
                    </div>
                </div>

                <div class="knowledge-search mb-4">
                    <div class="search-group">
                        <input type="text" placeholder="Поиск по базе знаний..." 
                               oninput="app.searchArticles(this.value)">
                        <select onchange="app.filterArticles('category', this.value)">
                            <option value="">Все категории</option>
                            <option value="hardware">Оборудование</option>
                            <option value="software">Программы</option>
                            <option value="network">Сеть</option>
                            <option value="security">Безопасность</option>
                            <option value="other">Другое</option>
                        </select>
                    </div>
                </div>

                <div class="knowledge-articles">
                    ${this.data.knowledgeBase.map(article => `
                        <div class="article-card" onclick="app.viewArticle('${article.id}')">
                            <div class="article-header">
                                <h3>${article.title}</h3>
                                <div class="article-meta">
                                    <span class="badge badge--${this.getCategoryColor(article.category)}">${this.getCategoryText(article.category)}</span>
                                    <span class="rating">
                                        <i class="fas fa-star"></i> ${article.rating}
                                    </span>
                                </div>
                            </div>

                            <div class="article-content">
                                <p>${article.content.substring(0, 200)}...</p>
                                <div class="article-tags">
                                    ${article.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                                </div>
                            </div>

                            <div class="article-footer">
                                <div class="article-stats">
                                    <span><i class="fas fa-eye"></i> ${article.views} просмотров</span>
                                    <span><i class="fas fa-user"></i> ${article.author}</span>
                                    <span><i class="fas fa-calendar"></i> ${this.formatDate(article.updated)}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                ${this.data.knowledgeBase.length === 0 ? `
                <div class="empty-state">
                    <i class="fas fa-book"></i>
                    <h3>База знаний пуста</h3>
                    <p>Создайте первую статью для начала работы</p>
                    <button class="btn btn--primary" onclick="app.showCreateArticleModal()">
                        <i class="fas fa-plus"></i> Создать статью
                    </button>
                </div>
                ` : ''}
            </div>
        `;
    }

    renderReports() {
        return `
            <div class="reports-page">
                <div class="page-header mb-4">
                    <h1><i class="fas fa-chart-pie"></i> Отчеты и аналитика</h1>
                    <p>Статистика работы службы поддержки</p>
                </div>

                <div class="grid grid--3 mb-4">
                    <div class="stat-card">
                        <div class="stat-card-icon" style="background: #8b5cf6; color: white;">
                            <i class="fas fa-percentage"></i>
                        </div>
                        <div class="stat-card-value">${this.data.stats.customerSatisfaction}%</div>
                        <div class="stat-card-label">Удовлетворенность</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-card-icon" style="background: #06b6d4; color: white;">
                            <i class="fas fa-handshake"></i>
                        </div>
                        <div class="stat-card-value">${this.data.stats.slaCompliance}%</div>
                        <div class="stat-card-label">Соблюдение SLA</div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-card-icon" style="background: #f59e0b; color: white;">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-card-value">${this.data.stats.avgResolutionTime}ч</div>
                        <div class="stat-card-label">Среднее время решения</div>
                    </div>
                </div>

                <div class="grid grid--2 mb-4">
                    <div class="chart-card">
                        <div class="card__header">
                            <h3>Производительность агентов</h3>
                            <p>Решенные тикеты по сотрудникам</p>
                        </div>
                        <div class="chart-container">
                            <canvas id="agentChart"></canvas>
                        </div>
                    </div>

                    <div class="chart-card">
                        <div class="card__header">
                            <h3>Время отклика агентов</h3>
                            <p>Среднее время в часах</p>
                        </div>
                        <div class="chart-container">
                            <canvas id="responseChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    
    // Обновленная функция рендеринга пользователей
    renderUsers() {
        return `
            <div class="users-page">
                <div class="page-header mb-4">
                    <div class="page-title">
                        <h1><i class="fas fa-users"></i> Управление пользователями</h1>
                        <p>Управление пользователями системы • ${this.data.users.length} пользователей</p>
                    </div>
                    <div class="page-actions">
                        <button class="btn btn--primary" onclick="app.showCreateUserModal()">
                            <i class="fas fa-plus"></i> Добавить пользователя
                        </button>
                    </div>
                </div>

                <!-- Статистика пользователей -->
                <div class="grid grid--4 mb-4">
                    <div class="stat-card">
                        <div class="stat-card-icon" style="background: #3b82f6; color: white;">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-card-value">${this.data.users.length}</div>
                        <div class="stat-card-label">Всего пользователей</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon" style="background: #10b981; color: white;">
                            <i class="fas fa-user-check"></i>
                        </div>
                        <div class="stat-card-value">${this.data.users.filter(u => u.status === 'online').length}</div>
                        <div class="stat-card-label">Онлайн</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon" style="background: #f59e0b; color: white;">
                            <i class="fas fa-user-cog"></i>
                        </div>
                        <div class="stat-card-value">${this.data.users.filter(u => u.role === 'agent' || u.role === 'admin').length}</div>
                        <div class="stat-card-label">Агентов</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon" style="background: #8b5cf6; color: white;">
                            <i class="fas fa-ticket-alt"></i>
                        </div>
                        <div class="stat-card-value">${this.data.users.reduce((sum, u) => sum + (u.ticketsResolved || 0), 0)}</div>
                        <div class="stat-card-label">Решено тикетов</div>
                    </div>
                </div>

                <!-- Фильтры пользователей -->
                <div class="users-filters mb-4">
                    <div class="filter-group">
                        <input type="text" placeholder="Поиск по имени или email..." 
                               oninput="app.searchUsers(this.value)" class="search-input">
                        <select onchange="app.filterUsers('role', this.value)">
                            <option value="">Все роли</option>
                            <option value="admin">Администраторы</option>
                            <option value="agent">Агенты</option>
                            <option value="user">Пользователи</option>
                        </select>
                        <select onchange="app.filterUsers('department', this.value)">
                            <option value="">Все отделы</option>
                            <option value="IT">IT отдел</option>
                            <option value="HR">HR отдел</option>
                            <option value="Бухгалтерия">Бухгалтерия</option>
                            <option value="Продажи">Продажи</option>
                            <option value="Маркетинг">Маркетинг</option>
                            <option value="Администрация">Администрация</option>
                        </select>
                        <select onchange="app.filterUsers('status', this.value)">
                            <option value="">Все статусы</option>
                            <option value="online">Онлайн</option>
                            <option value="away">Отошел</option>
                            <option value="offline">Офлайн</option>
                        </select>
                    </div>
                </div>

                <!-- Список пользователей -->
                <div class="users-grid">
                    ${this.data.users.map(user => `
                        <div class="user-card" onclick="app.viewUser(${user.id})">
                            <div class="user-avatar-section">
                                <div class="user-avatar">${user.avatar}</div>
                                <div class="user-status ${user.status}"></div>
                            </div>
                            <div class="user-info">
                                <h3>${user.name}</h3>
                                <p class="user-position">${user.position}</p>
                                <p class="user-department">${user.department}</p>
                                <p class="user-email">${user.email}</p>
                                ${user.phone ? `<p class="user-phone"><i class="fas fa-phone"></i> ${user.phone}</p>` : ''}
                            </div>
                            <div class="user-stats">
                                <div class="stat-item">
                                    <i class="fas fa-ticket-alt"></i>
                                    <span>${user.ticketsResolved || 0}</span>
                                </div>
                                <div class="stat-item">
                                    <i class="fas fa-clock"></i>
                                    <span>${this.formatDate(user.lastActivity)}</span>
                                </div>
                            </div>
                            <div class="user-role">
                                <span class="badge badge--${user.role === 'admin' ? 'error' : user.role === 'agent' ? 'warning' : 'info'}">
                                    ${user.role === 'admin' ? 'Администратор' : user.role === 'agent' ? 'Агент' : 'Пользователь'}
                                </span>
                            </div>
                            <div class="user-actions">
                                <button class="btn btn--small btn--secondary" 
                                        onclick="event.stopPropagation(); app.showEditUserModal(${user.id})" 
                                        title="Редактировать">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn--small btn--${(user.isActive === false || user.status === 'disabled') ? 'success' : 'warning'}" 
                                        onclick="event.stopPropagation(); app.toggleUserStatus(${user.id})" 
                                        title="${(user.isActive === false || user.status === 'disabled') ? 'Активировать' : 'Деактивировать'}">
                                    <i class="fas fa-${(user.isActive === false || user.status === 'disabled') ? 'play' : 'pause'}"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>

                ${this.data.users.length === 0 ? `
                    <div class="empty-state">
                        <i class="fas fa-users"></i>
                        <h3>Нет пользователей</h3>
                        <p>Создайте первого пользователя системы</p>
                        <button class="btn btn--primary" onclick="app.showCreateUserModal()">
                            <i class="fas fa-plus"></i> Добавить пользователя
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    }

    // Поиск пользователей
    searchUsers(query) {
        // Эта функция будет работать с существующим DOM для быстрого поиска
        const cards = document.querySelectorAll('.user-card');
        const searchTerm = query.toLowerCase();

        cards.forEach(card => {
            const userName = card.querySelector('h3').textContent.toLowerCase();
            const userEmail = card.querySelector('.user-email').textContent.toLowerCase();

            if (userName.includes(searchTerm) || userEmail.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        console.log('🔍 Поиск пользователей:', query);
    }

    // Фильтрация пользователей
    filterUsers(filterType, filterValue) {
        const cards = document.querySelectorAll('.user-card');

        cards.forEach((card, index) => {
            const user = this.data.users[index];
            let shouldShow = true;

            if (filterValue && user[filterType] !== filterValue) {
                shouldShow = false;
            }

            card.style.display = shouldShow ? 'block' : 'none';
        });

        console.log(`🔍 Фильтр ${filterType}:`, filterValue);
    }

    // Просмотр подробной информации о пользователе
    viewUser(userId) {
        const user = this.data.users.find(u => u.id === userId);
        if (!user) {
            this.showNotification('Пользователь не найден', 'error');
            return;
        }

        const modal = `
            <div class="modal-header">
                <h2 class="modal-title"><i class="fas fa-user"></i> ${user.name}</h2>
                <p class="modal-subtitle">Подробная информация о пользователе</p>
                <button class="modal-close" onclick="app.hideModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="user-detail-view">
                    <div class="user-detail-header">
                        <div class="user-avatar-large">${user.avatar}</div>
                        <div class="user-detail-info">
                            <h2>${user.name}</h2>
                            <p class="position">${user.position}</p>
                            <p class="department">
                                <span class="badge badge--${user.role === 'admin' ? 'error' : user.role === 'agent' ? 'warning' : 'info'}">
                                    ${user.role === 'admin' ? 'Администратор' : user.role === 'agent' ? 'Агент' : 'Пользователь'}
                                </span>
                                <span class="badge badge--secondary">${user.department}</span>
                            </p>
                        </div>
                        <div class="user-status-large ${user.status}">
                            ${user.status === 'online' ? 'Онлайн' : user.status === 'away' ? 'Отошел' : 'Офлайн'}
                        </div>
                    </div>

                    <div class="user-detail-content">
                        <div class="detail-section">
                            <h4><i class="fas fa-address-card"></i> Контактная информация</h4>
                            <div class="detail-grid">
                                <div class="detail-item">
                                    <span class="label">Email:</span>
                                    <span class="value">${user.email}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="label">Телефон:</span>
                                    <span class="value">${user.phone || 'Не указан'}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="label">Отдел:</span>
                                    <span class="value">${user.department}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="label">Должность:</span>
                                    <span class="value">${user.position}</span>
                                </div>
                            </div>
                        </div>

                        <div class="detail-section">
                            <h4><i class="fas fa-chart-line"></i> Статистика работы</h4>
                            <div class="stats-grid">
                                <div class="stat-item">
                                    <div class="stat-value">${user.ticketsResolved || 0}</div>
                                    <div class="stat-label">Решено тикетов</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-value">${this.data.tickets.filter(t => t.assignee === user.name && t.status === 'inprogress').length}</div>
                                    <div class="stat-label">В работе</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-value">${this.formatDate(user.lastActivity)}</div>
                                    <div class="stat-label">Последняя активность</div>
                                </div>
                            </div>
                        </div>

                        ${(user.role === 'agent' || user.role === 'admin') ? `
                            <div class="detail-section">
                                <h4><i class="fas fa-tasks"></i> Назначенные тикеты</h4>
                                <div class="assigned-tickets">
                                    ${this.data.tickets.filter(t => t.assignee === user.name).map(ticket => `
                                        <div class="ticket-summary" onclick="app.hideModal(); app.viewTicket('${ticket.id}')">
                                            <span class="ticket-id">${ticket.id}</span>
                                            <span class="ticket-title">${ticket.title}</span>
                                            <span class="badge badge--${this.getStatusColor(ticket.status)}">${this.getStatusText(ticket.status)}</span>
                                            <span class="badge badge--${this.getPriorityColor(ticket.priority)}">${this.getPriorityText(ticket.priority)}</span>
                                        </div>
                                    `).join('') || '<p class="text-muted">Нет назначенных тикетов</p>'}
                                </div>
                            </div>
                        ` : ''}
                    </div>

                    <div class="user-detail-actions">
                        <button class="btn btn--primary" onclick="app.showEditUserModal(${user.id})">
                            <i class="fas fa-edit"></i> Редактировать
                        </button>
                        <button class="btn btn--${(user.isActive === false || user.status === 'disabled') ? 'success' : 'warning'}" 
                                onclick="app.toggleUserStatus(${user.id}); app.hideModal();">
                            <i class="fas fa-${(user.isActive === false || user.status === 'disabled') ? 'play' : 'pause'}"></i>
                            ${(user.isActive === false || user.status === 'disabled') ? 'Активировать' : 'Деактивировать'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.showModal(modal, 'user-detail-modal');
    }

    renderSettings() {
        return `
            <div class="settings-page">
                <div class="page-header mb-4">
                    <h1><i class="fas fa-cog"></i> Настройки системы</h1>
                    <p>Конфигурация RIKOR HELPDESK v2.7.0</p>
                </div>

                <div class="settings-container">
                    <!-- Общие настройки -->
                    <div class="settings-section">
                        <h3><i class="fas fa-palette"></i> Интерфейс</h3>
                        <div class="settings-group">
                            <div class="setting-item">
                                <label>
                                    <span>Тема оформления</span>
                                    <button class="btn btn--secondary" onclick="app.toggleTheme()">
                                        <i class="fas ${this.settings.theme === 'light' ? 'fa-moon' : 'fa-sun'}"></i>
                                        ${this.settings.theme === 'light' ? 'Темная тема' : 'Светлая тема'}
                                    </button>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Настройки уведомлений -->
                    <div class="settings-section">
                        <h3><i class="fas fa-bell"></i> Уведомления</h3>
                        <div class="settings-group">
                            <div class="setting-item">
                                <label class="toggle-switch">
                                    <input type="checkbox" id="emailNotifications" ${this.settings.notifications.email ? 'checked' : ''} 
                                           onchange="app.toggleNotificationSetting('email', this.checked)">
                                    <span class="toggle-slider"></span>
                                    <span class="toggle-label">
                                        <i class="fas fa-envelope"></i>
                                        Email уведомления
                                    </span>
                                </label>
                                <small>Отправка уведомлений об изменении статуса тикетов на email</small>
                            </div>

                            <div class="setting-item">
                                <label class="toggle-switch">
                                    <input type="checkbox" id="pushNotifications" ${this.settings.notifications.push ? 'checked' : ''} 
                                           onchange="app.toggleNotificationSetting('push', this.checked)">
                                    <span class="toggle-slider"></span>
                                    <span class="toggle-label">
                                        <i class="fas fa-desktop"></i>
                                        Push уведомления в браузере
                                    </span>
                                </label>
                                <small>Всплывающие уведомления в браузере при изменении статуса</small>
                            </div>

                            <div class="setting-item">
                                <label class="toggle-switch">
                                    <input type="checkbox" id="soundNotifications" ${this.settings.notifications.sound ? 'checked' : ''} 
                                           onchange="app.toggleNotificationSetting('sound', this.checked)">
                                    <span class="toggle-slider"></span>
                                    <span class="toggle-label">
                                        <i class="fas fa-volume-up"></i>
                                        Звуковые уведомления при критических тикетах
                                    </span>
                                </label>
                                <small>Звуковой сигнал при создании или изменении критических тикетов</small>
                                ${this.settings.notifications.sound ? `
                                <button class="btn btn--small btn--secondary mt-2" onclick="app.playCriticalNotificationSound()">
                                    <i class="fas fa-play"></i> Проверить звук
                                </button>
                                ` : ''}
                            </div>

                            <div class="setting-item">
                                <label class="toggle-switch">
                                    <input type="checkbox" id="telegramNotifications" ${this.settings.notifications.telegram ? 'checked' : ''} 
                                           onchange="app.toggleNotificationSetting('telegram', this.checked)">
                                    <span class="toggle-slider"></span>
                                    <span class="toggle-label">
                                        <i class="fab fa-telegram"></i>
                                        Уведомления через Telegram бота
                                    </span>
                                </label>
                                <small>Отправка уведомлений в Telegram чат через бота</small>
                            </div>
                        </div>
                    </div>

                    <!-- Информация о системе -->
                    <div class="settings-section">
                        <h3><i class="fas fa-info-circle"></i> О системе</h3>
                        <div class="system-info">
                            <div class="info-item">
                                <span>Версия:</span>
                                <strong>RIKOR HELPDESK v2.10.0 Advanced Assignment & File Management</strong>
                            </div>
                            <div class="info-item">
                                <span>Пользователь:</span>
                                <strong>${this.currentUser.name} (${this.currentUser.role})</strong>
                            </div>
                            <div class="info-item">
                                <span>Последний запуск:</span>
                                <strong>${new Date().toLocaleString('ru-RU')}</strong>
                            </div>
                            <div class="info-item">
                                <span>Тикетов в системе:</span>
                                <strong>${this.data.tickets.length}</strong>
                            </div>
                            <div class="info-item">
                                <span>Статей в базе знаний:</span>
                                <strong>${this.data.knowledgeBase.length}</strong>
                            </div>
                        </div>
                    </div>

                    <!-- Действия -->
                    <div class="settings-actions">
                        <button class="btn btn--warning" onclick="app.resetSettings()">
                            <i class="fas fa-undo"></i> Сбросить настройки
                        </button>
                        <button class="btn btn--danger" onclick="app.clearAllData()">
                            <i class="fas fa-trash"></i> Очистить все данные
                        </button>
                        <button class="btn btn--success" onclick="app.exportData()">
                            <i class="fas fa-download"></i> Экспорт данных
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    // ИНИЦИАЛИЗАЦИЯ ГРАФИКОВ
    initDashboardCharts() {
        if (typeof Chart === 'undefined') {
            console.warn('⚠️ Chart.js не доступен');
            return;
        }

        try {
            this.initMonthlyChart();
            this.initPriorityChart();
            this.initStatusChart();
            this.initDeviceChart();
            console.log('✅ Dashboard графики инициализированы');
        } catch (error) {
            console.error('❌ Ошибка инициализации dashboard графиков:', error);
        }
    }

    initMonthlyChart() {
        const ctx = document.getElementById('monthlyChart');
        if (!ctx) return;

        if (this.chartInstances.monthly) {
            this.chartInstances.monthly.destroy();
        }

        this.chartInstances.monthly = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.data.stats.monthlyLabels,
                datasets: [{
                    label: 'Тикеты',
                    data: this.data.stats.monthlyTrend,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { 
                        beginAtZero: true,
                        grid: { color: 'rgba(0, 0, 0, 0.1)' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    initPriorityChart() {
        const ctx = document.getElementById('priorityChart');
        if (!ctx) return;

        if (this.chartInstances.priority) {
            this.chartInstances.priority.destroy();
        }

        this.chartInstances.priority = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: this.data.stats.priorityLabels,
                datasets: [{
                    data: Object.values(this.data.stats.priorityStats),
                    backgroundColor: this.data.stats.priorityColors,
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
                        labels: { usePointStyle: true }
                    }
                }
            }
        });
    }

    initStatusChart() {
        const ctx = document.getElementById('statusChart');
        if (!ctx) return;

        if (this.chartInstances.status) {
            this.chartInstances.status.destroy();
        }

        this.chartInstances.status = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.data.stats.statusLabels,
                datasets: [{
                    data: Object.values(this.data.stats.statusStats),
                    backgroundColor: this.data.stats.statusColors,
                    borderRadius: 4,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    initDeviceChart() {
        const ctx = document.getElementById('deviceChart');
        if (!ctx) return;

        if (this.chartInstances.device) {
            this.chartInstances.device.destroy();
        }

        this.chartInstances.device = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: this.data.stats.deviceStats.types,
                datasets: [{
                    data: this.data.stats.deviceStats.counts,
                    backgroundColor: this.data.stats.deviceStats.colors,
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
                        labels: { usePointStyle: true }
                    }
                }
            }
        });
    }

    initReportCharts() {
        if (typeof Chart === 'undefined') return;

        try {
            this.initAgentChart();
            this.initResponseChart();
            console.log('✅ Report графики инициализированы');
        } catch (error) {
            console.error('❌ Ошибка инициализации report графиков:', error);
        }
    }

    initAgentChart() {
        const ctx = document.getElementById('agentChart');
        if (!ctx) return;

        if (this.chartInstances.agent) {
            this.chartInstances.agent.destroy();
        }

        this.chartInstances.agent = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.data.stats.agentStats.names,
                datasets: [{
                    label: 'Решено тикетов',
                    data: this.data.stats.agentStats.resolved,
                    backgroundColor: '#3b82f6',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    initResponseChart() {
        const ctx = document.getElementById('responseChart');
        if (!ctx) return;

        if (this.chartInstances.response) {
            this.chartInstances.response.destroy();
        }

        this.chartInstances.response = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.data.stats.agentStats.names,
                datasets: [{
                    label: 'Время отклика (ч)',
                    data: this.data.stats.agentStats.avgTime,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // СОЗДАНИЕ СТАТЕЙ ИЗ БАЗЫ ЗНАНИЙ (как раньше)
    showCreateArticleModal() {
        const modal = `
            <div class="modal-header">
                <div class="modal-title-section">
                    <h2 class="modal-title">
                        <i class="fas fa-plus"></i>
                        Создать новую статью
                    </h2>
                    <p class="modal-subtitle">Добавление статьи в базу знаний Rikor</p>
                </div>
                <button class="modal-close" onclick="app.hideModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="modal-body">
                <form class="create-article-form" onsubmit="app.submitCreateArticle(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="articleTitle">Заголовок статьи <span class="required">*</span></label>
                            <input type="text" id="articleTitle" name="title" 
                                   placeholder="Например: Установка драйверов для Rikor RN NINO" required>
                        </div>

                        <div class="form-group">
                            <label for="articleCategory">Категория</label>
                            <select id="articleCategory" name="category">
                                <option value="hardware">🔧 Оборудование</option>
                                <option value="software">💾 Программы</option>
                                <option value="network">🌐 Сеть</option>
                                <option value="security">🔒 Безопасность</option>
                                <option value="other">❓ Другое</option>
                            </select>
                        </div>
                    </div>

                    <!-- Теги -->
                    <div class="form-group">
                        <label for="articleTags">Теги</label>
                        <input type="text" id="articleTags" name="tags" 
                               placeholder="Например: драйверы, ноутбук, windows">
                        <small>Разделяйте теги запятыми для лучшего поиска</small>
                    </div>

                    <!-- Готовые шаблоны статей -->
                    <div class="form-group">
                        <label><i class="fas fa-magic"></i> Готовые шаблоны статей</label>
                        <div class="template-buttons">
                            <button type="button" class="template-btn" onclick="app.useArticleTemplate('hardware')">
                                <i class="fas fa-tools"></i> Оборудование
                            </button>
                            <button type="button" class="template-btn" onclick="app.useArticleTemplate('software')">
                                <i class="fas fa-code"></i> Программы
                            </button>
                            <button type="button" class="template-btn" onclick="app.useArticleTemplate('troubleshooting')">
                                <i class="fas fa-wrench"></i> Решение проблем
                            </button>
                        </div>
                    </div>

                    <!-- Содержание статьи -->
                    <div class="form-group">
                        <label for="articleContent">Содержание статьи <span class="required">*</span></label>
                        <textarea id="articleContent" name="content" rows="12" required
                                  placeholder="# Название статьи

## Описание проблемы
Опишите проблему или задачу, которую решает эта статья.

## Пошаговое решение
1. Первый шаг решения
2. Второй шаг
3. Третий шаг

## Дополнительная информация
Полезные советы и рекомендации."></textarea>
                        <small>Поддерживается Markdown разметка: **жирный**, *курсив*, ## Заголовок, - Список</small>
                    </div>

                    <!-- Прикрепить файлы -->
                    <div class="form-group">
                        <label><i class="fas fa-paperclip"></i> Прикрепить файлы</label>
                        <div class="file-upload-area" onclick="document.getElementById('articleFiles').click()">
                            <div class="file-upload-content">
                                <i class="fas fa-cloud-upload-alt"></i>
                                <span>Загрузить файлы</span>
                                <small>Нажмите или перетащите файлы сюда</small>
                                <small>Поддерживаются: PDF, DOC, TXT, JPG, PNG, ZIP (до 10 МБ)</small>
                            </div>
                            <input type="file" id="articleFiles" multiple 
                                   accept=".pdf,.doc,.docx,.txt,.md,.jpg,.jpeg,.png,.zip,.rar" 
                                   style="display: none;" onchange="app.handleArticleFiles(this.files)">
                        </div>
                        <div id="articleFilesList" class="selected-files-list"></div>
                    </div>

                    <!-- Действия -->
                    <div class="form-actions">
                        <button type="button" class="btn btn--secondary" onclick="app.hideModal()">
                            <i class="fas fa-times"></i> Отмена
                        </button>
                        <button type="button" class="btn btn--info" onclick="app.previewArticle()">
                            <i class="fas fa-eye"></i> Предпросмотр
                        </button>
                        <button type="submit" class="btn btn--primary">
                            <i class="fas fa-plus"></i> Создать статью
                        </button>
                    </div>
                </form>
            </div>
        `;

        this.showModal(modal, 'create-article-modal');
        this.setupArticleFileUpload();
    }

    // Использование шаблонов статей
    useArticleTemplate(template) {
        const content = document.getElementById('articleContent');
        if (!content) return;

        const templates = {
            hardware: `# Инструкция по работе с оборудованием

## Описание устройства
Краткое описание устройства и его назначения.

## Технические характеристики
- Модель:
- Серийный номер:
- Основные параметры:

## Настройка и подключение
### Первоначальная настройка
1. Распакуйте устройство
2. Подключите к сети питания
3. Выполните базовые настройки

### Подключение к сети
1. Настройка сетевых параметров
2. Проверка соединения
3. Тестирование работы

## Устранение неисправностей
**Проблема**: Описание проблемы
**Решение**: Пошаговое решение

## Техническое обслуживание
Рекомендации по обслуживанию и профилактике.`,

            software: `# Руководство по программному обеспечению

## Описание программы
Назначение и основные возможности программы.

## Системные требования
- Операционная система:
- Процессор:
- Оперативная память:
- Свободное место на диске:

## Установка
### Подготовка к установке
1. Скачайте дистрибутив с официального сайта
2. Убедитесь в соответствии системным требованиям
3. Сделайте резервную копию важных данных

### Процесс установки
1. Запустите установочный файл
2. Следуйте инструкциям мастера установки
3. Перезагрузите систему если требуется

## Настройка
### Первый запуск
1. Основные параметры
2. Настройка интерфейса
3. Конфигурация под нужды пользователя

## Использование
Основные функции и их применение.

## Часто встречающиеся проблемы
**Проблема**: Программа не запускается
**Решение**: Проверьте системные требования и переустановите программу`,

            troubleshooting: `# Руководство по устранению неисправностей

## Описание проблемы
Подробное описание проблемы и условий её возникновения.

## Симптомы
- Симптом 1
- Симптом 2
- Симптом 3

## Возможные причины
1. **Причина 1**: Описание
2. **Причина 2**: Описание
3. **Причина 3**: Описание

## Диагностика
### Предварительная проверка
1. Проверьте подключение питания
2. Убедитесь в правильности подключений
3. Проверьте индикаторы состояния

### Детальная диагностика
1. Проверка системных логов
2. Тестирование компонентов
3. Анализ параметров работы

## Решение проблемы
### Вариант 1
1. Шаг 1
2. Шаг 2
3. Шаг 3

### Вариант 2 (альтернативный)
1. Альтернативный шаг 1
2. Альтернативный шаг 2

## Проверка решения
Как убедиться, что проблема решена.

## Профилактические меры
Рекомендации по предотвращению повторного возникновения проблемы.`
        };

        content.value = templates[template] || '';
        this.showNotification(`Шаблон "${template}" загружен`, 'success');
    }

    // Настройка загрузки файлов для статей
    setupArticleFileUpload() {
        const fileInput = document.getElementById('articleFiles');
        const fileArea = document.querySelector('.file-upload-area');

        if (!fileInput || !fileArea) return;

        // Drag & Drop
        fileArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileArea.classList.add('dragover');
        });

        fileArea.addEventListener('dragleave', () => {
            fileArea.classList.remove('dragover');
        });

        fileArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileArea.classList.remove('dragover');
            this.handleArticleFiles(e.dataTransfer.files);
        });
    }

    handleArticleFiles(files) {
        const filesList = document.getElementById('articleFilesList');
        if (!filesList) return;

        filesList.innerHTML = '';
        this.tempFiles = [];

        Array.from(files).forEach((file, index) => {
            // Проверка размера и типа
            const isValidSize = file.size <= this.settings.maxFileSize;
            const isValidType = this.settings.allowedFileTypes.some(type => 
                file.name.toLowerCase().endsWith(type.toLowerCase()));

            if (isValidSize && isValidType) {
                this.tempFiles.push({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    file: file
                });
            }

            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-info ${!isValidSize || !isValidType ? 'invalid' : ''}">
                    <i class="fas ${this.getFileIcon(file.type)}"></i>
                    <div class="file-details">
                        <span class="file-name">${file.name}</span>
                        <span class="file-size">${this.formatFileSize(file.size)}</span>
                        ${!isValidSize ? '<span class="error">Превышен размер файла</span>' : ''}
                        ${!isValidType ? '<span class="error">Недопустимый тип файла</span>' : ''}
                    </div>
                    <button type="button" class="remove-file-btn" onclick="this.parentElement.parentElement.remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;

            filesList.appendChild(fileItem);
        });
    }

    // Предпросмотр статьи
    previewArticle() {
        const form = document.querySelector('.create-article-form');
        if (!form) return;

        const formData = new FormData(form);
        const title = formData.get('title').trim();
        const content = formData.get('content').trim();

        if (!title || !content) {
            this.showNotification('Заполните заголовок и содержание статьи', 'error');
            return;
        }

        const processedContent = this.renderMarkdown(content);

        const previewModal = `
            <div class="modal-header">
                <h2 class="modal-title">
                    <i class="fas fa-eye"></i>
                    Предпросмотр статьи
                </h2>
                <button class="modal-close" onclick="app.hideModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="modal-body">
                <div class="article-preview">
                    <h1 class="preview-title">${title}</h1>
                    <div class="preview-meta">
                        <span class="badge badge--${this.getCategoryColor(formData.get('category'))}">${this.getCategoryText(formData.get('category'))}</span>
                        <span>Автор: ${this.currentUser.name}</span>
                        <span>Дата: ${new Date().toLocaleDateString('ru-RU')}</span>
                    </div>
                    <div class="preview-content">
                        ${processedContent}
                    </div>

                    ${this.tempFiles.length > 0 ? `
                    <div class="preview-attachments">
                        <h3>Прикрепленные файлы:</h3>
                        <ul>
                            ${this.tempFiles.map(file => `
                                <li><i class="fas ${this.getFileIcon(file.type)}"></i> ${file.name} (${this.formatFileSize(file.size)})</li>
                            `).join('')}
                        </ul>
                    </div>
                    ` : ''}
                </div>

                <div class="preview-actions">
                    <button class="btn btn--secondary" onclick="app.showCreateArticleModal()">
                        <i class="fas fa-edit"></i> Редактировать
                    </button>
                    <button class="btn btn--primary" onclick="app.submitCreateArticleFromPreview()">
                        <i class="fas fa-check"></i> Опубликовать статью
                    </button>
                </div>
            </div>
        `;

        this.showModal(previewModal, 'article-preview-modal');
    }

    // Создание статьи из предпросмотра
    submitCreateArticleFromPreview() {
        // Возвращаемся к форме и отправляем её
        this.showCreateArticleModal();
        setTimeout(() => {
            const form = document.querySelector('.create-article-form');
            if (form) {
                this.submitCreateArticle({ target: form, preventDefault: () => {} });
            }
        }, 100);
    }

    // Создание статьи
    submitCreateArticle(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const title = formData.get('title').trim();
        const content = formData.get('content').trim();
        const category = formData.get('category');

        if (!title || !content) {
            this.showNotification('Заполните все обязательные поля', 'error');
            return;
        }

        // Генерируем ID статьи
        const articleNumber = this.data.knowledgeBase.length + 1;
        const articleId = `KB-${String(articleNumber).padStart(3, '0')}`;

        // Создаем новую статью
        const newArticle = {
            id: articleId,
            title: title,
            content: content,
            category: category,
            tags: formData.get('tags') ? formData.get('tags').split(',').map(tag => tag.trim()) : [],
            author: this.currentUser.name,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            views: 0,
            rating: 5.0,
            attachments: this.tempFiles.map(file => ({
                name: file.name,
                size: file.size,
                type: file.type
            })),
            editHistory: []
        };

        // Добавляем статью в базу знаний
        this.data.knowledgeBase.push(newArticle);
        this.saveData();

        // Сбрасываем временные файлы
        this.tempFiles = [];

        this.hideModal();
        this.showNotification(`✅ Статья "${title}" успешно создана!`, 'success');

        // Переходим к базе знаний если мы не на ней
        if (this.currentRoute !== 'knowledge') {
            this.navigate('knowledge');
        } else {
            this.renderContent();
        }

        console.log('✅ Статья создана:', newArticle);
    }

    // НАСТРОЙКИ УВЕДОМЛЕНИЙ
    toggleNotificationSetting(type, enabled) {
        this.settings.notifications[type] = enabled;
        localStorage.setItem(`rikor-${type}-notif`, enabled.toString());

        this.showNotification(
            `${type} уведомления ${enabled ? 'включены' : 'выключены'}`, 
            enabled ? 'success' : 'info'
        );

        // Перерендериваем настройки для показа дополнительных опций
        setTimeout(() => this.renderContent(), 300);

        console.log(`🔔 ${type} уведомления ${enabled ? 'включены' : 'выключены'}`);
    }

    // ЗАГЛУШКИ ФУНКЦИЙ ДЛЯ СОВМЕСТИМОСТИ
    
    // =============================================
    // УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ - v2.8.0 
    // =============================================

    showCreateUserModal() {
        const modal = `
            <div class="modal-header">
                <h2 class="modal-title"><i class="fas fa-user-plus"></i> Добавление нового пользователя</h2>
                <p class="modal-subtitle">Заполните информацию о новом пользователе системы</p>
                <button class="modal-close" onclick="app.hideModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form class="create-user-form" onsubmit="app.submitCreateUser(event)">
                    <div class="form-row">
                        <!-- Основная информация -->
                        <div class="form-group">
                            <label for="userName">ФИО пользователя <span class="required">*</span></label>
                            <input type="text" id="userName" name="name" required 
                                   placeholder="Введите полное имя пользователя">
                        </div>
                        <!-- Email -->
                        <div class="form-group">
                            <label for="userEmail">Email адрес <span class="required">*</span></label>
                            <input type="email" id="userEmail" name="email" required 
                                   placeholder="user@rikor.ru">
                        </div>
                    </div>

                    <div class="form-row">
                        <!-- Телефон -->
                        <div class="form-group">
                            <label for="userPhone">Телефон</label>
                            <input type="tel" id="userPhone" name="phone" 
                                   placeholder="+7 (XXX) XXX-XX-XX">
                        </div>
                        <!-- Должность -->
                        <div class="form-group">
                            <label for="userPosition">Должность <span class="required">*</span></label>
                            <input type="text" id="userPosition" name="position" required 
                                   placeholder="Должность пользователя">
                        </div>
                    </div>

                    <div class="form-row">
                        <!-- Отдел -->
                        <div class="form-group">
                            <label for="userDepartment">Отдел <span class="required">*</span></label>
                            <select id="userDepartment" name="department" required>
                                <option value="">Выберите отдел</option>
                                <option value="IT">IT отдел</option>
                                <option value="Бухгалтерия">Бухгалтерия</option>
                                <option value="HR">HR отдел</option>
                                <option value="Продажи">Продажи</option>
                                <option value="Маркетинг">Маркетинг</option>
                                <option value="Администрация">Администрация</option>
                            </select>
                        </div>
                        <!-- Роль -->
                        <div class="form-group">
                            <label for="userRole">Роль в системе <span class="required">*</span></label>
                            <select id="userRole" name="role" required>
                                <option value="">Выберите роль</option>
                                <option value="admin">Администратор</option>
                                <option value="agent">Агент поддержки</option>
                                <option value="user">Пользователь</option>
                            </select>
                        </div>
                    </div>

                    <!-- Действия -->
                    <div class="form-actions">
                        <button type="button" class="btn btn--secondary" onclick="app.hideModal()">
                            <i class="fas fa-times"></i> Отмена
                        </button>
                        <button type="submit" class="btn btn--primary">
                            <i class="fas fa-plus"></i> Создать пользователя
                        </button>
                    </div>
                </form>
            </div>
        `;

        this.showModal(modal, 'create-user-modal');
    }

    // Создание нового пользователя
    submitCreateUser(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const phone = formData.get('phone') ? formData.get('phone').trim() : '';
        const position = formData.get('position').trim();
        const department = formData.get('department');
        const role = formData.get('role');

        // Валидация
        if (!name || !email || !position || !department || !role) {
            this.showNotification('Заполните все обязательные поля', 'error');
            return;
        }

        // Проверка уникальности email
        if (this.data.users.some(u => u.email === email)) {
            this.showNotification('Пользователь с таким email уже существует', 'error');
            return;
        }

        // Генерация ID пользователя
        const userId = Math.max(...this.data.users.map(u => u.id), 0) + 1;

        // Создаем нового пользователя
        const newUser = {
            id: userId,
            name: name,
            email: email,
            phone: phone,
            role: role,
            department: department,
            position: position,
            avatar: this.getInitials(name),
            status: 'offline',
            ticketsResolved: 0,
            lastActivity: new Date().toISOString()
        };

        // Добавляем в данные
        this.data.users.push(newUser);
        this.saveData();

        this.hideModal();
        this.showNotification(`Пользователь ${name} успешно создан`, 'success');

        // Обновляем интерфейс если находимся на странице пользователей
        if (this.currentRoute === 'users') {
            this.renderContent();
        }

        console.log('✅ Создан новый пользователь:', newUser);
    }

    // Показать модальное окно редактирования пользователя
    showEditUserModal(userId) {
        const user = this.data.users.find(u => u.id === userId);
        if (!user) {
            this.showNotification('Пользователь не найден', 'error');
            return;
        }

        const modal = `
            <div class="modal-header">
                <h2 class="modal-title"><i class="fas fa-user-edit"></i> Редактирование пользователя</h2>
                <p class="modal-subtitle">Изменение информации пользователя ${user.name}</p>
                <button class="modal-close" onclick="app.hideModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form class="edit-user-form" onsubmit="app.submitEditUser(event, ${userId})">
                    <div class="form-row">
                        <!-- Основная информация -->
                        <div class="form-group">
                            <label for="editUserName">ФИО пользователя <span class="required">*</span></label>
                            <input type="text" id="editUserName" name="name" required 
                                   value="${user.name}" placeholder="Введите полное имя пользователя">
                        </div>
                        <!-- Email -->
                        <div class="form-group">
                            <label for="editUserEmail">Email адрес <span class="required">*</span></label>
                            <input type="email" id="editUserEmail" name="email" required 
                                   value="${user.email}" placeholder="user@rikor.ru">
                        </div>
                    </div>

                    <div class="form-row">
                        <!-- Телефон -->
                        <div class="form-group">
                            <label for="editUserPhone">Телефон</label>
                            <input type="tel" id="editUserPhone" name="phone" 
                                   value="${user.phone || ''}" placeholder="+7 (XXX) XXX-XX-XX">
                        </div>
                        <!-- Должность -->
                        <div class="form-group">
                            <label for="editUserPosition">Должность <span class="required">*</span></label>
                            <input type="text" id="editUserPosition" name="position" required 
                                   value="${user.position}" placeholder="Должность пользователя">
                        </div>
                    </div>

                    <div class="form-row">
                        <!-- Отдел -->
                        <div class="form-group">
                            <label for="editUserDepartment">Отдел <span class="required">*</span></label>
                            <select id="editUserDepartment" name="department" required>
                                <option value="">Выберите отдел</option>
                                <option value="IT" ${user.department === 'IT' ? 'selected' : ''}>IT отдел</option>
                                <option value="Бухгалтерия" ${user.department === 'Бухгалтерия' ? 'selected' : ''}>Бухгалтерия</option>
                                <option value="HR" ${user.department === 'HR' ? 'selected' : ''}>HR отдел</option>
                                <option value="Продажи" ${user.department === 'Продажи' ? 'selected' : ''}>Продажи</option>
                                <option value="Маркетинг" ${user.department === 'Маркетинг' ? 'selected' : ''}>Маркетинг</option>
                                <option value="Администрация" ${user.department === 'Администрация' ? 'selected' : ''}>Администрация</option>
                            </select>
                        </div>
                        <!-- Роль -->
                        <div class="form-group">
                            <label for="editUserRole">Роль в системе <span class="required">*</span></label>
                            <select id="editUserRole" name="role" required>
                                <option value="">Выберите роль</option>
                                <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Администратор</option>
                                <option value="agent" ${user.role === 'agent' ? 'selected' : ''}>Агент поддержки</option>
                                <option value="user" ${user.role === 'user' ? 'selected' : ''}>Пользователь</option>
                            </select>
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
    }

    // Обновление пользователя
    submitEditUser(event, userId) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const phone = formData.get('phone') ? formData.get('phone').trim() : '';
        const position = formData.get('position').trim();
        const department = formData.get('department');
        const role = formData.get('role');

        // Валидация
        if (!name || !email || !position || !department || !role) {
            this.showNotification('Заполните все обязательные поля', 'error');
            return;
        }

        // Найдем пользователя
        const userIndex = this.data.users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            this.showNotification('Пользователь не найден', 'error');
            return;
        }

        // Проверка уникальности email (исключая текущего пользователя)
        if (this.data.users.some(u => u.email === email && u.id !== userId)) {
            this.showNotification('Пользователь с таким email уже существует', 'error');
            return;
        }

        // Обновляем данные пользователя
        const user = this.data.users[userIndex];
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.position = position;
        user.department = department;
        user.role = role;
        user.avatar = this.getInitials(name);

        this.saveData();

        this.hideModal();
        this.showNotification(`Данные пользователя ${name} успешно обновлены`, 'success');

        // Обновляем интерфейс если находимся на странице пользователей
        if (this.currentRoute === 'users') {
            this.renderContent();
        }

        console.log('✅ Обновлен пользователь:', user);
    }

    // Деактивация/активация пользователя
    toggleUserStatus(userId) {
        const user = this.data.users.find(u => u.id === userId);
        if (!user) {
            this.showNotification('Пользователь не найден', 'error');
            return;
        }

        // Переключаем статус (если есть поле isActive, иначе используем status)
        if (user.hasOwnProperty('isActive')) {
            user.isActive = !user.isActive;
            user.status = user.isActive ? 'offline' : 'disabled';
        } else {
            user.status = user.status === 'disabled' ? 'offline' : 'disabled';
        }

        this.saveData();

        const statusText = (user.isActive === false || user.status === 'disabled') ? 'деактивирован' : 'активирован';
        this.showNotification(`Пользователь ${user.name} ${statusText}`, 'success');

        // Обновляем интерфейс если находимся на странице пользователей
        if (this.currentRoute === 'users') {
            this.renderContent();
        }

        console.log(`✅ Пользователь ${user.name} ${statusText}`);
    }

    // Получить активных агентов для назначения тикетов
    getActiveAgents() {
        return this.data.users.filter(u => 
            (u.role === 'agent' || u.role === 'admin') && 
            (u.status !== 'disabled' && u.isActive !== false)
        );
    }

    filterTickets(type, value) {
        this.currentTicketFilters = this.currentTicketFilters || {};

        // Обновляем фильтр
        if (value) {
            this.currentTicketFilters[type] = value;
        } else {
            delete this.currentTicketFilters[type];
        }

        // Перерисовываем список тикетов с учетом фильтров
        this.updateTicketsList();

        this.showNotification(`Фильтр тикетов ${type}: ${value || 'сброшен'}`, 'info');
    }

    searchTickets(query) {
        this.currentTicketSearch = query;
        this.updateTicketsList();
        this.showNotification(`Поиск тикетов: ${query || 'сброшен'}`, 'info');
    }

    // Новый метод для обновления списка тикетов с учетом фильтров
    updateTicketsList() {
        let filteredTickets = [...this.data.tickets];

        // Применяем фильтры
        if (this.currentTicketFilters) {
            Object.keys(this.currentTicketFilters).forEach(filterType => {
                const filterValue = this.currentTicketFilters[filterType];
                filteredTickets = filteredTickets.filter(ticket => {
                    return ticket[filterType] === filterValue;
                });
            });
        }

        // Применяем поиск
        if (this.currentTicketSearch && this.currentTicketSearch.trim() !== '') {
            const searchQuery = this.currentTicketSearch.toLowerCase();
            filteredTickets = filteredTickets.filter(ticket => {
                return ticket.id.toLowerCase().includes(searchQuery) ||
                       ticket.title.toLowerCase().includes(searchQuery) ||
                       ticket.description.toLowerCase().includes(searchQuery) ||
                       ticket.assignee.toLowerCase().includes(searchQuery) ||
                       ticket.location.toLowerCase().includes(searchQuery);
            });
        }

        // Обновляем отображение тикетов
        const ticketsList = document.querySelector('.tickets-list');
        if (ticketsList) {
            ticketsList.innerHTML = this.renderFilteredTickets(filteredTickets);
        }
    }

    // Новый метод для отрисовки отфильтрованных тикетов
    renderFilteredTickets(tickets) {
        if (tickets.length === 0) {
            return `
                <div class="empty-state">
                    <i class="fas fa-ticket-alt"></i>
                    <h3>Тикетов не найдено</h3>
                    <p>Попробуйте изменить параметры фильтрации или поиска</p>
                </div>
            `;
        }

        return tickets.map(ticket => `
            <div class="ticket-card" onclick="app.viewTicket('${ticket.id}')">
                <div class="ticket-header">
                    <div class="ticket-id-priority">
                        <span class="badge badge--primary">${ticket.id}</span>
                        <span class="badge badge--${this.getPriorityColor(ticket.priority)}">${this.getPriorityText(ticket.priority)}</span>
                    </div>
                    <span class="badge badge--${this.getStatusColor(ticket.status)}">${this.getStatusText(ticket.status)}</span>
                </div>

                <div class="ticket-content">
                    <h3 class="ticket-title">${ticket.title}</h3>
                    <p class="ticket-description">${ticket.description.substring(0, 150)}${ticket.description.length > 150 ? '...' : ''}</p>

                    <div class="ticket-device">
                        <i class="${this.getDeviceIcon(ticket.deviceType)}"></i>
                        <span>${ticket.deviceType} ${ticket.deviceModel}</span>
                    </div>
                </div>

                <div class="ticket-footer">
                    <div class="ticket-meta">
                        <div class="meta-item">
                            <i class="fas fa-user"></i>
                            <span>${ticket.assignee}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${ticket.location}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-clock"></i>
                            <span>${this.formatDate(ticket.created)}</span>
                        </div>
                    </div>

                    <div class="ticket-stats">
                        <span class="stat-item">
                            <i class="fas fa-comments"></i>
                            ${ticket.replies.length}
                        </span>
                        ${ticket.attachments.length > 0 ? `
                        <span class="stat-item">
                            <i class="fas fa-paperclip"></i>
                            ${ticket.attachments.length}
                        </span>
                        ` : ''}
                        <span class="stat-item">
                            <i class="fas fa-clock"></i>
                            ${ticket.timeSpent}ч/${ticket.estimatedTime}ч
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    filterArticles(type, value) { 
        this.showNotification(`Фильтр статей ${type}: ${value || 'сброшен'}`, 'info'); 
    }

    searchArticles(query) { 
        this.showNotification(`Поиск статей: ${query || 'сброшен'}`, 'info'); 
    }

    viewUser(id) { 
        const user = this.data.users.find(u => u.id == id);
        if (user) {
            this.showNotification(`Просмотр пользователя: ${user.name}`, 'info');
        }
    }

    resetSettings() { 
        if (confirm('Сбросить все настройки?')) {
            localStorage.clear();
            this.showNotification('Настройки сброшены', 'warning');
            setTimeout(() => location.reload(), 1000);
        }
    }

    clearAllData() { 
        if (confirm('Удалить все данные? Это действие нельзя отменить!')) {
            localStorage.clear();
            this.showNotification('Все данные удалены', 'warning');
            setTimeout(() => location.reload(), 1000);
        }
    }

    exportData() { 
        const data = JSON.stringify(this.data, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rikor-helpdesk-${new Date().getTime()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.showNotification('Данные экспортированы', 'success');
    }
}
// ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
console.log('🚀 Подготовка к запуску RIKOR HELPDESK v2.10.0 Advanced Assignment & File Management...');

// ИСПРАВЛЕНИЕ: Ждем полной загрузки DOM перед инициализацией
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    // DOM уже загружен
    initApp();
}

function initApp() {
    console.log('🚀 Создание экземпляра RIKOR HELPDESK v2.10.0 Advanced Assignment & File Management...');

    try {
        window.app = new RikorHelpDeskAdvanced();
        console.log('✅ RIKOR HELPDESK v2.10.0 Advanced Assignment & File Management успешно инициализирована!');
    } catch (error) {
        console.error('❌ Критическая ошибка инициализации:', error);

        // Показываем ошибку пользователю
        setTimeout(() => {
            const content = document.getElementById('content');
            if (content) {
                content.innerHTML = `
                    <div class="card error-card" style="text-align: center; padding: 40px; margin: 20px;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: #ef4444; margin-bottom: 16px;"></i>
                        <h2 style="color: #1e293b;">Ошибка инициализации</h2>
                        <p style="color: #64748b; margin-bottom: 16px;">
                            Не удалось запустить систему: ${error.message}
                        </p>
                        <button onclick="location.reload()" class="btn btn--primary">
                            <i class="fas fa-redo"></i> Перезагрузить
                        </button>
                    </div>
                `;
            }
        }, 100);
    }
}
