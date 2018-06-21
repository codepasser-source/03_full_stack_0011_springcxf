@echo off
set BUILD_PHASE=product
set "CURRENT_DIR=%cd%"
cd "%CURRENT_DIR%"
cd ..
call mvn -Dproject.install.phase=%BUILD_PHASE% -U clean install
pause