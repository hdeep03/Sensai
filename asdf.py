file = "D:/Documents/projects/sensAI/Sensai/client/nyst/public/assets/webpage_clipart.png"

from PIL import Image, ImageOps
from matplotlib import pyplot as plt
import numpy as np

img = Image.open(file)

img = img.convert('RGBA')  # RGBA = RGB + alpha
red, green, blue, alpha = img.split()
mask = np.array(img)[:,:,:3]
mask = np.sum(mask,axis=-1)/3
alpha = np.array(alpha)
mask[alpha < 0.1] = 255

mask = 255-mask
mask += 25
mask[mask > 255] = 255

plt.imshow(mask)
plt.show()
img.putalpha(Image.fromarray(mask.astype("uint8")))

img.save('ConvertedImage.png', 'PNG')