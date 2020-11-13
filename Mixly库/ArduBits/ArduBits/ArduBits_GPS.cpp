#include "ArduBits_GPS.h"
#include "SoftwareSerial.h"

//SoftwareSerial mzymySerial(10,11);


/*
GPS_ATM::GPS_ATM(uint8_t tx_pin,uint8_t rx_pin):SetSerial(tx_pin,rx_pin)
{

}
*/
/*GPS析构函数*/
GPS_ATM::GPS_ATM(uint8_t rx, uint8_t tx) : mySerial(SoftwareSerial(rx, tx))
{
    mySerial.begin(4800);
//    strncpy(Tran_Slatitude,"31.6879",7);
//    strncpy(Tran_Slongitude,"119.970",7);  
   // mySerial.setTimeout(1000); //设置find超时时间
}
GPS_ATM::~GPS_ATM()
{
}

/*GPS初始化函数*/
void GPS_ATM::Gps_int(void)
{
  //mzymySerial.begin(4800);      //初始化自定义串口
  isGetData = false;
  isParseData = false;
  isUsefull = false;  
}

/*GPS获取数据函数*/
bool GPS_ATM::gpsRead() 
{
  memset(GPS_Buffer, 0, 80);              //清空
  while (mySerial.available())          //存储数据
  {
    gpsRxBuffer[ii++] = mySerial.read();
    if (ii == 300)clrGpsRxBuffer();
  }
  char* GPS_BufferHead;                   //头部
  char* GPS_BufferTail;                   //尾部
  if ((GPS_BufferHead = strstr(gpsRxBuffer, "$GPGGA,")) != NULL )    //GP和GN
  {
    if (((GPS_BufferTail = strstr(GPS_BufferHead, "\r\n")) != NULL) && (GPS_BufferTail > GPS_BufferHead))
    {
      memcpy(GPS_Buffer, GPS_BufferHead, GPS_BufferTail - GPS_BufferHead);                                                        //拷贝
      isGetData = true;                                                                                                           //正确读取GPS 
      clrGpsRxBuffer();                                                                                                           //清空临时缓存
    }
  }
  delay(100);
  /*获取是否正确*/
  if(isGetData == true)
  {
    return true;
  }
  else
  {
    return false;  
  }
}

/*GPS解析数据函数*/
bool GPS_ATM::parseGpsBuffer()
{
  isParseData = false;                            //解析数据标志
  isUsefull = false;                              //数据是否有用标志
  int i = 0;
  char *subString = NULL;
  char *subStringNext = NULL;
  char usefullBuffer[2] = {0};
  gpsRead();                                      //获取数据
  delay(10);
  if (isGetData)                                  //已经获取到数据
  {
    isGetData = false;                            //清除获取标志
    //mySerial.println(GPS_Buffer);                 //打印获取的数据
    //mySerial.end();
    for (i = 0 ; i <= 10 ; i++)
    {
      if (i == 0)
      {
        if ((subString = strstr(GPS_Buffer, ",")) == NULL)
          errorLog(1);                            //解析错误
      }
      else
      {
        subString++;                                          //数据的数据段截取
        if ((subStringNext = strstr(subString, ",")) != NULL)
        {
          switch(i)
          {
            case 1:break;                                 //获取UTC时间
            case 2:strncpy(latitude, subString, subStringNext - subString);latitude[subStringNext - subString] = 0;break;                               //获取纬度信息
            case 3:strncpy(N_S, subString, subStringNext - subString);N_S[subStringNext - subString] = 0;usefullBuffer[0] = N_S[0]; break;              //获取N/S
            case 4:strncpy(longitude, subString, subStringNext - subString);longitude[subStringNext - subString] = 0;break;                             //获取经度信息
            case 5:strncpy(E_W, subString, subStringNext - subString);E_W[subStringNext - subString] = 0;break;                                         //获取E/W
            case 6:break;                                                                                                                               //定位状态
            case 7:break;                                                                                                                               //卫星数量
            case 8:break;                                                                                                                               //水平精度衰减因子
            case 9:strncpy(hight, subString, subStringNext - subString);hight[subStringNext - subString] = 0;break;                                     //海平面高度
            case 10:strncpy(H_M, subString, subStringNext - subString);H_M[subStringNext - subString] = 0;break;                                        //高度单位M
            default:break;
          }

          subString = subStringNext;                                                                                                                    //下一个开始位置赋值;
          /*可以添加条件确定是否接受成功*/
          isParseData = true;
          if(usefullBuffer[0] == 'N' || usefullBuffer[0] == 'S')
            isUsefull = true;
          else 
            isUsefull = false;
        }
        else
        {
          errorLog(2);  //解析错误
        }
      }
    }
   /*for == end*/
  }

  subString = NULL;
  subStringNext = NULL;
  /*解析数据成功和数据为有效数据返回 ture*/ 
  if( (true  == isParseData) && (true == isUsefull) )
  {
    Deal_lat_lon();
    return true;  
  }
  else
  {
    return false;
  }
}

