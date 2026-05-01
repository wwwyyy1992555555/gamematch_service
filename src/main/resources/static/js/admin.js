/**
 * Admin Dashboard JavaScript
 * 管理后台交互逻辑
 */

/**
 * 【弃用】统一的图片错误处理函数
 * 注意：采用方案2（延迟持久化）后，后端不再验证文件存在性，此函数已不再使用
 * 保留此函数仅为兼容旧代码，未来版本将删除
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
                width: ${img.style.width || img.style.maxWidth || '60px'};
                height: ${img.style.height || img.style.maxHeight || '60px'};
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
            if (img.parentNode) {
                img.parentNode.insertBefore(placeholder, img.nextSibling);
            }
        } else {
            // 显示已有的占位符
            placeholder.style.display = 'flex';
        }
    }
}

/**
 * 显示指定板块
 * @param {string} sectionId - 板块ID
 */
function showSection(sectionId) {
    // 隐藏所有板块
    document.querySelectorAll('.active-section').forEach(section => {
        section.classList.remove('active-section');
        section.classList.add('hidden');
    });

    // 显示指定板块
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('active-section');
    }

    // 更新侧边栏激活状态
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(`.sidebar-menu a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // 更新页面标题
    const titles = {
        'companions': '陪玩师管理',
        'admins': '管理员管理',
        'settings': '系统设置'
    };
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        pageTitle.textContent = titles[sectionId] || '管理后台';
    }

    // 移动端：点击链接后自动关闭侧边栏
    closeSidebar();
    
    // 权限检查：只有超级管理员才能访问管理员管理页面
    if (sectionId === 'admins') {
        const role = localStorage.getItem('role');
        if (role !== '1') {
            alert('您没有权限访问此页面');
            showSection('companions'); // 返回陪玩师管理页面
            return;
        }
    }
    
    // 如果是系统设置页面，加载配置
    if (sectionId === 'settings') {
        loadSystemConfig();
    }
    
    // 如果是管理员管理页面，加载列表
    if (sectionId === 'admins') {
        loadAdminList();
    }
}

/**
 * 切换侧边栏
 */
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
    if (overlay) {
        overlay.classList.toggle('open');
    }
}

/**
 * 关闭侧边栏
 */
function closeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar) {
        sidebar.classList.remove('open');
    }
    if (overlay) {
        overlay.classList.remove('open');
    }
}

/**
 * 打开弹窗
 * @param {string} modalType - 弹窗类型
 */
function openModal(modalType) {
    const modals = {
        'addCompanion': 'addCompanionModal',
        'editCompanion': 'editCompanionModal',
        'addAdmin': 'addAdminModal',
        'editAdmin': 'editAdminModal'
    };
    
    const modalId = modals[modalType];
    if (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('open');
            
            // 如果是添加管理员弹窗，初始化清空容器
            if (modalType === 'addAdmin') {
                initAddAdminAvatarPreview();
            }
            
            // 如果是添加陪玩师弹窗，初始化清空容器
            if (modalType === 'addCompanion') {
                initAddCompanionAvatarPreview();
            }
            
            // 注意：编辑页面的头像预览由 editAdmin/editCompanion 函数中手动设置，不在这里初始化
        }
    }
}

/**
 * 初始化添加管理员头像预览（不显示占位符）
 */
function initAddAdminAvatarPreview() {
    const previewContainer = document.getElementById('addAdminAvatar_preview');
    if (!previewContainer) return;
    previewContainer.innerHTML = '';
    
    // 清空头像文件输入框和隐藏字段
    const avatarFileInput = document.getElementById('addAdminAvatar_file');
    const avatarHiddenInput = document.getElementById('addAdminAvatar');
    
    if (avatarFileInput) avatarFileInput.value = '';
    if (avatarHiddenInput) avatarHiddenInput.value = '';
}

/**
 * 初始化编辑管理员头像预览（不显示占位符）
 */
function initEditAdminAvatarPreview() {
    const previewContainer = document.getElementById('editAdminAvatar_preview');
    if (!previewContainer) return;
    previewContainer.innerHTML = '';
    
    // 清空头像文件输入框和隐藏字段
    const avatarFileInput = document.getElementById('editAdminAvatar_file');
    const avatarHiddenInput = document.getElementById('editAdminAvatar');
    
    if (avatarFileInput) avatarFileInput.value = '';
    if (avatarHiddenInput) avatarHiddenInput.value = '';
}

/**
 * 初始化添加陪玩师头像预览（不显示占位符）
 */
function initAddCompanionAvatarPreview() {
    const previewContainer = document.getElementById('addCompanionAvatar_preview');
    if (!previewContainer) return;
    previewContainer.innerHTML = '';
    
    // 清空所有文件输入框
    const avatarFileInput = document.getElementById('addCompanionAvatar_file');
    const voiceIntroFileInput = document.getElementById('addCompanionVoiceIntro_file');
    const videoUrlFileInput = document.getElementById('addCompanionVideoUrl_file');
    
    if (avatarFileInput) avatarFileInput.value = '';
    if (voiceIntroFileInput) voiceIntroFileInput.value = '';
    if (videoUrlFileInput) videoUrlFileInput.value = '';
}

/**
 * 初始化编辑陪玩师头像预览（不显示占位符）
 */
function initEditCompanionAvatarPreview() {
    const previewContainer = document.getElementById('editCompanionAvatar_preview');
    if (!previewContainer) return;
    previewContainer.innerHTML = '';
    
    // 清空头像文件输入框和隐藏字段
    const avatarFileInput = document.getElementById('editCompanionAvatar_file');
    const avatarHiddenInput = document.getElementById('editCompanionAvatar');
    
    if (avatarFileInput) avatarFileInput.value = '';
    if (avatarHiddenInput) avatarHiddenInput.value = '';
}

/**
 * 关闭弹窗
 * @param {string} modalId - 弹窗ID
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('open');
    }
}

/**
 * 处理图片选择事件（验证 + 生成本地预览）
 * @param {string} fieldName - 字段名称
 * @param {HTMLElement} inputElement - 文件输入元素
 */
function handleImageSelect(fieldName, inputElement) {
    const file = inputElement.files[0];
    if (!file) return;
    
    // 验证文件大小（5MB）
    if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过5MB');
        inputElement.value = '';
        return;
    }
    
    // 判断是否为头像（字段名包含'Avatar'）
    const isAvatar = fieldName.toLowerCase().includes('avatar');
    
    // 直接使用FileReader读取原图，浏览器会根据CSS自动缩放
    generateImagePreview(fieldName + '_preview', file, isAvatar);
}

/**
 * 生成图片预览（直接使用原图，浏览器自动缩放）
 * @param {string} previewId - 预览容器ID
 * @param {File} file - 文件对象
 * @param {boolean} isCircle - 是否为圆形（true=头像，false=普通图片）
 */
function generateImagePreview(previewId, file, isCircle = false) {
    const reader = new FileReader();
    reader.onload = function(e) {
        renderImagePreview(previewId, e.target.result, isCircle);
    };
    reader.readAsDataURL(file);
}

/**
 * 上传图片
 * @param {string} fieldName - 字段名称
 * @param {HTMLElement} inputElement - 文件输入元素
 */
async function uploadImage(fieldName, inputElement) {
    const file = inputElement.files[0];
    if (!file) return;
    
    // 验证文件大小（5MB）
    if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过5MB');
        inputElement.value = '';
        return;
    }
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fieldName', fieldName); // 传递字段名用于覆盖
    
    try {
        const response = await fetch('/api/v1/admin/upload/image', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            // 设置隐藏字段的值（保存原图路径）
            document.getElementById(fieldName).value = result.url;
            
            // 生成预览（浏览器自动缩放）
            const isAvatar = fieldName.toLowerCase().includes('avatar');
            generateImagePreview(fieldName + '_preview', file, isAvatar);
            
            alert('上传成功！');
        } else {
            alert('上传失败: ' + result.message);
            inputElement.value = '';
        }
    } catch (error) {
        alert('上传失败，请检查网络连接');
        inputElement.value = '';
    }
}

/**
 * 渲染图片预览 DOM（圆角矩形或圆形）
 * @param {string} previewId - 预览容器ID
 * @param {string} imageUrl - 图片URL
 * @param {boolean} isCircle - 是否为圆形（true=头像，false=普通图片）
 */
function renderImagePreview(previewId, imageUrl, isCircle = false) {
    const previewContainer = document.getElementById(previewId);
    if (!previewContainer) return;
    
    // 根据类型选择样式
    const imgStyle = isCircle 
        ? 'width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid #e5e7eb;'
        : 'max-width: 150px; max-height: 150px; border-radius: 8px; border: 1px solid #e5e7eb;';
    
    const btnStyle = isCircle
        ? 'position: absolute; top: -4px; right: -4px; width: 20px; height: 20px; border-radius: 50%; background: #ef4444; color: white; border: 2px solid white; cursor: pointer; font-size: 14px; line-height: 1; display: flex; align-items: center; justify-content: center; padding: 0;'
        : 'position: absolute; top: -8px; right: -8px; width: 24px; height: 24px; border-radius: 50%; background: #ef4444; color: white; border: none; cursor: pointer; font-size: 16px; line-height: 1; display: flex; align-items: center; justify-content: center;';
    
    previewContainer.innerHTML = `
        <div style="position: relative; display: inline-block;${isCircle ? ' width: 60px; height: 60px;' : ''}">
            <img src="${imageUrl}" style="${imgStyle}" onerror="handleImageError(this, '无', false)" />
            <button type="button" onclick="removeFilePreview('${previewId}', '${imageUrl.replace('/uploads/', '')}')" 
                    style="${btnStyle}">
                ×
            </button>
        </div>
    `;
}

/**
 * 显示本地预览（不显示删除按钮）
 * @param {string} previewId - 预览容器ID
 * @param {string} dataUrl - Canvas生成的DataURL
 * @param {string} originalUrl - 原图URL（用于删除时清空隐藏字段）
 */
function showLocalPreview(previewId, dataUrl, originalUrl) {
    const previewContainer = document.getElementById(previewId);
    if (!previewContainer) return;
    
    // 提取fieldName
    const fieldName = previewId.replace('_preview', '');
    
    previewContainer.innerHTML = `
        <div style="position: relative; display: inline-block;">
            <img src="${dataUrl}" style="max-width: 150px; max-height: 150px; border-radius: 8px; border: 1px solid #e5e7eb;" />
            <button type="button" onclick="clearLocalPreview('${previewId}', '${fieldName}')" 
                    style="position: absolute; top: -8px; right: -8px; width: 24px; height: 24px; border-radius: 50%; background: #ef4444; color: white; border: none; cursor: pointer; font-size: 16px; line-height: 1; display: flex; align-items: center; justify-content: center;">
                ×
            </button>
        </div>
    `;
}

/**
 * 清除本地预览
 * @param {string} previewId - 预览容器ID
 * @param {string} fieldName - 字段名称
 */
function clearLocalPreview(previewId, fieldName) {
    // 清空隐藏字段
    document.getElementById(fieldName).value = '';
    
    // 清空预览
    const previewContainer = document.getElementById(previewId);
    if (previewContainer) {
        previewContainer.innerHTML = '';
    }
    
    // 清空文件输入
    const fileInput = document.getElementById(fieldName + '_file');
    if (fileInput) {
        fileInput.value = '';
    }
}

/**
 * 删除文件预览（统一处理所有文件类型：图片、头像、音频、视频）
 * @param {string} previewId - 预览容器ID
 * @param {string} filename - 文件名（可选，目前未使用）
 */
function removeFilePreview(previewId, filename) {
    const previewContainer = document.getElementById(previewId);
    const fieldName = previewId.replace('_preview', '');
    
    // 清空隐藏字段
    document.getElementById(fieldName).value = '';
    
    // 清空预览
    previewContainer.innerHTML = '';
    
    // 清空文件输入
    const fileInput = document.getElementById(fieldName + '_file');
    if (fileInput) {
        fileInput.value = '';
    }
}

/**
 * 切换管理员密码显示/隐藏
 * @param {HTMLElement} spanElement - 切换按钮元素（span）
 */
function toggleAdminPassword(spanElement) {
    const input = document.getElementById('addAdminPassword');
    if (input) {
        if (input.type === 'password') {
            input.type = 'text';
            spanElement.innerHTML = '<i class="fa fa-eye-slash"></i>';
        } else {
            input.type = 'password';
            spanElement.innerHTML = '<i class="fa fa-eye"></i>';
        }
    }
}

/**
 * 更新顶部栏用户信息
 * @param {string} username - 用户名
 * @param {string} avatar - 头像路径
 */
function updateTopBarUserInfo(username, avatar) {
    const topBarUsername = document.getElementById('topBarUsername');
    const topBarAvatar = document.getElementById('topBarAvatar');
    
    if (topBarUsername && username) {
        topBarUsername.textContent = username;
    }
    if (topBarAvatar) {
        if (avatar) {
            topBarAvatar.src = avatar;
            // 添加错误处理
            topBarAvatar.onerror = function() {
                handleImageError(this, '', false);
            };
        } else {
            // 没有头像时隐藏
            topBarAvatar.style.display = 'none';
        }
    }
}

/**
 * 加载当前管理员信息
 */
async function loadCurrentAdminInfo() {
    try {
        // 从 localStorage 获取登录信息
        const username = localStorage.getItem('username');
        const avatar = localStorage.getItem('avatar');
        
        if (username) {
            updateTopBarUserInfo(username, avatar);
        }
    } catch (error) {
        // 加载失败时使用默认信息
    }
}

// ==================== 陪玩师管理功能 ====================

// 分页相关变量
let companionPage = 1;
let companionPageSize = 10;
let companionTotal = 0;
let companionKeyword = '';

let adminPage = 1;
let adminPageSize = 10;
let adminTotal = 0;
let adminKeyword = '';

/**
 * 加载陪玩师列表（分页）
 */
async function loadCompanionList(page = 1, keyword = '') {
    companionPage = page;
    companionKeyword = keyword;
    
    try {
        let url = `/api/v1/admin/companions?page=${page}&size=${companionPageSize}`;
        if (keyword) {
            url += `&keyword=${encodeURIComponent(keyword)}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
            alert('加载陪玩师列表失败，请刷新页面重试');
            return;
        }
        
        const result = await response.json();
        if (result.code === 200) {
            renderCompanionTable(result.data);
            companionTotal = result.total || 0;
            renderPagination('companions', result.page, Math.ceil(result.total / companionPageSize), result.total);
        } else {
            alert('加载陪玩师列表失败: ' + (result.message || '未知错误'));
        }
    } catch (error) {
        alert('加载陪玩师列表失败，请检查网络连接');
    }
}

