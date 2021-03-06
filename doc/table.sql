/*
/
/ 数据库设计
/ 作者：龙仕云
/
/*

/*签到的会议*/
create table if not exists meeting (
  meet_guid  varchar(36) not null comment '唯一号',
  meet_title varchar(250) not null comment '会议主题',
  meet_time timestamp not null comment '开始时间',
  meet_status int default 0 comment '0 表示结束 1=报名 2=签到 ',
  meet_sceneid int not null comment '二维码编号',
  meet_content text comment '回复内容',
  
  primary key(meet_guid)
) engine=innodb  default charset=utf8 comment='会议';


/*签到的学员*/
create table if not exists meeting_usr (
  meet_guid  varchar(36) not null comment '哪个会议',
  meus_phone varchar(11) not null comment '学员手机',
  meus_name varchar(20) comment '学员姓名',
  meus_unit varchar(250) comment '学员单位',
  meus_sginin tinyint(1) default false comment '==ture 签到了',
  meus_msg varchar(250) comment '学员签到通知',
  meus_openid varchar(50) comment '微信的openid',
  meus_sortid int default 0 comment '排序号',
  
  primary key(meet_guid,meus_phone)
) engine=innodb  default charset=utf8 comment='会议学员';


/*粉丝*/
create table if not exists users (
  user_openid varchar(50) not null comment 'openid',
  user_phone varchar(11),
  user_nickname varchar(50),
  user_sex integer,
  user_city varchar(50),
  user_province varchar(50),
  user_country varchar(50),
  user_status integer default 0 comment '=1 表示不关注了',
  
  user_headimgurl_0 longblob comment '头像0=640*640',
  user_headimgurl_46 longblob comment '头像46',
  user_headimgurl_64 longblob comment '头像64',
  user_headimgurl_96 longblob comment '头像96',
  user_headimgurl_132 longblob comment '头像132',
  
  primary key(user_openid)
) engine=innodb  default charset=utf8 comment='粉丝';

/*管理员*/
create table if not exists manager(
  mana_openid varchar(50) not null comment 'openid',
  mana_remark varchar(200) comment '备注',
  primary key(mana_openid)
)engine=innodb  default charset=utf8 comment='管理员';


/*临时二维码*/
create table if not exists qrcode(
  qrco_num bigint not null comment '场境',
  qrco_openid varchar(50) comment 'openid',
  qrco_expire timestamp comment '过期时间',
  qrco_use tinyint(1) default false comment '=true 表示已使用扫过了',
  qrco_type int not null comment '类型 0=登录',

  primary key(qrco_num,qrco_type)
)engine=innodb  default charset=utf8 comment='临时二维码';




  