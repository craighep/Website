@ECHO OFF

CLS

:Start
CLS
ECHO WHat Do You Want To Do?
ECHO Press number of choice followed by the Enter key 
ECHO -
ECHO 1: Shutdown
echo 2: Shutdown now
echo 3: Restart now
echo 4: Log off now
echo 5: Hibernate now
ECHO 6: Abort Current Shutdown
ECHO 7: About...
ECHO ----------
ECHO Q: Quit

SET Choice=
SET /P Choice=""

IF '%Choice%'=='Q' GOTO End
IF '%Choice%'=='1' GOTO Shutdown
if "%choice%"=="2" shutdown -s -f
if "%choice%"=="3" shutdown -r -f
if "%choice%"=="4" shutdown -l -f
if "%choice%"=="5" shutdown -h -f
IF '%Choice%'=='6' GOTO Abort
IF '%Choice%'=='7' GOTO About
CLS
GOTO Start
GOTO Start

:Abort
CLS
SHUTDOWN -a
GOTO Start

:About
CLS
ECHO This batch was created by me (Craighep), As a very sad show of my batch talent.
ECHO -
ECHO ----------
ECHO B: Back
ECHO Q: Quit

SET Choice=
SET /P Choice=""

IF '%Choice%'=='Q' GOTO End
IF '%Choice%'=='B' GOTO Start
CLS
GOTO About


:Shutdown

CLS
ECHO When do you want to shutdown? 
ECHO Press number of choice followed by the Enter key 
ECHO -
ECHO 1: Fifteen Minutes
ECHO 2: Thirty Minutes
ECHO 3: Sixty Minutes
ECHO 4: Other Amount
ECHO ----------
ECHO B: Go Back
ECHO Q: Quit



SET Choice=
SET /P Choice=""

IF '%Choice%'=='1' GOTO Fifteen
IF '%Choice%'=='2' GOTO Thirty
IF '%Choice%'=='3' GOTO Sixty
IF '%Choice%'=='4' GOTO Other
IF '%Choice%'=='Q' GOTO End
IF '%Choice%'=='B' GOTO Start
CLS
GOTO Shutdown

:Fifteen
SHUTDOWN -S -F -T 900
GOTO End

:Thirty
SHUTDOWN -S -F -T 1800
GOTO End

:Sixty
SHUTDOWN -S -F -T 2700
GOTO End

:Other
CLS 
ECHO Seconds Or Minutes?
ECHO Press number of choice followed by the Enter key 
ECHO -
ECHO 1: Seconds
ECHO 2: Minutes
ECHO ----------
ECHO B: Go Back
ECHO Q: Quit

SET Choice=
SET /P Choice=""

IF '%Choice%'=='1' GOTO Seconds
IF '%Choice%'=='2' GOTO Minutes
IF '%Choice%'=='Q' GOTO End
IF '%Choice%'=='B' GOTO Shutdown
CLS
GOTO Other

:Seconds 
CLS
ECHO Type Your Seconds To Shutdown:
ECHO Type number of seconds followed by Enter Key
ECHO -

SET Seconds=
SET /P Seconds=""

SHUTDOWN -S -F -T %Seconds%
GOTO End

:Minutes
CLS
ECHO Type Your Minutes To Shutdown:
ECHO Type number of minutes followed by Enter Key
ECHO -

SET Seconds=
SET /P Seconds =""
SET /a min=60*%Seconds%


SHUTDOWN -S -F -T %min%
GOTO End

:End
CLS