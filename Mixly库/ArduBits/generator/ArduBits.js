'use strict';
goog.provide('Blockly.Arduino.ArduBits');
goog.require('Blockly.Arduino');

//----------------------------------------------------
////----------------------------------------------------
/////----------------------------------------------------

//执行器_音乐播放器_指定曲目
Blockly.Arduino.ArduBits_QJ004_SONG = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var NUM = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  var code = '';
  if(0 == TX && 1 == RX)
  {

    Blockly.Arduino.definitions_['var_QJ004'] = 'SerialMP3_QJ004 MP3;';
    Blockly.Arduino.setups_['setup_QJ004'] = 'MP3.SerialMP3_init();';
    code += 'MP3.SerialMP3_THREE_CMD('+NUM+');\n';
  }
  else
  {
    Blockly.Arduino.definitions_['var_ASR'] = 'MP3_QJ004 MP3('+TX+','+RX+');';
    code += 'MP3.MP3_THREE_CMD('+NUM+');\n';
  }     
  return code;
};

//执行器_音乐播放器_功能选择
Blockly.Arduino.ArduBits_QJ004_FUN = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  var dropdown_type = this.getFieldValue('QJ004_FUN');
  var code = '';
  if(0 == TX && 1 == RX)
  {
    Blockly.Arduino.definitions_['var_QJ004'] = 'SerialMP3_QJ004 MP3;';
    Blockly.Arduino.setups_['setup_QJ004'] = 'MP3.SerialMP3_init();';
    if (dropdown_type == 0) 
    {
      code += 'MP3.SerialMP3_TWO_CMD('+dropdown_type+');\n';
    }
    else
    {
      code += 'MP3.SerialMP3_ONE_CMD('+dropdown_type+');\n';
    }
  }
  else
  {
    Blockly.Arduino.definitions_['var_ASR'] = 'MP3_QJ004 MP3('+TX+','+RX+');';
    if (dropdown_type == 0) 
    {
      code += 'MP3.MP3_TWO_CMD('+dropdown_type+');\n';
    }
    else
    {
      code += 'MP3.MP3_ONE_CMD('+dropdown_type+');\n';
    }
  } 

  return code;
};

//辅助块_语音识别块_睡眠
Blockly.Arduino.ArduBits_ASR_740_SLEEP = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  if(0 == TX && 1 == RX)
  {
      Blockly.Arduino.definitions_['var_ASR'] = 'SerialASR_740 ASR;';
      Blockly.Arduino.setups_['setup_ASR'] = 'ASR.ASR_init();';
  }
  else
  {
    Blockly.Arduino.definitions_['var_ASR'] = 'ASR_740 ASR('+TX+','+RX+');';
  }
  
  var code = '';
  code += 'ASR.ASR_group(1);\n';
  code += 'ASR.ASR_start_continuous_discern();\n';
  return code;
  
};

//辅助块_语音识别块_唤醒睡眠
Blockly.Arduino.ArduBits_ASR_740_AWAKE = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  if(0 == TX && 1 == RX)
  {
      Blockly.Arduino.definitions_['var_ASR'] = 'SerialASR_740 ASR;';
      Blockly.Arduino.setups_['setup_ASR'] = 'ASR.ASR_init();';
  }
  else
  {
    Blockly.Arduino.definitions_['var_ASR'] = 'ASR_740 ASR('+TX+','+RX+');';
  }  
  Blockly.Arduino.setups_['setup_ASR'] = 'ASR.ASR_group(1);';
  Blockly.Arduino.setups_['setup_ASR1'] = 'ASR.ASR_start_continuous_discern();';
  
  var code = '';
  code += 'ASR.ASR_start_receive()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];

};

//辅助块_语音识别块_获取识别数值
Blockly.Arduino.ArduBits_ASR_740_GET = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_type = this.getFieldValue('ASR');
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  if(0 == TX && 1 == RX)
  {
      Blockly.Arduino.definitions_['var_ASR'] = 'SerialASR_740 ASR;';
      Blockly.Arduino.setups_['setup_ASR'] = 'ASR.ASR_init();';
  }
  else
  {
    Blockly.Arduino.definitions_['var_ASR'] = 'ASR_740 ASR('+TX+','+RX+');';
  }
  var code = '';
  if(dropdown_type == 0)
  {
    code += 'ASR.ASR_one_receive()';
  }
  if(dropdown_type == 1)
  {
    code += 'ASR.ASR_start_receive()';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//辅助块_语音识别块_启动识别
Blockly.Arduino.ArduBits_ASR_740_START = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var NUM = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_type = this.getFieldValue('ASR');
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  if(0 == TX && 1 == RX)
  {
      Blockly.Arduino.definitions_['var_ASR'] = 'SerialASR_740 ASR;';
      Blockly.Arduino.setups_['setup_ASR'] = 'ASR.ASR_init();';
  }
  else
  {
    Blockly.Arduino.definitions_['var_ASR'] = 'ASR_740 ASR('+TX+','+RX+');';
  }
  var code = '';  
  if(dropdown_type == 0)
  {
    code += 'ASR.ASR_group('+NUM+');\n';
    code += 'ASR.ASR_start_one_discern(10);\n';
  }
  if(dropdown_type == 1)
  {
    code += 'ASR.ASR_group('+NUM+');\n';
    code += 'ASR.ASR_start_continuous_discern();\n';
  }
  if(dropdown_type == 2)
  {
    code += 'ASR.ASR_quit_discern();\n';
  }

  return code;
};



//辅助块_语音识别块_灵敏度/音量
Blockly.Arduino.ArduBits_ASR_740_SENS = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var NUM = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_type = this.getFieldValue('ASR_SEN');
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  if(0 == TX && 1 == RX)
  {
      Blockly.Arduino.definitions_['var_ASR'] = 'SerialASR_740 ASR;';
      Blockly.Arduino.setups_['setup_ASR'] = 'ASR.ASR_init();';
  }
  else
  {
    Blockly.Arduino.definitions_['var_ASR'] = 'ASR_740 ASR('+TX+','+RX+');';
  }
  var code = '';
  if(dropdown_type == "A")
  {
    code += 'ASR.ASR_sens('+NUM+');\n';
  }
  if(dropdown_type == "B")
  {
    code += 'ASR.ASR_volume('+NUM+');\n';
  }
    
  return code;
};


//传感器-手势识别-获取数据
Blockly.Arduino.ArduBits_Gesture_APDS = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_APDS'] = 'SparkFun_APDS9960 apds;';
  Blockly.Arduino.setups_['setup_APDS'] = 'apds.init();';
  Blockly.Arduino.setups_['setup_APDS1'] = 'apds.enableGestureSensor(true);';
  var code = '';
  code += 'apds.handleGesture()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


//物联网_ZigBee物联网_接收NET数据
Blockly.Arduino.ArduBits_TCS34725 = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_type = this.getFieldValue('ZigBee_TYPE');
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_ZigBee'] = 'ZigBee_E18 ZigBee('+TX+','+RX+');';
  var code = '';
  if(dropdown_type == 0)
  {
    code += 'ZigBee.ZigBee_Receive_Net_Data()';
  }
  if(dropdown_type == 1)
  {
    code += 'ZigBee.ZigBee_Receive_Net_Addr()';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
  return '';
};

//物联网_ZigBee物联网_接收MAC数据
Blockly.Arduino.ArduBits_ZigBee_GET_MAC_DATA = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_type = this.getFieldValue('ZigBee_TYPE');
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_ZigBee'] = 'ZigBee_E18 ZigBee('+TX+','+RX+');';
  var code = '';
  if(dropdown_type == 0)
  {
    code += 'ZigBee.ZigBee_Receive_MAC_Data()';
  }
  if(dropdown_type == 1)
  {
    code += 'ZigBee.ZigBee_Receive_MAC_Addr()';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
  return '';
};

//物联网_ZigBee物联网_发送数据NET
Blockly.Arduino.ArduBits_ZigBee_SEND1 = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var NUM = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT1 = Blockly.Arduino.valueToCode(this, 'TEXT1', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_ZigBee'] = 'ZigBee_E18 ZigBee('+TX+','+RX+');';
  var code = '';
  code += ' ZigBee.ZigBee_unicast_send(2,'+NUM+','+TEXT1+');\n';
  return code;
};

//物联网_ZigBee物联网_发送数据MAC
Blockly.Arduino.ArduBits_ZigBee_SEND2 = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var text1 = this.getFieldValue('TEXT1');
  var text2 = this.getFieldValue('TEXT2');
  var text3 = this.getFieldValue('TEXT3');
  var text4 = this.getFieldValue('TEXT4');
  var text5 = this.getFieldValue('TEXT5');
  var text6 = this.getFieldValue('TEXT6');
  var text7 = this.getFieldValue('TEXT7');
  var text8 = this.getFieldValue('TEXT8');
  var TEXT1 = Blockly.Arduino.valueToCode(this, 'TEXT1', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_type = this.getFieldValue('ZigBee_TYPE');
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_lists' + text1+text2+text3+text4+text5+text6+text7+text8] = 'byte ' + text1+text2+text3+text4+text5+text6+text7+text8 + '[]={0X' + text1 + ',0X' + text2 + ',0X' + text3 + ',0X' + text4 + ',0X' + text5 + ',0X' + text6 + ',0X' + text7 + ',0X' + text8 + '};\n';
  Blockly.Arduino.definitions_['var_ZigBee'] = 'ZigBee_E18 ZigBee('+TX+','+RX+');';
  var code = '';
  code += ' ZigBee.ZigBee_unicast_send(3,ZigBee.ZigBee_read_MAC_addr('+text1+text2+text3+text4+text5+text6+text7+text8+'),'+TEXT1+');\n';
  return code;
};


//物联网_ZigBee物联网_获取网络短MAC地址
Blockly.Arduino.ArduBits_ZigBee_GET = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_type = this.getFieldValue('ZigBee_TYPE');
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_ZigBee'] = 'ZigBee_E18 ZigBee('+TX+','+RX+');';
  var code = '';
  if(dropdown_type == 0)
  {
    code += 'ZigBee.ZigBee_MAC_Deal()';
  }
  if(dropdown_type == 1)
  {
    code += 'ZigBee.ZigBee_read_network_addr()';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
  return '';
};

