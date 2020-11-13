#ifndef _ArduBits_Telecontrol_h_
#define _ArduBits_Telecontrol_h_
#include "Arduino.h"




class Telecontrol
{
public:

  void Init(void);

  
  bool W_Xal(void);
  bool S_Xal(void);
  bool A_Xal(void);
  bool D_Xal(void);
  bool T_Xal(void);

  uint8_t W_Num(void);
  uint8_t S_Num(void);
  uint8_t A_Num(void);
  uint8_t D_Num(void);
  uint8_t T_Num(void);
  
private:
  bool ww,ss,aa,dd,tt;
  uint8_t wz,sz,az,dz,tz;
  
	void rocker(void);
};
#endif
