#ifndef ArduBits_QJ004_H
#define ArduBits_QJ004_H
#include <Arduino.h>
#include <stdio.h>
//#include <SoftwareSerial.h>
#include "ArduBits_SetSerial.h"
#include <inttypes.h>
#include <stddef.h>
using namespace std;

class MP3_QJ004 :public SetSerial
{

public:   /*方法*/

	MP3_QJ004(uint8_t rx, uint8_t tx);
	~MP3_QJ004();
	bool MP3_ONE_CMD(uint8_t select);		/*一个命令控制功能键*/
	bool MP3_TWO_CMD(uint8_t select);		/*设置循环播放*/
	bool MP3_THREE_CMD(uint8_t select);		/*指定播放曲目*/


public:   /*属性*/

};

class SerialMP3_QJ004
{

public:   /*方法*/
	SerialMP3_QJ004();
	void SerialMP3_init(void);
	bool SerialMP3_ONE_CMD(uint8_t select);			/*一个命令控制功能键*/
	bool SerialMP3_TWO_CMD(uint8_t select);			/*设置循环播放*/
	bool SerialMP3_THREE_CMD(uint8_t select);		/*指定播放曲目*/


public:   /*属性*/

};
#endif
