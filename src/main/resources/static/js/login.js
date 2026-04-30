/**
 * Login Page JavaScript
 * 登录页面交互逻辑
 */

/**
 * 切换密码显示/隐藏
 * @param {string} inputId - 密码输入框的ID
 * @param {HTMLElement} spanElement - 切换按钮元素（span）
 */
function togglePassword(inputId, spanElement) {
    const input = document.getElementById(inputId);
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
 * 初始化登录表单
 */
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
}

/**
 * 处理登录表单提交
 * @param {Event} e - 表单提交事件
 */
function handleLoginSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    if (!username || !password) {
        alert('请填写账号和密码');
        return;
    }
    
    // 调用后端登录接口
    fetch('/api/v1/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('用户名或密码错误');
    })
    .then(data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('avatar', data.avatar || '/image/logo_path.jpg');
        localStorage.setItem('role', data.role); // 保存角色信息
        window.location.href = 'admin.html';
    })
    .catch(error => {
        alert(error.message);
    });
}

/**
 * 初始化页面
 */
document.addEventListener('DOMContentLoaded', function() {
    initLoginForm();
});