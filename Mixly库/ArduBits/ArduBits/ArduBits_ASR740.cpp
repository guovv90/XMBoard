#include "ArduBits_ASR740.h"

ASR_740::ASR_740(uint8_t rx, uint8_t tx) : mySerial(SoftwareSerial(rx, tx)) /*初始化列表，引用的类必须在初始化列表里面初始化*/
{
	mySerial.begin(115200);
	mySerial.setTimeout(1000); //设置find超时时间
	continuous = 0;
	one = 0;
}
ASR_740::~ASR_740()             /*析构函数*/
{

}

/*
*ASR_init()
*初始化模块
*/
bool ASR_740::ASR_init(void)
{
	int i = 0;								/*下标*/
	byte send[] = { 0XA0,0XA0,0XA0 };		/*发送数据缓存*/
	byte receive[3] = { 0 };				/*接收数据缓存*/
	mySerial.write(send, 3);				/*串口发送数据*/
	delay(10);
	while (!mySerial.available());          /*等待模块回复*/
	while (mySerial.available() > 0)        /*串口读取字符串*/
	{
		receive[i] = mySerial.read();       /*读取返回数据的存储*/
//		Serial.println(receive[i], HEX);
		i++;
		delay(2);
	}

	if (0X50 == receive[0] && 0X50 == receive[1])
	{
		return true;
	}
	else
	{
		return false;
	}
}

/*
*ASR_sens(unsigned int)
*配置灵敏度
*/
bool ASR_740::ASR_sens(unsigned int sens)
{
	if (sens < 0 || sens > 100)			/*0X3F0F*/
	{
		return false;
	}
	sens = sens * 160;
	int i = 0;								/*下标*/
	byte send[3] = {0XA1};					/*发送数据缓存*/
	send[0] = 0XA1;
	send[1] = sens >> 8;
	send[2] = sens;							/*数据的处理*/
	
	byte receive[3] = { 0 };				/*接收数据缓存*/
	mySerial.write(send, 3);				/*串口发送数据*/
	delay(10);
	while (!mySerial.available());          /*等待模块回复*/
	while (mySerial.available() > 0)        /*串口读取字符串*/
	{
		receive[i] = mySerial.read();       /*读取返回数据的存储*/
//		Serial.println(receive[i], HEX);
		i++;
		delay(2);
	}
	/*返回*/
	if (0X51 == receive[0])
	{
		return true;
	}
	else
	{
		return false;
	}
}

/*
*ASR_volume(unsigned int volume)
*配置音量
*/
bool ASR_740::ASR_volume(unsigned int volume)
{
	if (volume < 0 || volume > 100)		/*0X2830*/
	{
		return false;
	}
	volume = volume * 100;
	int i = 0;								/*下标*/
	byte send[3] = { 0XA2 };				/*发送数据缓存*/
	send[0] = 0XA2;
	send[1] = volume >> 8;
	send[2] = volume;						/*数据的处理*/

	byte receive[3] = { 0 };				/*接收数据缓存*/
	mySerial.write(send, 3);				/*串口发送数据*/
	delay(10);
	while (!mySerial.available());          /*等待模块回复*/
	while (mySerial.available() > 0)        /*串口读取字符串*/
	{
		receive[i] = mySerial.read();       /*读取返回数据的存储*/
//		Serial.println(receive[i], HEX);
		i++;
		delay(2);
	}
	/*返回*/
	if (0X59 == receive[0])
	{
		return true;
	}
	else
	{
		return false;
	}
}

/*
*ASR_group(unsigned int group);
*配置识别组号
*/
bool ASR_740::ASR_group(unsigned int group)		
{
	if (group < 0 || group > 65535)			/*0XFF*/
	{
		return false;
	}
	int i = 0;								/*下标*/
	byte send[3] = {0XA9};					/*发送数据缓存*/
	send[0] = 0XA9;
	send[2] = group >> 8;
	send[1] = group;						/*数据的处理*/

	byte receive[3] = { 0 };				/*接收数据缓存*/
	mySerial.write(send, 3);				/*串口发送数据*/
	delay(10);
	while (!mySerial.available());          /*等待模块回复*/
	while (mySerial.available() > 0)        /*串口读取字符串*/
	{
		receive[i] = mySerial.read();       /*读取返回数据的存储*/
//		Serial.println(receive[i], HEX);
		i++;
		delay(2);
	}
	/*返回*/
	if (0X59 == receive[0])
	{
		return true;
	}
	else
	{
		return false;
	}
}


