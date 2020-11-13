#include "ArduBits_E18ZigBee.h"


ZigBee_E18::ZigBee_E18(uint8_t rx, uint8_t tx) : mySerial(SoftwareSerial(rx, tx)) /*初始化列表，引用的类必须在初始化列表里面初始化*/
{
    mySerial.begin(115200);
    mySerial.setTimeout(1000); //设置find超时时间
}
ZigBee_E18::~ZigBee_E18()             /*析构函数*/
{
}

/*-----------配置参数------------*/
/*
 *ZigBee_config
 * ZigBee配置
 * 参数FD选择配置的类型
 * 参数num1，num2配置选项
 */
bool ZigBee_E18::ZigBee_config(int FD,byte num1) 
{
    int back_data[2] = {0};       /*观察返回数据*/
    config_read[0] = 253;   /*FD配置命令*/
    switch(FD)
    {
       case 0:              /*配置设备类型*/
       config_read[1] = 2;
       config_read[2] = 1;
       if( (num1 < 0) || (num1 > 2) )
       {
          return false; 
       }
       config_read[3] = num1;
       break;
       case 1:              /*配置网络组号*/
       config_read[1] = 2;
       config_read[2] = 9;
       if( (num1 < 1) || (num1 > 99) )
       {
          return false; 
       }
       config_read[3] = num1;
       break;
       case 2:              /*配置通信信道*/
       config_read[1] = 2;
       config_read[2] = 10;
       if( (num1 < 11) || (num1 > 26) )
       {
          return false; 
       }
       config_read[3] = num1;
       break;
       default:
       break;
    }
    config_read[4] = 255;    /*数据有效*/
    mySerial.write(config_read,5);                  /*发送数为5*/
    int i = 0;
    while( mySerial.available() > 0 )               /*串口读取字符串*/
    {
      back_data[i]= mySerial.read();
      Serial.println(back_data[i]);
      i++;
      delay(2);
    }
    delay(100);                       
   if(config_read[2] == back_data[1])               /*是否配置成功*/
   {
      return true;
   }             
   return false;
}

bool ZigBee_E18::ZigBee_config_PANID(unsigned int panid)
{
  int back_data[2];           /*观察返回数据*/
  config_read[0] = 253;       /*FD配置命令*/            
  config_read[1] = 3;         /*配置网络PAN_ID*/
  config_read[2] = 3;
  config_read[3] = panid >> 8;/*高8位赋值*/
  config_read[4] = panid;     /*低8位赋值*/  
  config_read[5] = 255;       /*数据有效*/
  mySerial.write(config_read,6);                  /*发送数为5*/

  int i = 0;
  while( mySerial.available() > 0 )               /*串口读取字符串*/
  {
    back_data[i]= mySerial.read();
    Serial.println(back_data[i]);
    i++;
    delay(2);
  }
  delay(100);                       
  if(config_read[2] == back_data[1])               /*是否配置成功*/
  {
    return true;
  }             
  return false;
}

void ZigBee_E18::ZigBee_config_all(int equipment,unsigned int PANID)
{
  delay(1000);
  while(!ZigBee_config(0,equipment));                    //配置-设备类型
  delay(5000);
  while(!ZigBee_config_PANID(PANID));             //配置-PANID
  delay(5000);  
} 

/*-----------读取参数------------*/

/*
 *ZigBee_read
 * ZigBee读取本地网络地址
 * 
 */
unsigned int ZigBee_E18::ZigBee_read_network_addr(void)
{
  int arr[3] = {0};
  config_read[0] = 254;   /*FE读取命令*/ 
  config_read[1] = 1;
  config_read[2] = 5;
  config_read[3] = 255;    /*数据有效*/
  mySerial.write(config_read,4);                     /*发送数为4*/
  delay(10);
  int i = 0;
  while (!mySerial.available());                     /*等待模块回复*/ 
  while( mySerial.available() > 0 )                  /*串口读取字符串*/
  {
    arr[i] = mySerial.read();                        /*读取返回数据的存储*/
//    Serial.println(arr[i]);
    i++;
    delay(2);
  }
  unsigned int data = ( arr[1]<<8 ) | arr[2] ;
  while (mySerial.available()) mySerial.read();     /*清空串口接收缓存*/
  
  if(247 == arr[0] && 0 == arr[1])
  {
    delay(1000);
    arr[3] = {0};
    config_read[0] = 254;   /*FE读取命令*/ 
    config_read[1] = 1;
    config_read[2] = 5;
    config_read[3] = 255;    /*数据有效*/
    mySerial.write(config_read,4);                     /*发送数为4*/
    delay(10);
    i = 0;
    while (!mySerial.available());                      /*等待模块回复*/ 
    while( mySerial.available() > 0 )                  /*串口读取字符串*/
    {
      arr[i] = mySerial.read();                        /*读取返回数据的存储*/
//      Serial.println(arr[i]);
      i++;
      delay(2);
    }
    data = ( arr[1]<<8 ) | arr[2] ;
    while (mySerial.available()) mySerial.read();     /*清空串口接收缓存*/
  }
  if(0XFB == arr[0])      /*确定返回数据*/
  {
    return data;
  }
}

