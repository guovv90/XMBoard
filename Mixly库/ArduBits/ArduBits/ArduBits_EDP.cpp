#include "ArduBits_EDP.h"

/*
 * packetCreate
 * 创建一个EDP包缓存空间
 */
edp_pkt *packetCreate(void)
{
  edp_pkt *p;

  if((p = (edp_pkt *)malloc(sizeof(edp_pkt))) != NULL)
    memset(p, 0, sizeof(edp_pkt));
  return p;
}

/*
 * writeRemainlen
 * 向EDP包中写入剩余长度字段
 * len_val: 剩余长度的值
 */
int8 writeRemainlen(edp_pkt* pkt, int16 len_val)
{
  int8 remaining_count = 0;
  int8 tmp = 0;

  do {                                                      //写入剩余长度，总共剩余长度数据存储为4字节存储，每个字节存储0~128
    tmp = len_val % 128;
    len_val = len_val / 128;
    /* If there are more digits to encode, set the top bit of this digit */
    if (len_val > 0) {
      tmp = tmp | 0x80;
    }
    pkt->data[pkt->len++] = tmp;
    remaining_count++;
  } while (len_val > 0 && remaining_count < 5);

  return remaining_count;
}

/*
 * writeByte
 * 向EDP包中写入一个字节
 */
int16 writeByte(edp_pkt* pkt, int8 byte)
{
  pkt->data[pkt->len++] = byte;
  return 0;
}

/*
 * writeBytes
 * 向EDP包中写入多个字节
 */
int16 writeBytes(edp_pkt* pkt, const void* bytes, int16 count)
{
  memcpy(pkt->data + pkt->len, bytes, count);                   //内存拷贝
  pkt->len += count;
  return 0;
}


/*
 * writeStr
 * 向EDP包中写入字符串字段
 * 首先写入两个字节的长度，随后紧跟字符串内容
 */
int16 writeStr(edp_pkt* pkt, const int8* str)
{
  short len = strlen(str);                  //计算字符串的长度

  writeByte(pkt, len >> 8);                 //将字符串长度的信息写入，EDP协议包
  writeByte(pkt, len & 0x00ff);             //高字节

  memcpy(pkt->data + pkt->len, str, len);   //将字符串数据写入，EDP协议包
  pkt->len += len;                          // 长度增减
  return 0;
}


/*---------------------------------------------------------------------------*/
/*
 * readUint8
 * 从EDP包中读出一个字节
 */
uint8 readUint8(edp_pkt* pkt)               //读出8bit
{
  return pkt->data[pkt->read_p++];          //读出数据,读出位置加1
}

/*
 * readUint16
 * 从EDP包中读出16bit的字段
 */
uint16 readUint16(edp_pkt* pkt)
{
  uint16 tmp;
  uint8 msb, lsb;
  
  msb = readUint8(pkt);   //读出高8bit
  lsb = readUint8(pkt);   //读出低8bit

  tmp = (msb<<8) | lsb;   //合成16bit
  return tmp;             //返回
}

/*
 * readUint32
 * 从EDP包中读出4个字节的字段
 */
uint32 readUint32(edp_pkt* pkt)
{
  uint32 tmp = 0;
  int i = 4;

  while (--i >= 0) //读取4次
  {
    tmp <<= 8;
    tmp |= readUint8(pkt);
  }
  return tmp;
}

/*
 * readStr
 * 根据长度，从EDP包中读出字符串数据
 * len : 字符串的长度
 */
void readStr(edp_pkt* pkt, char* str, uint16 len)
{
  memcpy(str, pkt->data + pkt->read_p, len);      //读取字符串的长度
  pkt->read_p += len;
}

/*
 * readRemainlen
 * 从EDP包中读出剩余长度
 */
int32 readRemainlen(edp_pkt* pkt)
{
  uint32 multiplier = 1;
  uint32 len_len = 0;
  uint8 onebyte = 0;
  int32 len_val = 0;
  do 
  {
    onebyte = readUint8(pkt);         //每次读取一个字节

    len_val += (onebyte & 0x7f) * multiplier;//每次移位128
    multiplier *= 0x80;

    len_len++;                        //只有4字节的长度
    if (len_len > 4) 
    {
      return -1; /*len of len more than 4;*/
    }
  } while((onebyte & 0x80) != 0);     //有数据
  return len_val;
}
/*---------------------------------------以上是对EDP协议数据包的读写操作做-----------------------------------------------------------*/

