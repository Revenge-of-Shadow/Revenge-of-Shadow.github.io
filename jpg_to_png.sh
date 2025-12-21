#for i in "*/*.jpg"; do ffmpeg -i "$i" "docs/images/gallery/${i%.*}.png"; done
for i in $(find 'docs/images' -name '*.jpg'); do ffmpeg -i "$i" "${i%.*}.png"; done
