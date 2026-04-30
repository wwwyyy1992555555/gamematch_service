package com.uogproject.gamematch_service.constant;

/**
 * 管理员角色枚举（数据库存储数字类型）
 */
public enum AdminRole {
    
    /**
     * 普通管理员：仅拥有陪玩师管理等基础业务权限
     */
    ADMIN(2, "普通管理员"),
    
    /**
     * 超级管理员：拥有所有权限，包括管理其他管理员
     */
    SUPER_ADMIN(1, "超级管理员");
    
    private final int code;
    private final String description;
    
    AdminRole(int code, String description) {
        this.code = code;
        this.description = description;
    }
    
    public int getCode() {
        return code;
    }
    
    public String getDescription() {
        return description;
    }
    
    /**
     * 根据数字代码获取角色枚举
     */
    public static AdminRole fromCode(int code) {
        for (AdminRole role : values()) {
            if (role.getCode() == code) {
                return role;
            }
        }
        throw new IllegalArgumentException("未知的角色代码: " + code);
    }
}
