/**
 * 统一的图片错误处理函数
 * @param {HTMLImageElement} img - 图片元素
 * @param {string} placeholderText - 占位符文本（可选，默认'无'）
 * @param {boolean} showPlaceholder - 是否显示占位符（true=显示灰色圆形占位符，false=仅隐藏）
 */
function handleImageError(img, placeholderText = '无', showPlaceholder = true) {
    if (!img) return;
    
    // 隐藏破损的图片
    img.style.display = 'none';
    
    // 如果需要显示占位符
    if (showPlaceholder) {
        // 检查是否已经有占位符
        let placeholder = img.nextElementSibling;
        if (!placeholder || !placeholder.classList.contains('image-placeholder')) {
            // 创建占位符
            placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.style.cssText = `
                width: ${img.style.width || '40px'};
                height: ${img.style.height || '40px'};
                border-radius: 50%;
                background-color: #f3f4f6;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #9ca3af;
                font-size: 12px;
            `;
            placeholder.textContent = placeholderText;
            
            // 插入到图片后面
            img.parentNode.insertBefore(placeholder, img.nextSibling);
        } else {
            // 显示已有的占位符
            placeholder.style.display = 'flex';
        }
    }
}

tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#3B82F6',
                secondary: '#10B981',
                dark: {
                    100: '#1F2937',
                    200: '#111827',
                    300: '#0F172A'
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Montserrat', 'sans-serif']
            },
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding'
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // 加载系统配置（动态设置背景图片和公司信息）
    loadSystemConfig();

    // 加载陪玩师列表
    loadCompanionsList();

    // 静态项目数据（已废弃，保留作为备用）
    const projects = [
        {
            id: 1,
            title: "王者荣耀精彩操作",
            category: "王者荣耀",
            image: "image/project1.jpg",
            description: "S35赛季王者段位精彩操作集锦，展示各种高光时刻和极限操作。",
            details: [
                "国服最强李白实战演示",
                "高端局意识与节奏把控",
                "极限反杀与团战收割",
                "专业陪玩服务体验"
            ],
            technologies: ["王者荣耀", "iOS", "安卓", "全英雄精通"],
            date: "2026年4月",
            client: "陪玩达人平台"
        },
        {
            id: 2,
            title: "英雄联盟高光时刻",
            category: "英雄联盟",
            image: "image/project2.jpg",
            description: "峡谷之巅超凡大师段位精彩操作，劫、亚索等英雄的完美连招展示。",
            details: [
                "中单刺客极致操作",
                "对线压制与游走支援",
                "团战切入与时机把握",
                "高分段排位实战教学"
            ],
            technologies: ["英雄联盟", "PC端", "多位置精通", "战术指导"],
            date: "2026年4月",
            client: "陪玩达人平台"
        },
        {
            id: 3,
            title: "绝地求生击杀集锦",
            category: "绝地求生",
            image: "image/project3.jpg",
            description: "海岛雨林地图多次皇冠局四排击杀集锦，枪法精准意识一流。",
            details: [
                "98K/AWM狙击精准爆头",
                "近距离刚枪身法秀",
                "决赛圈运营与决策",
                "团队配合与指挥"
            ],
            technologies: ["PUBG", "PC端", "多地图精通", "战术分析"],
            date: "2026年3月",
            client: "陪玩达人平台"
        },
        {
            id: 4,
            title: "永劫无间天梯对战",
            category: "其他游戏",
            image: "image/project4.jpg",
            description: "火罗国修罗段位实战演示，刀法身法展现极致操作。",
            details: [
                "振刀博弈与心理战",
                "连招组合与武器切换",
                "地形利用与跑图技巧",
                "多人竞技策略分享"
            ],
            technologies: ["永劫无间", "PC端", "全英雄熟练", "身法教学"],
            date: "2026年3月",
            client: "陪玩达人平台"
        },
        {
            id: 5,
            title: "蛋仔派对趣味时刻",
            category: "其他游戏",
            image: "image/project5.jpg",
            description: "欢乐蛋仔闯关集锦，各类趣味玩法和搞笑瞬间合集。",
            details: [
                "高难度关卡速通技巧",
                "乐园创意地图游玩",
                "双人/四人组队乐趣",
                "轻松休闲社交互动"
            ],
            technologies: ["蛋仔派对", "移动端", "休闲竞技", "娱乐陪玩"],
            date: "2026年2月",
            client: "陪玩达人平台"
        }
    ];

    function toggleTheme() {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    }

    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }

    if (localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenu = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('hidden');
            }
            document.body.style.overflow = 'hidden';
        });
    }

    function closeMenu() {
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.add('hidden');
        }
        document.body.style.overflow = '';
    }

    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', closeMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMenu);
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', async function() {
            filterButtons.forEach(btn => btn.classList.remove('active', 'bg-primary', 'text-white'));

            this.classList.add('active', 'bg-primary', 'text-white');

            const filter = this.getAttribute('data-filter');
            
            // 从API加载对应游戏类型的陪玩师
            await loadFilteredCompanions(filter);
        });
    });

