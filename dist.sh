# build
yarn build

# navigate into dist directory
cd ./dist

git init
git add -A
git commit -m "dist"

git push -f git@github.com:chmlee/reamparser.js master:dist

cd -
