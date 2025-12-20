for i in *.jpg; do ffmpeg -i "$i" "${i%.*}.png"; done
