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

    const projects = [
        {
            id: 1,
            title: "移动应用UI设计",
            category: "UI/UX设计",
            image: "https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/b956b28200804ab58c65c339b8a81861~tplv-a9rns2rl98-image.image?lk3s=8e244e95&rcl=2026040416222170BADBD524E81C6E41B0&rrcfp=f06b921b&x-expires=1777882967&x-signature=tLV2VMhBnqfxgfCy0j5g3HYpp6A%3D",
            description: "现代简约风格的移动应用UI设计，配以色彩鲜明的强调元素和直观的导航。该项目专注于通过简洁的界面和精心设计的交互创造无缝的用户体验。",
            details: [
                "用户研究和角色设定",
                "线框图和低保真原型设计",
                "带有交互元素的高保真UI设计",
                "用户测试和迭代优化"
            ],
            technologies: ["Figma", "Adobe XD", "Sketch", "Principle"],
            date: "2025年6月",
            client: "科技初创公司"
        },
        {
            id: 2,
            title: "城市景观摄影",
            category: "摄影",
            image: "https://p11-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/e3494d22c7c140048484aa0f2bc04ee9~tplv-a9rns2rl98-image.image?lk3s=8e244e95&rcl=2026040416222170BADBD524E81C6E41B0&rrcfp=f06b921b&x-expires=1777882959&x-signature=HEkX%2FEECzcd%2FRQ5a5aUFvDqcFs8%3D",
            description: "黑白城市景观摄影集，捕捉城市建筑的戏剧性结构和光影效果。这个系列探索了自然光与城市结构之间的关系。",
            details: [
                "从黎明到黄昏的城市风光摄影",
                "长曝光技术创造动态模糊效果",
                "建筑细节和构图",
                "黑白后期处理"
            ],
            technologies: ["佳能EOS R5", "广角镜头", "Lightroom", "Photoshop"],
            date: "2025年4月",
            client: "城市印刷画廊"
        },
        {
            id: 3,
            title: "奇幻数字插画",
            category: "插画",
            image: "https://p11-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/09e8de031da44b17af8bfe7bad75a996~tplv-a9rns2rl98-image.image?lk3s=8e244e95&rcl=2026040416222170BADBD524E81C6E41B0&rrcfp=f06b921b&x-expires=1777882964&x-signature=5lvLrXg9mAIjACiYLBPwRVaO1Nw%3D",
            description: "以奇幻为主题的创意数字插画，展现鲜艳的色彩和魔幻元素。这幅作品是为一本书的封面创作的，探索了奇幻与现实的交汇点。",
            details: [
                "概念开发和草图设计",
                "数字绘画技巧",
                "色彩理论和氛围营造",
                "出版用最终 artwork"
            ],
            technologies: ["Procreate", "Photoshop", "Clip Studio Paint", "Wacom Cintiq"],
            date: "2025年3月",
            client: "奇幻书籍出版社"
        },
        {
            id: 4,
            title: "暗黑模式仪表盘",
            category: "网页设计",
            image: "https://p26-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/fd7b521a9e5b4333917cc1a850a49f24~tplv-a9rns2rl98-image.image?lk3s=8e244e95&rcl=2026040416222170BADBD524E81C6E41B0&rrcfp=f06b921b&x-expires=1777882960&x-signature=moU722FeDiP%2BXGQ9yvbbkhnOwQ0%3D",
            description: "专业网页设计模型，展示带有分析和用户统计功能的暗黑模式仪表盘。该项目专注于创建视觉吸引力强且功能完善的数据可视化界面。",
            details: [
                "数据可视化的用户界面设计",
                "仪表盘布局和组件设计",
                "暗黑模式配色方案实现",
                "交互式图表和图形设计"
            ],
            technologies: ["Figma", "Adobe Illustrator", "Chart.js", "HTML/CSS"],
            date: "2025年5月",
            client: "分析专业公司"
        },
        {
            id: 5,
            title: "创意人像摄影",
            category: "摄影",
            image: "https://p11-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/d10ac5dff6eb4ebc9962cca05fa5238d~tplv-a9rns2rl98-image.image?lk3s=8e244e95&rcl=2026040416222170BADBD524E81C6E41B0&rrcfp=f06b921b&x-expires=1777882958&x-signature=XafzqHP1vnayeu7%2B0%2B9giZs6HOw%3D",
            description: "以中性背景和自然光线拍摄的创意人士专业人像摄影。本次拍摄旨在通过精心的构图捕捉 subjects的个性和创意精神。",
            details: [
                "工作室人像摄影",
                "自然光线技巧",
                "构图和取景",
                "后期处理和修饰"
            ],
            technologies: ["索尼A7R IV", "人像镜头", "Lightroom", "Capture One"],
            date: "2025年2月",
            client: "创意专业人士杂志"
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
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active', 'bg-primary', 'text-white'));

            this.classList.add('active', 'bg-primary', 'text-white');

            const filter = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

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
            title: "移动应用UI设计",
            category: "UI/UX设计",
            image: "https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/b956b28200804ab58c65c339b8a81861~tplv-a9rns2rl98-image.image?lk3s=8e244e95&rcl=2026040416222170BADBD524E81C6E41B0&rrcfp=f06b921b&x-expires=1777882967&x-signature=tLV2VMhBnqfxgfCy0j5g3HYpp6A%3D",
            description: "现代简约风格的移动应用UI设计，配以色彩鲜明的强调元素和直观的导航。该项目专注于通过简洁的界面和精心设计的交互创造无缝的用户体验。",
            details: [
                "用户研究和角色设定",
                "线框图和低保真原型设计",
                "带有交互元素的高保真UI设计",
                "用户测试和迭代优化"
            ],
            technologies: ["Figma", "Adobe XD", "Sketch", "Principle"],
            date: "2025年6月",
            client: "科技初创公司"
        },
        {
            id: 2,
            title: "城市景观摄影",
            category: "摄影",
            image: "https://p11-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/e3494d22c7c140048484aa0f2bc04ee9~tplv-a9rns2rl98-image.image?lk3s=8e244e95&rcl=2026040416222170BADBD524E81C6E41B0&rrcfp=f06b921b&x-expires=1777882959&x-signature=HEkX%2FEECzcd%2FRQ5a5aUFvDqcFs8%3D",
            description: "黑白城市景观摄影集，捕捉城市建筑的戏剧性结构和光影效果。这个系列探索了自然光与城市结构之间的关系。",
            details: [
                "从黎明到黄昏的城市风光摄影",
                "长曝光技术创造动态模糊效果",
                "建筑细节和构图",
                "黑白后期处理"
            ],
            technologies: ["佳能EOS R5", "广角镜头", "Lightroom", "Photoshop"],
            date: "2025年4月",
            client: "城市印刷画廊"
        },
        {
            id: 3,
            title: "奇幻数字插画",
            category: "插画",
            image: "https://p11-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/09e8de031da44b17af8bfe7bad75a996~tplv-a9rns2rl98-image.image?lk3s=8e244e95&rcl=2026040416222170BADBD524E81C6E41B0&rrcfp=f06b921b&x-expires=1777882964&x-signature=5lvLrXg9mAIjACiYLBPwRVaO1Nw%3D",
            description: "以奇幻为主题的创意数字插画，展现鲜艳的色彩和魔幻元素。这幅作品是为一本书的封面创作的，探索了奇幻与现实的交汇点。",
            details: [
                "概念开发和草图设计",
                "数字绘画技巧",
                "色彩理论和氛围营造",
                "出版用最终 artwork"
            ],
            technologies: ["Procreate", "Photoshop", "Clip Studio Paint", "Wacom Cintiq"],
            date: "2025年3月",
            client: "奇幻书籍出版社"
        },
        {
            id: 4,
            title: "暗黑模式仪表盘",
            category: "网页设计",
            image: "https://p26-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/fd7b521a9e5b4333917cc1a850a49f24~tplv-a9rns2rl98-image.image?lk3s=8e244e95&rcl=2026040416222170BADBD524E81C6E41B0&rrcfp=f06b921b&x-expires=1777882960&x-signature=moU722FeDiP%2BXGQ9yvbbkhnOwQ0%3D",
            description: "专业网页设计模型，展示带有分析和用户统计功能的暗黑模式仪表盘。该项目专注于创建视觉吸引力强且功能完善的数据可视化界面。",
            details: [
                "数据可视化的用户界面设计",
                "仪表盘布局和组件设计",
                "暗黑模式配色方案实现",
                "交互式图表和图形设计"
            ],
            technologies: ["Figma", "Adobe Illustrator", "Chart.js", "HTML/CSS"],
            date: "2025年5月",
            client: "分析专业公司"
        },
        {
            id: 5,
            title: "创意人像摄影",
            category: "摄影",
            image: "https://p11-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/d10ac5dff6eb4ebc9962cca05fa5238d~tplv-a9rns2rl98-image.image?lk3s=8e244e95&rcl=2026040416222170BADBD524E81C6E41B0&rrcfp=f06b921b&x-expires=1777882958&x-signature=XafzqHP1vnayeu7%2B0%2B9giZs6HOw%3D",
            description: "以中性背景和自然光线拍摄的创意人士专业人像摄影。本次拍摄旨在通过精心的构图捕捉 subjects的个性和创意精神。",
            details: [
                "工作室人像摄影",
                "自然光线技巧",
                "构图和取景",
                "后期处理和修饰"
            ],
            technologies: ["索尼A7R IV", "人像镜头", "Lightroom", "Capture One"],
            date: "2025年2月",
            client: "创意专业人士杂志"
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