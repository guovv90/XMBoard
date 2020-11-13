#ifndef ArduBits_ASR740_H
#define ArduBits_ASR740_H
#include <Arduino.h>
#include <stdio.h>
#include <SoftwareSerial.h>
using namespace std;

class ASR_740
{

public:   /*����*/
		 
	ASR_740(uint8_t rx, uint8_t tx);
	~ASR_740();
	/*��ʼ������*/
	bool ASR_init(void);					/*��ʼ��ģ��*/
	bool ASR_sens(unsigned int sens);		/*����������*/
	bool ASR_volume(unsigned int volume);	/*��������*/
	bool ASR_group(unsigned int group);		/*����ʶ�����*/

	/*����ʶ������*/
	unsigned int ASR_start_one_discern(unsigned char time);	/*����һ��ʶ���һ�ȡ����*/
	bool ASR_start_continuous_discern(void);				/*��������ʶ��*/
	unsigned int ASR_start_receive(void);					/*��������ʶ����*/
	unsigned int ASR_one_receive(void);						/*���յ���ʶ����*/
	bool ASR_quit_discern(void);							/*�˳�ʶ��*/


public:   /*����*/
	SoftwareSerial mySerial;                                /*����SoftwareSerial��Ķ���RX,Tx*/
	unsigned int continuous;
	unsigned int one;
};

/*---------Ӳ������--------------*/
class SerialASR_740
{

public:   /*����*/

	SerialASR_740();
	~SerialASR_740();
	/*��ʼ������*/
	bool ASR_init(void);					/*��ʼ��ģ��*/
	bool ASR_sens(unsigned int sens);		/*����������*/
	bool ASR_volume(unsigned int volume);	/*��������*/
	bool ASR_group(unsigned int group);		/*����ʶ�����*/

											/*����ʶ������*/
	unsigned int ASR_start_one_discern(unsigned char time);	/*����һ��ʶ���һ�ȡ����*/
	bool ASR_start_continuous_discern(void);				/*��������ʶ��*/
	unsigned int ASR_start_receive(void);					/*��������ʶ����*/
	unsigned int ASR_one_receive(void);						/*���յ���ʶ����*/
	bool ASR_quit_discern(void);							/*�˳�ʶ��*/


public:   /*����*/
	unsigned int continuous;
	unsigned int one;
};

#endif