/*
*ASR_start_one_discern(unsigned char time)
*启动一次识别
*/
unsigned int ASR_740::ASR_start_one_discern(unsigned char time)
{
	one = 0;
	if (time < 0 || time > 255)				/*0XFF*/
	{
		return false;
	}
	int i = 0;								/*下标*/
	byte send[3] = { 0XAA };				/*发送数据缓存*/
	send[0] = 0XAA;
	send[1] = time;
	send[2] = 0;							/*数据的处理*/
	mySerial.write(send, 3);				/*串口发送数据*/
	byte receive[3] = { 0 };				/*接收数据缓存*/
	while (!mySerial.available());          /*等待模块回复*/
	while (mySerial.available() > 0)        /*串口读取字符串*/
	{
		receive[i] = mySerial.read();       /*读取返回数据的存储*/
//		Serial.println(receive[i], HEX);
		i++;
		delay(2);
	}
	/*返回*/
	if ( (0X5A == receive[0]) && (0XFF != receive[1]))					/*获取单次识别*/
	{
		unsigned int Buf = (receive[2] << 8) | receive[1];
		return one = Buf + 1;
	}
	else
	{
		return one = 0;
	}
}

/*
*ASR_start_one_discern(void)
*启动单次识别
*/
unsigned int ASR_740::ASR_one_receive(void)
{

	return one;
}

/*
*ASR_start_continuous_discern(void)
*启动连续识别
*/
bool ASR_740::ASR_start_continuous_discern(void)
{
	int i = 0;								/*下标*/
	byte send[3] = { 0XAB };				/*发送数据缓存*/
	send[0] = 0XAB;
	send[1] = 0XAB;
	send[2] = 0;							/*数据的处理*/
	mySerial.write(send, 3);				/*串口发送数据*/
	return true;
}

/*
*ASR_start_receive
*启动识别后获取识别结果
*/
unsigned int ASR_740::ASR_start_receive(void)
{

	int i = 0;								/*下标*/
	byte receive[3] = { 0 };				/*接收数据缓存*/
	while (mySerial.available() > 0)        /*串口读取字符串*/
	{
		receive[i] = mySerial.read();       /*读取返回数据的存储*/
//		Serial.print("0X");
//		Serial.println(receive[i], HEX);
		i++;
		delay(2);
	}
	/*返回*/
	if (0X5B == receive[0] && 0X7F != receive[1] && 0XFF != receive[2])					/*获取单次识别和连续识别*/
	{
		unsigned int Buf = (receive[2] << 8) | receive[1];
		return continuous = Buf + 1;
	}
	else
	{
		return continuous = 0;
	}
}

/*
*ASR_quit_discern(void)
*退出识别
*/
bool ASR_740::ASR_quit_discern(void)					
{
	int i = 0;								/*下标*/
	byte send[3] = { 0XAC };				/*发送数据缓存*/
	send[0] = 0XAC;
	send[1] = 0XAC;
	send[2] = 0;							/*数据的处理*/
	mySerial.write(send, 3);				/*串口发送数据*/

	byte receive[3] = { 0 };				/*接收数据缓存*/
	while (!mySerial.available());          /*等待模块回复*/
	while (mySerial.available() > 0)        /*串口读取字符串*/
	{
		receive[i] = mySerial.read();       /*读取返回数据的存储*/
//		Serial.println(receive[i], HEX);
		i++;
		delay(2);
	}
											/*返回*/
	if (0X5C == receive[0])
	{
		return true;
	}
	else
	{
		return false;
	}
}

/*-----------------硬件串口-------------------*/
SerialASR_740::SerialASR_740()
{
	continuous = 0;
	one = 0;
}

SerialASR_740::~SerialASR_740()
{
}

bool SerialASR_740::ASR_init(void)
{
	Serial.begin(115200);
	return true;
}

bool SerialASR_740::ASR_sens(unsigned int sens)
{
	if (sens < 0 || sens > 100)					/*0X3F0F*/
	{
		return false;
	}
	sens = sens * 160;
	int i = 0;									/*下标*/
	byte send[3] = { 0XA1 };					/*发送数据缓存*/
	send[0] = 0XA1;
	send[1] = sens >> 8;
	send[2] = sens;							/*数据的处理*/

	byte receive[3] = { 0 };				/*接收数据缓存*/
	Serial.write(send, 3);				/*串口发送数据*/
	delay(10);
	while (!Serial.available());          /*等待模块回复*/
	while (Serial.available() > 0)        /*串口读取字符串*/
	{
		receive[i] = Serial.read();       /*读取返回数据的存储*/
		i++;
		delay(2);
	}
	/*返回*/
	if (0X51 == receive[0])
	{
		return true;
	}
	else
	{
		return false;
	}
}

