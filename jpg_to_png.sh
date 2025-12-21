for i in "eocs/images/gallery/*.jpg"; do ffmpeg -i "$i" "docs/images/gallery/${i%.*}.png"; done
