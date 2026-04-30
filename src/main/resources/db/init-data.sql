-- Init admin user data
INSERT INTO admin_user (username, password, avatar, role, is_active, created_at, updated_at) 
VALUES 
('admin1', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin2', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin3', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin4', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin5', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin6', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin7', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin8', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin9', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin10', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin11', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin12', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin13', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin14', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin15', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin16', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin17', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin18', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin19', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin20', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin21', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin22', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin23', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin24', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin25', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin26', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin27', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin28', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin29', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('admin30', '111', NULL, 2, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Init companion data
INSERT INTO companion (nickname, avatar, game_types, ranks, servers, price, rating, description, tags, is_online, created_at, updated_at) 
VALUES 
('小仙女', NULL, '王者荣耀', '荣耀王者50星', '微信区', 30.0, 98, '擅长辅助和法师，声音甜美，耐心教学，带你上分带你飞~', '声音甜美,技术流,耐心', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('野王哥哥', NULL, '王者荣耀', '巅峰赛2200', 'QQ区', 50.0, 99, '主玩打野，意识超群，节奏大师，带你体验躺赢的感觉！', '打野大神,意识流,carry全场', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('LOL高手', NULL, '英雄联盟', '最强王者', '艾欧尼亚', 60.0, 100, '十年老玩家，精通各个位置，教学一流，包教包会！', '全能选手,教学型,经验丰富', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Init system config data
INSERT INTO system_config (config_key, config_value, description) VALUES 
('company_name', 'Peiwan Daren Technology Co., Ltd.', 'Company Name'),
('company_nickname', 'Peiwan Daren', 'Company Nickname'),
('company_intro', 'Professional game companion service platform', 'Company Introduction'),
('company_description', 'Dedicated to providing quality game companion services for players', 'Company Description'),
('logo_path', '/image/logo_path.jpg', 'Logo Image Path'),
('background_image', '/image/background_image.jpg', 'Background Image Path'),
('intro_image', '/image/intro_image.jpg', 'Introduction Image Path'),
('contact_person', 'Manager Zhang', 'Contact Person'),
('phone_number', '400-123-4567', 'Phone Number'),
('service_time', '9:00-22:00', 'Service Time'),
('wechat_id', 'peiwan_daren', 'WeChat ID'),
('wechat_qrcode', '/image/wechat_qrcode.jpg', 'WeChat QR Code Path');
