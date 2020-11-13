#ifndef ArduBits_ESP8266_H
#define ArduBits_ESP8266_H
#include "ArduBits_EDP.h"
#include <Arduino.h>
using namespace std; 
  
class WiFi_ESP8266
{
public:
  WiFi_ESP8266()
    {
        heat = 0;
        heatsrt = 0;
        reconnect = 0;
        edp_connect = 0;
    }
  void wifiint(void);
	void wificonfig(char *ssid,char *passwd);
  void cloudconfig(char *id, char *key);
	void sendint(char* destid, String sname, int data);                   /*发送数据*/
 void sendstring(char *destid, String sname, String data);
 void sendintstr1(char* destId,char *nameditu,char *lati,char *lon);
 //void sendintstr1(const char* destId,String nameditu,String lati,String lon);
  bool EDP_Connect(void);
  void recvdeal(void);
  String recvname(void);
  long int recvdata(void);
  void cloudheat(void);
  bool EDP_cloudheat(void);
  void Reconnect_again(char *ssid,char *passwd,char *id,char *key); //重新连接
  //void sendintstr1(const int8* destId,const char *nameditu,const char *lati,const char *lon);
  
  bool heat;          //心跳
  unsigned char heatsrt;
  bool edp_connect;
  String RXname;
 unsigned char reconnect;
 
private:
	bool DoCmdOk(char  *data,char *keyword);
  char *Ssid,*Passwd;
  char *ID,*KEY;
  edp_pkt *edp;  //创建EDP对象
  bool readEdpPkt(edp_pkt *p);
  edp_pkt rcv_pkt;          //EDP协议包
	void packetSend(edp_pkt* pkt);
  long int RXdata;
};
#endif
