file = "D:/Documents/projects/sensAI/Sensai/client/nyst/public/assets/webpage_clipart.png"

from PIL import Image, ImageOps

img = Image.open(file)

img = img.convert('RGBA')  # RGBA = RGB + alpha
mask = ImageOps.invert(img.convert('L'))  # 8-bit grey
img.putalpha(mask)

img.save('ConvertedImage.png', 'PNG')