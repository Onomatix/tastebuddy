#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🏗️ Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully"
else
    echo "❌ Build failed"
    exit 1
fi

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "📝 Initializing git repository..."
    git init
fi

# Configure git if not already configured
if [ -z "$(git config user.name)" ]; then
    echo "👤 Configuring git user..."
    git config user.name "Onomatix"
    git config user.email "juncando@gmail.com"
fi

# Add remote if not already added
if [ -z "$(git remote -v | grep origin)" ]; then
    echo "🔗 Adding remote repository..."
    git remote add origin https://github.com/Onomatix/tastebuddy.git
fi

# Add all files and commit
echo "💾 Committing changes..."
git add .
git commit -m "Deploy: $(date +'%Y-%m-%d %H:%M:%S')" || true

# Push to main branch
echo "⬆️ Pushing to GitHub..."
git push -u origin master

# Start the server
echo "🌐 Starting the server..."
npm start

echo "🎉 Deployment completed successfully!" 