//物联网_ZigBee物联网_初始配置
Blockly.Arduino.ArduBits_ZigBee_INT = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var NUM3 = Blockly.Arduino.valueToCode(this, 'NUM3', Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_type = this.getFieldValue('ZigBee_TYPE');
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_ZigBee'] = 'ZigBee_E18 ZigBee('+TX+','+RX+');';
  Blockly.Arduino.setups_['setup_ZigBee1'] = 'ZigBee.ZigBee_config_all('+dropdown_type+','+NUM3+');' ;
  return ''
};


//辅块器_GSM物联网_发射GPS数据
Blockly.Arduino.ArduBits_GSM_SENDGPS = function() {
  var TEXT1 = Blockly.Arduino.valueToCode(this, 'TEXT1', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT2 = Blockly.Arduino.valueToCode(this, 'TEXT2', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT3 = Blockly.Arduino.valueToCode(this, 'TEXT3', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_GSM'] = 'GSM_SIM800C GSM;';
  Blockly.Arduino.setups_['setup_GSM1'] = 'GSM.gsmint();' ;
  
  var code = '';
  code += ' GSM.sendintstr2(NULL,'+TEXT1+','+TEXT2+','+TEXT3+');\n';
  return code;
};

//辅块器_WIFI物联网_发射GPS数据
Blockly.Arduino.ArduBits_WIFI_SENDGPS = function() {
  var TEXT1 = Blockly.Arduino.valueToCode(this, 'TEXT1', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT2 = Blockly.Arduino.valueToCode(this, 'TEXT2', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT3 = Blockly.Arduino.valueToCode(this, 'TEXT3', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_WIFI'] = 'WiFi_ESP8266 WiFi;';
  Blockly.Arduino.setups_['setup_WIFI1'] = 'WiFi.wifiint();' ;
  var code = '';
  code += ' WiFi.sendintstr1(NULL,'+TEXT1+','+TEXT2+','+TEXT3+');\n';
  return code;
};

//辅助块_GPS_获取经纬度高度
Blockly.Arduino.ArduBits_GPS_LON_LAT = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_GPS'] = 'GPS_ATM GPS('+TX+','+RX+');';
  Blockly.Arduino.setups_['setup_GPS1'] = 'GPS.Gps_int();' ;

  var dropdown_type = this.getFieldValue('GPS_NUM');
  var code = '';
  if (dropdown_type == "A") code += 'GPS.Tran_Slongitude';
  if (dropdown_type == "B") code += 'GPS.Tran_Slatitude';
  if (dropdown_type == "C") code += 'GPS.hight';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


//辅助块_GPS_解析数据
Blockly.Arduino.ArduBits_GPS_ATGM_PARSE = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_GPS'] = 'GPS_ATM GPS('+TX+','+RX+');';
  Blockly.Arduino.setups_['setup_GPS1'] = 'GPS.Gps_int();' ;
  var code = '';
  code += 'GPS.parseGpsBuffer()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
  return '';
};


//辅助块_GSM物联网_获取短信
Blockly.Arduino.ArduBits_GSM_GETMEG = function() {
  var dropdown_type = this.getFieldValue('GSM_GETMEG');
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_GSM'] = 'GSM_SIM800C GSM;';
  Blockly.Arduino.setups_['setup_GSM1'] = 'GSM.gsmint();' ;
  Blockly.Arduino.setups_['setup_GSM2'] = 'GSM.Rx_meg_int();' ;
  //Blockly.Arduino.setups_['setup_GSM3'] = 'interruptSetup();' ;
  var code = '';
  if (dropdown_type == "A") code += 'GSM.recvmeg()';
  if (dropdown_type == "B") code += 'GSM.RX_number'; 
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};



//辅助块_GSM物联网_解析短信
Blockly.Arduino.ArduBits_GSM_RXMEG = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_GSM'] = 'GSM_SIM800C GSM;';
  Blockly.Arduino.setups_['setup_GSM1'] = 'GSM.gsmint();' ;
  Blockly.Arduino.setups_['setup_GSM2'] = 'GSM.Rx_meg_int();' ;
  var code = '';
  code += 'GSM.Rx_meg();\n';
  return code;
};


//辅助块_GSM物联网_发送信息
Blockly.Arduino.ArduBits_GSM_CF = function() {
  var dropdown_type = this.getFieldValue('GSM_MODE1');
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT1 = Blockly.Arduino.valueToCode(this, 'TEXT1', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['var_GSM'] = 'GSM_SIM800C GSM;';
  Blockly.Arduino.setups_['setup_GSM1'] = 'GSM.gsmint();' ;
  if(dropdown_type == "B")
  {
    Blockly.Arduino.setups_['setup_GSM2'] = 'GSM.DoCmdOk("AT+CMGF=1","OK");';
    

  }
  else
  {
    Blockly.Arduino.setups_['setup_GSM3']='GSM.DoCmdOk("AT+CMGF=0","OK");';
  }

  var code = '';
  if (dropdown_type == "B") code += 'GSM.SendMessage('+TEXT+','+TEXT1+');\n';
  if (dropdown_type == "A") code += 'GSM.DoCmdOk_meg("AT+CSCA?","OK");\nGSM.SendMessage_PDU(100,'+TEXT+','+TEXT1+');\n'; 
  return code;
};



//来电检测
Blockly.Arduino.ArduBits_GSM_RING = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_GSM'] = 'GSM_SIM800C GSM;';
  Blockly.Arduino.setups_['setup_GSM1'] = 'GSM.gsmint();' ;
  var code = '';
  code += 'GSM.Caller_ID()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//辅助块_GSM物联网_接电话
Blockly.Arduino.ArduBits_GSM_AH = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_GSM'] = 'GSM_SIM800C GSM;';
  Blockly.Arduino.setups_['setup_GSM1'] = 'GSM.gsmint();' ;

  var dropdown_type = this.getFieldValue('GSM_AH');
  var code = '';
  if (dropdown_type == "A") code += 'GSM.DoCmdOk("ATA","OK");\n';
  if (dropdown_type == "B") code += 'GSM.DoCmdOk("ATH","OK");\n';
  return code;
};


//辅助块_GSM物联网_打电话
Blockly.Arduino.ArduBits_GSM_ATD = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_GSM'] = 'GSM_SIM800C GSM;';
  Blockly.Arduino.setups_['setup_GSM1'] = 'GSM.gsmint();' ;
  var NUM = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  var code = '';
  code += 'GSM.DoCmdOk("ATD'+NUM+';","OK");\n';
  return code;
};




//辅助块_GSM物联网_接收数值和名称
Blockly.Arduino.ArduBits_GSM_RX = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_GSM'] = 'GSM_SIM800C GSM;';
  Blockly.Arduino.setups_['setup_GSM1'] = 'GSM.gsmint();' ;
  var dropdown_type = this.getFieldValue('GSM_NUM');
  var code = '';
  if (dropdown_type == "A") code += 'GSM.recvname()';
  if (dropdown_type == "B") code += 'GSM.recvdata()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//辅助块_GSM物联网_下发解析成功
Blockly.Arduino.ArduBits_GSM_Deal = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_GSM'] = 'GSM_SIM800C GSM;';
  Blockly.Arduino.setups_['setup_GSM1'] = 'GSM.gsmint();' ;
  var code = '';
  code += 'GSM.recvdeal();\n';
  return code;
};



//辅块器_GSM物联网_发射汉字数据
Blockly.Arduino.ArduBits_GSM_TX_HZ = function() {
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT1 = Blockly.Arduino.valueToCode(this, 'TEXT1', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_GSM'] = 'GSM_SIM800C GSM;';
  Blockly.Arduino.setups_['setup_GSM1'] = 'GSM.gsmint();' ;
  var code = '';
  code += 'GSM.sendstring(NULL,'+TEXT+','+TEXT1+');\n';
  return code;
};

//辅块器_GSM物联网_发射数据
Blockly.Arduino.ArduBits_GSM_TX = function() {
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
  var NUM = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_GSM'] = 'GSM_SIM800C GSM;';
  Blockly.Arduino.setups_['setup_GSM1'] = 'GSM.gsmint();' ;
  var code = '';
  code += 'GSM.sendint(NULL,'+TEXT+','+NUM+');\n';
  return code;
};

//辅助块_GSM物联网_协议成功
Blockly.Arduino.ArduBits_GSM_EDP = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_GSM'] = 'GSM_SIM800C GSM;';
  Blockly.Arduino.setups_['setup_GSM1'] = 'GSM.gsmint();' ;
  var code = '';
  code += 'GSM.EDP_Connect()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
  return '';
};


//辅助块_GSM物联网_初始设置
Blockly.Arduino.ArduBits_GSM_SET = function() {
  var TEXT1 = Blockly.Arduino.valueToCode(this, 'TEXT1', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT2 = Blockly.Arduino.valueToCode(this, 'TEXT2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_GSM'] = 'GSM_SIM800C GSM;';
  Blockly.Arduino.setups_['setup_GSM1'] = 'GSM.gsmint();' ;
  Blockly.Arduino.setups_['setup_GSM2'] = 'GSM.gsmconfig();' ;
  Blockly.Arduino.setups_['setup_GSM3'] = 'GSM.cloudconfig('+TEXT1+','+TEXT2+');' ;
  return '';
};

//单次执行模块
Blockly.Arduino.ArduBits_ONCE_RUN = function () {
    // Do 
    var argument0 = Blockly.Arduino.valueToCode(this, 'NUM');
    var branch = Blockly.Arduino.statementToCode(this, 'DO');

    Blockly.Arduino.definitions_['var_temp'+argument0 ] = 'int temp_'+ argument0 +' = 0;';
    
    return 'if (' + argument0 + ' != temp_'+ argument0 +') \n{\n  temp_'+ argument0 +' = '+ argument0 +';\n ' + branch + '\n}\n';
};

//辅助块_WIFI物联网_接收数值和名称
Blockly.Arduino.ArduBits_WIFI_RX = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_WIFI'] = 'WiFi_ESP8266 WiFi;';
  Blockly.Arduino.setups_['setup_WIFI1'] = 'WiFi.wifiint();' ;
  var dropdown_type = this.getFieldValue('WIFI_NUM');
  var code = '';
  if (dropdown_type == "A") code += 'WiFi.recvname()';
  if (dropdown_type == "B") code += 'WiFi.recvdata()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//辅助块_WIFI物联网_下发解析成功
Blockly.Arduino.ArduBits_WIFI_Deal = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_WIFI'] = 'WiFi_ESP8266 WiFi;';
  Blockly.Arduino.setups_['setup_WIFI1'] = 'WiFi.wifiint();' ;
  var code = '';
  code += 'WiFi.recvdeal();\n';
  return code;
};


//辅块器_WIFI物联网_发射数据
Blockly.Arduino.ArduBits_WIFI_TX_HZ = function() {
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT1 = Blockly.Arduino.valueToCode(this, 'TEXT1', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_WIFI'] = 'WiFi_ESP8266 WiFi;';
  Blockly.Arduino.setups_['setup_WIFI1'] = 'WiFi.wifiint();' ;
  var code = '';
  code += 'WiFi.sendstring(NULL,'+TEXT+','+TEXT1+');\n';
  return code;
};

//辅块器_WIFI物联网_发射数据
Blockly.Arduino.ArduBits_WIFI_TX = function() {
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
  var NUM = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_WIFI'] = 'WiFi_ESP8266 WiFi;';
  Blockly.Arduino.setups_['setup_WIFI1'] = 'WiFi.wifiint();' ;
  var code = '';
  code += 'WiFi.sendint(NULL,'+TEXT+','+NUM+');\n';
  return code;
};

//辅助块_WIFI物联网_协议成功
Blockly.Arduino.ArduBits_WIFI_EDP = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_WIFI'] = 'WiFi_ESP8266 WiFi;';
  Blockly.Arduino.setups_['setup_WIFI1'] = 'WiFi.wifiint();' ;
  var code = '';
  code += 'WiFi.EDP_Connect()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
  return '';
};

//辅助块_WIFI物联网_初始设置
Blockly.Arduino.ArduBits_WIFI_SET = function() {
  var TEXT1 = Blockly.Arduino.valueToCode(this, 'TEXT1', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT2 = Blockly.Arduino.valueToCode(this, 'TEXT2', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT3 = Blockly.Arduino.valueToCode(this, 'TEXT3', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT4 = Blockly.Arduino.valueToCode(this, 'TEXT4', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_WIFI'] = 'WiFi_ESP8266 WiFi;';
  Blockly.Arduino.setups_['setup_WIFI1'] = 'WiFi.wifiint();' ;
  Blockly.Arduino.setups_['setup_WIFI2'] = 'WiFi.wificonfig('+TEXT1+','+TEXT2+');' ;
  Blockly.Arduino.setups_['setup_WIFI3'] = 'WiFi.cloudconfig('+TEXT3+','+TEXT4+');' ;
  return '';
};

//遥控器_编程遥控器_蜂鸣震动
Blockly.Arduino.ArduBits_A5_CON = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_A5'] = 'Telecontrol Telecontrol;';
  Blockly.Arduino.setups_['setup_A5'] = 'Telecontrol.Init();';
  var dropdown_type = this.getFieldValue('A5_CONNUM');
  var NUM = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  var code = '';
  if (dropdown_type == "A") code += 'analogWrite(6,'+NUM+');\n';
  if (dropdown_type == "B") code += 'analogWrite(5,'+NUM+');\n';
  return code;
};

//遥控器_编程遥控器_LED灯
Blockly.Arduino.ArduBits_A5_LED = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_A5'] = 'Telecontrol Telecontrol;';
  Blockly.Arduino.setups_['setup_A5'] = 'Telecontrol.Init();';
  var dropdown_type = this.getFieldValue('A5_LEDNUM');
  var LED_HL = this.getFieldValue('A5_LEDTEP');
  var code = '';
  if (dropdown_type == "A") code += 'digitalWrite(13,'+LED_HL+');\n';
  if (dropdown_type == "B") code += 'digitalWrite(12,'+LED_HL+');\n';
  if (dropdown_type == "C") code += 'digitalWrite(11,'+LED_HL+');\n';

  return code;
};

//遥控器_编程遥控器_获取电量
Blockly.Arduino.ArduBits_A5_Power = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_A5'] = 'Telecontrol Telecontrol;';
  Blockly.Arduino.setups_['setup_A5'] = 'Telecontrol.Init();';
  var code = '';
  code += '(map(analogRead(A3), 572, 860, 0, 100))';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//遥控器_编程遥控器_获取滑杆\声音\光敏\摇杆
Blockly.Arduino.ArduBits_A5_Sonser = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_A5'] = 'Telecontrol Telecontrol;';
  Blockly.Arduino.setups_['setup_A5'] = 'Telecontrol.Init();';
  var dropdown_type = this.getFieldValue('A5_SonserNUM');
  var code = '';
  if (dropdown_type == "A") code += 'analogRead(A1)';
  if (dropdown_type == "B") code += 'analogRead(A0)';
  if (dropdown_type == "C") code += 'analogRead(A2)';
  if (dropdown_type == "D") code += 'analogRead(A4)';
  if (dropdown_type == "E") code += 'analogRead(A5)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//遥控器_蓝牙遥控器_重力感应
Blockly.Arduino.ArduBits_A5_Rocker_ZL = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_A5'] = 'Telecontrol Telecontrol;';
  Blockly.Arduino.setups_['setup_A5'] = 'Telecontrol.Init();';
  var dropdown_type = this.getFieldValue('A5_FXZ');
  var code = '';
  if (dropdown_type == "w") code += 'digitalRead(7)';
  if (dropdown_type == "s") code += 'digitalRead(8)';
  if (dropdown_type == "a") code += 'digitalRead(9)';
  if (dropdown_type == "d") code += 'digitalRead(10)'; 
  if (dropdown_type == "t") code += '(digitalRead(7) == 0 && digitalRead(8) == 0) && (digitalRead(9) == 0 && digitalRead(10) == 0)'; 
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//遥控器_蓝牙遥控器_方向行程
Blockly.Arduino.ArduBits_A5_Rocker_FXDS = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_A5'] = 'Telecontrol Telecontrol;';
  Blockly.Arduino.setups_['setup_A5'] = 'Telecontrol.Init();';
  var dropdown_type = this.getFieldValue('A5_FXZ');
  var code = '';
  if (dropdown_type == "w") code += 'Telecontrol.W_Num()';
  if (dropdown_type == "s") code += 'Telecontrol.S_Num()';
  if (dropdown_type == "a") code += 'Telecontrol.A_Num()';
  if (dropdown_type == "d") code += 'Telecontrol.D_Num()'; 
  if (dropdown_type == "t") code += 'Telecontrol.T_Num()'; 
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//遥控器_编程遥控器_摇杆方向
Blockly.Arduino.ArduBits_A5_Rocker_FX = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_A5'] = 'Telecontrol Telecontrol;';
  Blockly.Arduino.setups_['setup_A5'] = 'Telecontrol.Init();';
  var dropdown_type = this.getFieldValue('A5_FXZ');
  var code = '';
  if (dropdown_type == "w") code += 'Telecontrol.W_Xal()';
  if (dropdown_type == "s") code += 'Telecontrol.S_Xal()';
  if (dropdown_type == "a") code += 'Telecontrol.A_Xal()';
  if (dropdown_type == "d") code += 'Telecontrol.D_Xal()'; 
  if (dropdown_type == "t") code += 'Telecontrol.T_Xal()'; 
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//遥控器_蓝牙遥控器_按键数值
Blockly.Arduino.ArduBits_A5_Button = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_A5'] = 'Telecontrol Telecontrol;';
  Blockly.Arduino.setups_['setup_A5'] = 'Telecontrol.Init();';
  var dropdown_type = this.getFieldValue('A5_ButtonNUM');
  var code = '';
  if (dropdown_type == "A") code += 'digitalRead(2)';
  if (dropdown_type == "B") code += 'digitalRead(3)';
  if (dropdown_type == "C") code += 'analogRead(A6) >= 512';
  if (dropdown_type == "D") code += 'analogRead(A7) >= 512';
  if (dropdown_type == "E") code += 'digitalRead(4)';

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//智能车_蝌蚪号_灰度巡线
Blockly.Arduino.ArduBits_Tadpole_Line = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_Tadpole'] = 'Tadpole Tadpole;';
  Blockly.Arduino.setups_['setup_Tadpole'] = 'Tadpole.Car_Init();';
  var dropdown_type = this.getFieldValue('Tadpole_LineNUM');
  var code = '';
  if (dropdown_type == "A") code += 'digitalRead(4)';
  if (dropdown_type == "B") code += 'digitalRead(2)';
  if (dropdown_type == "C") code += 'digitalRead(3)';
  if (dropdown_type == "D") code += 'digitalRead(7)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


//智能车_蝌蚪号_获取电量
Blockly.Arduino.ArduBits_Tadpole_Power = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_Tadpole'] = 'Tadpole Tadpole;';
  Blockly.Arduino.setups_['setup_Tadpole'] = 'Tadpole.Car_Init();';
  var code = '';
  code += '(map(analogRead(A0), 572, 860, 0, 100))';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//智能车_蝌蚪号_避障传感
Blockly.Arduino.ArduBits_Tadpole_Avoid = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_Tadpole'] = 'Tadpole Tadpole;';
  Blockly.Arduino.setups_['setup_Tadpole'] = 'Tadpole.Car_Init();';
  var dropdown_type = this.getFieldValue('Tadpole_AvoidNUM');
  var code = '';
  if (dropdown_type == "A") code += 'analogRead(A1)';
  if (dropdown_type == "B") code += 'analogRead(A2)';
  if (dropdown_type == "C") code += 'analogRead(A3)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//智能车_蝌蚪号_行驶控制
Blockly.Arduino.ArduBits_Tadpole_Voice = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_Tadpole'] = 'Tadpole Tadpole;';
  Blockly.Arduino.setups_['setup_Tadpole'] = 'Tadpole.Car_Init();';
  var dropdown_type = this.getFieldValue('Tadpole_VoiceNUM');
  var code = '';
  if (dropdown_type == "A") code += 'Tadpole.Car_Voice_One();\n';
  if (dropdown_type == "B") code += 'Tadpole.Car_Voice_Two();\n';
  if (dropdown_type == "C") code += 'Tadpole.Car_Voice_Three();\n';
  return code;
};

//智能车_蝌蚪号_行驶控制
Blockly.Arduino.ArduBits_Tadpole_Run = function() {
  var NUM = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_Tadpole'] = 'Tadpole Tadpole;';
  Blockly.Arduino.setups_['setup_Tadpole'] = 'Tadpole.Car_Init();';
  var dropdown_type = this.getFieldValue('Tadpole_NUM');
  var code = '';
  if (dropdown_type == "AA") code += 'Tadpole.Car_Forward('+NUM+');\n';
  if (dropdown_type == "BB") code += 'Tadpole.Car_Back('+NUM+');\n';
  if (dropdown_type == "CC") code += 'Tadpole.Car_Left('+NUM+');\n';
  if (dropdown_type == "DD") code += 'Tadpole.Car_Right('+NUM+');\n';
  if (dropdown_type == "EE") code += 'Tadpole.Car_Stop('+NUM+');\n';
  if (dropdown_type == "FF") code += 'Tadpole.Car_Single_Left('+NUM+');\n';
  if (dropdown_type == "GG") code += 'Tadpole.Car_Single_Right('+NUM+');\n';

  return code;
};

//遥控器_蓝牙遥控器_方向行程
Blockly.Arduino.ArduBits_BTYK_FXDS = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_BTSlave'+TX+RX] = 'BTSlave BTSlave_'+TX+'_'+RX+'('+TX+','+RX+');';
  Blockly.Arduino.setups_['setup_BTSlave'+TX+RX] = 'BTSlave_'+TX+'_'+RX+'.begin(38400);';
  if(TX==0 & RX==1)
  {
  var code ='BTSlave_'+TX+'_'+RX+'.Serial_Slave_RX_Snum()';
  }
  else
  {
  var code = 'BTSlave_'+TX+'_'+RX+'.Slave_RX_Snum()';
  }
  
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//遥控器_蓝牙遥控器_方向布尔
Blockly.Arduino.ArduBits_BTYK_FX = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_BTSlave'+TX+RX] = 'BTSlave BTSlave_'+TX+'_'+RX+'('+TX+','+RX+');';
  Blockly.Arduino.setups_['setup_BTSlave'+TX+RX] = 'BTSlave_'+TX+'_'+RX+'.begin(38400);';
  var dropdown_type = this.getFieldValue('BTYK_FXZ');
  var code = '';
  if(TX==0 & RX==1)
  {
    if (dropdown_type == "w") code += 'BTSlave_'+TX+'_'+RX+'.Serial_Slave_RX_Schar()=="w"';
    if (dropdown_type == "s") code += 'BTSlave_'+TX+'_'+RX+'.Serial_Slave_RX_Schar()=="s"';
    if (dropdown_type == "a") code += 'BTSlave_'+TX+'_'+RX+'.Serial_Slave_RX_Schar()=="a"';
    if (dropdown_type == "d") code += 'BTSlave_'+TX+'_'+RX+'.Serial_Slave_RX_Schar()=="d"'; 
    if (dropdown_type == "t") code += 'BTSlave_'+TX+'_'+RX+'.Serial_Slave_RX_Schar()=="t"'; 
  }
  else
  {
    if (dropdown_type == "w") code += 'BTSlave_'+TX+'_'+RX+'.Slave_RX_Schar()=="w"';
    if (dropdown_type == "s") code += 'BTSlave_'+TX+'_'+RX+'.Slave_RX_Schar()=="s"';
    if (dropdown_type == "a") code += 'BTSlave_'+TX+'_'+RX+'.Slave_RX_Schar()=="a"';
    if (dropdown_type == "d") code += 'BTSlave_'+TX+'_'+RX+'.Slave_RX_Schar()=="d"'; 
    if (dropdown_type == "t") code += 'BTSlave_'+TX+'_'+RX+'.Slave_RX_Schar()=="t"'; 
  }
  
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//遥控器_蓝牙遥控器_按键数值
Blockly.Arduino.ArduBits_BTYK_Button = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_BTSlave'+TX+RX] = 'BTSlave BTSlave_'+TX+'_'+RX+'('+TX+','+RX+');';
  Blockly.Arduino.setups_['setup_BTSlave'+TX+RX] = 'BTSlave_'+TX+'_'+RX+'.begin(38400);';
  var dropdown_type = this.getFieldValue('BTYK_BUT');
  var code = '';
  if(TX==0 & RX==1)
  {
    if (dropdown_type == "A") code += 'BTSlave_'+TX+'_'+RX+'.Serial_NA_Data()';
    if (dropdown_type == "B") code += 'BTSlave_'+TX+'_'+RX+'.Serial_NB_Data()';
    if (dropdown_type == "C") code += 'BTSlave_'+TX+'_'+RX+'.Serial_NC_Data()';
    if (dropdown_type == "D") code += 'BTSlave_'+TX+'_'+RX+'.Serial_ND_Data()';
    if (dropdown_type == "E") code += 'BTSlave_'+TX+'_'+RX+'.Serial_NE_Data()';
    if (dropdown_type == "F") code += 'BTSlave_'+TX+'_'+RX+'.Serial_NF_Data()';
  }
  else
  {
    if (dropdown_type == "A") code += 'BTSlave_'+TX+'_'+RX+'.NA_Data()';
    if (dropdown_type == "B") code += 'BTSlave_'+TX+'_'+RX+'.NB_Data()';
    if (dropdown_type == "C") code += 'BTSlave_'+TX+'_'+RX+'.NC_Data()';
    if (dropdown_type == "D") code += 'BTSlave_'+TX+'_'+RX+'.ND_Data()';
    if (dropdown_type == "E") code += 'BTSlave_'+TX+'_'+RX+'.NE_Data()';
    if (dropdown_type == "F") code += 'BTSlave_'+TX+'_'+RX+'.NF_Data()';
  }
  
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
//遥控器_蓝牙遥控器_配对密码
Blockly.Arduino.ArduBits_BTYK_PIN = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var PIN1 = this.getFieldValue('BTYK_NUM1');
  var PIN2 = this.getFieldValue('BTYK_NUM2');
  var PIN3 = this.getFieldValue('BTYK_NUM3');
  var PIN4 = this.getFieldValue('BTYK_NUM4');  
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_BTSlave'+TX+RX] = 'BTSlave BTSlave_'+TX+'_'+RX+'('+TX+','+RX+');';
  if(TX==0 & RX==1)
  {
    Blockly.Arduino.setups_['setup_BTSlave'+TX+RX] = 'BTSlave_'+TX+'_'+RX+'.Serial_begin(38400);';
    Blockly.Arduino.setups_['setup_BTSlave2'+TX+RX]='BTSlave_'+TX+'_'+RX+'.Serial_Slave_set("AT+PIN'+PIN1+''+PIN2+''+PIN3+''+PIN4+'");';

  }
  else
  {
    Blockly.Arduino.setups_['setup_BTSlave'+TX+RX] = 'BTSlave_'+TX+'_'+RX+'.begin(38400);';
    Blockly.Arduino.setups_['setup_BTSlave2'+TX+RX]='BTSlave_'+TX+'_'+RX+'.Slave_set("AT+PIN'+PIN1+''+PIN2+''+PIN3+''+PIN4+'");';
  }
  
  var code = '';
  return code;
};

//辅块器_蓝牙数传主_接收数据
Blockly.Arduino.ArduBits_BTMaster_RX = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_BTMaster'+TX+RX] = 'BTMaster BTMaster_'+TX+'_'+RX+'('+TX+','+RX+');';
  //Blockly.Arduino.setups_['setup_BTSlave'+TX+RX] = 'BTSlave_'+TX+'_'+RX+'.begin(38400);';
  var dropdown_type = this.getFieldValue('BTMaster_RXNUM');
  var code = '';
  if(TX==0 & RX==1)
  {
    if (dropdown_type == "Master_RX_Schar") code += 'BTMaster_'+TX+'_'+RX+'.Serial_'+dropdown_type+'()';
    if (dropdown_type == "Master_RX_Snum") code += 'BTMaster_'+TX+'_'+RX+'.Serial_'+dropdown_type+'()';
  }
  else
  {
    if (dropdown_type == "Master_RX_Schar") code += 'BTMaster_'+TX+'_'+RX+'.'+dropdown_type+'()';
    if (dropdown_type == "Master_RX_Snum") code += 'BTMaster_'+TX+'_'+RX+'.'+dropdown_type+'()';
  }
  
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//辅块器_蓝牙数传主_发射数据
Blockly.Arduino.ArduBits_BTMaster_TX = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
  var NUM = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_BTMaster'+TX+RX] = 'BTMaster BTMaster_'+TX+'_'+RX+'('+TX+','+RX+');';
  //Blockly.Arduino.setups_['setup_BTSlave'+TX+RX] = 'BTSlave_'+TX+'_'+RX+'.begin(38400);';
  var code = '';
  if(TX==0 & RX==1)
  {
    code += 'BTMaster_'+TX+'_'+RX+'.Serial_Master_TX_Data('+TEXT+','+NUM+');\n';
  }
  else
  {
    code += 'BTMaster_'+TX+'_'+RX+'.Master_TX_Data('+TEXT+','+NUM+');\n';
  }
  return code;
};

//辅块器_蓝牙数传主_波特率为
Blockly.Arduino.ArduBits_BTMaster_BAUD = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var BTMaster_BAUDA = this.getFieldValue('BTSlave_BAUDA');
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_BTMaster'+TX+RX] = 'BTMaster BTMaster_'+TX+'_'+RX+'('+TX+','+RX+');';
  if(TX==0 & RX==1)
  {
    Blockly.Arduino.setups_['setup_BTMaster'+TX+RX] = 'BTMaster_'+TX+'_'+RX+'.Serial_begin('+BTMaster_BAUDA+');';  
  }
  else
  {
    Blockly.Arduino.setups_['setup_BTMaster'+TX+RX] = 'BTMaster_'+TX+'_'+RX+'.begin('+BTMaster_BAUDA+');'; 
  }
  
  var code = '';
  return code;
};