/**
 * 渲染陪玩师表格
 * @param {Array} companions - 陪玩师列表数据
 */
function renderCompanionTable(companions) {
    const tbody = document.getElementById('companionTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (!companions || companions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 20px; color: #999;">暂无陪玩师数据</td></tr>';
        return;
    }

    companions.forEach(companion => {
        const tr = document.createElement('tr');
        const avatar = companion.avatar || '';
        const tags = companion.tags || '-';
        const price = companion.price ? `¥${companion.price}` : '-';
        const gameTypes = companion.gameTypes || '-';
        const rating = companion.rating ? companion.rating.toFixed(1) : '-';
        const isOnline = companion.isOnline;
        const statusHtml = isOnline ? '<span class="status online">在线</span>' : '<span class="status offline">离线</span>';

        tr.innerHTML = `
            <td>${avatar ? `<img src="${avatar}" alt="头像" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" onerror="handleImageError(this)">` : '<div style="width: 40px; height: 40px;"></div>'}</td>
            <td>${escapeHtml(companion.nickname)}</td>
            <td>${escapeHtml(tags)}</td>
            <td>${price}</td>
            <td>${escapeHtml(gameTypes)}</td>
            <td>${rating}</td>
            <td>${statusHtml}</td>
            <td>
                <button class="btn-icon" onclick="editCompanion(${companion.id})" title="编辑">
                    <i class="fa fa-pencil"></i>
                </button>
                <button class="btn-icon btn-danger" onclick="deleteCompanion(${companion.id})" title="删除">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

}

/**
 * 预览陪玩师头像
 * @param {HTMLElement} inputElement - 文件输入元素
 */
/**
 * 预览陪玩师头像（上传前预览）
 */
/**
 * 通用头像预览处理函数（统一处理4个页面的头像逻辑）
 * @param {File} file - 选择的图片文件
 * @param {string} previewContainerId - 预览容器ID
 * @param {string} fileInputId - 文件输入框ID
 * @param {string} hiddenInputId - 隐藏字段ID
 */
function handleAvatarPreview(file, previewContainerId, fileInputId, hiddenInputId) {
    if (!file) return;
    
    // 验证文件大小（5MB）
    if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过5MB');
        const fileInput = document.getElementById(fileInputId);
        if (fileInput) fileInput.value = '';
        return;
    }
    
    // 使用Canvas生成临时预览
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // 计算缩放比例
            const maxSize = 300;
            let width = img.width;
            let height = img.height;
            
            if (width > height) {
                if (width > maxSize) {
                    height *= maxSize / width;
                    width = maxSize;
                }
            } else {
                if (height > maxSize) {
                    width *= maxSize / height;
                    height = maxSize;
                }
            }
            
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            
            const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
            
            const previewContainer = document.getElementById(previewContainerId);
            const fileInput = document.getElementById(fileInputId);
            const hiddenInput = document.getElementById(hiddenInputId);
            
            if (!previewContainer) return;
            
            // 先清空所有相关元素
            previewContainer.innerHTML = '';
            if (fileInput) fileInput.value = '';
            if (hiddenInput) hiddenInput.value = '';
            
            // 创建圆形容器
            const avatarWrapper = document.createElement('div');
            avatarWrapper.style.cssText = 'position: relative; display: inline-block; width: 60px; height: 60px;';
            
            // 创建图片元素
            const avatarImg = document.createElement('img');
            avatarImg.src = dataUrl;
            avatarImg.style.cssText = 'width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid #e5e7eb;';
            
            // 创建删除按钮
            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.onclick = function() {
                previewContainer.innerHTML = '';
                if (fileInput) fileInput.value = '';
                if (hiddenInput) hiddenInput.value = '';
            };
            deleteBtn.style.cssText = `
                position: absolute;
                top: -4px;
                right: -4px;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #ef4444;
                color: white;
                border: 2px solid white;
                cursor: pointer;
                font-size: 14px;
                line-height: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0;
            `;
            deleteBtn.textContent = '×';
            
            // 组装元素
            avatarWrapper.appendChild(avatarImg);
            avatarWrapper.appendChild(deleteBtn);
            previewContainer.appendChild(avatarWrapper);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

/**
 * 通用头像显示函数（用于编辑页面展示已有头像）
 * @param {string} avatarUrl - 头像URL
 * @param {string} previewContainerId - 预览容器ID
 * @param {string} fileInputId - 文件输入框ID
 * @param {string} hiddenInputId - 隐藏字段ID
 */
function showExistingAvatar(avatarUrl, previewContainerId, fileInputId, hiddenInputId) {
    const previewContainer = document.getElementById(previewContainerId);
    const hiddenInput = document.getElementById(hiddenInputId);
    const fileInput = document.getElementById(fileInputId);
    
    // 先清空所有相关元素
    if (previewContainer) previewContainer.innerHTML = '';
    if (hiddenInput) hiddenInput.value = '';
    if (fileInput) fileInput.value = '';
    
    // 如果有头像，显示预览
    if (avatarUrl && avatarUrl.trim() !== '') {
        // 设置隐藏字段
        if (hiddenInput) hiddenInput.value = avatarUrl;
        
        // 创建预览容器
        if (previewContainer) {
            // 创建圆形容器
            const avatarWrapper = document.createElement('div');
            avatarWrapper.style.cssText = 'position: relative; display: inline-block; width: 60px; height: 60px;';
            
            // 创建图片元素
            const avatarImg = document.createElement('img');
            avatarImg.src = avatarUrl;
            avatarImg.style.cssText = 'width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid #e5e7eb;';
            
            // 添加错误处理
            avatarImg.onerror = function() {
                this.style.display = 'none';
            };
            
            // 创建删除按钮
            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.onclick = function() {
                if (previewContainer) previewContainer.innerHTML = '';
                if (fileInput) fileInput.value = '';
                if (hiddenInput) hiddenInput.value = '';
            };
            deleteBtn.style.cssText = `
                position: absolute;
                top: -4px;
                right: -4px;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #ef4444;
                color: white;
                border: 2px solid white;
                cursor: pointer;
                font-size: 14px;
                line-height: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0;
            `;
            deleteBtn.textContent = '×';
            
            // 组装元素
            avatarWrapper.appendChild(avatarImg);
            avatarWrapper.appendChild(deleteBtn);
            previewContainer.appendChild(avatarWrapper);
        }
    }
}

/**
 * 预览陪玩师音频（全局函数，与系统设置逻辑一致）
 * @param {HTMLElement} inputElement - 文件输入元素
 */
function previewCompanionAudio(inputElement) {
    const file = inputElement.files[0];
    if (!file) return;
    
    // 验证文件大小（10MB）
    if (file.size > 10 * 1024 * 1024) {
        alert('音频文件大小不能超过10MB');
        inputElement.value = '';
        return;
    }
    
    // 判断是新增还是编辑
    const isAdd = inputElement.id === 'addCompanionVoiceIntro_file';
    const previewId = isAdd ? 'addCompanionVoiceIntro_preview' : 'editCompanionVoiceIntro_preview';
    
    // 创建URL用于本地预览
    const objectUrl = URL.createObjectURL(file);
    
    const previewContainer = document.getElementById(previewId);
    if (!previewContainer) return;
    
    // 创建音频播放器
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.src = objectUrl;
    audio.style.cssText = 'width: 100%; max-width: 300px;';
    
    // 创建删除按钮（调用全局函数，与系统设置逻辑一致）
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.textContent = '×';
    deleteBtn.onclick = function() { removeFilePreview(previewId, ''); };
    deleteBtn.style.cssText = `
        margin-left: 8px;
        padding: 4px 8px;
        background: #ef4444;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
    `;
    
    previewContainer.innerHTML = '';
    previewContainer.appendChild(audio);
    previewContainer.appendChild(deleteBtn);
}

/**
 * 预览陪玩师视频（全局函数，与系统设置逻辑一致）
 * @param {HTMLElement} inputElement - 文件输入元素
 */
function previewCompanionVideo(inputElement) {
    const file = inputElement.files[0];
    if (!file) return;
    
    // 验证文件大小（10MB）
    if (file.size > 10 * 1024 * 1024) {
        alert('视频文件大小不能超过10MB');
        inputElement.value = '';
        return;
    }
    
    // 判断是新增还是编辑
    const isAdd = inputElement.id === 'addCompanionVideoUrl_file';
    const previewId = isAdd ? 'addCompanionVideoUrl_preview' : 'editCompanionVideoUrl_preview';
    
    // 创建URL用于本地预览
    const objectUrl = URL.createObjectURL(file);
    
    const previewContainer = document.getElementById(previewId);
    if (!previewContainer) return;
    
    // 创建视频播放器
    const video = document.createElement('video');
    video.controls = true;
    video.src = objectUrl;
    video.style.cssText = 'width: 100%; max-width: 400px; max-height: 250px; border-radius: 8px;';
    
    // 创建删除按钮（调用全局函数，与系统设置逻辑一致）
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.textContent = '×';
    deleteBtn.onclick = function() { removeFilePreview(previewId, ''); };
    deleteBtn.style.cssText = `
        margin-top: 8px;
        padding: 4px 8px;
        background: #ef4444;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
    `;
    
    previewContainer.innerHTML = '';
    previewContainer.appendChild(video);
    previewContainer.appendChild(deleteBtn);
}

/**
 * 添加陪玩师
 */
async function saveCompanion() {
    const nickname = document.getElementById('addCompanionNickname').value.trim();
    const gameTypes = document.getElementById('addCompanionGameTypes').value.trim();
    const description = document.getElementById('addCompanionDescription').value.trim();
    const tags = document.getElementById('addCompanionTags').value.trim();
    const price = document.getElementById('addCompanionPrice').value;
    const rating = document.getElementById('addCompanionRating').value;
    const ranks = document.getElementById('addCompanionRanks').value.trim();
    const servers = document.getElementById('addCompanionServers').value.trim();
    const isOnline = document.getElementById('addCompanionIsOnline').value;
    
    // 获取文件
    const avatarFile = document.getElementById('addCompanionAvatar_file').files[0];
    const voiceIntroFile = document.getElementById('addCompanionVoiceIntro_file').files[0];
    const videoUrlFile = document.getElementById('addCompanionVideoUrl_file').files[0];
    
    try {
        // 使用FormData传递所有数据（包含文件）
        const formData = new FormData();
        formData.append('nickname', nickname || '');
        formData.append('gameTypes', gameTypes || '');
        formData.append('description', description || '');
        formData.append('tags', tags || '');
        formData.append('price', price || '0');
        formData.append('rating', rating || '');
        formData.append('ranks', ranks || '');
        formData.append('servers', servers || '');
        formData.append('isOnline', isOnline);
        
        // 如果有头像文件，添加到FormData
        if (avatarFile) {
            formData.append('avatarFile', avatarFile);
        }
        
        // 如果有音频文件，添加到FormData
        if (voiceIntroFile) {
            formData.append('voiceIntroFile', voiceIntroFile);
        }
        
        // 如果有视频文件，添加到FormData
        if (videoUrlFile) {
            formData.append('videoUrlFile', videoUrlFile);
        }
        
        // 调用新增接口
        const response = await fetch('/api/v1/admin/companions', {
            method: 'POST',
            body: formData
            // 注意：使用FormData时不要设置Content-Type，浏览器会自动设置为multipart/form-data
        });
        
        const result = await response.json();
        
        if (result.code !== 200) {
            alert('添加失败: ' + (result.message || '未知错误'));
            return;
        }
        
        alert('添加成功！');
        closeModal('addCompanionModal');
        
        // 清空表单
        clearCompanionForm('add');
        
        // 延迟300ms后刷新列表，回到第一页
        setTimeout(() => {
            loadCompanionList(1, companionKeyword);
        }, 300);
        
    } catch (error) {
        alert('保存失败，请检查网络连接');
    }
}

/**
 * 编辑管理员（打开编辑弹窗）
 * @param {number} id - 管理员ID
 */
async function editAdmin(id) {
    try {
        const response = await fetch(`/api/v1/admin/admin/${id}`);
        
        if (!response.ok) {
            alert('获取管理员信息失败');
            return;
        }
        
        const admin = await response.json();
        
        if (!admin) {
            alert('管理员不存在');
            return;
        }
        
        // 填充表单数据
        document.getElementById('editAdminId').value = admin.id;
        document.getElementById('editAdminUsername').value = admin.username || '';
        document.getElementById('editAdminRole').value = admin.role || '2';
        
        // 先清空头像预览容器（防止显示上一次的数据）
        const avatarPreview = document.getElementById('editAdminAvatar_preview');
        if (avatarPreview) {
            avatarPreview.innerHTML = '';
        }
        document.getElementById('editAdminAvatar').value = '';
        document.getElementById('editAdminAvatar_file').value = '';
        
        // 设置头像预览（圆形样式）
        if (admin.avatar && admin.avatar.trim() !== '') {
            renderImagePreview('editAdminAvatar_preview', admin.avatar, true);  // true=圆形
            document.getElementById('editAdminAvatar').value = admin.avatar;
        }
        
        // 打开弹窗
        openModal('editAdmin');
        
    } catch (error) {
        alert('加载失败，请检查网络连接');
    }
}

/**
 * 更新管理员
 */
async function updateAdmin() {
    try {
        const id = document.getElementById('editAdminId').value;
        const username = document.getElementById('editAdminUsername').value.trim();
        const password = document.getElementById('editAdminPassword').value.trim();
        const role = parseInt(document.getElementById('editAdminRole').value);
        const avatar = document.getElementById('editAdminAvatar').value;
        
        if (!id) {
            alert('管理员ID缺失');
            return;
        }
        
        // 构建FormData
        const formData = new FormData();
        if (username) {
            formData.append('username', username);
        }
        if (role) {
            formData.append('role', role);
        }
        if (avatar) {
            formData.append('avatar', avatar);
        }
        if (password) {
            formData.append('password', password);
        }
        
        // 如果有新的头像文件，也添加到formData
        const avatarFileInput = document.getElementById('editAdminAvatar_file');
        if (avatarFileInput && avatarFileInput.files[0]) {
            formData.append('avatarFile', avatarFileInput.files[0]);
        }
        
        const response = await fetch(`/api/v1/admin/admin/${id}`, {
            method: 'PUT',
            body: formData
        });
        
        const result = await response.json();
        
        if (!result.success) {
            alert('更新失败: ' + result.message);
            return;
        }
        
        alert('更新成功！');
        closeModal('editAdminModal');
        
        // 清空表单
        document.getElementById('editAdminId').value = '';
        document.getElementById('editAdminUsername').value = '';
        document.getElementById('editAdminPassword').value = '';
        document.getElementById('editAdminRole').value = '2';
        document.getElementById('editAdminAvatar_file').value = '';
        document.getElementById('editAdminAvatar_preview').innerHTML = '';
        document.getElementById('editAdminAvatar').value = '';
        
        // 刷新管理员列表，保持当前页
        loadAdminList(adminPage, adminKeyword);
        
    } catch (error) {
        alert('更新失败，请检查网络连接');
    }
}

/**
 * 删除管理员
 * @param {number} id - 管理员ID
 */
async function deleteAdmin(id) {
    if (!confirm('确定要删除该管理员吗？')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/v1/admin/admin/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (!result.success) {
            alert('删除失败: ' + result.message);
            return;
        }
        
        alert('删除成功！');
        
        // 刷新管理员列表，保持当前页
        loadAdminList(adminPage, adminKeyword);
        
    } catch (error) {
        alert('删除失败，请检查网络连接');
    }
}

/**
 * 移除编辑管理员头像
 */
function removeEditAdminAvatar() {
    document.getElementById('editAdminAvatar_preview').innerHTML = '';
    document.getElementById('editAdminAvatar').value = '';
    document.getElementById('editAdminAvatar_file').value = '';
}

/**
 * 编辑陪玩师（打开编辑弹窗）
 * @param {number} id - 陪玩师ID
 */
async function editCompanion(id) {
    try {
        // 获取陪玩师详情
        const response = await fetch(`/api/v1/companions/${id}`);
        const result = await response.json();
        
        if (result.code !== 200 || !result.data) {
            alert('陪玩师不存在');
            return;
        }
        
        const companion = result.data;
        
        // 填充表单数据
        document.getElementById('editCompanionId').value = companion.id;
        document.getElementById('editCompanionNickname').value = companion.nickname || '';
        document.getElementById('editCompanionGameTypes').value = companion.gameTypes || '';
        document.getElementById('editCompanionDescription').value = companion.description || '';
        document.getElementById('editCompanionTags').value = companion.tags || '';
        document.getElementById('editCompanionPrice').value = companion.price || '';
        document.getElementById('editCompanionRating').value = companion.rating || '';
        document.getElementById('editCompanionRanks').value = companion.ranks || '';
        document.getElementById('editCompanionServers').value = companion.servers || '';
        document.getElementById('editCompanionVoiceIntro').value = companion.voiceIntro || '';
        document.getElementById('editCompanionVideoUrl').value = companion.videoUrl || '';
        document.getElementById('editCompanionIsOnline').value = companion.isOnline ? 'true' : 'false';
        
        // 先清空头像预览容器（防止显示上一次的数据）
        const avatarPreview = document.getElementById('editCompanionAvatar_preview');
        if (avatarPreview) {
            avatarPreview.innerHTML = '';
        }
        document.getElementById('editCompanionAvatar').value = '';
        document.getElementById('editCompanionAvatar_file').value = '';
        
        // 清空音频预览容器
        const audioPreview = document.getElementById('editCompanionVoiceIntro_preview');
        if (audioPreview) {
            audioPreview.innerHTML = '';
        }
        document.getElementById('editCompanionVoiceIntro').value = '';
        document.getElementById('editCompanionVoiceIntro_file').value = '';
        
        // 清空视频预览容器
        const videoPreview = document.getElementById('editCompanionVideoUrl_preview');
        if (videoPreview) {
            videoPreview.innerHTML = '';
        }
        document.getElementById('editCompanionVideoUrl').value = '';
        document.getElementById('editCompanionVideoUrl_file').value = '';
        
        // 设置头像预览（圆形样式）
        if (companion.avatar && companion.avatar.trim() !== '') {
            renderImagePreview('editCompanionAvatar_preview', companion.avatar, true);  // true=圆形
            document.getElementById('editCompanionAvatar').value = companion.avatar;
        }
        
        // 设置音频预览
        if (companion.voiceIntro) {
            const audioPreviewContainer = document.getElementById('editCompanionVoiceIntro_preview');
            if (audioPreviewContainer) {
                const audio = document.createElement('audio');
                audio.controls = true;
                audio.src = companion.voiceIntro;
                audio.style.cssText = 'width: 100%; max-width: 300px;';
                
                // 创建删除按钮（调用全局函数，与系统设置逻辑一致）
                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.textContent = '×';
                deleteBtn.onclick = function() { removeFilePreview('editCompanionVoiceIntro_preview', ''); };
                deleteBtn.style.cssText = `
                    margin-left: 8px;
                    padding: 4px 8px;
                    background: #ef4444;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                `;
                
                audioPreviewContainer.innerHTML = '';
                audioPreviewContainer.appendChild(audio);
                audioPreviewContainer.appendChild(deleteBtn);
            }
        }
        
        // 设置视频预览
        if (companion.videoUrl) {
            const videoPreviewContainer = document.getElementById('editCompanionVideoUrl_preview');
            if (videoPreviewContainer) {
                const video = document.createElement('video');
                video.controls = true;
                video.src = companion.videoUrl;
                video.style.cssText = 'width: 100%; max-width: 400px; max-height: 250px; border-radius: 8px;';
                
                // 创建删除按钮（调用全局函数，与系统设置逻辑一致）
                const deleteBtn = document.createElement('button');
                deleteBtn.type = 'button';
                deleteBtn.textContent = '×';
                deleteBtn.onclick = function() { removeFilePreview('editCompanionVideoUrl_preview', ''); };
                deleteBtn.style.cssText = `
                    margin-top: 8px;
                    padding: 4px 8px;
                    background: #ef4444;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                `;
                
                videoPreviewContainer.innerHTML = '';
                videoPreviewContainer.appendChild(video);
                videoPreviewContainer.appendChild(deleteBtn);
            }
        }
        
        // 打开弹窗
        openModal('editCompanion');
        
    } catch (error) {
        alert('加载失败，请检查网络连接');
    }
}

/**
 * 更新陪玩师
 */
async function updateCompanion() {
    try {
        const id = document.getElementById('editCompanionId').value;
        const nickname = document.getElementById('editCompanionNickname').value.trim();
        const gameTypes = document.getElementById('editCompanionGameTypes').value.trim();
        const description = document.getElementById('editCompanionDescription').value.trim();
        const tags = document.getElementById('editCompanionTags').value.trim();
        const price = document.getElementById('editCompanionPrice').value;
        const rating = document.getElementById('editCompanionRating').value;
        const ranks = document.getElementById('editCompanionRanks').value.trim();
        const servers = document.getElementById('editCompanionServers').value.trim();
        const isOnline = document.getElementById('editCompanionIsOnline').value;
        
        // 获取文件
        const avatarFile = document.getElementById('editCompanionAvatar_file').files[0];
        const voiceIntroFile = document.getElementById('editCompanionVoiceIntro_file').files[0];
        const videoUrlFile = document.getElementById('editCompanionVideoUrl_file').files[0];
        
        // 使用FormData传递所有数据（包含文件）
        const formData = new FormData();
        formData.append('nickname', nickname || '');
        formData.append('gameTypes', gameTypes || '');
        formData.append('description', description || '');
        formData.append('tags', tags || '');
        formData.append('price', price || '');
        formData.append('rating', rating || '');
        formData.append('ranks', ranks || '');
        formData.append('servers', servers || '');
        formData.append('isOnline', isOnline);
        
        // 如果有头像文件，添加到FormData
        if (avatarFile) {
            formData.append('avatarFile', avatarFile);
        }
        
        // 如果有音频文件，添加到FormData
        if (voiceIntroFile) {
            formData.append('voiceIntroFile', voiceIntroFile);
        }
        
        // 如果有视频文件，添加到FormData
        if (videoUrlFile) {
            formData.append('videoUrlFile', videoUrlFile);
        }
        
        // 调用更新接口
        const response = await fetch(`/api/v1/admin/companions/${id}`, {
            method: 'PUT',
            body: formData
            // 注意：使用FormData时不要设置Content-Type，浏览器会自动设置为multipart/form-data
        });
        
        const result = await response.json();
        
        if (result.code !== 200) {
            alert('更新失败: ' + (result.message || '未知错误'));
            return;
        }
        
        alert('更新成功！');
        closeModal('editCompanionModal');
        
        // 清空表单
        clearCompanionForm('edit');
        
        // 延迟300ms后刷新当前页
        setTimeout(() => {
            loadCompanionList(companionPage, companionKeyword);
        }, 300);
        
    } catch (error) {
        alert('更新失败，请检查网络连接');
    }
}

/**
 * 删除陪玩师
 * @param {number} id - 陪玩师ID
 */
async function deleteCompanion(id) {
    if (!confirm('确定要删除该陪玩师吗？')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/v1/admin/companions/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.code !== 200) {
            alert('删除失败: ' + (result.message || '未知错误'));
            return;
        }
        
        alert('删除成功！');
        
        // 延迟300ms后刷新当前页
        setTimeout(() => {
            loadCompanionList(companionPage, companionKeyword);
        }, 300);
        
    } catch (error) {
        alert('删除失败，请检查网络连接');
    }
}

/**
 * 清空陪玩师表单
 * @param {string} type - 表单类型（add/edit）
 */
function clearCompanionForm(type) {
    const prefix = type === 'add' ? 'addCompanion' : 'editCompanion';
    
    // 安全地设置表单字段值（添加空值检查）
    const fields = ['Nickname', 'GameTypes', 'Description', 'Tags', 'Price', 'Rating', 'Ranks', 'Servers', 'VoiceIntro', 'VideoUrl'];
    fields.forEach(field => {
        const element = document.getElementById(`${prefix}${field}`);
        if (element) {
            element.value = '';
        }
    });
    
    // 清空音频和视频预览
    const audioPreview = document.getElementById(`${prefix}VoiceIntro_preview`);
    if (audioPreview) {
        audioPreview.innerHTML = '';
    }
    const videoPreview = document.getElementById(`${prefix}VideoUrl_preview`);
    if (videoPreview) {
        videoPreview.innerHTML = '';
    }
    
    // 设置头像隐藏字段
    const avatarElement = document.getElementById(`${prefix}Avatar`);
    if (avatarElement) {
        avatarElement.value = '';
    }
    
    // 重置头像预览容器
    const previewContainer = document.getElementById(`${prefix}Avatar_preview`);
    if (previewContainer) {
        previewContainer.innerHTML = '';
    }
    
    // 清空文件选择
    const fileInput = document.getElementById(`${prefix}Avatar_file`);
    if (fileInput) {
        fileInput.value = '';
    }
}



document.addEventListener('DOMContentLoaded', function() {
    // 初始化第一个板块
    showSection('companions');
    
    // 加载陪玩师列表
    loadCompanionList();

    // 移动端：点击遮罩层关闭侧边栏
    const overlay = document.getElementById('sidebarOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }
    
    // 加载当前管理员信息
    loadCurrentAdminInfo();
    
    // 根据角色控制菜单显示（只有超级管理员才能看到管理员管理）
    initMenuByRole();
});

/**
 * 根据角色初始化菜单显示
 */
function initMenuByRole() {
    const role = localStorage.getItem('role');
    const adminMenuLink = document.querySelector('.sidebar-menu a[onclick*="admins"]');
    
    if (adminMenuLink) {
        // role === 1 表示超级管理员，role === 2 表示普通管理员
        if (role === '1') {
            // 超级管理员：显示管理员管理菜单
            adminMenuLink.style.display = '';
        } else {
            // 普通管理员：隐藏管理员管理菜单
            adminMenuLink.style.display = 'none';
        }
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
            
            // 填充表单数据
            for (const [key, value] of Object.entries(configs)) {
                const element = document.getElementById(key);
                if (element) {
                    element.value = value || '';
                    
                    // 如果是图片字段且有值，且预览区域还没有内容，才生成缩略图
                    if (value && (key === 'logo_path' || key === 'background_image' || 
                                  key === 'intro_image' || key === 'wechat_qrcode')) {
                        const previewContainer = document.getElementById(key + '_preview');
                        // 只有预览区域为空时才生成
                        if (previewContainer && !previewContainer.innerHTML.trim()) {
                            generateThumbnailFromUrl(key + '_preview', value);
                        }
                    }
                }
            }
            
            // 更新侧边栏的 Logo 和公司名称
            if (configs.logo_path) {
                const sidebarLogo = document.getElementById('sidebarLogo');
                if (sidebarLogo) {
                    sidebarLogo.src = configs.logo_path;
                }
            }
            if (configs.company_nickname) {
                const sidebarCompanyName = document.getElementById('sidebarCompanyName');
                if (sidebarCompanyName) {
                    sidebarCompanyName.textContent = configs.company_nickname;
                }
            }
        }
    } catch (error) {
        alert('加载配置失败');
    }
}

/**
 * 从URL加载图片并生成缩略图预览
 * @param {string} previewId - 预览容器ID
 * @param {string} imageUrl - 图片URL
 */
function generateThumbnailFromUrl(previewId, imageUrl) {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // 允许跨域
    
    img.onload = function() {
        
        // 创建Canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // 计算缩放比例
        const maxSize = 300;
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
            if (width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
            }
        } else {
            if (height > maxSize) {
                width *= maxSize / height;
                height = maxSize;
            }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // 绘制缩略图
        ctx.drawImage(img, 0, 0, width, height);
        
        // 转换为DataURL并显示
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        showLocalPreview(previewId, dataUrl, imageUrl);
    };
    
    img.onerror = function() {
        // 加载失败时静默处理
    };
    
    img.src = imageUrl;
}

/**
 * 保存系统配置
 */
async function saveSystemConfig() {
    try {
        // 先上传图片（如果有新选择的图片）
        const imageFields = ['logo_path', 'background_image', 'intro_image', 'wechat_qrcode'];
        
        for (const fieldName of imageFields) {
            const fileInput = document.getElementById(fieldName + '_file');
            const file = fileInput.files[0];
            
            if (file) {
                // 上传新图片
                const uploadFormData = new FormData();
                uploadFormData.append('file', file);
                uploadFormData.append('fieldName', fieldName);
                
                const uploadResponse = await fetch('/api/v1/admin/upload/image', {
                    method: 'POST',
                    body: uploadFormData
                });
                
                const uploadResult = await uploadResponse.json();
                
                if (!uploadResult.success) {
                    alert('图片上传失败: ' + uploadResult.message);
                    return;
                }
                
                // 更新隐藏字段的值
                document.getElementById(fieldName).value = uploadResult.url;
            }
        }
        
        // 收集表单数据
        const formData = {
            company_name: document.getElementById('company_name').value,
            company_nickname: document.getElementById('company_nickname').value,
            company_intro: document.getElementById('company_intro').value,
            company_description: document.getElementById('company_description').value,
            logo_path: document.getElementById('logo_path').value,
            background_image: document.getElementById('background_image').value,
            intro_image: document.getElementById('intro_image').value,
            contact_person: document.getElementById('contact_person').value,
            phone_number: document.getElementById('phone_number').value,
            service_time: document.getElementById('service_time').value,
            wechat_id: document.getElementById('wechat_id').value,
            wechat_qrcode: document.getElementById('wechat_qrcode').value
        };
        
        // 保存配置
        const response = await fetch('/api/v1/admin/config', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            alert('配置保存成功！');
            loadSystemConfig(); // 重新加载配置
        } else {
            const errorText = await response.text();
            alert('配置保存失败: ' + errorText);
        }
    } catch (error) {
        console.error('保存系统配置失败:', error);
        alert('配置保存失败，请检查网络连接');
    }
}

/**
 * 显示图片预览（圆形头像版本）
 * @param {string} previewId - 预览容器ID
 * @param {string} imageUrl - 图片URL
 */
function showAdminAvatarPreview(previewId, imageUrl) {
    const previewContainer = document.getElementById(previewId);
    if (!previewContainer) return;
    
    previewContainer.innerHTML = `
        <div style="position: relative; display: inline-block;">
            <img src="${imageUrl}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid #e5e7eb;" onerror="handleImageError(this, '无', false)" />
        </div>
    `;
}

/**
 * 删除添加管理员头像预览（已弃用，保留兼容）
 */
function removeAddAdminAvatar() {
    const previewContainer = document.getElementById('addAdminAvatar_preview');
    const fileInput = document.getElementById('addAdminAvatar_file');
    
    if (previewContainer) {
        previewContainer.innerHTML = '';
    }
    if (fileInput) {
        fileInput.value = '';
    }
}



/**
 * 搜索管理员
 */
async function searchAdmin() {
    const username = document.getElementById('adminSearchInput').value.trim();
    // 搜索时重置到第一页
    loadAdminList(1, username);
}

/**
 * 清空搜索并重新加载列表
 */
function clearAdminSearch() {
    document.getElementById('adminSearchInput').value = '';
    document.getElementById('adminSearchClearBtn').style.display = 'none';
    loadAdminList(1, '');
}

// 监听搜索框输入，显示/隐藏清空按钮
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('adminSearchInput');
    const clearBtn = document.getElementById('adminSearchClearBtn');
    
    if (searchInput && clearBtn) {
        searchInput.addEventListener('input', function() {
            clearBtn.style.display = this.value ? 'block' : 'none';
        });
    }
    
    // 监听陪玩师搜索框输入
    const companionSearchInput = document.getElementById('companionSearchInput');
    const companionClearBtn = document.getElementById('companionSearchClearBtn');
    
    if (companionSearchInput && companionClearBtn) {
        companionSearchInput.addEventListener('input', function() {
            companionClearBtn.style.display = this.value ? 'block' : 'none';
        });
    }
});

