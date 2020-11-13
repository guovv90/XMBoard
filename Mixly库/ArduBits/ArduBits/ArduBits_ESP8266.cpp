#include "ArduBits_ESP8266.h"
#include "stdio.h"
/*
 * wifiint
 * WIFI初始化
 */
void WiFi_ESP8266::wifiint(void) 
{
    //myserial.begin(9600);
    Serial.begin(115200);
    Serial.setTimeout(3000); //设置find超时时间
}

/*
 * DoCmdOk
 * 通过串口向ESP8266发送AT指令
 */
bool WiFi_ESP8266::DoCmdOk(char *data, char *keyword)
{
    bool result = false;
    if (data != "") //对于tcp连接命令，直接等待第二次回复
        Serial.println(data); //发送AT指令
        
    if (data == "AT") //检查模块存在
        delay(2000);
    else
        while (!Serial.available()); // 等待模块回复
        
    delay(200);
    if (Serial.find(keyword)) //返回值判断
    {
        result = true;
    }
    else
    {
        result = false;
    }
    while (Serial.available()) Serial.read(); //清空串口接收缓存
    delay(500);          //指令时间间隔
    return result;
}

/*
 * wificonfig
 * WIFI模块，ESP8266配置wifi.功能
 */
void WiFi_ESP8266::wificonfig(char *ssid, char *passwd)
{
    char temp[50] = {'\0'};
    while (!DoCmdOk("AT", "OK"));
    while (!DoCmdOk("AT+CWMODE=1", "OK"));    
    Ssid = ssid;                              //存储ssid，passwd                    
    Passwd = passwd;
//    sprintf(temp, "AT+CWJAP=\"%s\",\"%s\"", ssid, passwd);

    strcat(temp, "AT+CWJAP=\"");
    strcat(temp, ssid);
    strcat(temp, "\",\"");
    strcat(temp, passwd);
    strcat(temp, "\"");

    while (!DoCmdOk(temp, "OK"));
    while (!DoCmdOk("AT+CIPSTART=\"TCP\",\"183.230.40.39\",876", "CONNECT"));
    while (!DoCmdOk("AT+CIPMODE=1", "OK")); 
    while (!DoCmdOk("AT+CIPSEND", ">")); 
}

/*
 * cloudconfig
 * WIFI模块，ESP8266， 和中移平台设备连接配置
 */
void WiFi_ESP8266::cloudconfig(char *id, char *key)
{
    edp_connect = 0;
    if (!edp_connect)
    {
        int tmp;
        ID = id;
        KEY = key;
        while (Serial.available()) Serial.read();                 //清空串口接收缓存
        packetSend(packetConnect(ID, KEY));                         //发送EPD连接包
        while (!Serial.available())
            ; //等待EDP连接应答
       // Serial.println("yingda");
       
        if ((tmp = Serial.readBytes(rcv_pkt.data, sizeof(rcv_pkt.data))) > 0)
        {
            if (rcv_pkt.data[0] == 0x20 && rcv_pkt.data[2] == 0x00 && rcv_pkt.data[3] == 0x00)
                edp_connect = 1;
        }
        packetClear(&rcv_pkt);
    }

        if (rcv_pkt.len > 0)
        packetClear(&rcv_pkt);
    delay(150);  
}

/*
 * EDP_Connect
 * 连接返回连接状态
 */
bool WiFi_ESP8266::EDP_Connect(void)
{
   /*查询是否收到错误代码*/
  if(Serial.available())
  {
    reconnect = Serial.peek();
  }
  if(reconnect == 0x40)
  {
      reconnect = 0;
      edp_connect = 0;                                           //清除上次的连接
      Reconnect_again(Ssid,Passwd,ID,KEY);                      //断开连接后重新连接
  }
  return edp_connect;                                           //没有错误会返回1
}


/*
 * cloudheat心跳保持
 * 心跳响应
 */
void WiFi_ESP8266::cloudheat(void)
{
        int tmp;
        while (Serial.available()) Serial.read();                //清空串口接收缓存
        packetSend(heartbeat());                                  //发送心跳EPD连接包
        while (!Serial.available())
            ; //等待EDP连接应答
        if ((tmp = Serial.readBytes(rcv_pkt.data, sizeof(rcv_pkt.data))) > 0)
        {
            heatsrt = rcv_pkt.data[0];
            if (heatsrt == 0xD0 )
               heat = 1;
        }
        packetClear(&rcv_pkt);
    delay(150);  
}

