pushd ./dist/
sha256sum ./ssz.min.js > ./ssz.min.js.sha256
popd
mkdir ./artifacts/
VERSION=$(node -p -e "require('./package.json').version")
cp -r ./dist ./ssz-js-$VERSION/
pushd ./artifacts
tar -zcvf "ssz-js-${VERSION}.tar.gz" "../ssz-js-${VERSION}"
sha256sum "./ssz-js-${VERSION}.tar.gz" > "./ssz-js-${VERSION}.sha256"
popd
rm -rf ./ssz-js-$VERSION