/*
 *ZigBee_read
 * ZigBee读取MAC地址
 */
bool ZigBee_E18::ZigBee_Read_MAC(void)
{
  byte MAC[9] = {0};
  config_read[0] = 254;                               /*FE读取命令*/ 
  config_read[1] = 1;
  config_read[2] = 6;                                 /*读取MAC地址*/
  config_read[3] = 255;                               /*数据有效*/
  mySerial.write(config_read,4);                      /*发送数为4*/
  delay(10);
  int i = 0;
  while (!mySerial.available());                      /*等待模块回复*/ 
  while( mySerial.available() > 0 )                   /*串口读取字符串*/
  {
      MAC[i] = mySerial.read();                     /*读取返回数据的存储*/
//    Serial.println(Read_MAC[i]);
    i++;
    delay(2);
  }
  while (mySerial.available()) mySerial.read();       /*清空串口接收缓存*/
  for(int i = 0; i < 8; i++)
  {
    Read_MAC[i] = MAC[i+1];  
  }
  if(0XFB == MAC[0])                                  /*确定返回数据*/
  {
    return true;
  }
  else
  {
    return false;
  }
}

/*
 *ZigBee_MAC_Deal
 * ZigBee读取MAC地址处理MAC地址为字符串
 * 
 */
String ZigBee_E18::ZigBee_MAC_Deal()
{
  String MAC_data = "";
  String buf = "";
  while(!ZigBee_Read_MAC());                          /*读取本地MAC*/
  buf = Transform_16_string(Read_MAC);
  int j = 0;
  for(int i = 1; i <= 24; i++)
  { 
    if(i % 3 == 0)
    {
      MAC_data += " ";
    }
    else
    {
      MAC_data += buf[j];
      j++;
    }
  }  
  return MAC_data;
}

/*
 *ZigBee_MAC_Addr
 * 获取网络中任意MAC地址的短地址
 */
 bool ZigBee_E18::ZigBee_MAC_Addr(byte *MAC)          /*MAC地址输入是以byte数组的形式输入*/
{
  config_read[0] = 254;                               /*FE读取命令*/ 
  config_read[1] = 9;
  config_read[2] = 16;                                 /*读取MAC地址*/
  for(int i = 0; i < 8; i++)
  {
    config_read[i+3] = MAC[i];
  }
  config_read[11] = 255;                               /*数据有效*/
  mySerial.write(config_read,12);                      /*发送数为4*/
  delay(10);
  int i = 0;
  while (!mySerial.available());                      /*等待模块回复*/ 
  while( mySerial.available() > 0 )                   /*串口读取字符串*/
  {
    addr1[i] = mySerial.read();                       /*读取返回数据的存储*/
//    Serial.println(addr1[i]);
    i++;
    delay(2);
  }
  Tx_Addr = ( addr1[1]<<8 ) | addr1[2] ;              /*获取到的地址*/
  
  if(0XFB == addr1[0])                             /*确定返回数据*/
  {
    return true;
  }
  else
  {
    return false;
  }
}

/*
 *ZigBee_read_MAC_addr
 * 获取网络中任意MAC地址的短地址int 类型
 */
unsigned int ZigBee_E18::ZigBee_read_MAC_addr(byte *MAC)
{
  while(!ZigBee_MAC_Addr(MAC));                          /*读取MAC地址的网络短地址*/
  return Tx_Addr;
}

 

/*-----------发送数据------------*/

 /*点播
 *ZigBee_unicast_send_string
 * ZigBee发送数据String
 * addr 发送的地址
 * String /int发送的数据
 */