//辅块器_蓝牙数传主_蓝牙设置
Blockly.Arduino.ArduBits_BTMaster_SET = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
  var PIN = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var BAUD = this.getFieldValue('BTMaster_BAUD');
  var BTMS = this.getFieldValue('BTMaster_SETNUM');
  TEXT = TEXT.replace(/\"/g, ""); 
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_BTMaster'+TX+RX] = 'BTMaster BTMaster_'+TX+'_'+RX+'('+TX+','+RX+');';
  //Blockly.Arduino.setups_['setup_BTSlave'+TX+RX] = 'BTSlave_'+TX+'_'+RX+'.begin(38400);';
  if(TX==0 & RX==1)
  {
    Blockly.Arduino.setups_['setup_BTMaster0'+TX+RX]='BTMaster_'+TX+'_'+RX+'.Serial_Master_set("'+BTMS+'");';
    Blockly.Arduino.setups_['setup_BTMaster1'+TX+RX]='BTMaster_'+TX+'_'+RX+'.Serial_Master_set("AT+NAME'+TEXT+'");';
    Blockly.Arduino.setups_['setup_BTMaster2'+TX+RX]='BTMaster_'+TX+'_'+RX+'.Serial_Master_set("AT+PIN'+PIN+'");';
    Blockly.Arduino.setups_['setup_BTMaster3'+TX+RX]='BTMaster_'+TX+'_'+RX+'.Serial_Master_set("AT+BAUD'+BAUD+'");';
  }
  else
  {
    Blockly.Arduino.setups_['setup_BTMaster0'+TX+RX]='BTMaster_'+TX+'_'+RX+'.Master_set("'+BTMS+'");';
    Blockly.Arduino.setups_['setup_BTMaster1'+TX+RX]='BTMaster_'+TX+'_'+RX+'.Master_set("AT+NAME'+TEXT+'");';
    Blockly.Arduino.setups_['setup_BTMaster2'+TX+RX]='BTMaster_'+TX+'_'+RX+'.Master_set("AT+PIN'+PIN+'");';
    Blockly.Arduino.setups_['setup_BTMaster3'+TX+RX]='BTMaster_'+TX+'_'+RX+'.Master_set("AT+BAUD'+BAUD+'");';
  }
  
  var code = '';
  return code;
};

