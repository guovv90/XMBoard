#include "ArduBits_ASR740.h"

ASR_740::ASR_740(uint8_t rx, uint8_t tx) : mySerial(SoftwareSerial(rx, tx)) /*��ʼ���б����õ�������ڳ�ʼ���б������ʼ��*/
{
	mySerial.begin(115200);
	mySerial.setTimeout(1000); //����find��ʱʱ��
	continuous = 0;
	one = 0;
}
ASR_740::~ASR_740()             /*��������*/
{

}

/*
*ASR_init()
*��ʼ��ģ��
*/
bool ASR_740::ASR_init(void)
{
	int i = 0;								/*�±�*/
	byte send[] = { 0XA0,0XA0,0XA0 };		/*�������ݻ���*/
	byte receive[3] = { 0 };				/*�������ݻ���*/
	mySerial.write(send, 3);				/*���ڷ�������*/
	delay(10);
	while (!mySerial.available());          /*�ȴ�ģ��ظ�*/
	while (mySerial.available() > 0)        /*���ڶ�ȡ�ַ���*/
	{
		receive[i] = mySerial.read();       /*��ȡ�������ݵĴ洢*/
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
*����������
*/
bool ASR_740::ASR_sens(unsigned int sens)
{
	if (sens < 0 || sens > 100)			/*0X3F0F*/
	{
		return false;
	}
	sens = sens * 160;
	int i = 0;								/*�±�*/
	byte send[3] = {0XA1};					/*�������ݻ���*/
	send[0] = 0XA1;
	send[1] = sens >> 8;
	send[2] = sens;							/*���ݵĴ���*/
	
	byte receive[3] = { 0 };				/*�������ݻ���*/
	mySerial.write(send, 3);				/*���ڷ�������*/
	delay(10);
	while (!mySerial.available());          /*�ȴ�ģ��ظ�*/
	while (mySerial.available() > 0)        /*���ڶ�ȡ�ַ���*/
	{
		receive[i] = mySerial.read();       /*��ȡ�������ݵĴ洢*/
//		Serial.println(receive[i], HEX);
		i++;
		delay(2);
	}
	/*����*/
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
*��������
*/
bool ASR_740::ASR_volume(unsigned int volume)
{
	if (volume < 0 || volume > 100)		/*0X2830*/
	{
		return false;
	}
	volume = volume * 100;
	int i = 0;								/*�±�*/
	byte send[3] = { 0XA2 };				/*�������ݻ���*/
	send[0] = 0XA2;
	send[1] = volume >> 8;
	send[2] = volume;						/*���ݵĴ���*/

	byte receive[3] = { 0 };				/*�������ݻ���*/
	mySerial.write(send, 3);				/*���ڷ�������*/
	delay(10);
	while (!mySerial.available());          /*�ȴ�ģ��ظ�*/
	while (mySerial.available() > 0)        /*���ڶ�ȡ�ַ���*/
	{
		receive[i] = mySerial.read();       /*��ȡ�������ݵĴ洢*/
//		Serial.println(receive[i], HEX);
		i++;
		delay(2);
	}
	/*����*/
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
*����ʶ�����
*/
bool ASR_740::ASR_group(unsigned int group)		
{
	if (group < 0 || group > 65535)			/*0XFF*/
	{
		return false;
	}
	int i = 0;								/*�±�*/
	byte send[3] = {0XA9};					/*�������ݻ���*/
	send[0] = 0XA9;
	send[2] = group >> 8;
	send[1] = group;						/*���ݵĴ���*/

	byte receive[3] = { 0 };				/*�������ݻ���*/
	mySerial.write(send, 3);				/*���ڷ�������*/
	delay(10);
	while (!mySerial.available());          /*�ȴ�ģ��ظ�*/
	while (mySerial.available() > 0)        /*���ڶ�ȡ�ַ���*/
	{
		receive[i] = mySerial.read();       /*��ȡ�������ݵĴ洢*/
//		Serial.println(receive[i], HEX);
		i++;
		delay(2);
	}
	/*����*/
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
*����һ��ʶ��
*/
unsigned int ASR_740::ASR_start_one_discern(unsigned char time)
{
	one = 0;
	if (time < 0 || time > 255)				/*0XFF*/
	{
		return false;
	}
	int i = 0;								/*�±�*/
	byte send[3] = { 0XAA };				/*�������ݻ���*/
	send[0] = 0XAA;
	send[1] = time;
	send[2] = 0;							/*���ݵĴ���*/
	mySerial.write(send, 3);				/*���ڷ�������*/
	byte receive[3] = { 0 };				/*�������ݻ���*/
	while (!mySerial.available());          /*�ȴ�ģ��ظ�*/
	while (mySerial.available() > 0)        /*���ڶ�ȡ�ַ���*/
	{
		receive[i] = mySerial.read();       /*��ȡ�������ݵĴ洢*/
//		Serial.println(receive[i], HEX);
		i++;
		delay(2);
	}
	/*����*/
	if ( (0X5A == receive[0]) && (0XFF != receive[1]))					/*��ȡ����ʶ��*/
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
*��������ʶ��
*/
unsigned int ASR_740::ASR_one_receive(void)
{

	return one;
}

/*
*ASR_start_continuous_discern(void)
*��������ʶ��
*/
bool ASR_740::ASR_start_continuous_discern(void)
{
	int i = 0;								/*�±�*/
	byte send[3] = { 0XAB };				/*�������ݻ���*/
	send[0] = 0XAB;
	send[1] = 0XAB;
	send[2] = 0;							/*���ݵĴ���*/
	mySerial.write(send, 3);				/*���ڷ�������*/
	return true;
}

/*
*ASR_start_receive
*����ʶ����ȡʶ����
*/
unsigned int ASR_740::ASR_start_receive(void)
{

	int i = 0;								/*�±�*/
	byte receive[3] = { 0 };				/*�������ݻ���*/
	while (mySerial.available() > 0)        /*���ڶ�ȡ�ַ���*/
	{
		receive[i] = mySerial.read();       /*��ȡ�������ݵĴ洢*/
//		Serial.print("0X");
//		Serial.println(receive[i], HEX);
		i++;
		delay(2);
	}
	/*����*/
	if (0X5B == receive[0] && 0X7F != receive[1] && 0XFF != receive[2])					/*��ȡ����ʶ�������ʶ��*/
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
*�˳�ʶ��
*/
bool ASR_740::ASR_quit_discern(void)					
{
	int i = 0;								/*�±�*/
	byte send[3] = { 0XAC };				/*�������ݻ���*/
	send[0] = 0XAC;
	send[1] = 0XAC;
	send[2] = 0;							/*���ݵĴ���*/
	mySerial.write(send, 3);				/*���ڷ�������*/

	byte receive[3] = { 0 };				/*�������ݻ���*/
	while (!mySerial.available());          /*�ȴ�ģ��ظ�*/
	while (mySerial.available() > 0)        /*���ڶ�ȡ�ַ���*/
	{
		receive[i] = mySerial.read();       /*��ȡ�������ݵĴ洢*/
//		Serial.println(receive[i], HEX);
		i++;
		delay(2);
	}
											/*����*/
	if (0X5C == receive[0])
	{
		return true;
	}
	else
	{
		return false;
	}
}

/*-----------------Ӳ������-------------------*/
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
	int i = 0;									/*�±�*/
	byte send[3] = { 0XA1 };					/*�������ݻ���*/
	send[0] = 0XA1;
	send[1] = sens >> 8;
	send[2] = sens;							/*���ݵĴ���*/

	byte receive[3] = { 0 };				/*�������ݻ���*/
	Serial.write(send, 3);				/*���ڷ�������*/
	delay(10);
	while (!Serial.available());          /*�ȴ�ģ��ظ�*/
	while (Serial.available() > 0)        /*���ڶ�ȡ�ַ���*/
	{
		receive[i] = Serial.read();       /*��ȡ�������ݵĴ洢*/
		i++;
		delay(2);
	}
	/*����*/
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
	int i = 0;								/*�±�*/
	byte send[3] = { 0XA2 };				/*�������ݻ���*/
	send[0] = 0XA2;
	send[1] = volume >> 8;
	send[2] = volume;						/*���ݵĴ���*/

	byte receive[3] = { 0 };				/*�������ݻ���*/
	Serial.write(send, 3);				/*���ڷ�������*/
	delay(10);
	while (!Serial.available());          /*�ȴ�ģ��ظ�*/
	while (Serial.available() > 0)        /*���ڶ�ȡ�ַ���*/
	{
		receive[i] = Serial.read();       /*��ȡ�������ݵĴ洢*/
										  //		Serial.println(receive[i], HEX);
		i++;
		delay(2);
	}
	/*����*/
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
	int i = 0;								/*�±�*/
	byte send[3] = { 0XA9 };					/*�������ݻ���*/
	send[0] = 0XA9;
	send[2] = group >> 8;
	send[1] = group;						/*���ݵĴ���*/

	byte receive[3] = { 0 };				/*�������ݻ���*/
	Serial.write(send, 3);				/*���ڷ�������*/
	delay(10);
	while (!Serial.available());          /*�ȴ�ģ��ظ�*/
	while (Serial.available() > 0)        /*���ڶ�ȡ�ַ���*/
	{
		receive[i] = Serial.read();       /*��ȡ�������ݵĴ洢*/
		i++;
		delay(2);
	}
	/*����*/
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
	int i = 0;								/*�±�*/
	byte send[3] = { 0XAA };				/*�������ݻ���*/
	send[0] = 0XAA;
	send[1] = time;
	send[2] = 0;							/*���ݵĴ���*/
	Serial.write(send, 3);				/*���ڷ�������*/
	byte receive[3] = { 0 };				/*�������ݻ���*/
	while (!Serial.available());          /*�ȴ�ģ��ظ�*/
	while (Serial.available() > 0)        /*���ڶ�ȡ�ַ���*/
	{
		receive[i] = Serial.read();       /*��ȡ�������ݵĴ洢*/
										  //		Serial.println(receive[i], HEX);
		i++;
		delay(2);
	}
	/*����*/
	if ((0X5A == receive[0]) && (0XFF != receive[1]))					/*��ȡ����ʶ��*/
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
	int i = 0;								/*�±�*/
	byte send[3] = { 0XAB };				/*�������ݻ���*/
	send[0] = 0XAB;
	send[1] = 0XAB;
	send[2] = 0;							/*���ݵĴ���*/
	Serial.write(send, 3);				/*���ڷ�������*/
	return true;
}

unsigned int SerialASR_740::ASR_start_receive(void)
{
	int i = 0;								/*�±�*/
	byte receive[3] = { 0 };				/*�������ݻ���*/
	while (Serial.available() > 0)        /*���ڶ�ȡ�ַ���*/
	{
		receive[i] = Serial.read();       /*��ȡ�������ݵĴ洢*/
		i++;
		delay(2);
	}
	/*����*/
	if (0X5B == receive[0] && 0X7F != receive[1] && 0XFF != receive[2])					/*������ʶ��*/
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
	int i = 0;								/*�±�*/
	byte send[3] = { 0XAC };				/*�������ݻ���*/
	send[0] = 0XAC;
	send[1] = 0XAC;
	send[2] = 0;							/*���ݵĴ���*/
	Serial.write(send, 3);				/*���ڷ�������*/

	byte receive[3] = { 0 };				/*�������ݻ���*/
	while (!Serial.available());          /*�ȴ�ģ��ظ�*/
	while (Serial.available() > 0)        /*���ڶ�ȡ�ַ���*/
	{
		receive[i] = Serial.read();       /*��ȡ�������ݵĴ洢*/
										  //		Serial.println(receive[i], HEX);
		i++;
		delay(2);
	}
	/*����*/
	if (0X5C == receive[0])
	{
		return true;
	}
	else
	{
		return false;
	}
}
