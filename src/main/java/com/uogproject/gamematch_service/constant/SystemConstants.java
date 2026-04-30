package com.uogproject.gamematch_service.constant;

/**
 * 系统通用常量
 */
public class SystemConstants {
    
    /**
     * 默认超级管理员用户名
     */
    public static final String DEFAULT_SUPER_ADMIN_USERNAME = "111";
    
    /**
     * 默认超级管理员密码
     */
    public static final String DEFAULT_SUPER_ADMIN_PASSWORD = "111";

      /**
     * 默认超级管理员头像
     */
    public static final String DEFAULT_SUPER_ADMIN_AVATAR = "/image/logo_path.jpg";
    
    /**
     * 初始化完成提示信息
     */
    public static final String INIT_COMPLETE_MSG = "初始化测试数据完成！";
    
    /**
     * 超级管理员创建成功提示
     */
    public static final String SUPER_ADMIN_CREATED_MSG = "✅ 已创建超级管理员: ";
    
    /**
     * 密码修改警告提示
     */
    public static final String PASSWORD_CHANGE_WARNING = "⚠️  请立即登录并修改密码！";
    
    /**
     * 登录失败错误提示
     */
    public static final String ERROR_LOGIN_FAILED = "用户名或密码错误，或账号已被禁用";
    
    private SystemConstants() {
        // 防止实例化
    }
}