//辅块器_蓝牙数传从_波特率为
Blockly.Arduino.ArduBits_BTSlave_BAUD = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var BTSlave_BAUDA = this.getFieldValue('BTSlave_BAUDA');
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_BTSlave'+TX+RX] = 'BTSlave BTSlave_'+TX+'_'+RX+'('+TX+','+RX+');';
  if(TX==0 & RX==1)
  {
    Blockly.Arduino.setups_['setup_BTSlave'+TX+RX] = 'BTSlave_'+TX+'_'+RX+'.Serial_begin('+BTSlave_BAUDA+');';  
  }
  else
  {
    Blockly.Arduino.setups_['setup_BTSlave'+TX+RX] = 'BTSlave_'+TX+'_'+RX+'.begin('+BTSlave_BAUDA+');'; 
  }
  
  var code = '';
  return code;
};


//辅块器_蓝牙数传从_接收数据
Blockly.Arduino.ArduBits_BTSlave_RX = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_BTSlave'+TX+RX] = 'BTSlave BTSlave_'+TX+'_'+RX+'('+TX+','+RX+');';
  //Blockly.Arduino.setups_['setup_BTSlave'+TX+RX] = 'BTSlave_'+TX+'_'+RX+'.begin(38400);';
  var dropdown_type = this.getFieldValue('BTSlave_RXNUM');
  var code = '';
  if(TX==0 & RX==1)
  {
    if (dropdown_type == "Slave_RX_Schar") code += 'BTSlave_'+TX+'_'+RX+'.Serial_'+dropdown_type+'()';
    if (dropdown_type == "Slave_RX_Snum") code += 'BTSlave_'+TX+'_'+RX+'.Serial_'+dropdown_type+'()';
  }
  else
  {
    if (dropdown_type == "Slave_RX_Schar") code += 'BTSlave_'+TX+'_'+RX+'.'+dropdown_type+'()';
    if (dropdown_type == "Slave_RX_Snum") code += 'BTSlave_'+TX+'_'+RX+'.'+dropdown_type+'()';
  }
  
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//辅块器_蓝牙数传从_发射数据
Blockly.Arduino.ArduBits_BTSlave_TX = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
  var NUM = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_BTSlave'+TX+RX] = 'BTSlave BTSlave_'+TX+'_'+RX+'('+TX+','+RX+');';
  //Blockly.Arduino.setups_['setup_BTSlave'+TX+RX] = 'BTSlave_'+TX+'_'+RX+'.begin(38400);';
  var code = '';
  if(TX==0 & RX==1)
  {
    code += 'BTSlave_'+TX+'_'+RX+'.Serial_Slave_TX_Data('+TEXT+','+NUM+');\n';
  }
  else
  {
    code += 'BTSlave_'+TX+'_'+RX+'.Slave_TX_Data('+TEXT+','+NUM+');\n';
  }
  return code;
};

