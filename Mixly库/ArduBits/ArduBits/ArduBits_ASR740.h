#ifndef ArduBits_ASR740_H
#define ArduBits_ASR740_H
#include <Arduino.h>
#include <stdio.h>
#include <SoftwareSerial.h>
using namespace std;

class ASR_740
{

public:   /*方法*/
		 
	ASR_740(uint8_t rx, uint8_t tx);
	~ASR_740();
	/*初始化配置*/
	bool ASR_init(void);					/*初始化模块*/
	bool ASR_sens(unsigned int sens);		/*配置灵敏度*/
	bool ASR_volume(unsigned int volume);	/*配置音量*/
	bool ASR_group(unsigned int group);		/*配置识别组号*/

	/*启动识别设置*/
	unsigned int ASR_start_one_discern(unsigned char time);	/*启动一次识别并且获取数据*/
	bool ASR_start_continuous_discern(void);				/*启动连续识别*/
	unsigned int ASR_start_receive(void);					/*启动接收识别码*/
	unsigned int ASR_one_receive(void);						/*接收单次识别码*/
	bool ASR_quit_discern(void);							/*退出识别*/


public:   /*属性*/
	SoftwareSerial mySerial;                                /*定义SoftwareSerial类的对象RX,Tx*/
	unsigned int continuous;
	unsigned int one;
};

/*---------硬件串口--------------*/
class SerialASR_740
{

public:   /*方法*/

	SerialASR_740();
	~SerialASR_740();
	/*初始化配置*/
	bool ASR_init(void);					/*初始化模块*/
	bool ASR_sens(unsigned int sens);		/*配置灵敏度*/
	bool ASR_volume(unsigned int volume);	/*配置音量*/
	bool ASR_group(unsigned int group);		/*配置识别组号*/

											/*启动识别设置*/
	unsigned int ASR_start_one_discern(unsigned char time);	/*启动一次识别并且获取数据*/
	bool ASR_start_continuous_discern(void);				/*启动连续识别*/
	unsigned int ASR_start_receive(void);					/*启动接收识别码*/
	unsigned int ASR_one_receive(void);						/*接收单次识别码*/
	bool ASR_quit_discern(void);							/*退出识别*/


public:   /*属性*/
	unsigned int continuous;
	unsigned int one;
};

#endif