/**
 * 加载筛选后的陪玩师列表
 */
async function loadFilteredCompanions(filter) {
    try {
        let url = '/api/v1/companions?page=1&size=20&onlineOnly=true';
        
        // 根据筛选条件添加游戏类型参数（直接使用游戏名称）
        if (filter !== 'all') {
            url += `&gameType=${encodeURIComponent(filter)}`;
        }
        
        const response = await fetch(url);
        if (response.ok) {
            const result = await response.json();
            if (result.code === 200 && result.data) {
                renderCompanionsGrid(result.data);
                initCarousel();
            }
        }
    } catch (error) {
        console.error('加载筛选陪玩师列表失败:', error);
    }
}

    const modal = document.getElementById('project-modal');
    const closeModal = document.getElementById('close-modal');
    const modalContent = document.getElementById('modal-content');
    const viewProjectButtons = document.querySelectorAll('.view-project');

    viewProjectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-id'));
            openProjectModal(projectId);
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            alert(`感谢您的留言，${name}！我会尽快回复您。`);
            contactForm.reset();
        });
    }

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    const scrollProgress = document.querySelector('.scroll-progress');

    window.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

        if (scrollProgress) {
            scrollProgress.style.width = scrollPercentage + '%';
        }
    });

    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            if (backToTopButton) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            }
        } else {
            if (backToTopButton) {
                backToTopButton.classList.remove('opacity-100', 'visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        }
    });

    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            navbar.classList.add('bg-white/90', 'dark:bg-dark-300/90', 'shadow-md', 'backdrop-blur-md');
        } else {
            navbar.classList.remove('bg-white/90', 'dark:bg-dark-300/90', 'shadow-md', 'backdrop-blur-md');
        }
    });
});