//辅块器_蓝牙数传从_蓝牙设置
Blockly.Arduino.ArduBits_BTSlave_Name = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
  var PIN = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
  var BAUD = this.getFieldValue('BTSlave_BAUD');
  TEXT = TEXT.replace(/\"/g, ""); 
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_BTSlave'+TX+RX] = 'BTSlave BTSlave_'+TX+'_'+RX+'('+TX+','+RX+');';
  //Blockly.Arduino.setups_['setup_BTSlave'+TX+RX] = 'BTSlave_'+TX+'_'+RX+'.begin(38400);';
  if(TX==0 & RX==1)
  {
    Blockly.Arduino.setups_['setup_BTSlave1'+TX+RX]='BTSlave_'+TX+'_'+RX+'.Serial_Slave_set("AT+NAME'+TEXT+'");';
    Blockly.Arduino.setups_['setup_BTSlave2'+TX+RX]='BTSlave_'+TX+'_'+RX+'.Serial_Slave_set("AT+PIN'+PIN+'");';
    Blockly.Arduino.setups_['setup_BTSlave3'+TX+RX]='BTSlave_'+TX+'_'+RX+'.Serial_Slave_set("AT+BAUD'+BAUD+'");';
  }
  else
  {
    Blockly.Arduino.setups_['setup_BTSlave1'+TX+RX]='BTSlave_'+TX+'_'+RX+'.Slave_set("AT+NAME'+TEXT+'");';
    Blockly.Arduino.setups_['setup_BTSlave2'+TX+RX]='BTSlave_'+TX+'_'+RX+'.Slave_set("AT+PIN'+PIN+'");';
    Blockly.Arduino.setups_['setup_BTSlave3'+TX+RX]='BTSlave_'+TX+'_'+RX+'.Slave_set("AT+BAUD'+BAUD+'");';
  }
  
  var code = '';
  return code;
};

//传感器_超声波测距_获取距离
Blockly.Arduino.ArduBits_SR04_Distance = function() {
  var Trig = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var Echo = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_RFID'+Trig+Echo] = 'SR04 SR04_'+Trig+'_'+Echo+'('+Trig+','+Echo+');';
  var code = 'SR04_'+Trig+'_'+Echo+'.DistanceAvg()';
  return  [code, Blockly.Arduino.ORDER_ATOMIC];
};


//传感器_温湿度传感_获取温湿
Blockly.Arduino.ArduBits_DHT11_TP = function() {
  var DTA = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_Brainwave'+DTA] = 'DHT DHT11_'+DTA+'('+DTA+');';
  var dropdown_type = this.getFieldValue('DHT11_TPNUM');
  var code = '';
  if (dropdown_type == "readTemperature") code += 'DHT11_'+DTA+'.'+dropdown_type+'()';
  if (dropdown_type == "readHumidity") code += 'DHT11_'+DTA+'.'+dropdown_type+'()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};



//执行器_四位数码管_操作清除
Blockly.Arduino.ArduBits_TM1650_DOT = function() {
  var SDA = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var SCL = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_TM1650'+SDA+SCL] = 'TM1650 TM1650_'+SDA+'_'+SCL+'('+SDA+','+SCL+');';
  Blockly.Arduino.setups_['setup_TM1650_'+SDA+SCL] = 'TM1650_'+SDA+'_'+SCL+'.init();';
  var TM1650_DOTNUM = this.getFieldValue('TM1650_DOTNUM');
  var TM1650_OnOff = this.getFieldValue('TM1650_OnOff');
  var code = '';
  code += 'TM1650_'+SDA+'_'+SCL+'.setDot('+TM1650_DOTNUM+','+TM1650_OnOff+');\n';
  return code;
};

//执行器_四位数码管_操作清除
Blockly.Arduino.ArduBits_TM1650_Display = function() {
  var SDA = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var SCL = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_TM1650'+SDA+SCL] = 'TM1650 TM1650_'+SDA+'_'+SCL+'('+SDA+','+SCL+');';
  Blockly.Arduino.setups_['setup_TM1650_'+SDA+SCL] = 'TM1650_'+SDA+'_'+SCL+'.init();';
  var TEXT = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);
  var code = '';
  code += 'TM1650_'+SDA+'_'+SCL+'.displayString('+TEXT+');\n';
  return code;
};

//执行器_四位数码管_操作清除
Blockly.Arduino.ArduBits_TM1650_CLEAR = function() {
  var SDA = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var SCL = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_TM1650'+SDA+SCL] = 'TM1650 TM1650_'+SDA+'_'+SCL+'('+SDA+','+SCL+');';
  Blockly.Arduino.setups_['setup_TM1650_'+SDA+SCL] = 'TM1650_'+SDA+'_'+SCL+'.init();';
  var dropdown_type = this.getFieldValue('TM1650_TYPE');
  var code = '';
  if (dropdown_type == "clear") code += 'TM1650_'+SDA+'_'+SCL+'.'+dropdown_type+'();\n';
  if (dropdown_type == "displayOn") code += 'TM1650_'+SDA+'_'+SCL+'.'+dropdown_type+'();\n';
  if (dropdown_type == "displayOff") code += 'TM1650_'+SDA+'_'+SCL+'.'+dropdown_type+'();\n';
  return code;
};