/**
 * 搜索陪玩师（按昵称、标签、游戏类型）
 */
async function searchCompanion() {
    const keyword = document.getElementById('companionSearchInput').value.trim();
    // 搜索时重置到第一页
    loadCompanionList(1, keyword);
}

/**
 * 清空陪玩师搜索并重新加载列表
 */
function clearCompanionSearch() {
    document.getElementById('companionSearchInput').value = '';
    document.getElementById('companionSearchClearBtn').style.display = 'none';
    loadCompanionList(1, '');
}

/**
 * 加载管理员列表（分页）
 */
async function loadAdminList(page = 1, keyword = '') {
    adminPage = page;
    adminKeyword = keyword;
    
    try {
        let url = `/api/v1/admin/admins?page=${page}&size=${adminPageSize}`;
        if (keyword) {
            url += `&username=${encodeURIComponent(keyword)}`;
        }
        
        const response = await fetch(url);
        if (response.ok) {
            const result = await response.json();
            if (result.code === 200) {
                renderAdminTable(result.data);
                adminTotal = result.total || 0;
                renderPagination('admins', result.page, Math.ceil(result.total / adminPageSize), result.total);
            }
        }
    } catch (error) {
        console.error('加载管理员列表失败:', error);
    }
}

/**
 * 渲染管理员表格
 * @param {Array} admins - 管理员列表数据
 */
