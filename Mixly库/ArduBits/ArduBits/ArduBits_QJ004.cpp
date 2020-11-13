#include "ArduBits_QJ004.h"

MP3_QJ004::MP3_QJ004(uint8_t rx, uint8_t tx) :SetSerial(rx, tx) /*初始化列表，引用的类必须在初始化列表里面初始化*/
{
	SetSerial::begin(9600);
}


MP3_QJ004::~MP3_QJ004()					/*析构函数*/
{

}


/*
*MP3_ONE_CMD(uint8_t select)
*一个命令控制功能键
*/
bool MP3_QJ004::MP3_ONE_CMD(uint8_t select)
{
	if (select <= 0 || select >6)
	{
		return false;
	}
	byte send[] = { 0X7E,0X02,0X02,0XEF };	/*发送数据缓存*/
	send[2] = select;						/*功能选择1-6*/
	SetSerial::write(send, 4);				/*串口发送数据*/
	delay(10);
	return true;
}

/*
*MP3_TWO_CMD(uint8_t select)
*设置循环播放
*/
bool MP3_QJ004::MP3_TWO_CMD(uint8_t select)
{
	if (select < 0 || select >4)
	{
		return false;
	}
	byte send[] = { 0X7E,0X03,0X33,0X00,0XEF };	/*发送数据缓存*/
	send[3] = select;							/*功能选择0-4*/
	SetSerial::write(send, 5);					/*串口发送数据*/
	delay(10);
	return true;

}

/*
*MP3_THREE_CMD(uint8_t select)
*指定播放曲目
*/
bool MP3_QJ004::MP3_THREE_CMD(uint8_t select)
{
	if (select < 0 || select >65534)
	{
		return false;
	}
	byte send[] = { 0X7E,0X04,0X41,0X00,0X01,0XEF };	/*发送数据缓存*/
	send[3] = select << 8;								/*曲目选择0-65534*/
	send[4] = select;
	SetSerial::write(send, 6);							/*串口发送数据*/
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
*一个命令控制功能键
*/
bool SerialMP3_QJ004::SerialMP3_ONE_CMD(uint8_t select)
{
	if (select <= 0 || select >6)
	{
		return false;
	}
	byte send[] = { 0X7E,0X02,0X02,0XEF };	/*发送数据缓存*/
	send[2] = select;						/*功能选择1-6*/
	Serial.write(send, 4);				/*串口发送数据*/
	delay(10);
	return true;
}

/*
*MP3_TWO_CMD(uint8_t select)
*设置循环播放
*/
bool SerialMP3_QJ004::SerialMP3_TWO_CMD(uint8_t select)
{
	if (select < 0 || select >4)
	{
		return false;
	}
	byte send[] = { 0X7E,0X03,0X33,0X00,0XEF };	/*发送数据缓存*/
	send[3] = select;							/*功能选择0-4*/
	Serial.write(send, 5);					/*串口发送数据*/
	delay(10);
	return true;

}

/*
*MP3_THREE_CMD(uint8_t select)
*指定播放曲目
*/
bool SerialMP3_QJ004::SerialMP3_THREE_CMD(uint8_t select)
{
	if (select < 0 || select >65534)
	{
		return false;
	}
	byte send[] = { 0X7E,0X04,0X41,0X00,0X01,0XEF };	/*发送数据缓存*/
	send[3] = select << 8;								/*曲目选择0-65534*/
	send[4] = select;
	Serial.write(send, 6);							/*串口发送数据*/
	delay(10);
	return true;
}