//执行器_液晶显示器_中文字符
Blockly.Arduino.ArduBits_OLED_showBitmap = function() {
  var XVALUE = Blockly.Arduino.valueToCode(this, 'XVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var YVALUE = Blockly.Arduino.valueToCode(this, 'YVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var HEIGHT = Blockly.Arduino.valueToCode(this, 'HEIGHT', Blockly.Arduino.ORDER_ATOMIC);
  var WIDTH  = Blockly.Arduino.valueToCode(this,  'WIDTH', Blockly.Arduino.ORDER_ATOMIC);
  var data_name = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
//  data_name = data_name.replace(/\"/g, ""); 
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_OLED'] = 'Adafruit_SSD1306 display(44);';
  Blockly.Arduino.setups_['setup_OLED'] = 'display.begin(SSD1306_SWITCHCAPVCC, 0x3C);' ;
  Blockly.Arduino.setups_['setup_OLED2'] = 'display.display();' ;
 // Blockly.Arduino.setups_['setup_OLED3'] = 'delay(1000);' ;
  Blockly.Arduino.setups_['setup_OLED4'] = 'display.clearDisplay();' ;
  var code = '';
  code += 'display.drawBitmap('+XVALUE+'-1,'+YVALUE+'-1, '+data_name+', '+WIDTH+', '+HEIGHT+', 1);\n';
  return code;
};

//执行器_液晶显示器_数组数据
Blockly.Arduino.ArduBits_OLED_Bitmap = function() {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var text = this.getFieldValue('TEXT');
  Blockly.Arduino.definitions_['var_lists' + varName] = 'const uint8_t ' + varName + '[]PROGMEM={' + text + ' };\n';
  return '';
};

//执行器_液晶显示器_画点显示
Blockly.Arduino.ArduBits_OLED_POS = function() {
  var dropdown_type = this.getFieldValue('OLED_TYPE');
  var XVALUE = Blockly.Arduino.valueToCode(this, 'XVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var YVALUE = Blockly.Arduino.valueToCode(this, 'YVALUE', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_OLED'] = 'Adafruit_SSD1306 display(44);';
  Blockly.Arduino.setups_['setup_OLED'] = 'display.begin(SSD1306_SWITCHCAPVCC, 0x3C);' ;
  Blockly.Arduino.setups_['setup_OLED2'] = 'display.display();' ;
//  Blockly.Arduino.setups_['setup_OLED3'] = 'delay(1000);' ;
  Blockly.Arduino.setups_['setup_OLED4'] = 'display.clearDisplay();' ;
  var code = '';
  code += ' display.drawPixel('+XVALUE+'-1,'+YVALUE+'-1, '+dropdown_type+');\n';
  return code;
};

//执行器_液晶显示器_显示操作
Blockly.Arduino.ArduBits_OLED_Clear = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_OLED'] = 'Adafruit_SSD1306 display(44);';
  Blockly.Arduino.setups_['setup_OLED'] = 'display.begin(SSD1306_SWITCHCAPVCC, 0x3C);' ;
  Blockly.Arduino.setups_['setup_OLED2'] = 'display.display();' ;
//  Blockly.Arduino.setups_['setup_OLED3'] = 'delay(1000);' ;
  Blockly.Arduino.setups_['setup_OLED4'] = 'display.clearDisplay();' ;
  var dropdown_type = this.getFieldValue('OLED_DISNUM');
  var code = '';
  if (dropdown_type == "clearDisplay") code += 'display.'+dropdown_type+'();\n';
  if (dropdown_type == "display") code += 'display.'+dropdown_type+'();\n';
  return code;
};

