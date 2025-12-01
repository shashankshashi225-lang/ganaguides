#!/bin/bash
# One-click script to push all files to GitHub

echo "🚀 Pushing GangaGuides images to GitHub..."

# Navigate to project directory
cd /home/runner/workspace

# Remove any git locks
rm -f .git/index.lock .git/config.lock

# Add the new images
echo "📸 Adding new destination images..."
git add attached_assets/generated_images/kanak_bhawan_golden_palace_ayodhya.png attached_assets/generated_images/sankat_mochan_hanuman_temple_varanasi.png

# Commit
echo "📝 Creating commit..."
git commit -m "Add destination cover images: Kanak Bhawan and Sankat Mochan temples"

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push origin main

echo "✅ Done! Images pushed successfully"
