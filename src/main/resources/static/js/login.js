/**
 * Login Page JavaScript
 * 登录页面交互逻辑
 */

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
    
    alert('登录成功！');
    window.location.href = 'index.html';
}

/**
 * 初始化页面
 */
document.addEventListener('DOMContentLoaded', function() {
    initLoginForm();
});