//执行器_液晶显示器_多行显示
Blockly.Arduino.ArduBits_OLED_Display = function() {
  var MNUM = Blockly.Arduino.valueToCode(this, 'MNUM', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT1 = Blockly.Arduino.valueToCode(this, 'TEXT1', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT2 = Blockly.Arduino.valueToCode(this, 'TEXT2', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT3 = Blockly.Arduino.valueToCode(this, 'TEXT3', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT4 = Blockly.Arduino.valueToCode(this, 'TEXT4', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_OLED'] = 'Adafruit_SSD1306 display(44);';
  Blockly.Arduino.setups_['setup_OLED'] = 'display.begin(SSD1306_SWITCHCAPVCC, 0x3C);' ;
 Blockly.Arduino.setups_['setup_OLED2'] = 'display.display();' ;
//  Blockly.Arduino.setups_['setup_OLED3'] = 'delay(1000);' ;
  Blockly.Arduino.setups_['setup_OLED4'] = 'display.clearDisplay();' ;
  var code = '';
  code += 'display.setTextSize('+MNUM+');\n';
  code += 'display.setTextColor(WHITE);\n';
  code += 'display.setCursor(0,0);\n';
  code += 'display.println('+TEXT1+');\n';
  code += 'display.println('+TEXT2+');\n';
  code += 'display.println('+TEXT3+');\n';
  code += 'display.println('+TEXT4+');\n';
  return code;
};

//执行器_液晶显示器_显示字符
Blockly.Arduino.ArduBits_OLED_Print = function() {
  var dropdown_type = this.getFieldValue('OLED_DisplayNUM');
  var MNUM = Blockly.Arduino.valueToCode(this, 'MNUM', Blockly.Arduino.ORDER_ATOMIC);
  var XVALUE = Blockly.Arduino.valueToCode(this, 'XVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var YVALUE = Blockly.Arduino.valueToCode(this, 'YVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var string = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ASSIGNMENT);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_OLED'] = 'Adafruit_SSD1306 display(44);';
  Blockly.Arduino.setups_['setup_OLED'] = 'display.begin(SSD1306_SWITCHCAPVCC, 0x3C);' ;
 Blockly.Arduino.setups_['setup_OLED2'] = 'display.display();' ;
//  Blockly.Arduino.setups_['setup_OLED3'] = 'delay(1000);' ;
  Blockly.Arduino.setups_['setup_OLED4'] = 'display.clearDisplay();' ;
  var code = '';
  code += 'display.setTextSize('+MNUM+');\n';
  code += 'display.setTextColor('+dropdown_type+');\n';
  code += 'display.setCursor('+XVALUE+'-1,'+YVALUE+'-1);\n';
  code += 'display.print('+string+');\n';
  return code;
};

//传感器-重力感应块-获取数据
Blockly.Arduino.ArduBits_TCS34725 = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_Adafruit_TCS34725'] = 'Adafruit_TCS34725 tcs = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_700MS, TCS34725_GAIN_1X);';
  Blockly.Arduino.setups_['setup_tcs'] = 'tcs.begin();';
  var dropdown_type = this.getFieldValue('TCS34725_PIN');
  var code = '';
  if (dropdown_type == "a") code += 'tcs.getR()';
  if (dropdown_type == "b") code += 'tcs.getG()';
  if (dropdown_type == "c") code += 'tcs.getB()';
  if (dropdown_type == "d") code += 'tcs.c_rev()';
  if (dropdown_type == "e") code += 'tcs.calculateColorTemperature()';
  if (dropdown_type == "f") code += 'tcs.calculateLux()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//传感器-重力感应块-获取数据
Blockly.Arduino.ArduBits_ADXL345 = function() {
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_ADXL345'] = 'ADXL345 accel;';
  Blockly.Arduino.setups_['setup_ADXL345-A'] = 'Wire.begin();';
  Blockly.Arduino.setups_['setup_ADXL345-B'] = 'accel.initialize();';
  var dropdown_type = this.getFieldValue('ADXL345_PIN');
  var code = '';
  if (dropdown_type == "a") code += 'accel.X_angle()';
  if (dropdown_type == "b") code += 'accel.Y_angle()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//执行器_全彩彩灯块_颜色表选
Blockly.Arduino.ArduBits_RGB2 = function(block) {
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var value__led_ = Blockly.Arduino.valueToCode(block, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var colour_rgb_led_color = block.getFieldValue('RGB_LED_color');
  var color = colour_rgb_led_color.colorRgb();
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_nArduBits_rgb'+dropdown_rgbpin] = 'Adafruit_NeoPixel  pixels_'+dropdown_rgbpin+''+'('+dropdown_rgbpin+');';
  Blockly.Arduino.setups_['setup_ArduBits_rgb_'+dropdown_rgbpin] ='pixels_'+dropdown_rgbpin+'.begin();';
//Blockly.Arduino.setups_['setBrightness'+dropdown_rgbpin] ='pixels_'+dropdown_rgbpin+'.setBrightness(40);\n';
  var code = 'pixels_'+dropdown_rgbpin+'.setPixelColor('+value__led_+'-1, pixels_'+dropdown_rgbpin+'.Color'+color+');\n';
  code+='pixels_'+dropdown_rgbpin+'.show();\n';
  return code;
};

var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
String.prototype.colorRgb = function(){
     var sColor = this.toLowerCase();
     if(sColor && reg.test(sColor)){
          if(sColor.length === 4){
               var sColorNew = "#";
               for(var i=1; i<4; i+=1){
                    sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
               }
               sColor = sColorNew;
          }
          //处理六位的颜色值
          var sColorChange = [];
          for(var i=1; i<7; i+=2){
               sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
          }
          return "(" + sColorChange.join(",") + ")";
     }else{
          return sColor;
    }
};
//执行器_全彩彩灯块_颜色数选
Blockly.Arduino.ArduBits_RGB = function(block) {
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var value__led_ = Blockly.Arduino.valueToCode(block, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var value_rvalue = Blockly.Arduino.valueToCode(block, 'RVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var value_gvalue = Blockly.Arduino.valueToCode(block, 'GVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var value_bvalue = Blockly.Arduino.valueToCode(block, 'BVALUE', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_ArduBits_rgb'+dropdown_rgbpin] = 'Adafruit_NeoPixel  pixels_'+dropdown_rgbpin+''+'('+dropdown_rgbpin+');';
  Blockly.Arduino.setups_['setup_ArduBits_rgb_'+dropdown_rgbpin] ='pixels_'+dropdown_rgbpin+'.begin();';
  
  var code = 'pixels_'+dropdown_rgbpin+'.setPixelColor('+value__led_+'-1, '+value_rvalue+','+value_gvalue+','+value_bvalue+');\n';
  code+='pixels_'+dropdown_rgbpin+'.show();\n';
  return code;
};

//传感器_ID射频读卡_获取数据
Blockly.Arduino.ArduBits_RFID = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_RFID'+TX+RX] = 'RFID RFID_'+TX+'_'+RX+'('+TX+','+RX+');';
  Blockly.Arduino.setups_['setup_RFID'+TX+RX] = 'RFID_'+TX+'_'+RX+'.begin(9600);' ;
  var code = 'RFID_'+TX+'_'+RX+'.get_RFID_num()';
  return  [code, Blockly.Arduino.ORDER_ATOMIC];
};

//执行器_点阵屏显示_显示图案
Blockly.Arduino.ArduBits_Matrix_DisplayChar = function() {
  var SDA = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var SCL = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_Matrix'+SDA+SCL] = 'Matrix Matrix_'+SDA+'_'+SCL+'('+SDA+','+SCL+');';
  Blockly.Arduino.definitions_['var_Matrix'] = 'uint8_t  ArduBits_LedArray[8];';
  Blockly.Arduino.setups_['setup_Matrix_'+SDA+SCL] = 'Matrix_'+SDA+'_'+SCL+'.begin(0x70); \n';
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'Chars', Blockly.Arduino.ORDER_ASSIGNMENT);
//  var code='Matrix_'+SDA+'_'+SCL+'.clear();\n';
  var code='';
  code+='for(int i=0; i<8; i++)\n';
  code+='{\n'
  code+='  ArduBits_LedArray[i]='+dropdown_pin+'[i];\n';
  code+='  for(int j=7; j>=0; j--)\n'
  code+='  {\n'
  code+='    if((ArduBits_LedArray[i]&0x01)>0)\n';
  code+='      Matrix_'+SDA+'_'+SCL+'.drawPixel(j, i,LED_ON);\n';
  code+='    ArduBits_LedArray[i] = ArduBits_LedArray[i]>>1;\n';
  code+='  }  \n'
  code+='}\n'
  code+='Matrix_'+SDA+'_'+SCL+'.writeDisplay();\n'
  return code;
};

//执行器_点阵屏显示_图案数组
Blockly.Arduino.ArduBits_Matrix_LedArray = function() {
  var varName = this.getFieldValue('VAR');
  var a = new Array();
  for (var i = 1; i < 9; i++) {
    a[i] = new Array();
    for (var j = 1; j < 9; j++) {
      a[i][j] = (this.getFieldValue('a' + i + j) == "TRUE") ? 1 : 0;
    }
  }
  var code = '{';
  for (var i = 1; i < 9; i++) {
    var tmp = ""
    for (var j = 1; j < 9; j++) {
      tmp += a[i][j];
    }
    tmp = (parseInt(tmp, 2)).toString(16)
    if (tmp.length == 1) tmp = "0" + tmp;
    code += '0x' + tmp + ((i != 8) ? ',' : '');
  }
  code += '};';
  //Blockly.Arduino.definitions_[this.id] = "byte LedArray_"+clearString(this.id)+"[]="+code;
  Blockly.Arduino.definitions_[varName] = "uint8_t " + varName + "[8]=" + code;
  //return ["LedArray_"+clearString(this.id), Blockly.Arduino.ORDER_ATOMIC];
  return [varName, Blockly.Arduino.ORDER_ATOMIC];
};

//执行器_点阵屏显示_画点显示
Blockly.Arduino.ArduBits_Matrix_POS = function() {
  var SDA = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var SCL = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_Matrix'+SDA+SCL] = 'Matrix Matrix_'+SDA+'_'+SCL+'('+SDA+','+SCL+');';
  Blockly.Arduino.setups_['setup_Matrix_'+SDA+SCL] = 'Matrix_'+SDA+'_'+SCL+'.begin(0x70); \n';
  var pos_x = Blockly.Arduino.valueToCode(this, 'XVALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
  var pos_y = Blockly.Arduino.valueToCode(this, 'YVALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
  var dropdown_type = this.getFieldValue('DrawPixel_TYPE');
  var code = 'Matrix_'+SDA+'_'+SCL+'.drawPixel('+pos_x+'-1,'+pos_y+'-1,'+dropdown_type+');\n'
      code+= 'Matrix_'+SDA+'_'+SCL+'.writeDisplay();\n';
  return code;
};

//执行器_点阵屏显示_显示旋转
Blockly.Arduino.ArduBits_Matrix_Rotation = function() {
  var SDA = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var SCL = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_Matrix'+SDA+SCL] = 'Matrix Matrix_'+SDA+'_'+SCL+'('+SDA+','+SCL+');';
  Blockly.Arduino.setups_['setup_Matrix_'+SDA+SCL] = 'Matrix_'+SDA+'_'+SCL+'.begin(0x70); \n';
  var dropdown_type = this.getFieldValue('Rotation_TYPE');
  var code = 'Matrix_'+SDA+'_'+SCL+'.setRotation('+dropdown_type+');\n'
  return code;
};

//执行器_点阵屏显示_字符显示
Blockly.Arduino.ArduBits_Matrix_TEXT = function() {
  var SDA = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var SCL = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_Matrix'+SDA+SCL] = 'Matrix Matrix_'+SDA+'_'+SCL+'('+SDA+','+SCL+');';
  Blockly.Arduino.setups_['setup_Matrix_'+SDA+SCL] = 'Matrix_'+SDA+'_'+SCL+'.begin(0x70); \n';
  var string1 = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ASSIGNMENT);
  var code = 'Matrix_'+SDA+'_'+SCL+'.drawStr('+string1+');\n'
  return code;
};

//执行器_点阵屏显示_清除屏幕
Blockly.Arduino.ArduBits_Matrix_CLEAR = function() {
  var SDA = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var SCL = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_Matrix'+SDA+SCL] = 'Matrix Matrix_'+SDA+'_'+SCL+'('+SDA+','+SCL+');';
  Blockly.Arduino.setups_['setup_Matrix_'+SDA+SCL] = 'Matrix_'+SDA+'_'+SCL+'.begin(0x70); \n';
  var code = 'Matrix_'+SDA+'_'+SCL+'.clear();\n'
   code+='Matrix_'+SDA+'_'+SCL+'.writeDisplay();\n';
  return code;
};

//传感器-脑电波采集-获取数据
Blockly.Arduino.ArduBits_Brainwave= function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_Brainwave'+TX+RX] = 'Brainwave Brainwave_'+TX+'_'+RX+'('+TX+','+RX+');';
  Blockly.Arduino.setups_['setup_Brainwave'+TX+RX] = 'Brainwave_'+TX+'_'+RX+'.begin(57600);' ;
  var dropdown_type = this.getFieldValue('Brainwave_PIN');
  var code = '';
  if (dropdown_type == "a") code += 'Brainwave_'+TX+'_'+RX+'.get_attention()';
  if (dropdown_type == "b") code += 'Brainwave_'+TX+'_'+RX+'.get_meditation()';
  if (dropdown_type == "c") code += 'Brainwave_'+TX+'_'+RX+'.get_poorQuality()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//辅助块语音合成块_数组数据
Blockly.Arduino.ArduBits_SYN6288_Bitmap = function() {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var text = this.getFieldValue('TEXT');
  Blockly.Arduino.definitions_['var_lists' + varName] = 'char ' + varName + '[]={' + text + ' };\n';
  return '';
};

//辅助块-语音合成块_语音合成
Blockly.Arduino.ArduBits_SYN6288 = function() {
  var TX = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var RX = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var TEXT = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_SYN6288'+TX+RX] = 'SYN6288 SYN6288_'+TX+'_'+RX+'('+TX+','+RX+');';
  if(TX == 0 && RX == 1)
  {
    
    Blockly.Arduino.setups_['setup_SYN6288'+TX+RX] = 'SYN6288_'+TX+'_'+RX+'.SerialSlaveboudset(9600);' ;
    var dropdown_type = this.getFieldValue('MUSIC_PIN');
    var code='SYN6288_'+TX+'_'+RX+'.Serialplay('+TEXT+',sizeof('+TEXT+'),'+dropdown_type+');\n';
  }
  else
  {
    Blockly.Arduino.setups_['setup_SYN6288'+TX+RX] = 'SYN6288_'+TX+'_'+RX+'.Slaveboudset(9600);' ;
    var dropdown_type = this.getFieldValue('MUSIC_PIN');
    var code='SYN6288_'+TX+'_'+RX+'.play('+TEXT+',sizeof('+TEXT+'),'+dropdown_type+');\n';
  }  

  return code;
};

//传感器-电子称重块-获取称重
Blockly.Arduino.ArduBits_HX711_Weight = function() {
  var DAT = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var SCK = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  var NUM = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_HX711'+DAT+SCK] = 'Hx711 Hx711_'+DAT+'_'+SCK+'('+DAT+','+SCK +');';
  Blockly.Arduino.setups_['setup_HX711'+DAT+SCK] = 'Hx711_'+DAT+'_'+SCK+'.setOffset(Hx711_'+DAT+'_'+SCK+'.getAverageValue(30));\n  Hx711_'+DAT+'_'+SCK+'.setScale('+NUM+');' ;
  var code = '(int)Hx711_'+DAT+'_'+SCK+'.getWeight(10)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//辅助块-超外差发射
Blockly.Arduino.ArduBits_TX433MHZ= function() {
  var DOA = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var DOB = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_TXM33MHZ'+DOA+DOB] = 'TX433MHZ TX433MHZ_'+DOA+'_'+DOB+'('+DOA+','+DOB+');';
  var dropdown_type = this.getFieldValue('TXAB_PIN');
  var code = '';
  if (dropdown_type == "a") code += 'TX433MHZ_'+DOA+'_'+DOB+'.' +'txa();\n';
  if (dropdown_type == "b") code += 'TX433MHZ_'+DOA+'_'+DOB+'.' +'txb();\n';
   return code;
};

//传感器-实时时钟块_获取时间
Blockly.Arduino.ArduBits_RTC_get_time = function() {
  var SDA = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var SCL = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_RTC'+SDA+SCL] = 'RTC RTC_'+SDA+'_'+SCL+'('+SDA+','+SCL+');';
  var dropdown_type = this.getFieldValue('TIME_TYPE');
  var code = 'RTC_'+SDA+'_'+SCL+'.'+dropdown_type+'()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//传感器-实时时钟块_设置时间
Blockly.Arduino.ArduBits_RTC_set_time = function() {
  var SDA = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var SCL = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_RTC'+SDA+SCL] = 'RTC RTC_'+SDA+'_'+SCL+'('+SDA+','+SCL+');';
  var hour = Blockly.Arduino.valueToCode(this, 'hour', Blockly.Arduino.ORDER_ATOMIC);
  var minute = Blockly.Arduino.valueToCode(this, 'minute', Blockly.Arduino.ORDER_ATOMIC);
  var second = Blockly.Arduino.valueToCode(this, 'second', Blockly.Arduino.ORDER_ATOMIC);
  var code = '';
 // if (hour < 25 && hour >= 0 && minute < 60 && minute >= 0 && second < 60 && second >= 0) code += 'RTC_'+SDA+'_'+SCL+'.fillByHMS(' + hour + ',' + minute + ',' + second + ');\n';
  code = 'RTC_'+SDA+'_'+SCL+'.fillByHMS(' + hour + ',' + minute + ',' + second + ');\n';
  return code;
};

//传感器-实时时钟块_设置日期
Blockly.Arduino.ArduBits_RTC_set_date = function() {
  var SDA = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
  var SCL = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['include_ArduBits'] = '#include "ArduBits.h"';
  Blockly.Arduino.definitions_['var_RTC'+SDA+SCL] = 'RTC RTC_'+SDA+'_'+SCL+'('+SDA+','+SCL+');';
  var year = Blockly.Arduino.valueToCode(this, 'year', Blockly.Arduino.ORDER_ATOMIC);
  var month = Blockly.Arduino.valueToCode(this, 'month', Blockly.Arduino.ORDER_ATOMIC);
  var day = Blockly.Arduino.valueToCode(this, 'day', Blockly.Arduino.ORDER_ATOMIC);
  var code = '';
//  if (year < 2099 && year >= 2000 && month < 13 && month >= 0 && day < 32 && day >= 0) code += 'RTC_'+SDA+'_'+SCL+'.fillByYMD(' + year + ',' + month + ',' + day + ');\nRTC_'+SDA+'_'+SCL+'.fillByWeek(' + year + ',' + month + ',' + day + ');\n';
  code = 'RTC_'+SDA+'_'+SCL+'.fillByYMD(' + year + ',' + month + ',' + day + ');\nRTC_'+SDA+'_'+SCL+'.fillByWeek(' + year + ',' + month + ',' + day + ');\n'; 
  return code;
};

//辅助块-S4A固件
Blockly.Arduino.ArduBits_S4A = function(block) {
  Blockly.Arduino.definitions_['define_S4A1'] ='typedef enum\n{\n  input, servomotor, pwm, digital\n}\npinType;\n\ntypedef struct pin\n{\n  pinType type;\n  int state;\n};\n\npin arduinoPins[14];\n\nunsigned long lastDataReceivedTime = millis();\n'
  Blockly.Arduino.definitions_['define_S4A2'] ='void configurePins()\n{\n  arduinoPins[0].type=input;\n  arduinoPins[1].type=input;\n  arduinoPins[2].type=input;\n  arduinoPins[3].type=input;\n  arduinoPins[4].type=servomotor;\n  arduinoPins[5].type=pwm;\n  arduinoPins[6].type=pwm;\n  arduinoPins[7].type=servomotor;\n  arduinoPins[8].type=servomotor;\n  arduinoPins[9].type=pwm;\n  arduinoPins[10].type=digital;\n  arduinoPins[11].type=digital;\n  arduinoPins[12].type=digital;\n  arduinoPins[13].type=digital;\n}\n'
  Blockly.Arduino.definitions_['define_S4A3'] ='void resetPins()\n{\n  for (byte index=0; index <=13; index++)\n  {\n    if (arduinoPins[index].type!=input)\n    {\n      pinMode(index, OUTPUT);\n      if (arduinoPins[index].type==servomotor)\n      {\n        arduinoPins[index].state = 255;\n        servo (index, 255);\n      }\n      else\n      {\n        arduinoPins[index].state=0;\n        digitalWrite(index,LOW);\n      }\n    }\n  }\n}'
  Blockly.Arduino.definitions_['define_S4A4'] ='void sendSensorValues()\n{\n  unsigned int sensorValues[6], readings[5];\n  byte sensorIndex;\n  for (sensorIndex = 0; sensorIndex < 6; sensorIndex++)\n  {\n    for (byte p = 0; p < 5; p++)\n      readings[p] = analogRead(sensorIndex);\n    insertionSort(readings, 5);\n    sensorValues[sensorIndex] = readings[2];\n  }\n  for (sensorIndex = 0; sensorIndex < 6; sensorIndex++)\n    ScratchBoardSensorReport(sensorIndex, sensorValues[sensorIndex]);\n  ScratchBoardSensorReport(6, digitalRead(2)?1023:0);\n  ScratchBoardSensorReport(7, digitalRead(3)?1023:0);\n}\n'
  Blockly.Arduino.definitions_['define_S4A5'] ='void insertionSort(unsigned int* array, unsigned int n)\n{\n  for (int i = 1; i < n; i++)\n    for (int j = i; (j > 0) && ( array[j] < array[j-1] ); j--)\n      swap( array, j, j-1 );\n}\n'
  Blockly.Arduino.definitions_['define_S4A6'] ='void swap(unsigned int* array, unsigned int a, unsigned int b)\n{\n  unsigned int temp = array[a];\n  array[a] = array[b];\n  array[b] = temp;\n}\n'
  Blockly.Arduino.definitions_['define_S4A7'] ='void ScratchBoardSensorReport(byte sensor, int value)\n{\n  Serial.write( B10000000\n    | ((sensor & B1111)<<3)\n    | ((value>>7) & B111));\n  Serial.write( value & B1111111);\n}\n'
  Blockly.Arduino.definitions_['define_S4A8'] ='void readSerialPort()\n{\n  byte pin;  int newVal;\n  static byte actuatorHighByte, actuatorLowByte;\n  static byte readingSM = 0;\n  if (Serial.available())\n  {\n    if (readingSM == 0)\n    {\n      actuatorHighByte = Serial.read();\n      if (actuatorHighByte >= 128) readingSM = 1;\n    }\n    else if (readingSM == 1)\n    {\n      actuatorLowByte = Serial.read();\n      if (actuatorLowByte < 128) readingSM = 2;\n      else readingSM = 0;\n    }\n    if (readingSM == 2)\n    {\n      lastDataReceivedTime = millis();\n      pin = ((actuatorHighByte >> 3) & 0x0F);\n      newVal = ((actuatorHighByte & 0x07) << 7) | (actuatorLowByte & 0x7F);\n      if(arduinoPins[pin].state != newVal)\n      {\n        arduinoPins[pin].state = newVal;\n        updateActuator(pin);\n      }\n      readingSM = 0;\n    }\n  }\n  else checkScratchDisconnection();\n}\n'
  Blockly.Arduino.definitions_['define_S4A9'] ='void reset()\n{\n  resetPins();\n  sendSensorValues();\n  lastDataReceivedTime = millis();\n}\n'
  Blockly.Arduino.definitions_['define_S4Aa'] ='void updateActuator(byte pinNumber)\n{\n  if (arduinoPins[pinNumber].type==digital)\n digitalWrite(pinNumber, arduinoPins[pinNumber].state);\n  else\n if (arduinoPins[pinNumber].type==pwm)\n analogWrite(pinNumber, arduinoPins[pinNumber].state);\n}\n'
  Blockly.Arduino.definitions_['define_S4Ab'] ='void sendUpdateServomotors()\n{\n  for (byte p = 0; p < 10; p++)\n    if (arduinoPins[p].type == servomotor)\n servo(p, arduinoPins[p].state);\n}\n'
  Blockly.Arduino.definitions_['define_S4Ac'] ='void servo (byte pinNumber, byte angle)\n{\n  if (angle != 255)\n    pulse(pinNumber, (angle * 10) + 600);\n}\n'
  Blockly.Arduino.definitions_['define_S4Ad'] ='void pulse (byte pinNumber, unsigned int pulseWidth)\n{\n  digitalWrite(pinNumber, HIGH);\n  delayMicroseconds(pulseWidth);\n  digitalWrite(pinNumber, LOW);\n}\n'
  Blockly.Arduino.definitions_['define_S4Ae'] ='void checkScratchDisconnection()\n{\n  if (millis() - lastDataReceivedTime > 1000)\n reset();\n}\n'
  Blockly.Arduino.setups_['setup_S4A0'] = 'Serial.begin(38400);\n  Serial.flush();\n  configurePins();\n  resetPins();'
  var code = 'static unsigned long timerCheckUpdate = millis();\nif (millis()-timerCheckUpdate>=20)\n{\n  sendUpdateServomotors();\n  sendSensorValues();\n  timerCheckUpdate=millis();\n}\nreadSerialPort();';
  return code;
};

//辅助块-IIC地址查找
Blockly.Arduino.ArduBits_IICSCAN = function() {
 Blockly.Arduino.definitions_['include_WIRE'] = '#include <Wire.h>';    
 Blockly.Arduino.setups_['setup_delay2000'] = '  Wire.begin();\n    Serial.begin(9600);\n    Serial.println("I2C Scanner");\n';
 var code='  byte error, address;\n  int nDevices;\n  Serial.println("Scanning...");\n  nDevices = 0;\n  for (address = 1; address < 127; address++ )\n{\n     Wire.beginTransmission(address);\n   error = Wire.endTransmission();\n   if (error == 0){\nSerial.print("I2C device found at address 0x");\nif (address < 16)\nSerial.print("0"); \nSerial.print(address, HEX);  \nSerial.println(" !");\nnDevices++;\n}\nelse if (error == 4){\nSerial.print("Unknow error at address 0x");\nif (address < 16)Serial.print("0"); \nSerial.println(address, HEX);  }\n}\nif (nDevices == 0)\nSerial.println("No I2C devices found");\nelse \nSerial.println("done");\ndelay(5000); ';
 return code;
};