/*解析后的数据的处理函数主要处理经纬度*/
void GPS_ATM::Deal_lat_lon()
{
  char *p = latitude + 2;
  char int_data[3] = {0};
  char float_data[8] = {0};

  /*纬度转化*/
  strncpy(int_data,latitude,2);           //数据分离
  int_data[2] = 0;
  strncpy(float_data,p,7);
  float_data[7] = 0;
  int h_data = atoi(int_data);            //数据转换
  float l_data = atof(float_data);
  /*换算*/
  float lati = h_data + (l_data/60);      //实际的纬度值 

  /*经度转换*/
  p = longitude + 3;
  char int_data1[4] = {0};
  strncpy(int_data1,longitude,3);         //数据分离
  int_data1[3] = 0;
  strncpy(float_data,p,7);
  float_data[7] = 0;
  h_data = atoi(int_data1);               //数据转化
  l_data = atof(float_data);
  /*换算*/
  float lon = h_data + (l_data/60);       //实际的经度值
  
  unsigned char i = 0;                    //实际经纬度的转化
  char Tran_Slatlon[8] = {0};             //临时中转变量
  unsigned long tmp_lat = lati * 10000;  
  sprintf(Tran_Slatlon,"%ld",tmp_lat);
  strncpy(Tran_Slatitude,Tran_Slatlon,7); 
  for(i = 6; i > 2; i--)
  {
      Tran_Slatitude[i] = Tran_Slatitude[i-1];
  }
  Tran_Slatitude[i] = '.';
  //mySerial.println(Tran_Slatitude);
  tmp_lat = lon * 1000;                    //经度
  
  sprintf(Tran_Slatlon,"%ld",tmp_lat);
  strncpy(Tran_Slongitude,Tran_Slatlon,7); 
  for(i = 6; i > 3; i--)
  {
      Tran_Slongitude[i] = Tran_Slongitude[i-1];
  }
  Tran_Slongitude[i] = '.';
  //mySerial..println(Tran_Slongitude);       
}

/*GPS输出解析后的数据据函数*/
void GPS_ATM::printGpsBuffer()
{
  /*解析数据成功同时数据为有效数据，则GPS数据可以使用*/
  if (isParseData)
  {
    isParseData = false;
    if(isUsefull)
    {
      isUsefull = false;   
      GPS_ATM::Deal_lat_lon();       //打印换算过的经纬度
    }
    else
    {
      //mySerial..println("GPS DATA is not usefull!");
    }

  }
      
}

/*获取纬度*/
String GPS_ATM::get_latitude()
{
  Slatitude = Tran_Slatitude;
  return   Slatitude;
}
/*获取经度*/
String GPS_ATM::get_longitude()
{
  Slongitude = Tran_Slongitude;
  return    Slongitude;
}
/*获取高度*/
String GPS_ATM::get_hight()
{
  Shight = hight;
  return    Shight;
}


/*错误信息*/
void GPS_ATM::errorLog(int num)
{
//  Serial.print("ERROR");
//  Serial.println(num);
  delay(1000);
}

//清空
void GPS_ATM::clrGpsRxBuffer(void)
{
  memset(gpsRxBuffer, 0, 300);      //清空
  ii = 0;
}