function openProjectModal(projectId) {
    const projects = [
        {
            id: 1,
            title: "王者荣耀精彩操作",
            category: "王者荣耀",
            image: "image/project1.jpg",
            description: "S35赛季王者段位精彩操作集锦，展示各种高光时刻和极限操作。",
            details: [
                "国服最强李白实战演示",
                "高端局意识与节奏把控",
                "极限反杀与团战收割",
                "专业陪玩服务体验"
            ],
            technologies: ["王者荣耀", "iOS", "安卓", "全英雄精通"],
            date: "2026年4月",
            client: "陪玩达人平台"
        },
        {
            id: 2,
            title: "英雄联盟高光时刻",
            category: "英雄联盟",
            image: "image/project2.jpg",
            description: "峡谷之巅超凡大师段位精彩操作，劫、亚索等英雄的完美连招展示。",
            details: [
                "中单刺客极致操作",
                "对线压制与游走支援",
                "团战切入与时机把握",
                "高分段排位实战教学"
            ],
            technologies: ["英雄联盟", "PC端", "多位置精通", "战术指导"],
            date: "2026年4月",
            client: "陪玩达人平台"
        },
        {
            id: 3,
            title: "绝地求生击杀集锦",
            category: "绝地求生",
            image: "image/project3.jpg",
            description: "海岛雨林地图多次皇冠局四排击杀集锦，枪法精准意识一流。",
            details: [
                "98K/AWM狙击精准爆头",
                "近距离刚枪身法秀",
                "决赛圈运营与决策",
                "团队配合与指挥"
            ],
            technologies: ["PUBG", "PC端", "多地图精通", "战术分析"],
            date: "2026年3月",
            client: "陪玩达人平台"
        },
        {
            id: 4,
            title: "永劫无间天梯对战",
            category: "其他游戏",
            image: "image/project4.jpg",
            description: "火罗国修罗段位实战演示，刀法身法展现极致操作。",
            details: [
                "振刀博弈与心理战",
                "连招组合与武器切换",
                "地形利用与跑图技巧",
                "多人竞技策略分享"
            ],
            technologies: ["永劫无间", "PC端", "全英雄熟练", "身法教学"],
            date: "2026年3月",
            client: "陪玩达人平台"
        },
        {
            id: 5,
            title: "蛋仔派对趣味时刻",
            category: "其他游戏",
            image: "image/project5.jpg",
            description: "欢乐蛋仔闯关集锦，各类趣味玩法和搞笑瞬间合集。",
            details: [
                "高难度关卡速通技巧",
                "乐园创意地图游玩",
                "双人/四人组队乐趣",
                "轻松休闲社交互动"
            ],
            technologies: ["蛋仔派对", "移动端", "休闲竞技", "娱乐陪玩"],
            date: "2026年2月",
            client: "陪玩达人平台"
        }
    ];

    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');

    if (!modal || !modalContent) return;

    const detailsHtml = project.details.map(d => `<li class="flex items-start"><i class="fa fa-check text-secondary mr-2 mt-1"></i><span>${d}</span></li>`).join('');
    const techHtml = project.technologies.map(t => `<span class="inline-block bg-gray-200 dark:bg-dark-100 px-3 py-1 rounded-full text-sm">${t}</span>`).join('');

    modalContent.innerHTML = `
        <div class="relative">
            <img src="${project.image}" alt="${project.title}" class="w-full h-64 md:h-80 object-cover">
            <button id="close-modal" class="absolute top-4 right-4 bg-white dark:bg-dark-100 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <i class="fa fa-times"></i>
            </button>
        </div>
        <div class="p-6 md:p-8">
            <div class="flex flex-wrap items-center gap-4 mb-4">
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">${project.category}</span>
                <span class="text-gray-500 dark:text-gray-400 text-sm"><i class="fa fa-calendar mr-1"></i>${project.date}</span>
                <span class="text-gray-500 dark:text-gray-400 text-sm"><i class="fa fa-user mr-1"></i>${project.client}</span>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold mb-4">${project.title}</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">${project.description}</p>
            <h3 class="text-lg font-semibold mb-3">项目详情</h3>
            <ul class="space-y-2 mb-6">${detailsHtml}</ul>
            <h3 class="text-lg font-semibold mb-3">技术栈</h3>
            <div class="flex flex-wrap gap-2">${techHtml}</div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const newCloseBtn = document.getElementById('close-modal');
    if (newCloseBtn) {
        newCloseBtn.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

/**
 * 获取缩略图路径
 * @param {string} originalUrl - 原图路径
 * @returns {string} 缩略图路径
 */
function getPreviewUrl(originalUrl) {
    if (!originalUrl) return '';
    const dotIndex = originalUrl.lastIndexOf('.');
    if (dotIndex > 0) {
        const name = originalUrl.substring(0, dotIndex);
        const extension = originalUrl.substring(dotIndex);
        return name + '_thumb' + extension;
    }
    return originalUrl + '_thumb.jpg';
}

/**
 * 加载系统配置
 */
async function loadSystemConfig() {
    try {
        const response = await fetch('/api/v1/admin/config');
        if (response.ok) {
            const configs = await response.json();
            
            // 动态设置hero区域背景图片（使用缩略图）
            if (configs.background_image) {
                const heroBackground = document.getElementById('hero-background');
                if (heroBackground) {
                    const previewUrl = getPreviewUrl(configs.background_image);
                    heroBackground.src = previewUrl;
                }
            }
            
            // 动态设置公司名称和描述
            if (configs.company_name) {
                document.title = configs.company_name + ' - 专业游戏陪玩服务';
            }
            
            if (configs.company_description) {
                const heroDescription = document.getElementById('hero-description');
                if (heroDescription) {
                    heroDescription.textContent = configs.company_description;
                }
            }
        }
    } catch (error) {
        console.error('加载系统配置失败:', error);
    }
}

/**
 * 加载陪玩师列表
 */
async function loadCompanionsList() {
    try {
        const response = await fetch('/api/v1/companions?page=1&size=20&onlineOnly=true');
        if (response.ok) {
            const result = await response.json();
            if (result.code === 200 && result.data) {
                renderCompanionsGrid(result.data);
                initCarousel();
            }
        }
    } catch (error) {
        console.error('加载陪玩师列表失败:', error);
    }
}

// 轮播全局变量
let carouselState = {
    initialized: false,
    autoScrollTimer: null,
    prevBtnClone: null,
    nextBtnClone: null
};

/**
 * 初始化轮播功能
 */
/**
 * 初始化 Swiper 轮播
 */
let companionSwiper = null;

function initCarousel() {
    // 如果已经存在，先销毁
    if (companionSwiper) {
        companionSwiper.destroy(true, true);
        companionSwiper = null;
    }
    
    const swiperEl = document.querySelector('.companion-swiper');
    if (!swiperEl) return;
    
    // 等待 DOM 渲染完成
    setTimeout(() => {
        const slides = swiperEl.querySelectorAll('.swiper-slide');
        if (slides.length === 0) return;
        
        // 初始化 Swiper
        companionSwiper = new Swiper('.companion-swiper', {
            slidesPerView: 4,
            spaceBetween: 24,
            loop: false,
            speed: 500,
            
            // 分页器
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: false,
            },
            
            // 导航按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            // 自动播放
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            
            // 响应式断点
            breakpoints: {
                // 小屏幕：2 列
                320: {
                    slidesPerView: 2,
                    spaceBetween: 12,
                },
                // 中等屏幕：3 列
                768: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                },
                // 大屏幕：4 列
                1280: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                },
            },
        });
    }, 100);
}

/**
 * 渲染陪玩师网格
 */
function renderCompanionsGrid(companions) {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    // 清空现有内容
    galleryGrid.innerHTML = '';

    if (!companions || companions.length === 0) {
        galleryGrid.innerHTML = `
            <div class="col-span-full text-center py-12 swiper-slide">
                <i class="fa fa-users text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
                <p class="text-gray-500 dark:text-gray-400 text-lg">暂无陪玩师数据</p>
            </div>
        `;
        return;
    }

    // 渲染每个陪玩师卡片
    companions.forEach((companion, index) => {
        const card = createCompanionCard(companion, index);
        // 为每个卡片添加 swiper-slide 类
        card.classList.add('swiper-slide');
        galleryGrid.appendChild(card);
    });
    
    // 重新初始化AOS动画
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

/**
 * 创建陪玩师卡片
 */
function createCompanionCard(companion, index) {
    const card = document.createElement('div');
    card.className = 'project-card group';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (150 + index * 50).toString());

    // 根据游戏类型设置分类
    const gameTypes = companion.gameTypes ? companion.gameTypes.split(',') : [];
    const firstGameType = gameTypes[0] || '其他游戏';
    const categoryClass = getCategoryClass(firstGameType);
    card.setAttribute('data-category', categoryClass);

    // 处理头像路径，没有头像时使用Logo图片
    const avatarUrl = companion.avatar || 'image/logo_path.jpg';

    // 构建评分显示
    const rating = companion.rating || 0;
    const ratingDisplay = rating > 0 ? `${rating}分` : '暂无评分';

    // 构建标签显示
    const tags = companion.tags ? companion.tags.split(',').slice(0, 3) : [];
    const tagsHtml = tags.map(tag => 
        `<span class="inline-block bg-primary/20 text-primary px-2 py-1 rounded text-xs mr-1 mb-1">${tag.trim()}</span>`
    ).join('');

    card.innerHTML = `
        <img src="${avatarUrl}" alt="${companion.nickname}" class="w-full h-64 object-cover transition-transform duration-500" onerror="handleImageError(this, '${companion.nickname.charAt(0)}', false)">
        <div class="project-overlay">
            <h3 class="text-xl font-bold text-white mb-2">${companion.nickname}</h3>
            <p class="text-gray-200 mb-2 line-clamp-2">${companion.description || '暂无简介'}</p>
            <div class="mb-2">
                ${tagsHtml}
            </div>
            <div class="flex items-center justify-between text-sm text-gray-300 mb-3">
                <span><i class="fa fa-gamepad mr-1"></i>${firstGameType}</span>
                <span><i class="fa fa-star mr-1"></i>${ratingDisplay}</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-yellow-400 font-bold text-lg">￥${companion.price || 0}/小时</span>
                <button class="view-companion px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors" data-id="${companion.id}">
                    查看详情
                </button>
            </div>
        </div>
    `;

    // 绑定查看详情事件
    const viewButton = card.querySelector('.view-companion');
    if (viewButton) {
        viewButton.addEventListener('click', function() {
            openCompanionDetailModal(companion.id);
        });
    }

    return card;
}

/**
 * 根据游戏类型获取分类类名
 */
function getCategoryClass(gameType) {
    if (!gameType) return 'web';
    
    const typeMap = {
        '王者荣耀': 'ui',
        '英雄联盟': 'photography',
        '绝地求生': 'illustration',
        '永劫无间': 'web',
        '蛋仔派对': 'web'
    };
    
    return typeMap[gameType] || 'web';
}

/**
 * 打开陪玩师详情弹窗
 */
async function openCompanionDetailModal(companionId) {
    try {
        const response = await fetch(`/api/v1/companions/${companionId}`);
        if (response.ok) {
            const result = await response.json();
            if (result.code === 200 && result.data) {
                showCompanionDetailModal(result.data);
            }
        }
    } catch (error) {
        console.error('加载陪玩师详情失败:', error);
        alert('加载详情失败，请稍后重试');
    }
}

/**
 * 显示陪玩师详情弹窗
 */
function showCompanionDetailModal(companion) {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');

    if (!modal || !modalContent) return;

    // 处理头像，没有头像时使用Logo图片
    const avatarUrl = companion.avatar || 'image/logo_path.jpg';

    // 处理语音介绍
    const voiceIntroHtml = companion.voiceIntro ? `
        <div class="mb-4">
            <h4 class="text-lg font-semibold mb-2"><i class="fa fa-microphone text-primary mr-2"></i>语音介绍</h4>
            <audio controls class="w-full">
                <source src="${companion.voiceIntro}" type="audio/mpeg">
                您的浏览器不支持音频播放
            </audio>
        </div>
    ` : '';

    // 处理视频
    const videoHtml = companion.videoUrl ? `
        <div class="mb-4">
            <h4 class="text-lg font-semibold mb-2"><i class="fa fa-video-camera text-primary mr-2"></i>精彩视频</h4>
            <video controls class="w-full rounded-lg">
                <source src="${companion.videoUrl}" type="video/mp4">
                您的浏览器不支持视频播放
            </video>
        </div>
    ` : '';

    // 处理段位和服务器
    const ranks = companion.ranks ? companion.ranks.split(',') : [];
    const servers = companion.servers ? companion.servers.split(',') : [];
    
    const ranksHtml = ranks.length > 0 ? `
        <div class="mb-3">
            <span class="font-semibold text-gray-700 dark:text-gray-300">段位：</span>
            ${ranks.map(rank => `<span class="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm mr-2 mb-1">${rank.trim()}</span>`).join('')}
        </div>
    ` : '';

    const serversHtml = servers.length > 0 ? `
        <div class="mb-3">
            <span class="font-semibold text-gray-700 dark:text-gray-300">服务器：</span>
            ${servers.map(server => `<span class="inline-block bg-gray-200 dark:bg-dark-100 px-3 py-1 rounded-full text-sm mr-2 mb-1">${server.trim()}</span>`).join('')}
        </div>
    ` : '';

    // 处理标签
    const tags = companion.tags ? companion.tags.split(',') : [];
    const tagsHtml = tags.map(tag => 
        `<span class="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm mr-2 mb-1">${tag.trim()}</span>`
    ).join('');

    modalContent.innerHTML = `
        <div class="relative">
            <img src="${avatarUrl}" alt="${companion.nickname}" class="w-full h-64 md:h-80 object-cover" onerror="handleImageError(this, '${companion.nickname.charAt(0)}', false)">
            <button id="close-modal" class="absolute top-4 right-4 bg-white dark:bg-dark-100 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <i class="fa fa-times"></i>
            </button>
        </div>
        <div class="p-6 md:p-8">
            <div class="flex flex-wrap items-center gap-4 mb-4">
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">${companion.gameTypes}</span>
                <span class="text-gray-500 dark:text-gray-400 text-sm"><i class="fa fa-star mr-1"></i>${companion.rating || 0}分</span>
                <span class="text-yellow-500 font-bold text-lg"><i class="fa fa-yen mr-1"></i>${companion.price || 0}/小时</span>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold mb-4">${companion.nickname}</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">${companion.description || '暂无简介'}</p>
            
            ${ranksHtml}
            ${serversHtml}
            
            <div class="mb-4">
                <span class="font-semibold text-gray-700 dark:text-gray-300">标签：</span>
                ${tagsHtml}
            </div>
            
            ${voiceIntroHtml}
            ${videoHtml}
            
            <div class="mt-6">
                <a href="#contact" class="btn-primary inline-flex items-center">
                    <i class="fa fa-weixin mr-2"></i>立即咨询
                </a>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const newCloseBtn = document.getElementById('close-modal');
    if (newCloseBtn) {
        newCloseBtn.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}