/*---------------------------------------以下是对EDP数据包的发送接收-----------------------------------------------------------------*/
/*
 * packetConnect：组EDP连接包
 * 首先创建EDP缓存空间，按照EDP协议组EDP连接包
 * 分配的内存需要在发送之后free掉
 * devid: 设备id
 * key：APIKey
 */
edp_pkt *packetConnect(const int8* devid, const int8* key)        //连接操作
{
  int32 remainlen;
  edp_pkt* pkt;
  
  if((pkt = packetCreate()) == NULL)
    return NULL;
  
  /* msg type */
  writeByte(pkt, CONNREQ);
  /* remain len */
  remainlen = (2 + 3) + 1 + 1 + 2 + (2 + strlen(devid)) + (2 + strlen(key));
  writeRemainlen(pkt, remainlen);
  /* protocol desc */
  writeStr(pkt, PROTOCOL_NAME);
  /* protocol version */
  writeByte(pkt, PROTOCOL_VERSION);
  /* connect flag */
  writeByte(pkt, 0x40);
  /* keep time */
  writeByte(pkt, 0);
  writeByte(pkt, 0x80);

  /* DEVID */
  writeStr(pkt, devid);
  /* auth key */
  writeStr(pkt, key);
  
  return pkt;
}


/*
 * packetDataSaveTrans：组EDP数据存储转发包
 * 首先创建EDP缓存空间，按照EDP协议组EDP数据存储转发包
 * 分配的内存需要在发送之后free掉
 * devid: 设备id
 * streamId：数据流ID，即数据流名
 * val: 字符串形式的数据值
 */
edp_pkt *packetDataSaveTrans(const int8* destId, const int8* streamId, const int8 *val)//发送操作
{
  int32 remainlen;
  int8 tmp[200];
  int16 str_len;
  edp_pkt *pkt;
  
  if((pkt = packetCreate()) == NULL)
    return pkt;

  /* 生成数据类型格式5的数据类型 */
  sprintf(tmp, ",;%s,%s", streamId, val);
  str_len = strlen(tmp);

  /* msg type */
  writeByte(pkt, SAVEDATA);

  if (destId != NULL)
  {
    /* remain len */
    remainlen = 1 + (2 + strlen(destId)) + 1 + (2 + str_len);
    writeRemainlen(pkt, remainlen);
    /* translate address flag */
    writeByte(pkt, 0x80);
    /* dst devid */
    writeStr(pkt, destId);
  }
  else
  {
    /* remain len */
    remainlen = 1 + 1 + (2 + str_len);
    writeRemainlen(pkt, remainlen);
    /* translate address flag */
    writeByte(pkt, 0x00);
  }

  /* json flag */
  writeByte(pkt, 5);
  /* json */
  writeStr(pkt, tmp);
  
  return pkt;
}




/*
 * packetDataSaveTrans：组EDP数据存储转发包
 * 首先创建EDP缓存空间，按照EDP协议组EDP数据存储转发包
 * 分配的内存需要在发送之后free掉
 * devid: 设备id
 * GPS数据
 *
 */
