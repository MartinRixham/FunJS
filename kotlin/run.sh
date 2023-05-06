kotlinc -d target Monad.kt
kotlinc -d target Object.kt

mkdir -p target
cd target 

echo "Monad output:"
kotlin MonadKt

echo "Object output:"
kotlin ObjectKt
