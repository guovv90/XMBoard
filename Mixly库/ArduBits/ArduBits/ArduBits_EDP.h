#ifndef ArduBits_EDP_H
#define ArduBits_EDP_H
#include <string.h>
#include <stdio.h>
#include <stdlib.h>

/*----------------------------消息类型--------------------------------------*/
/* 连接请求 */
#define CONNREQ             0x10
/* 连接响应 */
#define CONNRESP            0x20
/* 转发（透传）数据 */
#define PUSHDATA            0x30
/* 存储（透传）数据 */
#define SAVEDATA            0x80
/* 存储确认 */
#define SAVEACK             0x90
/* 命令请求 */
#define CMDREQ              0xA0
/* 命令响应 */
#define CMDRESP             0xB0
/* 心跳请求 */
#define PINGREQ             0xC0
/* 心跳响应 */
#define PINGRESP            0xD0
/* 加密请求 */
#define ENCRYPTREQ          0xE0
/* 加密响应 */
#define ENCRYPTRESP         0xF0

#define MAX_LEN				200
#define PROTOCOL_NAME       "EDP"
#define PROTOCOL_VERSION    1

typedef unsigned char   uint8;
typedef char            int8;
typedef unsigned int    uint16;
typedef int             int16;
typedef unsigned long   uint32;
typedef long            int32;
typedef struct
{
  uint8 data[MAX_LEN];//EDP协议包的数据
  int16 len;          // EDP数据包写入长度位置控制
  int16 read_p;       // EDP协议包读出数据位置控制
} edp_pkt;
/*
 * packetCreate
 * 创建一个EDP包缓存空间
 */
edp_pkt *packetCreate(void);
/*
 * writeRemainlen
 * 向EDP包中写入剩余长度字段
 * len_val: 剩余长度的值
 */
int8 writeRemainlen(edp_pkt* pkt, int16 len_val);
/*
 * writeByte
 * 向EDP包中写入一个字节
 */
int16 writeByte(edp_pkt* pkt, int8 byte);
/*
 * writeBytes
 * 向EDP包中写入多个字节
 */
int16 writeBytes(edp_pkt* pkt, const void* bytes, int16 count);
/*
 * writeStr
 * 向EDP包中写入字符串字段
 * 首先写入两个字节的长度，随后紧跟字符串内容
 */
int16 writeStr(edp_pkt* pkt, const int8* str);
/*
 * readUint8
 * 从EDP包中读出一个字节
 */
uint8 readUint8(edp_pkt* pkt);
/*
 * readUint16
 * 从EDP包中读出16bit的字段
 */
uint16 readUint16(edp_pkt* pkt);
/*
 * readUint32
 * 从EDP包中读出4个字节的字段
 */
uint32 readUint32(edp_pkt* pkt);

/*
 * readStr
 * 根据长度，从EDP包中读出字符串数据
 * len : 字符串的长度
 */
void readStr(edp_pkt* pkt, char* str, uint16 len);
/*
 * readRemainlen
 * 从EDP包中读出剩余长度
 */
int32 readRemainlen(edp_pkt* pkt);
/*
 * packetConnect：组EDP连接包
 * 首先创建EDP缓存空间，按照EDP协议组EDP连接包
 * 分配的内存需要在发送之后free掉
 * devid: 设备id
 * key：APIKey
 */
edp_pkt *packetConnect(const int8* devid, const int8* key);

/*
 * heartbeat：组EDP连接包
 * 首先创建EDP缓存空间，按照EDP协议组EDP连接包
 * 分配的内存需要在发送之后free掉
 * 
 * 
 */
edp_pkt *heartbeat(void);
/*
 * packetDataSaveTrans：组EDP数据存储转发包
 * 首先创建EDP缓存空间，按照EDP协议组EDP数据存储转发包
 * 分配的内存需要在发送之后free掉
 * devid: 设备id
 * streamId：数据流ID，即数据流名
 * val: 字符串形式的数据值
 */
edp_pkt *packetDataSaveTrans(const int8* destId, const int8* streamId, const int8 *val);

//edp_pkt *packetDataSaveTransmzyGPS(char *destId,char *nameditu,char *lati,char *lon);//发送操作
edp_pkt *packetDataSaveTransmzyGPS(const int8*destId,const int8*nameditu,const int8*lati,const int8*lon);//发送操作

void packetClear(edp_pkt* pkt);
/*
 * isEdpPkt
 * 按照EDP数据格式，判断是否是完整数据包
 */
int16 isEdpPkt(edp_pkt* pkt);
/*
 * edpCommandReqParse
 * 按照EDP命令请求协议，解析数据
 */
int edpCommandReqParse(edp_pkt* pkt, char *id, char *cmd, int32 *rmlen, int32 *id_len, int32 *cmd_len);
/*
 * edpPushDataParse
 * 按照EDP透传数据格式，解析数据
 */
int edpPushDataParse(edp_pkt* pkt, char *srcId, char *data);


#endif // EDP_H