function renderAdminTable(admins) {
    const tbody = document.getElementById('adminTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (!admins || admins.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px; color: #999;">暂无管理员数据</td></tr>';
        return;
    }
    
    admins.forEach(admin => {
        const tr = document.createElement('tr');
        const roleText = admin.role === 1 ? '超级管理员' : '管理员';
        const roleClass = admin.role === 1 ? 'badge-danger' : 'badge-info';
        const avatar = admin.avatar || ''; // 没有头像时显示空
        
        tr.innerHTML = `
            <td style="width: 20%">${avatar ? `<img src="${avatar}" alt="头像" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" onerror="handleImageError(this)">` : ''}</td>
            <td style="width: 30%">${escapeHtml(admin.username)}</td>
            <td style="width: 30%"><span class="badge ${roleClass}">${roleText}</span></td>
            <td style="width: 20%">
                <button class="btn-icon" onclick="editAdmin(${admin.id})" title="编辑">
                    <i class="fa fa-pencil"></i>
                </button>
                <button class="btn-icon btn-danger" onclick="deleteAdmin(${admin.id})" title="删除">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

/**
 * 渲染分页控件
 * @param {string} type - 类型: 'companions' 或 'admins'
 * @param {number} currentPage - 当前页码
 * @param {number} totalPages - 总页数
 * @param {number} totalItems - 总条数
 */
function renderPagination(type, currentPage, totalPages, totalItems) {
    const paginationId = type === 'companions' ? 'companionPagination' : 'adminPagination';
    const pageNumbersId = type === 'companions' ? 'companionPageNumbers' : 'adminPageNumbers';
    const infoId = type === 'companions' ? 'companionPaginationInfo' : 'adminPaginationInfo';
    
    const pagination = document.getElementById(paginationId);
    const pageNumbers = document.getElementById(pageNumbersId);
    const paginationInfo = document.getElementById(infoId);
    
    if (!pagination || !pageNumbers || !paginationInfo) return;
    
    // 更新分页信息
    const startItem = (currentPage - 1) * (type === 'companions' ? companionPageSize : adminPageSize) + 1;
    const endItem = Math.min(currentPage * (type === 'companions' ? companionPageSize : adminPageSize), totalItems);
    paginationInfo.textContent = `共 ${totalItems} 条记录，第 ${startItem}-${endItem} 条`;
    
    // 渲染页码按钮
    pageNumbers.innerHTML = '';
    
    // 强制显示分页组件，确保可见
    pagination.style.display = 'flex';
    pagination.style.visibility = 'visible';
    pagination.style.opacity = '1';
    
    // 同时确保分页容器也显示
    const paginationWrapper = pagination.closest('.pagination-wrapper');
    if (paginationWrapper) {
        paginationWrapper.style.display = 'flex';
        paginationWrapper.style.visibility = 'visible';
        paginationWrapper.style.opacity = '1';
    }
    
    // 即使只有1页也显示页码按钮
    if (totalPages <= 1) {
        addPageNumber(pageNumbers, 1, type, true);
    } else {
        // 计算要显示的页码范围
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);
        
        // 确保至少显示5个页码（如果有足够的页数）
        if (endPage - startPage < 4) {
            if (startPage === 1) {
                endPage = Math.min(5, totalPages);
            } else if (endPage === totalPages) {
                startPage = Math.max(1, totalPages - 4);
            }
        }
        
        // 添加第一页和省略号
        if (startPage > 1) {
            addPageNumber(pageNumbers, 1, type);
            if (startPage > 2) {
                addEllipsis(pageNumbers);
            }
        }
        
        // 添加中间的页码
        for (let i = startPage; i <= endPage; i++) {
            addPageNumber(pageNumbers, i, type, i === currentPage);
        }
        
        // 添加省略号和最后一页
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                addEllipsis(pageNumbers);
            }
            addPageNumber(pageNumbers, totalPages, type);
        }
    }
    
    // 更新上一页/下一页按钮状态
    const prevBtn = pagination.querySelector('.pagination-prev');
    const nextBtn = pagination.querySelector('.pagination-next');
    if (prevBtn) {
        prevBtn.disabled = currentPage <= 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentPage >= totalPages;
    }
}

