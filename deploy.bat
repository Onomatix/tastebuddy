@echo off
echo 🚀 Starting deployment process...

echo 📦 Installing dependencies...
call npm install

echo 🏗️ Building the project...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build failed
    exit /b 1
) else (
    echo ✅ Build completed successfully
)

echo 📝 Configuring git...
if not exist ".git" (
    call git init
)

for /f "tokens=*" %%a in ('git config user.name') do set "git_user=%%a"
if "%git_user%"=="" (
    call git config user.name "Onomatix"
    call git config user.email "juncando@gmail.com"
)

for /f "tokens=*" %%a in ('git remote -v ^| findstr origin') do set "remote_exists=%%a"
if "%remote_exists%"=="" (
    echo 🔗 Adding remote repository...
    call git remote add origin https://github.com/Onomatix/tastebuddy.git
)

echo 💾 Committing changes...
call git add .
call git commit -m "Deploy: %date% %time%" || echo No changes to commit

echo ⬆️ Pushing to GitHub...
call git push -u origin master

echo 🌐 Starting the server...
call npm start

echo 🎉 Deployment completed successfully! 