edp_pkt *packetDataSaveTransmzyGPS(const int8*destId,const int8*nameditu,const int8*lati,const int8*lon)//发送操作
{
  int32 remainlen;
  int8 tmp[200] = {0};
  int16 str_len = 0;
  edp_pkt *pkt;
  
  if((pkt = packetCreate()) == NULL)
    return pkt;

  /* 生成数据类型格式 1的数据类型 */
 // sprintf(tmp, "{\"datastreams\":[{\"id\":\"%s\",\"datapoints\":[{\"value\":{\"lon\":%s,\"lat\":%s}}]}]}", nameditu, lon,lati);


  strcat(tmp, "{\"datastreams\":[{\"id\":\"");
  strcat(tmp, nameditu);
  strcat(tmp, "\",\"datapoints\":[{\"value\":{\"lon\":");
  strcat(tmp, lon);
  strcat(tmp, ",\"lat\":");
  strcat(tmp, lati);
  strcat(tmp, "}}]}]}");
 
  str_len = strlen(tmp);
  /* msg type */
  writeByte(pkt, SAVEDATA);         //消息头

  if (destId != NULL)
  {
    /* remain len */
    remainlen = 1 + (2 + strlen(destId)) + 1 + (2 + str_len);
    writeRemainlen(pkt, remainlen);
    /* translate address flag */
    writeByte(pkt, 0x80);
    /* dst devid */
    writeStr(pkt, destId);
  }
  else
  {
    /* remain len */
    remainlen = 1 + 1 + (2 + str_len);
    writeRemainlen(pkt, remainlen);
    /* translate address flag */
    writeByte(pkt, 0x00);
  }

  /* json flag */
  writeByte(pkt,1);
  /* json */
  writeStr(pkt, tmp);
  
  return pkt;
}


void packetClear(edp_pkt* pkt)            //清空EDP协议包
{
  memset(pkt, 0, sizeof(edp_pkt));
}


/*
 * isEdpPkt
 * 按照EDP数据格式，判断是否是完整数据包
 */
int16 isEdpPkt(edp_pkt* pkt)            //数据包的检查
{
  uint32 data_len = 0;
  uint32 multiplier = 1;
  uint32 len_val = 0;
  uint32 len_len = 1;
  uint32 pkt_total_len = 0;
  uint8* pdigit;

  pdigit = pkt->data;
  data_len = pkt->len;

  if (data_len <= 1)
  {
    return 0;   /* continue receive */
  }

  do {
    if (len_len > 4)
    {
      return -1;  /* protocol error; */
    }
    if (len_len > data_len - 1)
    {
      return 0;   /* continue receive */
    }
    len_len++;
    pdigit++;
    len_val += ((*pdigit) & 0x7f) * multiplier;
    multiplier *= 0x80;
  } while (((*pdigit) & 0x80) != 0);

  pkt_total_len = len_len + len_val;

  /* receive payload */
  if (pkt_total_len == data_len)
  {
    return 1;   /* all data for this pkt is read */
  }
  else
  {
    return 0;   /* continue receive */
  }
}


/*
 * edpCommandReqParse
 * 按照EDP命令请求协议，解析数据
 */
int edpCommandReqParse(edp_pkt* pkt, char *id, char *cmd, int32 *rmlen, int32 *id_len, int32 *cmd_len)//下发数据包的解析
{
  readUint8(pkt);                  /* 包类型 */
  *rmlen = readRemainlen(pkt);    /* 剩余长度 */
  *id_len = readUint16(pkt);      /* ID长度 */
  readStr(pkt, id, *id_len);      /* 命令ID */
  *cmd_len = readUint32(pkt);     /* 命令长度 */
  readStr(pkt, cmd, *cmd_len);    /* 命令内容 */
}


/*
 * edpPushDataParse
 * 按照EDP透传数据格式，解析数据
 */
int edpPushDataParse(edp_pkt* pkt, char *srcId, char *data)
{
  uint32 remain_len;
  uint16 id_len;
  
  readUint8(pkt);                                 /* 包类型 */
  remain_len = readRemainlen(pkt);                /* 剩余长度 */
  id_len = readUint16(pkt);                        /* 源ID长度 */
  readStr(pkt, srcId, id_len);                    /* 源ID */
  readStr(pkt, data, remain_len - 2 - id_len);    /* 数据内容 */
}



/*
 * heartbeat：组EDP心跳包
 * 首先创建EDP缓存空间，按照EDP协议组EDP心跳包
 * 分配的内存需要在发送之后free掉
 * 
 * 
 */
edp_pkt *heartbeat(void)
{
  int32 remainlen;
  edp_pkt* pkt;
  
  if((pkt = packetCreate()) == NULL)
    return NULL;
  
  /* msg type */
  writeByte(pkt, PINGREQ);
  /*剩余长度 0 */
  writeRemainlen(pkt, 0);
  return pkt;
}