/**
 * 添加页码按钮
 */
function addPageNumber(container, pageNum, type, isActive = false) {
    const btn = document.createElement('button');
    btn.className = 'pagination-number' + (isActive ? ' active' : '');
    btn.textContent = pageNum;
    btn.onclick = () => goToPage(type, pageNum);
    container.appendChild(btn);
}

/**
 * 添加省略号
 */
function addEllipsis(container) {
    const ellipsis = document.createElement('span');
    ellipsis.textContent = '...';
    ellipsis.style.padding = '0 4px';
    ellipsis.style.color = '#6b7280';
    container.appendChild(ellipsis);
}

/**
 * 跳转到指定页码
 */
function goToPage(type, pageNum) {
    if (type === 'companions') {
        loadCompanionList(pageNum, companionKeyword);
    } else if (type === 'admins') {
        loadAdminList(pageNum, adminKeyword);
    }
}

/**
 * HTML转义，防止XSS
 * @param {string} text - 待转义文本
 * @returns {string} 转义后的文本
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * 保存管理员（新增）
 */
async function saveAdmin() {
    // 获取表单数据
    const username = document.getElementById('addAdminUsername').value.trim();
    const password = document.getElementById('addAdminPassword').value;
    const role = parseInt(document.getElementById('addAdminRole').value);
    const avatarFile = document.getElementById('addAdminAvatar_file').files[0];
    
    // 校验
    if (!username) {
        alert('请输入用户名');
        return;
    }
    if (!password) {
        alert('请输入密码');
        return;
    }
    
    try {
        // 使用FormData传递所有数据（包含文件）
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('role', role);
        formData.append('isActive', true);
        
        // 如果有头像文件，添加到FormData
        if (avatarFile) {
            formData.append('avatarFile', avatarFile);
        }
        
        // 调用新增接口
        const response = await fetch('/api/v1/admin/admin', {
            method: 'POST',
            body: formData
            // 注意：使用FormData时不要设置Content-Type，浏览器会自动设置为multipart/form-data
        });
        
        const result = await response.json();
        
        if (!result.success) {
            alert('添加失败: ' + result.message);
            return;
        }
        
        alert('添加成功！');
        closeModal('addAdminModal');
        
        // 清空表单
        document.getElementById('addAdminUsername').value = '';
        document.getElementById('addAdminPassword').value = '';
        document.getElementById('addAdminRole').value = '2';
        document.getElementById('addAdminAvatar_file').value = '';
        document.getElementById('addAdminAvatar_preview').innerHTML = '';
        
        // 刷新管理员列表，回到第一页
        loadAdminList(1, adminKeyword);
        
    } catch (error) {
        console.error('保存管理员失败:', error);
        alert('保存失败，请检查网络连接');
    }
}
