#ifndef ArduBits_GPS_H
#define ArduBits_GPS_H
#include <Arduino.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include "SoftwareSerial.h"
//#include "ArduBits_SetSerial.h"

using namespace std;

/*GPS类定义*/ 
class GPS_ATM //: public SetSerial    //继承软串口
{
public:                             //方法
  GPS_ATM(uint8_t rx, uint8_t tx);
  ~GPS_ATM();
  SoftwareSerial mySerial;//RX,Tx
 //GPS_ATM(uint8_t tx_pin,uint8_t rx_pin);
  void Gps_int(void);               //初始化
  bool gpsRead();                   //获取数据
  bool parseGpsBuffer();            //解析数据
  void printGpsBuffer();            //打印解析的数据
  void errorLog(int num);           //错误信息
  void clrGpsRxBuffer(void);        //清除
  void Deal_lat_lon();              //经纬度处理
  String get_latitude();            //获取纬度数据
  String get_longitude();           //获取经度数据
  String get_hight();               //获取告诉数据

public:                             //属性
  char GPS_Buffer[80];              //GPS缓存
  bool isGetData;                   //是否获取到GPS数据
  bool isParseData;                 //是否解析完成
//  char UTCTime[11];                 //UTC时间
  char latitude[11];                //纬度
  char N_S[2];                      //N/S
  char longitude[12];               //经度
  char E_W[2];                      //E/W
  char hight[7];                    //海平面高度
  char H_M[2];                      //高度单位M
  bool isUsefull;                   //定位信息是否有效
  /*数据转化部分*/
  char gpsRxBuffer[300];            //临时存储
  unsigned int ii = 0;              //计数是否越界
  String Slatitude;                 //纬度信息  字符串类型输出的经纬度
  String Slongitude;                //经度信息
  String Shight;                    //高度
  char Tran_Slatitude[8];           //转换纬度 换算过的经纬度
  char Tran_Slongitude[8];          //转换经度
  
};
#endif