bool ZigBee_E18::ZigBee_unicast_send(int FC,unsigned int addr,unsigned int data)              
{
  Send[0] = 252;          /*FC发送数据的命令*/
  int i = 0;
  char string[6];         /*计算长度*/
 // itoa(data,string,10);   
  sprintf(string,"%u",data);/*无符号整数转字符串*/
  int len = strlen(string);/*计算数据的长度*/
  addr1[1] = addr;        /*数据的处理*/
  addr1[0] = addr>>8;
  switch(FC)                /*数据赋值*/
  {
     case 1:              
     Send[1] = len + 4;    /*len*/
     Send[2] = 3;          /*点播*/
     Send[3] = 1;          /*点播透传*/
     Send[4] = addr1[0];   /*网络短地址*/
     Send[5] = addr1[1];
     for(i = 0; i < len; i++)
     {
         Send[6 + i] = string[i];
     }
     mySerial.write(Send,len + 6);                  /*发送数为len + 6*/
     break;
     case 2:             
     Send[1] = len + 4;   /*len*/
     Send[2] = 3;         /*点播*/
     Send[3] = 2;         /*短地址方式*/
     Send[4] = addr1[0];   /*网络短地址*/
     Send[5] = addr1[1];
     for(i = 0; i < len; i++)
     {
         Send[6 + i] = string[i];
     }
     mySerial.write(Send,len + 6);                  /*发送数为len + 6*/
     break;
     case 3:             
     Send[1] = len + 4;   /*len*/
     Send[2] = 3;         /*点播*/
     Send[3] = 3;         /*MAC地址方式*/
     Send[4] = addr1[0];   /*网络短地址*/
     Send[5] = addr1[1];
     for(i = 0; i < len; i++)
     {
         Send[6 + i] = string[i];
     }
     mySerial.write(Send,len + 6);                  /*发送数为len + 6*/
     break;
     default:break;
  }
  delay(100);
  memset(Send,0,sizeof(byte)*100);
  return true;
}


 bool ZigBee_E18::ZigBee_unicast_send(int FC,unsigned int addr,String string)              
{
  Send[0] = 252;          /*FC发送数据的命令*/
  int i = 0;
  int len = string.length();
  addr1[1] = addr;        /*数据的处理*/
  addr1[0] = addr>>8;
  switch(FC)                /*数据赋值*/
  {
     case 1:              
     Send[1] = len + 4;    /*len*/
     Send[2] = 3;          /*点播*/
     Send[3] = 1;          /*点播透传*/
     Send[4] = addr1[0];   /*网络短地址*/
     Send[5] = addr1[1];
     for(i = 0; i < len; i++)
     {
         Send[6 + i] = string[i];
     }
     mySerial.write(Send,len + 6);                  /*发送数为len + 6*/
     break;
     case 2:             
     Send[1] = len + 4;   /*len*/
     Send[2] = 3;         /*点播*/
     Send[3] = 2;         /*短地址方式*/
     Send[4] = addr1[0];   /*网络短地址*/
     Send[5] = addr1[1];
     for(i = 0; i < len; i++)
     {
         Send[6 + i] = string[i];
     }
     mySerial.write(Send,len + 6);                  /*发送数为len + 6*/
     break;
     case 3:             
     Send[1] = len + 4;   /*len*/
     Send[2] = 3;         /*点播*/
     Send[3] = 3;         /*MAC地址方式*/
     Send[4] = addr1[0];   /*网络短地址*/
     Send[5] = addr1[1];
     for(i = 0; i < len; i++)
     {
         Send[6 + i] = string[i];
     }
     mySerial.write(Send,len + 6);                  /*发送数为len + 6*/
     break;
     default:break;
  }
  delay(100);
  memset(Send,0,sizeof(byte)*100);
  return true;
}


/*-----------接收数据------------*/
 /*
 *ZigBee_receive_string
 * ZigBee读取数据携带网络地址
 * 携带网络地址方式
 */
