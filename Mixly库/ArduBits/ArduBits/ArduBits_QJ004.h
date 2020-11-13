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

public:   /*����*/

	MP3_QJ004(uint8_t rx, uint8_t tx);
	~MP3_QJ004();
	bool MP3_ONE_CMD(uint8_t select);		/*һ��������ƹ��ܼ�*/
	bool MP3_TWO_CMD(uint8_t select);		/*����ѭ������*/
	bool MP3_THREE_CMD(uint8_t select);		/*ָ��������Ŀ*/


public:   /*����*/

};

class SerialMP3_QJ004
{

public:   /*����*/
	SerialMP3_QJ004();
	void SerialMP3_init(void);
	bool SerialMP3_ONE_CMD(uint8_t select);			/*һ��������ƹ��ܼ�*/
	bool SerialMP3_TWO_CMD(uint8_t select);			/*����ѭ������*/
	bool SerialMP3_THREE_CMD(uint8_t select);		/*ָ��������Ŀ*/


public:   /*����*/

};
#endif
