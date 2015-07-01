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
  
  primary key(meet_guid,meus_phone)
) engine=innodb  default charset=utf8 comment='会议学员';


/*粉丝*/
create table if not exists users (
  user_openid varchar(50) not null comment 'openid',
  user_phone varchar(11),
  
  user_headimgurl_0 longblob comment '头像0=640*640',
  user_headimgurl_46 blob comment '头像46',
  user_headimgurl_64 blob comment '头像64',
  user_headimgurl_96 blob comment '头像96',
  user_headimgurl_132 blob comment '头像132',
  
  primary key(user_openid)
) engine=innodb  default charset=utf8 comment='粉丝';




  