bool SerialASR_740::ASR_volume(unsigned int volume)
{
	if (volume < 0 || volume > 100)		/*0X2830*/
	{
		return false;
	}
	volume = volume * 100;
	int i = 0;								/*下标*/
	byte send[3] = { 0XA2 };				/*发送数据缓存*/
	send[0] = 0XA2;
	send[1] = volume >> 8;
	send[2] = volume;						/*数据的处理*/

	byte receive[3] = { 0 };				/*接收数据缓存*/
	Serial.write(send, 3);				/*串口发送数据*/
	delay(10);
	while (!Serial.available());          /*等待模块回复*/
	while (Serial.available() > 0)        /*串口读取字符串*/
	{
		receive[i] = Serial.read();       /*读取返回数据的存储*/
										  //		Serial.println(receive[i], HEX);
		i++;
		delay(2);
	}
	/*返回*/
	if (0X59 == receive[0])
	{
		return true;
	}
	else
	{
		return false;
	}
}

bool SerialASR_740::ASR_group(unsigned int group)
{
	if (group < 0 || group > 65535)			/*0XFF*/
	{
		return false;
	}
	int i = 0;								/*下标*/
	byte send[3] = { 0XA9 };					/*发送数据缓存*/
	send[0] = 0XA9;
	send[2] = group >> 8;
	send[1] = group;						/*数据的处理*/

	byte receive[3] = { 0 };				/*接收数据缓存*/
	Serial.write(send, 3);				/*串口发送数据*/
	delay(10);
	while (!Serial.available());          /*等待模块回复*/
	while (Serial.available() > 0)        /*串口读取字符串*/
	{
		receive[i] = Serial.read();       /*读取返回数据的存储*/
		i++;
		delay(2);
	}
	/*返回*/
	if (0X59 == receive[0])
	{
		return true;
	}
	else
	{
		return false;
	}
}

unsigned int SerialASR_740::ASR_start_one_discern(unsigned char time)
{
	one = 0;
	if (time < 0 || time > 255)				/*0XFF*/
	{
		return false;
	}
	int i = 0;								/*下标*/
	byte send[3] = { 0XAA };				/*发送数据缓存*/
	send[0] = 0XAA;
	send[1] = time;
	send[2] = 0;							/*数据的处理*/
	Serial.write(send, 3);				/*串口发送数据*/
	byte receive[3] = { 0 };				/*接收数据缓存*/
	while (!Serial.available());          /*等待模块回复*/
	while (Serial.available() > 0)        /*串口读取字符串*/
	{
		receive[i] = Serial.read();       /*读取返回数据的存储*/
										  //		Serial.println(receive[i], HEX);
		i++;
		delay(2);
	}
	/*返回*/
	if ((0X5A == receive[0]) && (0XFF != receive[1]))					/*获取单次识别*/
	{
		unsigned int Buf = (receive[2] << 8) | receive[1];
		return one = Buf + 1;
	}
	else
	{
		return one = 0;
	}
}

bool SerialASR_740::ASR_start_continuous_discern(void)
{
	int i = 0;								/*下标*/
	byte send[3] = { 0XAB };				/*发送数据缓存*/
	send[0] = 0XAB;
	send[1] = 0XAB;
	send[2] = 0;							/*数据的处理*/
	Serial.write(send, 3);				/*串口发送数据*/
	return true;
}

unsigned int SerialASR_740::ASR_start_receive(void)
{
	int i = 0;								/*下标*/
	byte receive[3] = { 0 };				/*接收数据缓存*/
	while (Serial.available() > 0)        /*串口读取字符串*/
	{
		receive[i] = Serial.read();       /*读取返回数据的存储*/
		i++;
		delay(2);
	}
	/*返回*/
	if (0X5B == receive[0] && 0X7F != receive[1] && 0XFF != receive[2])					/*获连续识别*/
	{
		unsigned int Buf = (receive[2] << 8) | receive[1];
		return continuous = Buf + 1;
	}
	else
	{
		return continuous = 0;
	}
}

unsigned int SerialASR_740::ASR_one_receive(void)
{
	return one;
}

bool SerialASR_740::ASR_quit_discern(void)
{
	int i = 0;								/*下标*/
	byte send[3] = { 0XAC };				/*发送数据缓存*/
	send[0] = 0XAC;
	send[1] = 0XAC;
	send[2] = 0;							/*数据的处理*/
	Serial.write(send, 3);				/*串口发送数据*/

	byte receive[3] = { 0 };				/*接收数据缓存*/
	while (!Serial.available());          /*等待模块回复*/
	while (Serial.available() > 0)        /*串口读取字符串*/
	{
		receive[i] = Serial.read();       /*读取返回数据的存储*/
										  //		Serial.println(receive[i], HEX);
		i++;
		delay(2);
	}
	/*返回*/
	if (0X5C == receive[0])
	{
		return true;
	}
	else
	{
		return false;
	}
}
