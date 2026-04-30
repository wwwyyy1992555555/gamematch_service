package com.uogproject.gamematch_service.service;

import com.uogproject.gamematch_service.entity.SystemConfig;
import com.uogproject.gamematch_service.repository.SystemConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class SystemConfigService {
    
    @Autowired
    private SystemConfigRepository systemConfigRepository;
    
    /**
     * 获取所有系统配置
     */
    public Map<String, String> getAllConfigs() {
        List<SystemConfig> configs = systemConfigRepository.findAll();
        Map<String, String> configMap = new HashMap<>();
        for (SystemConfig config : configs) {
            configMap.put(config.getConfigKey(), config.getConfigValue());
        }
        return configMap;
    }
    
    /**
     * 根据key获取配置值
     */
    public String getConfigByKey(String key) {
        Optional<SystemConfig> config = systemConfigRepository.findByConfigKey(key);
        return config.map(SystemConfig::getConfigValue).orElse(null);
    }
    
    /**
     * 批量更新配置
     */
    public void updateConfigs(Map<String, String> configs) {
        for (Map.Entry<String, String> entry : configs.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            
            Optional<SystemConfig> existingConfig = systemConfigRepository.findByConfigKey(key);
            if (existingConfig.isPresent()) {
                SystemConfig config = existingConfig.get();
                config.setConfigValue(value);
                systemConfigRepository.save(config);
            } else {
                SystemConfig newConfig = new SystemConfig();
                newConfig.setConfigKey(key);
                newConfig.setConfigValue(value);
                newConfig.setDescription(getDescriptionByKey(key));
                systemConfigRepository.save(newConfig);
            }
        }
    }
    
    /**
     * 根据key获取描述信息
     */
    private String getDescriptionByKey(String key) {
        switch (key) {
            case "company_name":
                return "公司名称";
            case "company_nickname":
                return "公司昵称";
            case "company_intro":
                return "公司简介";
            case "company_description":
                return "公司描述";
            case "logo_path":
                return "Logo图片路径";
            case "background_image":
                return "背景图片路径";
            case "intro_image":
                return "简介图片路径";
            case "contact_person":
                return "联系人";
            case "phone_number":
                return "手机号";
            case "service_time":
                return "服务时间";
            case "wechat_id":
                return "企业微信号";
            case "wechat_qrcode":
                return "企业微信二维码路径";
            default:
                return "";
        }
    }
}
