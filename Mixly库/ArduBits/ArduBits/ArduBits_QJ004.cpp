#include "ArduBits_QJ004.h"

MP3_QJ004::MP3_QJ004(uint8_t rx, uint8_t tx) :SetSerial(rx, tx) /*��ʼ���б����õ�������ڳ�ʼ���б������ʼ��*/
{
	SetSerial::begin(9600);
}


MP3_QJ004::~MP3_QJ004()					/*��������*/
{

}


/*
*MP3_ONE_CMD(uint8_t select)
*һ��������ƹ��ܼ�
*/
bool MP3_QJ004::MP3_ONE_CMD(uint8_t select)
{
	if (select <= 0 || select >6)
	{
		return false;
	}
	byte send[] = { 0X7E,0X02,0X02,0XEF };	/*�������ݻ���*/
	send[2] = select;						/*����ѡ��1-6*/
	SetSerial::write(send, 4);				/*���ڷ�������*/
	delay(10);
	return true;
}

/*
*MP3_TWO_CMD(uint8_t select)
*����ѭ������
*/
bool MP3_QJ004::MP3_TWO_CMD(uint8_t select)
{
	if (select < 0 || select >4)
	{
		return false;
	}
	byte send[] = { 0X7E,0X03,0X33,0X00,0XEF };	/*�������ݻ���*/
	send[3] = select;							/*����ѡ��0-4*/
	SetSerial::write(send, 5);					/*���ڷ�������*/
	delay(10);
	return true;

}

/*
*MP3_THREE_CMD(uint8_t select)
*ָ��������Ŀ
*/
bool MP3_QJ004::MP3_THREE_CMD(uint8_t select)
{
	if (select < 0 || select >65534)
	{
		return false;
	}
	byte send[] = { 0X7E,0X04,0X41,0X00,0X01,0XEF };	/*�������ݻ���*/
	send[3] = select << 8;								/*��Ŀѡ��0-65534*/
	send[4] = select;
	SetSerial::write(send, 6);							/*���ڷ�������*/
	delay(10);
	return true;
}

SerialMP3_QJ004::SerialMP3_QJ004()
{
	
}

void SerialMP3_QJ004::SerialMP3_init(void)
{
	Serial.begin(9600);
}

/*
*MP3_ONE_CMD(uint8_t select)
*һ��������ƹ��ܼ�
*/
bool SerialMP3_QJ004::SerialMP3_ONE_CMD(uint8_t select)
{
	if (select <= 0 || select >6)
	{
		return false;
	}
	byte send[] = { 0X7E,0X02,0X02,0XEF };	/*�������ݻ���*/
	send[2] = select;						/*����ѡ��1-6*/
	Serial.write(send, 4);				/*���ڷ�������*/
	delay(10);
	return true;
}

/*
*MP3_TWO_CMD(uint8_t select)
*����ѭ������
*/
bool SerialMP3_QJ004::SerialMP3_TWO_CMD(uint8_t select)
{
	if (select < 0 || select >4)
	{
		return false;
	}
	byte send[] = { 0X7E,0X03,0X33,0X00,0XEF };	/*�������ݻ���*/
	send[3] = select;							/*����ѡ��0-4*/
	Serial.write(send, 5);					/*���ڷ�������*/
	delay(10);
	return true;

}

/*
*MP3_THREE_CMD(uint8_t select)
*ָ��������Ŀ
*/
bool SerialMP3_QJ004::SerialMP3_THREE_CMD(uint8_t select)
{
	if (select < 0 || select >65534)
	{
		return false;
	}
	byte send[] = { 0X7E,0X04,0X41,0X00,0X01,0XEF };	/*�������ݻ���*/
	send[3] = select << 8;								/*��Ŀѡ��0-65534*/
	send[4] = select;
	Serial.write(send, 6);							/*���ڷ�������*/
	delay(10);
	return true;
}