String ZigBee_E18::ZigBee_receive_string(int mode)              
{                                                 /*数据清除*/

//  Rx_Data = "";                                   /*接收的数据*/
//  Rx_MAC_Data = "";                               /*接收的数据*/
//  Rx_Addr_Data = "";                              /*接收的数据*/                                    
//  Rx_MAC1 = "";                                   /*接收的MAC*/
//  Rx_Addr = 0;                                    /*接收的网络短地址*/

  byte *p = Rx_MAC;                               /*数组存储MAC数据*/ 
  int Rx_addr_buf[2] = {0};
  while( mySerial.available() > 0 )               /*串口读取字符串*/
  {
    if( 1 == mode )                               /*读取网络短地址*/
    {
      if( 2 == mySerial.available() )               /*网络短地址*/
      {
        Rx_addr_buf[0] = mySerial.read();
        delay(2);
        Rx_addr_buf[1] = mySerial.read();
      }
      if( mySerial.available() > 2)                 /*接收的数据*/
      {
        Rx_Addr_Data += (char)mySerial.read();
        delay(2);
      }
    }
    else if( 2 == mode )
    {
       if( 8 >= mySerial.available() )               /*MAC*/
      {
        *p++ = mySerial.read();      
      }
      if( mySerial.available() > 8)                 /*接收的数据必须要（char）*/
      {
        Rx_MAC_Data += (char)mySerial.read();
        delay(2);
      }
    }
    else
    {
      Rx_Data += (char)mySerial.read();
      delay(2);
    }
    
  }
  if( 1 == mode )                                 /*mode 为1*/
  {
    Rx_Addr = (Rx_addr_buf[0] << 8) | Rx_addr_buf[1];
  }
  if(2 == mode)
  {
    Rx_MAC1 = ZigBee_Rx_MAC_Deal();               /*经过处理的MAC地址*/
  }
  return Rx_Data;                                 /*返回的是透传的数据*/
}

/*
*ZigBee_Rx_MAC_Deal
*接收到的MAC数据转化
*/
String ZigBee_E18::ZigBee_Rx_MAC_Deal()
{
  String MAC_data = "";
  String buf = "";
  buf = Transform_16_string(Rx_MAC);
  int j = 0;
  for(int i = 1; i <= 24; i++)
  { 
    if(i % 3 == 0)
    {
      MAC_data += " ";
    }
    else
    {
      MAC_data += buf[j];
      j++;
    }
  }  
  return MAC_data;
}

/*
*接收整体数据 (有效数据+携带数据)
*/
String ZigBee_E18::ZigBee_receive_data_mode(int mode) 
{
  String buf_data = "";
  ZigBee_receive_string(mode);
  if(0 == mode)
  {
    return  Rx_Data; 
  }
  else if(1 == mode)
  {
    buf_data = String(Rx_Addr_Data) + String("++") + String(Rx_Addr);
    if(Rx_Addr_Data != "")
    {
      return buf_data; 
    }
    else
    {
      return "";
    }
    
  }
  else if(2 == mode)
  {
    buf_data = String(Rx_MAC_Data) + String("++") + String(Rx_MAC1);
    if(Rx_MAC_Data != "")
    {
      return buf_data; 
    }
    else
    {
      return "";
    }
  }
  else
  {
    return "0";
  }
}

/*
*接收MAC数据
*/
String ZigBee_E18::ZigBee_Receive_MAC_Data(void) 
{
  ZigBee_receive_string(2);
  String Buf = Rx_MAC_Data;
  Rx_MAC_Data = "";                         /*清除Rx_MAC_Data数据*/
  return Buf;
}

String ZigBee_E18::ZigBee_Receive_MAC_Addr(void) 
{
  ZigBee_receive_string(2);
  String Buf = Rx_MAC1;
  Rx_MAC1 = "";                         /*清除Rx_MAC_Data数据*/
  return Buf;
}


String ZigBee_E18::ZigBee_Receive_Net_Data(void) 
{
  ZigBee_receive_string(1);
  String Buf = Rx_Addr_Data;
  Rx_Addr_Data = "";                         /*清除Rx_MAC_Data数据*/
  return Buf;
}

unsigned int ZigBee_E18::ZigBee_Receive_Net_Addr(void) 
{
  ZigBee_receive_string(1);
  unsigned int Buf = Rx_Addr;
  Rx_Addr = 0;                            /*清除Rx_MAC_Data数据*/
  return Buf;
}


/*
*进制输出处理10-16->字符串
*/
String ZigBee_E18::Transform_16_string(byte *MAC)
{
  uint8_t str[16];
  uint8_t dst[16];
  String buf = "";
  int i = 0;
  for(i = 0; i < 8;i++)
  {
      str[2*i] = MAC[i]>>4;
      str[2*i+1] = MAC[i]&0xf;
  }
  for(i = 0; i< 16;i++)
  {
      sprintf(&dst[i],"%X",str[i]);
  }
  buf = dst;
  return buf;  
}