bool WiFi_ESP8266::EDP_cloudheat(void)
{
  return heat;
}

/*
 * sendint
 * wifi模式 ，上传数据，sname上传的设备流名称，data数据 int数据类型
 */
void WiFi_ESP8266::sendint(char *destid, String sname, int data)
{
    //char *id = destid.c_str();
    const char *cname = sname.c_str();//数据类型转化 sname
    char int_str[10] = {'\0'};        //上传的数据格式必须是字符串，使用数据存储转换的int类型数据
    sprintf(int_str, "%d", data);    //将数据转换成字符串
    if (edp_connect)
    {
        packetSend(packetDataSaveTrans(destid, cname, int_str)); //发送数据存储包
        delay(100);
    }
}


/*
 * sendstring
 * wifi模式 ，上传数据，sname上传的设备流名称 string数据类型
 */
void WiFi_ESP8266::sendstring(char *destid, String sname, String data)
{
    const char *cname = sname.c_str();//数据类型转化 sname
    const char *cdata = data.c_str();//数据类型转化 sname
    if (edp_connect)
    {
        packetSend(packetDataSaveTrans(destid, cname, cdata)); //发送数据存储包
        delay(100);
    }
}


/*
 * sendint char * 发送字符串
 * wifi模式 ，上传数据，sname上传的设备流名称，data数据 char*数据类型
 */
void WiFi_ESP8266::sendintstr1(char* destId,char *nameditu,char *lati,char *lon)
{
    if (edp_connect)
    {
        packetSend(packetDataSaveTransmzyGPS(destId,nameditu,lati,lon)); //发送数据存储包
        delay(100);
    }
}



/*
 * recvdeal
 * EDP协议，下发解析数据
 */
void WiFi_ESP8266::recvdeal(void)
{
    while (Serial.available())
    {
        readEdpPkt(&rcv_pkt);
        if (isEdpPkt(&rcv_pkt))
        {
            uint8 pkt_type;
            pkt_type = rcv_pkt.data[0];         //消息类型判断
            switch (pkt_type)                   //消息类选择
            {
            case CMDREQ:                        //命令请求
                char edp_command[50];
                char edp_cmd_id[40];
                long id_len, cmd_len, rm_len;
                char datastr[20];
                char val[10];
                memset(edp_command, 0, sizeof(edp_command));
                memset(edp_cmd_id, 0, sizeof(edp_cmd_id));
                edpCommandReqParse(&rcv_pkt, edp_cmd_id, edp_command, &rm_len, &id_len, &cmd_len);      //解析 数据edp_command
                sscanf(edp_command, "%[^:]:%s", datastr, val);//本例中格式为  datastream:[1/0]
                RXname = datastr;
                RXdata = atoi(val);
                break;
            default:
                break;
            }
        }
    }
    if (rcv_pkt.len > 0)
        packetClear(&rcv_pkt);
    delay(2);  
}

/*
 * recvname
 * 返回，下发数据流名称
 */
String WiFi_ESP8266::recvname(void)
{
  return  RXname;
}
/*
 * recvdata
 * 返回，下发的数据
 */
long int WiFi_ESP8266::recvdata(void)
{
  return  RXdata;
}



/*
 * readEdpPkt
 * 从串口缓存中读数据到接收缓存
 */
bool WiFi_ESP8266::readEdpPkt(edp_pkt *p)       //从串口读取EDP协议包
{
    int tmp;
    if ((tmp = Serial.readBytes(p->data + p->len, sizeof(p->data))) > 0)
    {
        p->len += tmp;
    }
    return true;
}

/*
 * packetSend
 * 将待发数据发送至串口，并释放到动态分配的内存
 */
void WiFi_ESP8266::packetSend(edp_pkt *pkt)
{
    while (Serial.available()) Serial.read();                //清空串口接收缓存
    if (pkt != NULL)
    {
        Serial.write(pkt->data, pkt->len); //串口发送
        Serial.flush();
        free(pkt); //回收内存
    }
}

/*断线重新连接  测试函数*/
void WiFi_ESP8266::Reconnect_again(char *ssid,char *passwd,char *id,char *key)
{
   /*退出透传模式--重新连接*/
  Serial.print("+++");                                       //发送AT指令 退出透传模式
  delay(200);                                                //延时等待2s

  wificonfig(ssid,passwd);                                    //重新配置
  delay(20);
  cloudconfig(id,key);                                        //配置信息端口和APIKey
  delay(1000);
//  sendint(NULL,"0X40", 20);                                   //上发数据流
  delay(1000);
}

