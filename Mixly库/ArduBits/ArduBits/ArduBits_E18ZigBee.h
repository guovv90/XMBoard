#ifndef ArduBits_E18ZigBee_H
#define ArduBits_E18ZigBee_H
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <stdio.h>
using namespace std; 
  
class ZigBee_E18
{

  public:   /*方法*/
  /*GPS析构函数*/
  ZigBee_E18(uint8_t rx, uint8_t tx);
  ~ZigBee_E18();
  SoftwareSerial mySerial;                                        /*定义SoftwareSerial类的对象RX,Tx*/
  bool ZigBee_config(int FD,byte num1);                             /*配置设备类型*/
  bool ZigBee_config_PANID(unsigned int panid);                     /*配置PANID*/
  void ZigBee_config_all(int equipment,unsigned int PANID);         /*配置ID和*/
  unsigned int ZigBee_read_network_addr(void);                      /*读取网络地址*/
  bool ZigBee_Read_MAC(void);                                       /*读取MAC地址*/
  String ZigBee_MAC_Deal();                                         /*数据处理*/
  bool ZigBee_MAC_Addr(byte *MAC);                                  /*获取任意MAC地址的网络地址*/              
  unsigned int ZigBee_read_MAC_addr(byte *MAC);                     /*返回获取任意MAC地址的网络地址*/
  String Transform_16_string(byte *MAC);
  
  bool ZigBee_unicast_send(int FC,unsigned int addr,unsigned int data);/*点播发送数据*/    
  bool ZigBee_unicast_send(int FC,unsigned int addr,String string);   /*点播*/
   
  String ZigBee_receive_string(int mode);                             /*接收数据*/
  String ZigBee_Rx_MAC_Deal();                                        /*接收数据的MAC-16进制处理*/      
  String ZigBee_receive_data_mode(int mode);                          /*接收整体数据*/
  String ZigBee_Receive_MAC_Data(void);                               /*接收MAC_Data数据*/
  String ZigBee_Receive_MAC_Addr(void);   
  String ZigBee_Receive_Net_Data(void);
  unsigned int ZigBee_Receive_Net_Addr(void);
   
  public:   /*属性*/
  byte config_read[12];                                               /*配置和读取字节数组*/ 
  byte Read_MAC[8];                                                   /*读取MAC地址*/
  int addr1[3];                                                       /*网络短地址*/
  unsigned int Tx_Addr;                                               /*通过MAC获取的短地址*/
  byte Send[50];                                                      /*发送数据格式数组 格式+数据*/

  String Rx_Data;                                                     /*接收数据*/
  String Rx_MAC_Data;                                                 /*接收数据*/
  String Rx_Addr_Data;                                                /*接收数据*/
  String Rx_MAC1;                                                     /*接收数据字符串*/
  byte Rx_MAC[8];                                                     /*接收MAC数据*/
  unsigned int Rx_Addr;                                               /*接收发送者的地址-无符号整型数据*/
  
};
#endif
