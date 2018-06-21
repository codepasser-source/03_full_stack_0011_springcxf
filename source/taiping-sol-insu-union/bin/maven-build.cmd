@echo off
set BUILD_PHASE=uat
set "CURRENT_DIR=%cd%"
cd "%CURRENT_DIR%"
cd ..
mvn -Dproject.install.phase=%BUILD_PHASE% clean install -U
pause