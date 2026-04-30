/**
 * 管理员角色常量（前端，与后端枚举保持一致）
 */
const AdminRole = {
    SUPER_ADMIN: 1,
    ADMIN: 2
};

/**
 * 角色显示名称映射
 */
const RoleNames = {
    [AdminRole.SUPER_ADMIN]: '超级管理员',
    [AdminRole.ADMIN]: '普通管理员'
};

/**
 * 根据角色代码获取显示名称
 */
function getRoleName(roleCode) {
    return RoleNames[roleCode] || '未知角色';
}
